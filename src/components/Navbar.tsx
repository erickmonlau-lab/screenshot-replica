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

const observedIds = ["hero", "metricas", "proyectos", "ia", "trayectoria", "contacto"];
const lightSections = new Set<string>(["hero", "proyectos", "trayectoria"]);

export function Navbar({ onChangeMode }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const update = () => {
      let current = sections[0]!.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 80) current = section.id;
      }
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
    const top = target.getBoundingClientRect().top + window.scrollY - 62;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  const light = lightSections.has(activeId);

  const pill = light
    ? "border-[#CDD1D8] bg-white text-[#0B0C10]"
    : "border-[#2A2D3B] bg-[#0F1117] text-white";
  const muted = light
    ? "text-[#4B5160] hover:bg-[#EEF0F3] hover:text-[#0B0C10]"
    : "text-zinc-400 hover:bg-[#1A1D28] hover:text-white";
  const activeTab = light ? "bg-[#0B0C10] text-white" : "bg-white text-[#0B0C10]";
  const ghostBtn = light
    ? "border-[#0B0C10] bg-white text-[#0B0C10] hover:bg-[#0B0C10] hover:text-white"
    : "border-[#3A3E52] bg-[#0F1117] text-white hover:bg-white hover:text-[#0B0C10]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-2.5 z-50 px-3 sm:px-6">
      <div
        className={`pointer-events-auto mx-auto flex h-[46px] max-w-[1100px] items-center justify-between gap-3 rounded-full border pr-1.5 pl-2 ${pill}`}
      >
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Ir al inicio"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0044FF] font-display text-[11px] font-extrabold text-white">
            ER
          </span>
          <span className="font-display text-xs font-bold tracking-[0.14em] uppercase">
            Erick Rodríguez
          </span>
        </button>

        <nav aria-label="Navegación principal" className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] whitespace-nowrap uppercase transition-colors ${
                activeId === item.id ? activeTab : muted
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            className={`hidden items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors sm:inline-flex ${ghostBtn}`}
          >
            <Download size={12} strokeWidth={2.3} />
            <span>CV</span>
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0044FF] px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#0033CC]"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border lg:hidden ${ghostBtn}`}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className={`pointer-events-auto mx-auto mt-2 max-w-[1100px] rounded-3xl border p-2 lg:hidden ${pill}`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-4 py-2.5 text-left text-xs font-bold tracking-[0.14em] uppercase ${
                  activeId === item.id ? activeTab : muted
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              className={`mt-1 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold tracking-[0.12em] uppercase ${ghostBtn}`}
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
