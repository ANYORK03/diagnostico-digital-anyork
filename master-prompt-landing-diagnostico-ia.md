# Máster Prompt — Landing de Diagnóstico IA para Pequeños Negocios

## Rol

Actúa como estratega de conversión, diseñador UX/UI premium, copywriter de respuesta directa y desarrollador full-stack senior. Construye una landing page funcional, rápida y responsive para **Digital Anyork LLC**, fundada por **York Martínez**.

No construyas una página genérica sobre inteligencia artificial. Construye un sistema permanente de captación de prospectos para pequeños negocios, especialmente negocios hispanos que están comenzando o que venden de manera irregular.

## Objetivo comercial

Crear un embudo con esta secuencia:

1. Una persona llega desde historias, estados, redes sociales o un enlace de WhatsApp.
2. Completa gratuitamente un diagnóstico automatizado de su negocio.
3. La IA analiza sus respuestas y detecta su principal cuello de botella.
4. La página entrega un resultado personalizado con prioridades y próximos pasos.
5. El prospecto deja sus datos antes de ver el resultado completo.
6. El resultado recomienda una solución específica de Digital Anyork LLC.
7. El prospecto puede postular su negocio para uno de **3 casos de implementación gratuita**.
8. Aunque los lugares gratuitos estén ocupados, el diagnóstico debe seguir funcionando como lead magnet y conducir hacia una oferta pagada.

El diagnóstico será **gratis permanentemente**. La implementación gratuita estará limitada a **3 negocios seleccionados por convocatoria**. No afirmar que una persona ganó o fue seleccionada automáticamente.

## Posicionamiento

Digital Anyork LLC no vende flyers aislados. Ayuda a pequeños negocios a descubrir qué deben mejorar primero y crea soluciones concretas para corregir el problema principal.

Usar lenguaje humano, directo y fácil de entender. Evitar tecnicismos como CRM, automatización, conversión, embudo, arquitectura, agentes o infraestructura en la comunicación dirigida al visitante.

## Público

- Restaurantes y negocios de comida.
- Salones, barberías, uñas, belleza y bienestar.
- Servicios profesionales y documentales.
- Comercios locales.
- Emprendedores que venden mediante WhatsApp, Instagram, delivery, recogida o recomendación.
- Negocios nuevos o con ventas irregulares.

## Identidad visual

- Estética: premium, minimalista, seria y moderna.
- Fondo principal: negro o azul casi negro.
- Colores: blanco, gris suave y verde neón usado con moderación.
- Verde recomendado: `#B6FF18`.
- Fondo recomendado: `#070909`.
- Paneles: `#101411`.
- Evitar morado, rojo, exceso de degradados, hologramas, robots, cerebros digitales y recursos que parezcan “IA genérica”.
- La experiencia debe sentirse como una consultoría cara cuyo punto de entrada es gratuito.
- Tipografía sans serif moderna, alta legibilidad y jerarquía fuerte.
- Mobile first. La mayoría del tráfico llegará desde teléfonos.

## Dirección creativa premium

La página debe transmitir el valor de una consultoría estratégica de alto nivel, aunque el diagnóstico sea gratuito.

- Utilizar mucho espacio negativo, composición editorial y bloques bien separados.
- Evitar plantillas de marketing saturadas, exceso de tarjetas y secciones que parezcan copiadas de un constructor genérico.
- El hero debe sentirse contundente, tranquilo y seguro; no agresivo.
- Usar líneas finas, números, indicadores de progreso y detalles verde neón como lenguaje visual consistente.
- Los paneles pueden tener textura oscura muy sutil, profundidad moderada y bordes de baja opacidad.
- Usar sombras suaves y realistas. Evitar glassmorphism exagerado.
- Evitar fotografías de stock de personas celebrando, robots, cerebros, circuitos y oficinas falsas.
- Si se utiliza una imagen de York, debe ser una fotografía real proporcionada por el fundador y debe conservar su identidad.
- El diseño debe entenderse en menos de cinco segundos: qué es, qué recibirá la persona y cuál botón debe presionar.

