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
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numRef, { once: true, margin: "-15% 0px" });
  const fmt = {
    format: (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  };

  useEffect(() => {
    const node = numRef.current;
    if (!node) return;
    const write = (v: number) => {
      node.textContent = fmt.format(Math.round(v));
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
    <span className="inline-flex items-baseline">
      {metric.prefix && <span>{metric.prefix}</span>}
      <span ref={numRef} className="tabular-nums">
        {fmt.format(metric.to)}
      </span>
      {metric.suffix && (
        <span className="text-[0.62em] font-bold tracking-normal ml-1">
          {metric.suffix.trim()}
        </span>
      )}
    </span>
  );
}


/** Tres bloques de color inclinados con cifras gigantes y sombra dura. */
export function MetricsBand() {
  const reduce = useReducedMotion();

  return (
    <section
      id="metricas"
      aria-label="Resultados en cifras"
      className="border-t-[3px] border-[#09090B] bg-[#E3E5E9] py-14 text-[#09090B] sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-10">
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="led-box flex min-w-0 flex-col p-6 text-white sm:p-7"
            >
              <span className="flex items-center gap-2.5 text-[15px] font-bold tracking-[0.1em] text-[#9DB8FF] uppercase">
                <span className="led-dot h-2.5 w-2.5 rounded-full" />
                0{i + 1}
              </span>
              <p className="font-display led-text mt-4 text-[clamp(3.4rem,7vw,5.2rem)] leading-[0.9] font-bold tracking-[-0.055em] whitespace-nowrap md:text-[clamp(2.8rem,4.6vw,4.6rem)]">
                <Counter metric={m} />
              </p>
              <p className="font-display mt-5 text-[24px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[27px]">
                {m.label}
              </p>
              <p className="mt-3 text-[16px] leading-snug font-medium text-[#D4D4D8] sm:text-[17px]">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
