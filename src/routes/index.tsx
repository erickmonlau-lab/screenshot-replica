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
  Hand,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  ShoppingBag,
  Sparkles,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

import breadpdf from "@/assets/breadpdf.com.png.asset.json";
import diversplas from "@/assets/diversplas.es.png.asset.json";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";
import gesgrama from "@/assets/gesgrama.com.png.asset.json";

import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { StudioHero, type HeroProjectPreview } from "@/components/StudioHero";
import { BigHeading, SectionHeading } from "@/components/SectionHeading";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { SectionTitle } from "@/components/SectionTitle";
import { CerebroBrain } from "@/components/CerebroBrain";
import { GrantBand } from "@/components/GrantBand";
import { AboutSection } from "@/components/AboutSection";
import { FormacionSection } from "@/components/FormacionSection";
import { CursorGlow } from "@/components/CursorGlow";
import { ErpShowcase } from "@/components/ErpShowcase";
import { MetricsBand } from "@/components/MetricsBand";
import { OrderSection } from "@/components/OrderSection";
import { OderaloSection } from "@/components/OderaloSection";
import { FormaSection } from "@/components/FormaSection";
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

const email = "hola.erickrodriguez@gmail.com";
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
    image: "/gesgrama-preview.png",
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
    id: "cubikos",
    index: "04",
    name: "cubikos.cat",
    domain: "cubikos.cat",
    type: "Web a medida",
    status: "Próximamente",
    outcome: "Web a medida para una empresa de montaje de cocinas",
    stack: ["Web a medida", "Próximamente"],
    href: "https://cubikos.cat",
    image: "/cubikos-preview.png",
    description:
      "Web a medida para una empresa de montaje profesional de cocinas en Cataluña, con presupuesto por WhatsApp. Disponible próximamente en cubikos.cat.",
    ctaLabel: "Visitar web",
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
    role: "Prácticas en Marketing Digital",
    place: "Diset Control de Plagas",
    points: [
      "Gestión integral de e-commerce en Shopify y WordPress.",
      "Atención al cliente por WhatsApp Business, derivando a comerciales.",
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

function CopyButton({
  value,
  label,
  dark = false,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const { tr } = useLanguage();

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
      title={tr(`Copiar ${label}`)}
      aria-label={tr(`Copiar ${label}`)}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold transition-all active:scale-95 ${
        copied
          ? "bg-[#10B981] text-white"
          : dark
            ? "border-[3px] border-[#09090B] bg-[#09090B] text-white hover:bg-[#6D28D9]"
            : "t-line t-bg-card2 t-ink border hover:border-[#0044FF] hover:text-[#0044FF]"
      }`}
    >
      {copied ? (
        <>
          <Check size={18} strokeWidth={3} />
          <span className="sr-only">{tr("Copiado")}</span>
        </>
      ) : (
        <>
          <Copy size={17} strokeWidth={2.4} />
          <span className="sr-only">{tr("Copiar")}</span>
        </>
      )}
    </button>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const marqueeText =
  "ERICK RODRÍGUEZ · MARKETING · GESTIÓN · IA · BARCELONA · DISPONIBLE PARA CONTRATACIÓN · 375 H AGENTE DEL CAMBIO · ";

function Index() {
  const { locale, t, tr } = useLanguage();
  const cases = projectCases.map((p) => ({
    ...p,
    type: tr(p.type),
    status: tr(p.status),
    outcome: tr(p.outcome),
    stack: p.stack.map((x) => tr(x)),
    description: tr(p.description),
    ctaLabel: tr(p.ctaLabel),
  }));
  const [heroMode, setHeroMode] = useState<"studio" | "preview">("studio");
  const [activeProjectId, setActiveProjectId] = useState<string>("diversplas");
  const [activeAiPhase, setActiveAiPhase] = useState<string>("memory");
  const [showLiveSystem, setShowLiveSystem] = useState<boolean>(true);

  const selectedAiPhase = aiPhases.find((p) => p.id === activeAiPhase) ?? aiPhases[0]!;

  function handleJumpToProjects(caseId?: string) {
    if (caseId) setActiveProjectId(caseId);
    const target = caseId === "private-erp" ? "erp" : caseId ? `caso-${caseId}` : "proyectos";
    const section = document.getElementById(target);
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
          projects={cases}
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
            {tr(marqueeText)}
          </VelocityMarqueeRow>
        </div>

        <MetricsBand />
        {/* <OrderSection /> eliminada para evitar redundancia de 3 tarjetas sobre 3 tarjetas */}
        <ProcessSection />

        {/* PROYECTOS — 3D Coverflow Gallery */}
        <section id="proyectos" className={`${sectionBase} section-light`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-6 sm:mb-10">
              {(() => {
                const w = t.projects.titleHighlight.split(" ");
                return (
                  <SectionTitle
                    compact
                    word={t.projects.title.replace(/\.$/, "")}
                    sub={w.slice(0, -2).join(" ")}
                    accent={w.slice(-2).join(" ")}
                    className="!mb-4"
                  />
                );
              })()}
              <p className="max-w-[60ch] text-lg leading-snug font-semibold [text-wrap:balance] text-zinc-800 sm:text-xl dark:text-zinc-200">
                {t.projects.subtitle}
              </p>
            </Reveal>
            <div className="mt-4 sm:mt-6">
              <ProjectCarousel
                slides={cases}
                activeId={activeProjectId}
                onChange={setActiveProjectId}
                privateSlide={<ErpShowcase />}
              />
            </div>
          </div>
        </section>

        <OderaloSection />
        <FormaSection />

        {/* CEREBRO: segundo cerebro en Obsidian que la IA lee antes de trabajar */}
        <section
          id="ia"
          className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#6D28D9] py-12 text-white sm:py-14 lg:py-16"
        >
          <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Explicación */}
              <div className="flex flex-col lg:col-span-5">
                <p
                  aria-hidden="true"
                  className="font-display text-[clamp(3.4rem,7.4vw,7.4rem)] leading-[0.85] font-black tracking-[-0.04em] text-white uppercase [text-shadow:0.045em_0.045em_0_#09090B]"
                >
                  {t.cerebro.title}
                </p>
                <h2 className="font-display mt-6 text-[clamp(2.1rem,3.4vw,3.2rem)] leading-[1.02] font-bold tracking-[-0.04em]">
                  {t.cerebro.headline}
                  <span className="mt-3 block">
                    <span className="inline-block rounded-lg bg-[#09090B] px-3 py-0.5">
                      {t.cerebro.howIWork}
                    </span>
                  </span>
                </h2>
                <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed font-semibold">
                  {t.cerebro.description}
                </p>

                <ol className="mt-7 grid gap-3.5">
                  {[
                    [t.cerebro.step1Title, t.cerebro.step1Desc],
                    [t.cerebro.step2Title, t.cerebro.step2Desc],
                    [t.cerebro.step3Title, t.cerebro.step3Desc],
                  ].map(([title, desc], i) => (
                    <li
                      key={title}
                      className="flex items-center gap-4 rounded-xl border-[3px] border-[#09090B] bg-white p-3 text-[#09090B]"
                    >
                      <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-[3px] border-[#09090B] bg-[#6D28D9] text-[22px] font-black text-white">
                        {i + 1}
                      </span>
                      <p className="text-[16px] leading-snug font-semibold text-[#52525B]">
                        <span className="font-display block text-[20px] font-bold text-[#09090B]">
                          {title}
                        </span>
                        {desc}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mi cerebro: cada punto es una nota */}
              <div className="lg:col-span-7">
                <div className="h-[380px] sm:h-[480px] lg:h-[520px]">
                  <CerebroBrain />
                </div>
                <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {(
                    [
                      ["#09090B", "Índice"],
                      ["#F59E0B", "Proyecto"],
                      ["#FFFFFF", "Skill"],
                      ["#C4B5FD", "Regla o nota"],
                    ] as const
                  ).map(([c, name]) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-white px-3 py-1 text-[15px] font-bold text-[#09090B]"
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border-[2.5px] border-[#09090B]"
                        style={{ background: c }}
                      />
                      {tr(name)}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      [Layers, "Un punto, una nota", "Decisión, regla o cliente."],
                      [Hand, "Arrástralos", "Arrastran a sus vecinos."],
                      [Zap, "La luz es la IA", "Lee siguiendo los enlaces."],
                    ] as const
                  ).map(([Icon, title, text]) => (
                    <li
                      key={title}
                      className="flex items-start gap-3 rounded-2xl border-[3px] border-[#09090B] bg-white p-3 text-[#09090B] shadow-[4px_4px_0_#09090B]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] bg-[#F59E0B]">
                        <Icon size={20} strokeWidth={2.8} />
                      </span>
                      <span className="block leading-tight">
                        <span className="font-display block text-[17px] font-bold">
                          {tr(title)}
                        </span>
                        <span className="mt-0.5 block text-[15px] font-semibold text-[#3F3F46]">
                          {tr(text)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section
          id="stack"
          className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] py-14 text-white sm:py-16"
        >
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4">
              <h2 className="font-display text-[clamp(2.2rem,4.2vw,4rem)] leading-[1] font-bold tracking-[-0.04em] whitespace-nowrap">
                {tr("Con qué")}{" "}
                <span className="inline-block rounded-lg border-[3px] border-white bg-[#6D28D9] px-3 pt-0.5 pb-2 leading-[1.15]">
                  {tr("trabajo.")}
                </span>
              </h2>
              <p
                aria-hidden="true"
                className="font-display text-[clamp(4.5rem,13vw,11.5rem)] leading-[0.8] font-bold tracking-[-0.04em] text-white uppercase [text-shadow:0.04em_0.04em_0_#6D28D9]"
              >
                {tr("Stack")}
              </p>
            </div>
          </div>
          <div className="mt-9 space-y-3" aria-label={tr("Herramientas que uso")}>
            {[technicalTools.slice(0, 8), technicalTools.slice(8)].map((row, r) => (
              <VelocityMarqueeRow key={r} baseVelocity={r === 0 ? -1.8 : 1.8}>
                {row.map((t) => (
                  <span
                    key={t.name}
                    className="mr-5 mb-2 inline-flex items-center gap-3 rounded-full border-[3px] border-[#09090B] bg-white px-6 py-3 text-[#09090B] shadow-[5px_5px_0_#6D28D9]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full border-2 border-[#09090B]"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="font-display text-[22px] leading-none font-bold tracking-[-0.03em]">
                      {t.name === "Agentes IA" ? tr(t.name) : t.name}
                    </span>
                    <span className="text-[15px] font-semibold text-[#52525B]">
                      {tr(t.category)}
                    </span>
                  </span>
                ))}
              </VelocityMarqueeRow>
            ))}
          </div>
        </section>

        {/* TRAYECTORIA — Sobre Mí / About Me */}
        <section
          id="trayectoria"
          className="t-bg-page t-ink t-line section-light scroll-mt-[62px] border-t pb-16 sm:pb-20"
        >
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <AboutSection experience={experience} education={education} cvUrl={cvPdf.url} />
          </div>
        </section>

        <FormacionSection courses={education} practices={experience} />

        <GrantBand />

        {/* CONTACTO */}
        <section
          id="contacto"
          className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-white py-14 text-[#09090B] sm:py-16"
        >
          <div className="mx-auto grid w-full max-w-[1380px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-4 py-1.5 text-[16px] font-bold tracking-[0.08em] text-white uppercase">
                  {t.contact.badge}
                </span>
                <span className="inline-flex items-center gap-2.5 rounded-full border-[3px] border-[#09090B] bg-white px-4 py-1.5 text-[16px] font-bold text-[#09090B] shadow-[4px_4px_0_#09090B]">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-[#09090B] bg-[#6D28D9]" />
                  Barcelona
                </span>
              </div>
              <Reveal>
                <h2 className="font-display mt-6 text-[clamp(3rem,6.7vw,6.6rem)] leading-[0.9] font-bold tracking-[-0.06em]">
                  {t.contact.title}
                  <span className="mt-3 block">
                    <span className="rounded-xl bg-[#6D28D9] px-4 py-[0.02em] leading-[1.3] text-white [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                      {t.contact.titleHighlight}
                    </span>
                  </span>
                </h2>
              </Reveal>
              <p className="mt-5 max-w-[44ch] text-lg leading-snug font-semibold text-[#27272A] sm:text-xl">
                {t.contact.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.1}>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-[3px] border-[#09090B] bg-[#6D28D9] px-7 py-3.5 text-base font-bold text-white shadow-[6px_6px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
                  >
                    <WhatsAppIcon size={20} />
                    <span>{t.contact.whatsapp}</span>
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </a>
                </Magnetic>
                <a
                  href={cvPdf.url}
                  download="Erick-Rodriguez-CV.pdf"
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border-[3px] border-[#09090B] bg-white px-7 py-3.5 text-base font-bold text-[#09090B] shadow-[6px_6px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
                >
                  <span>{t.contact.downloadCv}</span>
                  <Download size={16} />
                </a>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <div className="min-w-0 overflow-hidden rounded-[24px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[12px_12px_0_#09090B]">
                <div className="flex items-center gap-4 border-b-[3px] border-[#09090B] bg-[#6D28D9] p-5 text-white">
                  <img
                    src="/erick-avatar-hq.png"
                    alt="Erick Rodríguez"
                    className="h-[84px] w-[84px] shrink-0 rounded-2xl border-[3px] border-[#09090B] bg-[#A78BFA] object-cover object-[50%_20%] shadow-[3px_3px_0_#09090B]"
                  />
                  <div>
                    <p className="font-display text-[28px] leading-none font-bold tracking-[-0.04em]">
                      Erick Rodríguez
                    </p>
                    <p className="mt-2 text-[15px] font-bold tracking-[0.08em] text-white/90 uppercase">
                      {t.contact.direct}
                    </p>
                  </div>
                </div>

                <dl className="divide-y-[3px] divide-[#09090B]">
                  {[
                    {
                      icon: Mail,
                      k: tr("Email"),
                      node: (
                        <div className="flex min-w-0 items-center justify-between gap-3">
                          <a
                            href={`mailto:${email}`}
                            className="font-display min-w-0 text-[clamp(16px,1.5vw,19px)] font-bold tracking-[-0.02em] break-all hover:text-[#6D28D9]"
                          >
                            {email}
                          </a>
                          <CopyButton value={email} label="correo" dark />
                        </div>
                      ),
                    },
                    {
                      icon: WhatsAppIcon,
                      k: tr("WhatsApp y teléfono"),
                      node: (
                        <div className="flex min-w-0 items-center justify-between gap-3">
                          <a
                            href={whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-[19px] font-bold tracking-[-0.02em] tabular-nums hover:text-[#6D28D9]"
                          >
                            {phoneDisplay}
                          </a>
                          <CopyButton value={phoneDisplay} label="teléfono" dark />
                        </div>
                      ),
                    },
                    {
                      icon: MapPin,
                      k: tr("Ubicación"),
                      node: (
                        <span className="block">
                          <span className="font-display block text-[19px] font-bold tracking-[-0.02em]">
                            La Sagrera, Barcelona
                          </span>
                          <span className="mt-0.5 block text-[16px] font-semibold text-[#52525B]">
                            {tr("Presencial, híbrido o remoto")}
                          </span>
                        </span>
                      ),
                    },
                  ].map(({ icon: I, k, node }) => (
                    <div key={k} className="flex items-center gap-4 p-5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] bg-[#F4F4F5] text-[#6D28D9]">
                        <I size={22} strokeWidth={2.4} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <dt className="mb-1 text-[17px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                          {k}
                        </dt>
                        <dd>{node}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Footer en contraste sólido oscuro */}
        <footer className="section-dark t-line t-muted border-t py-6 text-[15px] font-medium sm:text-base">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
            <span>© 2026 Erick Rodríguez · Portfolio</span>
            <span>{tr("Marketing · Gestión · Desarrollo Web · ERP · Automatización IA")}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
