"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Check, MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import Drawer from "./Drawer";
import { useCart } from "@/lib/cart";
import { LENSES, PRODUCTS } from "@/lib/data";
import { cartMessage, whatsappUrl } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, lenses, isOpen, closeCart, remove, toggleLens, clear } = useCart();

  const resolved = useMemo(
    () =>
      items.flatMap((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        const color = product?.colors[item.colorIndex];
        return product && color ? [{ product, color, colorIndex: item.colorIndex }] : [];
      }),
    [items],
  );

  const lensNames = lenses.flatMap((id) => {
    const lens = LENSES.find((l) => l.id === id);
    return lens ? [lens.name] : [];
  });

  const isEmpty = resolved.length === 0 && lensNames.length === 0;

  const href = whatsappUrl(
    cartMessage(
      resolved.map((r) => ({ name: r.product.name, color: r.color.name })),
      lensNames,
    ),
  );

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      label="Sacola de seleção"
      title="Sua sacola"
      glass
      footer={
        isEmpty ? null : (
          <div className="space-y-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-mute">Valor estimado</span>
              <span className="font-semibold text-ink">Sob consulta de grau</span>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep active:bg-brand-deep"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Enviar Pedido para Atendimento via WhatsApp
            </a>
            <button
              type="button"
              onClick={clear}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-mute transition-colors hover:text-ink"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Limpar sacola
            </button>
          </div>
        )
      }
    >
      {isEmpty ? (
        <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <ShoppingBag className="h-7 w-7 text-mute" aria-hidden="true" />
          </span>
          <p className="font-display text-xl text-ink">Sua sacola está vazia</p>
          <p className="max-w-xs text-sm leading-relaxed text-mute">
            Adicione armações para provar na loja e escolha o tratamento de lente ideal.
          </p>
          <a
            href="#catalogo"
            onClick={closeCart}
            className="mt-2 inline-flex min-h-11 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-ink hover:border-ink"
          >
            Explorar catálogo
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {resolved.length > 0 ? (
            <section aria-label="Armações para provar na loja">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
                Armações para provar na loja
              </h3>
              <ul className="space-y-3">
                {resolved.map(({ product, color, colorIndex }) => (
                  <li
                    key={`${product.id}-${colorIndex}`}
                    className="flex items-center gap-3 rounded-2xl border border-stone-200/70 bg-white/85 p-3"
                  >
                    <div className="relative h-16 w-22 shrink-0 overflow-hidden rounded-xl bg-[#F5F3EF]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        style={color.imageFilter ? { filter: color.imageFilter } : undefined}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{product.name}</p>
                      <p className="text-sm text-mute">Cor: {color.name}</p>
                      <p className="text-xs text-mute">{product.material}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id, colorIndex)}
                      aria-label={`Remover ${product.name} da sacola`}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-mute transition-colors hover:bg-stone-100 hover:text-brand"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-label="Tratamento de lente">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
              Tratamento de lente
            </h3>
            <ul className="flex flex-wrap gap-2">
              {LENSES.map((lens) => {
                const active = lenses.includes(lens.id);
                return (
                  <li key={lens.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleLens(lens.id)}
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${
                        active
                          ? "border-brand bg-brand text-white"
                          : "border-stone-300 bg-white text-ink hover:border-ink"
                      }`}
                    >
                      {active ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
                      {lens.short}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-mute">
              O valor final depende do seu grau. Nossa equipe confirma disponibilidade e preço pelo
              WhatsApp.
            </p>
          </section>
        </div>
      )}
    </Drawer>
  );
}
