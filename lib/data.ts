export const STORE = {
  name: "Mercadão dos Óculos Videira",
  legalName: "Rede de Óticas Mercadão dos Óculos - Videira",
  streetAddress: "Rua XV de Novembro, 421",
  neighborhood: "Centro",
  city: "Videira",
  state: "SC",
  postalCode: "89560-128",
  plusCode: "XRWV+96 Centro",
  addressLine: "Rua XV de Novembro, 421 - Centro, Videira - SC",
  whatsappNumber: "5549998129293",
  whatsappDisplay: "(49) 99812-9293",
  phoneSecondaryNumber: "5549999077374",
  phoneSecondaryDisplay: "(49) 99907-7374",
  email: "sc-videira@mercadaodosoculos.com.br",
  portal: "https://www.mercadaodosoculos.com.br",
  portalDisplay: "www.mercadaodosoculos.com.br",
  instagram: "https://www.instagram.com/mercadaodosoculosvideira/",
  instagramHandle: "@mercadaodosoculosvideira",
  facebook: "https://www.facebook.com/mercadaodosoculosvideira/",
} as const;

const MAPS_QUERY = encodeURIComponent(
  "Rua XV de Novembro, 421, Centro, Videira, SC, 89560-128",
);

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const WAZE_URL = `https://waze.com/ul?q=${MAPS_QUERY}&navigate=yes`;

export type OpeningSlot = {
  label: string;
  /** 0 = domingo ... 6 = sábado */
  days: number[];
  periods: [string, string][];
  text: string;
};

export const OPENING_HOURS: OpeningSlot[] = [
  {
    label: "Segunda a Sexta",
    days: [1, 2, 3, 4, 5],
    periods: [
      ["08:30", "12:00"],
      ["13:30", "18:30"],
    ],
    text: "08:30 às 12:00 e 13:30 às 18:30",
  },
  {
    label: "Sábado",
    days: [6],
    periods: [
      ["08:30", "12:00"],
      ["13:30", "16:00"],
    ],
    text: "08:30 às 12:00 e 13:30 às 16:00",
  },
  {
    label: "Domingo",
    days: [0],
    periods: [],
    text: "Fechado",
  },
];

export const NAV_LINKS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#lentes", label: "Lentes" },
  { href: "#receita", label: "Receita" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#loja", label: "Loja" },
] as const;

/* ------------------------------------------------------------------ */
/* Catálogo                                                            */
/* ------------------------------------------------------------------ */

export type Category =
  | "grau-feminino"
  | "grau-masculino"
  | "solar"
  | "infantil"
  | "clip-on";

export type FaceShape = "quadrado" | "redondo" | "oval" | "aviador" | "gatinho";

export const CATEGORIES: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "grau-feminino", label: "Grau Feminino" },
  { id: "grau-masculino", label: "Grau Masculino" },
  { id: "solar", label: "Solar" },
  { id: "infantil", label: "Infantil" },
  { id: "clip-on", label: "Linha Clip-On" },
];

export const SHAPES: { id: FaceShape; label: string }[] = [
  { id: "quadrado", label: "Quadrado" },
  { id: "redondo", label: "Redondo" },
  { id: "oval", label: "Oval" },
  { id: "aviador", label: "Aviador" },
  { id: "gatinho", label: "Gatinho (Cat Eye)" },
];

export type Tag = "Lançamento" | "Mais Vendido" | "Clip-on 2 em 1";

export type FrameColor = {
  name: string;
  hex: string;
  /** Segunda cor para efeito tartaruga / degradê. */
  hex2?: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  shape: FaceShape;
  material: "Acetato Italiano" | "Titânio" | "Metal Leve" | "Acetato Flexível";
  tag?: Tag;
  sun?: boolean;
  clip?: boolean;
  kids?: boolean;
  /** Cor da lente (solar / clip-on). */
  lensTint?: string;
  colors: FrameColor[];
  blurb: string;
};

const TARTARUGA: FrameColor = { name: "Tartaruga", hex: "#6B3F18", hex2: "#C58B3A" };

