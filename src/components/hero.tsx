"use client";

import { motion } from "framer-motion";
import { FREE_CASES_OPEN } from "@/lib/free-cases";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const RESULT_PREVIEW = [
  {
    title: "Fuga principal",
    desc: "El punto exacto que está frenando tu negocio hoy.",
  },
  {
    title: "Mapa de prioridades",
    desc: "Qué corregir primero y qué puede esperar.",
  },
  {
    title: "Plan inicial",
    desc: "Tres acciones concretas para empezar.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-da-green/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={itemVariants}
            className="rounded-full border border-da-panel-border bg-da-panel px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-da-green"
          >
            DIAGNÓSTICO AUTOMATIZADO · 100% GRATIS
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-da-white sm:text-5xl lg:text-[3.25rem]"
          >
            Tu negocio no necesita más ideas.
            <br />
            Necesita saber qué mejorar primero.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-balance text-base leading-relaxed text-da-gray sm:text-lg"
          >
            Responde 7 preguntas sencillas y recibe un mapa personalizado con el
            principal freno de tu negocio, tus prioridades y el próximo paso
            recomendado.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <a
              href="#diagnostico"
              className="group relative isolate flex items-center justify-center overflow-hidden rounded-full bg-da-green px-7 py-4 text-sm font-semibold tracking-wide text-[#04120a] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <span className="relative z-10">DIAGNOSTICAR MI NEGOCIO →</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </a>
            <span className="text-xs tracking-wide text-da-gray-dim">
              Sin tarjeta · Sin tecnicismos · Resultado inmediato
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
        >
          {RESULT_PREVIEW.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              custom={i}
              className="group rounded-2xl border border-da-panel-border bg-da-panel p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-da-green/50 hover:shadow-[0_8px_30px_-12px_rgba(182,255,24,0.25)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-da-green/40 text-[11px] font-semibold text-da-green">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold text-da-white">{item.title}</p>
              </div>
              <p className="mt-2 pl-10 text-[13px] leading-relaxed text-da-gray">
                {item.desc}
              </p>
            </motion.div>
          ))}

          {FREE_CASES_OPEN && (
            <motion.div
              variants={itemVariants}
              className="mt-2 rounded-2xl border border-da-green/30 bg-da-green-dim px-5 py-4 text-[13px] leading-relaxed text-da-white"
            >
              <span className="font-semibold text-da-green">3 negocios</span>{" "}
              seleccionados recibirán la implementación de su primera mejora
              100% gratis.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
