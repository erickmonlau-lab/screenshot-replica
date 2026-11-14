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
import {
  AgentFlow,
  CodeFlow,
  Counter,
  Magnetic,
  MaskedText,
  MemoryFlow,
  ModelCycle,
  Reveal,
  ScrollProgressRail,
  TiltStage,
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
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition-all active:scale-95 ${
        copied
          ? "bg-[#0044FF] text-white"
          : "bg-[#222430] text-zinc-200 hover:bg-[#0044FF] hover:text-white"
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
      const navOffset = 92;
      const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <ScrollProgressRail />
      <Navbar mode={heroMode} onChangeMode={setHeroMode} />

      <main>
        {/* =====================================================================
            1. DARK STUDIO HERO (PERRY WANG MACOS WINDOW × ORDERALO V5 STAGE)
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
            2. HAIRLINE VELOCITY MARQUEE
            ===================================================================== */}
        <div
          className="relative z-20 overflow-hidden border-y border-[#303240] bg-[#16161D] py-3 leading-none"
          aria-hidden="true"
        >
          <VelocityMarqueeRow
            baseVelocity={-2.0}
            className="font-display text-[11px] font-bold leading-none tracking-[0.16em] text-zinc-200 sm:text-xs"
          >
            {marqueeText}
          </VelocityMarqueeRow>
        </div>

        {/* =====================================================================
            3. SOLID DARK STAT-CARDS (#metricas)
            ===================================================================== */}
        <section
          id="metricas"
          className="scroll-mt-[62px] bg-[#09090B] py-14 lg:py-20"
          aria-label="Resultados clave"
        >
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Stat Card 1 */}
              <Reveal className="flex flex-col justify-between rounded-3xl border border-[#303240] bg-[#16161D] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#2E5BFF] bg-[#0044FF] text-white">
                    <Clock size={20} strokeWidth={2.2} />
                  </div>
                  <span className="rounded-full border border-[#383B4B] bg-[#21222C] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-100">
                    Experiencia real
                  </span>
                </div>
                <div className="mt-5">
                  <strong className="font-display block text-4xl font-extrabold tracking-[-0.04em] text-white tabular-nums sm:text-5xl">
                    <Counter to={1000} prefix="+" />{" "}
                    <span className="text-2xl font-bold text-[#60A5FA]">h</span>
                  </strong>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                    De experiencia acumulada entre prácticas en empresa, producto propio y
                    desarrollo web en producción.
                  </p>
                </div>
              </Reveal>

              {/* Stat Card 2 */}
              <Reveal
                delay={0.08}
                className="flex flex-col justify-between rounded-3xl border border-[#303240] bg-[#16161D] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#2E5BFF] bg-[#0044FF] text-white">
                    <TrendingUp size={20} strokeWidth={2.2} />
                  </div>
                  <span className="rounded-full border border-[#383B4B] bg-[#21222C] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-100">
                    SEO en vivo
                  </span>
                </div>
                <div className="mt-5">
                  <strong className="font-display inline-flex items-baseline gap-2 text-4xl font-extrabold tracking-[-0.04em] text-white tabular-nums sm:text-5xl">
                    <span>Top</span>
                    <span className="text-[#60A5FA]">
                      <Counter to={1} />
                    </span>
                  </strong>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                    En Google en búsquedas de extraescolares en Barcelona con{" "}
                    <strong className="font-semibold text-white">diversplas.es</strong>, web
                    desarrollada por mí y recién lanzada.
                  </p>
                </div>
              </Reveal>

              {/* Stat Card 3 */}
              <Reveal
                delay={0.16}
                className="flex flex-col justify-between rounded-3xl border border-[#303240] bg-[#16161D] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#2E5BFF] bg-[#0044FF] text-white">
                    <Award size={20} strokeWidth={2.2} />
                  </div>
                  <span className="rounded-full border border-[#383B4B] bg-[#21222C] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-100">
                    Subvención empresa
                  </span>
                </div>
                <div className="mt-5">
                  <strong className="font-display block text-4xl font-extrabold tracking-[-0.04em] text-white tabular-nums sm:text-5xl">
                    <Counter to={375} />{" "}
                    <span className="text-2xl font-bold text-[#60A5FA]">h</span>
                  </strong>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                    De acreditación oficial como Agente del Cambio Tecnológico: la empresa que me
                    contrate accede a subvenciones salariales directas.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. PROYECTOS (#proyectos) — 1-SCREEN PC FIT + VENTANA MACOS SÓLIDA
            ===================================================================== */}
        <section
          id="proyectos"
          className="light-studio-grid scroll-mt-[62px] bg-[#F2F4F8] py-8 text-[#0A0F1D] lg:flex lg:min-h-[calc(100dvh-62px)] lg:flex-col lg:justify-center 2xl:py-12"
        >
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-4 flex flex-col justify-between gap-2 lg:flex-row lg:items-end 2xl:mb-7">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D4FF] bg-white px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0044FF] 2xl:px-3.5 2xl:py-1 2xl:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0044FF]" aria-hidden="true" />
                  Proyectos seleccionados
                </span>
                <MaskedText delay={0.05}>
                  <h2 className="mt-1.5 font-display text-2xl font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0A0F1D] sm:text-3xl lg:text-[36px] 2xl:text-[46px]">
                    Webs en producción.{" "}
                    <span className="text-[#0044FF]">Y dos proyectos en directo.</span>
                  </h2>
                </MaskedText>
              </div>
              <p className="max-w-md text-xs font-medium leading-snug text-zinc-700 2xl:text-sm 2xl:leading-relaxed">
                Selecciona cada proyecto para previsualizar el resultado en el visor macOS o
                explorar el esquema en modo oscuro de la demo presencial.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 2xl:gap-6">
              {/* Left Interactive Index Stack */}
              <div className="flex flex-col justify-between gap-2 lg:col-span-5 2xl:gap-3">
                {projectCases.map((project) => {
                  const isActive = project.id === selectedProject.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveProjectId(project.id)}
                      onFocus={() => setActiveProjectId(project.id)}
                      className={`group relative flex w-full flex-col gap-1 rounded-xl border p-2.5 text-left transition-all sm:p-3 2xl:gap-1.5 2xl:rounded-2xl 2xl:p-4 ${
                        isActive
                          ? "border-[#0044FF] bg-white shadow-[0_12px_28px_-10px_#C7D4FF] ring-2 ring-[#DBE4FF]"
                          : "border-[#D4D7E2] bg-white hover:border-[#9CA3B8]"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-display text-[11px] font-extrabold transition-colors 2xl:h-7 2xl:w-7 2xl:text-xs ${
                              isActive ? "bg-[#0044FF] text-white" : "bg-zinc-200 text-[#0A0F1D]"
                            }`}
                          >
                            {project.index}
                          </span>
                          <span className="font-display text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0F1D] sm:text-base 2xl:text-lg">
                            {project.name}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold transition-colors 2xl:text-xs ${
                            isActive
                              ? "bg-[#0044FF] text-white"
                              : "border border-[#D4D7E2] bg-[#F2F4F8] text-[#0A0F1D]"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <p className="text-xs font-medium leading-snug text-zinc-700 2xl:text-[13.5px]">
                        {project.outcome}
                      </p>

                      <div className="flex flex-wrap gap-1 2xl:gap-1.5">
                        {project.stack.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#E2E4EC] bg-[#F2F4F8] px-2 py-0.5 text-[10px] font-semibold text-[#0A0F1D] 2xl:px-2.5 2xl:text-[11px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right macOS Dark Bezel Browser Stage */}
              <div className="lg:col-span-7">
                <TiltStage className="h-full">
                  <div className="flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-[#303240] bg-[#16161D] p-2.5 text-white shadow-[0_24px_48px_-14px_#0A0F1D] sm:p-3 2xl:rounded-[26px] 2xl:p-4">
                    {/* macOS Chrome Bar */}
                    <div className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-[#303240] bg-[#21222C] px-3 py-1.5 2xl:mb-3 2xl:px-4 2xl:py-2">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="truncate rounded-full border border-[#383B4B] bg-[#16161D] px-3 py-0.5 text-[11px] font-medium text-zinc-100 2xl:px-4 2xl:text-xs">
                        {selectedProject.domain}
                      </span>
                      <a
                        href={selectedProject.href}
                        {...(selectedProject.isPrivate
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0044FF] px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-[#09090B] 2xl:px-3.5 2xl:text-xs"
                      >
                        <span>{selectedProject.ctaLabel}</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>

                    {/* Preview Viewport */}
                    <div className="flex-1 overflow-hidden rounded-xl border border-[#303240] bg-[#09090B]">
                      <motion.div
                        key={selectedProject.id}
                        initial={{ y: 5 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {selectedProject.isPrivate ? (
                          <ErpShowcase />
                        ) : (
                          <a
                            href={selectedProject.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block overflow-hidden bg-[#16161D]"
                          >
                            <img
                              src={selectedProject.image}
                              alt={`Captura real de ${selectedProject.name}`}
                              className="h-[205px] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:h-[235px] 2xl:h-[360px]"
                            />
                          </a>
                        )}
                      </motion.div>
                    </div>

                    {/* Bottom Project Summary & Pill CTA */}
                    <div className="mt-2 flex flex-col justify-between gap-2.5 rounded-xl border border-[#303240] bg-[#21222C] p-3 sm:flex-row sm:items-center sm:p-3.5 2xl:mt-3 2xl:p-4">
                      <div>
                        <div className="mb-1 flex flex-wrap gap-1 2xl:mb-1.5 2xl:gap-1.5">
                          {selectedProject.stack.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#383B4B] bg-[#16161D] px-2 py-0.5 text-[10.5px] font-semibold text-white 2xl:px-2.5 2xl:text-[11px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="max-w-xl text-xs leading-snug text-zinc-200 2xl:text-sm">
                          {selectedProject.description}
                        </p>
                      </div>
                      <Magnetic className="shrink-0" strength={0.12}>
                        <a
                          href={selectedProject.href}
                          {...(selectedProject.isPrivate
                            ? {}
                            : { target: "_blank", rel: "noopener noreferrer" })}
                          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#09090B] transition-all hover:bg-[#0044FF] hover:text-white 2xl:px-5 2xl:py-2.5 2xl:text-xs"
                        >
                          <span>{selectedProject.ctaLabel}</span>
                          <ArrowUpRight size={13} />
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
            5. TRABAJO CON IA (#ia) — 1-SCREEN PC FIT + FLUJO SÓLIDO
            ===================================================================== */}
        <section
          id="ia"
          className="dark-studio-grid relative scroll-mt-[62px] bg-[#09090B] py-6 text-white lg:flex lg:min-h-[calc(100dvh-62px)] lg:flex-col lg:justify-center 2xl:py-12"
        >
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-3 flex flex-col justify-between gap-2 lg:flex-row lg:items-end 2xl:mb-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#383B4B] bg-[#16161D] px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#60A5FA] 2xl:px-3.5 2xl:py-1 2xl:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                  Trabajo con IA
                </span>
                <MaskedText delay={0.05}>
                  <h2 className="mt-1.5 font-display text-2xl font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-3xl lg:text-[36px] 2xl:text-[46px]">
                    Desarrollo e IA integrados{" "}
                    <span className="text-[#60A5FA]">en todo el ciclo de producto.</span>
                  </h2>
                </MaskedText>
              </div>
              <p className="max-w-md text-xs leading-snug text-zinc-300 2xl:text-sm 2xl:leading-relaxed">
                Haz scroll o selecciona cada bloque para ver en directo el enrutador de modelos, el
                flujo de agentes n8n, la generación en AI Studio / Stitch y el Second Brain en
                Obsidian.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 2xl:gap-6">
              {/* Left 2x2 Solid Phase Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-6 2xl:gap-3.5">
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
                      className={`relative flex w-full flex-col justify-between gap-1.5 rounded-xl border p-3 text-left transition-all sm:p-3.5 2xl:gap-2 2xl:rounded-2xl 2xl:p-5 ${
                        active
                          ? "border-[#3B82F6] bg-[#0B256B]"
                          : "border-[#303240] bg-[#16161D] hover:border-[#4B5066] hover:bg-[#21222C]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-display text-[11px] font-extrabold 2xl:h-7 2xl:w-7 2xl:text-xs ${
                              active ? "bg-[#0044FF] text-white" : "bg-[#21222C] text-white"
                            }`}
                          >
                            {phase.num}
                          </span>
                          <span className="truncate text-[10px] font-bold uppercase tracking-wider text-[#60A5FA] 2xl:text-[11px]">
                            {phase.kicker}
                          </span>
                        </div>
                        <h3 className="mt-1.5 font-display text-[15px] font-bold tracking-[-0.02em] text-white 2xl:mt-2 2xl:text-lg">
                          {phase.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-snug text-zinc-300 2xl:mt-1 2xl:text-[13.5px] 2xl:leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-0.5 2xl:gap-1.5">
                        {phase.tags.map((t) => (
                          <span
                            key={t}
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold 2xl:px-2.5 2xl:text-[11px] ${
                              active
                                ? "border border-[#3B82F6] bg-[#0044FF] text-white"
                                : "border border-[#383B4B] bg-[#21222C] text-zinc-100"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Solid Live System */}
              <div className="lg:col-span-6">
                <div className="macos-window-frame flex h-full flex-col justify-between rounded-[20px] p-3.5 text-white sm:p-4 2xl:rounded-[26px] 2xl:p-6">
                  <div className="mb-2.5 flex items-center justify-between border-b border-[#303240] pb-2.5 2xl:mb-4 2xl:pb-3.5">
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#60A5FA] 2xl:text-xs">
                        Sistema en vivo · Fase {selectedAiPhase.num}
                      </span>
                      <h4 className="mt-0.5 font-display text-base font-extrabold tracking-[-0.015em] text-white 2xl:text-xl">
                        {selectedAiPhase.title}
                      </h4>
                    </div>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedAiPhase.id}
                      initial={{ y: 5 }}
                      animate={{ y: 0 }}
                      exit={{ y: -5 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="flex min-h-[175px] flex-1 items-center 2xl:min-h-[255px]"
                    >
                      {selectedAiPhase.id === "automation" && <AgentFlow />}
                      {selectedAiPhase.id === "models" && <ModelCycle />}
                      {selectedAiPhase.id === "code" && <CodeFlow />}
                      {selectedAiPhase.id === "memory" && <MemoryFlow />}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-2.5 flex items-center justify-between border-t border-[#303240] pt-2.5 text-[11px] font-medium text-zinc-300 2xl:mt-4 2xl:pt-3.5 2xl:text-xs">
                    <span>Sincronizado con scroll o selección directa</span>
                    <span className="rounded-full border border-[#3B82F6] bg-[#0B256B] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-white 2xl:px-3 2xl:text-xs">
                      FASE {selectedAiPhase.num} / 04
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 375 Hours Official Accreditation Subsidy Strip — Solid Electric Cobalt */}
            <Reveal delay={0.08}>
              <div
                id="acreditacion-375h"
                className="relative z-10 mt-3 flex scroll-mt-[62px] flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-[#3B82F6] bg-[#0044FF] px-5 py-3 text-white sm:px-6 lg:flex-row lg:items-center 2xl:mt-6 2xl:px-8 2xl:py-5"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#60A5FA] bg-[#0033CC] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white 2xl:px-3 2xl:text-[11px]">
                    Subvenciones salariales directas para empresa
                  </span>
                  <h3 className="mt-1 font-display text-base font-extrabold tracking-[-0.02em] sm:text-lg lg:text-xl 2xl:mt-1.5 2xl:text-2xl">
                    Acreditación oficial de 375 h como Agente del Cambio Tecnológico
                  </h3>
                  <p className="mt-0.5 max-w-3xl text-xs leading-snug text-blue-50 2xl:mt-1 2xl:text-sm">
                    Cuento con 375 horas de acreditación oficial. Gracias a esta acreditación, la
                    empresa que me contrate accede directamente a subvenciones salariales para
                    impulsar su digitalización y automatización con IA.
                  </p>
                </div>
                <Magnetic className="shrink-0" strength={0.12}>
                  <a
                    href="#contacto"
                    className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-[#09090B] shadow-lg transition-all hover:bg-[#09090B] hover:text-white 2xl:min-h-[48px] 2xl:px-6 2xl:py-3"
                  >
                    <span>Consultar contratación</span>
                    <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================================================
            6. TRAYECTORIA / PERFIL (#trayectoria) — 3-COL BENTO 1-SCREEN PC FIT
            ===================================================================== */}
        <section
          id="trayectoria"
          className="light-studio-grid relative z-10 scroll-mt-[62px] bg-[#F2F4F8] py-6 text-[#0A0F1D] lg:flex lg:min-h-[calc(100dvh-62px)] lg:flex-col lg:justify-center 2xl:py-12"
        >
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-3 flex flex-col justify-between gap-2 lg:flex-row lg:items-end 2xl:mb-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C7D4FF] bg-white px-3 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0044FF] 2xl:px-3.5 2xl:py-1 2xl:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0044FF]" aria-hidden="true" />
                  Trayectoria real
                </span>
                <MaskedText delay={0.05}>
                  <h2 className="mt-1 font-display text-2xl font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0A0F1D] sm:text-3xl lg:text-[34px] 2xl:text-[46px]">
                    Experiencia en empresa,{" "}
                    <span className="text-[#0044FF]">gestión y automatización.</span>
                  </h2>
                </MaskedText>
              </div>
              <p className="max-w-md text-xs font-medium leading-snug text-zinc-700 2xl:text-sm 2xl:leading-relaxed">
                Perfil híbrido en desarrollo, marketing y administración con más de 1.000 horas
                prácticas y titulación oficial en Barcelona.
              </p>
            </Reveal>

            {/* 3-Column Bento Grid: Profile | Experience | Education & Value */}
            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-12 2xl:gap-5">
              {/* Col 1: Profile + Stack + CV PDF */}
              <div className="lg:col-span-4">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#D4D7E2] bg-white p-3.5 2xl:rounded-3xl 2xl:p-5">
                  <div>
                    <div className="flex items-center gap-3 border-b border-[#E2E4EC] pb-2.5 2xl:pb-4">
                      <img
                        src="/erick-portrait-studio.png"
                        alt="Erick Rodríguez"
                        loading="lazy"
                        className="h-11 w-11 shrink-0 rounded-xl bg-[#0044FF] object-cover object-top 2xl:h-16 2xl:w-16 2xl:rounded-2xl"
                      />
                      <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF3FF] px-2.5 py-0.5 text-[10px] font-bold text-[#0044FF] 2xl:text-xs">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-[#0044FF]"
                            aria-hidden="true"
                          />
                          <span>La Sagrera, Barcelona</span>
                        </div>
                        <h3 className="mt-0.5 font-display text-base font-extrabold tracking-[-0.03em] text-[#0A0F1D] 2xl:mt-1 2xl:text-2xl">
                          Erick Rodríguez
                        </h3>
                        <p className="text-[11px] font-semibold text-zinc-700 2xl:text-xs">
                          Web, Automatización IA &amp; Negocio
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-xs leading-snug text-zinc-700 2xl:mt-4 2xl:text-sm 2xl:leading-relaxed">
                      Combino desarrollo web e IA con base en marketing digital y gestión
                      administrativa: construyo la solución completa y la llevo a producción.
                    </p>

                    <div className="mt-2 flex flex-col gap-1 2xl:mt-4 2xl:gap-2">
                      <div className="flex items-center gap-2 rounded-xl border border-[#DDE4F8] bg-[#EEF3FF] px-3 py-1.5 text-[11px] font-bold text-[#0A0F1D] 2xl:px-3.5 2xl:py-2.5 2xl:text-xs">
                        <Sparkles size={13} className="shrink-0 text-[#0044FF]" />
                        <span>Acreditación Agente del Cambio (375 h)</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-[#DDE4F8] bg-[#EEF3FF] px-3 py-1.5 text-[11px] font-bold text-[#0A0F1D] 2xl:px-3.5 2xl:py-2.5 2xl:text-xs">
                        <Briefcase size={13} className="shrink-0 text-[#0044FF]" />
                        <span>Español y Catalán nativos · Inglés B2</span>
                      </div>
                    </div>

                    <div className="mt-2.5 2xl:mt-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 2xl:text-[11px]">
                        Stack técnico y herramientas
                      </span>
                      <div className="mt-1 flex flex-wrap gap-1 2xl:mt-2 2xl:gap-1.5">
                        {coreStackPills.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-[#D4D7E2] bg-[#F2F4F8] px-2 py-0.5 text-[10px] font-bold text-[#0A0F1D] 2xl:px-3 2xl:py-1 2xl:text-[11px]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={cvPdf.url}
                    download="Erick-Rodriguez-CV.pdf"
                    className="mt-2.5 inline-flex min-h-[38px] w-full items-center justify-center gap-2 rounded-full bg-[#0A0F1D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#0044FF] 2xl:mt-5 2xl:min-h-[46px] 2xl:text-xs"
                  >
                    <span>Descargar CV en PDF</span>
                    <Download size={14} />
                  </a>
                </div>
              </div>

              {/* Col 2: Real Experience (3 Cards) */}
              <div className="flex flex-col justify-between gap-2 lg:col-span-4 2xl:gap-3">
                {experience.map((item) => (
                  <article
                    key={`${item.place}-${item.period}`}
                    className="flex flex-1 flex-col justify-between rounded-2xl border border-[#D4D7E2] bg-white p-2.5 sm:p-3 2xl:p-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="rounded-full bg-[#EEF3FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0044FF] 2xl:px-2.5 2xl:text-[11px]">
                          {item.period}
                        </span>
                        <span className="text-[11px] font-bold text-[#0044FF] 2xl:text-xs">
                          {item.place}
                        </span>
                      </div>
                      <h3 className="mt-1 flex items-center gap-2 font-display text-[13px] font-extrabold tracking-[-0.02em] text-[#0A0F1D] 2xl:mt-2 2xl:text-base">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0044FF] text-white 2xl:h-7 2xl:w-7 2xl:rounded-lg">
                          <Briefcase size={13} />
                        </span>
                        <span>{item.role}</span>
                      </h3>
                      <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-snug text-zinc-700 2xl:mt-2 2xl:space-y-1 2xl:text-[12.5px]">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              {/* Col 3: Official Education + Differential Value */}
              <div className="flex flex-col justify-between gap-2 lg:col-span-4 2xl:gap-3">
                {education.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#D4D7E2] bg-white p-2.5 sm:p-3 2xl:p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="rounded-full bg-[#EEF3FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0044FF] 2xl:px-2.5 2xl:text-[11px]">
                        {item.period}
                      </span>
                      <span className="text-[10.5px] font-bold text-[#0A0F1D] 2xl:text-xs">
                        {item.place}
                      </span>
                    </div>
                    <h3 className="mt-1 flex items-center gap-2 font-display text-[13px] font-extrabold tracking-[-0.02em] text-[#0A0F1D] 2xl:mt-1.5 2xl:text-base">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0044FF] text-white 2xl:h-7 2xl:w-7 2xl:rounded-lg">
                        <GraduationCap size={13} />
                      </span>
                      <span>{item.title}</span>
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-snug text-zinc-700 2xl:mt-1.5 2xl:text-[12.5px]">
                      {item.summary}
                    </p>
                  </article>
                ))}

                <article className="rounded-2xl border-2 border-[#0044FF] bg-white p-2.5 sm:p-3 2xl:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex rounded-full bg-[#0044FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white 2xl:text-[11px]">
                      Valor diferencial
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0044FF] text-white 2xl:h-7 2xl:w-7 2xl:rounded-lg">
                      <Wrench size={13} />
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-[13px] font-extrabold tracking-[-0.02em] text-[#0A0F1D] 2xl:mt-1.5 2xl:text-base">
                    Un solo perfil para llevarlo a producción
                  </h3>
                  <div className="mt-0.5 text-[10.5px] font-bold text-[#0044FF] 2xl:text-xs">
                    Administración · Marketing · Desarrollo Web · IA &amp; n8n
                  </div>
                  <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-[11px] leading-snug text-zinc-700 2xl:mt-1.5 2xl:space-y-1 2xl:text-[12.5px]">
                    <li>
                      Construyo la solución completa (web, plataforma, ERP o app) sin depender de
                      terceros.
                    </li>
                    <li>
                      375 h de acreditación oficial con acceso a subvenciones salariales directas.
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. CONTACTO Y CIERRE (#contacto) — VENTANA OSCURA SÓLIDA 1-SCREEN PC FIT
            ===================================================================== */}
        <section
          id="contacto"
          className="dark-studio-grid scroll-mt-[62px] bg-[#09090B] py-10 text-white lg:flex lg:min-h-[calc(100dvh-62px)] lg:flex-col lg:justify-center 2xl:py-14"
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <div className="macos-window-frame relative overflow-hidden rounded-[26px] border border-[#303240] bg-[#16161D] px-6 py-9 text-center sm:px-12 sm:py-11 2xl:rounded-[32px] 2xl:px-16 2xl:py-16">
                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#383B4B] bg-[#21222C] px-4 py-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-100">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                    Contacto directo en Barcelona
                  </span>

                  <MaskedText delay={0.05}>
                    <h2 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                      ¿Hablamos de tu equipo o vemos{" "}
                      <span className="text-[#60A5FA]">una demo en directo?</span>
                    </h2>
                  </MaskedText>

                  <p className="mx-auto mt-3.5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                    Escríbeme por WhatsApp, correo o llámame directamente. Estoy en La Sagrera,
                    Barcelona, listo para enseñarte mis proyectos y el ERP en vivo.
                  </p>

                  {/* Primary Pill CTA + Secondary CV Pill CTA */}
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                    <Magnetic strength={0.14}>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3 text-sm font-extrabold uppercase tracking-[0.06em] text-[#09090B] transition-all hover:scale-[1.02] hover:bg-[#0044FF] hover:text-white"
                      >
                        <MessageCircle size={18} strokeWidth={2.3} />
                        <span>Escribir por WhatsApp ahora</span>
                        <ArrowUpRight size={16} strokeWidth={2.4} />
                      </a>
                    </Magnetic>

                    <a
                      href={cvPdf.url}
                      download="Erick-Rodriguez-CV.pdf"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#383B4B] bg-[#21222C] px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition-all hover:bg-white hover:text-[#09090B]"
                    >
                      <span>Descargar CV en PDF</span>
                      <Download size={16} />
                    </a>
                  </div>

                  {/* Solid Direct Copyable Contact Pills */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#383B4B] bg-[#21222C] py-1.5 pl-4 pr-2 text-white">
                      <a
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100 hover:text-white"
                        href={`mailto:${email}`}
                      >
                        <Mail size={15} className="shrink-0 text-[#60A5FA]" />
                        <span className="truncate">{email}</span>
                      </a>
                      <CopyButton value={email} label="correo" />
                    </div>

                    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#383B4B] bg-[#21222C] py-1.5 pl-4 pr-2 text-white">
                      <a
                        className="text-sm font-semibold text-zinc-100 hover:text-white tabular-nums"
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {phoneDisplay}
                      </a>
                      <CopyButton value={phoneDisplay} label="teléfono" />
                    </div>
                  </div>

                  <footer className="mt-8 flex w-full flex-wrap items-center justify-between gap-4 border-t border-[#303240] pt-5 text-sm font-medium text-zinc-300">
                    <span>© 2026 Erick Rodríguez</span>
                    <span className="inline-flex items-center gap-1.5 text-white">
                      <MapPin size={15} className="text-[#60A5FA]" />
                      <span>La Sagrera, Barcelona</span>
                    </span>
                    <a
                      href="#inicio"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#383B4B] bg-[#21222C] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0044FF]"
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
