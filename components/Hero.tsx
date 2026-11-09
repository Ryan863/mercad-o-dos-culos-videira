import { ArrowDown, Camera, Star } from "lucide-react";
import HeroImage from "./HeroImage";
import { PRESCRIPTION_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[90dvh] items-end overflow-hidden bg-paper md:min-h-[620px] md:items-center lg:min-h-[calc(100dvh-100px)]"
    >
      <HeroImage
        src="/hero-desktop.jpg"
        alt="Cliente de blazer de linho usando armação de grau na ótica Mercadão dos Óculos Videira"
        className="hidden object-cover object-right md:block"
        fallbackClassName="hidden md:block"
      />
      <HeroImage
        src="/hero-mobile.jpg"
        alt="Cliente de blazer de linho usando armação de grau na ótica Mercadão dos Óculos Videira"
        className="block object-cover object-top md:hidden"
        fallbackClassName="md:hidden"
      />

      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-[78%] bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/70 to-transparent md:hidden"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-20 sm:px-6 md:py-16">
        <div className="max-w-xl">
          <p
            data-hero-item
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Rede de Óticas · Videira, SC
          </p>

          <h1
            id="hero-title"
            data-hero-item
            className="font-display text-3xl font-medium leading-tight text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Enxergue o mundo com clareza, estilo e o melhor custo-benefício de Videira.
          </h1>

          <p
            data-hero-item
            className="mt-4 max-w-md text-base leading-relaxed text-pretty text-mute sm:text-lg"
          >
            Variedade de armações de alta durabilidade, óculos de grau e solares, e lentes
            oftálmicas computadorizadas com atendimento humanizado e ajustes gratuitos.
          </p>

          <div data-hero-item className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalogo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(229,36,39,0.7)] transition-colors hover:bg-brand-deep active:bg-brand-deep"
            >
              Explorar Catálogo
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappUrl(PRESCRIPTION_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/85 px-7 text-[15px] font-semibold text-ink backdrop-blur transition-colors hover:border-ink"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Enviar Receita via WhatsApp
            </a>
          </div>

          <p
            data-hero-item
            className="mt-6 flex items-center gap-2 text-sm text-ink/80"
          >
            <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
              <Star className="h-4 w-4 fill-current" />
            </span>
            <span>
              <strong className="font-semibold text-ink">5.0 no Google</strong> (Avaliações Reais de
              Clientes em Videira)
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

