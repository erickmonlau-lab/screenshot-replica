import { useEffect, useState, type MouseEvent } from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  Cpu,
  Download,
  Layers,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  Workflow,
  X,
} from "lucide-react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";
import { useLanguage, type Locale } from "@/context/LanguageContext";

interface NavbarProps {
  mode?: "studio" | "preview";
  onChangeMode?: (next: "studio" | "preview") => void;
}

const observedIds = [
  "hero",
  "metricas",
  "proceso",
  "proyectos",
  "erp",
  "ia",
  "trayectoria",
  "contacto",
];

export function Navbar({ onChangeMode }: NavbarProps) {
  const { locale, setLocale, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const navItems = [
    { id: "hero", label: t.nav.home, icon: Sparkles },
    { id: "proceso", label: t.nav.process, icon: Workflow },
    { id: "proyectos", label: t.nav.projects, icon: Layers },
    { id: "erp", label: t.nav.erp, icon: Cpu },
    { id: "ia", label: t.nav.brain, icon: BrainCircuit },
    { id: "trayectoria", label: t.nav.experience, icon: Briefcase },
    { id: "contacto", label: t.nav.contact, icon: MessageCircle },
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

  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const update = () => {
      let current = sections[0]!.id;
      const line = Math.min(window.innerHeight * 0.35, 320);
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = sections[sections.length - 1]!.id;
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
    if (!doc.startViewTransition) {
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
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  const languages: { code: Locale; label: string }[] = [
    { code: "es", label: "ES" },
    { code: "ca", label: "CA" },
    { code: "en", label: "EN" },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <div className="relative pointer-events-auto mx-auto flex h-[62px] sm:h-[68px] max-w-[1340px] items-center justify-between gap-2 sm:gap-3 rounded-full border border-white/12 bg-[#09090B]/92 px-3 sm:px-4 xl:px-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
        {/* Subtle Top Specular Sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Brand / Logo (Visual Squircle Avatar + Status) */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="group flex shrink-0 items-center gap-2.5 transition-transform hover:scale-[1.02]"
          aria-label="Ir al inicio"
        >
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-zinc-800 p-[1.5px] shadow-[0_4px_14px_rgba(109,40,217,0.45)]">
            <img
              src="/erick-avatar-hd.png"
              alt="Erick Rodríguez"
              className="h-full w-full rounded-[14px] bg-[#09090B] object-cover"
            />
            {/* Live Green Online Dot */}
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#09090B]"
              title="Disponible para proyectos"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-display text-[14px] sm:text-[15px] font-black tracking-[0.06em] text-white uppercase leading-none">
              Erick Rodríguez
            </span>
            <span className="mt-1 hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
              Full-Stack &amp; IA
            </span>
          </div>
        </button>

        {/* Central Navigation Tabs with Visual Micro-Icons */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-0.5 rounded-full border border-white/6 bg-white/[0.03] p-1 shadow-inner lg:flex"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center gap-1 rounded-full px-2 xl:px-2.5 2xl:px-3.5 py-1 text-[11px] xl:text-[11.5px] 2xl:text-[13px] font-bold tracking-[0.04em] uppercase whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-b from-white/20 to-white/5 text-white font-extrabold shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] border border-white/15"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  size={13}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`hidden 2xl:inline-block transition-colors ${
                    isActive ? "text-[#A78BFA]" : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Functional 3-Language Segmented Control [ ES | CA | EN ] */}
          <div
            className="flex items-center rounded-full border border-white/10 bg-[#121217] p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            role="group"
            aria-label="Selector de idioma"
          >
            {languages.map((lang) => {
              const isSelected = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-black tracking-wider transition-all duration-150 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-[0_2px_10px_rgba(109,40,217,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] scale-100"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-[#121217] text-zinc-300 shadow-sm transition-all hover:border-violet-500/40 hover:bg-white/5 hover:text-white"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Download CV */}
          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-[#121217] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-200 shadow-sm transition-all hover:border-white/20 hover:text-white 2xl:inline-flex"
          >
            <Download size={12} strokeWidth={2.3} />
            <span>{t.nav.downloadCv}</span>
          </a>

          {/* High-Impact CTA Button (Visual Glow + Shimmer Sheen) */}
          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#6D28D9] bg-[length:200%_auto] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-[12.5px] font-black uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(109,40,217,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-right hover:shadow-[0_6px_22px_rgba(109,40,217,0.75)] active:scale-95 shrink-0"
          >
            <span>{t.nav.talk}</span>
            <ArrowUpRight
              size={14}
              strokeWidth={2.8}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-[#121217] text-white lg:hidden"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Visual Glass Card) */}
      {mobileOpen ? (
        <div className="pointer-events-auto mx-auto mt-2 max-w-[1340px] rounded-3xl border border-white/12 bg-[#09090B]/98 p-4 text-white shadow-2xl backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold tracking-[0.08em] uppercase transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-extrabold shadow-lg"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} className={isActive ? "text-white" : "text-[#A78BFA]"} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-zinc-400 mr-1 uppercase tracking-wider">
                  Idioma:
                </span>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLocale(lang.code)}
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase transition-all ${
                      locale === lang.code
                        ? "bg-[#6D28D9] text-white shadow-md"
                        : "bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <a
                href={cvPdf.url}
                download="Erick-Rodriguez-CV.pdf"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
              >
                <Download size={13} />
                <span>CV</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
