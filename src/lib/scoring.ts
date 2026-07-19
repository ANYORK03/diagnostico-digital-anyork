import { QUESTIONS } from "./questions";
import { LEAK_CONTENT } from "./leak-content";
import { LEAK_AREAS } from "./types";
import type { Answer, DiagnosticResult, LeakArea } from "./types";

const AREA_LABELS = new Map<LeakArea, string>(
  QUESTIONS.filter((q) => q.area !== "contexto").map((q) => [
    q.area as LeakArea,
    q.areaLabel,
  ]),
);

function findOption(questionId: string, optionId: string) {
  const question = QUESTIONS.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.id === optionId);
  if (!question || !option) return null;
  return { question, option };
}

/**
 * Motor de puntuación sin IA. Se usa cuando el proveedor de IA falla o no
 * está configurado, para que la página nunca quede bloqueada ni muestre un error.
 */
export function computeFallbackResult(answers: Answer[]): DiagnosticResult {
  const severityByArea = new Map<LeakArea, number>();
  const evidenceByArea = new Map<LeakArea, string>();
  let etapaLabel = "";

  for (const answer of answers) {
    const found = findOption(answer.questionId, answer.optionId);
    if (!found) continue;
    const { question, option } = found;
    if (question.area === "contexto") {
      etapaLabel = option.label.replace(/\.$/, "");
      continue;
    }
    severityByArea.set(question.area, option.severity);
    evidenceByArea.set(question.area, option.evidence);
  }

  // Orden estable: en empates, gana el área que aparece primero en LEAK_AREAS.
  const ranked = LEAK_AREAS.map((area) => ({
    area,
    severity: severityByArea.get(area) ?? 0,
  })).sort((a, b) => b.severity - a.severity);

  const mainLeak = ranked[0].area;
  const secondaryLeaks = [ranked[1].area, ranked[2].area];

  const totalSeverity = ranked.reduce((sum, r) => sum + r.severity, 0);
  const maxSeverity = LEAK_AREAS.length * 3;
  const score = Math.round(100 - (totalSeverity / maxSeverity) * 100);

  const content = LEAK_CONTENT[mainLeak];
  const evidence = [evidenceByArea.get(mainLeak), evidenceByArea.get(secondaryLeaks[0])].filter(
    (e): e is string => Boolean(e),
  );

  const stageFragment = etapaLabel
    ? ` Sobre tu etapa nos dijiste: «${etapaLabel}», y eso confirma`
    : " Y eso confirma";

  return {
    score: Math.max(0, Math.min(100, score)),
    main_leak: mainLeak,
    main_leak_label: content.label,
    executive_reading: `Revisando tus siete respuestas, ${content.readingIntro}.${stageFragment} que ese es el punto que más está frenando tu negocio ahora mismo.`,
    evidence:
      evidence.length > 0
        ? evidence
        : [`Sus respuestas muestran señales claras en ${content.label}.`],
    hypotheses: [...content.hypotheses],
    secondary_leaks: secondaryLeaks.map((area) => AREA_LABELS.get(area) ?? area),
    first_actions: [...content.actions],
    recommended_offer: content.offer,
    why_this_offer: content.whyOffer,
    warning: "Este diagnóstico es una orientación inicial basada en tus respuestas.",
  };
}
