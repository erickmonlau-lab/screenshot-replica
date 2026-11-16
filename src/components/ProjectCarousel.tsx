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
        className="relative mx-auto h-[210px] w-full sm:h-[290px] lg:h-[clamp(240px,36vh,340px)]"
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
              className="absolute top-0 left-1/2 h-full w-[min(680px,74vw)] -ml-[min(340px,37vw)]"
              initial={false}
              animate={{
                x: `${off * 58}%`,
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

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="t-line grid items-end gap-5 border-t-2 border-current pt-5 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="t-muted text-base font-semibold tabular-nums">
                  {current.index} / {String(n).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-[#0044FF] px-3.5 py-1 text-[15px] font-semibold text-white">
                  {current.status}
                </span>
              </div>
              <h3 className="t-ink font-display mt-2 text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1] font-bold tracking-[-0.045em]">
                {current.name}
              </h3>
              <p className="t-muted mt-2 max-w-[48ch] text-lg leading-snug font-medium">
                {current.outcome ?? current.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {current.stack.map((tag) => (
                  <li
                    key={tag}
                    className="t-line t-bg-card t-ink rounded-full border px-3.5 py-1.5 text-[15px] font-semibold"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={current.href}
                {...(current.isPrivate ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="t-bg-ink t-on-ink inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
              >
                <span>{current.ctaLabel}</span>
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
          {slides.map((s) => (
            <span
              key={s.id}
              className={`h-1.5 rounded-full transition-all ${
                s.id === current.id ? "t-bg-ink w-8" : "t-bg-card2 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
