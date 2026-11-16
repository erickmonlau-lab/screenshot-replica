import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CarouselSlide } from "./ProjectCarousel";
import { ErpShowcase } from "./ErpShowcase";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Bento grid: real site captures plus the live ERP console, hard-shadow tiles. */
export function ProjectBento({ slides }: { slides: CarouselSlide[] }) {
  const reduce = useReducedMotion();
  const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-7">
      {slides.map((p, i) => (
        <motion.article
          key={p.id}
          initial={reduce ? false : { opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
          className={`group flex flex-col overflow-hidden rounded-[22px] border-2 border-[#09090B] bg-white text-[#09090B] shadow-[6px_6px_0_#0044FF] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-1 ${span[i % 4]}`}
        >
          <div className="relative h-[250px] overflow-hidden border-b-2 border-[#09090B] bg-[#09090B] sm:h-[310px]">
            {p.isPrivate ? (
              <div className="h-full overflow-auto">
                <ErpShowcase />
              </div>
            ) : (
              <img
                src={p.image}
                alt={`Captura de ${p.name}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute top-3 left-3 rounded-full bg-[#0044FF] px-3.5 py-1 text-[13px] font-semibold text-white">
              {p.status}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl leading-tight font-bold tracking-[-0.035em] sm:text-[28px]">
                {p.name}
              </h3>
              <span className="text-sm font-semibold text-[#71717A] tabular-nums">{p.index}</span>
            </div>
            <p className="mt-2 text-base leading-snug font-medium text-[#52525B] sm:text-[17px]">
              {p.outcome ?? p.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[#09090B]/20 bg-[#F4F4F5] px-3 py-1 text-[13px] font-semibold"
                >
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={p.href}
              {...(p.isPrivate ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#09090B] px-6 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
            >
              <span>{p.ctaLabel}</span>
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
