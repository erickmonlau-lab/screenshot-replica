import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Briefcase,
  Check,
  Code2,
  Copy,
  Cpu,
  Download,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  ShoppingBag,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

import breadpdf from "@/assets/breadpdf.com.png.asset.json";
import diversplas from "@/assets/diversplas.es.png.asset.json";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";
import gesgrama from "@/assets/gesgrama.com.png.asset.json";

import { Navbar } from "@/components/Navbar";
import { StudioHero, type HeroProjectPreview } from "@/components/StudioHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ErpShowcase } from "@/components/ErpShowcase";
import {
  AgentFlow,
  CodeFlow,
  Counter,
  Magnetic,
  MemoryFlow,
  ModelCycle,
  Reveal,
  ScrollProgressRail,
  VelocityMarqueeRow,
} from "@/components/portfolio-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

const email = "hola.erickmartinezz@gmail.com";
const phoneDisplay = "+34 640 63 0459";
const whatsapp = "https://wa.me/34640630459";

interface ProjectCase extends HeroProjectPreview {
  type: string;
  outcome: string;
  stack: string[];
  description: string;
  ctaLabel: string;
}

const projectCases: ProjectCase[] = [
  {
    id: "diversplas",
    index: "01",
    name: "diversplas.es",
    domain: "diversplas.es",
    type: "Web a medida",
    status: "Top 1 en Google",
    outcome: "Top 1 en Google en búsquedas de extraescolares en Barcelona",
    stack: ["Web a medida", "SEO Técnico", "Recién lanzada"],
    href: "https://diversplas.es",
    image: diversplas.url,
    description:
      "Top 1 en Google en búsquedas de extraescolares en Barcelona con diversplas.es, web desarrollada íntegramente por mí y recién lanzada a producción.",
    ctaLabel: "Visitar web",
  },
  {
    id: "gesgrama",
    index: "02",
    name: "gesgrama.com",
    domain: "gesgrama.com",
    type: "Arquitectura Web",
    status: "Posicionándose",
    outcome: "Web a medida para empresa, recién lanzada y posicionándose en Google",
    stack: ["Arquitectura Web", "SEO On-Page", "En producción"],
    href: "https://gesgrama.com",
    image: gesgrama.url,
    description:
      "Web a medida para empresa, recién lanzada a producción y posicionándose en Google para captación orgánica de clientes.",
    ctaLabel: "Visitar web",
  },
  {
    id: "breadpdf",
    index: "03",
    name: "breadpdf.com",
    domain: "breadpdf.com",
    type: "React & TypeScript",
    status: "Indexada en Google",
    outcome: "Plataforma propia para trabajar con PDF ya indexada en Google con múltiples páginas",
    stack: ["React & TypeScript", "SEO Programático", "Producto propio"],
    href: "https://breadpdf.com",
    image: breadpdf.url,
    description:
      "Plataforma propia para trabajar con PDF directamente en el navegador, ya indexada en Google con múltiples páginas operativas.",
    ctaLabel: "Probar plataforma",
  },
  {
    id: "private-erp",
    index: "04",
    name: "ERP y app demo en persona",
    domain: "internal://demo-presencial",
    type: "Proyectos sin publicar",
    status: "Demo en vivo",
    outcome: "Dos proyectos sin publicar para mostrar en vivo",
    stack: ["ERP a medida", "App Operativa", "n8n Webhooks", "Demo Presencial"],
    href: "#contacto",
    description:
      "Dos proyectos completos sin publicar por confidencialidad (ERP interno y app operativa) listos para enseñarte en directo en una reunión.",
    ctaLabel: "Agendar demo presencial",
    isPrivate: true,
  },
];

