import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;
const SEGMENTS = 25; // cada bloque = 15 h → 25 × 15 = 375 h
const topics = ["Transformación digital", "Automatización de procesos", "IA aplicada"];

/** Acreditación de 375 h: ficha blanca con contador, barra segmentada y temas sobre fondo violeta. */
export function GrantBand() {
  const reduce = useReducedMotion();
  return (
    <section
      id="subvencion"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#6D28D9] py-14 text-white sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border-[3px] border-[#09090B] bg-white px-4 py-1.5 text-[15px] font-bold tracking-[0.08em] text-[#09090B] uppercase shadow-[4px_4px_0_#09090B]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#09090B] bg-[#6D28D9]" />
            Subvenciones salariales directas
          </span>
          <h2 className="font-display mt-7 text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1.02] font-bold tracking-[-0.05em]">
            Contratarme puede abrirle a tu empresa
            <span className="mt-2 block">
              <span className="rounded-lg bg-[#09090B] px-3 py-1 leading-[1.3] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                subvenciones salariales.
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-[50ch] text-lg leading-snug font-semibold sm:text-xl">
            Cuento con 375 h de acreditación oficial de la Generalitat como Agente del Cambio
            Tecnológico. La empresa que me contrate accede a subvenciones salariales bonificadas
            para digitalización e inteligencia artificial.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex min-h-[54px] items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-white px-8 py-3.5 text-base font-bold text-[#09090B] shadow-[6px_6px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
          >
            <span>Consultar contratación</span>
            <ArrowUpRight size={18} strokeWidth={2.8} />
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="lg:col-span-6"
        >
          <div className="overflow-hidden rounded-[24px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[12px_12px_0_#09090B]">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b-[3px] border-[#09090B] bg-[#09090B] px-6 py-3 text-white">
              <span className="flex items-center gap-2.5 text-[15px] font-bold tracking-[0.1em] uppercase">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6D28D9] ring-2 ring-white" />
                Acreditación oficial
              </span>
              <span className="text-[15px] font-bold">Generalitat de Catalunya</span>
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-display text-[clamp(6rem,13vw,10rem)] leading-[0.85] font-bold tracking-[-0.02em]">
                375<span className="ml-1 text-[0.55em] tracking-[-0.03em] text-[#6D28D9]">h</span>
              </p>
              <p className="font-display mt-4 text-[26px] leading-tight font-bold tracking-[-0.03em] sm:text-[30px]">
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
                    className="h-10 flex-1 rounded-sm border-2 border-[#09090B] bg-[#6D28D9]"
                  />
                ))}
              </div>
              <p className="mt-3 text-[18px] leading-snug font-bold text-[#09090B]">
                25 bloques × 15 h = 375 h completados
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5 xl:flex-nowrap">
                {topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-3 py-1.5 text-[15px] font-bold whitespace-nowrap text-white"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
