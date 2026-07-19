import { LEAK_CONTENT } from "../leak-content";
import { QUESTIONS } from "../questions";
import { computeFallbackResult } from "../scoring";
import type { Answer, DiagnosticResult, LeakArea } from "../types";
import { PROVIDERS, type AiProviderName } from "./providers";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt";
import { aiResultSchema } from "./schema";

const AREA_LABELS = new Map<LeakArea, string>(
  QUESTIONS.filter((q) => q.area !== "contexto").map((q) => [
    q.area as LeakArea,
    q.areaLabel,
  ]),
);

const AI_TIMEOUT_MS = 9000;

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1] : trimmed;
  return JSON.parse(candidate);
}

/**
 * El catálogo de ofertas es fijo (ver mapeo de negocio). Se fuerza aquí para
 * que la IA nunca invente una oferta fuera de catálogo ni mezcle varias.
 */
function enforceOfferCatalog(result: DiagnosticResult): DiagnosticResult {
  const content = LEAK_CONTENT[result.main_leak];
  return {
    ...result,
    main_leak_label: content.label,
    recommended_offer: content.offer,
    why_this_offer: content.whyOffer,
  };
}

async function callAiProvider(
  provider: AiProviderName,
  businessType: string,
  answers: Answer[],
): Promise<DiagnosticResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const call = PROVIDERS[provider];
    const raw = await call({
      system: SYSTEM_PROMPT,
      user: buildUserPrompt({ businessType, answers }),
      signal: controller.signal,
    });
    const parsed = extractJson(raw);
    const validated = aiResultSchema.parse(parsed);
    return enforceOfferCatalog(validated);
  } finally {
    clearTimeout(timeout);
  }
}

export async function getDiagnosticResult(params: {
  businessType: string;
  answers: Answer[];
}): Promise<{ result: DiagnosticResult; source: "ai" | "fallback" }> {
  const provider = process.env.AI_PROVIDER as AiProviderName | undefined;

  if (provider && PROVIDERS[provider]) {
    try {
      const result = await callAiProvider(provider, params.businessType, params.answers);
      return { result, source: "ai" };
    } catch (error) {
      console.error("[diagnose] Falló el proveedor de IA, usando motor local:", error);
    }
  }

  return { result: computeFallbackResult(params.answers), source: "fallback" };
}
