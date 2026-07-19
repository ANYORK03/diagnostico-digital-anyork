export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-da-panel-border bg-da-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <span className="text-[13px] font-semibold tracking-[0.18em] text-da-white">
          DIGITAL ANYORK LLC
        </span>
        <a
          href="#diagnostico"
          className="rounded-full border border-da-green/40 px-4 py-2 text-xs font-semibold tracking-wide text-da-green transition-colors hover:border-da-green hover:bg-da-green-dim"
        >
          DIAGNÓSTICO GRATIS
        </a>
      </div>
    </header>
  );
}
