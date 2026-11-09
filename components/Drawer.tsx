"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  label: string;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  glass?: boolean;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Drawer lateral acessível: foco preso, Esc fecha, rolagem do body travada. */
export default function Drawer({
  open,
  onClose,
  side = "right",
  label,
  title,
  children,
  footer,
  glass = false,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const raf = requestAnimationFrame(() => {
      const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel)?.focus();
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const closed = side === "right" ? "translate-x-full" : "-translate-x-full";

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`absolute top-0 flex h-dvh w-[min(92vw,420px)] flex-col outline-none transition-transform duration-300 ease-out motion-reduce:transition-none ${
          side === "right" ? "right-0" : "left-0"
        } ${open ? "translate-x-0" : closed} ${
          glass ? "glass glass-sheen" : "bg-paper shadow-2xl"
        } ${glass ? "bg-white/80" : ""}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-stone-200/70 px-5 py-4">
          <h2 className="font-display text-xl text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-stone-200/60"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>
        {footer ? (
          <div className="border-t border-stone-200/70 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

