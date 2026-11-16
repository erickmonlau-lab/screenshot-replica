import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  TrendingUp,
  Search,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useReducedMotion } from "./motion-pref";

interface MetricData {
  id: string;
  badge: {
    icon: typeof Clock;
    text: string;
    pillBg: string;
    pillText: string;
    pillBorder: string;
  };
  prefix?: string;
  from: number;
  to: number;
  suffix?: string;
  suffixAccent?: string;
  title: string;
  detail: string;
  visualElement: {
    type: "progress" | "accreditation" | "serp";
    meta: string;
  };
}

const METRICS_DATA: MetricData[] = [
  {
    id: "horas",
    badge: {
      icon: Clock,
      text: "Experiencia Práctica",
      pillBg: "bg-blue-500/10",
      pillText: "text-[#0044FF]",
      pillBorder: "border-blue-500/20",
    },
    prefix: "+",
    from: 0,
    to: 1000,
    suffix: " h",
    suffixAccent: "text-[#0044FF]",
    title: "de experiencia real",
    detail:
      "Marketing, gestión y desarrollo web en producción para empresas reales, sin proyectos de tutorial.",
    visualElement: {
      type: "progress",
      meta: "Webs · ERPs · Automatización n8n",
    },
  },
  {
    id: "acreditacion",
    badge: {
      icon: ShieldCheck,
      text: "Acreditación Oficial",
      pillBg: "bg-emerald-500/10",
      pillText: "text-emerald-600",
      pillBorder: "border-emerald-500/20",
    },
    from: 0,
    to: 375,
    suffix: " h",
    suffixAccent: "text-emerald-600",
    title: "Agente del Cambio Tecnológico",
    detail:
      "Acreditación oficial certificada por la Generalitat de Catalunya en digitalización empresarial.",
    visualElement: {
      type: "accreditation",
      meta: "Generalitat de Catalunya · Certificado",
    },
  },
  {
    id: "seo",
    badge: {
      icon: TrendingUp,
      text: "SEO Técnico Medible",
      pillBg: "bg-amber-500/10",
      pillText: "text-amber-700",
      pillBorder: "border-amber-500/20",
    },
    prefix: "Top ",
    from: 9,
    to: 1,
    title: "en Google España",
    detail:
      "diversplas.es posicionada en el primer puesto orgánico para extraescolares en Barcelona.",
    visualElement: {
      type: "serp",
      meta: 'Google: "extraescolares barcelona"',
    },
  },
];

function AnimatedValue({
  from,
  to,
  prefix,
  suffix,
  suffixAccent,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  suffixAccent?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const fmt = {
    format: (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const write = (v: number) => {
      node.textContent = fmt.format(Math.round(v));
    };
    if (!inView || reduce) {
      write(reduce || inView ? to : from);
      return;
    }
    const controls = animate(from, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: write,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, to]);

  return (
    <span className="inline-flex items-baseline font-display text-[clamp(3.4rem,5.6vw,5.2rem)] font-bold tracking-[-0.05em] leading-[0.92] text-zinc-950">
      {prefix && (
        <span className={to === 1 ? "text-zinc-950 mr-1.5" : "text-zinc-950"}>
          {prefix}
        </span>
      )}
      <span ref={ref} className="tabular-nums">
        {fmt.format(to)}
      </span>
      {suffix && (
        <span
          className={`ml-1 text-[0.62em] font-bold ${suffixAccent ?? "text-zinc-950"}`}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}

export function MetricsBand() {
  const reduce = useReducedMotion();

  return (
    <section
      id="metricas"
      aria-label="Resultados en cifras"
      className="section-light relative overflow-hidden border-t border-black/10 bg-[#FAF9F6] py-16 sm:py-20 2xl:py-24"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-black/8 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0044FF]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Resultados medibles</span>
            </div>
            <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              Cifras con respaldo verificable.
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-relaxed font-medium text-zinc-500 sm:text-base">
            Cada métrica corresponde a sistemas reales en funcionamiento, horas
            acreditadas y posicionamiento activo.
          </p>
        </div>

        {/* 3 Visual Cards with Balanced Separation */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {METRICS_DATA.map((m, i) => {
            const Icon = m.badge.icon;
            return (
              <motion.article
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-black/10 bg-white p-7 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-[#0044FF]/40 hover:shadow-[0_16px_40px_-12px_rgba(0,68,255,0.12)] sm:p-8"
              >
                {/* Top: Category Pill Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${m.badge.pillBg} ${m.badge.pillText} ${m.badge.pillBorder}`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{m.badge.text}</span>
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-300">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Center: Big Animated Number */}
                  <div className="mt-7">
                    <AnimatedValue
                      from={m.from}
                      to={m.to}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      suffixAccent={m.suffixAccent}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display mt-3 text-xl font-bold tracking-[-0.02em] text-zinc-950 sm:text-2xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-zinc-600 sm:text-base">
                    {m.detail}
                  </p>
                </div>

                {/* Bottom: Visual Micro-Component / Proof Element */}
                <div className="mt-7 border-t border-zinc-100 pt-5">
                  {m.visualElement.type === "progress" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
                        <span>Horas en producción</span>
                        <span className="text-[#0044FF]">100% Prácticas</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 p-0.5">
                        <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-[#0044FF]" />
                      </div>
                      <p className="font-mono text-[11px] text-zinc-400">
                        {m.visualElement.meta}
                      </p>
                    </div>
                  )}

                  {m.visualElement.type === "accreditation" && (
                    <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-900">
                          Acreditación Oficial
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        Generalitat
                      </span>
                    </div>
                  )}

                  {m.visualElement.type === "serp" && (
                    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/90 p-2.5 px-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Search className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                          <span className="truncate font-mono text-[11px] text-zinc-700">
                            extraescolares barcelona
                          </span>
                        </div>
                        <span className="shrink-0 rounded bg-[#0044FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                          #1 GOOGLE
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
