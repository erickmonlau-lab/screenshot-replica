import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "./motion-pref";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export interface CarouselSlide {
  id: string;
  index: string;
  name: string;
  status: string;
  image?: string;
  href: string;
  isPrivate?: boolean;
  description: string;
  stack: string[];
  ctaLabel: string;
}

interface ProjectCarouselProps {
  slides: CarouselSlide[];
  activeId: string;
  onChange: (id: string) => void;
  privateSlide: ReactNode;
}

/** 3D coverflow gallery with autoplay, arrows, dots and a details block. */
export function ProjectCarousel({
  slides,
  activeId,
  onChange,
  privateSlide,
}: ProjectCarouselProps) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const active = Math.max(
    0,
    slides.findIndex((s) => s.id === activeId),
  );
  const current = slides[active]!;

  const go = useCallback(
    (to: number) => onChange(slides[((to % n) + n) % n]!.id),
    [n, onChange, slides],
  );

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => go(active + 1), 5500);
    return () => window.clearInterval(id);
  }, [active, go, paused, reduce]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative mx-auto h-[210px] w-full sm:h-[290px] lg:h-[clamp(220px,34vh,400px)]"
        style={{ perspective: 1300 }}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Galería de proyectos"
      >
        {slides.map((slide, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off <= -n / 2) off += n;
          const abs = Math.abs(off);
          return (
            <motion.div
              key={slide.id}
              className="absolute top-0 left-1/2 h-full w-[min(540px,74vw)] -ml-[min(270px,37vw)]"
              initial={false}
              animate={{
                x: `${off * 56}%`,
                rotateY: Math.max(-48, Math.min(48, off * -34)),
                scale: 1 - abs * 0.14,
                filter: `brightness(${abs === 0 ? 1 : 0.55})`,
              }}
              transition={
                reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20 }
              }
              style={{ zIndex: 20 - abs * 5, transformStyle: "preserve-3d" }}
            >
              <div className="t-line t-bg-card relative block h-full w-full overflow-hidden rounded-2xl border-2 text-left shadow-[0_18px_40px_-14px_#000000]">
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
                <button
                  type="button"
                  onClick={() => onChange(slide.id)}
                  aria-label={`Ver ${slide.name}`}
                  aria-current={abs === 0}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer"
                />
              </div>
            </motion.div>
          );
        })}

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Proyecto anterior"
          className="t-line t-bg-card t-ink absolute top-1/2 left-0 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform hover:scale-105"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Proyecto siguiente"
          className="t-line t-bg-card t-ink absolute top-1/2 right-0 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform hover:scale-105"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="mx-auto mt-4 max-w-2xl text-center 2xl:mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            exit={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] t-muted">
                {current.index} / {String(n).padStart(2, "0")}
              </span>
              <span className="rounded-full bg-[#0044FF] px-3 py-0.5 text-[11px] font-bold text-white">
                {current.status}
              </span>
            </div>
            <h3 className="t-ink font-display mt-1.5 text-xl font-extrabold tracking-[-0.03em] 2xl:text-3xl">
              {current.name}
            </h3>
            <p className="t-muted mx-auto mt-1.5 max-w-xl text-xs leading-relaxed 2xl:text-sm">
              {current.description}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
              {current.stack.map((tag) => (
                <span
                  key={tag}
                  className="t-line t-bg-card t-ink rounded-full border px-2.5 py-0.5 text-[10.5px] font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={current.href}
              {...(current.isPrivate ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="t-bg-ink t-on-ink mt-3.5 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold transition-transform hover:scale-[1.03]"
            >
              <span>{current.ctaLabel}</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-center gap-1.5" aria-hidden="true">
          {slides.map((s) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all ${
                s.id === current.id ? "t-bg-ink w-6" : "t-bg-card2 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
