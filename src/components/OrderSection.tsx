import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const steps = [
  {
    step: "01",
    tag: "Atraer",
    title: "Que te encuentren",
    text: "Marketing, web y SEO técnico pensados desde el primer día para atraer a los clientes correctos.",
    proof: "Webs propias en producción",
  },
  {
    step: "02",
    tag: "Ordenar",
    title: "Que todo esté en orden",
    text: "Gestión administrativa y un ERP a medida: stock, facturación y albaranes en un mismo sitio.",
    proof: (
      <span>
        Prácticas de gestión y logística ·{" "}
        <span className="whitespace-nowrap">416 h</span>
      </span>
    ),
  },
  {
    step: "03",
    tag: "Automatizar",
    title: "Que se haga solo",
    text: "n8n y agentes de IA conectan tu CRM, formularios y WhatsApp sin tareas manuales.",
    proof: (
      <span>
        Agente del Cambio Tecnológico ·{" "}
        <span className="whitespace-nowrap">375 h</span>
      </span>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Apaga el caos": Tipografía outline para ATRAER, ORDENAR, AUTOMATIZAR y ajuste perfecto en pantalla. */
export function OrderSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="orden"
      aria-label="Metodología de trabajo"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#0044FF] py-10 sm:py-12 lg:py-14 text-white"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display max-w-[20ch] text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1] font-bold tracking-[-0.04em] text-white">
              Apaga el caos: marketing, gestión y tecnología en orden.
            </h2>
          </div>

          <a
            href="#proyectos"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-6 py-3 text-base font-bold text-[#09090B] shadow-[4px_4px_0_#09090B] transition-transform duration-150 hover:scale-[1.03] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span>Ver los proyectos</span>
            <ArrowUpRight size={18} strokeWidth={2.6} />
          </a>
        </div>

        {/* 3 Solid High-Contrast Cards with Giant Outline Step Typography */}
        <div className="mt-8 grid gap-6 md:grid-cols-3 lg:gap-8 sm:mt-10">
          {steps.map((s, i) => (
            <motion.article
              key={s.step}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="group relative flex flex-col justify-between rounded-[24px] border-[3px] border-[#09090B] bg-white p-6 sm:p-7 text-[#09090B] shadow-[8px_8px_0_#09090B]"
            >
              <div>
                {/* Step meta row */}
                <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#09090B]/10">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Paso 0{i + 1}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0044FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    0{i + 1} / 03
                  </span>
                </div>

                {/* Giant Outlined Step Word: ATRAER / ORDENAR / AUTOMATIZAR */}
                <div className="overflow-hidden pt-3 pb-1">
                  <span
                    aria-hidden="true"
                    className="font-display block text-[clamp(2.2rem,3.4vw,3.1rem)] leading-[0.92] font-bold tracking-[-0.04em] uppercase select-none text-white [-webkit-text-stroke:2.5px_#09090B] [paint-order:stroke_fill]"
                  >
                    {s.tag}
                  </span>
                </div>

                {/* Title & Body */}
                <h3 className="font-display mt-3 text-xl sm:text-[23px] font-bold tracking-tight text-[#09090B] leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-base sm:text-[17px] leading-snug font-medium text-zinc-700">
                  {s.text}
                </p>
              </div>

              {/* Solid Yellow Proof Badge without orphaned units */}
              <div className="mt-6 pt-2">
                <p className="inline-flex items-center gap-2 rounded-xl border-2 border-[#09090B] bg-[#FFD60A] px-3.5 py-2 text-xs sm:text-sm font-bold text-[#09090B] shadow-[3px_3px_0_#09090B]">
                  <Check size={16} strokeWidth={3} className="shrink-0" />
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
