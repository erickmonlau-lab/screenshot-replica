import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { ScribbleUnderline } from "./DrawnMarks";
import { Magnetic } from "./portfolio-motion";

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

export function StudioHero({
  mode,
  activeCaseId,
  projects,
  onChangeMode,
  onSelectProject,
  onJumpToProjects,
}: StudioHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const barcelonaTime = useBarcelonaTime();

  const activeProject = (projects.find((p) => p.id === activeCaseId) ?? projects[0])!;

  return (
    <section
      id="inicio"
      className="studio-grid-light relative scroll-mt-28 overflow-hidden bg-white pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Subtle Ambient Cobalt Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#0044FF]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[340px] w-[340px] rounded-full bg-[#0044FF]/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN: Dominant Oversized Typography + Single Cobalt Accent + Pill CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start lg:col-span-7"
          >
            {/* Category Pill Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#0044FF]/20 bg-[#F4F7FF] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#0044FF]">
              <span className="h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
              <span>Desarrollador Web &amp; Automatización IA · Barcelona</span>
            </div>

            {/* Dominant Oversized Headline */}
            <h1 className="mt-6 font-display text-[clamp(2.35rem,5.3vw,4.4rem)] font-black leading-[1.03] tracking-[-0.04em] text-[#0A0F1D]">
              Webs, plataformas y ERPs{" "}
              <span className="relative inline-block text-[#0044FF]">
                con IA a producción.
                <ScribbleUnderline className="pointer-events-none absolute -bottom-2 left-0 h-3.5 w-full text-[#0044FF]" />
              </span>
            </h1>

            {/* Clear Real CV Positioning Subtitle */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
              Desarrollador web y especialista en{" "}
              <strong className="font-bold text-[#0A0F1D]">
                automatización de procesos con IA
              </strong>
              , con base en <strong className="font-bold text-[#0A0F1D]">marketing digital</strong>{" "}
              y <strong className="font-bold text-[#0A0F1D]">gestión administrativa</strong>.
              Construyo la solución completa y la llevo a producción sin depender de terceros.
            </p>

            {/* Pill CTA Row */}
            <div className="mt-8 flex w-full flex-wrap items-center gap-3.5 sm:w-auto">
              <Magnetic strength={0.12}>
                <button
                  type="button"
                  onClick={() => onJumpToProjects()}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-[#0044FF] px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_14px_32px_-6px_rgba(0,68,255,0.48)] transition-all hover:bg-[#0A0F1D] active:scale-[0.99]"
                >
                  <span>Ver proyectos en producción</span>
                  <ArrowDown size={16} strokeWidth={2.5} />
                </button>
              </Magnetic>

              <button
                type="button"
                onClick={() => onJumpToProjects("private-erp")}
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border-2 border-[#0A0F1D]/15 bg-white px-6 py-3.5 text-sm font-extrabold text-[#0A0F1D] transition-all hover:border-[#0044FF] hover:text-[#0044FF]"
              >
                <span>Ver demo ERP presencial</span>
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </button>
            </div>

            {/* Real Credentials & Direct Contact Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-slate-200/90 pt-6 text-xs font-bold text-[#475569]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7FF] px-3.5 py-1.5 text-[#0A0F1D]">
                <CheckCircle2 size={14} className="text-[#0044FF]" />
                <span>Top 1 Google · diversplas.es</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7FF] px-3.5 py-1.5 text-[#0A0F1D]">
                <Sparkles size={14} className="text-[#0044FF]" />
                <span>Agente del Cambio Oficial (375 h)</span>
              </span>
              <a
                href="mailto:hola.erickmartinezz@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7FF] px-3.5 py-1.5 text-[#0044FF] transition-colors hover:bg-[#0044FF] hover:text-white"
              >
                <span>hola.erickmartinezz@gmail.com</span>
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7FF] px-3.5 py-1.5 text-[#0A0F1D] tabular-nums">
                <MapPin size={13} className="text-[#0044FF]" />
                <span>+34 640 63 0459 · {barcelonaTime} CET</span>
              </span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Framed Cobalt Studio Portrait & Quick Project Switcher Card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="hero-cobalt-stage relative overflow-hidden rounded-3xl border border-[#0044FF]/30 p-5 text-white shadow-[0_24px_60px_-15px_rgba(0,68,255,0.38)] sm:p-6">
              {/* Top Pill Header inside Card */}
              <div className="relative z-20 flex items-center justify-between gap-2">
                <div
                  className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-[#0A0F1D]/40 p-1 backdrop-blur-md"
                  role="tablist"
                  aria-label="Modo de vista del Hero"
                >
                  {(
                    [
                      { id: "studio", label: "Retrato" },
                      { id: "preview", label: "Vista rápida" },
                    ] as const
                  ).map((tab) => {
                    const active = mode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChangeMode(tab.id)}
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-extrabold transition-colors sm:px-3.5 ${
                          active
                            ? "bg-white text-[#0A0F1D] shadow-xs"
                            : "text-white/85 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white sm:px-3">
                  La Sagrera · BCN
                </span>
              </div>

              <AnimatePresence mode="wait">
                {mode === "studio" ? (
                  <motion.div
                    key="hero-portrait-card"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative mt-5 flex flex-col items-center pt-2"
                  >
                    {/* Subtle Oversized Display Backdrop Wordmark */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none select-none font-display text-[4.4rem] font-black uppercase leading-[0.82] tracking-[-0.05em] text-white/25 sm:text-[5.4rem]"
                    >
                      ERICK
                    </div>

                    {/* Studio Portrait */}
                    <div className="relative z-10 -mt-5 flex w-[230px] flex-col items-center sm:w-[260px]">
                      <img
                        src="/erick-portrait-studio.png"
                        alt="Erick Rodríguez — Desarrollador web y especialista en automatización con IA"
                        className="block h-auto w-full object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.4)]"
                      />
                    </div>

                    {/* Bottom Floating Pill Summary Strip */}
                    <div className="relative z-20 -mx-5 -mb-5 mt-2 flex w-[calc(100%+2.5rem)] items-center justify-between gap-3 border-t border-white/15 bg-[#0A0F1D]/90 px-5 py-4 backdrop-blur-md sm:-mx-6 sm:-mb-6 sm:w-[calc(100%+3rem)] sm:px-6">
                      <div>
                        <div className="font-display text-sm font-extrabold text-white">
                          Erick Rodríguez
                        </div>
                        <div className="text-xs font-medium text-blue-200">
                          Web · Automatización IA · Negocio
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onChangeMode("preview")}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0044FF] px-3.5 py-2 text-xs font-extrabold text-white transition-colors hover:bg-white hover:text-[#0A0F1D]"
                      >
                        <span>Ver demos</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hero-preview-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 flex flex-col gap-3"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => onSelectProject(p.id)}
                          className={`rounded-full px-3 py-1 text-xs font-extrabold transition-colors ${
                            p.id === activeProject.id
                              ? "bg-white text-[#0044FF]"
                              : "bg-white/15 text-white hover:bg-white/25"
                          }`}
                        >
                          {p.index} · {p.name}
                        </button>
                      ))}
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#0A0F1D] shadow-lg">
                      {activeProject.isPrivate ? (
                        <div className="flex aspect-[16/10] flex-col items-center justify-center p-5 text-center text-white">
                          <span className="rounded-full bg-[#0044FF] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                            Demo presencial
                          </span>
                          <h3 className="mt-3 font-display text-lg font-extrabold">
                            ERP &amp; App sin publicar para mostrar en vivo
                          </h3>
                          <button
                            type="button"
                            onClick={() => onJumpToProjects("private-erp")}
                            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#0A0F1D]"
                          >
                            <span>Ver esquema interactivo</span>
                            <ArrowDown size={13} />
                          </button>
                        </div>
                      ) : (
                        <img
                          src={activeProject.image}
                          alt={`Vista previa de ${activeProject.name}`}
                          className="aspect-[16/10] w-full object-cover object-top"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs font-bold text-white">
                      <span>
                        {activeProject.name} · {activeProject.status}
                      </span>
                      <a
                        href={activeProject.href}
                        {...(activeProject.isPrivate
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#0A0F1D]"
                      >
                        <span>Abrir</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