## Interactividad y Motion

Usar **Motion para React / Framer Motion** o la librería de animaciones nativa del constructor. Las animaciones deben comunicar avance, jerarquía y respuesta. No deben distraer ni retrasar el diagnóstico.

### Movimiento del hero

- Entrada inicial con `opacity` y desplazamiento vertical máximo de 16–24 px.
- Mostrar etiqueta, titular, subtítulo y botón con un stagger corto de 60–100 ms.
- Duración recomendada: 450–700 ms.
- Curva suave tipo `easeOut`; evitar rebotes infantiles.
- Agregar un resplandor verde muy sutil que se desplace lentamente en el fondo sin afectar la lectura.
- El botón principal puede tener un brillo horizontal suave al pasar el cursor, pero no debe parpadear.

### Tarjeta de resultado anticipado

- Los tres elementos “Fuga principal”, “Mapa de prioridades” y “Plan inicial” aparecen secuencialmente.
- En escritorio, aplicar una elevación de 2–4 px al pasar el cursor.
- El borde verde puede intensificarse ligeramente en hover.
- No usar rotaciones, efectos 3D agresivos ni movimientos continuos.

### Diagnóstico

- Utilizar `AnimatePresence` para cambiar una pregunta por otra.
- La pregunta actual sale con una transición corta hacia la izquierda y la siguiente entra desde la derecha.
- Duración máxima entre preguntas: 250–350 ms.
- La barra de progreso debe avanzar con una animación tipo spring controlada, sin rebote excesivo.
- Al seleccionar una respuesta, mostrar inmediatamente un estado visual: borde verde, check o relleno suave.
- Bloquear dobles clics mientras cambia la pregunta.
- Permitir volver a la pregunta anterior sin perder las respuestas.
- Guardar temporalmente el avance en `localStorage` o mecanismo equivalente.

### Formulario de datos

- Labels claros y permanentes; no depender solo de placeholders.
- Al enfocar un campo, animar suavemente el borde a verde.
- Mostrar validaciones debajo del campo sin mover violentamente el layout.
- El botón “Ver mi diagnóstico” debe mostrar un estado breve de análisis:
  - “Analizando tu negocio…”
  - Barra o secuencia visual de las seis áreas evaluadas.
  - Duración percibida máxima de 2–4 segundos si la respuesta de IA ya está disponible.
- Nunca usar una animación falsa demasiado larga para aparentar inteligencia.

### Resultado

- Revelar primero el nombre de la fuga principal.
- Animar después la puntuación con un count-up corto de 0 hasta el valor calculado.
- Mostrar evidencias, acciones y recomendación mediante stagger.
- La puntuación no debe dominar más que la explicación. El objetivo es claridad, no gamificación.
- El CTA de WhatsApp aparece al final del recorrido visual, cuando la persona ya comprende el valor.

### Microinteracciones

- Hover y pressed state en todos los botones.
- Iconos o flechas se desplazan máximo 3–5 px.
- Las tarjetas responden al cursor con cambios discretos de borde y sombra.
- En teléfono, sustituir hover por estados táctiles visibles.
- Agregar un indicador de guardado del progreso cuando corresponda.

### Accesibilidad y rendimiento del Motion

- Respetar `prefers-reduced-motion` y ofrecer la misma experiencia sin animaciones.
- No bloquear contenido hasta que termine una animación.
- Animar preferiblemente `transform` y `opacity` para mantener 60 fps.
- Evitar animar filtros pesados, fondos completos o múltiples sombras simultáneas en móviles.
- Cargar la librería de Motion de forma eficiente y evitar aumentar innecesariamente el bundle.
- El sitio debe seguir siendo completamente usable con teclado.

## Arquitectura de la página

### 1. Encabezado

Marca:

**DIGITAL ANYORK LLC**

