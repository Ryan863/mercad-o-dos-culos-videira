import { ArrowDown, ArrowUpRight, Camera, CheckCircle2, ShieldCheck, Sparkles, Star } from "lucide-react";
import HeroImage from "./HeroImage";
import { GOOGLE_REVIEWS_URL } from "@/lib/data";
import { PRESCRIPTION_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[90dvh] items-end overflow-hidden bg-[#FAF9F6] md:min-h-[660px] md:items-center lg:min-h-[calc(100dvh-72px)]"
    >
      {/* Imagem de Fundo de Alta Definição */}
      <HeroImage
        src="/hero-desktop.jpg"
        alt="Consultoria óptica e armações de grau no Mercadão dos Óculos Videira"
        className="hidden object-cover object-[80%_center] md:block"
        fallbackClassName="hidden md:block"
      />
      <HeroImage
        src="/hero-mobile.jpg"
        alt="Consultoria óptica e armações de grau no Mercadão dos Óculos Videira"
        className="block object-cover object-top md:hidden"
        fallbackClassName="md:hidden"
      />

      {/* Gradiente sutil de respiro (preserva a nitidez e o contraste natural da foto) */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 via-35% to-transparent md:block pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/85 via-45% to-transparent md:hidden pointer-events-none"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 pb-12 pt-20 sm:px-8 lg:px-12 md:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-[650px]">
          {/* Eyebrow Badge */}
          <div data-hero-item className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-stone-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span>Rede de Óticas · Videira, SC</span>
          </div>

          {/* Headline Editorial */}
          <h1
            id="hero-title"
            data-hero-item
            className="font-display text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.14]"
          >
            Enxergue o mundo com clareza, estilo e o melhor{" "}
            <span className="whitespace-nowrap font-semibold text-brand-deep underline decoration-brand/30 decoration-wavy decoration-1 underline-offset-8">
              custo-benefício
            </span>{" "}
            de Videira.
          </h1>

          {/* Subtítulo */}
          <p
            data-hero-item
            className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg sm:leading-relaxed"
          >
            Armações de grife e marca própria com preços justos de fábrica, lentes digitais de alta
            precisão e atendimento humanizado com ajustes e assistência técnica gratuitos no Centro.
          </p>

          {/* Ações Primárias (CTAs) */}
          <div data-hero-item className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <a
              href="#catalogo"
              className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_10px_25px_-5px_rgba(229,36,39,0.5)] transition-all duration-300 hover:bg-brand-deep hover:shadow-[0_14px_30px_-5px_rgba(229,36,39,0.65)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Explorar Catálogo
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappUrl(PRESCRIPTION_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-stone-300 bg-white/95 px-7 text-[15px] font-semibold text-ink shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:border-ink hover:bg-white hover:-translate-y-0.5 active:translate-y-0"
            >
              <Camera className="h-4.5 w-4.5 text-brand" aria-hidden="true" />
              Enviar Receita via WhatsApp
            </a>
          </div>

          {/* Prova Social Google 5.0 */}
          <div
            data-hero-item
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-sm"
          >
            <a
              href="#depoimentos"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-all hover:border-stone-300 hover:bg-white"
            >
              <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="font-semibold text-ink">5.0 no Google</span>
              <span className="text-xs text-mute hidden sm:inline">· Avaliações Verificadas</span>
            </a>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-deep underline-offset-4 hover:underline"
            >
              Ver avaliações no Google Maps
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Destaques de Confiança Editorial */}
          <div
            data-hero-item
            className="mt-8 grid grid-cols-1 gap-2.5 border-t border-stone-200/80 pt-6 sm:grid-cols-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-xs font-medium text-ink">Preços justos de fábrica</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-xs font-medium text-ink">Ajuste & ultrassom grátis</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-xs font-medium text-ink">Corte digital de lentes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
