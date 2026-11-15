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
    if (caseId) setActiveProjectId(caseId);
    const section = document.getElementById("proyectos");
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 62;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  const sectionBase =
    "t-bg-page t-ink t-line scroll-mt-[62px] border-t lg:flex lg:min-h-[calc(100dvh-62px)] lg:flex-col lg:justify-center";

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
            baseVelocity={-2.0}
            className="font-display text-[11px] leading-none font-bold tracking-[0.16em] sm:text-xs"
          >
            {marqueeText}
          </VelocityMarqueeRow>
        </div>

        {/* METRICAS */}
        <section
          id="metricas"
          className="t-bg-page t-ink scroll-mt-[62px] py-14 lg:py-20"
          aria-label="Resultados clave"
        >
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-8">
              <SectionHeading
                eyebrow="Impacto y garantía"
                title="Producción real,"
                accentTitle="resultados medibles."
                description="Experiencia comprobada en empresa, webs propias posicionadas en Google y acreditación oficial bonificada."
              />
            </Reveal>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  n: "01",
                  icon: Clock,
                  tag: "Experiencia real",
                  value: (
                    <>
                      <Counter to={1000} prefix="+" /> <span className="t-accent text-2xl">h</span>
                    </>
                  ),
                  text: "De experiencia acumulada entre prácticas en empresa, producto propio y desarrollo web en producción.",
                },
                {
                  n: "02",
                  icon: TrendingUp,
                  tag: "SEO en vivo",
                  value: (
                    <>
                      Top{" "}
                      <span className="t-accent">
                        <Counter to={1} />
                      </span>
                    </>
                  ),
                  text: "En Google en búsquedas de extraescolares en Barcelona con diversplas.es, web desarrollada por mí y recién lanzada.",
                },
                {
                  n: "03",
                  icon: Award,
                  tag: "Subvención empresa",
                  value: (
                    <>
                      <Counter to={375} /> <span className="t-accent text-2xl">h</span>
                    </>
                  ),
                  text: "De acreditación oficial como Agente del Cambio Tecnológico: la empresa que me contrate accede a subvenciones salariales directas.",
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal
                    key={stat.n}
                    delay={i * 0.08}
                    className="t-line t-bg-card relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7"
                  >
                    <span
                      aria-hidden="true"
                      className="t-muted font-display pointer-events-none absolute top-3 right-5 text-5xl font-black tracking-tighter"
                    >
                      {stat.n}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0044FF] text-white">
                        <Icon size={20} strokeWidth={2.2} />
                      </div>
                      <span className="t-line t-bg-card2 t-ink rounded-full border px-3 py-1 text-[10.5px] font-bold tracking-[0.12em] uppercase">
                        {stat.tag}
                      </span>
                    </div>
                    <div className="t-line mt-6 border-t pt-5">
                      <strong className="t-ink font-display block text-4xl font-extrabold tracking-[-0.04em] tabular-nums sm:text-5xl">
                        {stat.value}
                      </strong>
                      <p className="t-muted mt-2.5 text-sm leading-relaxed">{stat.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROYECTOS — coverflow gallery */}
        <section id="proyectos" className={`${sectionBase} py-5 2xl:py-12`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-5 2xl:mb-8">
              <SectionHeading
                eyebrow="Proyectos seleccionados"
                title="Webs en producción."
                accentTitle="Y dos sistemas en directo."
                description="Una colección de webs reales, plataformas propias y proyectos confidenciales que enseño en directo."
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

        {/* TRABAJO CON IA */}
        <section id="ia" className={`${sectionBase} py-5 2xl:py-12`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-4 2xl:mb-6">
              <SectionHeading
                eyebrow="Trabajo con IA · Capacidades"
                title="Desarrollo e IA integrados"
                accentTitle="en el ciclo de producto."
                description="Haz scroll o selecciona cada bloque para ver el enrutador de modelos, flujos n8n, generación en AI Studio / Stitch y memoria en Obsidian."
              />
            </Reveal>

            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 2xl:gap-6">
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
                      className={`relative flex w-full flex-col justify-between gap-1.5 rounded-2xl border-2 p-3.5 text-left transition-colors 2xl:gap-2 2xl:p-5 ${
                        active
                          ? "border-[#0044FF] bg-[#0044FF] text-white"
                          : "t-line t-bg-card t-ink hover:border-[#0044FF]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold 2xl:h-7 2xl:w-7 2xl:text-xs ${
                              active ? "bg-white text-[#0044FF]" : "t-bg-ink t-on-ink"
                            }`}
                          >
                            {phase.num}
                          </span>
                          <span
                            className={`truncate font-mono text-[10px] font-bold tracking-wider uppercase 2xl:text-[11px] ${
                              active ? "text-blue-100" : "t-muted"
                            }`}
                          >
                            {phase.kicker}
                          </span>
                        </div>
                        <h3 className="font-display mt-1.5 text-[15px] font-bold tracking-[-0.02em] 2xl:mt-2 2xl:text-lg">
                          {phase.title}
                        </h3>
                        <p
                          className={`mt-0.5 text-xs leading-snug 2xl:mt-1 2xl:text-[13.5px] 2xl:leading-relaxed ${
                            active ? "text-blue-50" : "t-muted"
                          }`}
                        >
                          {phase.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-0.5 2xl:gap-1.5">
                        {phase.tags.map((t) => (
                          <span
                            key={t}
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold 2xl:px-2.5 2xl:text-[11px] ${
                              active
                                ? "border-white bg-white text-[#0044FF]"
                                : "t-line t-bg-card2 t-ink"
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

              <div className="lg:col-span-6">
                <div className="macos-window-frame flex h-full flex-col justify-between rounded-[20px] p-3.5 text-white sm:p-4 2xl:rounded-[26px] 2xl:p-6">
                  <div className="mb-2.5 flex items-center justify-between border-b border-[#303240] pb-2.5 2xl:mb-4 2xl:pb-3.5">
                    <div>
                      <span className="text-[10.5px] font-bold tracking-wider text-[#60A5FA] uppercase 2xl:text-xs">
                        Sistema en vivo · Fase {selectedAiPhase.num}
                      </span>
                      <h4 className="font-display mt-0.5 text-base font-extrabold tracking-[-0.015em] text-white 2xl:text-xl">
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

            <Reveal delay={0.08}>
              <div
                id="acreditacion-375h"
                className="relative z-10 mt-3 flex scroll-mt-[62px] flex-col justify-between gap-3 overflow-hidden rounded-2xl bg-[#0044FF] px-5 py-3 text-white sm:px-6 lg:flex-row lg:items-center 2xl:mt-6 2xl:px-8 2xl:py-5"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-[#0044FF] uppercase 2xl:px-3 2xl:text-[11px]">
                    Subvenciones salariales directas para empresa
                  </span>
                  <h3 className="font-display mt-1 text-base font-extrabold tracking-[-0.02em] sm:text-lg lg:text-xl 2xl:mt-1.5 2xl:text-2xl">
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
                    className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-extrabold tracking-wider text-[#09090B] uppercase transition-colors hover:bg-[#09090B] hover:text-white 2xl:min-h-[48px] 2xl:px-6 2xl:py-3"
                  >
                    <span>Consultar contratación</span>
                    <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TRAYECTORIA */}
        <section id="trayectoria" className={`${sectionBase} py-7 2xl:py-12`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <Reveal className="mb-4 2xl:mb-6">
              <SectionHeading
                eyebrow="Trayectoria y perfil"
                title="Perfil híbrido."
                accentTitle="Código, negocio y ejecución."
                description="Desarrollo web, automatización IA, marketing digital y gestión administrativa con más de 1.000 h reales en Barcelona."
              />
            </Reveal>

            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 2xl:gap-6">
              <div className="lg:col-span-5">
                <div className="t-bg-card flex h-full flex-col justify-between gap-3 rounded-2xl border-2 border-current p-4 shadow-[6px_6px_0px_currentColor] 2xl:gap-4 2xl:rounded-3xl 2xl:p-5">
                  <div className="relative overflow-hidden rounded-xl bg-[#09090B] p-3.5 text-white 2xl:p-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <img
                          src="/erick-portrait-studio.png"
                          alt="Erick Rodríguez"
                          loading="lazy"
                          className="h-16 w-16 rounded-xl bg-[#0044FF] object-cover object-top 2xl:h-20 2xl:w-20"
                        />
                        <span className="absolute -right-1.5 -bottom-1.5 rounded-md bg-[#0044FF] px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-white uppercase">
                          BCN
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-[#60A5FA] uppercase">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          <span>La Sagrera · Barcelona</span>
                        </span>
                        <h3 className="font-display mt-0.5 text-lg font-extrabold tracking-[-0.03em] text-white 2xl:text-2xl">
                          Erick Rodríguez
                        </h3>
                        <p className="text-xs font-medium text-zinc-300">
                          Web, Automatización IA &amp; Negocio
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#232635] pt-2.5 text-center 2xl:mt-4 2xl:pt-3">
                      {[
                        ["+1.000 h", "Experiencia"],
                        ["375 h", "Subvención"],
                        ["Top 1", "Google SEO"],
                      ].map(([v, l]) => (
                        <div key={l} className="rounded-lg bg-[#14161F] px-2 py-1.5">
                          <span className="font-display block text-sm font-extrabold text-white 2xl:text-base">
                            {v}
                          </span>
                          <span className="block text-[9.5px] font-semibold tracking-wider text-zinc-400 uppercase">
                            {l}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="t-muted text-xs leading-relaxed 2xl:text-[13.5px]">
                      Combino desarrollo web e IA con base en marketing digital y gestión: construyo
                      la solución completa y la llevo a producción sin depender de terceros.
                    </p>
                    <div className="mt-2.5 grid grid-cols-2 gap-1.5 2xl:mt-3.5">
                      <div className="t-line t-bg-card2 t-ink flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold">
                        <Sparkles size={12} className="shrink-0 text-[#0044FF]" />
                        <span>Agente Cambio 375 h</span>
                      </div>
                      <div className="t-line t-bg-card2 t-ink flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold">
                        <Wrench size={12} className="shrink-0 text-[#0044FF]" />
                        <span>ES / CA nativos · B2 EN</span>
                      </div>
                    </div>
                    <div className="mt-2.5 2xl:mt-3.5">
                      <span className="t-muted block font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                        Stack principal
                      </span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {coreStackPills.map((tool) => (
                          <span
                            key={tool}
                            className="t-line t-bg-card2 t-ink rounded-md border px-2 py-0.5 text-[10px] font-bold 2xl:px-2.5 2xl:text-[11px]"
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
                    className="t-bg-ink t-on-ink inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] uppercase transition-transform hover:scale-[1.02] 2xl:min-h-[46px]"
                  >
                    <span>Descargar CV en PDF</span>
                    <Download size={14} />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 2xl:gap-4">
                <div className="flex flex-col justify-between gap-2 2xl:gap-3">
                  <div className="flex items-center justify-between px-0.5">
                    <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0044FF] uppercase">
                      01 · Experiencia
                    </span>
                    <span className="t-muted text-[11px] font-bold">+1.000 h</span>
                  </div>
                  {experience.map((item) => (
                    <article
                      key={`${item.place}-${item.period}`}
                      className="t-line t-bg-card flex flex-1 flex-col justify-between rounded-xl border p-3 2xl:rounded-2xl 2xl:p-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="rounded-full bg-[#0044FF] px-2 py-0.5 text-[10px] font-bold text-white">
                            {item.period}
                          </span>
                          <span className="t-muted text-[10.5px] font-bold">{item.place}</span>
                        </div>
                        <h3 className="t-ink font-display mt-1.5 flex items-center gap-2 text-[13px] font-extrabold tracking-[-0.02em] 2xl:text-[15px]">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#0044FF] text-white">
                            <Briefcase size={11} />
                          </span>
                          <span>{item.role}</span>
                        </h3>
                        <ul className="t-muted mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-snug 2xl:mt-1.5 2xl:text-xs">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col justify-between gap-2 2xl:gap-3">
                  <div className="flex items-center justify-between px-0.5">
                    <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#0044FF] uppercase">
                      02 · Formación oficial
                    </span>
                    <span className="t-muted text-[11px] font-bold">Barcelona</span>
                  </div>
                  {education.map((item) => (
                    <article
                      key={item.title}
                      className="t-line t-bg-card flex flex-1 flex-col justify-between rounded-xl border p-3 2xl:rounded-2xl 2xl:p-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="rounded-full bg-[#0044FF] px-2 py-0.5 text-[10px] font-bold text-white">
                            {item.period}
                          </span>
                          <span className="t-muted text-[10.5px] font-bold">{item.place}</span>
                        </div>
                        <h3 className="t-ink font-display mt-1.5 flex items-center gap-2 text-[13px] font-extrabold tracking-[-0.02em] 2xl:text-[15px]">
                          <span className="t-bg-ink t-on-ink flex h-5 w-5 shrink-0 items-center justify-center rounded-md">
                            <GraduationCap size={11} />
                          </span>
                          <span>{item.title}</span>
                        </h3>
                        <p className="t-muted mt-1 text-[11px] leading-snug 2xl:text-xs">
                          {item.summary}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className={`${sectionBase} py-10 2xl:py-16`}>
          <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-6">
                <p className="t-muted mb-3 font-mono text-[10.5px] font-bold tracking-[0.28em] uppercase">
                  Hablemos · Disponible en Barcelona
                </p>
                <h2 className="t-ink font-display text-[44px] leading-[0.92] font-black tracking-[-0.04em] uppercase sm:text-6xl lg:text-[64px] 2xl:text-[88px]">
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
                <p className="t-muted mt-4 max-w-lg text-sm leading-relaxed 2xl:text-base">
                  Busco aportar mi perfil híbrido de desarrollo web, IA y negocio — o enseñarte en
                  persona la demo del ERP y los sistemas en producción.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={cvPdf.url}
                    download="Erick-Rodriguez-CV.pdf"
                    className="t-bg-ink t-on-ink inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold tracking-[0.12em] uppercase transition-transform hover:scale-[1.03]"
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
                      <span className="t-muted block font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
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
                      <span className="t-muted block font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
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
                    <span className="t-muted block font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
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

            <footer className="t-line t-muted mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5 text-xs font-medium">
              <span>© 2026 Erick Rodríguez · Portfolio</span>
              <span>Desarrollo Web · ERPs a Medida · Automatización IA</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
