import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "./motion-pref";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HangingCard } from "./HangingCard";
import { ScrollMarquee } from "./ScrollMarquee";

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

export function StudioHero({ onJumpToProjects }: StudioHeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  // Parallax con el puntero: cada capa se mueve a distinta profundidad.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const discX = useTransform(sx, (v) => v * -36);
  const discY = useTransform(sy, (v) => v * -22);
  const faceX = useTransform(sx, (v) => v * 16);

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onMove}
      className="t-bg-hero t-ink relative h-[clamp(680px,100svh,1000px)] overflow-hidden"
    >
      {/* Texto en outline que corre solo y reacciona al scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[29%] z-0 overflow-hidden sm:top-[46%] sm:-translate-y-1/2"
      >
        <ScrollMarquee
          text="Erick Rodríguez — Marketing · Gestión · Código · IA — "
          className="text-[15vh] sm:text-[30vh]"
        />
      </div>

      {/* Disco cobalto con sombra dura: el "podio" del retrato */}
      <motion.div
        aria-hidden="true"
        style={{ x: discX, y: discY }}
        className="pointer-events-none absolute bottom-[26%] left-1/2 z-[5] aspect-square w-[78vw] -translate-x-1/2 sm:bottom-[8%] sm:w-auto sm:h-[64%]"
      >
        <motion.div
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="h-full w-full rounded-full border-[3px] border-[#09090B] bg-[#0044FF] shadow-[12px_12px_0_#09090B]"
        />
      </motion.div>

      <motion.div
        style={{ y: portraitY }}
        className="pointer-events-none absolute inset-x-0 bottom-[150px] z-10 flex h-[48%] justify-center sm:bottom-0 sm:h-[50%] md:h-[54%] lg:h-[64%] xl:h-[72%]"
      >
        <motion.div style={{ x: faceX }} className="h-full">
          <motion.img
            src="/erick-portrait-studio.png"
            alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
            initial={reduce ? false : { y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-full w-auto max-w-none object-contain object-bottom select-none"
          />
        </motion.div>
      </motion.div>

      {/* Texto y acciones, sin tarjeta */}
      <motion.div
        initial={reduce ? false : { y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="absolute right-4 bottom-5 left-4 z-30 sm:right-auto sm:bottom-[8%] sm:left-[3.5%] sm:w-[400px]"
      >
        <p className="hidden text-[17px] font-bold text-[#0044FF] sm:block dark:text-[#5b97ff]">
          Marketing, gestión y tecnología · Barcelona
        </p>
        <h1 className="font-display text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.04] font-bold tracking-[-0.045em] sm:mt-2">
          Entiendo tu negocio y construyo la solución.
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onJumpToProjects()}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-6 py-3 text-[16px] font-semibold text-white shadow-[4px_4px_0_#0044FF] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#0044FF] dark:border-white dark:bg-white dark:text-[#09090B]"
          >
            <span>Ver proyectos</span>
            <ArrowDown size={17} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={() => onJumpToProjects("private-erp")}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-6 py-3 text-[16px] font-semibold text-[#09090B] shadow-[4px_4px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
          >
            <span>Ver el ERP</span>
            <ArrowUpRight size={17} strokeWidth={2.4} />
          </button>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute top-0 right-[1%] z-20 hidden xl:block">
        <HangingCard width={210} />
      </div>
    </section>
  );
}
