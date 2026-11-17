import { useState } from "react";
import { ArrowUpRight, Check, ExternalLink, Layers, Terminal, Sparkles, Shield, Cpu, Smartphone, Laptop } from "lucide-react";

import breadpdf from "@/assets/breadpdf.com.png.asset.json";
import diversplas from "@/assets/diversplas.es.png.asset.json";
import gesgrama from "@/assets/gesgrama.com.png.asset.json";

interface CaseStudy {
  id: string;
  num: string;
  title: string;
  category: string;
  url?: string;
  urlLabel?: string;
  status: "Desarrollo activo" | "En producción" | "Prototipo funcional";
  statusColor: string;
  tagline: string;
  context: string;
  problem: string;
  objective: string;
  responsibility: string[];
  techStack: string[];
  featuresAvailable: string[];
  featuresInDev: string[];
  evidenceImages: { src: string; caption: string; device: "desktop" | "mobile" }[];
  nextSteps: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "oderalo",
    num: "01",
    title: "ODERALO",
    category: "SaaS ERP & Gestión de Operaciones",
    url: "https://oderalo.com",
    urlLabel: "oderalo.com",
    status: "Desarrollo activo",
    statusColor: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    tagline: "Del aviso a la factura sin papeles: software operativo para servicios en campo.",
    context:
      "Las pymes de servicios técnicos (climatización, fontanería, electricidad, control de plagas y mantenimiento) sufren una desconexión continua entre la oficina y los técnicos en ruta.",
    problem:
      "Avisos perdidos en chats de WhatsApp, partes de trabajo rellenados a mano en papel, extravío de firmas de clientes y duplicidad de horas al pasar los datos manualmente a las facturas.",
    objective:
      "Diseñar y construir un ERP unificado donde cada aviso genera automáticamente la ruta del técnico, el parte digital con firma en pantalla y la factura sin repicar ningún dato.",
    responsibility: [
      "Concepción de producto y arquitectura del modelo de datos.",
      "Diseño de interfaz en Figma (versión móvil de campo y panel de oficina).",
      "Desarrollo frontend en React y TypeScript con almacenamiento local estructurado.",
      "Implementación de componente de firma táctil y generación de albaranes.",
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Canvas Signature", "Lucide"],
    featuresAvailable: [
      "Agenda dinámica de avisos por día y estado de visita.",
      "App móvil para operario con dirección y detalles del cliente.",
      "Firma manuscrita directa en pantalla táctil con sellado de parte.",
      "Cálculo de albaranes y facturación directa en navegador.",
    ],
    featuresInDev: [
      "Sincronización multi-dispositivo en la nube (backend en progreso).",
      "Módulo de trazabilidad y partes específicos para control de plagas y sanidad.",
    ],
    evidenceImages: [
      {
        src: "/oderalo-desktop.webp",
        caption: "Panel de control de oficina: agenda en vivo y facturación",
        device: "desktop",
      },
      {
        src: "/oderalo-mobile.webp",
        caption: "App de campo del técnico: parte firmado por el cliente",
        device: "mobile",
      },
    ],
    nextSteps:
      "Cierre del backend multi-tenant y lanzamiento de la fase beta para las primeras 100 empresas fundadoras.",
  },
  {
    id: "breadpdf",
    num: "02",
    title: "BreadPDF",
    category: "Utilidad Web & Procesamiento de Documentos",
    url: "https://breadpdf.com",
    urlLabel: "breadpdf.com",
    status: "En producción",
    statusColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    tagline: "Herramientas PDF que procesan directamente en el navegador del usuario.",
    context:
      "La mayoría de herramientas online para manipular PDF obligan al usuario a subir sus documentos confidenciales (nóminas, contratos, facturas) a servidores de terceros desconocidos.",
    problem:
      "Riesgos de privacidad, cuellos de botella de subida y dependencia de infraestructuras de backend de alto coste.",
    objective:
      "Construir una plataforma integral de utilidades PDF donde el procesamiento se ejecute 100% en el cliente (Client-Side), sin que los archivos salgan del dispositivo.",
    responsibility: [
      "Investigación y selección de motores de manipulación de PDF en el navegador.",
      "Arquitectura web multilingüe (Español, Català, English) con 210 URLs indexadas en Google.",
      "Desarrollo de catálogo de herramientas: compresión, unión, división y optimización de imágenes.",
      "Estrategia de SEO técnico y arquitectura programática de landing pages de utilidad.",
    ],
    techStack: ["React", "TypeScript", "Vite", "Web APIs en Cliente", "Tailwind CSS", "i18n"],
    featuresAvailable: [
      "69 herramientas de manipulación documental por idioma (ES / CA / EN).",
      "Procesamiento privado: cero transferencia de archivos a servidores externos.",
      "Indexación verificada en Google con sitemap dinámico de 210 páginas.",
      "Diseño adaptable optimizado para dispositivos móviles y escritorio.",
    ],
    featuresInDev: [
      "Módulo de compresión avanzada con WebAssembly.",
      "Herramienta de extracción de texto y OCR local.",
    ],
    evidenceImages: [
      {
        src: breadpdf.url,
        caption: "Interfaz real de BreadPDF: optimizador de imágenes y herramientas documentales",
        device: "desktop",
      },
    ],
    nextSteps:
      "Expansión de la biblioteca de utilidades locales e implementación de atajos de teclado para flujos de trabajo masivos.",
  },
  {
    id: "web-automation",
    num: "03",
    title: "Automatización & Plataformas Web",
    category: "Desarrollo a Medida & Captación Comercial",
    url: "https://gesgrama.com",
    urlLabel: "gesgrama.com / diversplas.es",
    status: "En producción",
    statusColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    tagline: "Webs corporativas y flujos de captación para empresas locales en Barcelona.",
    context:
      "Empresas consolidadas en sus respectivos sectores necesitaban modernizar su presencia digital para convertir visitas locales en clientes y solicitudes cualificadas.",
    problem:
      "Webs obsoletas sin adaptación móvil, formularios lentos que perdían prospectos y nula optimización para búsquedas orgánicas en su área de influencia geográfica.",
    objective:
      "Desarrollar plataformas web a medida de alta conversión, con arquitectura SEO local cuidada y conexión directa a canales ágiles (WhatsApp Business y CRM).",
    responsibility: [
      "Desarrollo web completo de Gesgrama (inmobiliaria y fincas en Santa Coloma).",
      "Desarrollo íntegro de la plataforma de Diversplas (extraescolares y casales para colegios y AFAs).",
      "Estructuración de datos Schema.org, metadatos y optimización de Core Web Vitals.",
      "Canalización de presupuestos directos hacia WhatsApp Business.",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "SEO On-Page", "Schema.org", "WhatsApp API"],
    featuresAvailable: [
      "Gesgrama: buscador de propiedades, valoración online y captación para comunidades.",
      "Diversplas: catálogo de actividades extraescolares y solicitud de presupuestos para colegios.",
      "Diseño responsivo validado en smartphones, tablets y pantallas de escritorio.",
      "Tiempos de carga inmediatos (< 1s en First Contentful Paint).",
    ],
    featuresInDev: [
      "Conectores de webhooks n8n para registrar presupuestos directamente en Google Sheets y ERP.",
    ],
    evidenceImages: [
      {
        src: gesgrama.url,
        caption: "Gesgrama: plataforma inmobiliaria y administración de fincas en producción",
        device: "desktop",
      },
      {
        src: diversplas.url,
        caption: "Diversplas: web para colegios y AFAs en Santa Coloma de Gramenet",
        device: "desktop",
      },
    ],
    nextSteps:
      "Implementación de automatización de seguimiento de presupuestos mediante agentes de mensajería.",
  },
  {
    id: "forma-app",
    num: "04",
    title: "FORMA / Gymvity",
    category: "Producto Digital Mobile-First",
    url: undefined,
    urlLabel: "Prototipo local",
    status: "Prototipo funcional",
    statusColor: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    tagline: "Seguimiento de entrenamiento y mapa anatómico muscular interactivo.",
    context:
      "La mayoría de aplicaciones de fitness saturan al usuario con menús complejos durante el entrenamiento o no muestran con claridad qué grupo muscular exacto se está estimulando en cada ejercicio.",
    problem:
      "Falta de claridad anatómica en tiempo real y lentitud para registrar series y descansos entre repeticiones en el gimnasio.",
    objective:
      "Construir un prototipo mobile-first que combine una biblioteca estructurada de ejercicios con un mapa anatómico interactivo y temporizador de series rápido.",
    responsibility: [
      "Definición del modelo de datos de ejercicios, músculos principales y secundarios.",
      "Desarrollo de la interfaz táctil orientada a uso con una sola mano en el gimnasio.",
      "Integración de gráficos anatómicos con resaltado por grupo muscular (pecho, femoral, cuádriceps).",
      "Desarrollo de temporizadores de descanso y selector interactivo de rutinas semanales.",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "SVG Anatomy", "Mobile UX"],
    featuresAvailable: [
      "Pantalla de sesión en vivo con cuenta atrás de descanso y número de serie.",
      "Ilustración técnica con indicación visual del músculo activo (Press banca, femoral, etc.).",
      "Plan semanal dividido por días y grupos musculares con selector táctil.",
      "Almacenamiento del historial de entrenamiento en el dispositivo.",
    ],
    featuresInDev: [
      "Cálculo automático de sobrecarga progresiva (RPE y volumen de carga acumulada).",
      "Exportación de datos de progreso a PDF / CSV.",
    ],
    evidenceImages: [
      {
        src: "/forma-dashboard.png",
        caption: "Vista de planificación semanal: selección de rutinas y grupos musculares",
        device: "mobile",
      },
      {
        src: "/forma-exercise.png",
        caption: "Entrenamiento en vivo: visualización anatómica, serie actual y temporizador",
        device: "mobile",
      },
    ],
    nextSteps:
      "Refinar la experiencia de onboarding para generar planes personalizados según días disponibles.",
  },
];

