import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-da-panel-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.18em] text-da-white">
            DIGITAL ANYORK LLC
          </p>
          <p className="mt-1 text-xs text-da-gray-dim">
            Diagnóstico gratuito para pequeños negocios.
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs text-da-gray">
          <Link href="/privacidad" className="transition-colors hover:text-da-white">
            Privacidad
          </Link>
          <a href="#diagnostico" className="transition-colors hover:text-da-white">
            Diagnóstico gratis
          </a>
        </div>
      </div>
    </footer>
  );
}
