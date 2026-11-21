import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";
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
  const [dark, setDark] = useState(false);
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

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    try {
      if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        setDark(true);
      }
    } catch {
      // storage unavailable
    }
  }, []);

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

  function toggleTheme(e: MouseEvent<HTMLButtonElement>) {
    const next = !dark;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      setDark(next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // storage unavailable
      }
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }
    const transition = doc.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

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
          <span className="font-display text-[17px] leading-none font-bold tracking-[-0.01em] whitespace-nowrap uppercase min-[1340px]:text-[16px]">
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
        <div className="flex shrink-0 items-center gap-2">
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

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#52525B] bg-[#18181B] text-[#D4D4D8] transition-colors hover:border-white hover:text-white ${focusRing}`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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
          className="pointer-events-auto mx-auto mt-3 max-w-[1340px] rounded-3xl border-[3px] border-white bg-[#09090B] p-4 text-white shadow-[6px_6px_0_#6D28D9] min-[1340px]:hidden"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1.5">
            {navItems.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex min-h-[56px] items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left text-[18px] leading-none font-bold ${focusRing} ${
                    isActive
                      ? "border-white bg-[#6D28D9] text-white"
                      : "border-transparent text-[#D4D4D8] hover:border-[#52525B] hover:text-white"
                  }`}
                >
                  <span
                    className={`font-display w-7 text-[15px] ${isActive ? "text-white" : "text-[#A78BFA]"}`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight size={18} strokeWidth={2.6} className="shrink-0 opacity-70" />
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-white bg-[#6D28D9] px-4 py-3 text-[17px] leading-none font-bold text-white sm:hidden ${focusRing}`}
          >
            <span>{t.nav.talk}</span>
            <ArrowUpRight size={18} strokeWidth={2.8} />
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#27272A] pt-4">
            <div className="flex items-center gap-1.5 sm:hidden" role="group" aria-label="Idioma">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code)}
                  aria-pressed={locale === lang.code}
                  aria-label={lang.name}
                  className={`rounded-full border-2 px-3.5 py-2 text-[15px] leading-none font-bold ${focusRing} ${
                    locale === lang.code
                      ? "border-white bg-white text-[#09090B]"
                      : "border-[#52525B] text-[#D4D4D8]"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              className={`inline-flex items-center gap-2 rounded-full border-2 border-white px-4 py-2 text-[15px] leading-none font-bold text-white ${focusRing}`}
            >
              <Download size={16} strokeWidth={2.6} />
              <span>{t.nav.downloadCv}</span>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
