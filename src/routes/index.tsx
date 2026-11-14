import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";

import breadpdf from "@/assets/breadpdf.com.png.asset.json";
import diversplas from "@/assets/diversplas.es.png.asset.json";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";
import gesgrama from "@/assets/gesgrama.com.png.asset.json";

import { Navbar } from "@/components/Navbar";
import { StudioHero, type HeroProjectPreview } from "@/components/StudioHero";
import { ErpShowcase } from "@/components/ErpShowcase";
import { ScribbleUnderline } from "@/components/DrawnMarks";
import {
  AgentFlow,
  CodeFlow,
  Counter,
  ExperienceTimeline,
  Magnetic,
  MaskedText,
  MemoryFlow,
  ModelCycle,
  Reveal,
  ScrollProgressRail,
  TiltStage,
  TimelineDot,
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
    domain: "https://diversplas.es",
    type: "Web corporativa + SEO",
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
    domain: "https://gesgrama.com",
    type: "Web a medida",
    status: "Posicionándose",
    outcome: "Web a medida para empresa, recién lanzada y posicionándose en Google",
    stack: ["Arquitectura Web", "SEO On-Page", "En producción"],
    href: "https://gesgrama.com",
    image: gesgrama.url,
    description:
      "Web a medida para empresa, recién lanzada y posicionándose en Google con estructura orientada a captación directa de clientes.",
    ctaLabel: "Visitar web",
  },
  {
    id: "breadpdf",
    index: "03",
    name: "breadpdf.com",
    domain: "https://breadpdf.com",
    type: "Plataforma propia",
    status: "Indexada en Google",
    outcome: "Plataforma propia para trabajar con PDF, ya indexada en Google con múltiples páginas",
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
  "n8n",
  "SEO",
  "Shopify",
  "WordPress",
  "Figma",
  "Canva",
  "Obsidian",
  "Markdown",
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
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-extrabold transition-all active:scale-95 ${
        copied
          ? "bg-[#0044FF] text-white"
          : "bg-[#F4F7FF] text-[#0A0F1D] hover:bg-[#0044FF] hover:text-white"
      }`}
    >
      {copied ? (
        <>
          <Check size={13} strokeWidth={2.5} />
          <span>Copiado</span>
        </>
      ) : (
        <Copy size={13} />
      )}
    </button>
  );
}

const marqueeText =
  "DESARROLLO WEB & ERPS A MEDIDA  •  TOP 1 GOOGLE EXTRAESCOLARES BARCELONA  •  AUTOMATIZACIÓN CON IA & N8N  •  AGENTE DEL CAMBIO TECNOLÓGICO (375 H)  •  BARCELONA  •  ";

function Index() {
  const [heroMode, setHeroMode] = useState<"studio" | "preview">("studio");
  const [activeProjectId, setActiveProjectId] = useState<string>(projectCases[0]!.id);
  const [activeAiPhase, setActiveAiPhase] = useState<string>(aiPhases[0].id);
  const aiStepRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selectedProject = (projectCases.find((p) => p.id === activeProjectId) ?? projectCases[0])!;
  const selectedAiPhase = aiPhases.find((p) => p.id === activeAiPhase) ?? aiPhases[0];

  /* IntersectionObserver syncing the 4 left AI blocks with the right "Sistema en Vivo" card */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-phase-id");
            if (id) setActiveAiPhase(id);
          }
        }
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0.25 },
    );

    Object.values(aiStepRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function handleJumpToProjects(caseId?: string) {
    if (caseId) {
      setActiveProjectId(caseId);
    }
    const section = document.getElementById("proyectos");
    if (section) {
      const navOffset = 96;
      const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0F1D]">
      <ScrollProgressRail />
      <Navbar mode={heroMode} onChangeMode={setHeroMode} />

      <main>
        {/* =====================================================================
            1. HERO EDITORIAL (BOLD OVERSIZED + SINGLE COBALT ACCENT + PILL CTAS)
            ===================================================================== */}
        <StudioHero
          mode={heroMode}
          activeCaseId={activeProjectId}
          projects={projectCases}
          onChangeMode={setHeroMode}
          onSelectProject={setActiveProjectId}
          onJumpToProjects={handleJumpToProjects}
        />

        {/* =====================================================================
            2. CINTA HORIZONTAL ÚNICA CONTINUA
            ===================================================================== */}
        <div
          className="relative z-20 overflow-hidden border-y border-white/10 bg-[#0A0F1D] py-4 leading-none"
          aria-hidden="true"
        >
          <VelocityMarqueeRow
            baseVelocity={-2.2}
            className="font-display text-xs font-extrabold leading-none tracking-[0.14em] text-white sm:text-sm"
          >
            {marqueeText}
          </VelocityMarqueeRow>
        </div>

        {/* =====================================================================
            3. FILA DE STAT-CARDS CON ICONO EN CUADRO REDONDEADO AZUL (GESGRAMA STYLE)
            ===================================================================== */}
        <section
          id="metricas"
          className="scroll-mt-28 bg-white py-16 sm:py-24"
          aria-label="Resultados clave"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {/* Stat Card 1 */}
              <Reveal className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F4F7FF] p-7 shadow-[0_14px_36px_-12px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0044FF] text-white shadow-[0_8px_20px_-4px_rgba(0,68,255,0.45)]">
                    <Clock size={26} strokeWidth={2.3} />
                  </div>
                  <span className="rounded-full border border-[#0044FF]/20 bg-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0044FF]">
                    Experiencia real
                  </span>
                </div>
                <div className="mt-7">
                  <strong className="font-display block text-5xl font-black tracking-[-0.04em] text-[#0A0F1D] tabular-nums sm:text-6xl">
                    <Counter to={1000} prefix="+" />{" "}
                    <span className="text-3xl font-extrabold text-[#0044FF]">h</span>
                  </strong>
                  <p className="mt-3 text-base font-medium leading-relaxed text-[#475569]">
                    De experiencia acumulada entre prácticas en empresa, producto propio y
                    desarrollo web en producción.
                  </p>
                </div>
              </Reveal>

              {/* Stat Card 2 */}
              <Reveal
                delay={0.08}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F4F7FF] p-7 shadow-[0_14px_36px_-12px_rgba(15,23,42,0.06)] sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0044FF] text-white shadow-[0_8px_20px_-4px_rgba(0,68,255,0.45)]">
                    <TrendingUp size={26} strokeWidth={2.3} />
                  </div>
                  <span className="rounded-full border border-[#0044FF]/20 bg-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0044FF]">
                    SEO en vivo
                  </span>
                </div>
                <div className="mt-7">
                  <strong className="font-display inline-flex items-baseline gap-2 text-5xl font-black tracking-[-0.04em] text-[#0A0F1D] tabular-nums sm:text-6xl">
                    <span>Top</span>
                    <span className="text-[#0044FF]">
                      <Counter to={1} />
                    </span>
                  </strong>
                  <p className="mt-3 text-base font-medium leading-relaxed text-[#475569]">
                    En Google en búsquedas de extraescolares en Barcelona con{" "}
                    <strong className="font-bold text-[#0A0F1D]">diversplas.es</strong>, web
                    desarrollada por mí y recién lanzada.
                  </p>
                </div>
              </Reveal>

              {/* Stat Card 3 */}
              <Reveal
                delay={0.16}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-[#F4F7FF] p-7 shadow-[0_14px_36px_-12px_rgba(15,23,42,0.06)] sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0044FF] text-white shadow-[0_8px_20px_-4px_rgba(0,68,255,0.45)]">
                    <Award size={26} strokeWidth={2.3} />
                  </div>
                  <span className="rounded-full border border-[#0044FF]/20 bg-white px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0044FF]">
                    Subvención empresa
                  </span>
                </div>
                <div className="mt-7">
                  <strong className="font-display block text-5xl font-black tracking-[-0.04em] text-[#0A0F1D] tabular-nums sm:text-6xl">
                    <Counter to={375} />{" "}
                    <span className="text-3xl font-extrabold text-[#0044FF]">h</span>
                  </strong>
                  <p className="mt-3 text-base font-medium leading-relaxed text-[#475569]">
                    De acreditación oficial como Agente del Cambio Tecnológico: la empresa que me
                    contrate accede a subvenciones salariales directas.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. PROYECTOS (#proyectos) — CARDS CON AIRE Y SISTEMA DE BADGES UNIFICADO
            ===================================================================== */}
        <section
          id="proyectos"
          className="scroll-mt-28 border-y border-slate-200/80 bg-[#F4F7FF] py-24 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0044FF]/20 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0044FF]">
                  <span className="h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
                  Proyectos seleccionados
                </span>
                <MaskedText delay={0.05}>
                  <h2 className="mt-4 font-display text-4xl font-black leading-[1.03] tracking-[-0.035em] text-[#0A0F1D] sm:text-5xl lg:text-6xl">
                    Webs en producción.
                    <br />
                    <span className="relative inline-block pb-2 text-[#0044FF]">
                      Y dos proyectos en directo.
                      <ScribbleUnderline className="absolute -bottom-1 left-0 h-3 w-full text-[#0044FF]" />
                    </span>
                  </h2>
                </MaskedText>
              </div>
              <p className="max-w-md text-base font-medium leading-relaxed text-[#475569]">
                Selecciona cada proyecto para previsualizar el resultado en el visor interactivo o
                explorar el esquema operativo de la demo presencial.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Interactive Cards Stack (More Air + Consistent Pill Badges) */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                {projectCases.map((project) => {
                  const isActive = project.id === selectedProject.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveProjectId(project.id)}
                      onMouseEnter={() => setActiveProjectId(project.id)}
                      onFocus={() => setActiveProjectId(project.id)}
                      className={`group relative flex w-full flex-col gap-3 rounded-3xl border p-6 text-left transition-all ${
                        isActive
                          ? "border-[#0044FF] bg-white shadow-[0_18px_42px_-12px_rgba(0,68,255,0.18)] ring-2 ring-[#0044FF]/15"
                          : "border-slate-200/90 bg-white/75 hover:border-[#0044FF]/40 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-xs font-extrabold transition-colors ${
                              isActive ? "bg-[#0044FF] text-white" : "bg-[#F4F7FF] text-[#0044FF]"
                            }`}
                          >
                            {project.index}
                          </span>
                          <span className="font-display text-xl font-black tracking-[-0.02em] text-[#0A0F1D] sm:text-2xl">
                            {project.name}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-extrabold tracking-wide transition-colors ${
                            isActive
                              ? "bg-[#0044FF] text-white"
                              : "border border-[#0044FF]/20 bg-[#F4F7FF] text-[#0044FF]"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <p className="text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                        {project.outcome}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.stack.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#F4F7FF] px-3 py-1 text-[11px] font-bold text-[#475569]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Fluid Crossfade Browser Frame Stage */}
              <div className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
                <TiltStage>
                  <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-3 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] sm:p-4">
                    {/* Browser Header Bar */}
                    <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-[#F4F7FF] px-4 py-3">
                      <div className="flex items-center gap-2" aria-hidden="true">
                        <span className="h-3 w-3 rounded-full bg-[#0044FF]" />
                        <span className="h-3 w-3 rounded-full bg-[#0044FF]/40" />
                        <span className="h-3 w-3 rounded-full bg-[#0A0F1D]/20" />
                      </div>
                      <span className="truncate rounded-full border border-slate-200/90 bg-white px-4 py-1 text-xs font-bold text-[#0A0F1D]">
                        {selectedProject.domain}
                      </span>
                      <a
                        href={selectedProject.href}
                        {...(selectedProject.isPrivate
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0044FF] px-4 py-1.5 text-xs font-extrabold text-white transition-colors hover:bg-[#0A0F1D]"
                      >
                        <span>{selectedProject.ctaLabel}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    {/* Preview Viewport */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200/80">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedProject.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {selectedProject.isPrivate ? (
                            <ErpShowcase />
                          ) : (
                            <a
                              href={selectedProject.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block overflow-hidden bg-slate-100"
                            >
                              <img
                                src={selectedProject.image}
                                alt={`Captura real de ${selectedProject.name}`}
                                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              />
                            </a>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Bottom Project Summary & Pill CTA */}
                    <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl bg-[#F4F7FF] p-5 sm:flex-row sm:items-center sm:p-6">
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {selectedProject.stack.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#0044FF]/20 bg-white px-3 py-1 text-xs font-extrabold text-[#0044FF]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="max-w-xl text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                          {selectedProject.description}
                        </p>
                      </div>
                      <Magnetic className="shrink-0" strength={0.12}>
                        <a
                          href={selectedProject.href}
                          {...(selectedProject.isPrivate
                            ? {}
                            : { target: "_blank", rel: "noopener noreferrer" })}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0044FF] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_-6px_rgba(0,68,255,0.45)] transition-all hover:bg-[#0A0F1D]"
                        >
                          <span>{selectedProject.ctaLabel}</span>
                          <ArrowUpRight size={16} />
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </TiltStage>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. TRABAJO CON IA (#ia) — SCROLL NARRATIVO + STICKY SEGURO SIN OVERLAP
            ===================================================================== */}
        <section id="ia" className="relative scroll-mt-28 bg-white py-24 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0044FF]/20 bg-[#F4F7FF] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0044FF]">
                  <span className="h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
                  Trabajo con IA
                </span>
                <MaskedText delay={0.05}>
                  <h2 className="mt-4 font-display text-4xl font-black leading-[1.03] tracking-[-0.035em] text-[#0A0F1D] sm:text-5xl lg:text-6xl">
                    Desarrollo e IA integrados
                    <br />
                    <span className="text-[#0044FF]">en todo el ciclo de producto.</span>
                  </h2>
                </MaskedText>
              </div>
              <p className="max-w-md text-base font-medium leading-relaxed text-[#475569]">
                Haz scroll o selecciona cada bloque para ver en directo el enrutador de modelos, el
                flujo de agentes n8n, la generación en AI Studio / Stitch y el Second Brain en
                Obsidian.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Scroll-Observed Stages (Spacious Rounded-3xl Cards) */}
              <div className="flex flex-col gap-4 lg:col-span-6">
                {aiPhases.map((phase) => {
                  const active = phase.id === selectedAiPhase.id;
                  return (
                    <button
                      key={phase.id}
                      ref={(el) => {
                        aiStepRefs.current[phase.id] = el;
                      }}
                      data-phase-id={phase.id}
                      type="button"
                      onClick={() => setActiveAiPhase(phase.id)}
                      onMouseEnter={() => setActiveAiPhase(phase.id)}
                      className={`relative flex w-full flex-col gap-3 rounded-3xl border p-6 text-left transition-all sm:p-7 ${
                        active
                          ? "border-[#0044FF] bg-[#F4F7FF] shadow-[0_18px_40px_-12px_rgba(0,68,255,0.14)] ring-2 ring-[#0044FF]/15"
                          : "border-slate-200/90 bg-white hover:border-[#0044FF]/40 hover:bg-[#F4F7FF]/50"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-xs font-extrabold ${
                              active ? "bg-[#0044FF] text-white" : "bg-[#F4F7FF] text-[#0044FF]"
                            }`}
                          >
                            {phase.num}
                          </span>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0044FF]">
                            {phase.kicker}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {phase.tags.map((t) => (
                            <span
                              key={t}
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                active
                                  ? "border border-[#0044FF]/20 bg-white text-[#0044FF]"
                                  : "bg-[#F4F7FF] text-[#475569]"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-black tracking-[-0.02em] text-[#0A0F1D] sm:text-2xl">
                        {phase.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-[#475569]">
                        {phase.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Sticky Live System (SAFE lg:top-28 lg:self-start — NO -translate-y-1/2!) */}
              <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
                <div className="rounded-3xl border border-slate-800 bg-[#0A0F1D] p-6 text-white shadow-[0_24px_60px_-15px_rgba(10,15,29,0.28)] sm:p-8">
                  <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
                        Sistema en vivo · Fase {selectedAiPhase.num}
                      </span>
                      <h4 className="mt-1 font-display text-xl font-extrabold tracking-[-0.015em] text-white">
                        {selectedAiPhase.title}
                      </h4>
                    </div>
                    <span
                      className="h-3 w-3 rounded-full bg-[#0044FF] shadow-[0_0_12px_#0044FF]"
                      aria-hidden="true"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedAiPhase.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="flex min-h-[260px] items-center"
                    >
                      {selectedAiPhase.id === "automation" && <AgentFlow />}
                      {selectedAiPhase.id === "models" && <ModelCycle />}
                      {selectedAiPhase.id === "code" && <CodeFlow />}
                      {selectedAiPhase.id === "memory" && <MemoryFlow />}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-slate-400">
                    <span>Sincronizado con scroll o selección directa</span>
                    <span className="rounded-full bg-[#0044FF]/20 px-3 py-1 font-mono text-xs font-extrabold text-[#60A5FA]">
                      FASE {selectedAiPhase.num} / 04
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 375 Hours Official Accreditation Subsidy Strip (Isolated & Spacious) */}
            <Reveal delay={0.12}>
              <div
                id="acreditacion-375h"
                className="relative z-10 mt-16 flex scroll-mt-28 flex-col justify-between gap-6 rounded-3xl bg-[#0044FF] p-8 text-white shadow-[0_24px_60px_-15px_rgba(0,68,255,0.4)] sm:mt-20 sm:p-10 lg:flex-row lg:items-center lg:p-12"
              >
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
                    Subvenciones salariales directas para empresa
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-black tracking-[-0.025em] sm:text-3xl lg:text-4xl">
                    Acreditación oficial de 375 h como Agente del Cambio Tecnológico
                  </h3>
                  <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-blue-50">
                    Cuento con 375 horas de acreditación oficial. Gracias a esta acreditación, la
                    empresa que me contrate accede directamente a subvenciones salariales para
                    impulsar su digitalización y automatización con IA.
                  </p>
                </div>
                <Magnetic className="shrink-0" strength={0.12}>
                  <a
                    href="#contacto"
                    className="inline-flex min-h-[54px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#0044FF] shadow-lg transition-all hover:bg-[#0A0F1D] hover:text-white"
                  >
                    <span>Consultar contratación</span>
                    <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================================================
            6. TRAYECTORIA / PERFIL (#trayectoria) — STICKY BUG CORREGIDO + CARD SIMPLIFICADA
            ===================================================================== */}
        <section
          id="trayectoria"
          className="relative z-10 scroll-mt-28 border-t border-slate-200/80 bg-[#F4F7FF] py-24 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Sticky Profile Card (SAFE lg:sticky lg:top-28 lg:self-start — NO -translate-y-1/2!) */}
              <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                <Reveal>
                  <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_18px_45px_-15px_rgba(15,23,42,0.08)] sm:p-8">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4 border-b border-slate-200/90 pb-6">
                      <img
                        src="/erick-portrait-studio.png"
                        alt="Erick Rodríguez"
                        loading="lazy"
                        className="h-20 w-20 shrink-0 rounded-2xl bg-[#0044FF] object-cover object-top shadow-md"
                      />
                      <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7FF] px-3 py-1 text-xs font-extrabold text-[#0044FF]">
                          <span className="h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
                          <span>La Sagrera, Barcelona</span>
                        </div>
                        <h3 className="mt-2 font-display text-2xl font-black tracking-[-0.03em] text-[#0A0F1D] sm:text-3xl">
                          Erick Rodríguez
                        </h3>
                        <p className="text-sm font-bold text-[#475569]">
                          Web, Automatización IA &amp; Negocio
                        </p>
                      </div>
                    </div>

                    {/* Concise High-Hierarchy Pitch */}
                    <p className="mt-5 text-base font-medium leading-relaxed text-[#475569]">
                      Combino desarrollo web e IA con base en marketing digital y gestión
                      administrativa: construyo la solución completa y la llevo a producción.
                    </p>

                    {/* Key Differentiator Highlights */}
                    <div className="mt-5 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F4F7FF] px-4 py-3 text-xs font-extrabold text-[#0A0F1D]">
                        <Sparkles size={15} className="shrink-0 text-[#0044FF]" />
                        <span>Acreditación Agente del Cambio (375 h)</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F4F7FF] px-4 py-3 text-xs font-extrabold text-[#0A0F1D]">
                        <Briefcase size={15} className="shrink-0 text-[#0044FF]" />
                        <span>Español y Catalán nativos · Inglés B2</span>
                      </div>
                    </div>

                    {/* Scannable Stack Pills (Replaces Dense Text Blocks) */}
                    <div className="mt-6">
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#475569]">
                        Stack técnico y herramientas
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {coreStackPills.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-slate-200/90 bg-[#F4F7FF] px-3.5 py-1.5 text-xs font-extrabold text-[#0A0F1D]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Download CV Pill CTA */}
                    <a
                      href={cvPdf.url}
                      download="Erick-Rodriguez-CV.pdf"
                      className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0044FF] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_12px_28px_-6px_rgba(0,68,255,0.45)] transition-all hover:bg-[#0A0F1D]"
                    >
                      <span>Descargar CV en PDF</span>
                      <Download size={16} />
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Real Experience & Official Education Timeline */}
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#0044FF]/20 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0044FF]">
                    <span className="h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
                    Trayectoria real
                  </span>
                  <MaskedText delay={0.05}>
                    <h2 className="mt-4 font-display text-4xl font-black leading-[1.03] tracking-[-0.035em] text-[#0A0F1D] sm:text-5xl">
                      Experiencia en empresa,
                      <br />
                      <span className="text-[#0044FF]">gestión y automatización.</span>
                    </h2>
                  </MaskedText>
                </Reveal>

                <ExperienceTimeline>
                  {experience.map((item) => (
                    <Reveal key={`${item.place}-${item.period}`}>
                      <article className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.05)] sm:p-7">
                        <TimelineDot topClass="top-7" />
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-[#F4F7FF] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0044FF]">
                            {item.period}
                          </span>
                          <span className="text-sm font-extrabold text-[#0044FF]">
                            {item.place}
                          </span>
                        </div>
                        <h3 className="mt-3 flex items-center gap-3 font-display text-xl font-black tracking-[-0.02em] text-[#0A0F1D] sm:text-2xl">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                            <Briefcase size={18} />
                          </span>
                          <span>{item.role}</span>
                        </h3>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-base font-medium leading-relaxed text-[#475569]">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  ))}

                  {education.map((item) => (
                    <Reveal key={item.title}>
                      <article className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.05)] sm:p-7">
                        <TimelineDot topClass="top-7" />
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-[#F4F7FF] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0044FF]">
                            {item.period}
                          </span>
                          <span className="text-sm font-extrabold text-[#0A0F1D]">
                            {item.place}
                          </span>
                        </div>
                        <h3 className="mt-3 flex items-center gap-3 font-display text-xl font-black tracking-[-0.02em] text-[#0A0F1D] sm:text-2xl">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                            <GraduationCap size={18} />
                          </span>
                          <span>{item.title}</span>
                        </h3>
                        <p className="mt-3 text-base font-medium leading-relaxed text-[#475569]">
                          {item.summary}
                        </p>
                      </article>
                    </Reveal>
                  ))}

                  <Reveal>
                    <article className="relative rounded-3xl border-2 border-[#0044FF]/25 bg-white p-6 shadow-[0_14px_34px_-12px_rgba(0,68,255,0.12)] sm:p-7">
                      <TimelineDot topClass="top-7" />
                      <span className="inline-flex rounded-full bg-[#0044FF] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                        Valor diferencial
                      </span>
                      <h3 className="mt-3 flex items-center gap-3 font-display text-xl font-black tracking-[-0.02em] text-[#0A0F1D] sm:text-2xl">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                          <Wrench size={18} />
                        </span>
                        <span>Un solo perfil para llevarlo a producción</span>
                      </h3>
                      <div className="mt-2 text-sm font-extrabold text-[#0044FF]">
                        Gestión Administrativa · Marketing Digital · Desarrollo Web · IA &amp; n8n
                      </div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-base font-medium leading-relaxed text-[#475569]">
                        <li>
                          Construyo la solución completa (web, plataforma, ERP o app) y la llevo a
                          producción sin depender de terceros.
                        </li>
                        <li>
                          Acreditación oficial Agente del Cambio Tecnológico (375 h) con acceso a
                          subvenciones salariales directas al incorporarme a plantilla.
                        </li>
                      </ul>
                    </article>
                  </Reveal>
                </ExperienceTimeline>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. CONTACTO Y CIERRE FUERTE (#contacto) — CTA GRANDE Y CLARO
            ===================================================================== */}
        <section id="contacto" className="scroll-mt-28 bg-white py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[32px] bg-[#0A0F1D] px-6 py-14 text-center text-white shadow-[0_32px_80px_-20px_rgba(10,15,29,0.45)] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
                {/* Ambient Electric Cobalt Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-[#0044FF]/30 blur-3xl"
                />

                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
                    <span className="h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
                    Contacto directo en Barcelona
                  </span>

                  <MaskedText delay={0.05}>
                    <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-black leading-[1.03] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                      ¿Hablamos de incorporarme a tu equipo{" "}
                      <span className="text-[#60A5FA]">o agendamos una demo presencial?</span>
                    </h2>
                  </MaskedText>

                  <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
                    Escríbeme por WhatsApp, correo o llámame directamente. Estoy en La Sagrera,
                    Barcelona, listo para enseñarte mis proyectos y el ERP en vivo.
                  </p>

                  {/* Primary Giant Pill CTA + Secondary CV Pill CTA */}
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Magnetic strength={0.14}>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-[#0044FF] px-9 py-4 text-base font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_16px_40px_-8px_rgba(0,68,255,0.65)] transition-all hover:scale-[1.02] hover:bg-white hover:text-[#0A0F1D] sm:text-lg"
                      >
                        <MessageCircle size={20} strokeWidth={2.4} />
                        <span>Escribir por WhatsApp ahora</span>
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                      </a>
                    </Magnetic>

                    <a
                      href={cvPdf.url}
                      download="Erick-Rodriguez-CV.pdf"
                      className="inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-white transition-all hover:bg-white hover:text-[#0A0F1D]"
                    >
                      <span>Descargar CV en PDF</span>
                      <Download size={17} />
                    </a>
                  </div>

                  {/* Direct Copyable Contact Pills */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                    <div className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-white py-2 pl-4 pr-2 text-[#0A0F1D] shadow-sm">
                      <a
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0A0F1D] hover:text-[#0044FF]"
                        href={`mailto:${email}`}
                      >
                        <Mail size={15} className="shrink-0 text-[#0044FF]" />
                        <span className="truncate">{email}</span>
                      </a>
                      <CopyButton value={email} label="correo" />
                    </div>

                    <div className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-4 pr-2 text-[#0A0F1D] shadow-sm">
                      <a
                        className="text-sm font-extrabold text-[#0A0F1D] hover:text-[#0044FF] tabular-nums"
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {phoneDisplay}
                      </a>
                      <CopyButton value={phoneDisplay} label="teléfono" />
                    </div>
                  </div>

                  <footer className="mt-16 flex w-full flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-8 text-sm font-bold text-slate-400">
                    <span>© 2026 Erick Rodríguez</span>
                    <span className="inline-flex items-center gap-1.5 text-white">
                      <MapPin size={15} className="text-[#60A5FA]" />
                      <span>La Sagrera, Barcelona</span>
                    </span>
                    <a
                      href="#inicio"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-[#0044FF]"
                    >
                      <span>Volver arriba ↑</span>
                    </a>
                  </footer>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
