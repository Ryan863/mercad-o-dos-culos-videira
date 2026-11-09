"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

/** Hero com `priority` e fallback: se o arquivo falhar, o fundo editorial permanece limpo. */
export default function HeroImage({ src, alt, className = "", fallbackClassName = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br from-paper via-paper-2 to-stone-200 ${fallbackClassName}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

