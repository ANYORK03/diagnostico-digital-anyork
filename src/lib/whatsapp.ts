const WHATSAPP_NUMBER = "17206943519"; // +1 720 694 3519

export function buildWhatsAppLink(params: {
  ownerName: string;
  businessName: string;
  city: string;
  score: number;
  mainLeakLabel: string;
  recommendedOffer: string;
  intent: "postular mi negocio" | "recibir ayuda con mi resultado";
}): string {
  const message = [
    "Hola, York. Completé el diagnóstico gratuito de Digital Anyork.",
    "",
    `Nombre: ${params.ownerName}`,
    `Negocio: ${params.businessName}`,
    `Ciudad: ${params.city}`,
    `Puntuación: ${params.score}/100`,
    `Fuga principal: ${params.mainLeakLabel}`,
    `Solución recomendada: ${params.recommendedOffer}`,
    "",
    `Quiero ${params.intent}.`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