Botón pequeño:

**DIAGNÓSTICO GRATIS**

### 2. Hero

Etiqueta:

**DIAGNÓSTICO AUTOMATIZADO · 100% GRATIS**

Titular:

**Tu negocio no necesita más ideas. Necesita saber qué mejorar primero.**

Subtítulo:

**Responde 7 preguntas sencillas y recibe un mapa personalizado con el principal freno de tu negocio, tus prioridades y el próximo paso recomendado.**

Botón principal:

**DIAGNOSTICAR MI NEGOCIO →**

Microcopy:

**Sin tarjeta · Sin tecnicismos · Resultado inmediato**

Mostrar al lado una tarjeta premium con los tres elementos del resultado:

1. Fuga principal.
2. Mapa de prioridades.
3. Plan inicial.

Agregar un aviso visible pero elegante:

**3 negocios seleccionados recibirán la implementación de su primera mejora 100% gratis.**

### 3. Franja de áreas evaluadas

Mostrar:

**Oferta · Visibilidad · Confianza · Compra · Seguimiento · Operación**

### 4. Diagnóstico interactivo

Mostrar una sola pregunta por pantalla, barra de progreso, transiciones suaves y botones grandes para teléfono.

#### Pregunta 1 — Etapa

¿En qué etapa está tu negocio?

- Estoy comenzando.
- Ya vendo, pero de forma irregular.
- Vendo de forma constante.
- Tengo demanda, pero todo depende de mí.

#### Pregunta 2 — Oferta

¿Una persona entiende rápidamente qué vendes y por qué elegirte?

- Sí, está completamente claro.
- Más o menos; todavía preguntan mucho.
- Tengo varios productos o servicios mezclados.
- Aún estoy definiendo qué vender primero.

#### Pregunta 3 — Visibilidad

¿De dónde llegan hoy la mayoría de tus clientes?

- De un canal constante que puedo medir.
- De recomendaciones y conocidos.
- De estados o redes, pero sin constancia.
- Todavía casi no llegan clientes.

#### Pregunta 4 — Confianza

¿Tienes pruebas que ayuden a un desconocido a confiar en tu negocio?

- Sí: reseñas, resultados y fotos reales.
- Tengo algunas, pero están desorganizadas.
- Solo tengo publicaciones del producto.
- Todavía no tengo testimonios ni pruebas.

#### Pregunta 5 — Compra

¿Qué ocurre cuando alguien quiere comprar o pedir información?

- Tiene un camino claro y compra rápido.
- Debe preguntar precios, horarios o disponibilidad.
- La conversación se alarga y muchos desaparecen.
- No tengo un proceso definido.

#### Pregunta 6 — Seguimiento

¿Qué haces con las personas que preguntan y no compran?

- Las registro y les doy seguimiento.
- A veces vuelvo a escribirles.
- Quedan perdidas en WhatsApp o Instagram.
- Nunca les doy seguimiento.

#### Pregunta 7 — Operación

Si mañana llegan diez clientes nuevos, ¿podrías atenderlos bien?

- Sí, tengo capacidad y un proceso claro.
- Sí, pero tendría que improvisar.
- Me retrasaría o bajaría la calidad.
- Todo depende de mí y ya estoy saturado.

## Captura del prospecto

Antes de revelar el resultado completo, solicitar:

- Nombre del dueño.
- Nombre del negocio.
- Ciudad y país.
- Número de WhatsApp.
- Correo electrónico opcional.
- Tipo de negocio.
- Casilla de consentimiento para recibir el diagnóstico y seguimiento relacionado.

Texto:

**Tu diagnóstico está listo. Dinos a quién pertenece para personalizarlo y guardar tu resultado.**

Botón:

**VER MI DIAGNÓSTICO →**

Guardar el prospecto en una base de datos, Google Sheets, Airtable, Notion o el sistema de leads disponible. Registrar también:

