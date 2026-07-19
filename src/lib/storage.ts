import type { DiagnosticResult, LeadInfo } from "./types";

const UTM_KEY = "da_utm_v1";
const DIAGNOSTIC_KEY = "da_diagnostic_v1";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/** Guarda las UTM de primer contacto; si ya existían, no las sobrescribe. */
export function captureUtm(search: string): void {
  if (typeof window === "undefined") return;
  const existing = readUtm();
  if (Object.keys(existing).length > 0) return;

  const params = new URLSearchParams(search);
  const found: Record<string, string> = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length > 0) {
    window.sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
  }
}

export function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(UTM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export interface PersistedDiagnosticState {
  step: "quiz" | "form" | "result";
  questionIndex: number;
  answers: { questionId: string; optionId: string }[];
  lead?: Partial<LeadInfo>;
  result?: DiagnosticResult;
  source?: "ai" | "fallback";
}

export function readDiagnosticState(): PersistedDiagnosticState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DIAGNOSTIC_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeDiagnosticState(state: PersistedDiagnosticState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(state));
}

export function clearDiagnosticState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DIAGNOSTIC_KEY);
}
