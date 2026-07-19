import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: "etapa",
    order: 1,
    area: "contexto",
    areaLabel: "Etapa",
    title: "¿En qué etapa está tu negocio?",
    options: [
      {
        id: "a",
        label: "Estoy comenzando.",
        severity: 0,
        evidence: "Está en la etapa inicial de su negocio.",
      },
      {
        id: "b",
        label: "Ya vendo, pero de forma irregular.",
        severity: 0,
        evidence: "Ya vende, pero de forma irregular.",
      },
      {
        id: "c",
        label: "Vendo de forma constante.",
        severity: 0,
        evidence: "Ya tiene ventas constantes.",
      },
      {
        id: "d",
        label: "Tengo demanda, pero todo depende de mí.",
        severity: 0,
        evidence: "Tiene demanda, pero todo depende de él o ella.",
      },
    ],
  },
  {
    id: "oferta",
    order: 2,
    area: "oferta",
    areaLabel: "Oferta",
    title: "¿Una persona entiende rápidamente qué vendes y por qué elegirte?",
    options: [
      {
        id: "a",
        label: "Sí, está completamente claro.",
        severity: 0,
        evidence: "Su oferta es clara para quien la ve por primera vez.",
      },
      {
        id: "b",
        label: "Más o menos; todavía preguntan mucho.",
        severity: 1,
        evidence: "Los clientes todavía preguntan mucho antes de decidirse.",
      },
      {
        id: "c",
        label: "Tengo varios productos o servicios mezclados.",
        severity: 2,
        evidence: "Tiene varios productos o servicios mezclados sin un orden claro.",
      },
      {
        id: "d",
        label: "Aún estoy definiendo qué vender primero.",
        severity: 3,
        evidence: "Todavía está definiendo qué vender primero.",
      },
    ],
  },
  {
    id: "visibilidad",
    order: 3,
    area: "visibilidad",
    areaLabel: "Visibilidad",
    title: "¿De dónde llegan hoy la mayoría de tus clientes?",
    options: [
      {
        id: "a",
        label: "De un canal constante que puedo medir.",
        severity: 0,
        evidence: "Tiene un canal constante y medible de clientes.",
      },
      {
        id: "b",
        label: "De recomendaciones y conocidos.",
        severity: 1,
        evidence: "Depende principalmente de recomendaciones y conocidos.",
      },
      {
        id: "c",
        label: "De estados o redes, pero sin constancia.",
        severity: 2,
        evidence: "Usa estados o redes sociales, pero sin constancia.",
      },
      {
        id: "d",
        label: "Todavía casi no llegan clientes.",
        severity: 3,
        evidence: "Todavía casi no le llegan clientes nuevos.",
      },
    ],
  },
  {
    id: "confianza",
    order: 4,
    area: "confianza",
    areaLabel: "Confianza",
    title: "¿Tienes pruebas que ayuden a un desconocido a confiar en tu negocio?",
    options: [
      {
        id: "a",
        label: "Sí: reseñas, resultados y fotos reales.",
        severity: 0,
        evidence: "Cuenta con reseñas, resultados y fotos reales.",
      },
      {
        id: "b",
        label: "Tengo algunas, pero están desorganizadas.",
        severity: 1,
        evidence: "Tiene pruebas de confianza, pero están desorganizadas.",
      },
      {
        id: "c",
        label: "Solo tengo publicaciones del producto.",
        severity: 2,
        evidence: "Solo cuenta con publicaciones del producto, sin evidencia de resultados.",
      },
      {
        id: "d",
        label: "Todavía no tengo testimonios ni pruebas.",
        severity: 3,
        evidence: "Todavía no tiene testimonios ni pruebas visibles.",
      },
    ],
  },
  {
    id: "compra",
    order: 5,
    area: "compra",
    areaLabel: "Compra",
    title: "¿Qué ocurre cuando alguien quiere comprar o pedir información?",
    options: [
      {
        id: "a",
        label: "Tiene un camino claro y compra rápido.",
        severity: 0,
        evidence: "El camino de compra es claro y rápido.",
      },
      {
        id: "b",
        label: "Debe preguntar precios, horarios o disponibilidad.",
        severity: 1,
        evidence: "El cliente debe preguntar precios, horarios o disponibilidad.",
      },
      {
        id: "c",
        label: "La conversación se alarga y muchos desaparecen.",
        severity: 2,
        evidence: "La conversación de venta se alarga y muchos clientes desaparecen.",
      },
      {
        id: "d",
        label: "No tengo un proceso definido.",
        severity: 3,
        evidence: "No tiene un proceso de compra definido.",
      },
    ],
  },
  {
    id: "seguimiento",
    order: 6,
    area: "seguimiento",
    areaLabel: "Seguimiento",
    title: "¿Qué haces con las personas que preguntan y no compran?",
    options: [
      {
        id: "a",
        label: "Las registro y les doy seguimiento.",
        severity: 0,
        evidence: "Registra y da seguimiento a quienes preguntan y no compran.",
      },
      {
        id: "b",
        label: "A veces vuelvo a escribirles.",
        severity: 1,
        evidence: "Solo a veces vuelve a escribirle a quien preguntó.",
      },
      {
        id: "c",
        label: "Quedan perdidas en WhatsApp o Instagram.",
        severity: 2,
        evidence: "Las personas que preguntan quedan perdidas en WhatsApp o Instagram.",
      },
      {
        id: "d",
        label: "Nunca les doy seguimiento.",
        severity: 3,
        evidence: "Nunca da seguimiento a quienes preguntan y no compran.",
      },
    ],
  },
  {
    id: "operacion",
    order: 7,
    area: "operacion",
    areaLabel: "Operación",
    title: "Si mañana llegan diez clientes nuevos, ¿podrías atenderlos bien?",
    options: [
      {
        id: "a",
        label: "Sí, tengo capacidad y un proceso claro.",
        severity: 0,
        evidence: "Tiene capacidad y un proceso claro para atender más clientes.",
      },
      {
        id: "b",
        label: "Sí, pero tendría que improvisar.",
        severity: 1,
        evidence: "Podría atenderlos, pero tendría que improvisar.",
      },
      {
        id: "c",
        label: "Me retrasaría o bajaría la calidad.",
        severity: 2,
        evidence: "Un aumento de clientes le retrasaría o bajaría la calidad de su servicio.",
      },
      {
        id: "d",
        label: "Todo depende de mí y ya estoy saturado.",
        severity: 3,
        evidence: "Todo depende de él o ella y ya está saturado.",
      },
    ],
  },
];

export const AREAS_STRIP = [
  "Oferta",
  "Visibilidad",
  "Confianza",
  "Compra",
  "Seguimiento",
  "Operación",
];
