import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2, Download, Plus, Sparkles } from "lucide-react";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";

export interface HeroProjectPreview {
  id: string;
  index: string;
  name: string;
  domain: string;
  status: string;
  image?: string;
  href: string;
  isPrivate?: boolean;
}

interface StudioHeroProps {
  mode: "studio" | "preview";
  activeCaseId: string;
  projects: HeroProjectPreview[];
  onChangeMode: (next: "studio" | "preview") => void;
  onSelectProject: (caseId: string) => void;
  onJumpToProjects: (caseId?: string) => void;
}

function useBarcelonaTime() {
  const [time, setTime] = useState("12:00");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 30000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function StudioHero({ mode, onChangeMode, onJumpToProjects }: StudioHeroProps) {
  const barcelonaTime = useBarcelonaTime();

  return (
    <section
      id="inicio"
      className="dark-studio-grid relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#09090B] px-4 pb-5 pt-16 text-white sm:px-8 sm:pt-20"
    >
      {/* Centerpiece macOS Solid Window Stage */}
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-[1140px]"
      >
        <div className="macos-window-frame relative overflow-hidden rounded-[24px] sm:rounded-[28px]">
          {/* macOS Window Title Bar */}
          <div className="flex items-center justify-between border-b border-[#303240] bg-[#21222C] px-5 py-3 sm:px-7">
            {/* Traffic Light Dots */}
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            </div>

            {/* Solid Window Context Pill */}
            <div className="hidden items-center gap-2 rounded-full border border-[#383B4B] bg-[#16161D] px-3.5 py-1 text-[11.5px] font-medium tracking-wide text-zinc-200 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
              <span>La Sagrera, Barcelona · {barcelonaTime} CET</span>
            </div>

            {/* Quick Mode Switch Button */}
            <button
              type="button"
              onClick={() => onChangeMode(mode === "studio" ? "preview" : "studio")}
              aria-label={mode === "studio" ? "Ver ficha Sobre mí" : "Volver a Trabajo"}
              title={mode === "studio" ? "Ver ficha Sobre mí" : "Volver a Trabajo"}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#383B4B] bg-[#2A2C38] px-3 py-1 text-[11.5px] font-semibold text-white transition-colors hover:bg-[#36394A]"
            >
              <span>{mode === "studio" ? "Sobre mí" : "Trabajo"}</span>
              <Plus
                size={13}
                className={`transition-transform duration-300 ${
                  mode === "preview" ? "rotate-45 text-[#60A5FA]" : ""
                }`}
              />
            </button>
          </div>

          {/* Window Content Body */}
          <div className="relative flex min-h-[390px] flex-col justify-between bg-[#16161D] px-6 py-7 sm:min-h-[430px] sm:px-12 sm:py-9 lg:px-16 lg:py-10 2xl:min-h-[500px] 2xl:px-20 2xl:py-14">
            {mode === "studio" ? (
              <motion.div
                key="window-work"
                initial={{ y: 6 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-1 flex-col justify-between"
              >
                {/* Top Pill Status + Display Typography */}
                <div className="my-auto py-2">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#343747] bg-[#21222C] px-3.5 py-1.5 text-xs font-semibold text-zinc-100">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                    <span>
                      Agente del Cambio Tecnológico (375 h) · Disponible para incorporación
                    </span>
                  </div>

                  <h1 className="max-w-4xl font-display text-[clamp(2.35rem,5.4vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                    Webs, ERPs &amp; <br className="hidden sm:block" />
                    sistemas{" "}
                    <span className="font-semibold tracking-[-0.04em] text-[#60A5FA]">
                      inteligentes.
                    </span>
                  </h1>
                </div>

                {/* Clean Pill CTAs + Attribution */}
                <div className="mt-5 flex flex-col justify-between gap-5 border-t border-[#303240] pt-5 md:flex-row md:items-end">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onJumpToProjects()}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#09090B] transition-all hover:bg-[#0044FF] hover:text-white"
                    >
                      <span>Ver proyectos en producción</span>
                      <ArrowDown size={15} strokeWidth={2.4} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onJumpToProjects("private-erp")}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#383B4B] bg-[#21222C] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#4F546A] hover:bg-[#2C2F3D]"
                    >
                      <span>Ver demo ERP presencial</span>
                      <ArrowUpRight size={15} strokeWidth={2.2} />
                    </button>
                  </div>

                  <div className="max-w-sm text-left md:text-right">
                    <p className="text-[14.5px] font-semibold leading-snug text-white">
                      Desarrollador web &amp; especialista en automatización con IA.
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-zinc-300">
                      Top 1 Google en <span className="text-white">diversplas.es</span> · Base en
                      marketing y gestión administrativa.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="window-about"
                initial={{ y: 6 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 grid flex-1 grid-cols-1 items-center gap-6 md:grid-cols-12"
              >
                <div className="flex flex-col items-center md:col-span-5">
                  <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-3xl border-2 border-[#2E5BFF] bg-[#0044FF] shadow-2xl sm:w-52">
                    <img
                      src="/erick-portrait-studio.png"
                      alt="Erick Rodríguez — Desarrollador web y especialista en automatización con IA"
                      loading="eager"
                      decoding="sync"
                      className="block h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start md:col-span-7">
                  <span className="rounded-full border border-[#383B4B] bg-[#21222C] px-3.5 py-1 text-xs font-semibold text-[#60A5FA]">
                    Perfil profesional · La Sagrera, Barcelona
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                    De la idea a <span className="text-[#60A5FA]">producción real.</span>
                  </h2>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-200">
                    Construyo la solución completa (web, plataforma, ERP o flujo autónomo con IA y
                    n8n) y la llevo a producción sin depender de terceros, uniendo técnica y visión
                    de negocio.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#383B4B] bg-[#21222C] px-3.5 py-1.5 text-zinc-100">
                      <CheckCircle2 size={13} className="text-[#60A5FA]" />
                      <span>CFGS Marketing + CFGM Gestión Adm. (Monlau)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#383B4B] bg-[#21222C] px-3.5 py-1.5 text-zinc-100">
                      <Sparkles size={13} className="text-[#60A5FA]" />
                      <span>375 h Acreditación Agente del Cambio</span>
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={cvPdf.url}
                      download="Erick-Rodriguez-CV.pdf"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#09090B] transition-colors hover:bg-[#0044FF] hover:text-white"
                    >
                      <Download size={14} />
                      <span>Descargar CV en PDF</span>
                    </a>
                    <a
                      href="mailto:hola.erickmartinezz@gmail.com"
                      className="rounded-full border border-[#383B4B] bg-[#21222C] px-4 py-2.5 text-xs font-semibold text-zinc-100 hover:bg-[#2C2F3D]"
                    >
                      hola.erickmartinezz@gmail.com
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Centered Scroll Down Indicator */}
            <div className="mt-3 flex justify-center pt-1">
              <button
                type="button"
                onClick={() => onJumpToProjects()}
                aria-label="Bajar a proyectos"
                className="group inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#383B4B] bg-[#21222C] text-zinc-200 transition-all hover:border-[#4F546A] hover:text-white"
              >
                <ArrowDown
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Whisper-Clean Credential Strip */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs font-medium text-zinc-300">
        <span>+1.000 h experiencia real</span>
        <span aria-hidden="true" className="hidden text-zinc-600 lg:inline">
          •
        </span>
        <span>Top 1 Google · diversplas.es</span>
        <span aria-hidden="true" className="hidden text-zinc-600 lg:inline">
          •
        </span>
        <a
          href="mailto:hola.erickmartinezz@gmail.com"
          className="text-white transition-colors hover:text-[#60A5FA]"
        >
          hola.erickmartinezz@gmail.com
        </a>
        <span aria-hidden="true" className="hidden text-zinc-600 lg:inline">
          •
        </span>
        <span className="tabular-nums">+34 640 63 0459</span>
      </div>
    </section>
  );
}
