import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";

interface NavbarProps {
  mode?: "studio" | "preview";
  onChangeMode?: (next: "studio" | "preview") => void;
}

const navItems = [
  { id: "hero", label: "Inicio" },
  { id: "proceso", label: "Proceso" },
  { id: "proyectos", label: "Proyectos" },
  { id: "ia", label: "Cerebro" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto", label: "Contacto" },
] as const;

const observedIds = ["hero", "metricas", "orden", "proceso", "proyectos", "ia", "trayectoria", "subvencion", "contacto"];

export function Navbar({ onChangeMode }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
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
    const reduce = false;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
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
    const top = target.getBoundingClientRect().top + window.scrollY - 62;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  const tab = (id: string) =>
    activeId === id ? "t-bg-ink t-on-ink" : "t-muted hover:t-bg-card2 hover:t-ink";
  const ghost = "t-ink t-line t-bg-card border-2 hover:t-bg-ink hover:t-on-ink";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-2.5 z-50 px-3 sm:px-6">
      <div className="t-line t-bg-card t-ink pointer-events-auto mx-auto flex h-[46px] max-w-[1240px] items-center justify-between gap-3 rounded-full border pr-1.5 pl-2">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Ir al inicio"
        >
          <span className="font-display flex h-8 w-8 items-center justify-center rounded-full bg-[#0044FF] text-sm font-extrabold text-white">
            ER
          </span>
          <span className="font-display hidden text-sm font-bold tracking-[0.14em] uppercase min-[460px]:inline sm:text-sm">
            Erick Rodríguez
          </span>
        </button>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-bold tracking-[0.06em] whitespace-nowrap uppercase transition-colors sm:text-sm ${tab(item.id)}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${ghost}`}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            className={`hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold tracking-[0.08em] uppercase transition-colors sm:inline-flex sm:text-sm ${ghost}`}
          >
            <Download size={13} strokeWidth={2.3} />
            <span>CV</span>
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0044FF] px-3 py-2 text-sm sm:px-4 font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#0033CC] sm:text-sm"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full xl:hidden ${ghost}`}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="t-line t-bg-card t-ink pointer-events-auto mx-auto mt-2 max-w-[1240px] rounded-3xl border p-2 xl:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-4 py-2.5 text-left text-sm font-bold tracking-[0.14em] uppercase ${tab(item.id)}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              className={`mt-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold tracking-[0.12em] uppercase ${ghost}`}
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
