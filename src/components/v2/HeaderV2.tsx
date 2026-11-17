import { useState, useEffect, useRef } from "react";
import { Download, Menu, X, ArrowUpRight, FileText, Briefcase, Mail } from "lucide-react";

interface HeaderV2Props {
  cvUrl?: string;
}

export function HeaderV2({ cvUrl = "/erick-rodriguez-cv.pdf" }: HeaderV2Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Qué resuelvo", href: "#que-resuelvo" },
    { label: "Cómo trabajo", href: "#como-trabajo" },
    { label: "Trayectoria", href: "#trayectoria" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-[#D4D4D0] bg-[#F6F5F0]/95 backdrop-blur-md shadow-xs py-3"
          : "border-b border-transparent bg-[#F6F5F0]/80 backdrop-blur-xs py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between px-5 sm:px-8">
        {/* Brand identity */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-[#111111] transition-transform active:scale-98"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#111111] bg-[#1D4ED8] font-mono text-xs font-black text-white shadow-[2px_2px_0_#111111] transition-all group-hover:shadow-[3px_3px_0_#111111]">
            ER
          </span>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-[#111111]">
              ERICK RODRÍGUEZ
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#57575C]">
              Product Builder
            </span>
          </div>
        </a>

        {/* Center navigation (Desktop) */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1 rounded-full border border-[#D4D4D0] bg-white/80 px-4 py-1.5 shadow-2xs backdrop-blur-sm"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1 text-xs sm:text-sm font-semibold text-[#57575C] transition-colors hover:text-[#111111] hover:bg-[#EFEFE9]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Dual Path: Recruiters & Clients */}
        <div className="hidden md:flex items-center gap-3">
          {/* Path for Recruiters: CV */}
          <a
            href={cvUrl}
            download="Erick-Rodriguez-CV.pdf"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D4D4D0] bg-white px-3.5 py-1.5 text-xs font-bold text-[#111111] transition-all hover:border-[#111111] hover:shadow-[2px_2px_0_#111111]"
            title="Descargar Curriculum Vitae en PDF"
          >
            <Download size={13} className="text-[#1D4ED8]" />
            <span>CV</span>
          </a>

          {/* Path for Clients: Hablemos */}
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#111111] bg-[#1D4ED8] px-4 py-1.5 text-xs font-bold text-white shadow-[2px_2px_0_#111111] transition-all hover:bg-[#1E40AF] hover:shadow-[3px_3px_0_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#111111]"
          >
            <span>Hablemos</span>
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#contacto"
            className="rounded-full border border-[#111111] bg-[#1D4ED8] px-3 py-1 text-xs font-bold text-white shadow-[1px_1px_0_#111111]"
          >
            Hablemos
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#111111] bg-white text-[#111111] shadow-[2px_2px_0_#111111] transition-all active:scale-95"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      {mobileOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-0 top-[65px] z-40 flex flex-col justify-between border-t border-[#D4D4D0] bg-[#F6F5F0] p-6 shadow-2xl md:hidden"
        >
          <div className="space-y-6">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#57575C]">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-[#D4D4D0]/60 pb-3 font-display text-2xl font-bold tracking-tight text-[#111111] hover:text-[#1D4ED8]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#57575C]">0{idx + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Dual Path Actions in Mobile */}
          <div className="space-y-3 pt-6 border-t border-[#D4D4D0]">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#57575C]">
              ¿Qué necesitas?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="flex flex-col items-start gap-1 rounded-xl border-2 border-[#111111] bg-[#1D4ED8] p-3 text-white shadow-[3px_3px_0_#111111]"
              >
                <div className="flex items-center justify-between w-full">
                  <Briefcase size={16} />
                  <ArrowUpRight size={14} />
                </div>
                <span className="font-bold text-sm mt-1">Iniciar Proyecto</span>
                <span className="text-[11px] text-blue-100">Clientes & Pymes</span>
              </a>

              <a
                href={cvUrl}
                download="Erick-Rodriguez-CV.pdf"
                onClick={() => setMobileOpen(false)}
                className="flex flex-col items-start gap-1 rounded-xl border-2 border-[#111111] bg-white p-3 text-[#111111] shadow-[3px_3px_0_#111111]"
              >
                <div className="flex items-center justify-between w-full">
                  <FileText size={16} className="text-[#1D4ED8]" />
                  <Download size={14} />
                </div>
                <span className="font-bold text-sm mt-1">Descargar CV</span>
                <span className="text-[11px] text-[#57575C]">Recruiters (PDF)</span>
              </a>
            </div>

            <div className="pt-2 text-center text-xs font-medium text-[#57575C]">
              hola.erickrodriguez@gmail.com · Barcelona
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
