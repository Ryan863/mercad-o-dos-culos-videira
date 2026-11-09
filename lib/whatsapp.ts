import { STORE } from "./data";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const PRESCRIPTION_MESSAGE =
  "Olá! Gostaria de enviar a foto da minha receita oftálmica para vocês orçarem a melhor lente para o meu grau.";

export const GENERAL_MESSAGE =
  "Olá, equipe do Mercadão dos Óculos Videira! Gostaria de falar com um consultor.";

export function availabilityMessage(modelName: string, colorName: string): string {
  return `Olá, equipe do Mercadão dos Óculos Videira! Gostaria de consultar a disponibilidade do modelo ${modelName} (Cor: ${colorName}).`;
}

export type CartMessageItem = { name: string; color: string };

export function cartMessage(items: CartMessageItem[], lenses: string[]): string {
  const lines: string[] = [
    "Olá, equipe do Mercadão dos Óculos Videira! Montei minha seleção pelo site e gostaria de verificar a disponibilidade:",
  ];
  for (const item of items) {
    lines.push(`- ${item.name} (Cor: ${item.color})`);
  }
  for (const lens of lenses) {
    lines.push(`- Tratamento de lente: ${lens}`);
  }
  lines.push(
    "Gostaria de agendar um horário para provar na loja da Rua XV de Novembro / enviar minha receita para cotação.",
  );
  return lines.join("\n");
}

