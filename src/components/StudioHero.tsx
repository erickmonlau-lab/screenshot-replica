import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

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

export function StudioHero({ onJumpToProjects }: StudioHeroProps) {
  const bcnTime = useBarcelonaTime();

  return (
    <section id="hero" className="dark-topo-surface relative overflow-hidden pt-[62px] text-white">
      <div className="relative mx-auto flex min-h-[calc(100svh-62px)] max-w-[1440px] flex-col justify-between lg:h-[calc(100dvh-62px)] lg:min-h-[600px] lg:max-h-[950px]">
        {/* Top Registration Corners */}
        <div className="relative z-20 flex items-center justify-between gap-2 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-5">
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#2B2F3E] bg-[#11131B] px-3 py-1.5 whitespace-nowrap">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#10B981]" />
            <span className="text-[10px] font-bold tracking-[0.14em] text-zinc-200 uppercase sm:text-[11px]">
              Disponible · BCN
              <span className="hidden sm:inline"> &amp; Remoto</span>
            </span>
          </div>

          <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#2B2F3E] bg-[#11131B] px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.12em] text-zinc-300 uppercase whitespace-nowrap sm:text-[11px]">
            <span className="hidden text-[#3B82F6] sm:inline">BCN · 41.4°N</span>
            <span className="hidden text-zinc-600 sm:inline">|</span>
            <span>{bcnTime} CET</span>
          </div>
        </div>

        {/* Center Stage: Giant Outlined Typographic Marquee + Portrait */}
        <div className="relative flex flex-1 items-end justify-center pt-6 lg:pt-0">
          {/* Outlined Kinetic Display Typography Behind Portrait */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[32%] right-0 left-0 z-0 -translate-y-1/2 overflow-hidden sm:top-[36%] lg:top-[38%]"
          >
            <div className="animate-hero-marquee font-display flex items-center whitespace-nowrap">
              <span className="hero-outline-text pr-10 text-[19vw] font-black leading-[0.88] tracking-[-0.04em] uppercase sm:text-[15vw] lg:text-[12.5vw] 2xl:text-[11.5vw]">
                ERICK RODRÍGUEZ · WEB, ERPS &amp; IA ·
              </span>
              <span className="hero-outline-text pr-10 text-[19vw] font-black leading-[0.88] tracking-[-0.04em] uppercase sm:text-[15vw] lg:text-[12.5vw] 2xl:text-[11.5vw]">
                ERICK RODRÍGUEZ · WEB, ERPS &amp; IA ·
              </span>
            </div>
          </div>

          {/* Studio Cutout Portrait Anchored Flush Bottom */}
          <div className="relative z-10 flex w-full items-end justify-center px-4">
            <img
              src="/erick-portrait-studio.png"
              alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
              className="pointer-events-none h-[290px] w-auto select-none object-contain object-bottom sm:h-[380px] lg:h-[455px] 2xl:h-[620px]"
            />
          </div>
        </div>

        {/* Editorial Lower Anchor Strip (Side Cards on Desktop, Stacked Solid Block on Mobile) */}
        <div className="relative z-20 border-t border-[#202330] bg-[#0B0C10] px-4 py-4 sm:px-6 lg:pointer-events-none lg:absolute lg:right-0 lg:bottom-6 lg:left-0 lg:border-t-0 lg:bg-transparent lg:px-8 lg:py-0">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            {/* Bottom-Left Statement Card */}
            <div className="pointer-events-auto rounded-2xl border border-[#2B2F3F] bg-[#101219] p-4 lg:max-w-[360px] lg:p-5 2xl:max-w-[430px] 2xl:p-6">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#283354] bg-[#131B33] px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] text-[#60A5FA] uppercase">
                <Sparkles size={11} />
                <span>Agente del Cambio · 375 h</span>
              </div>

              <h1 className="font-display text-xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-2xl 2xl:text-[32px]">
                Webs, ERPs e IA en <span className="text-[#3B82F6]">producción</span>
                <span
                  className="animate-cursor-blink ml-1 inline-block h-[0.82em] w-[3px] translate-y-[0.06em] bg-[#0044FF]"
                  aria-hidden="true"
                />
              </h1>

              <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 sm:text-[13px] 2xl:text-sm">
                Desarrollador full-stack con base en marketing digital y gestión. Construyo el
                producto completo sin depender de terceros.
              </p>

              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onJumpToProjects()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0044FF] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1A58FF] active:scale-[0.98]"
                >
                  <span>Ver proyectos</span>
                  <ArrowDown size={13} strokeWidth={2.5} />
                </button>

                <button
                  type="button"
                  onClick={() => onJumpToProjects("erp-privado")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#303549] bg-[#171A24] px-4 py-2 text-xs font-bold text-zinc-100 transition-colors hover:border-[#49516E] hover:bg-[#1E2230]"
                >
                  <span>Demo ERP</span>
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Bottom-Right Proof & Vertical Scroll Anchor (Desktop) */}
            <div className="pointer-events-auto hidden flex-col items-end gap-2.5 lg:flex">
              <div className="rounded-2xl border border-[#2B2F3F] bg-[#101219] px-4 py-3 text-right 2xl:px-5 2xl:py-4">
                <div className="flex items-center justify-end gap-2 text-xs font-bold text-white 2xl:text-sm">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>diversplas.es · Top 1 en Google</span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-zinc-400 2xl:text-xs">
                  +1.000 h reales · Subvención directa empresa (375 h)
                </p>
              </div>

              <button
                type="button"
                onClick={() => onJumpToProjects()}
                className="inline-flex items-center gap-2 rounded-full border border-[#2B2F3F] bg-[#101219] px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-zinc-200 uppercase transition-colors hover:border-[#0044FF] hover:text-white"
              >
                <span>Explorar trabajo</span>
                <ArrowDown size={13} className="text-[#3B82F6]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
