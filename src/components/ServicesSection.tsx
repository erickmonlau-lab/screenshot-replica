import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useReducedMotion } from "./motion-pref";

const services = [
  {
    num: "01",
    tag: "Desarrollo web & sistemas",
    title: "Plataformas web y ERPs a medida.",
    description:
      "Webs de alto rendimiento, portales corporativos y sistemas ERP internos para empresas, con código tipado y arquitecturas modernas.",
    skills: ["React & TypeScript", "Next.js & Vite", "ERP interno", "APIs & Webhooks", "SQL"],
  },
  {
    num: "02",
    tag: "SEO técnico & rendimiento",
    title: "Webs que posicionan y cargan al instante.",
    description:
      "SEO técnico, Core Web Vitals y despliegue a producción. La base con la que diversplas.es llegó al Top 1 de Google en Barcelona.",
    skills: ["SEO técnico (Top 1)", "Core Web Vitals", "Despliegue en producción", "Shopify & WordPress"],
  },
  {
    num: "03",
    tag: "Automatización IA & negocio",
    title: "Flujos autónomos con n8n e IA.",
    description:
      "Procesos operativos automatizados, herramientas conectadas (CRM, formularios, WhatsApp) y modelos LLM enrutados con contexto de empresa.",
    skills: ["Flujos n8n", "Agentes de IA", "Claude con Skills", "WhatsApp Business", "Second Brain"],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="servicios"
      className="t-bg-hero t-ink t-line scroll-mt-[62px] border-t py-14 sm:py-20 2xl:py-28"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Qué hago"
          title="Tres formas de llevar tu negocio a producción."
          description="Desarrollo, posicionamiento y automatización, de la idea al sistema funcionando."
          className="mb-12 sm:mb-16"
        />

        <div className="t-line border-t-2 border-current">
          {services.map((s) => (
            <motion.article
              key={s.num}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group grid gap-5 border-b border-current/25 py-9 transition-colors duration-300 lg:grid-cols-12 lg:gap-8 lg:py-12"
            >
              <div className="flex items-baseline gap-4 lg:col-span-1 lg:block">
                <span className="font-display text-2xl font-bold tracking-[-0.03em] text-[#0044FF] sm:text-3xl">
                  {s.num}
                </span>
              </div>

              <div className="lg:col-span-6">
                <p className="t-muted mb-3 text-xs font-semibold tracking-[0.16em] uppercase sm:text-[13px]">
                  {s.tag}
                </p>
                <h3 className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.02] font-bold tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
              </div>

              <div className="lg:col-span-5">
                <p className="t-muted text-base leading-snug font-medium sm:text-lg lg:text-xl">
                  {s.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.skills.map((k) => (
                    <li
                      key={k}
                      className="t-line t-bg-card rounded-full border px-3.5 py-1.5 text-[13px] font-semibold"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <a
          href="#contacto"
          className="t-bg-ink t-on-ink mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97] sm:text-base"
        >
          <span>Cuéntame tu proyecto</span>
          <ArrowUpRight size={16} strokeWidth={2.4} />
        </a>
      </div>
    </section>
  );
}
