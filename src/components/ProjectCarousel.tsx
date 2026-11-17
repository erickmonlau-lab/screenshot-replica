import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion-pref";
import { ArrowUpRight } from "lucide-react";

export interface CarouselSlide {
  id: string;
  index: string;
  name: string;
  status: string;
  image?: string;
  href: string;
  isPrivate?: boolean;
  description: string;
  outcome?: string;
  type?: string;
  stack: string[];
  ctaLabel: string;
}

interface ProjectCarouselProps {
  slides: CarouselSlide[];
  activeId: string;
  onChange: (id: string) => void;
  privateSlide: ReactNode;
}

const THEMES = [
  {
    bg: "bg-[#6D28D9]",
    ink: "text-white",
    sub: "text-purple-100",
    chip: "bg-white text-[#09090B]",
    tag: "border-white/80 text-white",
    btn: "bg-white text-[#09090B] shadow-[4px_4px_0_#09090B]",
  },
  {
    bg: "bg-[#09090B]",
    frame: "border-[#6D28D9] shadow-[0_0_0_5px_#1E0D38,0_0_34px_5px_#6D28D9]",
    ink: "text-white",
    sub: "text-zinc-300",
    chip: "bg-[#6D28D9] text-white",
    tag: "border-[#B4B8C2] text-white",
    btn: "bg-[#6D28D9] text-white shadow-[4px_4px_0_#ffffff]",
  },
  {
    bg: "bg-[#E3E5E9]",
    ink: "text-[#09090B]",
    sub: "text-zinc-700",
    chip: "bg-[#6D28D9] text-white",
    tag: "border-[#52525B] text-[#09090B]",
    btn: "bg-[#09090B] text-white shadow-[4px_4px_0_#6D28D9]",
  },
  {
    bg: "bg-white",
    ink: "text-[#09090B]",
    sub: "text-zinc-700",
    chip: "bg-[#6D28D9] text-white",
    tag: "border-[#52525B] text-[#09090B]",
    btn: "bg-[#09090B] text-white shadow-[4px_4px_0_#6D28D9]",
  },
] as const;

function shortName(slide: CarouselSlide) {
  return slide.isPrivate ? "ERP + APP" : slide.name.split(".")[0]!;
}

function Panel({
  slide,
  i,
  privateSlide,
}: {
  slide: CarouselSlide;
  i: number;
  privateSlide: ReactNode;
}) {
  const reduce = useReducedMotion();
  const t = THEMES[i % THEMES.length]!;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 16 });
  const sy = useSpring(py, { stiffness: 90, damping: 16 });
  const rotY = useTransform(sx, (v) => v * 9);
  const rotX = useTransform(sy, (v) => v * -7);
  const nameX = useTransform(sx, (v) => v * -26);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const frame = (
    <div className="overflow-hidden rounded-xl border-[3px] border-[#09090B] bg-white shadow-[10px_10px_0_#09090B]">
      <div className="flex h-10 items-center gap-2 border-b-[3px] border-[#09090B] bg-[#E3E5E9] px-3">
        <span className="h-3 w-3 rounded-full border-2 border-[#09090B] bg-white" />
        <span className="h-3 w-3 rounded-full border-2 border-[#09090B] bg-white" />
        <span className="h-3 w-3 rounded-full border-2 border-[#09090B] bg-white" />
        <span className="ml-2 truncate rounded-full border-2 border-[#09090B] bg-white px-3 py-0.5 text-[15px] leading-tight font-semibold text-[#09090B]">
          {slide.isPrivate ? "demo en persona" : slide.name}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
        {slide.isPrivate ? (
          <div
            className="pointer-events-none h-full overflow-hidden bg-[#09090B]"
            aria-hidden="true"
            ref={(el) => {
              if (el) el.setAttribute("inert", "");
            }}
          >
            {privateSlide}
          </div>
        ) : (
          <img
            src={slide.image}
            alt={`Captura de ${slide.name}`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );

  return (
    <article
      id={`caso-${slide.id}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ ["--t" as string]: `${78 + i * 12}px` }}
      className={`${t.bg} ${t.ink} relative mb-6 flex flex-col overflow-hidden rounded-[28px] border-[3px] ${"frame" in t ? t.frame : "border-[#09090B] shadow-[10px_10px_0_#09090B]"} lg:sticky lg:top-[var(--t)] lg:mb-8 lg:block lg:h-[calc(100svh-150px)] lg:max-h-[780px] lg:min-h-[600px]`}
    >
      <motion.p
        aria-hidden="true"
        style={{ x: nameX }}
        className="font-display px-5 pt-5 text-[clamp(40px,13vw,96px)] leading-[0.85] font-bold tracking-[-0.055em] uppercase select-none lg:absolute lg:top-3 lg:left-8 lg:p-0 lg:text-[clamp(110px,13vw,200px)]"
      >
        {shortName(slide)}
      </motion.p>

      <div
        className="relative mx-5 my-5 lg:absolute lg:right-8 lg:bottom-9 lg:m-0 lg:w-[64%]"
        style={{ perspective: 1400 }}
      >
        <motion.div style={{ rotateY: rotY, rotateX: rotX, rotate: reduce ? 0 : -2 }}>
          {slide.isPrivate ? (
            frame
          ) : (
            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${slide.name}`}
              className="block"
            >
              {frame}
            </a>
          )}
        </motion.div>
      </div>

      <div className="px-5 pb-6 lg:absolute lg:bottom-9 lg:left-8 lg:w-[30%] lg:p-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-[28px] leading-none font-bold tracking-[-0.04em] tabular-nums">
            {slide.index}
          </span>
          <span className={`${t.chip} rounded-full px-3.5 py-1 text-[15px] font-semibold`}>
            {slide.status}
          </span>
        </div>
        <p className="font-display mt-3 text-[22px] leading-[1.15] font-bold tracking-[-0.03em] lg:text-[26px]">
          {slide.outcome ?? slide.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {slide.stack.map((tag) => (
            <li
              key={tag}
              className={`${t.tag} rounded-full border-2 px-3 py-1 text-[15px] font-semibold`}
            >
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={slide.href}
          {...(slide.isPrivate ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className={`${t.btn} mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#09090B] px-6 py-3 text-base font-semibold transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px]`}
        >
          <span>{slide.ctaLabel}</span>
          <ArrowUpRight size={17} strokeWidth={2.4} />
        </a>
      </div>
    </article>
  );
}

/** Paneles a pantalla completa que se apilan al hacer scroll (sticky), uno por proyecto. */
export function ProjectCarousel({ slides, privateSlide }: ProjectCarouselProps) {
  return (
    <div role="list" aria-label="Proyectos">
      {slides.map((slide, i) => (
        <div role="listitem" key={slide.id} className="contents">
          <Panel slide={slide} i={i} privateSlide={privateSlide} />
        </div>
      ))}
    </div>
  );
}
