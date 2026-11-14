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
      const navOffset = 92;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", href);
    }
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3.5 sm:px-8 sm:pt-5">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4">
        {/* Left Identity — Perry Wang style (Erick Rodríguez / Web & IA) */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="pointer-events-auto flex flex-col rounded-2xl border border-white/10 bg-[#0A0A0E]/80 px-4 py-2 backdrop-blur-xl transition-colors hover:border-white/25"
        >
          <span className="text-[14px] font-bold tracking-[-0.02em] text-white whitespace-nowrap">
            Erick Rodríguez
          </span>
          <span className="text-[11.5px] font-medium text-zinc-400 whitespace-nowrap">
            Web &amp; Automatización IA
          </span>
        </a>

        {/* Center Segmented Glass Pill with Glowing Top Indicator — Perry Wang Signature */}
        <div
          style={{
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/15 bg-[#121217]/88 p-1.5 shadow-[0_14px_38px_-10px_rgba(0,0,0,0.75)] lg:flex"
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
                      className="pointer-events-none absolute -top-[7px] left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.85)]"
                    />
                    <motion.span
                      layoutId="navPillActive"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.11]"
                    />
                  </>
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}

          <span className="mx-1 h-4 w-px bg-white/12" aria-hidden="true" />

          <nav className="flex items-center gap-0.5" aria-label="Secciones principales">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right External Actions — Perry Wang Minimal Links + Mobile Hamburger */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/12 bg-[#0A0A0E]/82 px-2.5 py-1.5 backdrop-blur-xl">
          <a
            href={cvPdf.url}
            download="Erick-Rodriguez-CV.pdf"
            className="hidden items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            <span>CV (PDF)</span>
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </a>

          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0044FF] px-4 py-1.5 text-[13px] font-bold text-white shadow-[0_6px_20px_rgba(0,68,255,0.45)] transition-all hover:bg-white hover:text-[#050507]"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={13} strokeWidth={2.4} />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Menú móvil"
            className="pointer-events-auto mx-auto mt-2.5 flex max-w-[1380px] flex-col gap-1.5 rounded-3xl border border-white/15 bg-[#0C0C10]/96 p-4 text-white shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mb-1 flex gap-1.5 rounded-full border border-white/12 bg-white/[0.05] p-1">
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
                className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 text-base font-semibold text-zinc-200 transition-colors hover:bg-white/10"
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} className="text-[#60A5FA]" />
              </a>
            ))}
            <a
              href={cvPdf.url}
              download="Erick-Rodriguez-CV.pdf"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 text-base font-semibold text-zinc-200 transition-colors hover:bg-white/10"
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
