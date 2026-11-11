import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AgentFlow,
  CodeFlow,
  Counter,
  Magnetic,
  MemoryFlow,
  ModelCycle,
  Reveal,
} from "@/components/portfolio-motion";
import portrait from "@/assets/erick-portrait-final.png.asset.json";
import diversplas from "@/assets/diversplas.es.png.asset.json";
import gesgrama from "@/assets/gesgrama.com.png.asset.json";
import breadpdf from "@/assets/breadpdf.com.png.asset.json";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";

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
    links: [
      { rel: "preload", as: "image", href: portrait.url },
      { rel: "preload", as: "image", href: diversplas.url },
    ],
  }),
  component: Index,
});

const email = "hola.erickrodriguez@gmail.com";
const phoneDisplay = "+34 640 63 0459";
const whatsapp = "https://wa.me/34640630459";
const demo =
  "mailto:hola.erickrodriguez@gmail.com?subject=Solicitud%20de%20demo%20en%20persona%20%E2%80%94%20ERP%20%2F%20App";

interface ProjectCase {
  id: string;
  indexLabel: string;
  name: string;
  tagTitle: string;
  tagLine1: string;
  tagLine2: string;
  tagYear: string;
  type: string;
  status: string;
  tone: "orange" | "lime" | "sky";
  href: string;
  image?: string;
  description: string;
  ctaLabel: string;
  isPrivate?: boolean;
}

const projects: ProjectCase[] = [
  {
    id: "diversplas",
    indexLabel: "01 / 04",
    name: "diversplas.es",
    tagTitle: "DIVERSPLAS.ES",
    tagLine1: "DIVERSPLAS INDUSTRIAL",
    tagLine2: "WEB + SEO · TOP 1 GOOGLE",
    tagYear: "2026",
    type: "Web corporativa + SEO",
    status: "TOP 1 EN GOOGLE",
    tone: "orange",
    href: "https://diversplas.es",
    image: diversplas.url,
    description:
      "Web corporativa y estrategia SEO en primera posición de Google en su sector, con generación de negocio real y captación B2B continua.",
    ctaLabel: "Visitar web",
  },
  {
    id: "gesgrama",
    indexLabel: "02 / 04",
    name: "gesgrama.com",
    tagTitle: "GESGRAMA.COM",
    tagLine1: "GESGRAMA GESTORÍA",
    tagLine2: "REDISEÑO WEB B2B",
    tagYear: "2026",
    type: "Web profesional",
    status: "EN PRODUCCIÓN",
    tone: "lime",
    href: "https://gesgrama.com",
    image: gesgrama.url,
    description:
      "Rediseño y desarrollo web enfocado en claridad de servicios, presencia profesional y contacto directo con clientes empresariales.",
    ctaLabel: "Visitar web",
  },
  {
    id: "breadpdf",
    indexLabel: "03 / 04",
    name: "breadpdf.com",
    tagTitle: "BREADPDF.COM",
    tagLine1: "BREADPDF PRODUCT",
    tagLine2: "SAAS / HERRAMIENTA WEB",
    tagYear: "2026",
    type: "Producto digital / SaaS",
    status: "PRODUCTO PROPIO",
    tone: "sky",
    href: "https://breadpdf.com",
    image: breadpdf.url,
    description:
      "Herramienta web rápida y directa para trabajar con documentos PDF desde el navegador, concebida y desplegada como producto propio.",
    ctaLabel: "Probar producto",
  },
  {
    id: "private-erp",
    indexLabel: "04 / 04",
    name: "erp & app privada",
    tagTitle: "ERP & APP",
    tagLine1: "SISTEMA EMPRESARIAL",
    tagLine2: "DEMO EN VIVO · BARCELONA",
    tagYear: "2026",
    type: "ERP + App a medida",
    status: "DEMO EN PERSONA",
    tone: "lime",
    href: demo,
    description:
      "Un ERP a medida y una aplicación completa listos para enseñarte en persona en Barcelona: arquitectura, flujos reales y resultados.",
    ctaLabel: "Agendar demostración",
    isPrivate: true,
  },
];

const experience = [
  {
    period: "Feb 2025 — Jul 2025",
    role: "Desarrollador Web y Especialista en Marketing Digital",
    place: "Diversplas · Jornada completa",
    points: [
      "Renovación completa de la web corporativa y creación de páginas de aterrizaje orientadas a negocio.",
      "Posicionamiento SEO en el puesto nº 1 de Google para el término principal de su sector.",
      "Integración de formularios con CRM y campañas en Google Ads y LinkedIn Ads (+200 % tráfico orgánico, +35 % contactos comerciales).",
    ],
  },
  {
    period: "Nov 2024 — Mar 2025",
    role: "Técnico de Sistemas y Soporte Informático",
    place: "Consorci d'Educació de Barcelona · Prácticas",
    points: [
      "Mantenimiento de equipos, redes y soporte técnico presencial y remoto a más de 100 usuarios.",
      "Documentación de procedimientos y resolución de más de 150 incidencias con un 95 % de satisfacción.",
    ],
  },
];

