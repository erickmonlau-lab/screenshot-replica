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
import { BigHeading, SectionHeading } from "@/components/SectionHeading";
import { SectionTitle } from "@/components/SectionTitle";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { StackSwitcher } from "@/components/StackSwitcher";
import { BrainVisual } from "@/components/LiveVisuals";
import { GrantBand } from "@/components/GrantBand";
import { AboutSection } from "@/components/AboutSection";
import { CursorGlow } from "@/components/CursorGlow";
import { ErpShowcase } from "@/components/ErpShowcase";
import { MetricsBand } from "@/components/MetricsBand";
import { OrderSection } from "@/components/OrderSection";
import { ProcessSection } from "@/components/ProcessSection";
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
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-[15px] font-bold transition-all active:scale-95 ${
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
  const [activeAiPhase, setActiveAiPhase] = useState<string>("memory");
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
      <CursorGlow />
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
            className="font-display text-[15px] leading-none font-bold tracking-[0.08em] sm:text-base"
          >
            {marqueeText}
          </VelocityMarqueeRow>
        </div>

        <MetricsBand />
        <OrderSection />
        <ProcessSection />

        {/* PROYECTOS — 3D Coverflow Gallery */}
        <section id="proyectos" className={`${sectionBase} section-light`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-5 2xl:mb-8">
              <SectionTitle compact word="Proyectos" sub="Webs reales y sistemas en producción." />
            </Reveal>
            <div className="mt-4 sm:mt-6">
              <ProjectCarousel
                slides={projectCases}
                activeId={activeProjectId}
                onChange={setActiveProjectId}
                privateSlide={<ErpShowcase />}
              />
            </div>
          </div>
        </section>

        {/* STACK + IA EN ACCIÓN */}
        <section
          id="ia"
          className="section-light t-line relative scroll-mt-[62px] overflow-hidden border-t border-black/10 bg-[#FAF9F6] lg:h-[min(100svh,800px)] lg:min-h-[640px]"
        >
          <div className="absolute inset-0 hidden lg:block">
            <BrainVisual theme="light" />
          </div>

          <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-[1380px] flex-col justify-center px-5 py-14 sm:px-8 lg:py-10">
            <div className="pointer-events-auto max-w-[520px]">
              <p
                aria-hidden="true"
                className="outline-title font-display text-[clamp(3.5rem,8vw,6.8rem)] leading-[0.92] font-bold tracking-[-0.03em] uppercase [--outline-fill:#FAF9F6] text-zinc-900"
              >
                Cerebro
              </p>
              <h2 className="font-display mt-3 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-zinc-950">
                La IA ya sabe <span className="text-[#0044FF]">cómo trabajo.</span>
              </h2>
              <p className="mt-4 text-xl leading-snug font-medium text-zinc-600">
                Mi segundo cerebro vive en Obsidian: cada nota es un nodo y la IA lo recorre antes
                de empezar.
              </p>
              <ol className="mt-8 space-y-6 border-l-2 border-black/15 pl-6">
                {[
                  [
                    "Memoria entre proyectos",
                    "Decisiones, reglas y clientes quedan en notas que la IA lee.",
                  ],
                  [
                    "Reglas que se cumplen",
                    "Mis normas de diseño y código las aplican siempre los agentes.",
                  ],
                  ["Menos contexto repetido", "No explico cada proyecto de nuevo en cada sesión."],
                ].map(([t, d]) => (
                  <li key={t}>
                    <p className="font-display text-2xl font-bold tracking-[-0.02em] text-zinc-950">
                      {t}
                    </p>
                    <p className="mt-1 text-lg leading-snug font-medium text-zinc-600">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative h-[380px] lg:hidden">
            <BrainVisual theme="light" />
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className={`${sectionBase} section-dark`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-8">
              <SectionTitle
                compact
                word="Stack"
                sub="Un stack común."
                accent="Tu negocio encima."
              />
            </Reveal>
            <StackSwitcher tools={technicalTools} />
          </div>
        </section>

        {/* TRAYECTORIA — Sobre Mí / About Me */}
        <section id="trayectoria" className={`${sectionBase} section-light`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-5 2xl:mb-8">
              <SectionTitle
                compact
                word="Sobre mí"
                sub="Problem Solver."
                accent="Perfil híbrido."
              />
            </Reveal>

            <AboutSection experience={experience} education={education} cvUrl={cvPdf.url} />
          </div>
        </section>

        <GrantBand />

        {/* CONTACTO */}
        <section id="contacto" className={`${sectionBase} section-light`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <p className="mb-5 text-lg font-semibold text-[#0044FF] sm:text-xl">
              Disponible en Barcelona
            </p>
            <BigHeading
              className="t-ink font-display text-[clamp(3.2rem,12.5vw,11.5rem)] leading-[0.92] font-bold tracking-[-0.055em] [word-spacing:0.12em]"
              lines={[{ text: "Hablemos" }, { text: "de tu proyecto.", accent: true }]}
            />
            <Reveal delay={0.1} className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="t-muted max-w-[40ch] text-lg leading-snug font-medium sm:text-xl lg:text-2xl">
                  Cuéntame qué necesitas, o te enseño en persona la demo del ERP y los sistemas en
                  producción.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.1}>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#0044FF] px-7 py-3.5 text-base font-semibold text-white transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
                    >
                      <MessageCircle size={18} strokeWidth={2.3} />
                      <span>Escribir por WhatsApp</span>
                      <ArrowUpRight size={16} strokeWidth={2.5} />
                    </a>
                  </Magnetic>
                  <a
                    href={cvPdf.url}
                    download="Erick-Rodriguez-CV.pdf"
                    className="t-ink inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-current px-7 py-3.5 text-base font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
                  >
                    <span>Descargar CV</span>
                    <Download size={16} />
                  </a>
                </div>
              </div>

              <dl className="lg:col-span-5">
                {[
                  {
                    icon: Mail,
                    k: "Email",
                    node: (
                      <div className="flex min-w-0 items-center justify-between gap-3">
                        <a
                          href={`mailto:${email}`}
                          className="font-display truncate text-lg font-semibold tracking-[-0.02em] hover:text-[#0044FF] sm:text-xl"
                        >
                          {email}
                        </a>
                        <CopyButton value={email} label="correo" />
                      </div>
                    ),
                  },
                  {
                    icon: MessageCircle,
                    k: "WhatsApp y teléfono",
                    node: (
                      <div className="flex min-w-0 items-center justify-between gap-3">
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-lg font-semibold tracking-[-0.02em] tabular-nums hover:text-[#0044FF] sm:text-xl"
                        >
                          {phoneDisplay}
                        </a>
                        <CopyButton value={phoneDisplay} label="teléfono" />
                      </div>
                    ),
                  },
                  {
                    icon: MapPin,
                    k: "Ubicación",
                    node: (
                      <span className="font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl">
                        La Sagrera, Barcelona · Presencial o remoto
                      </span>
                    ),
                  },
                ].map(({ icon: I, k, node }) => (
                  <div key={k} className="t-line border-t py-4 first:border-t-2">
                    <dt className="t-muted mb-1.5 flex items-center gap-2 text-[15px] font-semibold tracking-[0.08em] uppercase">
                      <I size={14} className="text-[#0044FF]" />
                      {k}
                    </dt>
                    <dd>{node}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Footer en contraste sólido oscuro */}
        <footer className="section-dark t-line t-muted border-t py-6 text-[15px] font-medium sm:text-base">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
            <span>© 2026 Erick Rodríguez · Portfolio</span>
            <span>Desarrollo Web · ERPs a Medida · Automatización IA</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
