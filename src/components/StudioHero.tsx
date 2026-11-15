import { ArrowDown, ArrowUpRight } from "lucide-react";

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

const outlineLine = "ERICK RODRÍGUEZ — WEB · ERPS · IA — ";

export function StudioHero({ onJumpToProjects }: StudioHeroProps) {
  return (
    <section
      id="hero"
      className="relative h-[100dvh] min-h-[560px] overflow-hidden bg-[#E3E5E9] text-[#0B0C10]"
    >
      {/* Giant outlined name, scrolling behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[50%] z-0 -translate-y-[56%] overflow-hidden"
      >
        <div className="animate-hero-marquee font-display flex items-center whitespace-nowrap">
          <span className="hero-outline-light pr-8 text-[34vh] leading-none font-black tracking-[-0.03em] uppercase">
            {outlineLine}
          </span>
          <span className="hero-outline-light pr-8 text-[34vh] leading-none font-black tracking-[-0.03em] uppercase">
            {outlineLine}
          </span>
        </div>
      </div>

      {/* Portrait */}
      <img
        src="/erick-portrait-studio.png"
        alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[76%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom select-none"
      />

      {/* Bottom-left: statement + CTAs on solid card */}
      <div className="absolute right-4 bottom-4 left-4 z-20 sm:right-auto sm:bottom-8 sm:left-8 sm:w-[290px] lg:w-[290px] 2xl:w-[400px]">
        <div className="rounded-2xl border border-[#CDD1D8] bg-white p-4 2xl:p-5">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#0044FF] uppercase">
            Desarrollador web &amp; IA · Barcelona
          </p>
          <h1 className="font-display mt-1.5 text-[22px] leading-[1.05] font-extrabold tracking-[-0.035em] 2xl:text-[30px]">
            Webs, ERPs e IA llevados a producción.
          </h1>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onJumpToProjects()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0C10] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0044FF]"
            >
              <span>Ver proyectos</span>
              <ArrowDown size={13} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => onJumpToProjects("erp-privado")}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0B0C10] bg-white px-4 py-2 text-xs font-bold text-[#0B0C10] transition-colors hover:bg-[#0B0C10] hover:text-white"
            >
              <span>Demo ERP</span>
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom-right: proof pill + vertical scroll hint */}
      <div className="absolute right-8 bottom-8 z-20 hidden flex-col items-end gap-4 sm:flex">
        <span className="rounded-full bg-[#0B0C10] px-4 py-2 text-[11px] font-bold tracking-[0.1em] text-white uppercase">
          Top 1 Google · diversplas.es
        </span>
        <span
          className="text-[10px] font-bold tracking-[0.3em] text-[#0B0C10] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll down
        </span>
      </div>
    </section>
  );
}
