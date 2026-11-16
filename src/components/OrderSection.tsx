import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { SectionTitle } from "./SectionTitle";
import { useReducedMotion } from "./motion-pref";

const steps = [
  {
    label: "1 · Web",
    title: "Una web que posiciona",
    text: "Estructura, SEO técnico y rendimiento pensados desde el primer día para que te encuentren.",
    proof: "Top 1 en Google con diversplas.es",
  },
  {
    label: "2 · ERP",
    title: "Un sistema que ordena",
    text: "Stock, facturación y albaranes en un mismo sitio, a medida de cómo trabaja tu empresa.",
    proof: "ERP interno con demo en directo",
  },
  {
    label: "3 · IA",
    title: "Flujos que trabajan solos",
    text: "n8n y agentes de IA conectan tu CRM, formularios y WhatsApp sin tareas manuales.",
    proof: "Tarea ejecutada sin intervención",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Apaga el caos" equivalent: three numbered step cards with a coloured header. */
export function OrderSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="orden"
      className="t-bg-hero t-ink t-line scroll-mt-[62px] border-t py-14 text-center sm:py-20 2xl:py-28"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <SectionTitle
          center
          index="01"
          label="El método"
          word="Método"
          className="[--outline-fill:var(--t-hero)]"
        />
        <SectionHeading
          center
          eyebrow=""
          title="Apaga el caos:"
          accentTitle="web, procesos e IA en orden."
          description="Baja y mira cómo se ordena: una web que te trae clientes, un sistema que los gestiona y flujos que se ocupan del resto."
        />

        <div className="mt-12 grid gap-6 text-left md:grid-cols-3 lg:mt-16">
          {steps.map((s, i) => (
            <motion.article
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group overflow-hidden rounded-[22px] border-2 border-[#09090B] bg-white text-[#09090B] shadow-[6px_6px_0_#09090B] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-1"
            >
              <div className="bg-[#0044FF] px-5 py-3 text-[13px] font-semibold tracking-[0.14em] text-white uppercase">
                {s.label}
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-[26px] leading-[1.05] font-bold tracking-[-0.035em] sm:text-[30px]">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-snug font-medium text-[#52525B] sm:text-[17px]">
                  {s.text}
                </p>
                <p className="mt-6 flex items-center gap-2 border-t border-[#09090B]/15 pt-4 text-sm font-semibold text-[#0044FF]">
                  <Check size={16} strokeWidth={3} />
                  {s.proof}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <a
          href="#proyectos"
          className="t-bg-ink t-on-ink mt-12 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97] sm:text-base"
        >
          <span>Ver los proyectos</span>
          <ArrowUpRight size={16} strokeWidth={2.4} />
        </a>
      </div>
    </section>
  );
}
