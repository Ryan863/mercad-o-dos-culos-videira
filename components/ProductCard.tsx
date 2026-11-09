"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CATEGORIES, SHAPES, type Product } from "@/lib/data";
import { availabilityMessage, whatsappUrl } from "@/lib/whatsapp";

const shapeShortLabel = (id: Product["shape"]) =>
  SHAPES.find((s) => s.id === id)?.shortLabel ?? id;
const categoryLabel = (id: Product["category"]) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export default function ProductCard({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const { has, add, openCart } = useCart();
  const color = product.colors[colorIndex];
  const inBag = has(product.id, colorIndex);

  return (
    <article
      data-card
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300/90 hover:shadow-[0_20px_44px_-20px_rgba(0,0,0,0.16)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F3EF]">
        {product.tag ? (
          <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.tag}
          </span>
        ) : null}

        <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm backdrop-blur-md">
          <span
            className="h-2.5 w-2.5 rounded-full border border-black/15"
            style={{
              background: color.hex2
                ? `linear-gradient(135deg, ${color.hex}, ${color.hex2})`
                : color.hex,
            }}
          />
          {color.name}
        </span>

        <Image
          src={product.image}
          alt={`Armação ${product.name} - ${categoryLabel(product.category)} na cor ${color.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={color.imageFilter ? { filter: color.imageFilter } : undefined}
          className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-mute">
          <span className="truncate">
            {categoryLabel(product.category)} · {shapeShortLabel(product.shape)}
          </span>
          <span className="shrink-0 font-mono text-[10px] tracking-normal text-mute/80">
            {product.specs}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-2xl font-medium text-ink">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-mute">{product.blurb}</p>

        <dl className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
          <dt className="sr-only">Material</dt>
          <dd className="rounded-full border border-stone-200/80 bg-paper px-3 py-1 text-xs font-medium text-ink">
            {product.material}
          </dd>
          {product.sun || product.clip ? (
            <dd className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-900 ring-1 ring-inset ring-sky-200/80">
              Proteção UV400
            </dd>
          ) : null}
        </dl>

        <fieldset className="mt-4">
          <legend className="text-xs text-mute">
            Cor selecionada: <span className="font-semibold text-ink">{color.name}</span>
          </legend>
          <div className="mt-1 -ml-1.5 flex flex-wrap items-center">
            {product.colors.map((c, index) => {
              const selected = index === colorIndex;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIndex(index)}
                  aria-label={`Selecionar cor ${c.name}`}
                  aria-pressed={selected}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span
                    className={`block h-6 w-6 rounded-full border border-black/15 ring-offset-2 transition-all ${
                      selected ? "scale-110 ring-2 ring-ink" : "ring-0 hover:scale-105"
                    }`}
                    style={{
                      background: c.hex2
                        ? `linear-gradient(135deg, ${c.hex}, ${c.hex2})`
                        : c.hex,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-auto flex flex-col gap-2 pt-3">
          {inBag ? (
            <button
              type="button"
              onClick={openCart}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand bg-brand/5 px-4 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand/10"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Na sacola · Ver seleção
            </button>
          ) : (
            <button
              type="button"
              onClick={() => add(product.id, colorIndex)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep active:bg-brand-deep"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Provar na Loja
            </button>
          )}
          <a
            href={whatsappUrl(availabilityMessage(product.name, color.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 text-center text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-paper"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>Consultar Disponibilidade no WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