const technicalTools = [
  { name: "React", label: "React", category: "Frontend", color: "#61DAFB", icon: Code2 },
  { name: "TypeScript", label: "TS", category: "Lenguaje", color: "#3178C6" },
  { name: "Next / Vite", label: "Vite", category: "Framework", color: "#646CFF" },
  { name: "Tailwind", label: "Tailwind", category: "Estilos", color: "#38BDF8", icon: Sparkles },
  { name: "n8n", label: "n8n", category: "Workflows", color: "#FF6D5A", icon: Workflow },
  { name: "Agentes IA", label: "Agentes", category: "IA", color: "#3B82F6", icon: Bot },
  { name: "Claude Skills", label: "Claude", category: "LLM", color: "#D97706", icon: BrainCircuit },
  { name: "Gemini", label: "Gemini", category: "LLM", color: "#8B5CF6", icon: Sparkles },
  { name: "ChatGPT", label: "ChatGPT", category: "LLM", color: "#10A37F", icon: Bot },
  { name: "Obsidian", label: "Obsidian", category: "Second Brain", color: "#7C3AED" },
  {
    name: "Shopify",
    label: "Shopify",
    category: "E-Commerce",
    color: "#96BF48",
    icon: ShoppingBag,
  },
  { name: "WordPress", label: "WordPress", category: "CMS", color: "#21759B", icon: Globe },
  { name: "Figma", label: "Figma", category: "UI/UX", color: "#F24E1E", icon: Layers },
  { name: "Canva", label: "Canva", category: "Visual", color: "#00C4CC", icon: Palette },
  { name: "APIs / Hooks", label: "APIs", category: "Integración", color: "#3B82F6", icon: Cpu },
  { name: "GitHub", label: "GitHub", category: "Git", color: "#A855F7", icon: FolderGit2 },
];

const capabilities = [
  {
    num: "01",
    tag: "DESARROLLO WEB & SISTEMAS",
    icon: Code2,
    title: "Plataformas Web y ERPs a Medida",
    description:
      "Construcción y despliegue de plataformas web de alto rendimiento, portales corporativos y sistemas ERP internos para empresas con código tipado, SEO técnico y arquitecturas modernas.",
    skills: [
      "React & TypeScript",
      "Next.js & Vite",
      "ERP Operativo Interno",
      "APIs & Webhooks",
      "Bases de Datos & SQL",
      "SEO Técnico (Top 1)",
      "Core Web Vitals",
      "Despliegue Producción",
    ],
  },
  {
    num: "02",
    tag: "AUTOMATIZACIÓN IA & NEGOCIO",
    icon: Workflow,
    title: "Flujos Autónomos con n8n e IA",
    description:
      "Automatización de procesos operativos, conexión entre herramientas (CRMs, formularios, WhatsApp), enrutamiento inteligente de modelos LLM y gestión de contexto empresarial.",
    skills: [
      "Flujos n8n Autónomos",
      "Agentes de IA Conectados",
      "Claude con Skills Propios",
      "Second Brain en Obsidian",
      "Shopify & WordPress",
      "Atención WhatsApp Business",
      "Acreditación Oficial 375 h",
      "Subvenciones Salariales",
    ],
  },
];

const aiPhases = [
  {
    id: "automation",
    num: "01",
    kicker: "Agentes autónomos y n8n",
    title: "Agentes autónomos y n8n",
    description:
      "Flujos y agentes que planifican y ejecutan tareas solos conectados con webhooks, formularios, stock y facturación.",
    tags: ["n8n", "Agentes IA", "Webhooks"],
  },
  {
    id: "models",
    num: "02",
    kicker: "Varios modelos de IA",
    title: "Varios modelos de IA",
    description:
      "Claude (con Skills), Gemini, ChatGPT y Perplexity elegidos según la tarea: arquitectura, contexto amplio, síntesis o verificación.",
    tags: ["Claude Skills", "Gemini", "ChatGPT", "Perplexity"],
  },
  {
    id: "code",
    num: "03",
    kicker: "Apps con código",
    title: "Apps con código",
    description:
      "Desarrollo con agentes en el IDE (React y TypeScript) y prototipos rápidos de interfaz en AI Studio y Stitch hasta producción.",
    tags: ["React & TS", "AI Studio", "Stitch"],
  },
  {
    id: "memory",
    num: "04",
    kicker: "Cerebro IA (Second Brain)",
    title: "Cerebro IA (Second Brain)",
    description:
      "Base estructurada en Obsidian y Markdown que da memoria, contexto técnico y reglas consistentes a la IA entre sesiones.",
    tags: ["Obsidian", "Markdown", "Reglas"],
  },
] as const;

