import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDiagnosticResult } from "@/lib/ai/analyze";
import { saveLead } from "@/lib/leads";
import { QUESTIONS } from "@/lib/questions";
import type { DiagnoseResponse } from "@/lib/types";

const answerSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
});

const payloadSchema = z.object({
  answers: z.array(answerSchema).length(QUESTIONS.length),
  lead: z.object({
    ownerName: z.string().trim().min(2).max(120),
    businessName: z.string().trim().min(2).max(120),
    city: z.string().trim().min(2).max(120),
    country: z.string().trim().min(2).max(120),
    whatsapp: z.string().trim().min(7).max(20),
    email: z
      .string()
      .trim()
      .regex(/^\S+@\S+\.\S+$/, "Correo inválido")
      .optional()
      .or(z.literal("")),
    businessType: z.string().trim().min(2).max(120),
    consent: z.literal(true),
    website: z.string().optional(),
  }),
  utm: z.record(z.string(), z.string()).optional(),
});

function isValidAnswerSet(answers: { questionId: string; optionId: string }[]): boolean {
  const questionIds = new Set(QUESTIONS.map((q) => q.id));
  if (answers.length !== QUESTIONS.length) return false;
  const seen = new Set<string>();
  for (const answer of answers) {
    const question = QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return false;
    if (!question.options.some((o) => o.id === answer.optionId)) return false;
    seen.add(answer.questionId);
  }
  return seen.size === questionIds.size;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 6;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos incompletos o inválidos.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { answers, lead, utm } = parsed.data;

  // Honeypot: los bots suelen rellenar todos los campos, incluido este oculto.
  if (lead.website) {
    return NextResponse.json({ error: "Solicitud rechazada." }, { status: 400 });
  }

  if (!isValidAnswerSet(answers)) {
    return NextResponse.json({ error: "Respuestas incompletas." }, { status: 400 });
  }

  const { result, source } = await getDiagnosticResult({
    businessType: lead.businessType,
    answers,
  });

  await saveLead({ lead, answers, result, utm: utm ?? {} });

  const body: DiagnoseResponse = { result, source };
  return NextResponse.json(body);
}
