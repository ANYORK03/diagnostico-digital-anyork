export type AnalyticsEvent =
  | "diagnostic_started"
  | "question_completed"
  | "lead_captured"
  | "diagnostic_completed"
  | "whatsapp_clicked"
  | "free_case_applied";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Empuja el evento al dataLayer (compatible con GTM/GA4/Meta Pixel vía GTM).
 * Si no hay dataLayer configurado, no hace nada: nunca bloquea la experiencia.
 */
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
