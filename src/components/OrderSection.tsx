import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { ErpMini, IaMini, WebMini } from "./MethodVisuals";
import { useReducedMotion } from "./motion-pref";

const steps = [
  {
    label: "1 · Atraer",
    art: <WebMini />,
    title: "Que te encuentren",
    text: "Marketing, web y SEO técnico pensados desde el primer día para atraer a los clientes correctos.",
    proof: "Webs propias en producción",
  },
  {
    label: "2 · Ordenar",
    art: <ErpMini />,
    title: "Que todo esté en orden",
    text: "Gestión administrativa y un ERP a medida: stock, facturación y albaranes en un mismo sitio.",
    proof: "Prácticas de gestión y logística · 416 h",
  },
  {
    label: "3 · Automatizar",
    art: <IaMini />,
    title: "Que se haga solo",
    text: "n8n y agentes de IA conectan tu CRM, formularios y WhatsApp sin tareas manuales.",
    proof: "Agente del Cambio Tecnológico · 375 h",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const ROT = [-2.5, 1.8, -1.5] as const;

/** "Apaga el caos": tres pasos con numerales gigantes en outline tras ilustraciones inclinadas. */
export function OrderSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="orden"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#0044FF] py-14 text-white sm:py-16 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-[16ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] font-bold tracking-[-0.05em]">
            Apaga el caos: <span className="[text-shadow:4px_4px_0_#09090B]">marketing, gestión y tecnología en orden.</span>
          </h2>
          <a
            href="#proyectos"
            className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-white bg-white px-7 py-3.5 text-base font-semibold text-[#09090B] shadow-[4px_4px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
          >
            <span>Ver los proyectos</span>
            <ArrowUpRight size={17} strokeWidth={2.4} />
          </a>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-14">
          {steps.map((s, i) => (
            <motion.article
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute -top-6 -left-1 text-[170px] leading-none font-bold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:2px_#ffffff]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <motion.div
                whileHover={{ rotate: 0, y: reduce ? 0 : -6 }}
                style={{ rotate: reduce ? 0 : ROT[i]! }}
                className="relative z-10 ml-10 mt-[88px] overflow-hidden rounded-2xl border-[3px] border-[#09090B] bg-[#F4F5F8] p-3 shadow-[8px_8px_0_#09090B] md:ml-14"
              >
                {s.art}
              </motion.div>
              <div className="relative z-10 mt-6">
                <h3 className="font-display text-[28px] leading-[1.05] font-bold tracking-[-0.035em] sm:text-[32px]">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[17px] leading-snug font-medium text-white">{s.text}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-[#09090B] bg-[#FFD60A] px-3 py-1.5 text-[15px] font-bold text-[#09090B] shadow-[3px_3px_0_#09090B]">
                  <Check size={16} strokeWidth={3} />
                  {s.proof}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
