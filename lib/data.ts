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
  "Mercadão dos Óculos Rua XV de Novembro, 421, Centro, Videira, SC, 89560-128",
);

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const GOOGLE_REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Mercadão dos Óculos Videira Rua XV de Novembro 421",
)}`;
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

export const SHAPES: { id: FaceShape; label: string; shortLabel: string }[] = [
  { id: "quadrado", label: "Quadrado", shortLabel: "Quadrado" },
  { id: "redondo", label: "Redondo", shortLabel: "Redondo" },
  { id: "oval", label: "Oval", shortLabel: "Oval" },
  { id: "aviador", label: "Aviador", shortLabel: "Aviador" },
  { id: "gatinho", label: "Gatinho (Cat Eye)", shortLabel: "Gatinho" },
];

export type Tag = "Lançamento" | "Mais Vendido" | "Clip-on 2 em 1";

export type FrameColor = {
  name: string;
  hex: string;
  /** Segunda cor para efeito tartaruga / degradê. */
  hex2?: string;
  /** Filtro sutil de matiz/brilho para pré-visualizar variação cromática na foto. */
  imageFilter?: string;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  specs: string;
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

const TARTARUGA: FrameColor = {
  name: "Tartaruga",
  hex: "#6B3F18",
  hex2: "#C58B3A",
};

export const PRODUCTS: Product[] = [
  {
    id: "aurora",
    name: "Aurora",
    image: "/products/aurora.jpg",
    specs: "53□17 · 142mm",
    category: "grau-feminino",
    shape: "gatinho",
    material: "Acetato Italiano",
    tag: "Lançamento",
    colors: [
      TARTARUGA,
      {
        name: "Vinho Imperial",
        hex: "#6B1F2E",
        imageFilter: "hue-rotate(-28deg) saturate(1.15) contrast(1.03)",
      },
      {
        name: "Preto Obsidiana",
        hex: "#1B1B1D",
        imageFilter: "saturate(0.15) contrast(1.12) brightness(0.95)",
      },
    ],
    blurb: "Cantos elevados em acetato tartaruga que valorizam e iluminam o olhar.",
  },
  {
    id: "lumen",
    name: "Lúmen",
    image: "/products/lumen.jpg",
    specs: "49□20 · 140mm",
    category: "grau-feminino",
    shape: "redondo",
    material: "Metal Leve",
    tag: "Mais Vendido",
    colors: [
      { name: "Dourado Champagne", hex: "#C9A24B" },
      {
        name: "Prata Polido",
        hex: "#B3B8BF",
        imageFilter: "saturate(0.18) brightness(1.03) contrast(1.04)",
      },
      {
        name: "Rosé Gold",
        hex: "#C99A8B",
        imageFilter: "hue-rotate(-18deg) saturate(1.18)",
      },
    ],
    blurb: "Aro fino com gravação botânica na ponte e leveza extrema para o uso diário.",
  },
  {
    id: "vitta",
    name: "Vitta",
    image: "/products/vitta.jpg",
    specs: "50□19 · 140mm",
    category: "grau-feminino",
    shape: "oval",
    material: "Acetato Italiano",
    colors: [
      { name: "Mel Translúcido", hex: "#D6B49B" },
      {
        name: "Âmbar Havana",
        hex: "#8B5A2B",
        imageFilter: " saturate(1.25) brightness(0.94) contrast(1.06)",
      },
      {
        name: "Cristal Champagne",
        hex: "#E5D8C8",
        imageFilter: "saturate(0.55) brightness(1.05)",
      },
    ],
    blurb: "Silhueta oval translúcida que suaviza os traços com elegância natural.",
  },
  {
    id: "sereno",
    name: "Sereno",
    image: "/products/sereno.jpg",
    specs: "54□18 · 145mm",
    category: "grau-masculino",
    shape: "quadrado",
    material: "Acetato Italiano",
    tag: "Mais Vendido",
    colors: [
      { name: "Preto Piano", hex: "#1B1B1D" },
      {
        name: "Azul Noturno",
        hex: "#1E2B4A",
        imageFilter: "hue-rotate(190deg) saturate(1.4) brightness(1.03)",
      },
      {
        name: "Grafite Fumê",
        hex: "#4A4D52",
        imageFilter: "brightness(1.08) contrast(0.94)",
      },
    ],
    blurb: "Arquitetura clássica marcante com rebites prateados e encaixe anatômico.",
  },
  {
    id: "atlas",
    name: "Atlas",
    image: "/products/atlas.jpg",
    specs: "55□17 · 145mm",
    category: "grau-masculino",
    shape: "quadrado",
    material: "Titânio",
    tag: "Lançamento",
    colors: [
      { name: "Grafite Escovado", hex: "#55595E" },
      {
        name: "Prata Titânio",
        hex: "#B3B8BF",
        imageFilter: "brightness(1.06) contrast(1.02)",
      },
      {
        name: "Dourado Fosco",
        hex: "#B8944A",
        imageFilter: "sepia(0.32) saturate(1.3)",
      },
    ],
    blurb: "Estrutura em titânio puro ultraleve: resistência superior sem pesar no rosto.",
  },
  {
    id: "marco",
    name: "Marco",
    image: "/products/marco.jpg",
    specs: "50□21 · 144mm",
    category: "grau-masculino",
    shape: "redondo",
    material: "Metal Leve",
    colors: [
      { name: "Chumbo & Ouro", hex: "#4F5358", hex2: "#C9A24B" },
      {
        name: "Dourado Clássico",
        hex: "#C9A24B",
        imageFilter: "sepia(0.25) saturate(1.25)",
      },
    ],
    blurb: "Design P3 intelectual com ponte trabalhada em tom dourado escovado.",
  },
  {
    id: "horizonte",
    name: "Horizonte",
    image: "/products/horizonte.jpg",
    specs: "58□14 · 140mm",
    category: "solar",
    shape: "aviador",
    material: "Metal Leve",
    tag: "Mais Vendido",
    sun: true,
    lensTint: "#3C4A3A",
    colors: [
      { name: "Dourado · Lente G15", hex: "#C9A24B", hex2: "#3C4A3A" },
      {
        name: "Prata · Lente Grafite",
        hex: "#B3B8BF",
        imageFilter: "saturate(0.3) contrast(1.05)",
      },
      {
        name: "Bronze · Lente Marrom",
        hex: "#8A6236",
        imageFilter: "hue-rotate(-22deg) saturate(1.15)",
      },
    ],
    blurb: "O aviador de ponte dupla com lentes solares polarizadas e proteção UV400.",
  },
  {
    id: "riviera",
    name: "Riviera",
    image: "/products/riviera.jpg",
    specs: "54□18 · 142mm",
    category: "solar",
    shape: "gatinho",
    material: "Acetato Italiano",
    tag: "Lançamento",
    sun: true,
    lensTint: "#4A3524",
    colors: [
      { name: "Tartaruga · Degradê Marrom", hex: "#6B3F18", hex2: "#C58B3A" },
      {
        name: "Preto · Fumê Intenso",
        hex: "#1B1B1D",
        imageFilter: "saturate(0.18) contrast(1.1)",
      },
    ],
    blurb: "Sofisticação europeia com lentes marrom degradê e proteção UV400 total.",
  },
  {
    id: "costa",
    name: "Costa",
    image: "/products/costa.jpg",
    specs: "54□19 · 145mm",
    category: "solar",
    shape: "quadrado",
    material: "Acetato Italiano",
    sun: true,
    lensTint: "#23262B",
    colors: [
      { name: "Preto · Polarizado", hex: "#1B1B1D" },
      {
        name: "Havana Escuro",
        hex: "#5A381E",
        imageFilter: "sepia(0.28) saturate(1.3)",
      },
    ],
    blurb: "Presença imponente com lentes polarizadas antirreflexo para dirigir com conforto.",
  },
  {
    id: "pipa",
    name: "Pipa Flex",
    image: "/products/pipa.jpg",
    specs: "45□16 · 130mm",
    category: "infantil",
    shape: "redondo",
    material: "Acetato Flexível",
    kids: true,
    colors: [
      { name: "Azul Céu & Coral", hex: "#63A9E2", hex2: "#F06B6B" },
      {
        name: "Lilás & Rosa",
        hex: "#9B7EDE",
        imageFilter: "hue-rotate(48deg) saturate(1.1)",
      },
      {
        name: "Verde Menta & Azul",
        hex: "#3FA26B",
        imageFilter: "hue-rotate(-45deg) saturate(1.05)",
      },
    ],
    blurb: "Material TR90 superflexível e antialérgico para brincar e estudar com segurança.",
  },
  {
    id: "tuca",
    name: "Tuca Explorer",
    image: "/products/tuca.jpg",
    specs: "46□16 · 132mm",
    category: "infantil",
    shape: "quadrado",
    material: "Acetato Flexível",
    tag: "Mais Vendido",
    kids: true,
    colors: [
      { name: "Marinho & Vermelho", hex: "#1E2B4A", hex2: "#E52427" },
      {
        name: "Azul Royal & Laranja",
        hex: "#2563EB",
        imageFilter: "hue-rotate(18deg) saturate(1.2)",
      },
    ],
    blurb: "Hastes emborrachadas anatômicas que abraçam o rosto infantil sem escorregar.",
  },
  {
    id: "duo-quadrado",
    name: "Duo Urbano 2 em 1",
    image: "/products/duo-quadrado.jpg",
    specs: "54□18 · 143mm",
    category: "clip-on",
    shape: "quadrado",
    material: "Acetato Italiano",
    tag: "Clip-on 2 em 1",
    clip: true,
    lensTint: "#1E2024",
    colors: [
      { name: "Preto Fosco + Clip Polarizado", hex: "#1B1B1D" },
      {
        name: "Grafite + Clip G15",
        hex: "#4A4D52",
        imageFilter: "brightness(1.06) contrast(0.95)",
      },
    ],
    blurb: "Armação de grau com clip solar magnético polarizado: praticidade em um clique.",
  },
  {
    id: "duo-aviador",
    name: "Duo Aviador 2 em 1",
    image: "/products/duo-aviador.jpg",
    specs: "56□16 · 142mm",
    category: "clip-on",
    shape: "aviador",
    material: "Metal Leve",
    tag: "Clip-on 2 em 1",
    clip: true,
    lensTint: "#2A3A2E",
    colors: [
      { name: "Dourado + Clip Verde G15", hex: "#C9A24B", hex2: "#2E4A36" },
      {
        name: "Prata + Clip Fumê",
        hex: "#B3B8BF",
        imageFilter: "saturate(0.25) contrast(1.05)",
      },
    ],
    blurb: "Dois óculos em um: elegância do metal no escritório e proteção solar na rua.",
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
