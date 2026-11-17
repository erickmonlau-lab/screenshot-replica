import React from "react";
import { ArrowUp, Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";

interface FooterV2Props {
  cvUrl?: string;
}

export const FooterV2: React.FC<FooterV2Props> = ({ cvUrl = "/erick-rodriguez-cv.pdf" }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0E0E11] text-[#F4F4F5] border-t-2 border-[#27272A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#27272A]">
          {/* Identity col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-[#1D4ED8] text-white font-mono font-black text-sm flex items-center justify-center border border-white/20">
                ER
              </span>
              <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">
                ERICK RODRÍGUEZ
              </span>
              <span className="text-xs font-mono text-[#A1A1AA] border border-[#27272A] px-2 py-0.5 ml-2">
                PRODUCT BUILDER
              </span>
            </div>

            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md">
              Conecto procesos de negocio, criterio de gestión y desarrollo tecnológico para crear productos web,
              sistemas de control operativo y automatizaciones que resuelven problemas reales.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-[#E4E4E7]">
                Disponible para proyectos y contratación · Barcelona / Remoto
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              Índice
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#proyectos" className="text-[#A1A1AA] hover:text-white transition-colors">
                  01. Casos de estudio
                </a>
              </li>
              <li>
                <a href="#que-resuelvo" className="text-[#A1A1AA] hover:text-white transition-colors">
                  02. Qué resuelvo
                </a>
              </li>
              <li>
                <a href="#como-trabajo" className="text-[#A1A1AA] hover:text-white transition-colors">
                  03. Cómo trabajo
                </a>
              </li>
              <li>
                <a href="#trayectoria" className="text-[#A1A1AA] hover:text-white transition-colors">
                  04. Trayectoria y formación
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-[#A1A1AA] hover:text-white transition-colors">
                  05. Contacto dual
                </a>
              </li>
            </ul>
          </div>

          {/* Direct channels & downloads */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
              Canales directos
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a
                href="mailto:hola.erickrodriguez@gmail.com"
                className="flex items-center gap-2 p-2.5 bg-[#18181B] border border-[#27272A] hover:border-[#1D4ED8] hover:text-white text-[#A1A1AA] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <span>Email directo</span>
              </a>
              <a
                href="https://wa.me/34640630459"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 bg-[#18181B] border border-[#27272A] hover:border-emerald-500 hover:text-white text-[#A1A1AA] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://www.linkedin.com/in/erick-rodriguez-martinez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 bg-[#18181B] border border-[#27272A] hover:border-[#1D4ED8] hover:text-white text-[#A1A1AA] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/erickmonlau-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 bg-[#18181B] border border-[#27272A] hover:border-white hover:text-white text-[#A1A1AA] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            <a
              href={cvUrl}
              download="Erick_Rodriguez_CV_2026.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Currículum Vitae PDF</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div>
            © 2026 Erick Rodríguez · Barcelona (La Sagrera) · Presencial o Remoto
          </div>
          <div className="flex items-center gap-6">
            <span>NextGenEU · Agente del Cambio Tecnológico</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Volver arriba"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
