import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  GitBranch,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Counter,
  Reveal,
  Magnetic,
  AgentFlow,
  ModelCycle,
  CodeFlow,
  MemoryFlow,
} from "@/components/portfolio-motion";
import portrait from "@/assets/erick-portrait-final.png.asset.json";
import cv from "@/assets/erick-rodriguez-cv.pdf.asset.json";
import diversplas from "@/assets/diversplas.es.png.asset.json";
import gesgrama from "@/assets/gesgrama.com.png.asset.json";
import breadpdf from "@/assets/breadpdf.com.png.asset.json";

const email = "hola.erickrodriguez@gmail.com";
const whatsapp = "https://wa.me/34640630459";
const demo = `mailto:${email}?subject=Demo%20en%20persona%20%E2%80%94%20ERP%20y%20App`;

const projects = [
  {
    id: "diversplas",
    indexLabel: "01 / 04",
    name: "diversplas.es",
    tagTitle: "DIVERSPLAS.ES",
    tagLine1: "EXTRAESCOLARES · BCN",
    tagLine2: "WEB & SEO · TOP 1 GOOGLE",
    tagYear: "2026",
    image: diversplas.url,
    status: "TOP 1 EN GOOGLE",
    description:
      "Web de extraescolares en Barcelona. Diseño, desarrollo y SEO: recién lanzada y ya en el Top 1 de Google.",
    type: "01 / WEB & SEO",
    tone: "sky",
    href: "https://diversplas.es",
    ctaLabel: "Visitar diversplas.es",
    isPrivate: false,
  },
  {
    id: "gesgrama",
    indexLabel: "02 / 04",
    name: "gesgrama.com",
    tagTitle: "GESGRAMA.COM",
    tagLine1: "GRUPO INMOBILIARIO",
    tagLine2: "WEB CORPORATIVA A MEDIDA",
    tagYear: "2026",
    image: gesgrama.url,
    status: "EN PRODUCCIÓN",
    description:
      "Web corporativa a medida. Una presencia digital diseñada para el negocio, recién lanzada y posicionándose en Google.",
    type: "02 / WEB CORPORATIVA",
    tone: "lime",
    href: "https://gesgrama.com",
    ctaLabel: "Visitar gesgrama.com",
    isPrivate: false,
  },
  {
    id: "breadpdf",
    indexLabel: "03 / 04",
    name: "breadpdf.com",
    tagTitle: "BREADPDF.COM",
    tagLine1: "51 HERRAMIENTAS PDF",
    tagLine2: "PRODUCTO DIGITAL PROPIO",
    tagYear: "2026",
    image: breadpdf.url,
    status: "PRODUCTO PROPIO",
    description:
      "Mi plataforma para trabajar con PDF. Un producto digital real, activo y con sus páginas indexadas en Google.",
    type: "03 / PRODUCTO DIGITAL",
    tone: "orange",
    href: "https://breadpdf.com",
    ctaLabel: "Visitar breadpdf.com",
    isPrivate: false,
  },
  {
    id: "erp-app",
    indexLabel: "04 / 04",
    name: "ERP & App",
    tagTitle: "ERP & APP",
    tagLine1: "SOFTWARE A MEDIDA",
    tagLine2: "DEMO PRIVADA · BARCELONA",
    tagYear: "2026",
    image: "",
    status: "DEMO PRIVADA · BARCELONA",
    description:
      "Dos soluciones reales (ERP empresarial a medida + aplicación) que puedo mostrarte en una demo en vivo, en Barcelona.",
    type: "04 / SOFTWARE A MEDIDA",
    tone: "ink",
    href: demo,
    ctaLabel: "Agendar demostración",
    isPrivate: true,
  },
];

