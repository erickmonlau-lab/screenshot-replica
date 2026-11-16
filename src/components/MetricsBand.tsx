import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useReducedMotion } from "./motion-pref";

interface Metric {
  id: string;
  prefix?: string;
  from: number;
  to: number;
  suffix?: string;
  label: string;
  detail: string;
}

const metrics: Metric[] = [
  {
    id: "horas",
    prefix: "+",
    from: 0,
    to: 1000,
    suffix: " h",
    label: "de experiencia real",
    detail: "Marketing, gestión y desarrollo web en proyectos en producción.",
  },
  {
    id: "acreditacion",
    from: 0,
    to: 375,
    suffix: " h",
    label: "Agente del Cambio Tecnológico",
    detail: "Acreditación oficial de la Generalitat de Catalunya.",
  },
  {
    id: "seo",
    prefix: "Top ",
    from: 9,
    to: 1,
    label: "en Google",
    detail: "diversplas.es, posicionada por SEO técnico en Barcelona.",
  },
];

function Counter({ metric }: { metric: Metric }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const fmt = {
    format: (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const write = (v: number) => {
      node.textContent = `${metric.prefix ?? ""}${fmt.format(Math.round(v))}${metric.suffix ?? ""}`;
    };
    if (!inView || reduce) {
      write(reduce || inView ? metric.to : metric.from);
      return;
    }
    const controls = animate(metric.from, metric.to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: write,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, metric.to]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${metric.prefix ?? ""}${fmt.format(metric.to)}${metric.suffix ?? ""}`}
    </span>
  );
}

/** Editorial big-number proof band right after the hero. Pure typography, generous separation. */
export function MetricsBand() {
  const reduce = useReducedMotion();

  return (
    <section
      id="metricas"
      aria-label="Resultados en cifras"
      className="section-light t-ink border-t border-[var(--t-line)] py-20 sm:py-28 lg:py-36 2xl:py-44"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 divide-y divide-[var(--t-line)] md:grid-cols-3 md:divide-y-0 md:divide-x">
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex flex-col justify-start ${
                i === 0
                  ? "pb-12 md:pb-0 md:pr-10 lg:pr-16 xl:pr-20"
                  : i === 1
                    ? "py-12 md:py-0 md:px-10 lg:px-16 xl:px-20"
                    : "pt-12 md:pt-0 md:pl-10 lg:pl-16 xl:pl-20"
              }`}
            >
              <p className="font-display text-[clamp(3.8rem,7.5vw,5.5rem)] md:text-[clamp(3.2rem,4.5vw,4.4rem)] lg:text-[clamp(4.2rem,5.4vw,5.6rem)] xl:text-[clamp(5.2rem,6.4vw,7.2rem)] font-bold tracking-[-0.05em] leading-[0.92] text-zinc-950 dark:text-white whitespace-nowrap">
                <Counter metric={m} />
              </p>
              <p className="font-display mt-5 sm:mt-6 text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
                {m.label}
              </p>
              <p className="mt-3.5 max-w-[36ch] text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
