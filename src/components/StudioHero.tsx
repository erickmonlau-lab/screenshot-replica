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
  const wordsX = useTransform(sx, (v) => v * -14);
  const ticketX = useTransform(sx, (v) => v * 46);
  const ticketY = useTransform(sy, (v) => v * 30);

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const word =
    "font-display block font-bold uppercase leading-[0.84] tracking-[-0.055em] text-[21vw] sm:text-[clamp(96px,17.5vh,190px)]";

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onMove}
      className="t-bg-hero t-ink relative h-[clamp(680px,100svh,1000px)] overflow-hidden"
    >
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

      {/* Titular gigante POR DELANTE del retrato: las letras cruzan el hombro */}
      <motion.h1
        style={{ x: wordsX }}
        initial={reduce ? false : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        className="pointer-events-none absolute top-[17%] left-4 z-20 select-none sm:top-[52%] sm:left-[3.5%] sm:-translate-y-1/2"
      >
        <span className="sr-only">Desarrollador web e IA en Barcelona. </span>
        <span className={`${word} text-[#09090B] dark:text-white`}>Webs</span>
        <span className={`${word} text-[#09090B] dark:text-white`}>ERPs</span>
        <span
          className={`${word} text-[#0044FF] [text-shadow:5px_5px_0_#09090B] dark:text-[#5b97ff]`}
        >
          &amp; IA
        </span>
      </motion.h1>

      {/* Ticket amarillo */}
      <motion.div
        style={{ x: ticketX, y: ticketY }}
        className="pointer-events-none absolute top-[30%] right-3 z-20 sm:top-[34%] sm:right-auto sm:left-[calc(50%+210px)]"
      >
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 6 }}
          transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.9 }}
          className="rounded-xl border-2 border-[#09090B] bg-[#FFD60A] px-4 py-2.5 text-[#09090B] shadow-[5px_5px_0_#09090B]"
        >
          <p className="font-display text-[20px] leading-none font-bold tracking-[-0.03em]">
            Top 1 Google
          </p>
          <p className="mt-1 text-[15px] leading-none font-semibold">diversplas.es</p>
        </motion.div>
      </motion.div>

      {/* Texto y acciones, sin tarjeta */}
      <motion.div
        initial={reduce ? false : { y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="absolute right-4 bottom-5 left-4 z-30 sm:right-[4%] sm:bottom-[11%] sm:left-auto sm:w-[320px] lg:w-[360px]"
      >
        <p className="font-display hidden text-[28px] leading-[1.1] font-bold tracking-[-0.035em] sm:block lg:text-[32px]">
          Llevados a producción.
        </p>
        <p className="mt-2 hidden text-[17px] font-semibold text-[#0044FF] sm:block dark:text-[#5b97ff]">
          Desarrollador web &amp; IA · Barcelona
        </p>
        <div className="flex flex-wrap items-center gap-2.5 sm:mt-5">
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
            <span>Demo ERP</span>
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