const experience = [
  {
    company: "Diset Control de Plagas",
    date: "2025–2026 · 516 h",
    title: "Marketing y Gestión Comercial",
    tasks: [
      "E-commerce: montaje y mejora de catálogos en Shopify y WordPress, con fichas más claras y una base técnica sólida.",
      "Ventas y soporte por WhatsApp Business, con respuestas ágiles y trato cercano.",
      "Materiales gráficos y prototipos en Figma y Canva: probar, pulir y mejorar.",
    ],
  },
  {
    company: "Ferretería FIMSA · Monlau",
    date: "2023–2024 · 416 h",
    title: "Gestión Administrativa y Logística",
    tasks: [
      "Facturación, albaranes y documentación contable con trazabilidad.",
      "Control de stock físico y digital, optimizando recepción y despacho.",
      "Coordinación con proveedores y clientes y resolución de incidencias.",
    ],
  },
  {
    company: "Escuela Wagner · Barcelona",
    date: "2023–2025",
    title: "Monitor de Fútbol Base",
    tasks: [
      "Planificación de entrenamientos y liderazgo de equipos de niños y jóvenes.",
      "Comunicación directa con las familias sobre el progreso de los jugadores.",
    ],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Erick Rodríguez — Web, Apps y Automatización con IA" },
      {
        name: "description",
        content:
          "Desarrollador web en Barcelona. Webs, apps, ERP a medida y automatización con IA: de la idea a producción. Descubre mis proyectos reales.",
      },
      {
        property: "og:title",
        content: "Erick Rodríguez — Soluciones digitales de principio a fin",
      },
      {
        property: "og:description",
        content:
          "Desarrollo web, apps, automatización con IA y marketing digital. Proyectos reales y demos en persona en Barcelona.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <>
      <Button
        variant="portfolio"
        data-style="copy"
        onClick={copy}
        title={`Copiar ${label}`}
        aria-label={`Copiar ${label}`}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
      <span className="sr-only" role="status">
        {copied
          ? `${label} copiado`
          : failed
            ? "No se pudo copiar. Selecciona el texto para copiarlo."
            : ""}
      </span>
    </>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const reduced = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  // Pendulum swing for the hanging Designer/Builder ID Lanyard
  const badgeRotateRaw = useMotionValue(0);
  const badgeRotate = useSpring(badgeRotateRaw, { stiffness: 140, damping: 14 });

  // Phase 1 -> Phase 2 scroll transforms (Studio Hero -> 3D Laptop Showcase)
  const heroTitleY = useTransform(smoothProgress, [0, 0.32], ["0%", "-115%"]);
  const heroTitleOpacity = useTransform(smoothProgress, [0, 0.26], [1, 0]);

  const portraitY = useTransform(smoothProgress, [0, 0.36], ["0%", "28%"]);
  const portraitScale = useTransform(smoothProgress, [0, 0.36], [1, 0.86]);
  const portraitOpacity = useTransform(smoothProgress, [0.16, 0.36], [1, 0]);

  const leftDeskX = useTransform(smoothProgress, [0, 0.3], ["0%", "-45%"]);
  const leftDeskOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  const lanyardX = useTransform(smoothProgress, [0, 0.32], ["0%", "45%"]);
  const lanyardY = useTransform(smoothProgress, [0, 0.32], ["0%", "-25%"]);
  const lanyardOpacity = useTransform(smoothProgress, [0, 0.26], [1, 0]);

  // Laptop zooms from the studio desk into center-stage
  const laptopScale = useTransform(smoothProgress, [0.14, 0.44], [0.38, 1]);
  const laptopY = useTransform(smoothProgress, [0.14, 0.44], [210, 12]);
  const laptopX = useTransform(smoothProgress, [0.14, 0.44], [-180, 0]);
  const laptopOpacity = useTransform(smoothProgress, [0.12, 0.28], [0, 1]);
  const screenContentOpacity = useTransform(smoothProgress, [0.34, 0.46], [0, 1]);
  const centerBrandOpacity = useTransform(smoothProgress, [0.28, 0.42], [0, 1]);

  // Update active case on scroll once inside the laptop showcase range (0.45 -> 0.96)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v < 0.42) {
        if (manualOverride) setManualOverride(false);
        return;
      }
      if (manualOverride) return;
      const normalized = Math.min(0.999, Math.max(0, (v - 0.45) / 0.5));
      const idx = Math.floor(normalized * projects.length);
      setActiveCase(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, manualOverride]);

  function selectCase(nextIndex: number) {
    setManualOverride(true);
    setActiveCase((nextIndex + projects.length) % projects.length);
  }

  function jumpToLaptopShowcase() {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const targetScroll = absoluteTop + stageRef.current.offsetHeight * 0.48;
    window.scrollTo({ top: targetScroll, behavior: reduced ? "auto" : "smooth" });
  }

  const currentProject = projects[activeCase] ?? projects[0];

  const links = [
    { label: "estudio", href: "#inicio" },
    { label: "proyectos", href: "#proyectos" },
    { label: "mi enfoque", href: "#enfoque" },
    { label: "sobre mí", href: "#sobre-mi" },
  ];

  return (
    <main
      className="portfolio"
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch") return;
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        badgeRotateRaw.set(normX * -3.5);
      }}
    >
      {/* SCROLL-DRIVEN STUDIO HERO + 3D MACBOOK PRO SHOWCASE (HALDOREN STYLE) */}
      <div ref={stageRef} className="studio-scroll-track" id="inicio">
        <div className="studio-sticky-viewport">
          <div className="studio-Noise" aria-hidden="true" />
          <div className="studio-glow" aria-hidden="true" />

          {/* TOP FLOATING STUDIO PILL NAVIGATION */}
          <header className="studio-nav">
            <div className="studio-nav-group">
              <a href="#inicio" className="studio-pill-btn">
                estudio
              </a>
              <button
                type="button"
                onClick={jumpToLaptopShowcase}
                className="studio-pill-btn"
              >
                proyectos
              </button>
              <a href="#enfoque" className="studio-pill-btn studio-pill-hide-mobile">
                mi enfoque
              </a>
            </div>

            <motion.a
              href="#inicio"
              className="studio-center-brand"
              style={{ opacity: reduced ? 1 : centerBrandOpacity }}
            >
              ERICK RODRÍGUEZ
            </motion.a>

            <div className="studio-nav-group">
              <a href="#sobre-mi" className="studio-pill-btn studio-pill-hide-mobile">
                sobre mí
              </a>
              <a href="#contacto" className="studio-pill-btn studio-pill-cta">
                <span className="status-dot" /> hablemos de tu proyecto
              </a>
              <button
                type="button"
                className="studio-pill-btn studio-mobile-trigger"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

            {menuOpen && (
              <nav className="studio-mobile-menu" aria-label="Navegación móvil">
                {links.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="#contacto" onClick={() => setMenuOpen(false)}>
                  contacto
                </a>
              </nav>
            )}
          </header>

          {/* PHASE 1: GIANT METALLIC STUDIO TYPOGRAPHY + HANDWRITTEN SCRIPT */}
          <motion.div
            className="studio-giant-title-wrap"
            style={
              reduced
                ? undefined
                : {
                    y: heroTitleY,
                    opacity: heroTitleOpacity,
                  }
            }
          >
            <h1 className="studio-giant-title" aria-label="Erick Rodríguez">
              <span className="studio-giant-word">ERICK</span>
            </h1>
            <motion.span
              className="studio-handwritten"
              initial={reduced ? false : { opacity: 0, scale: 0.92, rotate: -7 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              web · apps · ia
            </motion.span>
          </motion.div>

          {/* PHASE 1: CENTER STUDIO PORTRAIT */}
          <motion.div
            className="studio-portrait-stage"
            style={
              reduced
                ? undefined
                : {
                    y: portraitY,
                    scale: portraitScale,
                    opacity: portraitOpacity,
                  }
            }
          >
            <img
              className="studio-portrait-img"
              src={portrait.url}
              alt="Erick Rodríguez"
            />
          </motion.div>

          {/* PHASE 1: LEFT STUDIO DESK & VALUE PROP WORKSTATION */}
          <motion.div
            className="studio-left-workstation"
            style={
              reduced
                ? undefined
                : {
                    x: leftDeskX,
                    opacity: leftDeskOpacity,
                  }
            }
          >
            <div className="studio-workstation-card">
              <div className="studio-card-rivets" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="studio-meta-tag">
                <span>BARCELONA, ESPAÑA ↗</span>
                <span>+1.000 H EXP. REAL</span>
              </div>
              <h2>
                De la idea a producción.
                <br />
                Sin depender de terceros.
              </h2>
              <p>
                Puedo crear la web, app, ERP o sistema con IA que necesite tu empresa, desde el
                diseño hasta producción.
              </p>
              <div className="studio-hero-actions">
                <button
                  type="button"
                  onClick={jumpToLaptopShowcase}
                  className="studio-action-primary"
                >
                  Ver Proyectos en Producción <ArrowDown size={15} />
                </button>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-action-secondary"
                >
                  Hablemos <MessageCircle size={15} />
                </a>
              </div>
              <a href={demo} className="studio-demo-link">
                Solicitar Demo en Persona (ERP & App) <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Studio Desk Surface Prop */}
            <div className="studio-desk-surface" aria-hidden="true">
              <div className="studio-desk-mug" />
              <div className="studio-desk-folders">
                <span />
                <span />
              </div>
              <div className="studio-desk-top" />
            </div>
          </motion.div>

          {/* PHASE 1: RIGHT HANGING LANYARD ID BADGE (DESIGNER / BUILDER CARD) */}
          <motion.div
            className="studio-lanyard-assembly"
            style={
              reduced
                ? undefined
                : {
                    x: lanyardX,
                    y: lanyardY,
                    opacity: lanyardOpacity,
                    rotate: badgeRotate,
                  }
            }
          >
            {/* White Woven Lanyard Strap */}
            <div className="lanyard-strap" aria-hidden="true" />
            {/* Metallic Silver Lobster Clasp */}
            <svg
              className="lanyard-clasp"
              viewBox="0 0 64 78"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="10"
                y="2"
                width="44"
                height="18"
                rx="8"
                stroke="#D8E2DC"
                strokeWidth="5"
                fill="url(#metalGrad)"
              />
              <rect x="23" y="16" width="18" height="14" rx="3" fill="url(#metalGrad)" />
              <path
                d="M26 30 H38 L42 64 C42 70 36 74 32 74 C28 74 22 70 22 64 Z"
                fill="url(#metalGrad)"
                stroke="#8FA199"
                strokeWidth="2"
              />
              <circle cx="32" cy="62" r="4" fill="#18392D" />
              <defs>
                <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F5F8F6" />
                  <stop offset="45%" stopColor="#B8C7C0" />
                  <stop offset="75%" stopColor="#6E8078" />
                  <stop offset="100%" stopColor="#DFEAE4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Translucent PVC Badge Holder Sleeve */}
            <div className="lanyard-pvc-sleeve">
              <div className="lanyard-punch-holes" aria-hidden="true">
                <span />
                <i />
                <span />
              </div>

              <div className="lanyard-id-card">
                <div className="id-card-header">
                  <div>
                    <strong>BUILDER</strong>
                    <strong>CARD</strong>
                  </div>
                  <span className="id-card-year">2026</span>
                </div>
                <div className="id-card-role">WEB · APPS // AUTOMATIZACIÓN IA</div>
                <div className="id-card-photo-box">
                  <img src={portrait.url} alt="Retrato en credencial de Erick Rodríguez" />
                </div>
                <dl className="id-card-ledger">
                  <div>
                    <dt>NAME</dt>
                    <dd>ERICK RODRÍGUEZ</dd>
                  </div>
                  <div>
                    <dt>FOCUS</dt>
                    <dd>WEB, APPS, ERP & IA</dd>
                  </div>
                  <div>
                    <dt>LOGRO</dt>
                    <dd>TOP 1 GOOGLE · DIVERSPLAS</dd>
                  </div>
                  <div>
                    <dt>AYUDA</dt>
                    <dd>375H AGENTE CAMBIO TEC.</dd>
                  </div>
                  <div>
                    <dt>EMAIL</dt>
                    <dd>HOLA.ERICKRODRIGUEZ@GMAIL.COM</dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.div>

          {/* PHASE 2: 3D MACBOOK PRO CASE STUDY SHOWCASE (HALDOREN LAPTOP ZOOM) */}
          <motion.div
            className="studio-laptop-stage"
            style={
              reduced
                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                : {
                    scale: laptopScale,
                    y: laptopY,
                    x: laptopX,
                    opacity: laptopOpacity,
                  }
            }
          >
            {/* Left Floating Case Description (// project.name) */}
            <motion.aside
              className="laptop-side-caption"
              style={{ opacity: reduced ? 1 : screenContentOpacity }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="laptop-caption-slug">// {currentProject.name}</div>
                  <p className="laptop-caption-desc">— {currentProject.description}</p>
                  <div className="laptop-caption-index">{currentProject.indexLabel}</div>
                </motion.div>
              </AnimatePresence>
            </motion.aside>

            {/* The MacBook Pro Hardware Frame */}
            <div className="macbook-unit">
              {/* Top-Right Pinned 4-Rivet Paper Spec Card (HALDOREN Signature Tag) */}
              <motion.div
                className="pinned-spec-card"
                style={{ opacity: reduced ? 1 : screenContentOpacity }}
              >
                <span className="rivet rivet-tl" />
                <span className="rivet rivet-tr" />
                <span className="rivet rivet-bl" />
                <span className="rivet rivet-br" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject.id}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="pinned-spec-title">{currentProject.tagTitle}</div>
                    <div className="pinned-spec-row">
                      <span>{currentProject.tagLine1}</span>
                    </div>
                    <div className="pinned-spec-row">
                      <span>{currentProject.tagLine2}</span>
                    </div>
                    <div className="pinned-spec-row">
                      <span>{currentProject.tagYear}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* MacBook Screen Lid & Bezel */}
              <div className="macbook-lid">
                <div className="macbook-camera-dot" aria-hidden="true" />
                <div className="macbook-screen-glare" aria-hidden="true" />

                <motion.div
                  className="macbook-viewport"
                  style={{ opacity: reduced ? 1 : screenContentOpacity }}
                >
                  {/* Browser Bar inside the MacBook */}
                  <div className="macbook-browser-bar">
                    <div className="macbook-traffic-lights" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="macbook-url-pill">
                      <span className="macbook-url-status">{currentProject.status}</span>
                      <span className="macbook-url-text">
                        {currentProject.isPrivate
                          ? "demo://barcelona/erp-y-app-a-medida"
                          : `https://${currentProject.name}`}
                      </span>
                    </div>
                    <div className="macbook-case-tabs" role="tablist" aria-label="Proyectos">
                      {projects.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          role="tab"
                          aria-selected={activeCase === idx}
                          className={`macbook-case-tab ${activeCase === idx ? "active" : ""}`}
                          onClick={() => selectCase(idx)}
                        >
                          0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Case Study Display */}
                  <div className="macbook-canvas">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentProject.id}
                        className="macbook-slide"
                        initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {!currentProject.isPrivate ? (
                          <div className="macbook-screenshot-wrap">
                            <img
                              src={currentProject.image}
                              alt={`Vista real de ${currentProject.name}`}
                              className="macbook-screenshot-img"
                            />
                            <div className="macbook-slide-footer">
                              <div>
                                <span className="macbook-slide-kicker">{currentProject.type}</span>
                                <strong>{currentProject.name}</strong>
                              </div>
                              <a
                                href={currentProject.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="macbook-visit-btn"
                              >
                                {currentProject.ctaLabel} <ExternalLink size={14} />
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="macbook-private-demo">
                            <span className="project-status">DEMO PRIVADA · BARCELONA</span>
                            <LockKeyhole size={42} />
                            <h3>
                              Lo próximo,
                              <br />
                              te lo enseño en persona.
                            </h3>
                            <p>
                              ERP empresarial a medida + aplicación móvil/web · Dos proyectos
                              completos listos para demostración en vivo en Barcelona.
                            </p>
                            <a href={demo} className="macbook-visit-btn macbook-visit-lime">
                              Agendar una demostración <ArrowUpRight size={16} />
                            </a>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Brushed Aluminum MacBook Base */}
              <div className="macbook-base" aria-hidden="true">
                <div className="macbook-notch" />
              </div>
            </div>

            {/* Left / Right Circular Case Navigation Controls */}
            <motion.div
              className="laptop-case-nav laptop-case-prev"
              style={{ opacity: reduced ? 1 : screenContentOpacity }}
            >
              <button
                type="button"
                onClick={() => selectCase(activeCase - 1)}
                className="case-circle-btn"
                aria-label="Proyecto anterior"
              >
                <ArrowLeft size={18} />
              </button>
              <span>
                anterior
                <br />
                proyecto
              </span>
            </motion.div>

            <motion.div
              className="laptop-case-nav laptop-case-next"
              style={{ opacity: reduced ? 1 : screenContentOpacity }}
            >
              <button
                type="button"
                onClick={() => selectCase(activeCase + 1)}
                className="case-circle-btn case-circle-btn-solid"
                aria-label="Siguiente proyecto"
              >
                <ArrowRight size={18} />
              </button>
              <span>
                siguiente
                <br />
                proyecto
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom Scroll Indicator */}
          <motion.div
            className="studio-scroll-hint"
            style={{ opacity: reduced ? 0 : heroTitleOpacity }}
          >
            <span>DESLIZA PARA ABRIR EL PORTÁTIL DE PROYECTOS</span>
            <ArrowDown size={14} />
          </motion.div>
        </div>
      </div>

      <div className="skill-strip">
        <span>DESARROLLO WEB & APPS</span>
        <i>✳</i>
        <span>AUTOMATIZACIÓN CON IA</span>
        <i>✳</i>
        <span>MARKETING DIGITAL</span>
        <i>✳</i>
        <span>DE LA IDEA A PRODUCCIÓN</span>
      </div>

      <section className="wrap stats" aria-label="Experiencia y resultados">
        <div className="stat">
          <strong>
            <Counter value={1000} prefix="+" /> <small>h</small>
          </strong>
          <p>
            De experiencia en <span>entornos empresariales reales.</span>
          </p>
        </div>
        <div className="stat">
          <strong>
            Top <Counter value={1} />
          </strong>
          <p>
            En Google para extraescolares en Barcelona con <span>diversplas.es.</span>
          </p>
        </div>
        <div className="stat">
          <strong>
            <Counter value={375} /> <small>h</small>
          </strong>
          <p>
            De acreditación oficial como <span>Agente del Cambio Tecnológico.</span>
          </p>
        </div>
      </section>

      <section className="section wrap" id="proyectos">
        <Reveal className="section-top">
          <div>
            <div className="section-label">01 / Trabajo seleccionado</div>
            <h2 className="section-heading">
              Menos promesas.
              <br />
              Más proyectos reales.
            </h2>
          </div>
          <p>
            Ideas que ya funcionan fuera de la pantalla. Diseñadas, desarrolladas y llevadas a
            producción por mí.
          </p>
        </Reveal>
        <div className="project-grid">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <Magnetic className="magnetic-project" strength={0.035}>
                <a
                  className="project block"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-cover" data-tone={project.tone}>
                    <img src={project.image} alt={`Vista real de ${project.name}`} loading="lazy" />
                    <span className="project-status">{project.status}</span>
                  </div>
                  <div className="project-info">
                    <div>
                      <div className="section-label">{project.type}</div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                    <ArrowUpRight size={26} />
                  </div>
                </a>
              </Magnetic>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="project">
              <Magnetic className="magnetic-private" spotlight strength={0.04}>
                <div className="project-cover private-cover">
                  <span className="project-status">DEMO PRIVADA · BARCELONA</span>
                  <LockKeyhole size={36} />
                  <h3>
                    Lo próximo,
                    <br />
                    te lo enseño en persona.
                  </h3>
                  <p>ERP a medida + app · Dos proyectos aún sin publicar</p>
                  <Button variant="portfolio" data-style="lime" asChild>
                    <a href={demo}>
                      Agendar una demostración <ArrowUpRight />
                    </a>
                  </Button>
                </div>
              </Magnetic>
              <div className="project-info">
                <div>
                  <div className="section-label">04 / SOFTWARE A MEDIDA</div>
                  <h3>ERP & App</h3>
                  <p>
                    Dos soluciones reales que puedo mostrarte en una demo en vivo, en Barcelona.
                  </p>
                </div>
                <LockKeyhole size={22} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark-section" id="enfoque">
        <div className="wrap">
          <Reveal className="section-top">
            <div>
              <div className="section-label">02 / Mi forma de trabajar</div>
              <h2 className="section-heading">
                La IA no es un extra.
                <br />
                Es parte del equipo.
              </h2>
            </div>
            <p>
              La herramienta adecuada para cada problema. Código, agentes y automatizaciones al
              servicio de tu negocio.
            </p>
          </Reveal>
          <div className="ai-grid">
            <Reveal className="ai-card ai-card-featured">
              <GitBranch size={27} />
              <AgentFlow />
              <h3>
                Agentes autónomos
                <br />y n8n
              </h3>
              <p>
                Flujos y agentes que planifican y ejecutan tareas solos. Menos tareas repetitivas,
                más tiempo para lo importante.
              </p>
            </Reveal>
            <Reveal className="ai-card" delay={0.1}>
              <Sparkles size={27} />
              <ModelCycle />
              <h3>
                Cada tarea,
                <br />
                su mejor modelo.
              </h3>
              <p>Uso estratégico de varios modelos de IA, según lo que necesita cada proyecto.</p>
            </Reveal>
            <Reveal className="ai-card" delay={0.2}>
              <Code2 size={27} />
              <CodeFlow />
              <h3>
                Ideas que se
                <br />
                convierten en código.
              </h3>
              <p>
                Desarrollo con agentes en el IDE. Prototipos en AI Studio y Stitch. React y
                TypeScript para construir de verdad.
              </p>
            </Reveal>
            <Reveal className="ai-card ai-card-horizontal" delay={0.15}>
              <MemoryFlow />
              <div>
                <h3>Una IA con memoria.</h3>
                <p>
                  Mi Second Brain en Obsidian y Markdown da contexto, memoria y reglas a la IA entre
                  sesiones. Resultados mucho mejores, sin empezar de cero.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="subsidy">
        <div className="wrap">
          <div>
            <div className="section-label">Una ventaja para tu empresa</div>
            <h2>Contratarme tiene ayudas.</h2>
            <p>
              Con mi acreditación oficial de 375 h como Agente del Cambio Tecnológico, tu empresa
              puede acceder a subvenciones salariales directas, según las condiciones de la
              convocatoria.
            </p>
          </div>
          <Button variant="portfolio" data-style="ink" asChild>
            <a
              href={`mailto:${email}?subject=Acreditaci%C3%B3n%20y%20ayudas%20a%20la%20contrataci%C3%B3n`}
            >
              Hablemos de las posibilidades <ArrowUpRight />
            </a>
          </Button>
        </div>
      </section>

      <section className="section wrap" id="sobre-mi">
        <div className="about-grid">
          <Reveal className="about-copy">
            <div className="section-label">03 / Más allá del código</div>
            <h2 className="section-heading">
              Entiendo el negocio.
              <br />
              Construyo la solución.
            </h2>
            <p>
              Soy desarrollador web y especialista en automatización de procesos, con base en
              marketing digital y gestión administrativa. Diseño y desarrollo webs, apps, ERP a
              medida y automatizaciones con IA para negocios reales.
            </p>
            <p>
              Me encargo de todo el proceso: diseño, desarrollo, SEO, puesta en producción y mejora
              continua.
            </p>
            <p className="differential">
              Identifico un problema del negocio, elijo la herramienta adecuada y lo resuelvo. Sea
              una web, una plataforma, un ERP o una app.
            </p>
            <Button variant="portfolio" data-style="line" asChild>
              <a
                href={cv.url}
                target="_blank"
                rel="noopener noreferrer"
                download="Erick-Rodriguez-CV.pdf"
              >
                Descargar mi CV <Download />
              </a>
            </Button>
          </Reveal>
          <div>
            {experience.map((job, i) => (
              <Reveal key={job.company} className="timeline-item" delay={i * 0.1}>
                <div className="timeline-meta">
                  <span>{job.company}</span>
                  <span>{job.date}</span>
                </div>
                <h3>{job.title}</h3>
                {job.tasks.map((task) => (
                  <p key={task}>{task}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="wrap">
          <Reveal>
            <div className="section-label">04 / El siguiente proyecto puede ser el tuyo</div>
            <h2>
              ¿Hablamos? <ArrowUpRight className="inline-block" size={65} />
            </h2>
            <p className="contact-intro">
              Puedo enseñarte en persona el ERP y la app demo o diseñar la solución que necesita tu
              negocio.
            </p>
          </Reveal>
          <div className="contact-row">
            <div className="contact-detail">
              <a href={`mailto:${email}`}>{email}</a>
              <CopyButton value={email} label="email" />
            </div>
            <div className="contact-detail">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                +34 640 63 0459
              </a>
              <CopyButton value="+34 640 63 0459" label="teléfono" />
            </div>
            <Button variant="portfolio" data-style="ink" asChild>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                Escríbeme por WhatsApp <ArrowUpRight />
              </a>
            </Button>
          </div>
          <footer className="footer">
            <span>© 2026 Erick Rodríguez</span>
            <span className="flex items-center gap-2">
              <MapPin size={12} /> Barcelona, España
            </span>
            <a href="#inicio">Volver arriba ↑</a>
          </footer>
        </div>
      </section>
    </main>
  );
}
