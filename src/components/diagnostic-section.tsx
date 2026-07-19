import { DiagnosticApp } from "@/components/diagnostic/diagnostic-app";

export function DiagnosticSection() {
  return (
    <section id="diagnostico" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-da-green">
            DIAGNÓSTICO
          </span>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-da-white sm:text-3xl">
            Siete preguntas. Un mapa claro de qué mejorar primero.
          </h2>
        </div>
        <DiagnosticApp />
      </div>
    </section>
  );
}
