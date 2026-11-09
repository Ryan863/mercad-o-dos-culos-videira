import { BadgeCheck, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { OTHER_REVIEWERS, REVIEWS } from "@/lib/data";

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="depoimentos-title"
          eyebrow="Avaliações no Google Maps"
          title="Nota 5.0 construída com clientes reais de Videira."
          description="Experiências verdadeiras de quem já passou pela nossa loja no Centro."
        />

        <div data-stagger className="grid gap-5 lg:grid-cols-3">
          <figure className="rounded-3xl border border-stone-200/70 bg-white p-7 shadow-sm lg:col-span-3 lg:p-10">
            <Stars />
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

        <p data-reveal className="mt-8 text-center text-sm text-mute">
          Também com 5 estrelas e elogios ao acolhimento e à pontualidade:{" "}
          <span className="font-medium text-ink">{OTHER_REVIEWERS.join(", ")}</span>.
        </p>
      </div>
    </section>
  );
}

