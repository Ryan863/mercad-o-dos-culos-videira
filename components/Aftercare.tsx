import { Droplets, Glasses, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";

const SERVICES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Wrench,
    title: "Ajuste de armação",
    text: "Óculos torto ou apertado? Alinhamos a armação ao seu rosto para ficar perfeita.",
  },
  {
    icon: Glasses,
    title: "Troca de plaquetas",
    text: "Substituição de plaquetas para mais conforto e firmeza no nariz.",
  },
  {
    icon: Droplets,
    title: "Limpeza ultrassônica",
    text: "Limpeza profunda que remove gordura e sujeira de cantos que o pano não alcança.",
  },
  {
    icon: ShieldCheck,
    title: "Tecnologia no corte",
    text: "Corte digital das lentes para encaixe preciso e acabamento impecável.",
  },
];

export default function Aftercare() {
  return (
    <section
      id="pos-venda"
      aria-labelledby="pos-venda-title"
      className="scroll-mt-28 bg-paper py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="pos-venda-title"
              eyebrow="Pós-venda & assistência"
              title="Cuidado que continua depois da compra."
              description="Ajustes de armação, troca de plaquetas e limpeza ultrassônica gratuitos para os nossos clientes, sem complicação e com sorriso."
            />
            <figure
              data-reveal
              className="rounded-3xl border border-stone-200/70 bg-white p-6 shadow-sm"
            >
              <blockquote className="font-display text-lg leading-relaxed text-ink">
                “Meu óculos ficou torto em meu rosto. Tive que ajustá-lo. Passei no Mercadão dos
                Óculos em Videira. Gostaria de ressaltar a educação, simpatia, explicações…”
              </blockquote>
              <figcaption className="mt-3 text-sm text-mute">
                Edison Leal · Local Guide, em viagem por SC
              </figcaption>
            </figure>
          </div>

          <ul data-stagger className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="rounded-3xl border border-stone-200/70 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-deep">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

