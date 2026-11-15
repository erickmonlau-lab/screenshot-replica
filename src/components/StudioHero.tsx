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

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/** Outlined marquee that accelerates (and reverses) with scroll velocity. */
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
    const step = dir.current * speed * dt * velocityMultiplier;
    baseX.set(baseX.get() + step);
  });

  const text = (
    <span className="hero-outline-light font-display pr-12 text-[18vh] leading-none font-black tracking-[-0.03em] uppercase select-none sm:text-[34vh]">
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
  return (
    <section
      id="hero"
      className="t-bg-hero t-ink relative h-[clamp(640px,100svh,1000px)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[24%] z-0 -translate-y-1/2 overflow-hidden sm:top-[50%] sm:-translate-y-[56%]"
      >
        <ScrollMarquee />
      </div>

      <motion.img
        src="/erick-portrait-studio.png"
        alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
        initial={{ y: 90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-[110px] left-1/2 z-10 sm:bottom-0 h-[54%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom select-none sm:h-[76%]"
      />

      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-4 bottom-4 left-4 z-20 sm:right-auto sm:bottom-8 sm:left-8 sm:w-[290px] 2xl:w-[400px]"
      >
        <div className="t-line t-bg-card rounded-2xl border p-4 2xl:p-5">
          <p className="text-xs font-bold tracking-[0.14em] text-[#0044FF] uppercase sm:text-[13px]">
            Desarrollador web &amp; IA · Barcelona
          </p>
          <h1 className="t-ink font-display mt-1.5 text-[22px] leading-[1.05] font-extrabold tracking-[-0.035em] 2xl:text-[30px]">
            Webs, ERPs e IA llevados a producción.
          </h1>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onJumpToProjects()}
              className="t-bg-ink t-on-ink inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-transform hover:scale-[1.04]"
            >
              <span>Ver proyectos</span>
              <ArrowDown size={13} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => onJumpToProjects("private-erp")}
              className="t-ink inline-flex items-center gap-1.5 rounded-full border-2 border-current px-4 py-2 text-xs font-bold transition-transform hover:scale-[1.04]"
            >
              <span>Demo ERP</span>
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="absolute right-8 bottom-8 z-20 hidden flex-col items-end gap-4 sm:flex">
        <span className="t-bg-ink t-on-ink rounded-full px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase sm:text-[13px]">
          Top 1 Google · diversplas.es
        </span>
        <span
          className="t-ink text-xs font-bold tracking-[0.28em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll down
        </span>
      </div>
    </section>
  );
}
