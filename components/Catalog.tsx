"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SearchX } from "lucide-react";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import { useMainRef } from "./PageShell";
import {
  CATEGORIES,
  PRODUCTS,
  SHAPES,
  type Category,
  type FaceShape,
} from "@/lib/data";

type CategoryFilter = Category | "todos";
type ShapeFilter = FaceShape | "todos";

const pill = (active: boolean) =>
  `inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
    active
      ? "border-ink bg-ink text-white"
      : "border-stone-300 bg-white text-ink hover:border-ink"
  }`;

export default function Catalog() {
  const mainRef = useMainRef();
  const [category, setCategory] = useState<CategoryFilter>("todos");
  const [shape, setShape] = useState<ShapeFilter>("todos");
  const firstRun = useRef(true);

  const filtered = PRODUCTS.filter(
    (p) =>
      (category === "todos" || p.category === category) &&
      (shape === "todos" || p.shape === shape),
  );

  // Reentrada suave dos cards ao trocar filtros (sem ScrollTrigger: já estão na tela).
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-card]", {
          y: 18,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.05,
          clearProps: "opacity,transform",
        });
      });
      return () => mm.revert();
    },
    { scope: mainRef, dependencies: [category, shape] },
  );

  return (
    <section
      id="catalogo"
      aria-labelledby="catalogo-title"
      className="scroll-mt-28 bg-paper py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          id="catalogo-title"
          eyebrow="Catálogo & vitrine"
          title="Armações selecionadas para o seu rosto e o seu estilo."
          description="Filtre por categoria e formato de rosto, escolha a cor e monte a sua sacola. Nossa equipe confirma a disponibilidade pelo WhatsApp."
        />

        <div data-reveal className="space-y-4">
          <div role="group" aria-label="Filtrar por categoria">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={category === c.id}
                  onClick={() => setCategory(c.id)}
                  className={pill(category === c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-label="Filtrar por formato de rosto">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
              Formato
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                aria-pressed={shape === "todos"}
                onClick={() => setShape("todos")}
                className={pill(shape === "todos")}
              >
                Todos os formatos
              </button>
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={shape === s.id}
                  onClick={() => setShape(s.id)}
                  className={pill(shape === s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-mute" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "modelo encontrado" : "modelos encontrados"}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <SearchX className="h-8 w-8 text-mute" aria-hidden="true" />
            <p className="font-display text-xl text-ink">Nenhum modelo com essa combinação</p>
            <p className="max-w-sm text-sm text-mute">
              Tente outro formato ou categoria. Também temos modelos que não estão no site: fale
              com a nossa equipe.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("todos");
                setShape("todos");
              }}
              className="mt-2 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

