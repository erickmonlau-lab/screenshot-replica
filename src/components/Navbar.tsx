import { useEffect, useState } from "react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";

interface NavbarProps {
  mode?: "studio" | "preview";
  onChangeMode?: (next: "studio" | "preview") => void;
}

const navItems = [
  { id: "hero", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "ia", label: "Trabajo con IA" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto", label: "Contacto" },
] as const;

export function Navbar({ onChangeMode }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.05 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
    const navOffset = 62;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-[62px] border-b border-[#252836] bg-[#09090B]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Monogram + Brand */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="group flex shrink-0 items-center gap-2.5 text-left"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#3B6BFF] bg-[#0044FF] font-display text-xs font-extrabold tracking-tight text-white transition-transform group-hover:scale-105">
            ER
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xs font-bold tracking-[0.14em] text-white uppercase sm:text-[13px]">
              ERICK RODRÍGUEZ
            </span>
            <span className="mt-0.5 hidden text-[10px] font-medium tracking-[0.06em] text-zinc-400 sm:block">
              Web &amp; Automatización IA
            </span>
          </span>
        </button>

        {/* Center: Editorial Uppercase Tracked Navigation */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 rounded-full border border-[#272B3B] bg-[#12141C] px-1.5 py-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase transition-colors xl:px-4 ${
                  isActive
                    ? "bg-[#232737] text-white"
                    : "text-zinc-400 hover:bg-[#191C28] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: CV Download + Primary CTA Pill */}
        <div className="flex items-center gap-2">
          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            className="hidden items-center gap-1.5 rounded-full border border-[#2C3142] bg-[#141620] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.1em] text-zinc-200 uppercase transition-colors hover:border-[#495270] hover:bg-[#1C202E] hover:text-white sm:inline-flex"
          >
            <Download size={12} strokeWidth={2.3} />
            <span>CV</span>
          </a>

          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0044FF] px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#1A58FF] active:scale-[0.98]"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#2C3142] bg-[#141620] text-zinc-200 lg:hidden"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Solid Mobile/Tablet Dropdown Navigation */}
      {mobileOpen ? (
        <div className="border-b border-[#252836] bg-[#09090B] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-bold tracking-[0.14em] uppercase ${
                    isActive
                      ? "border border-[#33384D] bg-[#1A1D29] text-white"
                      : "border border-transparent bg-[#12141C] text-zinc-300"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0044FF]" />
                </button>
              );
            })}
            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2E3346] bg-[#161924] px-3.5 py-2.5 text-xs font-bold tracking-[0.12em] text-white uppercase"
            >
              <Download size={13} />
              <span>Descargar CV (PDF)</span>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
