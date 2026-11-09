import { Camera, ClipboardList, Send, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PRESCRIPTION_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

const STEPS = [
  {
    icon: Camera,
    title: "Tire uma foto nítida",
    text: "Fotografe o receituário médico com boa luz, sem cortes ou sombras.",
  },
  {
    icon: Send,
    title: "Clique no botão de envio seguro",
    text: "O WhatsApp abre com a mensagem pronta. Basta anexar a foto e enviar.",
  },
  {
    icon: Sparkles,
    title: "Receba a indicação em minutos",
    text: "Nossos optometristas e consultores analisam seu astigmatismo/miopia e indicam o índice de refração ideal.",
  },
];

export default function Prescription() {
  return (
    <section
      id="receita"
      aria-labelledby="receita-title"
      className="relative isolate scroll-mt-28 overflow-hidden bg-ink py-16 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_50%_at_85%_20%,rgba(229,36,39,0.35),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(56,189,248,0.18),transparent)]"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-8 lg:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            id="receita-title"
            tone="dark"
            eyebrow="Receita médica"
            title="Envie sua receita e receba o orçamento da lente ideal."
            description="Sem fila e sem burocracia: mande a foto pelo WhatsApp e nossa equipe cuida do resto."
          />

          <ol data-stagger className="space-y-5">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">
                    <span className="mr-2 text-brand">{index + 1}.</span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <a
            data-reveal
            href={whatsappUrl(PRESCRIPTION_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-brand px-8 text-base font-semibold text-white shadow-[0_14px_40px_-12px_rgba(229,36,39,0.8)] transition-colors hover:bg-brand-deep sm:w-auto"
          >
            <Camera className="h-5 w-5" aria-hidden="true" />
            Enviar foto da receita no WhatsApp
          </a>
        </div>

        {/* Simulação de área de escaneamento oftálmico */}
        <div data-reveal className="mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-inset ring-white/15 [--scan-distance:340px] sm:[--scan-distance:380px]"
          >
            <span className="absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-brand" />
            <span className="absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-brand" />
            <span className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-brand" />
            <span className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-brand" />

            <div className="mx-auto mt-6 h-full max-h-[88%] rounded-xl bg-[#FAF9F6] p-5 text-ink shadow-xl">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                <ClipboardList className="h-4 w-4 text-brand" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mute">
                  Receituário oftálmico
                </span>
              </div>
              <div className="mt-4 grid grid-cols-[auto_1fr_1fr_1fr] gap-x-3 gap-y-3 text-[11px] text-mute">
                <span />
                <span className="text-center font-semibold">ESF</span>
                <span className="text-center font-semibold">CIL</span>
                <span className="text-center font-semibold">EIXO</span>
                <span className="font-semibold text-ink">OD</span>
                <span className="h-5 rounded bg-stone-200/80" />
                <span className="h-5 rounded bg-stone-200/80" />
                <span className="h-5 rounded bg-stone-200/80" />
                <span className="font-semibold text-ink">OE</span>
                <span className="h-5 rounded bg-stone-200/80" />
                <span className="h-5 rounded bg-stone-200/80" />
                <span className="h-5 rounded bg-stone-200/80" />
              </div>
              <div className="mt-6 space-y-2">
                <span className="block h-2 w-full rounded bg-stone-200/80" />
                <span className="block h-2 w-5/6 rounded bg-stone-200/80" />
                <span className="block h-2 w-2/3 rounded bg-stone-200/80" />
              </div>
            </div>

            <div className="scan-line absolute inset-x-5 top-14 h-0.5 rounded-full bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_24px_6px_rgba(229,36,39,0.55)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

