import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon } from "./BrandIcons";
import { NAV_LINKS, STORE } from "@/lib/data";
import { GENERAL_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-14 text-white/80 md:pb-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-8 lg:px-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr]">
        <div>
          <Logo variant="dark" showUnit={false} />
          <p className="mt-5 font-display text-2xl text-white">
            Mercadão dos Óculos
            <span className="block text-base text-white/70">Franquia Videira / SC</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Saúde visual com atendimento humanizado, variedade de modelos e preços justos de
            fábrica.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={STORE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${STORE.instagramHandle}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={STORE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Mercadão dos Óculos Videira"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Links rápidos">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Links rápidos
          </h2>
          <ul className="mt-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={STORE.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-white"
              >
                Portal da franquia
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              {STORE.addressLine} · CEP {STORE.postalCode}
            </li>
            <li>
              <a
                href={whatsappUrl(GENERAL_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
                WhatsApp {STORE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`tel:+${STORE.phoneSecondaryNumber}`}
                className="inline-flex min-h-11 items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                {STORE.phoneSecondaryDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${STORE.email}`}
                className="inline-flex min-h-11 items-center gap-2 break-all hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {STORE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] border-t border-white/10 px-4 pt-6 text-xs text-white/50 sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} Mercadão dos Óculos - Franquia Videira / SC · {STORE.portalDisplay}
        </p>
        <p className="mt-1">CNPJ: informar o CNPJ da unidade franqueada.</p>
        <p className="mt-1">Site desenvolvido sob medida para a unidade de Videira.</p>
      </div>
    </footer>
  );
}
