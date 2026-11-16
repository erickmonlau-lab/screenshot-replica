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
    status: "En producción",
    outcome: "Web a medida para colegios y AFAs: gestión de extraescolares y casales",
    stack: ["Web a medida", "SEO Técnico", "Recién lanzada"],
    href: "https://diversplas.es",
    image: diversplas.url,
    description:
      "Web para gestión de extraescolares y casales para colegios y AFAs, desarrollada íntegramente por mí y ya en producción.",
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
  "ERICK RODRÍGUEZ · MARKETING · GESTIÓN · CÓDIGO · IA · BARCELONA · DISPONIBLE PARA CONTRATACIÓN · 375 H AGENTE DEL CAMBIO · ";

function Index() {
  const [heroMode, setHeroMode] = useState<"studio" | "preview">("studio");
  const [activeProjectId, setActiveProjectId] = useState<string>("diversplas");
  const [activeAiPhase, setActiveAiPhase] = useState<string>("memory");
  const [showLiveSystem, setShowLiveSystem] = useState<boolean>(true);

  const selectedAiPhase = aiPhases.find((p) => p.id === activeAiPhase) ?? aiPhases[0]!;

  function handleJumpToProjects(caseId?: string) {
    if (caseId) setActiveProjectId(caseId);
    const section = document.getElementById(caseId ? `caso-${caseId}` : "proyectos");
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - (caseId ? 90 : 62);
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
        <section
          id="stack"
          className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] py-14 text-white sm:py-16"
        >
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] font-bold tracking-[-0.05em]">
              Con qué <span className="text-[#5b97ff]">trabajo.</span>
            </h2>
          </div>
          <div className="mt-9 space-y-4" aria-label="Herramientas que uso">
            {[technicalTools.slice(0, 8), technicalTools.slice(8)].map((row, r) => (
              <VelocityMarqueeRow key={r} baseVelocity={r === 0 ? -1.8 : 1.8}>
                {row.map((t) => (
                  <span
                    key={t.name}
                    className="mr-4 inline-flex items-center gap-3 rounded-full border-[3px] border-[#09090B] bg-white px-6 py-3 text-[#09090B] shadow-[5px_5px_0_#0044FF]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full border-2 border-[#09090B]"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="font-display text-[22px] leading-none font-bold tracking-[-0.03em]">
                      {t.name}
                    </span>
                    <span className="text-[15px] font-semibold text-[#52525B]">{t.category}</span>
                  </span>
                ))}
              </VelocityMarqueeRow>
            ))}
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
        <section
          id="contacto"
          className="relative scroll-mt-[62px] overflow-hidden bg-[#09090B] pt-16 pb-10 text-white sm:pt-20"
        >
          <img
            src="/erick-portrait-studio.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[1%] bottom-0 z-0 hidden h-[86%] w-auto max-w-none select-none lg:block"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#09090B] bg-[#FFD60A] px-3.5 py-1.5 text-[17px] font-bold text-[#09090B] shadow-[4px_4px_0_#ffffff]">
              Disponible en Barcelona
            </span>
            <Reveal>
              <h2 className="font-display mt-6 text-[clamp(3.4rem,10.5vw,10rem)] leading-[0.88] font-bold tracking-[-0.06em]">
                Hablemos
                <span className="block text-[#0044FF] [text-shadow:4px_4px_0_#ffffff]">de tu</span>
                <span className="block text-[#0044FF] [text-shadow:4px_4px_0_#ffffff]">
                  proyecto.
                </span>
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.1}>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-white bg-[#0044FF] px-7 py-3.5 text-base font-semibold text-white shadow-[5px_5px_0_#ffffff] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#ffffff]"
                >
                  <MessageCircle size={18} strokeWidth={2.3} />
                  <span>Escribir por WhatsApp</span>
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </a>
              </Magnetic>
              <a
                href={cvPdf.url}
                download="Erick-Rodriguez-CV.pdf"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#09090B]"
              >
                <span>Descargar CV</span>
                <Download size={16} />
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3 lg:mt-14">
              {[
                {
                  icon: Mail,
                  k: "Email",
                  node: (
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <a
                        href={`mailto:${email}`}
                        className="font-display truncate text-[18px] font-bold tracking-[-0.02em] hover:text-[#0044FF]"
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
                        className="font-display text-[18px] font-bold tracking-[-0.02em] tabular-nums hover:text-[#0044FF]"
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
                    <span className="font-display text-[18px] font-bold tracking-[-0.02em]">
                      La Sagrera, Barcelona · Presencial o remoto
                    </span>
                  ),
                },
              ].map(({ icon: I, k, node }) => (
                <div
                  key={k}
                  className="min-w-0 rounded-2xl border-[3px] border-[#09090B] bg-white p-5 text-[#09090B] shadow-[6px_6px_0_#0044FF]"
                >
                  <dt className="mb-2 flex items-center gap-2 text-[15px] font-bold tracking-[0.06em] text-[#52525B] uppercase">
                    <I size={15} className="text-[#0044FF]" />
                    {k}
                  </dt>
                  <dd>{node}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Footer en contraste sólido oscuro */}
        <footer className="section-dark t-line t-muted border-t py-6 text-[15px] font-medium sm:text-base">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
            <span>© 2026 Erick Rodríguez · Portfolio</span>
            <span>Marketing · Gestión · Desarrollo Web · ERP · Automatización IA</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
