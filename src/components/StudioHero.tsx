import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion-pref";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ScrollMarquee } from "./ScrollMarquee";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  // Parallax con el puntero: cada capa se mueve a distinta profundidad.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
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
        className="pointer-events-none absolute inset-x-0 top-[24%] z-0 overflow-hidden sm:top-[46%] sm:-translate-y-1/2"
      >
        <ScrollMarquee
          text="Erick Rodríguez — Marketing · Gestión · IA — "
          className="text-[15vh] sm:text-[30vh]"
        />
      </div>

      <motion.div
        style={{ y: portraitY }}
        className="pointer-events-none absolute inset-x-0 top-[96px] bottom-[235px] z-10 flex justify-center sm:top-auto sm:bottom-0 sm:h-[50%] md:h-[54%] lg:h-[64%] xl:h-[72%]"
      >
        <motion.div style={{ x: faceX }} className="h-full">
          <motion.img
            src="/erick-portrait-studio.png"
            alt="Erick Rodríguez — Desarrollador Web y Automatización IA en Barcelona"
            initial={reduce ? false : { y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-full w-auto max-w-[92vw] object-contain object-bottom select-none sm:max-w-none"
          />
        </motion.div>
      </motion.div>

      {/* Titular estilo Oderalo (dos tonos con acento violeta #6D28D9 y sin amarillo) */}
      <motion.div
        initial={reduce ? false : { y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="absolute right-4 bottom-5 left-4 z-30 sm:right-auto sm:bottom-[8%] sm:left-[3.5%] sm:max-w-[460px] xl:max-w-[500px]"
      >
        <h1 className="font-display text-[clamp(2.3rem,4.1vw,3.6rem)] leading-[1.04] font-bold tracking-[-0.055em] text-[#09090B] dark:text-white">
          {t.hero.title}{" "}
          <span className="block text-[#6D28D9] dark:text-[#A78BFA]">{t.hero.titleHighlight}</span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onJumpToProjects()}
            className="group inline-flex min-h-[50px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-4 py-3 sm:px-6 text-[15px] sm:text-[16px] font-bold text-white shadow-[4px_4px_0_#6D28D9] sm:shadow-[5px_5px_0_#6D28D9] transition-all duration-150 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#6D28D9] dark:border-white dark:bg-white dark:text-[#09090B] dark:shadow-[4px_4px_0_#6D28D9]"
          >
            <span>{t.hero.ctaProjects}</span>
            <ArrowDown size={17} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => onJumpToProjects("private-erp")}
            className="group inline-flex min-h-[50px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-4 py-3 sm:px-6 text-[15px] sm:text-[16px] font-bold text-[#09090B] shadow-[4px_4px_0_#09090B] sm:shadow-[5px_5px_0_#09090B] transition-all duration-150 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B] dark:border-white dark:bg-[#18181B] dark:text-white dark:shadow-[4px_4px_0_#ffffff]"
          >
            <span>{t.hero.ctaErp}</span>
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
