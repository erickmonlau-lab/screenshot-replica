import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#050507] px-4 pb-12 pt-28 text-white sm:px-8 sm:pt-32"
    >
      {/* Orderalo v5 radial studio ambient glow + architectural 72px grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_65%_50%_at_50%_42%,rgba(0,68,255,0.22),rgba(109,40,217,0.1)_40%,rgba(5,5,7,0)_74%)]"
      />
      <div
        aria-hidden="true"
        className="dark-studio-grid pointer-events-none absolute inset-0 -z-10 opacity-45 [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_78%)]"
      />

      {/* Centerpiece macOS Glass Window Stage (Perry Wang Inspiration + Orderalo Specular Bezel) */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-[1060px]"
      >
        {/* Soft Halo Behind Window */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -top-6 h-40 rounded-full bg-gradient-to-r from-[#0044FF]/25 via-white/10 to-[#6D28D9]/25 blur-3xl"
        />

        <div className="macos-window-frame relative overflow-hidden rounded-[26px] backdrop-blur-2xl sm:rounded-[32px]">
          {/* Subtle Top Specular Edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />

          {/* macOS Window Title Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-5 py-3.5 sm:px-7">
            {/* Traffic Light Dots */}
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
            </div>

            {/* Subtle Window Context Pill */}
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1 text-[11.5px] font-medium tracking-wide text-zinc-400 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
              <span>La Sagrera, Barcelona · {barcelonaTime} CET</span>
            </div>

            {/* Quick Mode / Reset Button (+ Icon like Perry Wang Window) */}
            <button
              type="button"
              onClick={() => onChangeMode(mode === "studio" ? "preview" : "studio")}
              aria-label={mode === "studio" ? "Ver ficha Sobre mí" : "Volver a Trabajo"}
              title={mode === "studio" ? "Ver ficha Sobre mí" : "Volver a Trabajo"}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11.5px] font-semibold text-zinc-300 transition-colors hover:bg-white/[0.12] hover:text-white"
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
          <div className="relative flex min-h-[470px] flex-col justify-between px-6 py-10 sm:min-h-[540px] sm:px-14 sm:py-14 lg:px-20 lg:py-16">
            {/* Inner Atmospheric Dark Spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.06),transparent_62%)]"
            />

            <AnimatePresence mode="wait">
              {mode === "studio" ? (
                <motion.div
                  key="window-work"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex flex-1 flex-col justify-between"
                >
                  {/* Top Pill Status + Display Typography */}
                  <div className="my-auto py-4">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-zinc-200">
                      <span className="h-2 w-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
                      <span>
                        Agente del Cambio Tecnológico (375 h) · Disponible para incorporación
                      </span>
                    </div>

                    <h1 className="hero-headline-glow max-w-4xl font-display text-[clamp(2.5rem,5.9vw,4.9rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
                      Webs, ERPs &amp; <br className="hidden sm:block" />
                      sistemas{" "}
                      <span className="font-editorial-serif bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-[1.12em] font-normal text-transparent">
                        inteligentes.
                      </span>
                    </h1>
                  </div>

                  {/* Perry Wang Signature Bottom-Right Asymmetric Attribution + Clean Pill CTAs */}
                  <div className="mt-8 flex flex-col justify-between gap-8 border-t border-white/[0.08] pt-7 md:flex-row md:items-end">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onJumpToProjects()}
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#050507] shadow-[0_12px_30px_-8px_rgba(255,255,255,0.45)] transition-all hover:bg-[#3B82F6] hover:text-white"
                      >
                        <span>Ver proyectos en producción</span>
                        <ArrowDown size={15} strokeWidth={2.4} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onJumpToProjects("private-erp")}
                        className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/35 hover:bg-white/[0.12]"
                      >
                        <span>Ver demo ERP presencial</span>
                        <ArrowUpRight size={15} strokeWidth={2.2} />
                      </button>
                    </div>

                    <div className="max-w-sm text-left md:text-right">
                      <p className="text-[15px] font-semibold leading-snug text-white">
                        Desarrollador web &amp; especialista en automatización con IA.
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-400">
                        Top 1 Google en <span className="text-zinc-200">diversplas.es</span> · Base
                        en marketing y gestión administrativa.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="window-about"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-12"
                >
                  <div className="flex flex-col items-center md:col-span-5">
                    <div className="relative w-52 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0044FF]/70 via-[#002bb8]/80 to-[#0A0A10] p-4 pb-0 shadow-2xl sm:w-60">
                      <img
                        src="/erick-portrait-studio.png"
                        alt="Erick Rodríguez — Desarrollador web y especialista en automatización con IA"
                        className="block h-auto w-full object-contain object-bottom drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:col-span-7">
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-semibold text-[#60A5FA]">
                      Perfil profesional · La Sagrera, Barcelona
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                      De la idea a{" "}
                      <span className="font-editorial-serif text-[1.12em] font-normal text-zinc-300">
                        producción real.
                      </span>
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-zinc-300">
                      Construyo la solución completa (web, plataforma, ERP o flujo autónomo con IA y
                      n8n) y la llevo a producción sin depender de terceros, uniendo técnica y
                      visión de negocio.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-zinc-200">
                        <CheckCircle2 size={13} className="text-[#60A5FA]" />
                        <span>CFGS Marketing + CFGM Gestión Adm. (Monlau)</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-zinc-200">
                        <Sparkles size={13} className="text-[#60A5FA]" />
                        <span>375 h Acreditación Agente del Cambio</span>
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={cvPdf.url}
                        download="Erick-Rodriguez-CV.pdf"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#050507] transition-colors hover:bg-[#3B82F6] hover:text-white"
                      >
                        <Download size={14} />
                        <span>Descargar CV en PDF</span>
                      </a>
                      <a
                        href="mailto:hola.erickmartinezz@gmail.com"
                        className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/[0.12]"
                      >
                        hola.erickmartinezz@gmail.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Centered Scroll Down Indicator (Perry Wang Window Detail) */}
            <div className="mt-4 flex justify-center pt-2">
              <button
                type="button"
                onClick={() => onJumpToProjects()}
                aria-label="Bajar a proyectos"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-all hover:border-white/30 hover:text-white"
              >
                <ArrowDown
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Whisper-Clean Credential Strip */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-400">
        <span>+1.000 h experiencia real</span>
        <span aria-hidden="true" className="hidden text-zinc-700 lg:inline">
          •
        </span>
        <span>Top 1 Google · diversplas.es</span>
        <span aria-hidden="true" className="hidden text-zinc-700 lg:inline">
          •
        </span>
        <a
          href="mailto:hola.erickmartinezz@gmail.com"
          className="text-zinc-300 transition-colors hover:text-white"
        >
          hola.erickmartinezz@gmail.com
        </a>
        <span aria-hidden="true" className="hidden text-zinc-700 lg:inline">
          •
        </span>
        <span className="tabular-nums">+34 640 63 0459</span>
      </div>
    </section>
  );
}
