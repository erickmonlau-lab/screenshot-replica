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
        <span className="text-[0.62em] font-bold tracking-normal ml-1 text-[#A78BFA]">
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
                      scale: 0.6,
                      rotateY: i % 2 === 0 ? 180 : -180,
                      rotateX: 40,
                      rotateZ: i === 0 ? -12 : i === 2 ? 12 : 0,
                      y: 90,
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
                duration: 1.1,
                delay: i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={
                reduce
                  ? {}
                  : {
                      scale: 1.03,
                      rotateY: 6,
                      rotateX: -6,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
              className={`group flex min-w-0 flex-col rounded-[24px] border-2 p-6 sm:p-7 text-white transition-all duration-300 cursor-pointer ${
                i === 1
                  ? "border-[#8B5CF6] bg-gradient-to-b from-[#1E0D38] to-[#0A0515] shadow-[6px_6px_0_#8B5CF6] hover:shadow-[9px_9px_0_#A78BFA]"
                  : "border-[#6D28D9] bg-[#09090B] shadow-[6px_6px_0_#6D28D9] hover:shadow-[9px_9px_0_#8B5CF6]"
              }`}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, filter: "blur(8px)", y: 6 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 + 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/40 bg-[#6D28D9]/15 px-3 py-1 font-mono text-xs font-bold tracking-wider text-[#C4B5FD] uppercase">
                  <span className="h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#8B5CF6]" />
                  0{i + 1}
                </span>
                <span className="font-mono text-xs text-[#71717A] tracking-wider uppercase font-semibold">
                  {i === 0 ? "Práctica" : i === 1 ? "Oficial" : "Producción"}
                </span>
              </motion.div>

              <motion.p
                initial={reduce ? false : { opacity: 0, filter: "blur(14px)", scale: 0.94 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: i * 0.2 + 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="font-display mt-5 text-[clamp(3.4rem,7vw,5.2rem)] leading-[0.88] font-black tracking-[-0.06em] text-white whitespace-nowrap md:text-[clamp(2.8rem,4.6vw,4.6rem)]"
              >
                <Counter metric={m} />
              </motion.p>

              <motion.p
                initial={reduce ? false : { opacity: 0, filter: "blur(8px)", y: 8 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.2 + 0.46, ease: [0.16, 1, 0.3, 1] }}
                className="font-display mt-5 text-[23px] sm:text-[26px] leading-[1.1] font-bold tracking-[-0.03em] text-white"
              >
                {m.label}
              </motion.p>

              <motion.p
                initial={reduce ? false : { opacity: 0, filter: "blur(8px)", y: 8 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.2 + 0.56, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-[15px] sm:text-[16px] leading-relaxed font-medium text-[#D4D4D8]"
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