- Fecha y hora.
- Fuente o UTM.
- Respuestas.
- Puntuación.
- Fuga principal.
- Fugas secundarias.
- Oferta recomendada.
- Estado inicial: `Nuevo diagnóstico`.

No depender únicamente de que el usuario pulse el botón de WhatsApp. El lead debe quedar registrado antes de mostrar el resultado.

## Análisis con IA

Realizar el análisis en el servidor. Nunca exponer claves de API en el navegador.

Usar un modelo de lenguaje disponible mediante una variable de entorno. Aceptar OpenAI, Claude, Gemini, Groq u otro proveedor compatible. Validar la respuesta mediante un esquema JSON antes de mostrarla.

### System prompt del analista

```text
Eres el analista de pequeños negocios de Digital Anyork LLC. Tu trabajo es diagnosticar antes de proponer.

Analiza las respuestas del dueño y determina cuál es el principal cuello de botella entre: oferta, visibilidad, confianza, compra, seguimiento u operación.

Reglas:
- No inventes ventas, métricas, demanda, capacidad ni problemas no confirmados.
- Separa hechos derivados de las respuestas e inferencias.
- Usa lenguaje sencillo, humano y directo.
- No recomiendes IA, automatizaciones, contenido, publicidad, CRM o una página web por defecto.
- Recomienda primero la intervención mínima que podría producir valor.
- No prometas resultados financieros.
- No uses lenguaje humillante ni hagas sentir incompetente al dueño.
- El resultado debe ser útil incluso si la persona no compra nada.
- Relaciona la solución recomendada con la fuga principal.

Devuelve exclusivamente JSON válido con esta estructura:
{
  "score": 0,
  "main_leak": "oferta|visibilidad|confianza|compra|seguimiento|operacion",
  "main_leak_label": "",
  "executive_reading": "",
  "evidence": ["", ""],
  "hypotheses": ["", ""],
  "secondary_leaks": ["", ""],
  "first_actions": ["", "", ""],
  "recommended_offer": "",
  "why_this_offer": "",
  "warning": "Este diagnóstico es una orientación inicial basada en tus respuestas."
}
```

### Fallback obligatorio

Si el servicio de IA falla, generar el resultado mediante un motor de puntuación local. La página nunca debe quedar bloqueada ni mostrar un error técnico al visitante.

Asignar pesos a las respuestas para las seis zonas. Seleccionar como fuga principal la zona con mayor puntuación negativa y como secundarias las dos siguientes.

## Pantalla de resultado

Mostrar:

1. Nombre del negocio.
2. Puntuación de claridad comercial sobre 100.
3. Fuga principal.
4. Lectura ejecutiva breve.
5. Evidencias encontradas en sus respuestas.
6. Hipótesis claramente identificadas como hipótesis.
7. Dos fugas secundarias.
8. Tres primeras acciones.
9. Solución recomendada.
10. Aviso de que es una orientación inicial y no una garantía.

Titular dinámico:

**Tu principal oportunidad está en [FUGA PRINCIPAL].**

No usar frases catastróficas. Hablar de prioridades y oportunidades de mejora.

## Mapeo de oferta posterior

- Oferta → **Revisión y plan de claridad**.
- Visibilidad → **Plan de captación inicial**.
- Confianza → **Sistema básico de confianza**.
- Compra → **Optimización del camino de compra**.
- Seguimiento → **Sistema de seguimiento**.
- Operación → **Solución operativa personalizada / Tu Primer Empleado IA**.

No presentar las seis ofertas al mismo tiempo. Mostrar solamente la solución relacionada con el diagnóstico.

## Convocatoria gratuita

Debajo del resultado mostrar:

**¿Quieres que trabajemos en esta fuga contigo?**

**Seleccionaremos 3 negocios para implementar gratuitamente su primera mejora y documentar el proceso.**

Botón:

**POSTULAR MI NEGOCIO →**

La postulación no debe decir “ganaste”, “fuiste seleccionado” ni “cupo asegurado”.

