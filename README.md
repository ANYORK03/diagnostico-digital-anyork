# Landing de Diagnóstico IA — Digital Anyork LLC

Landing page de captación permanente: diagnóstico gratuito de 7 preguntas para pequeños negocios, análisis con IA (con fallback local), captura de lead antes del resultado y CTA a WhatsApp.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Funciona sin configurar nada: sin claves de IA usa el motor de puntuación local, y los leads se guardan automáticamente en el Supabase de Digital Anyork.

## Configuración (`.env.local`)

Copia `.env.example` como `.env.local` y ajusta:

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_FREE_CASES_OPEN` | `true` muestra la convocatoria de 3 casos gratis; `false` la reemplaza por la oferta de revisión personalizada. No requiere rediseño, solo redeploy. |
| `AI_PROVIDER` | `openai`, `anthropic`, `gemini` o `groq`. Vacío = solo motor local. |
| `*_API_KEY` | La clave del proveedor elegido. Solo vive en el servidor, nunca llega al navegador. |
| `SUPABASE_URL` + `SUPABASE_KEY` | Ya tienen un valor por defecto (el Supabase de Digital Anyork). Solo llénalas si quieres apuntar a OTRO proyecto Supabase. |
| `AIRTABLE_API_KEY/BASE_ID/TABLE_NAME` | Si se configuran las 3, tienen prioridad sobre Supabase. |
| `NEXT_PUBLIC_SITE_URL` | URL pública para SEO y Open Graph. |

## Base de leads

Cada lead se registra **antes** de mostrar el resultado, con: fecha, UTMs, respuestas, puntuación, fuga principal, fugas secundarias, oferta recomendada y estado `Nuevo diagnóstico`.

- **Supabase (activo por defecto):** tabla `leads` con RLS activado y política de solo-inserción — la clave usada es la "publishable" (equivalente a la `anon` key), diseñada para vivir en el cliente; nadie puede leer ni modificar leads con ella, solo insertar. Los leads se ven en Supabase → tu proyecto → **Table Editor** → tabla **leads**.
- **Airtable (alternativa):** si configuras `AIRTABLE_API_KEY/BASE_ID/TABLE_NAME`, toma prioridad sobre Supabase. Crea una tabla con los campos: Fecha, Estado, UTM, Nombre dueño, Negocio, Ciudad, País, WhatsApp, Email, Tipo de negocio, Respuestas, Puntuación, Fuga principal, Fugas secundarias, Oferta recomendada.

## Análisis con IA

- El análisis corre solo en el servidor (`/api/diagnose`).
- La respuesta del modelo se valida con un esquema (zod). Si el proveedor falla, responde mal o tarda más de 9 s, entra el **motor de puntuación local** y el visitante nunca ve un error.
- No se envían datos de contacto del lead al proveedor de IA, solo las respuestas del cuestionario y el tipo de negocio.
- La oferta recomendada siempre se fuerza al catálogo oficial (fuga → oferta), la IA no puede inventar ofertas.

## Analítica

Los eventos se empujan a `window.dataLayer` (compatible con Google Tag Manager):
`diagnostic_started`, `question_completed`, `lead_captured`, `diagnostic_completed`, `whatsapp_clicked`, `free_case_applied`.

Instala GTM agregando su snippet en `src/app/layout.tsx` y los eventos quedan disponibles de inmediato. Las UTMs se capturan al llegar y se guardan con cada lead.

## Casos reales / testimonios

La sección está construida pero oculta (`src/components/proof-section.tsx`). Cuando tengas casos reales autorizados, agrégalos al arreglo `CASES` y la sección aparece sola. No agregar métricas ni testimonios sin confirmar.

## WhatsApp

El número está en `src/lib/whatsapp.ts` (`+1 720 694 3519`). El mensaje precargado incluye nombre, negocio, ciudad, puntuación, fuga principal y solución recomendada.

## Deploy

```bash
npm run build
npm start
```

O directamente en Vercel: importa el repo, configura las variables de entorno del `.env.example` y despliega.
