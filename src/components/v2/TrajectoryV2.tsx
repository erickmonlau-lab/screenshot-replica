import { GraduationCap, Briefcase, Award, ShieldCheck, Download, ExternalLink, Calendar, Check } from "lucide-react";

interface TrajectoryV2Props {
  cvUrl?: string;
}

export function TrajectoryV2({ cvUrl = "/erick-rodriguez-cv.pdf" }: TrajectoryV2Props) {
  const formalEducation = [
    {
      level: "Grado Superior",
      title: "CFGS en Marketing y Publicidad",
      institution: "Monlau Formació Professional · Barcelona",
      period: "Completado",
      highlights: [
        "Estrategia de captación y posicionamiento SEO.",
        "Diseño de propuestas comerciales y conversión digital.",
        "Análisis de métricas de mercado y canales de venta.",
      ],
    },
    {
      level: "Grado Medio",
      title: "CFGM en Gestión Administrativa",
      institution: "Monlau Formació Professional · Barcelona",
      period: "Completado",
      highlights: [
        "Control de facturación, albaranes y contabilidad básica.",
        "Gestión de compras, cobros y relaciones con proveedores.",
        "Base operativa real para diseñar flujos de software y ERPs útiles.",
      ],
    },
  ];

  const internships = [
    {
      role: "Prácticas en Marketing y Gestión Comercial",
      company: "Diset Control de Plagas",
      period: "2025 — 2026",
      hours: "516 h",
      tasks: [
        "Gestión y actualización de e-commerce en Shopify y WordPress.",
        "Atención comercial rápida y cierre de consultas por WhatsApp Business.",
        "Diseño visual de materiales gráficos y prototipos de pantallas en Figma y Canva.",
      ],
    },
    {
      role: "Prácticas de Gestión Administrativa y Logística",
      company: "Ferretería FIMSA",
      period: "2023 — 2024",
      hours: "416 h",
      tasks: [
        "Emisión y comprobación de albaranes, facturas y registros contables.",
        "Control físico y digital de inventario de almacén.",
        "Coordinación diaria de pedidos con proveedores y clientes comerciales.",
      ],
    },
  ];

  return (
    <section id="trayectoria" className="bg-[#F6F5F0] py-16 sm:py-20 lg:py-24 border-b border-[#D4D4D0]">
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4D4D0] pb-6 mb-12">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              04 · Trayectoria y Formación
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] mt-1">
              Perfil híbrido: negocio + tecnología.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={cvUrl}
              download="Erick-Rodriguez-CV.pdf"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#111111] bg-white px-4 py-2 text-xs sm:text-sm font-bold text-[#111111] shadow-[2px_2px_0_#111111] hover:bg-[#EFEFE9] transition-all"
            >
              <Download size={14} />
              <span>Descargar CV completo (PDF)</span>
            </a>
          </div>
        </div>

        {/* Official Accreditation Feature Banner */}
        <div className="rounded-2xl border-2 border-[#111111] bg-white p-6 sm:p-8 shadow-[5px_5px_0_#111111] mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#111111] bg-[#1D4ED8] text-white shadow-[2px_2px_0_#111111]">
                <ShieldCheck size={24} />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md border border-[#111111] bg-[#FFD200] px-2 py-0.5 font-mono text-xs font-black text-[#111111]">
                    375 HORAS
                  </span>
                  <span className="font-mono text-xs font-bold text-[#57575C] uppercase">
                    Acreditación Oficial
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#111111] mt-1">
                  Agente del Cambio Tecnológico
                </h3>
                <p className="mt-1 text-sm text-[#57575C] max-w-[65ch]">
                  Certificación oficial emitida en el marco del programa Generació Digital (Generalitat de Catalunya / Fondos NextGenerationEU). Capacitación especializada en digitalización de procesos, herramientas habilitadoras y automatización.
                </p>
              </div>
            </div>

            {/* Benefit for Hiring Companies */}
            <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 lg:max-w-[340px] shrink-0">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                ✦ Ayuda directa a la empresa
              </span>
              <p className="mt-1 text-xs text-amber-950 font-medium leading-relaxed">
                Esta acreditación permite a las pymes que me incorporen acogerse a <strong>subvenciones salariales directas</strong> de convocatorias públicas para la transformación digital.
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Education vs Real Internships */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Column 1: Formal Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#D4D4D0] pb-3">
              <GraduationCap size={18} className="text-[#1D4ED8]" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                Formación Reglada
              </h3>
            </div>

            <div className="space-y-4">
              {formalEducation.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#D4D4D0] bg-white p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#EFEFE9] px-2 py-0.5 font-mono text-[10px] font-bold text-[#57575C]">
                      {edu.level}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#57575C]">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#111111] mt-1">
                    {edu.title}
                  </h4>
                  <p className="text-xs text-[#57575C] font-medium">{edu.institution}</p>
                  <ul className="mt-3 space-y-1.5 border-t border-[#D4D4D0]/60 pt-3">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#111111]">
                        <span className="text-[#1D4ED8] font-bold mt-0.5">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Internships & Practical Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#D4D4D0] pb-3">
              <Briefcase size={18} className="text-[#1D4ED8]" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                Prácticas en Entornos Empresariales Reales
              </h3>
            </div>

            <div className="space-y-4">
              {internships.map((job, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#D4D4D0] bg-white p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1D4ED8] border border-blue-500/20">
                      {job.hours}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#57575C]">
                      {job.period}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#111111] mt-1">
                    {job.role}
                  </h4>
                  <p className="text-xs font-semibold text-[#111111]">{job.company}</p>
                  <ul className="mt-3 space-y-1.5 border-t border-[#D4D4D0]/60 pt-3">
                    {job.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#57575C]">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Leadership note */}
              <div className="rounded-xl border border-dashed border-[#D4D4D0] bg-[#F6F5F0] p-4 text-xs text-[#57575C]">
                <strong className="text-[#111111]">Monitor de Fútbol Base · Escuela Wagner (2023—2025):</strong> Experiencia en dinamización y liderazgo de grupos, trabajo coordinado y comunicación asertiva con familias.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
