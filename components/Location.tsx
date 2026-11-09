"use client";

import { useSyncExternalStore } from "react";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  MAPS_EMBED_URL,
  MAPS_URL,
  OPENING_HOURS,
  STORE,
  WAZE_URL,
} from "@/lib/data";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function computeStatus(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const slot = OPENING_HOURS.find((s) => s.days.includes(dayIndex));
  const open = slot?.periods.some(([a, b]) => minutes >= toMinutes(a) && minutes < toMinutes(b));
  return open ? "open" : "closed";
}

const subscribeNoop = (cb: () => void) => {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
};

/** "open" | "closed" | "" (antes da hidratação, evita divergência servidor/cliente). */
function useOpenStatus(): string {
  return useSyncExternalStore(subscribeNoop, computeStatus, () => "");
}

export default function Location() {
  const status = useOpenStatus();

  return (
    <section
      id="loja"
      aria-labelledby="loja-title"
      className="scroll-mt-28 bg-paper py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          id="loja-title"
          eyebrow="Visite a loja"
          title="No coração do Centro de Videira."
          description="Venha provar as armações com calma, tirar dúvidas e sair com o óculos ajustado ao seu rosto."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="space-y-5">
            <div className="rounded-3xl border border-stone-200/70 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <address className="not-italic">
                  <p className="font-semibold text-ink">{STORE.streetAddress}</p>
                  <p className="text-mute">
                    {STORE.neighborhood}, {STORE.city} - {STORE.state}
                  </p>
                  <p className="text-mute">CEP {STORE.postalCode}</p>
                  <p className="mt-1 text-xs text-mute">Código Maps: {STORE.plusCode}</p>
                </address>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Traçar Rota no Google Maps
                </a>
                <a
                  href={WAZE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  Waze
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200/70 bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 font-display text-xl text-ink">
                  <Clock className="h-5 w-5 text-brand" aria-hidden="true" />
                  Horário de atendimento
                </h3>
                {status ? (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      status === "open"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {status === "open" ? "Aberto agora" : "Fechado agora"}
                  </span>
                ) : null}
              </div>
              <table className="w-full text-sm">
                <caption className="sr-only">Horários de funcionamento da loja</caption>
                <tbody className="divide-y divide-stone-200/70">
                  {OPENING_HOURS.map((slot) => (
                    <tr key={slot.label}>
                      <th scope="row" className="py-3 pr-4 text-left font-semibold text-ink">
                        {slot.label}
                      </th>
                      <td
                        className={`py-3 text-right ${
                          slot.periods.length === 0 ? "text-mute" : "text-ink"
                        }`}
                      >
                        {slot.text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a
                href={`tel:+${STORE.phoneSecondaryNumber}`}
                className="inline-flex min-h-11 items-center gap-2 text-ink hover:text-brand"
              >
                <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                {STORE.phoneSecondaryDisplay}
              </a>
              <a
                href={`mailto:${STORE.email}`}
                className="inline-flex min-h-11 items-center gap-2 break-all text-ink hover:text-brand"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {STORE.email}
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="min-h-[320px] overflow-hidden rounded-3xl border border-stone-200/70 bg-paper-2 shadow-sm lg:min-h-full"
          >
            <iframe
              title="Mapa da loja Mercadão dos Óculos Videira"
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[320px] w-full border-0 lg:min-h-[520px]"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

