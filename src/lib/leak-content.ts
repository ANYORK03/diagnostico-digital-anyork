import type { LeakArea } from "./types";

interface LeakContent {
  label: string;
  offer: string;
  whyOffer: string;
  actions: [string, string, string];
  hypotheses: [string, string];
  readingIntro: string;
}

export const LEAK_CONTENT: Record<LeakArea, LeakContent> = {
  oferta: {
    label: "tu oferta",
    offer: "Revisión y plan de claridad",
    whyOffer:
      "Como tu oferta es lo primero que confunde a un cliente nuevo, conviene ordenar qué vendes y a quién antes de invertir en cualquier otra cosa.",
    actions: [
      "Escribe en una sola frase qué vendes y para quién es ideal.",
      "Elige un solo producto o servicio para destacar esta semana.",
      "Pide a 3 personas cercanas que te digan qué entendieron de tu oferta.",
    ],
    hypotheses: [
      "Es posible que estés hablando de varias cosas a la vez y eso genere dudas.",
      "Podría ser que tu oferta cambie según con quién hablas, lo que resta claridad.",
    ],
    readingIntro:
      "hoy lo que más confunde a un cliente nuevo es entender qué vendes y por qué elegirte",
  },
  visibilidad: {
    label: "tu visibilidad",
    offer: "Plan de captación inicial",
    whyOffer:
      "Tu negocio necesita un canal de entrada de clientes más constante antes de mejorar cualquier otra parte del proceso.",
    actions: [
      "Elige un solo canal (por ejemplo Instagram o recomendaciones) y publica ahí de forma constante por dos semanas.",
      "Pide a tus clientes actuales que te recomienden con una persona específica.",
      "Anota de dónde llegó cada cliente nuevo durante los próximos 7 días.",
    ],
    hypotheses: [
      "Es posible que dependas de un solo canal poco predecible.",
      "Podría ser que no estés midiendo de dónde llegan realmente tus clientes.",
    ],
    readingIntro: "hoy no te está llegando suficiente gente nueva de forma constante",
  },
  confianza: {
    label: "la confianza que generas",
    offer: "Sistema básico de confianza",
    whyOffer:
      "Antes de atraer más tráfico, conviene mostrar pruebas reales que ayuden a un desconocido a decidirse por ti.",
    actions: [
      "Pide reseñas o fotos reales a tus últimos 5 clientes satisfechos.",
      "Organiza en un solo lugar las pruebas que ya tienes (fotos, mensajes, resultados).",
      "Comparte una historia real de un cliente esta semana.",
    ],
    hypotheses: [
      "Es posible que tengas buenos resultados, pero no los estés mostrando.",
      "Podría ser que un desconocido no tenga suficiente evidencia todavía para confiar en ti.",
    ],
    readingIntro: "hoy a un desconocido le falta evidencia real para confiar en ti",
  },
  compra: {
    label: "tu proceso de compra",
    offer: "Optimización del camino de compra",
    whyOffer:
      "Estás perdiendo personas interesadas justo en el momento en que quieren comprar, así que ese es el punto a corregir primero.",
    actions: [
      "Escribe de antemano la respuesta a las 3 preguntas que más te hacen (precio, horario, disponibilidad).",
      "Define un solo siguiente paso claro después de que alguien pregunta.",
      "Revisa cuánto tardas en responder y busca acortar ese tiempo.",
    ],
    hypotheses: [
      "Es posible que el proceso de compra dependa demasiado de tu disponibilidad.",
      "Podría ser que falte un paso claro entre \"preguntar\" y \"comprar\".",
    ],
    readingIntro: "hoy se pierden personas interesadas justo cuando quieren comprar",
  },
  seguimiento: {
    label: "tu seguimiento",
    offer: "Sistema de seguimiento",
    whyOffer:
      "Tienes personas interesadas que todavía no compraron, y recuperarlas puede valer más que buscar clientes nuevos.",
    actions: [
      "Haz una lista simple de las últimas 10 personas que preguntaron y no compraron.",
      "Escríbeles un mensaje corto y sin presión para retomar la conversación.",
      "Guarda cada nuevo contacto en un solo lugar (agenda, hoja o libreta).",
    ],
    hypotheses: [
      "Es posible que estés perdiendo ventas que ya estaban cerca de cerrarse.",
      "Podría ser que el interés exista, pero se diluya por falta de seguimiento.",
    ],
    readingIntro: "hoy se pierden personas interesadas por falta de seguimiento",
  },
  operacion: {
    label: "tu operación",
    offer: "Solución operativa personalizada / Tu Primer Empleado IA",
    whyOffer:
      "Tu negocio depende demasiado de ti en el día a día, así que primero conviene aliviar esa carga antes de buscar más clientes.",
    actions: [
      "Anota las 3 tareas que más tiempo te quitan cada semana.",
      "Identifica cuál de esas tareas podrías delegar o simplificar primero.",
      "Define con claridad cuántos clientes puedes atender bien hoy.",
    ],
    hypotheses: [
      "Es posible que el crecimiento actual dependa completamente de tu tiempo disponible.",
      "Podría ser que ya estés cerca del límite de lo que puedes sostener tú solo o sola.",
    ],
    readingIntro: "hoy tu operación depende demasiado de ti para poder crecer con calma",
  },
};
