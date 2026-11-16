import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RotatingSeal } from "./RotatingSeal";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Banda cobalto: las 375 h de acreditación como motivo para contratar. */
export function GrantBand() {
  const reduce = useReducedMotion();
  return (
    <section
      id="subvencion"
      className="scroll-mt-[62px] overflow-hidden border-y-[3px] border-[#09090B] bg-[#0044FF] py-14 text-white sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-4 py-1.5 text-[15px] font-bold tracking-[0.08em] text-[#0044FF] uppercase shadow-[3px_3px_0_#09090B]">
            Subvenciones salariales directas
          </span>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.96] font-bold tracking-[-0.05em]">
            Contratarme puede abrirle a tu empresa subvenciones salariales.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-snug font-medium text-white sm:text-xl">
            Cuento con 375 h de acreditación oficial de la Generalitat como Agente del Cambio
            Tecnológico. La empresa que me contrate accede a subvenciones salariales bonificadas
            para digitalización e inteligencia artificial.
          </p>
          <a
            href="#contacto"
            className="mt-7 inline-flex min-h-[54px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-8 py-4 text-base font-semibold text-[#09090B] shadow-[5px_5px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
          >
            <span>Consultar contratación</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ type: "spring", stiffness: 110, damping: 14 }}
          className="flex justify-center lg:col-span-5 lg:justify-end"
        >
          <RotatingSeal
            text="AGENTE DEL CAMBIO TECNOLÓGICO · GENERALITAT DE CATALUNYA · "
            size={400}
            fontSize={19}
            duration={34}
            className="border-[3px] border-[#09090B] bg-[#FFD60A] shadow-[10px_10px_0_#09090B] max-w-full"
          >
            <span className="flex flex-col items-center text-[#09090B]">
              <span className="font-display text-[118px] leading-[0.85] font-bold tracking-[-0.07em]">
                375
              </span>
              <span className="font-display text-[34px] leading-none font-bold tracking-[-0.03em]">
                horas
              </span>
            </span>
          </RotatingSeal>
        </motion.div>
      </div>
    </section>
  );
}
