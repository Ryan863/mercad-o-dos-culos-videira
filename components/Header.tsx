"use client";

import { useState } from "react";
import { Menu, MessageCircle, Phone, ShoppingBag, MapPin } from "lucide-react";
import Drawer from "./Drawer";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";
import { NAV_LINKS, STORE } from "@/lib/data";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export default function Header() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink text-[12px] text-white/85">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <p className="flex min-w-0 items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
            <span className="truncate">{STORE.addressLine}</span>
          </p>
          <a
            href={whatsappUrl(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 font-semibold text-white transition-colors hover:text-white/80"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp</span> {STORE.whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="border-b border-stone-200/70 bg-paper/85 backdrop-blur-xl">
        <nav
          aria-label="Principal"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6"
        >
          <a href="#topo" aria-label="Mercadão dos Óculos - início" className="shrink-0">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-ink/75 transition-colors hover:bg-stone-200/50 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir sacola (${count} ${count === 1 ? "item" : "itens"})`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200/80 bg-white text-ink shadow-sm transition-colors hover:border-stone-300"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold leading-none text-white">
                  {count}
                </span>
              ) : null}
            </button>

            <a
              href={whatsappUrl(GENERAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep active:bg-brand-deep sm:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Falar com Consultor
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-haspopup="dialog"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200/80 bg-white text-ink shadow-sm lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="left"
        label="Menu de navegação"
        title="Menu"
        footer={
          <a
            href={whatsappUrl(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Falar com Consultor
          </a>
        }
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-14 items-center border-b border-stone-200/70 font-display text-2xl text-ink transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-mute">
          {STORE.addressLine}
          <br />
          Seg a Sex 08:30–18:30 · Sáb 08:30–16:00
        </p>
      </Drawer>
    </header>
  );
}

