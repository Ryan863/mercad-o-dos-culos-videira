import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { MAPS_URL, REVIEW_COUNT, STORE } from "@/lib/data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TITLE =
  "Mercadão dos Óculos Videira | Armações, Lentes e Óculos de Sol no Centro";
const DESCRIPTION =
  "Encontre armações modernas, óculos de grau e solar com preços de fábrica em Videira - SC. Atendimento especializado na Rua XV de Novembro, 421. Envie sua receita pelo WhatsApp!";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "ótica em Videira",
    "óculos de grau Videira",
    "óculos de sol Videira",
    "armações",
    "lentes oftálmicas",
    "Mercadão dos Óculos",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: STORE.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/hero-desktop.jpg",
        width: 1024,
        height: 572,
        alt: "Cliente usando armação de grau na ótica Mercadão dos Óculos Videira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-desktop.jpg"],
  },
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Optician", "LocalBusiness"],
  name: "Mercadão dos Óculos Videira",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/hero-desktop.jpg`,
  logo: `${SITE_URL}/logo.jpg`,
  telephone: "+5549998129293",
  email: STORE.email,
  hasMap: MAPS_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua XV de Novembro, 421",
    addressLocality: "Videira",
    addressRegion: "SC",
    postalCode: "89560-128",
    addressCountry: "BR",
  },
  openingHours: ["Mo-Fr 08:30-12:00 13:30-18:30", "Sa 08:30-12:00 13:30-16:00"],
  sameAs: [STORE.instagram, STORE.facebook, STORE.portal],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    reviewCount: String(REVIEW_COUNT),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
