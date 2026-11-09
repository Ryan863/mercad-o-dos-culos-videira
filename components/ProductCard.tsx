"use client";

import { useState } from "react";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import FrameArt from "./FrameArt";
import { useCart } from "@/lib/cart";
import { CATEGORIES, SHAPES, type Product } from "@/lib/data";
import { availabilityMessage, whatsappUrl } from "@/lib/whatsapp";

const shapeLabel = (id: Product["shape"]) => SHAPES.find((s) => s.id === id)?.label ?? id;
const categoryLabel = (id: Product["category"]) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export default function ProductCard({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const { has, add, openCart } = useCart();
  const color = product.colors[colorIndex];
  const inBag = has(product.id, colorIndex);
  const metal = product.material === "Metal Leve" || product.material === "Titânio";

  return (
    <article
      data-card
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]"
    >
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FBFAF8] to-[#F1EEE8]">
        {product.tag ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {product.tag}
          </span>
        ) : null}
        <div className="flex aspect-[4/3] items-center justify-center p-6">
          <FrameArt
            shape={product.shape}
            color={color}
            metal={metal}
            sun={product.sun}
            clip={product.clip}
            kids={product.kids}
            lensTint={product.lensTint}
            className="w-full max-w-[260px] transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mute">
          {categoryLabel(product.category)} · {shapeLabel(product.shape)}
        </p>
        <h3 className="mt-1 font-display text-2xl text-ink">{product.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-mute">{product.blurb}</p>

        <dl className="mt-3 flex items-center gap-2 text-sm">
          <dt className="sr-only">Material</dt>
          <dd className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-ink">
            {product.material}
          </dd>
        </dl>

        <fieldset className="mt-4">
          <legend className="text-xs text-mute">
            Cor: <span className="font-semibold text-ink">{color.name}</span>
          </legend>
          <div className="mt-1 -ml-2 flex flex-wrap">
            {product.colors.map((c, index) => {
              const selected = index === colorIndex;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIndex(index)}
                  aria-label={`Cor ${c.name}`}
                  aria-pressed={selected}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span
                    className={`block h-6 w-6 rounded-full border border-black/10 ring-offset-2 transition-shadow ${
                      selected ? "ring-2 ring-ink" : "ring-0"
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

        <div className="mt-auto flex flex-col gap-2 pt-4">
          {inBag ? (
            <button
              type="button"
              onClick={openCart}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand bg-brand/5 px-4 text-sm font-semibold text-brand-deep"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Na sacola · Ver sacola
            </button>
          ) : (
            <button
              type="button"
              onClick={() => add(product.id, colorIndex)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep active:bg-brand-deep"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Provar na Loja
            </button>
          )}
          <a
            href={whatsappUrl(availabilityMessage(product.name, color.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-stone-300 px-4 text-center text-[13px] font-semibold leading-tight text-ink transition-colors hover:border-ink"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Consultar Disponibilidade no WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

