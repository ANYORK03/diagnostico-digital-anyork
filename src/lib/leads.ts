import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { QUESTIONS } from "./questions";
import type { Answer, DiagnosticResult, LeadInfo } from "./types";

export interface LeadRecord {
  id: string;
  createdAt: string;
  status: "Nuevo diagnóstico";
  utm: Record<string, string>;
  owner_name: string;
  business_name: string;
  city: string;
  country: string;
  whatsapp: string;
  email: string;
  business_type: string;
  answers: { question: string; answer: string }[];
  score: number;
  main_leak: string;
  secondary_leaks: string[];
  recommended_offer: string;
}

function buildRecord(params: {
  lead: LeadInfo;
  answers: Answer[];
  result: DiagnosticResult;
  utm: Record<string, string>;
}): LeadRecord {
  const answers = params.answers.map((a) => {
    const question = QUESTIONS.find((q) => q.id === a.questionId);
    const option = question?.options.find((o) => o.id === a.optionId);
    return {
      question: question?.title ?? a.questionId,
      answer: option?.label ?? a.optionId,
    };
  });

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "Nuevo diagnóstico",
    utm: params.utm,
    owner_name: params.lead.ownerName,
    business_name: params.lead.businessName,
    city: params.lead.city,
    country: params.lead.country,
    whatsapp: params.lead.whatsapp,
    email: params.lead.email ?? "",
    business_type: params.lead.businessType,
    answers,
    score: params.result.score,
    main_leak: params.result.main_leak,
    secondary_leaks: params.result.secondary_leaks,
    recommended_offer: params.result.recommended_offer,
  };
}

async function saveToAirtable(record: LeadRecord): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;
  if (!apiKey || !baseId || !table) return;

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Fecha": record.createdAt,
          "Estado": record.status,
          "UTM": JSON.stringify(record.utm),
          "Nombre dueño": record.owner_name,
          "Negocio": record.business_name,
          "Ciudad": record.city,
          "País": record.country,
          "WhatsApp": record.whatsapp,
          "Email": record.email,
          "Tipo de negocio": record.business_type,
          "Respuestas": JSON.stringify(record.answers),
          "Puntuación": record.score,
          "Fuga principal": record.main_leak,
          "Fugas secundarias": record.secondary_leaks.join(", "),
          "Oferta recomendada": record.recommended_offer,
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Airtable respondió ${res.status}`);
  }
}

const LOCAL_LEADS_PATH = path.join(process.cwd(), "data", "leads.json");

async function saveToLocalFile(record: LeadRecord): Promise<void> {
  await mkdir(path.dirname(LOCAL_LEADS_PATH), { recursive: true });

  let existing: LeadRecord[] = [];
  try {
    const raw = await readFile(LOCAL_LEADS_PATH, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  existing.push(record);
  await writeFile(LOCAL_LEADS_PATH, JSON.stringify(existing, null, 2), "utf-8");
}

/**
 * El registro nunca debe bloquear ni fallar la respuesta al visitante: si el
 * almacenamiento falla, se registra el error en consola pero el diagnóstico
 * sigue su curso (ver "Requisitos técnicos" del máster prompt).
 */
export async function saveLead(params: {
  lead: LeadInfo;
  answers: Answer[];
  result: DiagnosticResult;
  utm: Record<string, string>;
}): Promise<void> {
  const record = buildRecord(params);

  try {
    const useAirtable = Boolean(
      process.env.AIRTABLE_API_KEY &&
        process.env.AIRTABLE_BASE_ID &&
        process.env.AIRTABLE_TABLE_NAME,
    );

    if (useAirtable) {
      await saveToAirtable(record);
    } else {
      await saveToLocalFile(record);
    }
  } catch (error) {
    console.error("[leads] No se pudo guardar el lead:", error);
  }
}