const experience = [
  {
    period: "2025 — 2026 · 516 h",
    role: "Prácticas en Marketing y Gestión Comercial",
    place: "Diset Control de Plagas",
    points: [
      "Gestión integral de e-commerce en Shopify y WordPress.",
      "Atención comercial digital y cierre de ventas por WhatsApp Business.",
      "Diseño visual y prototipado de piezas y pantallas en Figma y Canva.",
    ],
  },
  {
    period: "2023 — 2024 · 416 h",
    role: "Prácticas de Gestión Administrativa y Logística",
    place: "Ferretería FIMSA",
    points: [
      "Control administrativo diario: facturación, albaranes y contabilidad.",
      "Gestión y control de inventarios físicos y digitales.",
      "Coordinación operativa continua con proveedores y clientes.",
    ],
  },
  {
    period: "2023 — 2025",
    role: "Monitor de Fútbol Base",
    place: "Escuela Wagner, Barcelona",
    points: [
      "Planificación semanal de entrenamientos y objetivos de equipo.",
      "Liderazgo y gestión dinámica de grupos.",
      "Comunicación cercana y seguimiento continuo con las familias.",
    ],
  },
];

const education = [
  {
    period: "Ciclo Superior",
    title: "CFGS en Marketing y Publicidad",
    place: "Monlau, Barcelona",
    summary:
      "Estrategia digital, posicionamiento SEO, conversión comercial, diseño de propuestas y lanzamiento de producto.",
  },
  {
    period: "Ciclo Medio",
    title: "CFGM en Gestión Administrativa",
    place: "Monlau, Barcelona",
    summary:
      "Facturación, albaranes, contabilidad y operativa interna de empresa — base práctica para construir ERPs útiles.",
  },
  {
    period: "Acreditación Oficial",
    title: "Agente del Cambio Tecnológico (375 h)",
    place: "Generalitat de Catalunya",
    summary:
      "Especialización oficial en transformación digital, automatización de procesos e IA aplicada que permite a la empresa contratante acceder a subvenciones salariales directas.",
  },
];

const coreStackPills = [
  "React",
  "TypeScript",
  "Next.js / Vite",
  "Tailwind CSS",
  "n8n Workflows",
  "Agentes IA",
  "Claude Skills",
  "Gemini",
  "ChatGPT",
  "Obsidian",
  "Shopify",
  "WordPress",
  "Figma",
  "Canva",
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked in restricted browser contexts
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copiar ${label}`}
      aria-label={`Copiar ${label}`}
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition-all active:scale-95 ${
        copied
          ? "bg-[#10B981] text-white"
          : "t-line t-bg-card2 t-ink border hover:border-[#0044FF] hover:text-[#0044FF]"
      }`}
    >
      {copied ? (
        <>
          <Check size={13} strokeWidth={2.5} />
          <span>Copiado</span>
        </>
      ) : (
        <>
          <Copy size={13} />
          <span>Copiar</span>
        </>
      )}
    </button>
  );
}

const marqueeText =
  "ERICK RODRÍGUEZ · DESARROLLADOR WEB & AUTOMATIZACIÓN IA · BARCELONA · DISPONIBLE PARA CONTRATACIÓN · TOP 1 GOOGLE DIVERSPLAS.ES · 375 H AGENTE DEL CAMBIO · ";

