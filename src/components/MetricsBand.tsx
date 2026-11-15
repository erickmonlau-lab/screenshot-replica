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
  const fmt = { format: (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") };

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

/** Big-number proof band right after the hero. */
export function MetricsBand() {
  const reduce = useReducedMotion();
  return (
    <section
      id="metricas"
      aria-label="Resultados en cifras"
      className="section-light t-ink t-line border-t py-14 sm:py-20 2xl:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1380px] gap-12 px-5 sm:px-8 md:grid-cols-3 md:gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.id}
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="md:border-l md:pl-8 first:md:border-l-0 first:md:pl-0 t-line"
          >
            <p className="font-display text-[clamp(3.4rem,8.2vw,7rem)] leading-[0.95] whitespace-nowrap font-bold tracking-[-0.05em]">
              <Counter metric={m} />
            </p>
            <p className="font-display mt-3 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
              {m.label}
            </p>
            <p className="t-muted mt-2 max-w-[34ch] text-base leading-snug">{m.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
