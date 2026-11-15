import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion-pref";
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

const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline split by words; each word rises out of a mask (Apple-style reveal). */
function RevealLine({
  text,
  start,
  className = "",
}: {
  text: string;
  start: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: start + i * 0.07, ease: EASE }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function StudioHero({ onJumpToProjects }: StudioHeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  return (
    <section
      id="hero"
      ref={ref}
      className="t-bg-hero t-ink relative h-[clamp(680px,100svh,1000px)] overflow-hidden"
    >
      <motion.div
        style={{ y: portraitY, scale: portraitScale }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[46%] justify-center sm:h-[62%] lg:right-[3%] lg:left-auto lg:h-[68%] lg:w-[52%] lg:justify-end xl:h-[86%]"
      >
        <motion.img
          src="/erick-portrait-studio.png"
          alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
          initial={reduce ? false : { y: 80 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="h-full w-auto max-w-none object-contain object-bottom select-none"
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full w-full max-w-[1380px] flex-col justify-start px-5 pt-[88px] sm:px-8 lg:justify-center lg:pt-10"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-xs font-semibold tracking-[0.16em] text-[#0044FF] uppercase sm:text-[13px]"
        >
          Erick Rodríguez · Desarrollador web &amp; IA · Barcelona
        </motion.p>

        <h1 className="t-ink font-display mt-4 max-w-[12ch] text-[clamp(2.9rem,12.5vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.045em] sm:max-w-[14ch] sm:text-[clamp(4rem,9.5vw,7.4rem)] lg:max-w-[9.5ch] lg:text-[clamp(4.6rem,8.6vw,9rem)] lg:leading-[0.94] lg:tracking-[-0.05em]">
          <RevealLine text="Webs, ERPs" start={0.2} />
          <RevealLine text="e IA llevados" start={0.4} />
          <RevealLine text="a producción." start={0.65} className="text-[#0044FF]" />
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          className="t-muted mt-5 max-w-[34ch] text-base leading-snug font-medium sm:max-w-[44ch] sm:text-xl lg:text-2xl"
        >
          Plataformas propias, SEO que posiciona en el Top 1 y automatización con IA.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
          className="mt-7 flex flex-wrap gap-3"
        >
          <button
            type="button"
            onClick={() => onJumpToProjects()}
            className="t-bg-ink t-on-ink inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97] sm:text-base"
          >
            <span>Ver proyectos</span>
            <ArrowDown size={16} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => onJumpToProjects("private-erp")}
            className="t-ink inline-flex items-center gap-2 rounded-full border-2 border-current px-6 py-3.5 text-sm font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97] sm:text-base"
          >
            <span>Demo ERP</span>
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute right-5 bottom-5 z-20 hidden sm:right-8 sm:bottom-8 sm:block">
        <span className="t-bg-ink t-on-ink rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.04em]">
          Top 1 Google · diversplas.es
        </span>
      </div>
    </section>
  );
}
