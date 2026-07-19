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
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envía el evento a Google Analytics 4 (gtag) y al dataLayer (por si luego
 * se agrega GTM o Meta Pixel). Si nada está configurado, no hace nada:
 * nunca bloquea la experiencia.
 */
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  window.gtag?.("event", event, payload);
}
