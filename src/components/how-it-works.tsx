const STEPS = [
  {
    title: "Respondes",
    desc: "Siete preguntas sobre cómo vendes y atiendes.",
  },
  {
    title: "Recibes",
    desc: "Tu fuga principal y tres acciones concretas.",
  },
  {
    title: "Decides",
    desc: "Lo aplicas por tu cuenta o solicitas ayuda.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-da-panel-border px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-da-green">
            CÓMO FUNCIONA
          </span>
          <h2 className="mt-3 text-balance text-2xl font-semibold text-da-white sm:text-3xl">
            Tres pasos. Sin tecnicismos.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-da-panel-border bg-da-panel p-6"
            >
              <span className="text-3xl font-semibold tabular-nums text-da-green/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-semibold text-da-white">{step.title}:</h3>
              <p className="mt-1 text-sm leading-relaxed text-da-gray">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
