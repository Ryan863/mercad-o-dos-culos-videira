import { useId } from "react";
import type { FaceShape, FrameColor } from "@/lib/data";

type Props = {
  shape: FaceShape;
  color: FrameColor;
  metal?: boolean;
  sun?: boolean;
  clip?: boolean;
  kids?: boolean;
  lensTint?: string;
  className?: string;
};

/** Contorno das lentes no espaço local (0..70 x 0..60). A lente esquerda é espelhada na direita. */
const LENS_PATHS: Record<FaceShape, string> = {
  quadrado:
    "M6 8 Q6 4 10 4 L62 4 Q66 4 66 8 L66 44 Q66 56 54 56 L18 56 Q6 56 6 44 Z",
  redondo:
    "M36 2 C54 2 68 14 68 30 C68 46 54 58 36 58 C18 58 4 46 4 30 C4 14 18 2 36 2 Z",
  oval: "M36 5 C56 5 68 16 68 30 C68 44 56 55 36 55 C16 55 4 44 4 30 C4 16 16 5 36 5 Z",
  aviador:
    "M4 8 Q36 0 68 8 Q72 40 52 56 Q36 62 20 56 Q0 40 4 8 Z",
  gatinho:
    "M2 14 Q2 2 16 3 L66 10 Q70 40 52 54 Q36 60 18 53 Q2 42 2 14 Z",
};

function Lenses({
  shape,
  transformLeft,
  transformRight,
  children,
}: {
  shape: FaceShape;
  transformLeft: string;
  transformRight: string;
  children: (d: string) => React.ReactNode;
}) {
  const d = LENS_PATHS[shape];
  return (
    <>
      <g transform={transformLeft}>{children(d)}</g>
      <g transform={transformRight}>{children(d)}</g>
    </>
  );
}

export default function FrameArt({
  shape,
  color,
  metal = false,
  sun = false,
  clip = false,
  kids = false,
  lensTint = "#2A2D32",
  className,
}: Props) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const strokeFill = color.hex2 ? `url(#frame-${id})` : color.hex;
  const strokeWidth = metal ? 2.6 : kids ? 6.5 : 6;
  const left = "translate(26 20)";
  const right = "translate(214 20) scale(-1 1)";
  const lensFill = sun ? lensTint : "#BFE6F2";
  const lensOpacity = sun ? 0.88 : 0.32;

  return (
    <svg
      viewBox="0 0 240 110"
      role="img"
      aria-label={`Armação ${shape} na cor ${color.name}`}
      className={className}
    >
      <defs>
        {color.hex2 ? (
          <linearGradient id={`frame-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={color.hex} />
            <stop offset="0.45" stopColor={color.hex2} />
            <stop offset="0.7" stopColor={color.hex} />
            <stop offset="1" stopColor={color.hex2} />
          </linearGradient>
        ) : null}
        <linearGradient id={`lens-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lensFill} stopOpacity={lensOpacity + 0.1} />
          <stop offset="1" stopColor={lensFill} stopOpacity={sun ? 0.55 : 0.18} />
        </linearGradient>
        <filter id={`shadow-${id}`} x="-10%" y="-10%" width="120%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.14" />
        </filter>
      </defs>

      <g filter={`url(#shadow-${id})`}>
        {/* Hastes (vista frontal) */}
        <path
          d="M26 36 L8 40 M214 36 L232 40"
          stroke={strokeFill}
          strokeWidth={metal ? 2.4 : 5}
          strokeLinecap="round"
          fill="none"
        />

        {/* Lentes */}
        <Lenses shape={shape} transformLeft={left} transformRight={right}>
          {(d) => <path d={d} fill={`url(#lens-${id})`} />}
        </Lenses>

        {/* Reflexo antirreflexo */}
        <Lenses shape={shape} transformLeft={left} transformRight={right}>
          {() => (
            <path
              d="M16 18 Q24 10 38 9"
              stroke="#fff"
              strokeOpacity={sun ? 0.45 : 0.75}
              strokeWidth={3}
              strokeLinecap="round"
              fill="none"
            />
          )}
        </Lenses>

        {/* Aros */}
        <Lenses shape={shape} transformLeft={left} transformRight={right}>
          {(d) => (
            <path
              d={d}
              fill="none"
              stroke={strokeFill}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
          )}
        </Lenses>

        {/* Ponte */}
        <path
          d={metal ? "M98 40 Q120 28 142 40 M98 47 Q120 40 142 47" : "M96 38 Q120 24 144 38"}
          stroke={strokeFill}
          strokeWidth={metal ? 2.2 : strokeWidth - 1}
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Clip solar articulado */}
      {clip ? (
        <g opacity="0.95">
          <Lenses
            shape={shape}
            transformLeft="translate(26 6) scale(1 0.96)"
            transformRight="translate(214 6) scale(-1 0.96)"
          >
            {(d) => (
              <>
                <path d={d} fill={lensTint} fillOpacity="0.8" />
                <path d={d} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
              </>
            )}
          </Lenses>
          <path d="M96 22 Q120 10 144 22" stroke="#111" strokeOpacity="0.55" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}

