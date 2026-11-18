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
        <span className="ml-[0.22em] text-[0.62em] font-black tracking-normal text-[#6D28D9]">
          {metric.suffix.trim()}
        </span>
      )}
    </span>
  );
}

/** Tres tarjetas fondo blanco, texto negro y sombras brutales en morado y negro. */
export function MetricsBand() {
  const reduce = useReducedMotion();

  return (
    <section
      id="metricas"
      aria-label="Resultados en cifras"
      className="border-t-[3px] border-[#09090B] bg-[#E3E5E9] py-16 text-[#09090B] sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 xl:px-16">
        <div
          className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-10"
          style={{ perspective: 1200 }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.65,
                      rotateY: i % 2 === 0 ? 140 : -140,
                      rotateX: 35,
                      rotateZ: i === 0 ? -6 : i === 2 ? 6 : 0,
                      y: 80,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                rotateZ: 0,
                y: 0,
              }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 1.05,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={
                reduce
                  ? {}
                  : {
                      scale: 1.025,
                      rotateY: i === 0 ? 4 : i === 2 ? -4 : 0,
                      rotateX: -4,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
              className={`group relative flex min-w-0 flex-col rounded-[22px] border-[3px] border-[#09090B] bg-white p-7 sm:p-9 text-[#09090B] transition-all duration-300 cursor-pointer ${
                i === 1
                  ? "shadow-[8px_8px_0_#6D28D9] hover:shadow-[12px_12px_0_#09090B]"
                  : "shadow-[8px_8px_0_#09090B] hover:shadow-[12px_12px_0_#6D28D9]"
              }`}
            >
              <motion.p
                initial={reduce ? false : { opacity: 0, filter: "blur(14px)", y: 12 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.18 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(3.6rem,7.5vw,5.4rem)] leading-[0.88] font-black tracking-[-0.06em] text-[#09090B] whitespace-nowrap"
              >
                <Counter metric={m} />
              </motion.p>

              <motion.p
                initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.18 + 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="font-display mt-6 text-[23px] sm:text-[26px] leading-[1.12] font-black tracking-[-0.03em] text-[#09090B]"
              >
                {m.label}
              </motion.p>

              <motion.p
                initial={reduce ? false : { opacity: 0, filter: "blur(8px)", y: 8 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.18 + 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-[15px] sm:text-[16px] leading-relaxed font-medium text-[#52525B]"
              >
                {m.detail}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
