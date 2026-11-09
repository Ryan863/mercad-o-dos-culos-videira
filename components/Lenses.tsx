"use client";

import { Check, Droplets, Layers, Monitor, Plus, Sun, type LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useCart } from "@/lib/cart";
import { LENSES, LENS_INDEXES, type LensId } from "@/lib/data";

const ICONS: Record<LensId, LucideIcon> = {
  blue: Monitor,
  foto: Sun,
  multi: Layers,
  ar: Droplets,
};

export default function Lenses() {
  const { lenses, toggleLens } = useCart();

  return (
    <section
      id="lentes"
      aria-labelledby="lentes-title"
      className="relative isolate scroll-mt-28 overflow-hidden bg-paper-2 py-16 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          id="lentes-title"
          eyebrow="Lentes & saúde visual"
          title="A lente certa transforma a forma como você enxerga."
          description="Conheça os principais tratamentos e escolha o que combina com a sua rotina. A indicação final é feita pela nossa equipe a partir da sua receita."
        />

        <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LENSES.map((lens) => {
            const Icon = ICONS[lens.id];
            const active = lenses.includes(lens.id);
            return (
              <article
                key={lens.id}
                className="glass glass-sheen relative flex flex-col rounded-3xl p-6"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-brand shadow-sm ring-1 ring-inset ring-sky-400/20">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl leading-snug text-ink">{lens.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{lens.description}</p>
                <ul className="mb-6 mt-4 space-y-1.5 text-sm text-ink/80">
                  {lens.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleLens(lens.id)}
                  className={`mt-auto inline-flex min-h-11 items-center justify-center gap-2 self-stretch rounded-full border px-4 text-sm font-semibold transition-colors ${
                    active
                      ? "border-brand bg-brand text-white"
                      : "border-stone-300 bg-white/80 text-ink hover:border-ink"
                  }`}
                >
                  {active ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  )}
                  {active ? "Na minha sacola" : "Incluir na minha sacola"}
                </button>
              </article>
            );
          })}
        </div>

        <div data-reveal className="glass glass-sheen relative mt-8 rounded-3xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
            <div>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">
                Espessura da lente por índice de refração
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute sm:text-base">
                Quanto maior o índice, mais fina e leve é a lente para o mesmo grau. Para graus
                altos, lentes de alto índice deixam o óculos mais estético e confortável.
              </p>
              <p className="mt-3 text-xs text-mute">
                Comparativo ilustrativo. A indicação ideal depende do seu grau e da armação.
              </p>
            </div>

            <ul className="space-y-4" aria-label="Comparativo de espessura por índice">
              {LENS_INDEXES.map((item) => (
                <li key={item.index}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-ink">
                      {item.index} <span className="font-normal text-mute">· {item.label}</span>
                    </span>
                    <span className="text-xs text-mute">{item.note}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/70 ring-1 ring-inset ring-stone-200/80">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-200 to-white"
                      style={{ width: `${item.thickness}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
