import { motion } from "framer-motion";
import { ArrowUpRight, Check, Search, Sparkles, Workflow, Database } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const steps = [
  {
    step: "01",
    tag: "Atraer",
    title: "Que te encuentren",
    text: "Marketing, web y SEO técnico pensados desde el primer día para atraer a los clientes correctos.",
    proof: "Webs propias en producción",
    visual: (
      <div className="my-5 rounded-2xl border border-white/20 bg-white/95 p-4 text-zinc-900 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <Search size={12} className="text-zinc-400" />
          <span className="truncate">google.es · extraescolares barcelona</span>
        </div>
        <p className="mt-1.5 truncate font-display text-sm font-bold text-[#0044FF]">
          diversplas.es — Extraescolares y Casales
        </p>
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Top 1 Google España
          </span>
          <span className="font-mono text-zinc-400">100% Técnico</span>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    tag: "Ordenar",
    title: "Que todo esté en orden",
    text: "Gestión administrativa y un ERP a medida: stock, facturación y albaranes en un mismo sitio.",
    proof: "Prácticas de gestión y logística · 416 h",
    visual: (
      <div className="my-5 rounded-2xl border border-white/20 bg-white/95 p-4 text-zinc-900 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-[11px] font-mono text-zinc-500">
          <span className="font-semibold text-zinc-800 flex items-center gap-1.5">
            <Database size={12} className="text-[#0044FF]" />
            ERP Operativo
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Producción
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
          <div className="rounded-lg border border-zinc-100 bg-zinc-50/80 p-2">
            <span className="block text-[10px] text-zinc-500">Stock</span>
            <span className="font-bold text-[11px] text-zinc-900">Sincronizado</span>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50/80 p-2">
            <span className="block text-[10px] text-zinc-500">Albaranes</span>
            <span className="font-bold text-[11px] text-zinc-900">Al día</span>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2">
            <span className="block text-[10px] text-blue-600">Facturación</span>
            <span className="font-bold text-[11px] text-[#0044FF]">Automática</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    tag: "Automatizar",
    title: "Que se haga solo",
    text: "n8n y agentes de IA conectan tu CRM, formularios y WhatsApp sin tareas manuales.",
    proof: "Agente del Cambio Tecnológico · 375 h",
    visual: (
      <div className="my-5 rounded-2xl border border-white/20 bg-white/95 p-4 text-zinc-900 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-[11px] font-mono text-zinc-500">
          <span className="font-semibold text-zinc-800 flex items-center gap-1.5">
            <Workflow size={12} className="text-[#0044FF]" />
            Pipeline n8n + IA
          </span>
          <span className="font-mono text-xs font-bold text-[#0044FF]">0 manual</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-1 text-[11px] font-semibold">
          <span className="rounded bg-zinc-100 px-2 py-1 text-zinc-700">Formulario</span>
          <span className="text-zinc-300">→</span>
          <span className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-[#0044FF]">Agente IA</span>
          <span className="text-zinc-300">→</span>
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-emerald-700">WhatsApp/CRM</span>
        </div>
      </div>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** "Apaga el caos": Metodología de tres pasos con micro-interfaces realistas y estética premium. */
export function OrderSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="orden"
      aria-label="Metodología de trabajo"
      className="relative scroll-mt-[62px] overflow-hidden bg-gradient-to-br from-[#003FE6] via-[#0034CC] to-[#002299] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* Ambient background light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.18),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-white/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Metodología de trabajo</span>
            </div>
            <h2 className="font-display mt-3 max-w-[18ch] text-[clamp(2.4rem,5.2vw,4.6rem)] font-bold tracking-[-0.04em] leading-[1.02] text-white">
              Apaga el caos: marketing, gestión y tecnología en orden.
            </h2>
          </div>

          <a
            href="#proyectos"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-zinc-950 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-zinc-100 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.45)] active:scale-[0.98]"
          >
            <span>Ver los proyectos</span>
            <ArrowUpRight
              size={18}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* 3 Steps Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-8">
          {steps.map((s, i) => (
            <motion.article
              key={s.step}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group relative flex flex-col justify-between rounded-[28px] border border-white/15 bg-white/[0.08] p-7 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12] sm:p-8"
            >
              <div>
                {/* Step pill */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                    Paso {s.step} · {s.tag}
                  </span>
                </div>

                {/* Micro-UI */}
                {s.visual}

                {/* Title & Copy */}
                <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-white sm:text-[26px]">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed font-normal text-white/85 sm:text-[17px]">
                  {s.text}
                </p>
              </div>

              {/* Refined Proof Badge */}
              <div className="mt-6 pt-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors group-hover:bg-white/20">
                  <Check size={14} strokeWidth={2.6} className="text-emerald-300" />
                  <span>{s.proof}</span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
