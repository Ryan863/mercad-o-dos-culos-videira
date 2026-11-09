import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: Props) {
  const center = align === "center";
  return (
    <div
      data-reveal
      className={`mb-10 max-w-2xl sm:mb-14 ${center ? "mx-auto text-center" : ""}`}
    >
      <p
        className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
          tone === "dark" ? "text-white/70" : "text-brand-deep"
        }`}
      >
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`font-display text-3xl font-medium leading-tight text-balance sm:text-4xl lg:text-5xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${
            tone === "dark" ? "text-white/75" : "text-mute"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

