import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidad | Digital Anyork LLC",
  description: "Cómo tratamos tus datos al usar el diagnóstico gratuito de Digital Anyork LLC.",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-xs font-medium text-da-green transition-colors hover:text-da-white">
        ← Volver al diagnóstico
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-da-white">Aviso de privacidad</h1>
      <p className="mt-2 text-sm text-da-gray-dim">Digital Anyork LLC</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-da-white/85">
        <section>
          <h2 className="mb-2 text-base font-semibold text-da-white">Qué datos recopilamos</h2>
          <p>
            Al completar el diagnóstico gratuito te pedimos tu nombre, el nombre de tu negocio,
            tu ciudad y país, tu número de WhatsApp, tu correo electrónico (opcional), el tipo
            de negocio y tus respuestas al cuestionario.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-da-white">Para qué los usamos</h2>
          <p>
            Usamos esta información para generar tu diagnóstico personalizado, guardarlo,
            contactarte por WhatsApp o correo con el seguimiento relacionado a tu resultado y,
            si postulas, evaluar tu negocio para la convocatoria de implementación gratuita.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-da-white">Qué no hacemos</h2>
          <p>
            No vendemos tus datos ni los compartimos con terceros para publicidad. Tus datos de
            contacto no se envían al proveedor de inteligencia artificial que analiza tus
            respuestas: solo se comparten tus respuestas del cuestionario y el tipo de negocio.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-da-white">Tus derechos</h2>
          <p>
            Puedes pedir en cualquier momento que corrijamos o eliminemos tu información
            escribiéndonos por WhatsApp al +1 720 694 3519 o al correo de contacto de Digital
            Anyork LLC.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-da-white">Sobre el diagnóstico</h2>
          <p>
            El diagnóstico es una orientación inicial basada en tus respuestas. No constituye
            una garantía de resultados comerciales ni financieros.
          </p>
        </section>
      </div>
    </main>
  );
}
