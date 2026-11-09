import Image from "next/image";

type Props = {
  className?: string;
  variant?: "light" | "dark";
  showUnit?: boolean;
};

/**
 * Marca oficial recortada em alta definição (/logo-sticker.png) combinada
 * com a assinatura editorial da unidade de Videira - SC.
 */
export default function Logo({
  className = "",
  variant = "light",
  showUnit = true,
}: Props) {
  const isDark = variant === "dark";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`relative inline-flex shrink-0 items-center justify-center rounded-2xl px-2.5 py-1 transition-transform duration-200 group-hover:scale-[1.02] ${
          isDark
            ? "bg-white/95 shadow-sm ring-1 ring-white/20"
            : "bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.07)] ring-1 ring-stone-200/90"
        }`}
      >
        <Image
          src="/logo-sticker.png"
          alt="Rede de Óticas Mercadão dos Óculos"
          width={136}
          height={77}
          priority
          className="h-9 w-auto object-contain sm:h-10"
        />
      </span>

      {showUnit ? (
        <span className="hidden flex-col border-l border-stone-200/90 pl-3 sm:flex">
          <span
            className={`font-display text-[15px] font-semibold leading-tight tracking-tight ${
              isDark ? "text-white" : "text-ink"
            }`}
          >
            Unidade Videira
          </span>
          <span
            className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] leading-none ${
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
