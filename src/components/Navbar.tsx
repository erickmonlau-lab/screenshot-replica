import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Download, Linkedin, Mail, Menu, X } from "lucide-react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";
import { Flag } from "./Flag";
import { useLanguage, type Locale } from "@/context/LanguageContext";

interface NavbarProps {
  mode?: "studio" | "preview";
  onChangeMode?: (next: "studio" | "preview") => void;
}

/** Secciones de la página en orden → elemento del menú que se marca como activo. */
const SECTION_TO_NAV: [string, string][] = [
  ["hero", "hero"],
  ["metricas", "hero"],
  ["proceso", "proceso"],
  ["proyectos", "proyectos"],
  ["erp", "proyectos"],
  ["web-apps", "proyectos"],
  ["ia", "ia"],
  ["stack", "ia"],
  ["trayectoria", "trayectoria"],
  ["formacion", "trayectoria"],
  ["subvencion", "trayectoria"],
  ["contacto", "contacto"],
];

const HEADER_OFFSET = 84;

export function Navbar({ onChangeMode }: NavbarProps) {
  const { locale, setLocale, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { id: "proceso", label: t.nav.process },
    { id: "proyectos", label: t.nav.projects },
    { id: "ia", label: t.nav.brain },
    { id: "trayectoria", label: t.nav.experience },
    { id: "contacto", label: t.nav.contact },
  ];

  const languages: { code: Locale; label: string; name: string }[] = [
    { code: "es", label: "ES", name: "Español" },
    { code: "ca", label: "CA", name: "Català" },
    { code: "en", label: "EN", name: "English" },
  ];

  /* El modo oscuro se retiró: se limpia cualquier preferencia guardada */
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem("theme");
    } catch {
      // storage unavailable
    }
  }, []);

  /* Selector de idioma móvil: Escape o clic fuera lo cierran */
  useEffect(() => {
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [langOpen]);

  /* Sección visible → elemento activo del menú */
  useEffect(() => {
    const update = () => {
      const line = Math.min(window.innerHeight * 0.35, 320);
      let current = "hero";
      for (const [sectionId, navId] of SECTION_TO_NAV) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= line) current = navId;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = "contacto";
      setActiveId(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Menú móvil: Escape o clic fuera lo cierran; al pasar a escritorio se cierra solo */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1340) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  function scrollToSection(id: string) {
    setMobileOpen(false);
    setActiveId(id);
    if (id === "hero") {
      onChangeMode?.("studio");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 18;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]";

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <div className="pointer-events-auto relative mx-auto flex h-[62px] max-w-[1340px] items-center justify-between gap-3 rounded-full border-[3px] border-white bg-[#09090B] px-3 text-white shadow-[6px_6px_0_#6D28D9] sm:h-[66px] sm:px-4 xl:px-5">
        {/* Marca */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          aria-label="Ir al inicio"
          className={`group flex shrink-0 items-center gap-2.5 rounded-full pr-1 ${focusRing}`}
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-[#6D28D9] bg-[#18181B]">
            <img
              src="/erick-avatar-120.webp"
              width={60}
              height={60}
              alt=""
              className="h-full w-full rounded-full bg-[#6D28D9] object-cover object-[50%_20%]"
            />
            <span
              className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#09090B] bg-[#34D399]"
              title="Disponible para proyectos"
            />
          </span>
          <span className="font-display text-[15px] leading-none font-bold tracking-[-0.01em] whitespace-nowrap uppercase min-[390px]:text-[17px] min-[1340px]:text-[16px]">
            Erick Rodríguez
          </span>
        </button>

        {/* Navegación principal (escritorio) */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 min-[1340px]:flex"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full border-2 px-3.5 py-1.5 text-[15px] leading-none font-bold whitespace-nowrap transition-colors duration-150 ${focusRing} ${
                  isActive
                    ? "border-white bg-[#6D28D9] text-white"
                    : "border-transparent text-[#D4D4D8] hover:border-[#52525B] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Herramientas */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div
            className="hidden items-center gap-0.5 rounded-full border-2 border-[#52525B] bg-[#18181B] p-0.5 sm:flex"
            role="group"
            aria-label="Idioma"
          >
            {languages.map((lang) => {
              const selected = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code)}
                  aria-pressed={selected}
                  aria-label={lang.name}
                  title={lang.name}
                  className={`rounded-full px-2.5 py-1 text-[15px] leading-none font-bold transition-colors duration-150 ${focusRing} ${
                    selected ? "bg-white text-[#09090B]" : "text-[#D4D4D8] hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          <div ref={langRef} className="relative sm:hidden">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Idioma"
              aria-expanded={langOpen}
              className={`inline-flex h-10 items-center gap-1 rounded-full border-2 border-[#52525B] bg-[#18181B] pr-1.5 pl-2.5 text-[15px] leading-none font-bold text-white ${focusRing}`}
            >
              {locale.toUpperCase()}
              <ChevronDown
                size={15}
                strokeWidth={2.8}
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            {langOpen ? (
              <ul className="absolute top-full right-0 z-10 mt-3 w-[204px] rounded-2xl border-[3px] border-white bg-[#09090B] p-1.5 shadow-[4px_4px_0_#6D28D9]">
                {languages.map((lang) => {
                  const selected = locale === lang.code;
                  return (
                    <li key={lang.code}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocale(lang.code);
                          setLangOpen(false);
                        }}
                        aria-pressed={selected}
                        className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-left text-[16px] leading-none font-bold ${focusRing} ${
                          selected ? "bg-[#6D28D9] text-white" : "text-[#D4D4D8] hover:text-white"
                        }`}
                      >
                        <Flag code={lang.code} />
                        <span className="flex-1">{lang.name}</span>
                        <span className="font-display text-[14px] opacity-70">{lang.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            aria-label={t.nav.downloadCv}
            title={t.nav.downloadCv}
            className={`hidden h-10 w-10 items-center justify-center rounded-full border-2 border-[#52525B] bg-[#18181B] text-[#D4D4D8] transition-colors hover:border-white hover:text-white min-[1340px]:inline-flex ${focusRing}`}
          >
            <Download size={18} strokeWidth={2.6} />
          </a>

          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className={`hidden items-center gap-1.5 rounded-full border-2 border-white bg-[#6D28D9] px-4 py-2 text-[15px] leading-none font-bold whitespace-nowrap text-white transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex ${focusRing}`}
          >
            <span>{t.nav.talk}</span>
            <ArrowUpRight size={16} strokeWidth={2.8} />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="menu-movil"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#52525B] bg-[#18181B] text-white min-[1340px]:hidden ${focusRing}`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen ? (
        <div
          id="menu-movil"
          className="pointer-events-auto mx-auto mt-3 max-h-[calc(100svh-96px)] max-w-[1340px] overflow-y-auto rounded-[28px] border-[3px] border-white bg-[#09090B] p-3 text-white shadow-[6px_6px_0_#6D28D9] min-[1340px]:hidden"
        >
          <nav aria-label="Navegación móvil" className="grid gap-2">
            {navItems.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex min-h-[58px] items-center gap-3 rounded-2xl border-[3px] px-2.5 text-left transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] ${focusRing} ${
                    isActive
                      ? "border-white bg-[#6D28D9] shadow-[4px_4px_0_#A78BFA]"
                      : "border-[#3F3F46] bg-[#18181B] hover:border-white"
                  }`}
                >
                  <span
                    className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 text-[15px] leading-none font-bold ${
                      isActive
                        ? "border-[#09090B] bg-white text-[#6D28D9]"
                        : "border-[#3F3F46] bg-[#09090B] text-[#A78BFA]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-display flex-1 text-[21px] leading-none font-bold tracking-[-0.02em]">
                    {item.label}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                      isActive ? "border-white" : "border-[#52525B] text-[#A1A1AA]"
                    }`}
                  >
                    <ArrowUpRight size={16} strokeWidth={2.8} />
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className={`inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border-[3px] border-white bg-[#6D28D9] px-3 text-[16px] leading-none font-bold text-white active:translate-y-[2px] sm:hidden ${focusRing}`}
            >
              <span>{t.nav.talk}</span>
              <ArrowUpRight size={17} strokeWidth={2.8} />
            </button>
            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              className={`inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl border-[3px] border-[#09090B] bg-white px-4 text-[16px] whitespace-nowrap leading-none font-bold text-[#09090B] active:translate-y-[2px] sm:flex-none sm:px-6 ${focusRing} transition-colors hover:bg-[#F4F4F5]`}
            >
              <Download size={17} strokeWidth={2.6} className="hidden min-[390px]:block" />
              <span>{t.nav.downloadCv}</span>
            </a>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t-2 border-[#27272A] px-2.5 pt-3 pb-1">
            <a
              href="mailto:hola.erickrodriguez@gmail.com"
              className={`inline-flex min-w-0 items-center gap-2 rounded-full text-[13px] font-semibold text-[#D4D4D8] min-[390px]:text-[14px] hover:text-white ${focusRing}`}
            >
              <Mail
                size={18}
                strokeWidth={2.4}
                className="hidden shrink-0 text-[#A78BFA] min-[390px]:block"
              />
              <span className="truncate">hola.erickrodriguez@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/erick-rodriguez-martinez"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#52525B] text-white hover:border-white ${focusRing}`}
            >
              <Linkedin size={18} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
