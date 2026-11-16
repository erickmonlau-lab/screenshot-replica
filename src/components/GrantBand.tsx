import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

/** Full-bleed cobalt band: the 375 h accreditation as a reason to hire. */
export function GrantBand() {
  const reduce = useReducedMotion();
  return (
    <section
      id="subvencion"
      className="scroll-mt-[62px] bg-[#0044FF] py-14 text-white sm:py-20 2xl:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold tracking-[0.1em] text-[#0044FF] uppercase">
            <BadgeCheck size={16} strokeWidth={2.6} />
            Subvenciones salariales directas
          </span>
          <h2 className="font-display mt-5 text-[clamp(2.3rem,6vw,5rem)] leading-[0.98] font-bold tracking-[-0.045em]">
            Contratarme puede abrirle a tu empresa subvenciones salariales.
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-snug font-medium text-blue-50 sm:text-xl">
            Cuento con 375 h de acreditación oficial de la Generalitat como Agente del Cambio
            Tecnológico. La empresa que me contrate accede a subvenciones salariales bonificadas
            para digitalización e inteligencia artificial.
          </p>
        </motion.div>
        <div className="lg:col-span-4 lg:text-right">
          <a
            href="#contacto"
            className="inline-flex min-h-[54px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-8 py-4 text-base font-semibold text-[#09090B] shadow-[5px_5px_0_#09090B] transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Consultar contratación</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
