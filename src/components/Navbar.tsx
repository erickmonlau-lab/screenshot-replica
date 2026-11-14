import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";

interface NavbarProps {
  mode: "studio" | "preview";
  onChangeMode: (next: "studio" | "preview") => void;
}

const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Trabajo con IA", href: "#ia" },
  { label: "Trayectoria", href: "#trayectoria" },
];

export function Navbar({ mode, onChangeMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const navOffset = 62;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", href);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2A2D3B] bg-[#09090B] px-4 py-2 sm:px-8">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4">
        {/* Left Identity — Solid Graphite Card */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="flex flex-col rounded-2xl border border-[#303240] bg-[#16161D] px-3.5 py-1 transition-colors hover:border-[#4B4F66]"
        >
          <span className="whitespace-nowrap text-[13px] font-bold tracking-[-0.02em] text-white">
            Erick Rodríguez
          </span>
          <span className="whitespace-nowrap text-[10.5px] font-medium text-zinc-300">
            Web &amp; Automatización IA
          </span>
        </a>

        {/* Center Segmented Solid Pill */}
        <div
          className="hidden items-center gap-1 rounded-full border border-[#303240] bg-[#16161D] p-1 lg:flex"
          role="tablist"
          aria-label="Modo de vista y navegación"
        >
          {(
            [
              { id: "studio", label: "Trabajo" },
              { id: "preview", label: "Sobre mí" },
            ] as const
          ).map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  onChangeMode(tab.id);
                  if (window.scrollY > 140) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`relative whitespace-nowrap rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {active && (
                  <>
                    <motion.span
                      layoutId="navTopGlow"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="pointer-events-none absolute -top-[7px] left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-white"
                    />
                    <motion.span
                      layoutId="navPillActive"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-full border border-[#3E4254] bg-[#222530]"
                    />
                  </>
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}

          <span className="mx-1 h-4 w-px bg-[#2A2C38]" aria-hidden="true" />

          <nav className="flex items-center gap-0.5" aria-label="Secciones principales">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-[#1E202B] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Solid Actions + Mobile Hamburger */}
        <div className="flex items-center gap-2 rounded-full border border-[#303240] bg-[#16161D] px-2 py-1">
          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            className="hidden items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[12.5px] font-semibold text-zinc-200 transition-colors hover:bg-[#21222C] hover:text-white sm:inline-flex"
          >
            <span>CV (PDF)</span>
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </a>

          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0044FF] px-4 py-1 text-[12.5px] font-bold text-white transition-all hover:bg-white hover:text-[#050507]"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={13} strokeWidth={2.4} />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#303240] bg-[#21222C] text-white transition-colors hover:bg-[#2E3142] lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Solid Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ y: -6 }}
            animate={{ y: 0 }}
            exit={{ y: -6 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Menú móvil"
            className="mx-auto mt-2.5 flex max-w-[1380px] flex-col gap-1.5 rounded-3xl border border-[#303240] bg-[#16161D] p-4 text-white shadow-2xl lg:hidden"
          >
            <div className="mb-1 flex gap-1.5 rounded-full border border-[#2A2C38] bg-[#161820] p-1">
              {(
                [
                  { id: "studio", label: "Trabajo" },
                  { id: "preview", label: "Sobre mí" },
                ] as const
              ).map((tab) => {
                const active = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      onChangeMode(tab.id);
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex-1 rounded-full py-2 text-xs font-bold transition-colors ${
                      active ? "bg-[#0044FF] text-white" : "text-zinc-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 text-base font-semibold text-zinc-200 transition-colors hover:bg-[#1C1E28]"
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} className="text-[#60A5FA]" />
              </a>
            ))}
            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 text-base font-semibold text-zinc-200 transition-colors hover:bg-[#1C1E28]"
            >
              <span>Descargar CV (PDF)</span>
              <ArrowUpRight size={16} className="text-[#60A5FA]" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
