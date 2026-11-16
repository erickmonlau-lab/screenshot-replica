import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotion } from "./motion-pref";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HangingCard } from "./HangingCard";

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
const EASE = [0.22, 1, 0.36, 1] as const;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/** Outlined name marquee: drifts on its own and reacts (speed + direction) to scroll velocity. */
function ScrollMarquee({ speed = -3.2 }: { speed?: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const dt = delta / 1000;
    const b = boost.get();
    if (b < -0.08) dir.current = -1;
    else if (b > 0.08) dir.current = 1;
    const velocityMultiplier = 1 + Math.min(6, Math.abs(b));
    baseX.set(baseX.get() + dir.current * speed * dt * velocityMultiplier);
  });

  const text = (
    <span className="hero-outline-light font-display pr-12 text-[17vh] leading-none font-bold tracking-[-0.02em] uppercase select-none sm:text-[34vh]">
      {outlineLine}
    </span>
  );

  return (
    <motion.div
      style={{ x }}
      className="flex w-max items-center whitespace-nowrap will-change-transform"
    >
      {text}
      {text}
      {text}
      {text}
    </motion.div>
  );
}

export function StudioHero({ onJumpToProjects }: StudioHeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <section
      id="hero"
      ref={ref}
      className="t-bg-hero t-ink relative h-[clamp(680px,100svh,1000px)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[27%] z-0 -translate-y-1/2 overflow-hidden sm:top-[50%] sm:-translate-y-[56%]"
      >
        <ScrollMarquee />
      </div>

      <motion.div
        style={{ y: portraitY }}
        className="pointer-events-none absolute inset-x-0 bottom-[150px] z-10 flex h-[48%] justify-center sm:bottom-0 sm:h-[50%] md:h-[54%] lg:h-[64%] xl:h-[72%]"
      >
        <motion.img
          src="/erick-portrait-studio.png"
          alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
          initial={reduce ? false : { y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="h-full w-auto max-w-none object-contain object-bottom select-none"
        />
      </motion.div>

      {/* Bottom-left intro card with Apple HIG frosted glass & refined typography */}
      <motion.div
        initial={reduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="absolute right-4 bottom-4 left-4 z-20 sm:right-auto sm:bottom-8 sm:left-8 sm:w-[380px] lg:w-[410px] 2xl:w-[450px]"
      >
        <div className="rounded-[28px] border border-black/[0.08] dark:border-white/10 bg-white/85 dark:bg-zinc-950/85 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/10 dark:bg-blue-400/10 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0044FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0044FF]" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.08em] text-[#0044FF] dark:text-[#5b97ff]">
              Desarrollador Web &amp; IA · Barcelona
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display mt-3.5 text-[24px] sm:text-[27px] 2xl:text-[32px] font-bold leading-[1.14] tracking-[-0.035em] text-zinc-950 dark:text-white">
            Webs, ERPs e IA llevados a producción.
          </h1>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onJumpToProjects()}
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 dark:bg-white px-5 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white dark:text-zinc-950 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md active:scale-[0.98]"
            >
              <span>Ver proyectos</span>
              <ArrowDown
                size={15}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => onJumpToProjects("private-erp")}
              className="group inline-flex items-center gap-2 rounded-full border border-black/12 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] px-5 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-zinc-900 dark:text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Demo ERP</span>
              <ArrowUpRight
                size={15}
                strokeWidth={2.2}
                className="text-zinc-500 dark:text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-950 dark:group-hover:text-white"
              />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute top-0 right-[1%] z-20 hidden xl:block">
        <HangingCard width={210} />
      </div>

      {/* Bottom-right scroll indicator */}
      <div className="absolute right-6 bottom-6 lg:right-8 lg:bottom-8 z-20 hidden sm:flex">
        <motion.button
          type="button"
          onClick={() => onJumpToProjects()}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
        >
          <span className="tracking-[0.14em]">Scroll</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black/15 dark:border-white/20 transition-transform duration-200 group-hover:translate-y-0.5">
            <ArrowDown size={11} strokeWidth={2.4} />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
