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

// Clave "publishable" de Supabase: diseñada para exponerse en el cliente,
// protegida por la política RLS "insert_leads_anon" (solo permite INSERT,
// nunca lectura). Se deja como valor por defecto para que la landing guarde
// leads sin depender de configurar variables de entorno en Vercel.
const DEFAULT_SUPABASE_URL = "https://bkioiprsgiazfiqsamwn.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_tVpRm1WBEAv4rzbOrjPl6Q_bLuS0Q8z";

async function saveToSupabase(record: LeadRecord): Promise<void> {
  const url = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || DEFAULT_SUPABASE_KEY;
  if (!url || !key) return;

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      created_at: record.createdAt,
      estado: record.status,
      utm: record.utm,
      nombre_dueno: record.owner_name,
      negocio: record.business_name,
      ciudad: record.city,
      pais: record.country,
      whatsapp: record.whatsapp,
      email: record.email,
      tipo_negocio: record.business_type,
      respuestas: record.answers,
      puntuacion: record.score,
      fuga_principal: record.main_leak,
      fugas_secundarias: record.secondary_leaks.join(", "),
      oferta_recomendada: record.recommended_offer,
    }),
  });

  if (!res.ok) {
    throw new Error(`Supabase respondió ${res.status}`);
  }
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
    // Airtable, si se configura explícitamente, tiene prioridad sobre el
    // Supabase por defecto.
    const useAirtable = Boolean(
      process.env.AIRTABLE_API_KEY &&
        process.env.AIRTABLE_BASE_ID &&
        process.env.AIRTABLE_TABLE_NAME,
    );

    if (useAirtable) {
      await saveToAirtable(record);
    } else {
      await saveToSupabase(record);
    }
  } catch (error) {
    console.error("[leads] No se pudo guardar el lead:", error);
  }
}
