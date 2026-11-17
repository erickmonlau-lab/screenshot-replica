import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const steps = [
  {
    step: "01",
    tag: "Atraer",
    title: "Que te encuentren",
    text: "Marketing, web y SEO técnico pensados desde el primer día para atraer a los clientes correctos.",
    proof: "Webs rápidas y SEO técnico",
  },
  {
    step: "02",
    tag: "Ordenar",
    title: "Que todo esté en orden",
    text: "Gestión administrativa y un ERP a medida: stock, facturación y albaranes en un mismo sitio.",
    proof: "ERP a medida y control de stock",
  },
  {
    step: "03",
    tag: "Automatizar",
    title: "Que se haga solo",
    text: "n8n y agentes de IA conectan tu CRM, formularios y WhatsApp sin tareas manuales.",
    proof: "Automatización n8n y agentes IA",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Apaga el caos": Fondo claro editorial, titular en dos tonos (Negro + Morado #6D28D9) y tarjetas brutalistas blancas. */
export function OrderSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="orden"
      aria-label="Metodología de trabajo"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#E3E5E9] py-16 sm:py-20 lg:py-24 text-[#09090B]"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Header con el mismo estilo que el Hero: Negro + Morado */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display max-w-[22ch] text-[clamp(2.3rem,4.5vw,3.8rem)] leading-[1.04] font-black tracking-[-0.04em] text-[#09090B]">
              Apaga el caos.{" "}
              <span className="block text-[#6D28D9]">
                Marketing, gestión y tecnología en orden.
              </span>
            </h2>
          </div>

          <a
            href="#proyectos"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-6 py-3 text-base font-bold text-white shadow-[4px_4px_0_#6D28D9] transition-all duration-150 hover:bg-[#6D28D9] hover:border-[#6D28D9] hover:shadow-[5px_5px_0_#09090B] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span>Ver los proyectos</span>
            <ArrowUpRight size={18} strokeWidth={2.6} />
          </a>
        </div>

        {/* 3 Tarjetas Brutalistas Blancas con tipografía outline y acento morado */}
        <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8 sm:mt-12">
          {steps.map((s, i) => (
            <motion.article
              key={s.step}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className={`group relative flex flex-col justify-between rounded-[22px] border-[3px] border-[#09090B] bg-white p-7 sm:p-8 text-[#09090B] transition-all duration-300 ${
                i === 1
                  ? "shadow-[8px_8px_0_#6D28D9] hover:shadow-[12px_12px_0_#09090B]"
                  : "shadow-[8px_8px_0_#09090B] hover:shadow-[12px_12px_0_#6D28D9]"
              }`}
            >
              <div>
                {/* Palabra outline gigante: ATRAER / ORDENAR / AUTOMATIZAR */}
                <div className="overflow-hidden pb-1">
                  <span
                    aria-hidden="true"
                    className="font-display block text-[clamp(2.3rem,3.5vw,3.2rem)] leading-[0.92] font-black tracking-[-0.04em] uppercase select-none text-white [-webkit-text-stroke:2.5px_#09090B] [paint-order:stroke_fill]"
                  >
                    {s.tag}
                  </span>
                </div>

                {/* Subtítulo y texto */}
                <h3 className="font-display mt-4 text-xl sm:text-[23px] font-black tracking-tight text-[#09090B] leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-base sm:text-[17px] leading-relaxed font-medium text-[#52525B]">
                  {s.text}
                </p>
              </div>

              {/* Píldora de entregable limpia en lavanda/morado con borde brutalista */}
              <div className="mt-6 pt-2">
                <p className="inline-flex items-center gap-2 rounded-xl border-2 border-[#09090B] bg-[#EDE9FE] px-3.5 py-2 text-[14px] sm:text-[15px] font-bold text-[#6D28D9] shadow-[3px_3px_0_#09090B]">
                  <Check size={16} strokeWidth={3} className="shrink-0 text-[#6D28D9]" />
                  <span className="leading-tight">{s.proof}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
