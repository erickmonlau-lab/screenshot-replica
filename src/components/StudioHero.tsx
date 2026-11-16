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
          src="/erick-portrait-studio.webp"
          alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
          initial={reduce ? false : { y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="h-full w-auto max-w-none object-contain object-bottom select-none"
        />
      </motion.div>

      <motion.div
        initial={reduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="absolute right-4 bottom-4 left-4 z-20 sm:right-auto sm:bottom-8 sm:left-8 sm:w-[330px] 2xl:w-[420px]"
      >
        <div className="t-line t-bg-card rounded-2xl border p-4 2xl:p-5">
          <p className="text-[15px] font-semibold tracking-[0.08em] text-[#0044FF] uppercase sm:text-[15px]">
            Desarrollador web &amp; IA · Barcelona
          </p>
          <h1 className="t-ink font-display mt-1.5 text-[24px] leading-[1.05] font-bold tracking-[-0.035em] 2xl:text-[32px]">
            Webs, ERPs e IA llevados a producción.
          </h1>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onJumpToProjects()}
              className="t-bg-ink t-on-ink inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
            >
              <span>Ver proyectos</span>
              <ArrowDown size={14} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => onJumpToProjects("private-erp")}
              className="t-ink inline-flex items-center gap-1.5 rounded-full border-2 border-current px-4 py-2.5 text-[15px] font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
            >
              <span>Demo ERP</span>
              <ArrowUpRight size={14} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute top-0 right-[1%] z-20 hidden xl:block">
        <HangingCard width={210} />
      </div>

      <div className="absolute right-8 bottom-8 z-20 hidden flex-col items-end gap-5 sm:flex">
        <span className="t-bg-ink t-on-ink rounded-full px-4 py-2 text-[15px] font-semibold tracking-[0.04em]">
          Top 1 Google · diversplas.es
        </span>
        <span className="flex items-center gap-3">
          <span
            className="t-ink text-[15px] font-semibold tracking-[0.28em] uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll down
          </span>
          <span aria-hidden="true" className="t-bg-ink block h-14 w-px" />
        </span>
      </div>
    </section>
  );
}
