import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;
const SEGMENTS = 25; // cada bloque = 15 h → 25 × 15 = 375 h
const topics = ["Transformación digital", "Automatización de procesos", "IA aplicada"];

/** Acreditación de 375 h como panel LED: contador, barra segmentada y temas. */
export function GrantBand() {
  const reduce = useReducedMotion();
  return (
    <section
      id="subvencion"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] py-14 text-white sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-6"
        >
          <span className="led-chip inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[15px] font-bold tracking-[0.08em] uppercase">
            <span className="led-dot h-2.5 w-2.5 rounded-full" />
            Subvenciones salariales directas
          </span>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.05em]">
            Contratarme puede abrirle a tu empresa subvenciones salariales.
          </h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-snug font-medium text-[#D4D4D8] sm:text-xl">
            Cuento con 375 h de acreditación oficial de la Generalitat como Agente del Cambio
            Tecnológico. La empresa que me contrate accede a subvenciones salariales bonificadas
            para digitalización e inteligencia artificial.
          </p>
          <a
            href="#contacto"
            className="mt-7 inline-flex min-h-[54px] items-center gap-2 rounded-full border-2 border-[#3D6BFF] bg-[#0044FF] px-8 py-4 text-base font-semibold text-white shadow-[0_0_24px_2px_#0044FF] transition-all duration-150 active:scale-[0.97]"
          >
            <span>Consultar contratación</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="lg:col-span-6"
        >
          <div className="led-box p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2.5 text-[15px] font-bold tracking-[0.1em] text-[#9DB8FF] uppercase">
                <span className="led-dot h-2.5 w-2.5 rounded-full" />
                Acreditación oficial
              </span>
              <span className="text-[15px] font-bold text-[#9DB8FF]">Generalitat de Catalunya</span>
            </div>

            <p className="font-display led-text mt-4 text-[clamp(6rem,13vw,10rem)] leading-[0.85] font-bold tracking-[-0.07em]">
              375<span className="ml-2 text-[0.38em] tracking-[-0.03em] text-[#9DB8FF]">h</span>
            </p>
            <p className="font-display mt-3 text-[26px] leading-tight font-bold tracking-[-0.03em] sm:text-[30px]">
              Agente del Cambio Tecnológico
            </p>

            <div className="mt-6 flex gap-1" role="img" aria-label="375 de 375 horas completadas">
              {Array.from({ length: SEGMENTS }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { scaleY: 0.15 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 0.2 }}
                  className="led-seg h-7 flex-1 rounded-sm"
                />
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {topics.map((t) => (
                <li key={t} className="led-chip rounded-full px-4 py-1.5 text-[16px] font-bold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