Crear una variable administrativa:

`FREE_CASES_OPEN=true|false`

Cuando esté en `true`, mostrar la convocatoria de los tres negocios.

Cuando esté en `false`, reemplazarla por:

**¿Quieres ayuda para corregir esta fuga? Solicita una revisión personalizada.**

Botón:

**QUIERO AYUDA CON MI RESULTADO →**

Así el diagnóstico seguirá generando prospectos después de completar los tres casos gratuitos.

## Integración con WhatsApp

Número de WhatsApp Business:

`+1 720 694 3519`

Usar enlace `wa.me` con mensaje dinámico precargado:

```text
Hola, York. Completé el diagnóstico gratuito de Digital Anyork.

Nombre: [NOMBRE]
Negocio: [NEGOCIO]
Ciudad: [CIUDAD]
Puntuación: [PUNTUACIÓN]/100
Fuga principal: [FUGA]
Solución recomendada: [OFERTA]

Quiero [postular mi negocio / recibir ayuda con mi resultado].
```

## Sección “Cómo funciona”

1. **Respondes:** siete preguntas sobre cómo vendes y atiendes.
2. **Recibes:** tu fuga principal y tres acciones concretas.
3. **Decides:** lo aplicas por tu cuenta o solicitas ayuda.

## Prueba y confianza

Preparar una sección oculta o fácil de activar para futuros casos reales. No inventar testimonios ni métricas.

Cuando existan resultados, permitir agregar:

- Nombre o sector del negocio.
- Situación inicial.
- Intervención realizada.
- Resultado medido.
- Testimonio autorizado.

Mientras no existan datos confirmados, no mostrar cifras como “150 diagnósticos” o “más de 100 clientes”.

## SEO y metadatos

Título:

**Diagnóstico Gratis para Pequeños Negocios | Digital Anyork LLC**

Descripción:

**Descubre qué debes mejorar primero en tu negocio. Recibe gratis un diagnóstico automatizado con tus prioridades y próximos pasos.**

Agregar Open Graph, favicon, vista previa social y datos básicos de organización. No usar palabras engañosas como resultados garantizados.

## Requisitos técnicos

- Carga rápida.
- Responsive en iPhone, Android, tablet y escritorio.
- Accesibilidad básica WCAG: contraste, foco visible, labels, navegación por teclado y botones de al menos 44 px.
- Barra de progreso.
- Guardado temporal de respuestas para evitar perderlas al actualizar.
- Validación de formularios.
- Mensajes de error humanos.
- Protección anti-spam discreta.
- Claves y llamadas de IA solamente en el servidor.
- Registro de leads persistente.
- Página de privacidad o aviso breve de tratamiento de datos.
- Analítica con eventos: `diagnostic_started`, `question_completed`, `lead_captured`, `diagnostic_completed`, `whatsapp_clicked` y `free_case_applied`.
- Conservar UTMs desde la llegada hasta el registro del lead.

## Criterios de aceptación

La página estará terminada solamente si:

- El visitante entiende en menos de cinco segundos qué recibirá.
- Puede completar el diagnóstico cómodamente desde un teléfono.
- El resultado cambia según sus respuestas.
- La IA no inventa hechos ni promete dinero.
- Existe fallback sin IA.
- El prospecto queda registrado antes del resultado completo.
- WhatsApp recibe el resumen correcto.
- La convocatoria de tres casos puede activarse o desactivarse sin rediseñar la página.
- Cuando la convocatoria esté cerrada, la página sigue ofreciendo una solución pagada relevante.
- No existen testimonios, métricas ni resultados falsos.
- La identidad visual coincide con Digital Anyork LLC: negro, blanco y verde neón premium.

Construye la experiencia completa, no un mockup. Entrega una landing funcional, lista para publicación y con instrucciones breves para configurar las variables de entorno, la base de leads, el proveedor de IA y el estado de la convocatoria gratuita.
