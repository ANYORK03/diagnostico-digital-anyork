export const LEAK_AREAS = [
  "oferta",
  "visibilidad",
  "confianza",
  "compra",
  "seguimiento",
  "operacion",
] as const;

export type LeakArea = (typeof LEAK_AREAS)[number];

export interface QuestionOption {
  id: string;
  label: string;
  /** 0 = respuesta saludable, 3 = fuga severa. Usado por el motor de fallback. */
  severity: 0 | 1 | 2 | 3;
  /** Frase corta usada como evidencia cuando esta opción determina una fuga. */
  evidence: string;
}

export interface Question {
  id: string;
  order: number;
  /** Área evaluada de negocio; "contexto" no puntúa fugas, solo da marco a la lectura. */
  area: LeakArea | "contexto";
  areaLabel: string;
  title: string;
  options: QuestionOption[];
}

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface LeadInfo {
  ownerName: string;
  businessName: string;
  city: string;
  country: string;
  whatsapp: string;
  email?: string;
  businessType: string;
  consent: boolean;
  /** Honeypot: debe llegar vacío. Si trae valor, es spam. */
  website?: string;
}

export interface DiagnosticResult {
  score: number;
  main_leak: LeakArea;
  main_leak_label: string;
  executive_reading: string;
  evidence: string[];
  hypotheses: string[];
  secondary_leaks: string[];
  first_actions: string[];
  recommended_offer: string;
  why_this_offer: string;
  warning: string;
}

export interface DiagnosePayload {
  answers: Answer[];
  lead: LeadInfo;
  utm?: Record<string, string>;
}

export interface DiagnoseResponse {
  result: DiagnosticResult;
  source: "ai" | "fallback";
}
