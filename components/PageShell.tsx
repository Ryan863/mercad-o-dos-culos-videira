"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MainRefContext = createContext<RefObject<HTMLElement | null> | null>(null);

export function useMainRef(): RefObject<HTMLElement | null> {
  const ref = useContext(MainRefContext);
  if (!ref) throw new Error("useMainRef deve ser usado dentro de <PageShell>.");
  return ref;
}

const REVEAL_START = "top 88%";

/**
 * Casca da página: expõe o `mainRef` (escopo do GSAP) e orquestra as revelações.
 * - `data-hero-item`: entrada imediata (sem ScrollTrigger).
 * - `data-reveal`: revela o próprio elemento ao entrar na tela.
 * - `data-stagger`: revela os filhos diretos em cascata.
 * Todo ScrollTrigger usa `once: true`; `clearProps` evita elementos presos em opacity 0.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-item]", {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "opacity,transform",
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(Array.from(group.children), {
            y: 28,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: group, start: REVEAL_START, once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: mainRef },
  );

  return (
    <MainRefContext.Provider value={mainRef}>
      <main ref={mainRef} id="conteudo">
        {children}
      </main>
    </MainRefContext.Provider>
  );
}