export const PRODUCTS: Product[] = [
  {
    id: "aurora",
    name: "Aurora",
    category: "grau-feminino",
    shape: "gatinho",
    material: "Acetato Italiano",
    tag: "Lançamento",
    colors: [
      TARTARUGA,
      { name: "Vinho", hex: "#6B1F2E" },
      { name: "Preto", hex: "#1B1B1D" },
    ],
    blurb: "Cantos elevados que alongam o olhar com leveza.",
  },
  {
    id: "lumen",
    name: "Lúmen",
    category: "grau-feminino",
    shape: "redondo",
    material: "Metal Leve",
    tag: "Mais Vendido",
    colors: [
      { name: "Dourado", hex: "#C9A24B" },
      { name: "Prata", hex: "#B3B8BF" },
      { name: "Rosé", hex: "#C99A8B" },
    ],
    blurb: "Aro fino e luminoso para o uso diário.",
  },
  {
    id: "vitta",
    name: "Vitta",
    category: "grau-feminino",
    shape: "oval",
    material: "Acetato Italiano",
    colors: [
      { name: "Nude", hex: "#D6B49B" },
      { name: "Azul-petróleo", hex: "#1F4E5F" },
      TARTARUGA,
    ],
    blurb: "Oval suave, discreta e fácil de combinar.",
  },
  {
    id: "sereno",
    name: "Sereno",
    category: "grau-masculino",
    shape: "quadrado",
    material: "Acetato Italiano",
    tag: "Mais Vendido",
    colors: [
      { name: "Preto", hex: "#1B1B1D" },
      { name: "Azul-marinho", hex: "#1E2B4A" },
      { name: "Grafite", hex: "#4A4D52" },
    ],
    blurb: "Clássico marcante, ideal para o dia a dia profissional.",
  },
  {
    id: "atlas",
    name: "Atlas",
    category: "grau-masculino",
    shape: "quadrado",
    material: "Titânio",
    tag: "Lançamento",
    colors: [
      { name: "Grafite", hex: "#55595E" },
      { name: "Prata", hex: "#B3B8BF" },
      { name: "Dourado", hex: "#B8944A" },
    ],
    blurb: "Ultraleve e resistente, com acabamento fino.",
  },
  {
    id: "marco",
    name: "Marco",
    category: "grau-masculino",
    shape: "redondo",
    material: "Metal Leve",
    colors: [
      { name: "Chumbo", hex: "#4F5358" },
      { name: "Dourado", hex: "#C9A24B" },
    ],
    blurb: "Redondo intelectual com ponte confortável.",
  },
  {
    id: "horizonte",
    name: "Horizonte",
    category: "solar",
    shape: "aviador",
    material: "Metal Leve",
    tag: "Mais Vendido",
    sun: true,
    lensTint: "#3C4A3A",
    colors: [
      { name: "Dourado", hex: "#C9A24B" },
      { name: "Prata", hex: "#B3B8BF" },
      { name: "Preto", hex: "#26262A" },
    ],
    blurb: "O aviador atemporal com proteção UV.",
  },
  {
    id: "riviera",
    name: "Riviera",
    category: "solar",
    shape: "gatinho",
    material: "Acetato Italiano",
    tag: "Lançamento",
    sun: true,
    lensTint: "#4A3524",
    colors: [TARTARUGA, { name: "Preto", hex: "#1B1B1D" }],
    blurb: "Glamour de verão com lentes degradê.",
  },
  {
    id: "costa",
    name: "Costa",
    category: "solar",
    shape: "quadrado",
    material: "Acetato Italiano",
    sun: true,
    lensTint: "#23262B",
    colors: [
      { name: "Preto", hex: "#1B1B1D" },
      TARTARUGA,
      { name: "Azul-marinho", hex: "#1E2B4A" },
    ],
    blurb: "Presença forte, conforto o dia todo.",
  },
  {
    id: "pipa",
    name: "Pipa",
    category: "infantil",
    shape: "redondo",
    material: "Acetato Flexível",
    kids: true,
    colors: [
      { name: "Azul", hex: "#2F6FD0" },
      { name: "Rosa", hex: "#E2799B" },
      { name: "Verde", hex: "#3FA26B" },
    ],
    blurb: "Flexível e resistente para brincar sem medo.",
  },
  {
    id: "tuca",
    name: "Tuca",
    category: "infantil",
    shape: "quadrado",
    material: "Acetato Flexível",
    tag: "Mais Vendido",
    kids: true,
    colors: [
      { name: "Vermelho", hex: "#E52427" },
      { name: "Azul-marinho", hex: "#1E2B4A" },
      { name: "Roxo", hex: "#7A4FC0" },
    ],
    blurb: "Divertida, leve e ajustável ao rosto pequeno.",
  },
  {
    id: "duo-quadrado",
    name: "Duo Quadrado",
    category: "clip-on",
    shape: "quadrado",
    material: "Acetato Italiano",
    tag: "Clip-on 2 em 1",
    clip: true,
    lensTint: "#1E2024",
    colors: [{ name: "Preto", hex: "#1B1B1D" }, TARTARUGA],
    blurb: "Armação de grau com clip solar magnético.",
  },
  {
    id: "duo-aviador",
    name: "Duo Aviador",
    category: "clip-on",
    shape: "aviador",
    material: "Metal Leve",
    tag: "Clip-on 2 em 1",
    clip: true,
    lensTint: "#2A3A2E",
    colors: [
      { name: "Dourado", hex: "#C9A24B" },
      { name: "Prata", hex: "#B3B8BF" },
    ],
    blurb: "Dois óculos em um: grau e sol sem trocar de armação.",
  },
  {
    id: "duo-redondo",
    name: "Duo Redondo",
    category: "clip-on",
    shape: "redondo",
    material: "Metal Leve",
    tag: "Clip-on 2 em 1",
    clip: true,
    lensTint: "#2B2420",
    colors: [
      { name: "Dourado", hex: "#C9A24B" },
      { name: "Chumbo", hex: "#4F5358" },
    ],
    blurb: "Estilo retrô com versatilidade total.",
  },
];

