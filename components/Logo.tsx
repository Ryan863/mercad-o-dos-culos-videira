import Image from "next/image";

type Props = {
  className?: string;
  /** Altura em px; a largura segue a proporção ~1.9:1 do recorte da marca. */
  size?: "sm" | "md";
};

/**
 * A marca oficial vem em um quadrado vermelho com muito respiro. Recortamos o
 * centro (proporção ~1.9:1) dentro de um selo arredondado com borda branca,
 * preservando a legibilidade da tipografia original.
 */
export default function Logo({ className = "", size = "md" }: Props) {
  const dims = size === "sm" ? "h-10 w-[76px]" : "h-12 w-[92px]";
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-2xl bg-[#E52427] ring-2 ring-white shadow-sm ${dims} ${className}`}
    >
      <Image
        src="/logo.jpg"
        alt="Mercadão dos Óculos - Rede de Óticas"
        fill
        sizes="96px"
        className="scale-[1.12] object-cover"
      />
    </span>
  );
}

