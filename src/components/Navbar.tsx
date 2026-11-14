import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  mode?: "studio" | "preview";
  onChangeMode?: (next: "studio" | "preview") => void;
}

const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Trabajo con IA", href: "#ia" },
  { label: "Trayectoria", href: "#trayectoria" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar(_props: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const navOffset = 96;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", href);
    }
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center bg-gradient-to-b from-white/95 via-white/75 to-transparent px-4 pb-3 pt-3 sm:px-8 sm:pt-3.5">
      <div
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-white/15 bg-[#0A0F1D]/95 px-3 py-2 text-white shadow-[0_14px_36px_-10px_rgba(10,15,29,0.45)] sm:px-4 sm:py-2.5"
      >
        {/* Clean Brand Identity Pill (Never wraps) */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/[0.08] py-1.5 pl-3 pr-3.5 text-sm font-extrabold tracking-[-0.02em] text-white transition-colors hover:bg-white/[0.14]"
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0044FF] shadow-[0_0_10px_#3B82F6]"
            aria-hidden="true"
          />
          <span>Erick Rodríguez</span>
          <span className="hidden rounded-full bg-[#0044FF] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white sm:inline-block">
            BCN
          </span>
        </a>

        {/* Desktop & Tablet Pill Links (Never wraps) */}
        <nav
          className="hidden items-center gap-0.5 md:flex lg:gap-1"
          aria-label="Navegación principal"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-bold tracking-[-0.01em] text-white/85 transition-colors hover:bg-white/10 hover:text-white lg:px-4 lg:text-[13.5px]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Primary Pill CTA + Mobile Drawer Trigger */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0044FF] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_6px_18px_rgba(0,68,255,0.45)] transition-all hover:bg-white hover:text-[#0A0F1D] sm:inline-flex lg:px-5"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
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
            className="pointer-events-auto mt-2.5 flex w-full max-w-5xl flex-col gap-1.5 rounded-3xl border border-white/15 bg-[#0A0F1D]/98 p-3.5 text-white shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 text-base font-bold text-white/90 transition-colors hover:bg-white/10"
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} className="text-[#60A5FA]" />
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              className="mt-1 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0044FF] px-5 text-sm font-extrabold uppercase tracking-wider text-white"
            >
              <span>Hablemos ahora</span>
              <ArrowUpRight size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
