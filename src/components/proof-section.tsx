/**
 * Sección de casos reales. Permanece oculta hasta que existan resultados
 * confirmados y autorizados — nunca inventar testimonios ni métricas.
 *
 * Para activarla: agrega casos reales al arreglo CASES. La sección se
 * renderiza sola en cuanto haya al menos uno.
 */

interface RealCase {
  business: string;
  initialSituation: string;
  intervention: string;
  measuredResult: string;
  testimonial?: string;
}

const CASES: RealCase[] = [];

export function ProofSection() {
  if (CASES.length === 0) return null;

  return (
    <section className="border-t border-da-panel-border px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-da-green">
            CASOS REALES
          </span>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-da-white sm:text-3xl">
            Negocios que ya corrigieron su fuga principal.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.business}
              className="flex flex-col gap-3 rounded-2xl border border-da-panel-border bg-da-panel p-6"
            >
              <h3 className="text-sm font-semibold text-da-white">{c.business}</h3>
              <dl className="flex flex-col gap-2 text-[13px] leading-relaxed">
                <div>
                  <dt className="font-medium text-da-gray">Situación inicial</dt>
                  <dd className="text-da-white/85">{c.initialSituation}</dd>
                </div>
                <div>
                  <dt className="font-medium text-da-gray">Intervención</dt>
                  <dd className="text-da-white/85">{c.intervention}</dd>
                </div>
                <div>
                  <dt className="font-medium text-da-gray">Resultado medido</dt>
                  <dd className="text-da-white/85">{c.measuredResult}</dd>
                </div>
              </dl>
              {c.testimonial && (
                <blockquote className="mt-1 border-l-2 border-da-green/50 pl-3 text-[13px] italic text-da-gray">
                  “{c.testimonial}”
                </blockquote>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
