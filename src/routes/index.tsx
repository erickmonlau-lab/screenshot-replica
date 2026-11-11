import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  Code2,
  Copy,
  Download,
  FileText,
  GitBranch,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Counter, Reveal } from "@/components/portfolio-motion";
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
    name: "diversplas.es",
    image: diversplas.url,
    status: "TOP 1 EN GOOGLE",
    description:
      "Web de extraescolares en Barcelona. Diseño, desarrollo y SEO: recién lanzada y ya en el Top 1 de Google.",
    type: "01 / WEB & SEO",
  },
  {
    name: "gesgrama.com",
    image: gesgrama.url,
    status: "EN PRODUCCIÓN",
    description:
      "Web corporativa a medida. Una presencia digital diseñada para el negocio, recién lanzada y posicionándose en Google.",
    type: "02 / WEB CORPORATIVA",
  },
  {
    name: "breadpdf.com",
    image: breadpdf.url,
    status: "PRODUCTO PROPIO",
    description:
      "Mi plataforma para trabajar con PDF. Un producto digital real, activo y con sus páginas indexadas en Google.",
    type: "03 / PRODUCTO DIGITAL",
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
  const reduced = useReducedMotion();
  const links = [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Mi enfoque", href: "#enfoque" },
    { label: "Sobre mí", href: "#sobre-mi" },
  ];
  const entrance = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
  return (
    <main className="portfolio">
      <section className="hero" id="inicio">
        <header className="nav wrap">
          <a href="#inicio" aria-label="Erick Rodríguez, inicio" className="monogram">
            er
            <span>
              ERICK
              <br />
              RODRÍGUEZ
            </span>
          </a>
          <nav className="nav-links" aria-label="Navegación principal">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="availability">
            <span className="status-dot" /> Hablemos de tu próximo proyecto{" "}
            <ArrowUpRight size={16} />
          </div>
          <Button
            variant="portfolio"
            data-style="line"
            className="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
          {menuOpen && (
            <nav className="menu-panel" id="mobile-navigation" aria-label="Navegación móvil">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="#contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </a>
            </nav>
          )}
        </header>
        <div className="hero-meta wrap">
          <span>Desarrollo web · Apps · Automatización con IA</span>
          <span>Barcelona, España ↗</span>
        </div>
        <motion.div
          className="wrap"
          initial={reduced ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.h1
            className="hero-name"
            variants={entrance}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          >
            <span>Erick</span>
            <span className="surname">Rodríguez.</span>
          </motion.h1>
        </motion.div>
        <motion.img
          className="portrait"
          src={portrait.url}
          alt="Erick Rodríguez"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div
          className="hero-bottom wrap"
          initial={reduced ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.35 }}
        >
          <div className="hero-copy">
            <motion.h2 variants={entrance}>
              De la idea a producción.
              <br />
              Sin depender de terceros.
            </motion.h2>
            <motion.p variants={entrance}>
              Puedo crear la web, app o sistema que necesite tu empresa, desde la idea hasta
              producción.
            </motion.p>
            <motion.div className="hero-actions" variants={entrance}>
              <Button variant="portfolio" data-style="ink" asChild>
                <a href="#proyectos">
                  Ver Proyectos en Producción <ArrowDown />
                </a>
              </Button>
              <Button variant="portfolio" data-style="line" asChild>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  Hablemos <MessageCircle />
                </a>
              </Button>
            </motion.div>
            <motion.div variants={entrance} className="mt-3">
              <Button variant="portfolio" data-style="line" asChild>
                <a href={demo}>
                  Solicitar Demo en Persona (ERP & App) <ArrowUpRight />
                </a>
              </Button>
            </motion.div>
          </div>
          <div className="hero-side">
            <p>
              Diseño. Desarrollo.
              <br />
              Automatizo. Resuelvo.
              <br />
              <strong>Tu negocio, conectado.</strong>
            </p>
            <a href="#proyectos" className="arrow" aria-label="Descubrir proyectos">
              <ArrowDown size={20} />
            </a>
          </div>
        </motion.div>
      </section>
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
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <motion.div whileHover={reduced ? {} : { y: -5 }}>
                <a
                  className="project block"
                  href={`https://${project.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-cover">
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
              </motion.div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="project">
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
            <Reveal className="ai-card">
              <GitBranch size={27} />
              <div className="flow">
                <div className="flow-node">
                  <Send size={16} /> Una tarea, un objetivo
                </div>
                <div className="flow-line" />
                <div className="flow-node">
                  <Bot size={20} /> Agente autónomo
                </div>
                <div className="flow-line" />
                <div className="flow-node">
                  <Check size={16} /> Resultado, conectado
                </div>
              </div>
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
              <div className="model-list">
                <span>Claude + Skills</span>
                <span>Gemini</span>
                <span>ChatGPT</span>
                <span>Perplexity</span>
              </div>
              <h3>
                Cada tarea,
                <br />
                su mejor modelo.
              </h3>
              <p>Uso estratégico de varios modelos de IA, según lo que necesita cada proyecto.</p>
            </Reveal>
            <Reveal className="ai-card" delay={0.2}>
              <Code2 size={27} />
              <div className="code-preview">
                <em>const</em> idea = tuNegocio;
                <br />
                <em>await</em> crear(idea);
                <br />
                // listo para producción
              </div>
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
            <Reveal className="ai-card" delay={0.15}>
              <div className="brain-visual">
                <FileText size={32} />
                <span />
                <BrainCircuit size={44} />
              </div>
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