/* ------------------------------------------------------------------ */
/* Lentes                                                              */
/* ------------------------------------------------------------------ */

export type LensId = "blue" | "foto" | "multi" | "ar";

export type Lens = {
  id: LensId;
  name: string;
  short: string;
  description: string;
  bullets: string[];
};

export const LENSES: Lens[] = [
  {
    id: "blue",
    name: "Lentes com Filtro Luz Azul (Blue Protect)",
    short: "Blue Protect",
    description:
      "Conforto para quem trabalha em telas e computador, reduzindo o cansaço visual ao fim do dia.",
    bullets: ["Ideal para computador e celular", "Uso diário em ambientes internos"],
  },
  {
    id: "foto",
    name: "Lentes Fotossensíveis (Transitions)",
    short: "Fotossensível",
    description:
      "Escurecem ao sol e ficam transparentes em ambientes internos, em um só par de óculos.",
    bullets: ["Proteção UV contínua", "Um único óculos para dentro e fora de casa"],
  },
  {
    id: "multi",
    name: "Lentes Multifocais Digitais",
    short: "Multifocal Digital",
    description:
      "Visão nítida para perto, meia distância e longe, sem linhas divisórias.",
    bullets: ["Transição natural entre distâncias", "Visual discreto, sem linha aparente"],
  },
  {
    id: "ar",
    name: "Antirreflexo Premium",
    short: "Antirreflexo",
    description:
      "Elimina reflexos noturnos, protege contra riscos e repele poeira e água.",
    bullets: ["Mais nitidez ao dirigir à noite", "Limpeza mais fácil, menos marcas"],
  },
];

export type Index = {
  index: string;
  label: string;
  /** Espessura relativa (0-100) para o comparativo visual. */
  thickness: number;
  note: string;
};

export const LENS_INDEXES: Index[] = [
  { index: "1.50", label: "Padrão", thickness: 100, note: "Graus baixos" },
  { index: "1.56", label: "Fina", thickness: 84, note: "Graus leves a médios" },
  { index: "1.61", label: "Mais fina", thickness: 68, note: "Graus médios" },
  { index: "1.67", label: "Ultrafina", thickness: 54, note: "Graus altos" },
  { index: "1.74", label: "Super ultrafina", thickness: 42, note: "Graus muito altos" },
];

/* ------------------------------------------------------------------ */
/* Depoimentos                                                         */
/* ------------------------------------------------------------------ */

export type Review = {
  name: string;
  badge?: string;
  text: string;
  highlight?: boolean;
};

export const REVIEWS: Review[] = [
  {
    name: "Edison Leal",
    badge: "Local Guide",
    highlight: true,
    text: "Estou em viagem por SC. Meu óculos ficou torto em meu rosto. Tive que ajustá-lo. Passei no Mercadão dos Óculos em Videira. Gostaria de ressaltar a educação, simpatia, explicações e todo adjetivo benéfico e positivo de toda a equipe...",
  },
  {
    name: "Gabriela Francine Trindade",
    text: "Ótima loja. Com bastante variedade e ótimos preços.",
  },
  { name: "Kin Kopp", text: "Loja muito organizada e ótimo atendimento." },
  { name: "Adriele Sotel", text: "Bom atendimento, muito organizado." },
];

export const OTHER_REVIEWERS = [
  "Pedro Carneiro",
  "nil Freiheit",
  "Aninha Correa",
  "Phaty Prado",
];

export const REVIEW_COUNT = REVIEWS.length + OTHER_REVIEWERS.length;

