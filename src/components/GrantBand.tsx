import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex items-center gap-2 lg:col-span-5">
          <motion.p
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            aria-label="375 horas"
            className="font-display shrink-0 text-[clamp(6rem,15vw,10.5rem)] leading-[0.82] font-bold tracking-[-0.07em] text-transparent select-none [-webkit-text-stroke:3px_#ffffff]"
          >
            375<span className="text-white [-webkit-text-stroke:0]">h</span>
          </motion.p>
          <motion.div
            aria-hidden="true"
            animate={reduce ? { rotate: 0 } : { rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="h-[170px] w-[170px] shrink-0 rounded-full border-[3px] border-[#09090B] bg-[#FFD60A] shadow-[6px_6px_0_#09090B]"
          >
            <svg viewBox="0 0 170 170" className="h-full w-full">
              <defs>
                <path id="seal" d="M85,85 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
              </defs>
              <text className="fill-[#09090B] text-[15px] font-bold tracking-[0.06em]">
                <textPath href="#seal" textLength="385" lengthAdjust="spacing">
                  ACREDITACIÓN OFICIAL · GENERALITAT ·
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

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
          <h2 className="font-display mt-5 text-[clamp(2.3rem,5.2vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.05em]">
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
      </div>
    </section>
  );
}
