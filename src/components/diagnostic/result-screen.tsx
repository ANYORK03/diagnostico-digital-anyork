"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FREE_CASES_OPEN } from "@/lib/free-cases";
import { track } from "@/lib/analytics";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { DiagnosticResult, LeadInfo } from "@/lib/types";

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ResultScreen({
  result,
  lead,
}: {
  result: DiagnosticResult;
  lead: LeadInfo;
}) {
  const score = useCountUp(result.score);

  const whatsappBase = {
    ownerName: lead.ownerName,
    businessName: lead.businessName,
    city: lead.city,
    score: result.score,
    mainLeakLabel: result.main_leak_label,
    executiveReading: result.executive_reading,
    firstAction: result.first_actions[0] ?? "",
    recommendedOffer: result.recommended_offer,
  };

  function handleWhatsAppClick(intent: "postular" | "ayuda") {
    track("whatsapp_clicked", { intent });
    if (intent === "postular") track("free_case_applied");
  }

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      <motion.div variants={itemVariants}>
        <span className="text-xs font-semibold tracking-[0.14em] text-da-green">
          {lead.businessName.toUpperCase()}
        </span>
        <h3 className="mt-2 text-balance text-2xl font-semibold leading-tight text-da-white sm:text-3xl">
          Tu principal oportunidad está en {result.main_leak_label}.
        </h3>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-5 rounded-2xl border border-da-panel-border bg-da-panel p-5"
      >
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold tabular-nums text-da-green">{score}</span>
          <span className="text-sm text-da-gray">/100</span>
        </div>
        <div className="h-10 w-px bg-da-panel-border" />
        <p className="text-xs leading-relaxed text-da-gray">
          Puntuación de claridad comercial, calculada a partir de tus 7 respuestas.
        </p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-balance leading-relaxed text-da-white/90">
        {result.executive_reading}
      </motion.p>

      <motion.div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-xs font-semibold tracking-wide text-da-gray">
            EVIDENCIA EN TUS RESPUESTAS
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-da-white/85">
            {result.evidence.map((e, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-da-green" />
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-semibold tracking-wide text-da-gray">HIPÓTESIS</h4>
          <ul className="flex flex-col gap-2 text-sm italic text-da-gray">
            {result.hypotheses.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h4 className="mb-2 text-xs font-semibold tracking-wide text-da-gray">
          FUGAS SECUNDARIAS
        </h4>
        <div className="flex flex-wrap gap-2">
          {result.secondary_leaks.map((leak) => (
            <span
              key={leak}
              className="rounded-full border border-da-panel-border px-3 py-1 text-xs text-da-gray"
            >
              {leak}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h4 className="mb-3 text-xs font-semibold tracking-wide text-da-gray">
          TUS PRIMERAS ACCIONES
        </h4>
        <ol className="flex flex-col gap-3">
          {result.first_actions.map((action, i) => (
            <li key={i} className="flex gap-3 text-sm text-da-white/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-da-green/40 text-[11px] font-semibold text-da-green">
                {i + 1}
              </span>
              <span className="pt-0.5">{action}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-da-green/30 bg-da-green-dim p-5"
      >
        <h4 className="text-xs font-semibold tracking-wide text-da-green">
          SOLUCIÓN RECOMENDADA
        </h4>
        <p className="mt-2 text-base font-semibold text-da-white">{result.recommended_offer}</p>
        <p className="mt-1 text-sm leading-relaxed text-da-white/80">{result.why_this_offer}</p>
      </motion.div>

      <motion.p variants={itemVariants} className="text-xs leading-relaxed text-da-gray-dim">
        {result.warning}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 border-t border-da-panel-border pt-8"
      >
        {FREE_CASES_OPEN ? (
          <>
            <div>
              <p className="text-base font-semibold text-da-white">
                ¿Quieres que resolvamos esto juntos?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-da-gray">
                Escríbenos por WhatsApp y cuéntanos tu caso. Elegiremos 3
                negocios para ayudarles gratis a corregir su primera fuga.
              </p>
            </div>
            <a
              href={buildWhatsAppLink({ ...whatsappBase, intent: "postular mi negocio" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("postular")}
              className="flex min-h-[52px] items-center justify-center rounded-full bg-da-green px-6 text-sm font-semibold tracking-wide text-[#04120a] transition-transform hover:scale-[1.01]"
            >
              ESCRÍBENOS POR WHATSAPP →
            </a>
            <span className="text-center text-xs text-da-gray-dim">
              Sin formularios ni esperas: hablas directo con nosotros.
            </span>
          </>
        ) : (
          <>
            <div>
              <p className="text-base font-semibold text-da-white">
                ¿Quieres ayuda para corregir esta fuga?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-da-gray">
                Escríbenos por WhatsApp y te explicamos cómo ayudarte, sin
                compromiso.
              </p>
            </div>
            <a
              href={buildWhatsAppLink({ ...whatsappBase, intent: "recibir ayuda con mi resultado" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("ayuda")}
              className="flex min-h-[52px] items-center justify-center rounded-full bg-da-green px-6 text-sm font-semibold tracking-wide text-[#04120a] transition-transform hover:scale-[1.01]"
            >
              ESCRÍBENOS POR WHATSAPP →
            </a>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
