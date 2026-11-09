"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

/** Barra flutuante da sacola (somente mobile), com vidro óptico. */
export default function FloatingBag() {
  const { count, isOpen, openCart } = useCart();
  if (count === 0 || isOpen) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <button
        type="button"
        onClick={openCart}
        className="glass glass-sheen pointer-events-auto relative flex min-h-12 w-full max-w-sm items-center justify-between gap-3 rounded-full px-5 text-[15px] font-semibold text-ink"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          Ver minha sacola
        </span>
        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-brand px-2 text-sm font-bold text-white">
          {count}
        </span>
      </button>
    </div>
  );
}