const education = [
  {
    period: "Finalización prevista · Jun 2026",
    title: "CFGS en Desarrollo de Aplicaciones Web (DAW)",
    place: "Centro de Estudios Monlau · Barcelona",
  },
  {
    period: "Sep 2022 — Jun 2024",
    title: "CFGM en Sistemas Microinformáticos y Redes (SMX)",
    place: "Centro de Estudios Monlau · Barcelona",
  },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
      window.setTimeout(() => setFailed(false), 2600);
    }
  }

  return (
    <>
      <Button
        type="button"
        className="portfolio-button"
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
  const [view, setView] = useState<"studio" | "laptop">("studio");
  const [activeCase, setActiveCase] = useState(0);
  const [glareKey, setGlareKey] = useState(0);
  const [userPausedUntil, setUserPausedUntil] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);

  // Pendulum swing for the hanging Designer/Builder ID Lanyard
  const badgeRotateRaw = useMotionValue(0);
  const badgeRotate = useSpring(badgeRotateRaw, { stiffness: 120, damping: 12 });

  // Automatic choreographed sequence matching the HALDOREN reference video:
  // Studio (3.2s) -> Zoom into Laptop + Case 01 (3.3s) -> Case 02 (3.3s) -> Case 03 (3.3s) -> Case 04 (3.3s) -> Loop to Studio
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (Date.now() < userPausedUntil) return;

      if (view === "studio") {
        setActiveCase(0);
        setGlareKey((k) => k + 1);
        setView("laptop");
      } else {
        setActiveCase((prev) => {
          if (prev < projects.length - 1) {
            return prev + 1;
          }
          setView("studio");
          return 0;
        });
      }
    }, 3300);

    return () => window.clearInterval(timer);
  }, [view, userPausedUntil]);

  function pauseAuto(ms = 9000) {
    setUserPausedUntil(Date.now() + ms);
  }

  function enterStudio() {
    pauseAuto(9000);
    setView("studio");
  }

  function enterLaptop(caseIndex?: number) {
    pauseAuto(11000);
    if (typeof caseIndex === "number") {
      setActiveCase((caseIndex + projects.length) % projects.length);
    }
    if (view !== "laptop") {
      setGlareKey((k) => k + 1);
      setView("laptop");
    }
  }

  function selectCase(nextIndex: number) {
    pauseAuto(11000);
    setActiveCase((nextIndex + projects.length) % projects.length);
    if (view !== "laptop") {
      setGlareKey((k) => k + 1);
      setView("laptop");
    }
  }

  const currentProject = projects[activeCase] ?? projects[0];
  const isLaptop = view === "laptop";

  return (
    <main
      className="portfolio"
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        badgeRotateRaw.set(normX * -4.2);
      }}
    >
      {/* =====================================================================
          HALDOREN INTERACTIVE STUDIO STAGE (PHASE 1 STUDIO <-> PHASE 2 MACBOOK)
          ===================================================================== */}
      <section
        ref={stageRef}
        className="studio-stage-section"
        id="inicio"
        onWheel={(e) => {
          if (wheelLockRef.current) return;
          if (e.deltaY > 28 && view === "studio" && window.scrollY < 80) {
            wheelLockRef.current = true;
            enterLaptop(0);
            window.setTimeout(() => {
              wheelLockRef.current = false;
            }, 900);
          } else if (e.deltaY < -28 && view === "laptop" && window.scrollY < 40) {
            wheelLockRef.current = true;
            enterStudio();
            window.setTimeout(() => {
              wheelLockRef.current = false;
            }, 900);
          }
        }}
      >
        <div className="studio-Noise" aria-hidden="true" />
        <div className="studio-glow" aria-hidden="true" />

        {/* TOP FLOATING STUDIO PILL NAVIGATION (4 WHITE PILLS LIKE HALDOREN) */}
        <header className="studio-nav">
          <div className="studio-nav-left">
            <button
              type="button"
              onClick={enterStudio}
              className={`studio-pill-btn ${!isLaptop ? "studio-pill-active" : ""}`}
            >
              estudio
            </button>
            <button
              type="button"
              onClick={() => enterLaptop(activeCase)}
              className={`studio-pill-btn ${isLaptop ? "studio-pill-active" : ""}`}
            >
              proyectos
            </button>
          </div>

          <motion.button
            type="button"
            onClick={enterStudio}
            className="studio-center-brand"
            initial={false}
            animate={{
              opacity: isLaptop ? 1 : 0,
              y: isLaptop ? 0 : -12,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            ERICK RODRÍGUEZ
          </motion.button>

          <div className="studio-nav-right">
            <a href="#sobre-mi" className="studio-pill-btn studio-pill-hide-mobile">
              contacto
            </a>
            <a href="#contacto" className="studio-pill-btn studio-pill-cta">
              hablemos de tu proyecto
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
              <button
                type="button"
                onClick={() => {
                  enterStudio();
                  setMenuOpen(false);
                }}
              >
                estudio
              </button>
              <button
                type="button"
                onClick={() => {
                  enterLaptop(0);
                  setMenuOpen(false);
                }}
              >
                proyectos interactivos
              </button>
              <a href="#proyectos" onClick={() => setMenuOpen(false)}>
                todos los proyectos
              </a>
              <a href="#enfoque" onClick={() => setMenuOpen(false)}>
                mi enfoque con IA
              </a>
              <a href="#sobre-mi" onClick={() => setMenuOpen(false)}>
                sobre mí y CV
              </a>
              <a href="#contacto" onClick={() => setMenuOpen(false)}>
                hablemos de tu proyecto
              </a>
            </nav>
          )}
        </header>

        {/* PHASE 1: FULL-BLEED GIANT METALLIC TITLE + HANDWRITING REVEAL */}
        <motion.div
          className="studio-giant-title-wrap"
          initial={{ y: -40, opacity: 0 }}
          animate={{
            y: isLaptop ? "-130%" : "0%",
            opacity: isLaptop ? 0 : 1,
          }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="sr-only">Erick Rodríguez — Desarrollo Web, Apps y Automatización con IA</h1>
          <svg
            className="studio-giant-svg"
            viewBox="0 0 1400 265"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="erickWallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="48%" stopColor="#EAF5F0" />
                <stop offset="82%" stopColor="#B4D4C6" />
                <stop offset="100%" stopColor="#83B19E" />
              </linearGradient>
            </defs>
            <text
              x="700"
              y="232"
              textAnchor="middle"
              textLength="1360"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#erickWallGrad)"
              className="studio-giant-svg-text"
            >
              ERICK
            </text>
          </svg>

          {/* White Handwritten Script that draws itself left-to-right */}
          <motion.span
            key={isLaptop ? "script-hidden" : "script-visible"}
            className="studio-handwritten"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 1 }}
            animate={{
              clipPath: isLaptop ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)",
              opacity: isLaptop ? 0 : 1,
            }}
            transition={{
              duration: isLaptop ? 0.25 : 0.9,
              delay: isLaptop ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            web · apps · ia
          </motion.span>
        </motion.div>

        {/* PHASE 1: STUDIO SCENE CAMERA LAYER (DESK + CHAIR + PORTRAIT + HELD LAPTOP)
            Zooms in with motion blur toward the laptop when transitioning to Phase 2 */}
        <motion.div
          className="studio-camera-scene"
          initial={false}
          animate={{
            scale: isLaptop ? 2.35 : 1,
            x: isLaptop ? "-12%" : "0%",
            y: isLaptop ? "18%" : "0%",
            opacity: isLaptop ? 0 : 1,
            filter: isLaptop ? "blur(8px)" : "blur(0px)",
          }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left Studio Workstation: Black Ribbed Leather Chair + White Desk + Mug + Folders */}
          <div className="studio-desk-illustration" aria-hidden="true">
            <svg viewBox="0 0 560 420" fill="none" className="studio-desk-svg">
              <defs>
                <linearGradient id="chairLeather" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2A2F2D" />
                  <stop offset="40%" stopColor="#141817" />
                  <stop offset="85%" stopColor="#090B0A" />
                  <stop offset="100%" stopColor="#1E2422" />
                </linearGradient>
                <linearGradient id="chromePost" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7E8B85" />
                  <stop offset="45%" stopColor="#F2F7F5" />
                  <stop offset="70%" stopColor="#9BA8A2" />
                  <stop offset="100%" stopColor="#434D49" />
                </linearGradient>
                <linearGradient id="deskTopGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#E7EFEA" />
                  <stop offset="100%" stopColor="#C7D4CE" />
                </linearGradient>
                <linearGradient id="deskEdgeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#DCE6E1" />
                  <stop offset="65%" stopColor="#F4F8F6" />
                  <stop offset="100%" stopColor="#9AA8A1" />
                </linearGradient>
                <linearGradient id="folderGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D7E0DC" />
                  <stop offset="50%" stopColor="#B8C4BE" />
                  <stop offset="100%" stopColor="#85928C" />
                </linearGradient>
              </defs>

              {/* Black Ribbed Leather Studio Office Chair (Tilted -5deg like Haldoren) */}
              <g transform="translate(88, 62) rotate(-5)">
                {/* Chrome Side Frame Posts */}
                <rect x="-8" y="8" width="9" height="220" rx="4" fill="url(#chromePost)" />
                <rect x="196" y="8" width="9" height="220" rx="4" fill="url(#chromePost)" />
                {/* Chair Backrest Shell */}
                <rect
                  x="0"
                  y="0"
                  width="198"
                  height="225"
                  rx="10"
                  fill="url(#chairLeather)"
                  stroke="#363E3B"
                  strokeWidth="2"
                />
                {/* Ribbed Leather Horizontal Cushions */}
                <line x1="8" y1="54" x2="190" y2="54" stroke="#050706" strokeWidth="4" />
                <line x1="8" y1="57" x2="190" y2="57" stroke="#38403D" strokeWidth="1.5" />
                <line x1="8" y1="112" x2="190" y2="112" stroke="#050706" strokeWidth="4" />
                <line x1="8" y1="115" x2="190" y2="115" stroke="#38403D" strokeWidth="1.5" />
                <line x1="8" y1="170" x2="190" y2="170" stroke="#050706" strokeWidth="4" />
                <line x1="8" y1="173" x2="190" y2="173" stroke="#38403D" strokeWidth="1.5" />
                {/* Top Leather Specular Highlight */}
                <path
                  d="M14 8 H184"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* Perspective Studio Desk Surface */}
              <polygon points="0,268 485,268 538,326 0,326" fill="url(#deskTopGrad)" />
              {/* Front Bevel Edge of Desk */}
              <rect x="0" y="326" width="538" height="26" fill="url(#deskEdgeGrad)" />
              {/* Chrome Under-Desk Frame & Leg */}
              <rect x="0" y="352" width="532" height="16" fill="#2A3330" />
              <rect x="492" y="352" width="32" height="68" fill="url(#chromePost)" />
              <polygon points="88,368 290,368 355,420 120,420" fill="#121715" />

              {/* White Ceramic Studio Coffee Mug (Left of Desk) */}
              <g transform="translate(52, 226)">
                {/* Mug Shadow */}
                <ellipse cx="32" cy="68" rx="30" ry="7" fill="rgba(10, 26, 20, 0.22)" />
                {/* Mug Handle */}
                <path
                  d="M10 18 C-8 18 -8 52 10 52"
                  stroke="#E5ECE9"
                  strokeWidth="7"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Mug Cylinder */}
                <rect x="8" y="6" width="48" height="60" rx="5" fill="#FFFFFF" />
                <rect x="34" y="6" width="22" height="60" rx="4" fill="#DCE5E1" />
                <ellipse cx="32" cy="6" rx="24" ry="4.5" fill="#CBD6D1" />
              </g>

              {/* Stacked Silver/Grey Studio Folders & Binders on Desk */}
              <g transform="translate(152, 224)">
                {/* Drop Shadow under Folders */}
                <polygon
                  points="6,66 286,58 310,82 22,90"
                  fill="rgba(8, 22, 17, 0.28)"
                />
                {/* Bottom Thick Binder */}
                <polygon
                  points="12,50 278,40 302,68 28,78"
                  fill="#2C3531"
                  stroke="#171D1B"
                  strokeWidth="1.5"
                />
                {/* White Paper Pages Inside Binder */}
                <polygon points="18,48 274,38 296,62 32,72" fill="#F2F6F4" />
                {/* Middle Silver Folder */}
                <polygon
                  points="4,34 268,22 294,50 24,62"
                  fill="#9AA7A1"
                  stroke="#687570"
                  strokeWidth="1.5"
                />
                {/* Top Brushed Silver Portfolio */}
                <polygon
                  points="14,16 264,4 298,36 36,50"
                  fill="url(#folderGrad)"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
                {/* Binder Rings Detail */}
                <circle cx="278" cy="48" r="4" fill="#D8E2DD" />
                <circle cx="286" cy="56" r="4" fill="#D8E2DD" />
              </g>
            </svg>
          </div>

          {/* Center Cutout Portrait + Held 3D Angled Silver MacBook */}
          <div className="studio-portrait-stage">
            <div className="studio-portrait-figure">
              <img
                className="studio-portrait-img"
                src={portrait.url}
                alt="Erick Rodríguez"
              />

              {/* Held 3D Angled Silver MacBook Pro (Matches the angled laptop in Haldoren Phase 1) */}
              <div
                className="held-laptop-prop"
                onClick={() => enterLaptop(0)}
                role="button"
                tabIndex={0}
                aria-label="Abrir proyectos en el portátil"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") enterLaptop(0);
                }}
              >
                <svg viewBox="0 0 380 250" fill="none" className="held-laptop-svg">
                  <defs>
                    <linearGradient id="macLidSilver" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#DCE4E0" />
                      <stop offset="45%" stopColor="#9BA7A2" />
                      <stop offset="85%" stopColor="#6E7A75" />
                      <stop offset="100%" stopColor="#88958F" />
                    </linearGradient>
                    <linearGradient id="macBaseSilver" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E6EEEA" />
                      <stop offset="60%" stopColor="#B8C4BE" />
                      <stop offset="100%" stopColor="#6D7974" />
                    </linearGradient>
                  </defs>
                  {/* Drop shadow */}
                  <ellipse cx="185" cy="218" rx="145" ry="18" fill="rgba(5, 20, 15, 0.42)" />
                  {/* Flat Keyboard Base Deck Extending Left */}
                  <polygon
                    points="12,190 198,186 218,204 26,206"
                    fill="url(#macBaseSilver)"
                    stroke="#59645F"
                    strokeWidth="1.2"
                  />
                  {/* Side USB-C / MagSafe Ports on Base Edge */}
                  <rect x="148" y="193" width="10" height="3.5" rx="1.5" fill="#171D1A" />
                  <rect x="164" y="193" width="8" height="3.5" rx="1.5" fill="#171D1A" />
                  <rect x="177" y="193" width="8" height="3.5" rx="1.5" fill="#171D1A" />
                  <circle cx="192" cy="195" r="2" fill="#171D1A" />
                  {/* Angled Brushed Aluminum Screen Lid */}
                  <polygon
                    points="248,18 370,12 316,204 196,204"
                    fill="url(#macLidSilver)"
                    stroke="#EBF2EE"
                    strokeWidth="1.5"
                  />
                  {/* Subtle Emblem on Lid */}
                  <circle
                    cx="283"
                    cy="108"
                    r="13"
                    fill="rgba(255, 255, 255, 0.22)"
                  />
                </svg>
                <span className="held-laptop-badge">VER PORTAFOLIO ↗</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PHASE 1: RIGHT HANGING LANYARD ID BADGE (FULL-HEIGHT LIKE HALDOREN) */}
        <motion.div
          className="studio-lanyard-assembly"
          initial={{ y: -560, rotate: 6 }}
          animate={{
            y: isLaptop ? -640 : 0,
            opacity: isLaptop ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 95,
            damping: 14,
            mass: 0.9,
          }}
          style={{ rotate: badgeRotate }}
        >
          {/* Wide White Woven Fabric Strap */}
          <div className="lanyard-strap" aria-hidden="true">
            <div className="lanyard-strap-stitch" />
          </div>

          {/* Large 3D Chrome Swivel Lobster Clasp */}
          <svg
            className="lanyard-clasp"
            viewBox="0 0 92 118"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="chromeRing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#C8D3CE" />
                <stop offset="65%" stopColor="#5E6B65" />
                <stop offset="100%" stopColor="#E6EFEB" />
              </linearGradient>
              <linearGradient id="chromeBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6D7A74" />
                <stop offset="35%" stopColor="#F7FAF8" />
                <stop offset="65%" stopColor="#9AA7A1" />
                <stop offset="100%" stopColor="#3B4540" />
              </linearGradient>
            </defs>
            {/* Wide Metal D-Ring */}
            <path
              d="M12 6 H80 C84 6 86 12 82 22 L66 42 H26 L10 22 C6 12 8 6 12 6 Z"
              stroke="url(#chromeRing)"
              strokeWidth="8"
              fill="none"
            />
            {/* Swivel Collar */}
            <rect
              x="33"
              y="34"
              width="26"
              height="18"
              rx="4"
              fill="url(#chromeBody)"
              stroke="#4A5651"
              strokeWidth="1.5"
            />
            {/* Side Trigger Lever */}
            <path
              d="M55 58 L74 68 C77 70 76 75 72 75 L56 72 Z"
              fill="url(#chromeBody)"
              stroke="#4A5651"
              strokeWidth="1.5"
            />
            {/* Lobster Claw Hook Body */}
            <path
              d="M36 50 H56 L62 92 C62 104 53 112 46 112 C39 112 30 104 30 92 Z"
              fill="url(#chromeBody)"
              stroke="#4A5651"
              strokeWidth="1.5"
            />
            {/* Inner Cutout of Hook */}
            <ellipse cx="46" cy="88" rx="8" ry="14" fill="#78A795" />
          </svg>

          {/* Glossy Crystal-Clear Vinyl Badge Holder Sleeve */}
          <div className="lanyard-pvc-sleeve">
            <div className="lanyard-punch-holes" aria-hidden="true">
              <span />
              <i />
              <span />
            </div>

            <div className="lanyard-id-card">
              <div className="id-card-header">
                <div>
                  <strong>DESIGNER</strong>
                  <strong>CARD</strong>
                </div>
                <span className="id-card-year">2026</span>
              </div>
              <div className="id-card-role">FULL-STACK // AUTOMATIZACIÓN IA</div>
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
                  <dt>EMAIL</dt>
                  <dd>HOLA.ERICKRODRIGUEZ@GMAIL.COM</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>

        {/* ===================================================================
            PHASE 2: 3D MACBOOK PRO CASE STUDY SHOWCASE (HALDOREN LAPTOP ZOOM)
            =================================================================== */}
        <motion.div
          className="studio-laptop-stage"
          initial={false}
          animate={{
            opacity: isLaptop ? 1 : 0,
            scale: isLaptop ? 1 : 0.32,
            x: isLaptop ? 0 : 75,
            y: isLaptop ? 0 : 130,
            rotateY: isLaptop ? 0 : -26,
            rotateX: isLaptop ? 0 : 10,
            rotateZ: isLaptop ? 0 : -4,
          }}
          transition={{
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            pointerEvents: isLaptop ? "auto" : "none",
            transformPerspective: 1400,
          }}
        >
          {/* Left Floating Case Description (// project.name) */}
          <motion.aside
            className="laptop-side-caption"
            initial={false}
            animate={{
              opacity: isLaptop ? 1 : 0,
              x: isLaptop ? 0 : -24,
            }}
            transition={{ duration: 0.45, delay: isLaptop ? 0.35 : 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 12 }}
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
              initial={false}
              animate={{
                opacity: isLaptop ? 1 : 0,
                x: isLaptop ? 0 : 48,
                scale: isLaptop ? 1 : 0.9,
              }}
              transition={{
                duration: 0.48,
                delay: isLaptop ? 0.38 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="rivet rivet-tl" />
              <span className="rivet rivet-tr" />
              <span className="rivet rivet-bl" />
              <span className="rivet rivet-br" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 8 }}
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

            {/* MacBook Screen Lid & Glossy Black Bezel */}
            <div className="macbook-lid">
              <div className="macbook-camera-dot" aria-hidden="true" />

              {/* Studio Softbox Flash Glare (Matches frame_08.png on zoom-in) */}
              <motion.div
                key={glareKey}
                className="macbook-flash-glare"
                initial={{ opacity: 0.95, x: "-18%" }}
                animate={{ opacity: 0, x: "35%" }}
                transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
                aria-hidden="true"
              />

              <div className="macbook-screen-glare" aria-hidden="true" />

              {/* Full-Bleed Live Case Study Screen inside MacBook */}
              <motion.div
                className="macbook-viewport"
                initial={false}
                animate={{ opacity: isLaptop ? 1 : 0 }}
                transition={{ duration: 0.42, delay: isLaptop ? 0.26 : 0 }}
              >
                <div className="macbook-canvas">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProject.id}
                      className="macbook-slide"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {!currentProject.isPrivate ? (
                        <div className="macbook-screenshot-wrap">
                          <motion.img
                            src={currentProject.image}
                            alt={`Vista real de ${currentProject.name}`}
                            className="macbook-screenshot-img"
                            initial={{ scale: 1.06, y: "0%" }}
                            animate={{ scale: 1, y: "-4%" }}
                            transition={{
                              duration: 3.2,
                              ease: "easeInOut",
                            }}
                          />
                          <div className="macbook-slide-footer">
                            <div className="macbook-case-pills">
                              {projects.map((p, idx) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  className={`macbook-dot-pill ${activeCase === idx ? "active" : ""}`}
                                  onClick={() => selectCase(idx)}
                                >
                                  0{idx + 1} · {p.name}
                                </button>
                              ))}
                            </div>
                            <a
                              href={currentProject.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="macbook-visit-btn"
                              onClick={() => pauseAuto(15000)}
                            >
                              {currentProject.ctaLabel} <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="macbook-private-demo">
                          <span className="project-status">DEMO PRIVADA · BARCELONA</span>
                          <LockKeyhole size={42} />
                          <h3>
                            ERP empresarial & App a medida.
                            <br />
                            Te los enseño en vivo.
                          </h3>
                          <p>
                            Dos sistemas completos en producción que por confidencialidad muestro
                            en persona en Barcelona: arquitectura, flujos reales y métricas.
                          </p>
                          <div className="macbook-private-actions">
                            <a
                              href={demo}
                              className="macbook-visit-btn macbook-visit-lime"
                              onClick={() => pauseAuto(15000)}
                            >
                              Agendar demostración <ArrowUpRight size={15} />
                            </a>
                            <div className="macbook-case-pills">
                              {projects.map((p, idx) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  className={`macbook-dot-pill ${activeCase === idx ? "active" : ""}`}
                                  onClick={() => selectCase(idx)}
                                >
                                  0{idx + 1}
                                </button>
                              ))}
                            </div>
                          </div>
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

          {/* Left / Right Circular Case Navigation Controls (Exact Haldoren Placement) */}
          <motion.div
            className="laptop-case-nav laptop-case-prev"
            initial={false}
            animate={{ opacity: isLaptop ? 1 : 0 }}
            transition={{ duration: 0.35, delay: isLaptop ? 0.35 : 0 }}
          >
            <button
              type="button"
              onClick={() => selectCase(activeCase - 1)}
              className="case-circle-btn"
              aria-label="Caso anterior"
            >
              <ArrowLeft size={18} />
            </button>
            <span>
              anterior
              <br />
              caso
            </span>
          </motion.div>

          <motion.div
            className="laptop-case-nav laptop-case-next"
            initial={false}
            animate={{ opacity: isLaptop ? 1 : 0 }}
            transition={{ duration: 0.35, delay: isLaptop ? 0.35 : 0 }}
          >
            <button
              type="button"
              onClick={() => selectCase(activeCase + 1)}
              className="case-circle-btn case-circle-btn-solid"
              aria-label="Siguiente caso"
            >
              <ArrowRight size={18} />
            </button>
            <span>
              siguiente
              <br />
              caso
            </span>
          </motion.div>
        </motion.div>
      </section>

      <div className="skill-strip">
        <span>
          <i>●</i> Desarrollo Web & Apps
        </span>
        <span>
          <i>●</i> ERP y Sistemas a Medida
        </span>
        <span>
          <i>●</i> Automatización con IA y Agentes
        </span>
        <span>
          <i>●</i> SEO Técnico · Top 1 Google
        </span>
        <span>
          <i>●</i> Subvención de 375 h disponible
        </span>
      </div>

      <section className="wrap" aria-label="Resultados clave">
        <div className="stats">
          <Reveal className="stat">
            <strong>
              <Counter to={1000} prefix="+" /> <small>h</small>
            </strong>
            <p>
              De experiencia práctica en entornos reales de desarrollo web, sistemas y marketing
              digital.
            </p>
          </Reveal>
          <Reveal className="stat" delay={0.08}>
            <strong>
              Top <Counter to={1} />
            </strong>
            <p>
              Posicionamiento en Google para el término principal de Diversplas, con +200 % de
              tráfico orgánico.
            </p>
          </Reveal>
          <Reveal className="stat" delay={0.16}>
            <strong>
              <Counter to={375} /> <small>h</small>
            </strong>
            <p>
              De trabajo subvencionado disponibles para la empresa que me incorpore como Agente
              del Cambio Tecnológico.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section wrap" id="proyectos">
        <Reveal className="section-top">
          <div>
            <div className="section-label">Proyectos seleccionados</div>
            <h2 className="section-heading">
              Webs en producción.
              <br />Y dos proyectos más en persona.
            </h2>
          </div>
          <p>
            Tres proyectos públicos que puedes visitar ahora mismo y dos desarrollos privados (un
            ERP y una app) que enseño en vivo.
          </p>
        </Reveal>

        <div className="projects">
          {projects
            .filter((p) => !p.isPrivate)
            .map((project, index) => (
              <Reveal key={project.name} delay={index * 0.08}>
                <Magnetic className="project-magnetic" strength={0.035} spotlight>
                  <a
                    className="project"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="project-cover" data-tone={project.tone}>
                      <div className="project-meta">
                        <span className="project-status">{project.status}</span>
                        <span className="project-type">{project.type}</span>
                      </div>
                      <img
                        className="project-shot"
                        src={project.image}
                        alt={`Captura real de ${project.name}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="project-body">
                      <div className="project-title">
                        <h3>{project.name}</h3>
                        <span className="arrow" aria-hidden="true">
                          <ExternalLink size={17} />
                        </span>
                      </div>
                      <p>{project.description}</p>
                    </div>
                  </a>
                </Magnetic>
              </Reveal>
            ))}

          <Reveal delay={0.22}>
            <Magnetic className="project-magnetic" strength={0.035} spotlight>
              <a className="project private-card" href={demo}>
                <div className="private-visual">
                  <span className="project-status">CONFIDENCIAL · DEMO EN VIVO</span>
                  <div className="private-lock">
                    <LockKeyhole size={38} />
                    <strong>
                      Lo próximo,
                      <br />
                      te lo enseño en persona.
                    </strong>
                    <span>ERP a medida + Aplicación completa · Barcelona</span>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-title">
                    <h3>Solicitar una demostración</h3>
                    <span className="arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <p>
                    Tengo un ERP y una aplicación que no publico abiertos por confidencialidad. Si
                    quieres ver cómo están construidos por dentro, quedamos y te los enseño en
                    directo.
                  </p>
                </div>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <section className="section dark-section" id="enfoque">
        <div className="wrap">
          <Reveal className="section-top">
            <div>
              <div className="section-label">Cómo trabajo hoy</div>
              <h2 className="section-heading">
                Desarrollo e IA integrados
                <br />
                para entregar antes y mejor.
              </h2>
            </div>
            <p>
              No uso la IA como adorno: la integro en mi flujo diario para investigar, diseñar,
              programar, automatizar y documentar con criterio técnico.
            </p>
          </Reveal>

          <div className="ai-grid">
            <Reveal className="ai-card ai-card-featured">
              <div>
                <div className="ai-num">01 / AUTOMATIZACIÓN</div>
                <h3>Flujos de principio a fin y agentes autónomos</h3>
                <p>
                  Diseño automatizaciones completas donde cada agente se encarga de una tarea
                  concreta y conecta con tus herramientas reales.
                </p>
              </div>
              <AgentFlow />
            </Reveal>

            <Reveal className="ai-card" delay={0.07}>
              <div>
                <div className="ai-num">02 / MODELOS</div>
                <h3>El modelo adecuado para cada problema</h3>
                <p>
                  Trabajo a diario con los últimos modelos y elijo cuál usar según coste,
                  velocidad, contexto o capacidad de razonamiento.
                </p>
              </div>
              <ModelCycle />
            </Reveal>

            <Reveal className="ai-card" delay={0.14}>
              <div>
                <div className="ai-num">03 / DESARROLLO</div>
                <h3>Claude Code, Gemini CLI y habilidades a medida</h3>
                <p>
                  Combino entornos agénticos de terminal con instrucciones y habilidades propias
                  para mantener calidad, pruebas y velocidad de entrega.
                </p>
              </div>
              <CodeFlow />
            </Reveal>

            <Reveal className="ai-card ai-card-horizontal" delay={0.18}>
              <div>
                <div className="ai-num">04 / MEMORIA DE PROYECTO</div>
                <h3>Documentación viva en Obsidian conectada a la IA</h3>
                <p>
                  Mantengo el contexto, las decisiones técnicas y los procesos bien estructurados
                  para que ningún proyecto dependa de memoria improvisada ni se pierda el
                  conocimiento.
                </p>
              </div>
              <MemoryFlow />
            </Reveal>
          </div>

          <Reveal className="subsidy">
            <div>
              <div className="section-label" style={{ color: "var(--ink)", marginBottom: 10 }}>
                Oportunidad para empresas
              </div>
              <h3>375 horas subvencionadas como Agente del Cambio Tecnológico</h3>
              <p>
                Cuento con una subvención activa que cubre 375 horas de trabajo para impulsar la
                digitalización, el desarrollo web o la automatización con IA en tu empresa.
              </p>
            </div>
            <Button asChild className="portfolio-button" data-style="ink">
              <a href="#contacto">
                Consultar disponibilidad <ArrowUpRight />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section wrap" id="sobre-mi">
        <div className="about-grid">
          <Reveal className="about-card">
            <img src={portrait.url} alt="Erick Rodríguez" loading="lazy" />
            <div className="about-card-body">
              <div className="section-label" style={{ marginBottom: 8 }}>
                Barcelona · Disponible
              </div>
              <h3>Erick Rodríguez</h3>
              <p>
                Desarrollador web y especialista en marketing digital con mentalidad de producto:
                entiendo tanto el código y los sistemas como la captación de clientes y el impacto
                en negocio.
              </p>
              <div className="stack-list" aria-label="Competencias principales">
                <span>HTML · CSS · JavaScript</span>
                <span>PHP · SQL · Python</span>
                <span>React y aplicaciones web</span>
                <span>WordPress · Elementor</span>
                <span>SEO · Google Ads · CRM</span>
                <span>Automatización con IA</span>
                <span>Sistemas · Redes · Linux</span>
                <span>Español y Catalán nativos · Inglés B2</span>
              </div>
              <div className="mt-5">
                <Button asChild className="portfolio-button w-full" data-style="ink">
                  <a href={cvPdf.url} download="Erick-Rodriguez-CV.pdf">
                    Descargar CV en PDF <Download />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="section-label">Trayectoria</div>
              <h2 className="section-heading" style={{ marginBottom: 32 }}>
                Experiencia real en empresa
                <br />y base técnica sólida.
              </h2>
            </Reveal>

            <div className="timeline">
              {experience.map((item) => (
                <Reveal className="timeline-item" key={item.role}>
                  <time>{item.period}</time>
                  <div>
                    <h3 className="flex items-center gap-2">
                      <Briefcase size={16} /> {item.role}
                    </h3>
                    <div className="place">{item.place}</div>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}

              {education.map((item) => (
                <Reveal className="timeline-item" key={item.title}>
                  <time>{item.period}</time>
                  <div>
                    <h3 className="flex items-center gap-2">
                      <GraduationCap size={16} /> {item.title}
                    </h3>
                    <div className="place">{item.place}</div>
                  </div>
                </Reveal>
              ))}

              <Reveal className="timeline-item">
                <time>Qué aporto</time>
                <div>
                  <h3 className="flex items-center gap-2">
                    <Wrench size={16} /> Un solo perfil para cubrir todo el ciclo
                  </h3>
                  <div className="place">
                    Diseño · Desarrollo · Posicionamiento · Automatización · Soporte
                  </div>
                  <ul>
                    <li>
                      Comunicación directa conmigo, sin intermediarios ni agencias externas.
                    </li>
                    <li>
                      Capacidad para levantar una web corporativa, una aplicación, un ERP o un
                      sistema automatizado con IA.
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-band" id="contacto">
        <div className="wrap">
          <div className="section-label" style={{ justifyContent: "center" }}>
            Contacto directo
          </div>
          <h2>
            ¿Hablamos de tu web, tu app
            <br />o una demo en persona?
          </h2>
          <p>
            Escríbeme o llámame directamente. Estoy en Barcelona y respondo rápido tanto para
            proyectos a medida como para incorporarme a tu equipo.
          </p>

          <div className="contact-actions">
            <div className="contact-detail">
              <a className="inline-flex items-center gap-2" href={`mailto:${email}`}>
                <Mail size={16} /> {email}
              </a>
              <CopyButton value={email} label="correo" />
            </div>

            <div className="contact-detail">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                {phoneDisplay}
              </a>
              <CopyButton value={phoneDisplay} label="teléfono" />
            </div>

            <Button asChild className="portfolio-button" data-style="ink">
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