function Index() {
  const [heroMode, setHeroMode] = useState<"studio" | "preview">("studio");
  const [activeProjectId, setActiveProjectId] = useState<string>("diversplas");
  const [activeAiPhase, setActiveAiPhase] = useState<string>("automation");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showLiveSystem, setShowLiveSystem] = useState<boolean>(true);

  const selectedAiPhase = aiPhases.find((p) => p.id === activeAiPhase) ?? aiPhases[0]!;

  function handleJumpToProjects(caseId?: string) {
    if (caseId) setActiveProjectId(caseId);
    const section = document.getElementById("proyectos");
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 62;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  const sectionBase = "t-bg-page t-ink t-line scroll-mt-[62px] border-t py-8 sm:py-12 2xl:py-16";

  return (
    <div className="t-bg-page t-ink min-h-screen">
      <ScrollProgressRail />
      <Navbar mode={heroMode} onChangeMode={setHeroMode} />

      <main>
        <StudioHero
          mode={heroMode}
          activeCaseId={activeProjectId}
          projects={projectCases}
          onChangeMode={setHeroMode}
          onSelectProject={setActiveProjectId}
          onJumpToProjects={handleJumpToProjects}
        />

        {/* Marquee band */}
        <div
          className="t-bg-ink t-on-ink relative z-20 overflow-hidden py-3 leading-none"
          aria-hidden="true"
        >
          <VelocityMarqueeRow
            baseVelocity={-2.2}
            className="font-display text-xs leading-none font-bold tracking-[0.16em] sm:text-sm"
          >
            {marqueeText}
          </VelocityMarqueeRow>
        </div>

        {/* PROYECTOS — 3D Coverflow Gallery */}
        <section id="proyectos" className={`${sectionBase} section-dark`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-5 2xl:mb-8">
              <SectionHeading
                eyebrow="Proyectos seleccionados"
                title="Galería de Proyectos."
                accentTitle="Producción y Directo."
                description="Webs reales con métricas de tráfico, plataformas SaaS propias y desarrollos empresariales listos para mostrar en persona."
                rightSlot={
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-ink font-mono inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase hover:text-[#0044FF] sm:text-sm"
                  >
                    <span>Ver más proyectos</span>
                    <ArrowUpRight size={14} />
                  </a>
                }
              />
            </Reveal>
            <ProjectCarousel
              slides={projectCases}
              activeId={activeProjectId}
              onChange={setActiveProjectId}
              privateSlide={<ErpShowcase />}
            />
          </div>
        </section>

        {/* CAPACIDADES & TRABAJO CON IA — What I Can Do */}
        <section id="ia" className={`${sectionBase} section-light`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-5 2xl:mb-8">
              <SectionHeading
                eyebrow="Capacidades técnicas"
                title="Lo Que Puedo Hacer"
                accentTitle=""
                description="Combino desarrollo web de vanguardia, automatización con IA y mentalidad operativa para crear sistemas fiables, eficientes y orientados al negocio."
              />
            </Reveal>

            {/* Split Grid: Tools Dock on Left, Numbered Capabilities on Right */}
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Tool Dock Grid (4x4) */}
              <div className="lg:col-span-5">
                <div className="mb-3.5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#0044FF] uppercase sm:text-[13px]">
                    Stack &amp; Herramientas Activas
                  </span>
                  <span className="t-muted font-mono text-xs sm:text-[13px]">16 tecnologías</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {technicalTools.map((t) => {
                    const Icon = t.icon;
                    const isSelected = selectedTool === t.name;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setSelectedTool(isSelected ? null : t.name)}
                        className={`t-line t-bg-card flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all sm:p-3 ${
                          isSelected
                            ? "border-[#0044FF] ring-2 ring-[#0044FF]/30 scale-105"
                            : "hover:border-[#0044FF] hover:scale-105"
                        }`}
                        title={`${t.name} · ${t.category}`}
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#09090B] text-white shadow-sm sm:h-10 sm:w-10"
                          style={{ borderBottom: `2px solid ${t.color}` }}
                        >
                          {Icon ? (
                            <Icon size={18} style={{ color: t.color }} />
                          ) : (
                            <span
                              className="font-mono text-xs font-black"
                              style={{ color: t.color }}
                            >
                              {t.label}
                            </span>
                          )}
                        </div>
                        <span className="t-ink font-display mt-1.5 block truncate text-xs font-bold sm:text-[13px]">
                          {t.name}
                        </span>
                        <span className="t-muted block w-full truncate text-xs">{t.category}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="t-muted mt-3.5 text-sm leading-relaxed sm:text-[15px]">
                  Herramientas que utilizo a diario en producción: desde frameworks modernos y
                  modelos de lenguaje hasta pipelines de datos y plataformas de automatización.
                </p>
              </div>

              {/* Right Column: Numbered Capability Cards 01 & 02 */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
                {capabilities.map((cap) => {
                  const CapIcon = cap.icon;
                  return (
                    <div
                      key={cap.num}
                      className="t-line t-bg-card flex flex-col justify-between rounded-3xl border p-5 sm:p-6 shadow-sm"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="t-ink font-display text-4xl font-black tracking-tighter 2xl:text-5xl">
                            {cap.num}
                          </span>
                          <span className="t-muted text-right font-mono text-xs font-bold tracking-[0.14em] uppercase sm:text-[13px]">
                            {cap.tag}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                            <CapIcon size={18} strokeWidth={2.3} />
                          </div>
                          <h3 className="t-ink font-display text-base font-extrabold tracking-tight sm:text-lg">
                            {cap.title}
                          </h3>
                        </div>

                        <p className="t-muted mt-3 text-sm leading-relaxed sm:text-[15px]">
                          {cap.description}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-current/10 pt-4">
                        <span className="t-muted mb-2.5 block font-mono text-xs font-bold tracking-widest uppercase sm:text-[13px]">
                          Capacidades clave
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cap.skills.map((skill) => (
                            <span
                              key={skill}
                              className="t-line t-bg-card2 t-ink rounded-lg border px-2.5 py-1 text-xs font-semibold sm:text-[13px]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Interactive Systems Demonstration */}
            <div className="mt-8 border-t border-current/10 pt-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#0044FF] uppercase sm:text-[13px]">
                    Demostración interactiva en directo
                  </span>
                  <h4 className="t-ink font-display text-lg font-extrabold tracking-tight sm:text-xl">
                    Sistemas IA y Automatización Operativa
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiPhases.map((phase) => {
                    const active = phase.id === selectedAiPhase.id;
                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => setActiveAiPhase(phase.id)}
                        className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-colors sm:text-[13px] ${
                          active
                            ? "bg-[#0044FF] text-white"
                            : "t-line t-bg-card t-ink border hover:border-[#0044FF]"
                        }`}
                      >
                        {phase.num} · {phase.kicker}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="macos-window-frame overflow-hidden rounded-[22px] p-4 text-white sm:p-5">
                <div className="mb-3 flex items-center justify-between border-b border-[#303240] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-mono text-xs font-bold tracking-wider text-[#60A5FA] uppercase sm:text-sm">
                      FASE {selectedAiPhase.num} / 04 · {selectedAiPhase.title}
                    </span>
                  </div>
                  <span className="hidden text-xs text-zinc-400 sm:inline sm:text-[13px]">
                    Simulación activa en tiempo real
                  </span>
                </div>

                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedAiPhase.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="flex min-h-[180px] items-center"
                    >
                      {selectedAiPhase.id === "automation" && <AgentFlow />}
                      {selectedAiPhase.id === "models" && <ModelCycle />}
                      {selectedAiPhase.id === "code" && <CodeFlow />}
                      {selectedAiPhase.id === "memory" && <MemoryFlow />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* 375h Acreditación Banner */}
            <div
              id="acreditacion-375h"
              className="mt-6 flex flex-col justify-between gap-4 rounded-2xl bg-[#0044FF] p-5 text-white sm:p-6 lg:flex-row lg:items-center"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold tracking-[0.12em] text-[#0044FF] uppercase sm:text-[13px]">
                  Subvenciones salariales directas para empresa
                </span>
                <h3 className="font-display mt-1.5 text-base font-extrabold tracking-[-0.02em] sm:text-lg lg:text-xl">
                  Acreditación oficial de 375 h como Agente del Cambio Tecnológico
                </h3>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-blue-50 sm:text-base">
                  Cuento con 375 horas de acreditación oficial por la Generalitat. La empresa que me
                  contrate accede directamente a subvenciones salariales bonificadas para
                  digitalización y proyectos de inteligencia artificial.
                </p>
              </div>
              <Magnetic strength={0.12} className="shrink-0">
                <a
                  href="#contacto"
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-extrabold tracking-wider text-[#09090B] uppercase transition-colors hover:bg-[#09090B] hover:text-white sm:text-sm"
                >
                  <span>Consultar contratación</span>
                  <ArrowUpRight size={14} />
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* TRAYECTORIA — Sobre Mí / About Me */}
        <section id="trayectoria" className={`${sectionBase} section-dark`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-5 2xl:mb-8">
              <SectionHeading
                eyebrow="Sobre mí · Trayectoria"
                title="Problem Solver."
                accentTitle="Perfil híbrido."
                description="Código, negocio y ejecución: desarrollo web, automatización IA, marketing digital y gestión con más de 1.000 h reales en Barcelona."
              />
            </Reveal>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Profile Card / Bio Column */}
              <Reveal className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <img
                    src="/erick-portrait-studio.png"
                    alt="Erick Rodríguez"
                    loading="lazy"
                    className="t-line h-20 w-20 shrink-0 rounded-full border-2 bg-[#0044FF] object-cover object-top sm:h-24 sm:w-24"
                  />
                  <div>
                    <h3 className="t-ink font-display flex items-center gap-2 text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                      Erick Rodríguez
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0044FF] text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    </h3>
                    <p className="t-muted text-xs font-medium sm:text-sm">
                      Web, Automatización IA &amp; Negocio · La Sagrera, Barcelona
                    </p>
                  </div>
                </div>

                <div className="t-line mt-5 grid grid-cols-3 gap-3 border-y py-4">
                  {[
                    ["+1.000 h", "Experiencia"],
                    ["375 h", "Acreditación"],
                    ["Top 1", "Google SEO"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <span className="t-muted block font-mono text-xs font-bold tracking-[0.2em] uppercase sm:text-[13px]">
                        {l}
                      </span>
                      <span className="t-ink font-display mt-1 block text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="t-muted mt-4 text-sm leading-relaxed sm:text-base">
                  Combino desarrollo web e IA con base sólida en marketing digital y gestión
                  administrativa: construyo la solución completa y la llevo a producción sin
                  depender de intermediarios. Español y catalán nativos, inglés B2.
                </p>

                <div className="mt-4">
                  <span className="t-muted block font-mono text-xs font-bold tracking-[0.2em] uppercase sm:text-[13px]">
                    Actualmente
                  </span>
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {[
                      [Wrench, "Construyendo", "Webs y ERPs a medida"],
                      [Sparkles, "Explorando", "Agentes IA y n8n"],
                      [GraduationCap, "Aprendiendo", "Second Brain en Obsidian"],
                    ].map(([Icon, k, v]) => {
                      const I = Icon as typeof Wrench;
                      return (
                        <div key={k as string} className="flex items-start gap-1.5">
                          <I size={15} className="mt-0.5 shrink-0 text-[#0044FF]" />
                          <div>
                            <span className="t-ink block text-xs font-bold sm:text-sm">
                              {k as string}
                            </span>
                            <span className="t-muted block text-xs leading-snug sm:text-[13px]">
                              {v as string}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {coreStackPills.map((tool) => (
                    <span
                      key={tool}
                      className="t-line t-bg-card t-ink rounded-md border px-2.5 py-1 text-xs font-semibold sm:text-[13px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <a
                  href={cvPdf.url}
                  download="Erick-Rodriguez-CV.pdf"
                  className="t-ink mt-5 inline-flex items-center gap-2 border-b-2 border-current pb-0.5 font-mono text-xs font-bold tracking-[0.16em] uppercase hover:text-[#0044FF] sm:text-sm"
                >
                  <span>Descargar CV completo en PDF</span>
                  <Download size={14} />
                </a>
              </Reveal>

              {/* 2-Column Ledger: 01 Experiencia & 02 Formación */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
                {[
                  {
                    label: "01 · Experiencia",
                    icon: Briefcase,
                    rows: experience.map((e) => ({
                      key: `${e.place}-${e.period}`,
                      title: e.role,
                      org: e.place,
                      date: e.period,
                      body: e.points,
                    })),
                  },
                  {
                    label: "02 · Formación oficial",
                    icon: GraduationCap,
                    rows: education.map((e) => ({
                      key: e.title,
                      title: e.title,
                      org: e.place,
                      date: e.period,
                      body: [e.summary],
                    })),
                  },
                ].map((col, ci) => (
                  <div key={col.label}>
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#0044FF] uppercase sm:text-sm">
                      {col.label}
                    </span>
                    <div className="mt-2.5 flex flex-col">
                      {col.rows.map((row, ri) => (
                        <Reveal
                          key={row.key}
                          delay={ci * 0.05 + ri * 0.08}
                          className="t-line border-t py-3.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="t-ink font-display text-sm leading-tight font-extrabold tracking-[-0.02em] sm:text-base">
                              {row.title}
                            </h4>
                            <span className="t-muted shrink-0 font-mono text-xs font-bold tracking-wider uppercase sm:text-[13px]">
                              {row.date}
                            </span>
                          </div>
                          <p className="t-accent mt-0.5 text-xs font-bold sm:text-sm">{row.org}</p>
                          <ul className="t-muted mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed sm:text-sm">
                            {row.body.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className={`${sectionBase} section-light`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-6">
                <p className="t-muted mb-3 font-mono text-xs font-bold tracking-[0.26em] uppercase sm:text-sm">
                  Hablemos · Disponible en Barcelona
                </p>
                <h2 className="t-ink font-display text-[44px] leading-[0.92] font-black tracking-[-0.04em] uppercase sm:text-6xl lg:text-[68px] 2xl:text-[88px]">
                  HABLEMOS
                  <br />
                  DE TU
                  <br />
                  <span className="t-accent">PROYECTO.</span>
                  <span
                    className="animate-cursor-blink ml-2 inline-block h-[0.75em] w-[4px] bg-[#0044FF] align-baseline"
                    aria-hidden="true"
                  />
                </h2>
                <p className="t-muted mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
                  Busco aportar mi perfil híbrido de desarrollo web, IA y negocio — o enseñarte en
                  persona la demo del ERP y los sistemas en producción.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={cvPdf.url}
                    download="Erick-Rodriguez-CV.pdf"
                    className="t-bg-ink t-on-ink inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold tracking-[0.12em] uppercase transition-transform hover:scale-[1.03] sm:text-sm"
                  >
                    <span>Descargar CV (PDF)</span>
                    <Download size={14} />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="flex flex-col gap-3 lg:col-span-6">
                <div className="t-line t-bg-card flex items-center justify-between gap-3 rounded-2xl border p-4 sm:p-5">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="t-muted block font-mono text-xs font-bold tracking-[0.16em] uppercase sm:text-[13px]">
                        01 · Email directo
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="t-ink font-display mt-0.5 block truncate text-sm font-bold sm:text-base"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <CopyButton value={email} label="correo" />
                </div>

                <div className="t-line t-bg-card flex items-center justify-between gap-3 rounded-2xl border p-4 sm:p-5">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                      <MessageCircle size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="t-muted block font-mono text-xs font-bold tracking-[0.16em] uppercase sm:text-[13px]">
                        02 · WhatsApp &amp; Teléfono
                      </span>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-ink font-display mt-0.5 block text-sm font-bold tabular-nums sm:text-base"
                      >
                        {phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <CopyButton value={phoneDisplay} label="teléfono" />
                </div>

                <div className="t-line t-bg-card flex items-center gap-3.5 rounded-2xl border p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="t-muted block font-mono text-xs font-bold tracking-[0.16em] uppercase sm:text-[13px]">
                      03 · Ubicación y modalidad
                    </span>
                    <span className="t-ink font-display mt-0.5 block text-sm font-bold sm:text-base">
                      La Sagrera, Barcelona · Presencial o Remoto
                    </span>
                  </div>
                </div>

                <Magnetic strength={0.1} className="mt-1">
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-ink font-display flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-current px-6 py-3.5 text-xs font-extrabold tracking-[0.14em] uppercase transition-colors hover:border-[#0044FF] hover:bg-[#0044FF] hover:text-white sm:text-sm"
                  >
                    <MessageCircle size={18} strokeWidth={2.3} />
                    <span>Escribir por WhatsApp ahora</span>
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </a>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Footer en contraste sólido oscuro */}
        <footer className="section-dark t-line t-muted border-t py-6 text-xs font-medium sm:text-sm">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
            <span>© 2026 Erick Rodríguez · Portfolio</span>
            <span>Desarrollo Web · ERPs a Medida · Automatización IA</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
