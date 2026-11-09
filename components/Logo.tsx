import Image from "next/image";

type Props = {
  className?: string;
  variant?: "light" | "dark";
  showUnit?: boolean;
};

/**
 * Logotipo oficial recortado com contorno nítido (logo-sticker.png)
 * acompanhado de tipografia editorial de alta precisão da unidade Videira - SC.
 */
export default function Logo({
  className = "",
  variant = "light",
  showUnit = true,
}: Props) {
  const isDark = variant === "dark";

  return (
    <span className={`group inline-flex items-center gap-3.5 ${className}`}>
      <span
        className={`relative inline-flex shrink-0 items-center justify-center rounded-2xl px-3 py-1.5 transition-all duration-300 group-hover:shadow-md ${
          isDark
            ? "bg-white/95 shadow-sm ring-1 ring-white/20"
            : "bg-white shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] ring-1 ring-stone-200/90 group-hover:border-stone-300"
        }`}
      >
        <Image
          src="/logo-sticker.png"
          alt="Mercadão dos Óculos - Videira"
          width={152}
          height={86}
          priority
          className="h-8.5 w-auto object-contain sm:h-9.5 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </span>

      {showUnit ? (
        <span className="hidden flex-col border-l border-stone-300/80 pl-3.5 sm:flex">
          <span
            className={`font-display text-[15px] font-semibold leading-tight tracking-tight ${
              isDark ? "text-white" : "text-ink"
            }`}
          >
            Unidade Videira
          </span>
          <span
            className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] leading-none ${
              isDark ? "text-white/65" : "text-mute"
            }`}
          >
            Centro · Santa Catarina
          </span>
        </span>
      ) : null}
    </span>
  );
}
