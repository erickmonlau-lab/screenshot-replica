import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LINKEDIN = "https://www.linkedin.com/in/erick-rodriguez-martinez";

/** Pie de página: navegación, contacto y el nombre en grande como marca de agua. */
export function SiteFooter({ email }: { email: string }) {
  const { t, tr } = useLanguage();
  const links = [
    ["#proceso", t.nav.process],
    ["#proyectos", t.nav.projects],
    ["#ia", t.nav.brain],
    ["#trayectoria", t.nav.experience],
    ["#contacto", t.nav.contact],
  ] as const;
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-white bg-[#09090B] text-white">
      <div className="relative z-10 mx-auto grid w-full max-w-[1380px] gap-10 px-5 pt-12 pb-6 sm:px-8 sm:pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-[26px] leading-none font-bold tracking-[-0.03em]">
            Erick Rodríguez
          </p>
          <p className="mt-3 max-w-[30ch] text-[17px] leading-snug font-semibold text-[#D4D4D8]">
            {tr("Marketing digital, gestión e IA aplicada al negocio.")}
          </p>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-3">
          <p className="mb-3 text-[15px] font-bold tracking-[0.1em] text-[#A78BFA] uppercase">
            {tr("Secciones")}
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-block text-[17px] font-semibold text-white hover:text-[#A78BFA]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="mb-3 text-[15px] font-bold tracking-[0.1em] text-[#A78BFA] uppercase">
            {t.contact.badge}
          </p>
          <ul className="grid gap-2.5">
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2.5 text-[17px] font-semibold break-all hover:text-[#A78BFA]"
              >
                <Mail size={18} strokeWidth={2.4} className="shrink-0 text-[#A78BFA]" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[17px] font-semibold hover:text-[#A78BFA]"
              >
                <Linkedin size={18} strokeWidth={2.4} className="shrink-0 text-[#A78BFA]" />
                LinkedIn
                <ArrowUpRight size={16} strokeWidth={2.6} className="shrink-0" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Marca de agua: el nombre en grande */}
      <div
        aria-hidden="true"
        className="footer-mark font-display pointer-events-none relative z-0 -mt-2 px-3 text-center text-[17.5vw] leading-[0.82] font-bold tracking-[-0.05em] whitespace-nowrap text-[#26262B] uppercase select-none sm:text-[11.5vw]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-4 text-[15px] font-semibold text-[#A1A1AA] sm:px-8">
        <span>© 2026 Erick Rodríguez</span>
        <span>{tr("Hecho en Barcelona")}</span>
      </div>
    </footer>
  );
}