export function CaseStudiesV2() {
  const [activeTab, setActiveTab] = useState<string>("oderalo");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const current = CASE_STUDIES.find((c) => c.id === activeTab) ?? CASE_STUDIES[0]!;

  return (
    <section id="proyectos" className="bg-[#F6F5F0] py-16 sm:py-20 lg:py-24 border-b border-[#D4D4D0]">
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4D4D0] pb-6 mb-10">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              01 · Casos de Estudio Reales
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] mt-1">
              Proyectos construidos y en producción.
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm sm:text-base font-medium text-[#57575C]">
            Cada proyecto responde a una necesidad de negocio real. Sin plantillas genéricas ni números inflados.
          </p>
        </div>

        {/* Tab Selector (Swiss Editorial Row) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {CASE_STUDIES.map((c) => {
            const isActive = c.id === activeTab;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveTab(c.id);
                  setSelectedImageIndex(0);
                }}
                className={`flex flex-col items-start p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                  isActive
                    ? "border-[#111111] bg-white shadow-[4px_4px_0_#1D4ED8]"
                    : "border-[#D4D4D0] bg-[#EFEFE9] hover:bg-white hover:border-[#111111]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-[#57575C]">{c.num}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold border ${c.statusColor}`}
                  >
                    {c.status}
                  </span>
                </div>
                <span className="font-display text-base sm:text-lg font-bold text-[#111111] mt-2">
                  {c.title}
                </span>
                <span className="text-[11px] text-[#57575C] truncate w-full mt-0.5">
                  {c.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Dossier Card (Active Project) */}
        <div className="rounded-2xl border-2 border-[#111111] bg-white p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0_#111111]">
          {/* Top Title Bar of Case */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D4D4D0] pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#1D4ED8]">{current.num}</span>
                <span className="text-xs font-bold text-[#57575C] uppercase tracking-wider">
                  {current.category}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight mt-1">
                {current.title}
              </h3>
              <p className="mt-2 text-base sm:text-lg font-medium text-[#57575C] max-w-[65ch]">
                {current.tagline}
              </p>
            </div>

            {/* External URL if live */}
            {current.url ? (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#111111] bg-[#1D4ED8] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-[2px_2px_0_#111111] hover:bg-[#1E40AF] transition-all"
              >
                <span>Visitar {current.urlLabel}</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="rounded-xl border border-[#D4D4D0] bg-[#F6F5F0] px-3.5 py-1.5 text-xs font-mono font-bold text-[#57575C]">
                Prototipo funcional verificado
              </span>
            )}
          </div>

          {/* Two-Column Dossier Grid: Technical Details + Visual Proof */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column (6 cols): The Case Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              {/* Context & Problem */}
              <div className="rounded-xl border border-[#D4D4D0] bg-[#F6F5F0] p-4 sm:p-5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Contexto y Problema Detectado
                </h4>
                <p className="mt-2 text-sm text-[#57575C] leading-relaxed">
                  {current.context}
                </p>
                <div className="mt-3 pt-3 border-t border-[#D4D4D0]">
                  <p className="text-xs font-semibold text-[#111111] leading-relaxed">
                    <strong className="text-red-600">Punto de dolor:</strong> {current.problem}
                  </p>
                </div>
              </div>

              {/* Objective & My Responsibility */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Mi Responsabilidad y Trabajo Ejecutado
                </h4>
                <ul className="space-y-2">
                  {current.responsibility.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111111] font-medium">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white font-mono text-[10px] font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features: Implemented vs In Development */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <Check size={13} className="text-emerald-600" />
                    Disponible y probado
                  </span>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#111111]">
                    {current.featuresAvailable.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                    <Terminal size={13} className="text-amber-600" />
                    En hoja de ruta
                  </span>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#57575C]">
                    {current.featuresInDev.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#57575C] block mb-2">
                  Tecnologías utilizadas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[#D4D4D0] bg-[#EFEFE9] px-2.5 py-1 font-mono text-xs font-semibold text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (6 cols): Visual Evidence Showcase */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Evidencia Visual & Captura Real
                </span>
                {current.evidenceImages.length > 1 && (
                  <div className="flex gap-1.5">
                    {current.evidenceImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-colors ${
                          selectedImageIndex === idx
                            ? "bg-[#111111] text-white"
                            : "bg-[#EFEFE9] text-[#57575C] hover:text-[#111111]"
                        }`}
                      >
                        Vista {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Screen container */}
              <div className="relative overflow-hidden rounded-xl border-2 border-[#111111] bg-[#0E0E11] p-2 shadow-[4px_4px_0_#111111]">
                {/* Window top bar */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 px-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    {current.urlLabel || current.title}
                  </span>
                </div>

                {/* Screenshot image display */}
                <div className="overflow-hidden rounded-lg bg-zinc-950 flex items-center justify-center min-h-[280px] max-h-[460px]">
                  <img
                    src={current.evidenceImages[selectedImageIndex]?.src}
                    alt={current.evidenceImages[selectedImageIndex]?.caption}
                    className={`block select-none ${
                      current.evidenceImages[selectedImageIndex]?.device === "mobile"
                        ? "max-w-[240px] max-h-[440px] object-contain mx-auto py-2"
                        : "w-full max-h-[440px] object-cover object-top"
                    }`}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Screenshot caption */}
              <p className="text-xs text-center font-medium text-[#57575C]">
                {current.evidenceImages[selectedImageIndex]?.caption}
              </p>

              {/* Next Steps callout */}
              <div className="mt-2 rounded-xl border border-dashed border-[#D4D4D0] p-3 text-xs text-[#57575C]">
                <strong className="text-[#111111]">Próximo hito:</strong> {current.nextSteps}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
