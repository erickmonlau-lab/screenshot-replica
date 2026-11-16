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
    from: 0,
    to: 3,
    label: "proyectos online",
    detail: "diversplas.es, gesgrama.com y breadpdf.com, en producción.",
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

const TILES = [
  { box: "bg-[#0044FF] text-white", sub: "text-white/90", rot: -2.2, lift: "md:mt-0" },
  { box: "bg-[#09090B] text-white", sub: "text-zinc-300", rot: 1.6, lift: "md:mt-12" },
  { box: "bg-[#FFD60A] text-[#09090B]", sub: "text-[#09090B]/80", rot: -1.2, lift: "md:mt-4" },
] as const;

/** Tres bloques de color inclinados con cifras gigantes y sombra dura. */
export function MetricsBand() {
  const reduce = useReducedMotion();

  return (
    <section
      id="metricas"
      aria-label="Resultados en cifras"
      className="section-light t-ink border-t border-[var(--t-line)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
          {metrics.map((m, i) => {
            const t = TILES[i % TILES.length]!;
            return (
              <motion.div
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : t.rot }}
                whileHover={{ rotate: 0, y: reduce ? 0 : -8 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.12 }}
                className={`${t.box} ${t.lift} rounded-[24px] border-[3px] border-[#09090B] p-7 shadow-[10px_10px_0_#09090B] sm:p-8`}
              >
                <p className="font-display text-[clamp(3.6rem,9vw,6rem)] leading-[0.9] font-bold tracking-[-0.055em] whitespace-nowrap md:text-[clamp(3rem,5.6vw,5.6rem)]">
                  <Counter metric={m} />
                </p>
                <p className="font-display mt-5 text-[26px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[30px]">
                  {m.label}
                </p>
                <p className={`${t.sub} mt-3 text-[17px] leading-snug font-medium sm:text-lg`}>
                  {m.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
