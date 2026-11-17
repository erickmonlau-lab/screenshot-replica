import { Code2, Database, Workflow, Search, ArrowRight, CheckCircle2, Layers } from "lucide-react";

export function CapabilitiesV2() {
  const pillars = [
    {
      letter: "A",
      icon: Code2,
      title: "Productos y Plataformas Digitales",
      subtitle: "Desarrollo web, interfaces táctiles y aplicaciones",
      description:
        "Construyo aplicaciones web modernas con React y TypeScript pensadas para usuarios reales: carga instantánea, navegación fluida y arquitectura escalable sin deuda técnica.",
      concreteExample: "BreadPDF (suite con 69 utilidades y procesamiento de documentos en el navegador).",
      tags: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "UX/UI"],
    },
    {
      letter: "B",
      icon: Database,
      title: "Sistemas de Gestión y Operaciones",
      subtitle: "Procesos empresariales, facturación, ERP y trazabilidad",
      description:
        "Aporto una comprensión práctica de la operativa interna (albaranes, control de stock, contabilidad y partes de trabajo) adquirida en entornos reales de empresa y logística.",
      concreteExample: "Oderalo ERP (sincronización de avisos, técnicos en ruta y facturación directa).",
      tags: ["Gestión Administrativa", "ERP a medida", "Facturación", "Control de Stock"],
    },
    {
      letter: "C",
      icon: Workflow,
      title: "Automatización e Inteligencia Artificial",
      subtitle: "n8n, conectores API, webhooks y agentes autónomos",
      description:
        "Elimino las tareas manuales repetitivas interconectando herramientas mediante flujos de trabajo en n8n y agentes de IA que analizan, clasifican y ejecutan sin fricción humana.",
      concreteExample: "Del formulario web al aviso de WhatsApp y factura automática en menos de 30 segundos.",
      tags: ["n8n", "Agentes IA", "APIs REST", "Webhooks", "Automatización"],
    },
    {
      letter: "D",
      icon: Search,
      title: "Estrategia Digital y Captación",
      subtitle: "SEO técnico, arquitectura de contenidos y conversión",
      description:
        "Formación reglada en Marketing y Publicidad aplicada a la estructura de la web: optimización On-Page, Schema.org y propuestas de valor claras que convierten visitas en contactos.",
      concreteExample: "Diversplas y Gesgrama (captación orgánica orientada a colegios y propietarios en Barcelona).",
      tags: ["SEO Técnico", "Schema.org", "Conversión Comercial", "Arquitectura Web"],
    },
  ];

  return (
    <section id="que-resuelvo" className="bg-[#F6F5F0] py-16 sm:py-20 lg:py-24 border-b border-[#D4D4D0]">
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4D4D0] pb-6 mb-12">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              02 · Capacidades Conectadas
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] mt-1">
              Qué resuelvo.
            </h2>
          </div>
          <p className="max-w-[44ch] text-sm sm:text-base font-medium text-[#57575C]">
            No son cuatro disciplinas separadas. Son las cuatro piezas que conecto para resolver un mismo problema empresarial.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.letter}
                className="flex flex-col justify-between rounded-2xl border-2 border-[#111111] bg-white p-6 sm:p-8 shadow-[5px_5px_0_#111111] transition-transform hover:-translate-y-1 duration-200"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between border-b border-[#D4D4D0] pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#111111] bg-[#1D4ED8] font-mono text-xs font-black text-white shadow-[2px_2px_0_#111111]">
                        {p.letter}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#57575C]">
                        {p.subtitle}
                      </span>
                    </div>
                    <Icon size={20} className="text-[#1D4ED8]" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#111111]">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-[#57575C] leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4D4D0] space-y-3">
                  {/* Concrete Real Example */}
                  <div className="rounded-xl border border-[#D4D4D0] bg-[#F6F5F0] p-3 text-xs leading-relaxed text-[#111111]">
                    <strong className="font-bold text-[#1D4ED8]">Ejemplo real:</strong> {p.concreteExample}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[#D4D4D0] bg-[#EFEFE9] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#57575C]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Connected Loop Banner */}
        <div className="mt-10 rounded-2xl border-2 border-[#111111] bg-[#0E0E11] p-6 sm:p-8 text-white shadow-[6px_6px_0_#1D4ED8]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                La Intersección de Valor
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Cómo se conectan en una empresa real
              </h4>
              <p className="mt-1 text-sm text-zinc-400 max-w-[55ch]">
                Una web sin proceso detrás solo genera ruido. Un ERP sin captación se queda vacío. Conectar la captación con la operativa y la automatización es lo que genera impacto medible.
              </p>
            </div>

            {/* Visual Step-by-Step Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                <span className="text-blue-400 block text-[10px]">01 · CAPTAR</span>
                <span className="text-white mt-0.5 block">Web & SEO</span>
              </div>
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                <span className="text-emerald-400 block text-[10px]">02 · CONECTAR</span>
                <span className="text-white mt-0.5 block">IA & n8n</span>
              </div>
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                <span className="text-amber-400 block text-[10px]">03 · OPERAR</span>
                <span className="text-white mt-0.5 block">ERP & Factura</span>
              </div>
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5">
                <span className="text-purple-400 block text-[10px]">04 · ESCALAR</span>
                <span className="text-white mt-0.5 block">Control Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
