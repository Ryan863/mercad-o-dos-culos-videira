import { ArrowUpRight, BadgeCheck, MapPin, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { GOOGLE_REVIEWS_URL, OTHER_REVIEWERS, REVIEWS } from "@/lib/data";

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-amber-500" role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
    </div>
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

export default function Reviews() {
  const [featured, ...rest] = REVIEWS;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="scroll-mt-28 bg-paper-2 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="depoimentos-title"
            eyebrow="Avaliações no Google Maps"
            title="Nota 5.0 construída com clientes reais de Videira."
            description="Experiências verdadeiras de quem já passou pela nossa loja na Rua XV de Novembro."
          />

          <div data-reveal className="mb-10 shrink-0 sm:mb-14">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-stone-300 bg-white px-6 text-sm font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
            >
              <span className="flex items-center gap-0.5 text-amber-500" aria-hidden="true">
                <Star className="h-4 w-4 fill-current" />
              </span>
              Ver Avaliações Reais no Google
              <ArrowUpRight className="h-4 w-4 text-brand" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div data-stagger className="grid gap-5 lg:grid-cols-3">
          <figure className="rounded-3xl border border-stone-200/70 bg-white p-7 shadow-sm lg:col-span-3 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Stars />
              <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-mute">
                Avaliação pública no Google Maps
              </span>
            </div>
            <blockquote className="mt-4 font-display text-xl leading-relaxed text-ink sm:text-2xl lg:text-3xl">
              “{featured.text}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {initials(featured.name)}
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  {featured.name}
                  <BadgeCheck className="h-4 w-4 text-sky-500" aria-label="Avaliação verificada" />
                </span>
                <span className="text-sm text-mute">{featured.badge} · Google Maps</span>
              </span>
            </figcaption>
          </figure>

          {rest.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-3xl border border-stone-200/70 bg-white p-6 shadow-sm"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                  {initials(review.name)}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  {review.name}
                  <BadgeCheck className="h-4 w-4 text-sky-500" aria-label="Avaliação verificada" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          data-reveal
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-stone-200/80 bg-white p-6 text-center shadow-sm sm:flex-row sm:px-8 sm:text-left"
        >
          <div>
            <p className="text-sm text-mute">
              Também com <strong className="font-semibold text-ink">5 estrelas (★★★★★)</strong> e
              elogios ao acolhimento e à pontualidade:{" "}
              <span className="font-semibold text-ink">{OTHER_REVIEWERS.join(", ")}</span>.
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-mute sm:justify-start">
              <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              Mercadão dos Óculos · Rua XV de Novembro, 421 - Centro, Videira - SC
            </p>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep"
          >
            Ir para Avaliações Reais no Google Maps
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
