import { useEffect, useRef, type ReactNode } from "react";

/* Four animated scenes for the "En vivo" window. Pure SVG + SMIL/CSS, no JS loop. */

const BLUE = "#3B82F6";
const CREAM = "#F4EAD0";
const GREEN = "#10B981";
const ORANGE = "#FF6D5A";

function Stage({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080A10]">
      <svg viewBox="0 0 760 400" className="h-full w-full" role="img" aria-label={label}>
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#222838" />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="760" height="400" fill="url(#dots)" />
        {children}
      </svg>
    </div>
  );
}

/* ───────────── 1 · n8n workflow canvas ───────────── */

function Node({
  x,
  y,
  w = 190,
  title,
  sub,
  color,
  delay,
}: {
  x: number;
  y: number;
  w?: number;
  title: string;
  sub: string;
  color: string;
  delay: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={70} rx={16} fill="#12151F" stroke="#2A3042" strokeWidth={2} />
      <rect width={w} height={70} rx={16} fill="none" stroke={color} strokeWidth={2.5} opacity={0}>
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4.8s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </rect>
      <circle cx={34} cy={35} r={16} fill={color} opacity={0.18} />
      <circle cx={34} cy={35} r={7} fill={color} />
      <text x={62} y={31} fill="#FFFFFF" fontSize={18} fontWeight={700}>
        {title}
      </text>
      <text x={62} y={53} fill="#8B93A8" fontSize={15}>
        {sub}
      </text>
    </g>
  );
}

export function N8nVisual() {
  const edges = [
    "M 200 205 L 240 205", // A -> B
    "M 430 205 C 455 205 455 85 480 85", // B -> CRM
    "M 430 205 L 480 205", // B -> Stock
    "M 430 205 C 455 205 455 325 480 325", // B -> WhatsApp
    "M 670 85 C 695 85 695 205 708 205", // CRM -> done
    "M 670 205 L 708 205", // Stock -> done
    "M 670 325 C 695 325 695 205 708 205", // WA -> done
  ];
  return (
    <Stage label="Flujo n8n: webhook, agente de IA, CRM, stock y WhatsApp">
      {edges.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#2A3042" strokeWidth={3} />
          <path
            d={d}
            fill="none"
            stroke={BLUE}
            strokeWidth={3}
            strokeDasharray="6 10"
            opacity={0.7}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="32"
              to="0"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </path>
          <circle r={6} fill={CREAM} filter="url(#glow)">
            <animateMotion
              dur="2.4s"
              begin={`${(i % 4) * 0.6}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        </g>
      ))}
      <Node x={10} y={170} w={190} title="Webhook" sub="Nuevo pedido" color={ORANGE} delay={0} />
      <Node
        x={240}
        y={170}
        w={190}
        title="Agente IA"
        sub="Valida y decide"
        color={BLUE}
        delay={0.8}
      />
      <Node x={480} y={50} title="CRM" sub="Cliente creado" color={GREEN} delay={1.6} />
      <Node x={480} y={170} title="Stock" sub="Reserva stock" color={GREEN} delay={2.0} />
      <Node x={480} y={290} title="WhatsApp" sub="Aviso al cliente" color={GREEN} delay={2.4} />
      <g transform="translate(703 175)">
        <circle cx={30} cy={30} r={30} fill={GREEN} opacity={0.15} />
        <circle cx={30} cy={30} r={22} fill={GREEN} filter="url(#glow)" />
        <path
          d="M 19 31 L 27 39 L 42 22"
          fill="none"
          stroke="#06150F"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Stage>
  );
}

/* ───────────── 2 · several models around one task ───────────── */

export function ModelsVisual() {
  const models = [
    { name: "Claude", why: "Arquitectura", x: 120, y: 80 },
    { name: "Gemini", why: "Contexto", x: 640, y: 80 },
    { name: "ChatGPT", why: "Síntesis", x: 120, y: 320 },
    { name: "Perplexity", why: "Verificación", x: 640, y: 320 },
  ];
  return (
    <Stage label="Un mismo encargo repartido entre varios modelos de IA">
      {models.map((m, k) => (
        <g key={m.name}>
          <line x1={380} y1={200} x2={m.x} y2={m.y} stroke="#2A3042" strokeWidth={3} />
          <g>
            <animate
              attributeName="opacity"
              values="0.22;1;1;0.22;0.22"
              keyTimes="0;0.06;0.24;0.3;1"
              dur="8s"
              begin={`${k * 2}s`}
              repeatCount="indefinite"
            />
            <line
              x1={380}
              y1={200}
              x2={m.x}
              y2={m.y}
              stroke={BLUE}
              strokeWidth={4}
              strokeDasharray="8 10"
              filter="url(#glow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="36"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
            <circle cx={m.x} cy={m.y} r={60} fill="#12151F" stroke={CREAM} strokeWidth={3} />
            <text
              x={m.x}
              y={m.y - 2}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={18}
              fontWeight={700}
            >
              {m.name}
            </text>
            <text x={m.x} y={m.y + 20} textAnchor="middle" fill={CREAM} fontSize={15}>
              {m.why}
            </text>
          </g>
        </g>
      ))}
      <circle cx={380} cy={200} r={74} fill={BLUE} opacity={0.12}>
        <animate attributeName="r" values="70;86;70" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle
        cx={380}
        cy={200}
        r={58}
        fill="#0F1D3D"
        stroke={BLUE}
        strokeWidth={4}
        filter="url(#glow)"
      />
      <text x={380} y={196} textAnchor="middle" fill="#FFFFFF" fontSize={20} fontWeight={800}>
        Tu tarea
      </text>
      <text x={380} y={219} textAnchor="middle" fill="#9CC2FF" fontSize={15}>
        el modelo justo
      </text>
    </Stage>
  );
}

/* ───────────── 3 · code that builds an interface ───────────── */

export function CodeVisual() {
  const lines: [string, string][] = [
    ["export function Pedidos() {", "#F4EAD0"],
    ["  const { data } = useStock()", "#9CC2FF"],
    ["  return (", "#F4EAD0"],
    ["    <Tabla filas={data} />", "#10B981"],
    ["  )", "#F4EAD0"],
    ["}", "#F4EAD0"],
  ];
  const CYCLE = 9;
  return (
    <Stage label="Código que construye una interfaz">
      <rect
        x={20}
        y={20}
        width={380}
        height={360}
        rx={16}
        fill="#0D1018"
        stroke="#2A3042"
        strokeWidth={2}
      />
      <circle cx={42} cy={44} r={6} fill="#FF5F57" />
      <circle cx={62} cy={44} r={6} fill="#FEBC2E" />
      <circle cx={82} cy={44} r={6} fill="#28C840" />
      <text x={110} y={50} fill="#8B93A8" fontSize={15}>
        Pedidos.tsx
      </text>
      {lines.map(([t, c], i) => (
        <g key={i}>
          <clipPath id={`cl${i}`}>
            <rect x={36} y={78 + i * 40} width={0} height={34}>
              <animate
                attributeName="width"
                values="0;0;340;340;0"
                keyTimes={`0;${(i * 0.1 + 0.02).toFixed(2)};${(i * 0.1 + 0.12).toFixed(2)};0.92;1`}
                dur={`${CYCLE}s`}
                repeatCount="indefinite"
              />
            </rect>
          </clipPath>
          <text
            x={36}
            y={102 + i * 40}
            fill={c}
            fontSize={17}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            clipPath={`url(#cl${i})`}
          >
            {t.replace(/ /g, " ")}
          </text>
        </g>
      ))}
      <rect x={36} y={332} width={10} height={22} fill={CREAM}>
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>

      {/* preview */}
      <rect
        x={430}
        y={20}
        width={310}
        height={360}
        rx={16}
        fill="#12151F"
        stroke="#2A3042"
        strokeWidth={2}
      />
      <rect x={446} y={36} width={278} height={14} rx={7} fill="#1E2434" />
      {[0, 1, 2].map((k) => (
        <rect
          key={k}
          x={446 + k * 96}
          y={66}
          width={86}
          height={58}
          rx={12}
          fill={BLUE}
          opacity={0}
        >
          <animate
            attributeName="opacity"
            values="0;0;0.9;0.9;0"
            keyTimes={`0;${0.42 + k * 0.05};${0.5 + k * 0.05};0.92;1`}
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k} opacity={0}>
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes={`0;${0.58 + k * 0.05};${0.66 + k * 0.05};0.92;1`}
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
          />
          <rect x={446} y={146 + k * 44} width={278} height={34} rx={9} fill="#1A1F2E" />
          <rect x={458} y={158 + k * 44} width={70} height={10} rx={5} fill={CREAM} opacity={0.8} />
          <rect
            x={620}
            y={158 + k * 44}
            width={90}
            height={10}
            rx={5}
            fill={k % 2 ? ORANGE : GREEN}
            opacity={0.9}
          />
        </g>
      ))}
    </Stage>
  );
}

/* ───────────── 4 · second brain: live force-directed graph, Obsidian style ───────────── */

interface GNode {
  id: number;
  name: string;
  file: string;
  tag: string;
  desc: string;
  group: "moc" | "principles" | "project" | "engineering" | "agents" | "satellite";
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  ox: number;
  oy: number;
  r: number;
  deg: number;
}

function rng(seed: number) {
  let v = seed;
  return () => {
    v = (v * 16807) % 2147483647;
    return (v - 1) / 2147483646;
  };
}

/** Construye el grafo real del vault AI-DESIGN-KNOWLEDGE-V2 de Erick */
function buildGraph(): {
  nodes: GNode[];
  links: [number, number, number][];
  hubIndices: number[];
} {
  const r = rng(23);
  const nodes: GNode[] = [];
  const links: [number, number, number][] = [];

  const addNode = (
    name: string,
    file: string,
    tag: string,
    desc: string,
    group: GNode["group"],
    ax: number,
    ay: number,
    spread: number,
  ): GNode => {
    const ang = r() * Math.PI * 2;
    const dist = Math.sqrt(r()) * spread;
    const isHub = group === "moc";
    const n: GNode = {
      id: nodes.length,
      name,
      file,
      tag,
      desc,
      group,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      ax,
      ay,
      ox: Math.cos(ang) * dist,
      oy: Math.sin(ang) * dist,
      r: isHub ? 8.5 : group === "project" ? 5.8 : 4.5,
      deg: 0,
    };
    nodes.push(n);
    return n;
  };

  const link = (a: GNode, b: GNode, len = 125) => {
    links.push([a.id, b.id, len]);
    a.deg++;
    b.deg++;
  };

  // 1. NÚCLEO MAESTRO: 00-INDEX (Centro de la corteza cerebral)
  const idx = addNode(
    "00-INDEX",
    "00-INDEX.md",
    "#vault/master",
    "Índice maestro: directivas de diseño y arquitectura de inteligencia",
    "moc",
    0.50,
    0.42,
    0.02,
  );

  // 2. MOC-DESIGN (Lóbulo parieto-occipital: visión y estética)
  const mocDesign = addNode(
    "MOC-DESIGN",
    "_MAPS/MOC-DESIGN.md",
    "#vault/moc",
    "Principios de diseño, tipografía, composición, motion y color",
    "moc",
    0.72,
    0.38,
    0.02,
  );

  // 3. MOC-PROJECTS (Lóbulo temporal: memoria de proyectos en producción)
  const mocProjects = addNode(
    "MOC-PROJECTS",
    "_MAPS/MOC-PROJECTS.md",
    "#vault/moc",
    "Auditoría forense de proyectos reales: Oderalo, Gesgrama, BreadPDF",
    "moc",
    0.40,
    0.65,
    0.02,
  );

  // 4. MOC-ENGINEERING (Cerebelo: motricidad técnica y rendimiento)
  const mocEng = addNode(
    "MOC-ENGINEERING",
    "_MAPS/MOC-ENGINEERING.md",
    "#vault/moc",
    "Rendimiento web, presupuestos LCP/INP, SSR y PWA offline",
    "moc",
    0.73,
    0.74,
    0.02,
  );

  // 5. MOC-AI-WORKFLOWS & AGENTS (Lóbulo frontal: planificación y toma de decisiones)
  const mocAi = addNode(
    "MOC-AI-WORKFLOWS",
    "_MAPS/MOC-AI-WORKFLOWS.md",
    "#vault/moc",
    "Protocolos agénticos, memoria entre sesiones y skills de Antigravity",
    "moc",
    0.28,
    0.38,
    0.02,
  );

  const agents = addNode(
    "AGENTS.md",
    "AGENTS.md",
    "#vault/agents",
    "Reglas maestras y directivas que los agentes leen antes de codificar",
    "agents",
    0.22,
    0.52,
    0.02,
  );

  // Tronco de enlaces entre MOCs
  link(idx, mocDesign, 140);
  link(idx, mocProjects, 135);
  link(idx, mocEng, 150);
  link(idx, mocAi, 130);
  link(mocAi, agents, 95);
  link(mocDesign, mocProjects, 160);
  link(mocDesign, mocEng, 165);

  // ─── NOTAS REALES DE DISEÑO (AI-DESIGN-KNOWLEDGE-V2) ───
  const n01 = addNode(
    "01-Core Principles",
    "01-CORE-DESIGN-PRINCIPLES.md",
    "#principles",
    "7 principios de diseño y balance entre identidad de marca y propósito",
    "principles",
    0.78,
    0.28,
    0.08,
  );
  const n02 = addNode(
    "02-Creative Direction",
    "02-CREATIVE-DIRECTION.md",
    "#design",
    "Protocolo de 9 puntos antes de codificar y anatomía de sección",
    "principles",
    0.66,
    0.26,
    0.08,
  );
  const n03 = addNode(
    "03-Typography",
    "03-TYPOGRAPHY-AND-HIERARCHY.md",
    "#typography",
    "Escalas tipográficas, Barlow Condensed y salvaguarda de 16px",
    "principles",
    0.85,
    0.35,
    0.07,
  );
  const n04 = addNode(
    "04-Composition",
    "04-COMPOSITION-AND-LAYOUT.md",
    "#layout",
    "Bento Grid modular, balance asimétrico y densidad espacial",
    "principles",
    0.82,
    0.48,
    0.08,
  );
  const n05 = addNode(
    "05-Visual Assets",
    "05-VISUAL-ASSETS-AND-ILLUSTRATIONS.md",
    "#visuals",
    "Despieces técnicos X-Ray y mockups de software 1:1",
    "principles",
    0.88,
    0.44,
    0.07,
  );
  const n06 = addNode(
    "06-Motion",
    "06-MOTION-AND-INTERACTIONS.md",
    "#motion",
    "Leyes de movimiento a 60 fps, WAAPI y path drawing",
    "principles",
    0.68,
    0.56,
    0.08,
  );
  const n08 = addNode(
    "08-Color Identity",
    "08-COLOR-AND-BRAND-IDENTITY.md",
    "#color",
    "Heurística 85/10/5, contraste WCAG AAA y separación de marcas",
    "principles",
    0.62,
    0.32,
    0.08,
  );
  const n10 = addNode(
    "10-Anti-Patterns",
    "10-DESIGN-ANTI-PATTERNS.md",
    "#anti-patterns",
    "10 vicios de diseño: trampa de 3 tarjetas y pseudo-responsive",
    "principles",
    0.76,
    0.20,
    0.07,
  );
  const n11 = addNode(
    "11-Quality Criteria",
    "11-QUALITY-AND-ACCEPTANCE-CRITERIA.md",
    "#quality",
    "Rúbrica de 12 puntos y Definition of Done estricta",
    "principles",
    0.60,
    0.22,
    0.08,
  );

  [n01, n02, n03, n04, n05, n06, n08, n10, n11].forEach((n) => link(mocDesign, n, 105 + r() * 30));
  link(n01, n10, 85);
  link(n01, n11, 85);
  link(n03, n04, 80);
  link(n04, n05, 80);
  link(n06, mocEng, 110);

  // ─── NOTAS REALES DE PROYECTOS (PROJECTS/) ───
  const pOderalo = addNode(
    "ORDERALO",
    "PROJECTS/ORDERALO.md",
    "#project/erp",
    "Vertical B2B SaaS: ERP, app de campo con firma digital y facturación",
    "project",
    0.32,
    0.62,
    0.07,
  );
  const pDiversplas = addNode(
    "DIVERSPLAS",
    "PROJECTS/DIVERSPLAS.md",
    "#project/web",
    "Web a medida para colegios y AFAs: gestión de extraescolares y casales",
    "project",
    0.52,
    0.64,
    0.07,
  );
  const pGesgrama = addNode(
    "GESGRAMA",
    "PROJECTS/GESGRAMA.md",
    "#project/portal",
    "Portal inmobiliario de alta gama con valorador algorítmico en tiempo real",
    "project",
    0.46,
    0.72,
    0.08,
  );
  const pBreadpdf = addNode(
    "BREADPDF",
    "PROJECTS/BREADPDF.md",
    "#project/wasm",
    "Suite de utilidades PDF en cliente, 100 PageSpeed y cero vaporware",
    "project",
    0.38,
    0.54,
    0.07,
  );
  const pKovia = addNode(
    "KOVIA",
    "PROJECTS/KOVIA.md",
    "#project/ai",
    "Landing page para agentes de voz con arquitectura electric dark",
    "project",
    0.26,
    0.70,
    0.08,
  );

  [pOderalo, pDiversplas, pGesgrama, pBreadpdf, pKovia].forEach((p) => link(mocProjects, p, 100 + r() * 25));
  link(pOderalo, mocEng, 120);

  // ─── NOTAS REALES DE INGENIERÍA Y RENDIMIENTO ───
  const e12 = addNode(
    "12-Engineering",
    "12-ENGINEERING-AND-PERFORMANCE.md",
    "#engineering",
    "Presupuestos de rendimiento: LCP < 1.2s, INP, CLS y SSR fonts",
    "engineering",
    0.68,
    0.82,
    0.07,
  );
  const eReact = addNode(
    "React 19 & TS",
    "TECH/REACT-TS.md",
    "#tech",
    "Arquitectura desacoplada, tipado estricto y TanStack Start",
    "engineering",
    0.78,
    0.84,
    0.07,
  );
  const ePwa = addNode(
    "Offline-First PWA",
    "TECH/PWA-OFFLINE.md",
    "#tech/pwa",
    "Sincronización en segundo plano con IndexedDB y Service Workers",
    "engineering",
    0.82,
    0.72,
    0.07,
  );
  const eN8n = addNode(
    "n8n Webhooks",
    "TECH/N8N-AUTOMATION.md",
    "#automation",
    "Flujos de automatización entre formularios, CRM y WhatsApp",
    "engineering",
    0.58,
    0.86,
    0.08,
  );

  [e12, eReact, ePwa, eN8n].forEach((e) => link(mocEng, e, 95 + r() * 25));
  link(ePwa, pOderalo, 115);
  link(eN8n, pOderalo, 110);

  // ─── NOTAS DE AGENTES Y MEMORIA ───
  const aEvidence = addNode(
    "Evidence Register",
    "EVIDENCE-REGISTER.md",
    "#evidence",
    "Matriz de trazabilidad maestra con referencias ID auditadas",
    "agents",
    0.22,
    0.26,
    0.07,
  );
  const aDecisions = addNode(
    "Decisions Log",
    "_DECISIONS/DECISIONS-LOG.md",
    "#decisions",
    "Registro cronológico e inmutable de decisiones técnicas",
    "agents",
    0.34,
    0.24,
    0.07,
  );
  const aSkills = addNode(
    "Claude Skills",
    "SKILLS/CLAUDE-SKILLS.md",
    "#skills",
    "Skills de diseño, animación y calidad integradas con IA",
    "agents",
    0.36,
    0.46,
    0.07,
  );
  const aAntigravity = addNode(
    "Antigravity CLI",
    "SYSTEM/ANTIGRAVITY.md",
    "#system",
    "Entorno de desarrollo agéntico y subagentes coordinados",
    "agents",
    0.16,
    0.42,
    0.07,
  );

  [aEvidence, aDecisions, aSkills, aAntigravity].forEach((a) => link(mocAi, a, 90 + r() * 25));
  link(agents, aEvidence, 85);
  link(agents, aDecisions, 85);
  link(agents, aSkills, 80);

  // ─── 14 NOTAS SATÉLITE SIN TÍTULO (Densidad orgánica del Vault) ───
  for (let i = 0; i < 14; i++) {
    const parent = nodes[Math.floor(r() * (nodes.length - 1)) + 1]!;
    const sat = addNode("", "", "", "", "satellite", parent.ax, parent.ay, 0.12);
    sat.r = 2.4 + r() * 1.6;
    link(parent, sat, 45 + r() * 35);
  }

  const hubIndices = [idx.id, mocDesign.id, mocProjects.id, mocEng.id, mocAi.id, agents.id];

  return { nodes, links, hubIndices };
}

/* Geometría anatómica hiperrealista del cerebro humano lateral (440x340) */
const CEREBRUM_D =
  "M75 175 C52 145 64 96 105 68 C135 44 185 36 230 42 C275 28 335 34 375 75 C405 105 410 155 385 185 C370 202 345 206 325 204 C295 214 255 218 220 222 C170 240 125 238 110 215 C100 195 115 185 130 180 C105 182 85 188 75 175 Z";

const CEREBELLUM_D =
  "M272 216 C302 208 358 212 374 240 C382 268 346 296 306 292 C270 288 252 255 272 216 Z";

const STEM_D =
  "M226 228 C231 255 237 285 242 316 L268 316 C264 288 260 258 258 228 Z";

/** Surcos anatómicos reales de la corteza cerebral (Fisuras de Silvio, Rolando, Parietooccipital, etc.) */
const ANATOMICAL_SULCI = [
  "M115 198 C145 186 185 178 235 166 C265 160 295 172 325 160", // Fisura lateral de Silvio
  "M228 44 C235 80 216 118 228 155", // Surco central de Rolando
  "M185 52 C190 85 176 115 188 148", // Surco precentral
  "M270 42 C278 78 262 112 272 145", // Surco poscentral
  "M110 88 C135 80 160 92 185 84", // Surco frontal superior
  "M90 128 C120 116 145 132 175 122", // Surco frontal inferior
  "M135 212 C175 198 220 194 270 190 C295 188 320 200 345 192", // Surco temporal superior
  "M285 78 C315 72 335 88 365 82", // Surco intraparietal
  "M345 58 C352 92 340 125 368 145", // Surco parietooccipital
  "M365 115 C385 128 388 158 365 172", // Fisuras occipitales
  "M78 150 C98 142 112 156 128 148", // Rama frontopolar
  "M95 110 C112 102 125 116 140 108", // Rama orbitofrontal
];

/** Estrías de la corteza cerebelosa (Folia) */
const CEREBELLAR_FOLIA = [
  "M282 230 C310 222 345 228 365 245",
  "M276 246 C308 238 348 244 368 260",
  "M278 262 C305 255 338 260 355 274",
  "M285 276 C308 270 330 274 342 284",
];

export function BrainVisual({ theme = "light" }: { theme?: "light" | "dark" }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = theme === "light";

    const { nodes, links, hubIndices } = buildGraph();
    const adj: Set<number>[] = nodes.map(() => new Set());
    links.forEach(([a, b]) => {
      adj[a]!.add(b);
      adj[b]!.add(a);
    });

    let W = 0;
    let H = 0;
    let dpr = 1;
    let placed = false;

    // Pulsos de sinapsis activos
    const pulses: Array<{
      linkIdx: number;
      from: number;
      to: number;
      progress: number;
      speed: number;
    }> = [];

    const spawnPulse = () => {
      if (pulses.length >= 14) return;
      const linkIdx = Math.floor(Math.random() * links.length);
      const [a, b] = links[linkIdx]!;
      const forward = Math.random() > 0.5;
      pulses.push({
        linkIdx,
        from: forward ? a : b,
        to: forward ? b : a,
        progress: 0,
        speed: 0.006 + Math.random() * 0.008,
      });
    };

    for (let i = 0; i < 7; i++) {
      spawnPulse();
      if (pulses[i]) pulses[i]!.progress = Math.random();
    }

    const cerebrumSrc = new Path2D(CEREBRUM_D);
    const cerebellumSrc = new Path2D(CEREBELLUM_D);
    const stemSrc = new Path2D(STEM_D);
    const sulciSrcs = ANATOMICAL_SULCI.map((d) => new Path2D(d));
    const foliaSrcs = CEREBELLAR_FOLIA.map((d) => new Path2D(d));

    let parts: Path2D[] = [];
    let bs = 1;
    let bx0 = 0;
    let by0 = 0;

    const buildBrain = (nw: number, nh: number) => {
      bs = Math.min((nw * 0.94) / 440, (nh * 0.94) / 340);
      bx0 = (nw - 440 * bs) / 2;
      by0 = (nh - 340 * bs) / 2;
      parts = [cerebrumSrc, cerebellumSrc, stemSrc].map((src) => {
        const q = new Path2D();
        q.addPath(src, { a: bs, b: 0, c: 0, d: bs, e: bx0, f: by0 });
        return q;
      });
    };

    const inBrainPt = (x: number, y: number) =>
      parts.some((q) => ctx.isPointInPath(q, x * dpr, y * dpr));

    const inBrain = (x: number, y: number) =>
      inBrainPt(x, y) &&
      inBrainPt(x - 12, y) &&
      inBrainPt(x + 12, y) &&
      inBrainPt(x, y - 12) &&
      inBrainPt(x, y + 12);

    const resize = () => {
      const r = box.getBoundingClientRect();
      const nw = Math.max(200, r.width);
      const nh = Math.max(200, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = nw * dpr;
      canvas.height = nh * dpr;
      canvas.style.width = `${nw}px`;
      canvas.style.height = `${nh}px`;

      if (!placed) {
        buildBrain(nw, nh);
        nodes.forEach((n) => {
          n.ax = bx0 + (0.16 + ((n.ax - 0.5) / 0.4) * 0.6) * 440 * bs;
          n.ay = by0 + (0.16 + ((n.ay - 0.12) / 0.62) * 0.5) * 340 * bs;
          n.x = n.ax + n.ox * nh * 0.45;
          n.y = n.ay + n.oy * nh * 0.45;
        });
        placed = true;
      } else {
        buildBrain(nw, nh);
        const scaleX = nw / W;
        const scaleY = nh / H;
        nodes.forEach((n) => {
          n.x *= scaleX;
          n.y *= scaleY;
          n.ax *= scaleX;
          n.ay *= scaleY;
        });
      }
      W = nw;
      H = nh;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    let hover = -1;
    let drag = -1;
    const pt = { x: 0, y: 0 };

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pt.x = e.clientX - r.left;
      pt.y = e.clientY - r.top;
    };

    const pick = () => {
      let best = -1;
      let minD = 1e9;
      for (const n of nodes) {
        const d = Math.hypot(n.x - pt.x, n.y - pt.y);
        const hitArea = Math.max(26, n.r + 18);
        if (d < hitArea && d < minD) {
          minD = d;
          best = n.id;
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      local(e);
      if (drag < 0) hover = pick();
    };

    const onDown = (e: PointerEvent) => {
      local(e);
      const p = pick();
      if (p >= 0) {
        drag = p;
        hover = p;
        canvas.setPointerCapture(e.pointerId);
      }
    };

    const onUp = () => {
      drag = -1;
    };

    const onLeave = () => {
      if (drag < 0) hover = -1;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const step = (t: number) => {
      const n = nodes.length;
      const S = Math.min(W, H) / 500;
      const cut = 280 * S;

      // 1. Repulsión entre nodos
      for (let i = 0; i < n; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j]!;
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 > cut * cut) continue;
          if (d2 < 1) {
            dx = (Math.random() - 0.5) * 4;
            dy = (Math.random() - 0.5) * 4;
            d2 = 1;
          }
          const dist = Math.sqrt(d2);
          const minSeparation = 56 * S;
          const repulsionConstant = dist < minSeparation ? 2400 : 900;
          const f = Math.min(4.2, (repulsionConstant * S * S) / (d2 + 10 * S * S));
          const fx = (dx / dist) * f;
          const fy = (dy / dist) * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }

      // 2. Tensión de resortes
      for (const [ia, ib, len] of links) {
        const a = nodes[ia]!;
        const b = nodes[ib]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const diff = dist - len * S;
        const k = 0.016;
        const fx = (dx / dist) * diff * k;
        const fy = (dy / dist) * diff * k;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      // 3. Atracción suave a su ancla anatómica en el lóbulo correspondiente
      for (let i = 0; i < n; i++) {
        const nd = nodes[i]!;
        if (i === drag) continue;
        const kAnchor = nd.group === "moc" ? 0.045 : 0.022;
        nd.vx += (nd.ax - nd.x) * kAnchor;
        nd.vy += (nd.ay - nd.y) * kAnchor;
      }

      // 4. Integración física y confinamiento cortical
      const damping = 0.85;
      for (let i = 0; i < n; i++) {
        const nd = nodes[i]!;
        if (i === drag) {
          nd.x += (pt.x - nd.x) * 0.4;
          nd.y += (pt.y - nd.y) * 0.4;
          nd.vx = 0;
          nd.vy = 0;
          continue;
        }
        nd.vx *= damping;
        nd.vy *= damping;
        const speed = Math.hypot(nd.vx, nd.vy);
        const maxSpeed = 7 * S;
        if (speed > maxSpeed) {
          nd.vx = (nd.vx / speed) * maxSpeed;
          nd.vy = (nd.vy / speed) * maxSpeed;
        }

        const nx = nd.x + nd.vx;
        const ny = nd.y + nd.vy;

        if (inBrain(nx, ny)) {
          nd.x = nx;
          nd.y = ny;
        } else {
          nd.vx = -nd.vx * 0.5;
          nd.vy = -nd.vy * 0.5;
          const cx = bx0 + 220 * bs;
          const cy = by0 + 170 * bs;
          const toCx = cx - nd.x;
          const toCy = cy - nd.y;
          const dC = Math.hypot(toCx, toCy) || 1;
          nd.x += (toCx / dC) * 3;
          nd.y += (toCy / dC) * 3;
        }
      }

      // 5. Avance de pulsos sinápticos
      if (Math.random() < 0.08) spawnPulse();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]!;
        p.progress += p.speed;
        if (p.progress >= 1) pulses.splice(i, 1);
      }
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = bx0 + 220 * bs;
      const cy = by0 + 160 * bs;

      // ─── 1. RESPLANDOR AMBIENTAL BIOLUMINISCENTE ───
      const glowGrad = ctx.createRadialGradient(cx, cy, 30 * bs, cx, cy, 240 * bs);
      glowGrad.addColorStop(0, "rgba(167, 139, 250, 0.35)");
      glowGrad.addColorStop(0.5, "rgba(109, 40, 217, 0.15)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, W, H);

      // ─── 2. CEREBRO HIPERREALISTA: VOLUMEN CORTICAL TRANSLÚCIDO Y SOMBRA SUAVE ───
      ctx.save();
      // Sombra natural flotante y difusa (sin bloque negro duro)
      ctx.shadowColor = "rgba(15, 8, 35, 0.42)";
      ctx.shadowBlur = 32 * bs;
      ctx.shadowOffsetY = 14 * bs;

      ctx.save();
      ctx.translate(bx0, by0);
      ctx.scale(bs, bs);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Gradiente de volumen cortical (corteza cerebral orgánica con profundidad)
      const cortexGrad = ctx.createRadialGradient(210, 140, 40, 220, 160, 220);
      cortexGrad.addColorStop(0, "#FFFFFF");
      cortexGrad.addColorStop(0.35, "#FBF9FF");
      cortexGrad.addColorStop(0.75, "#F0EBFD");
      cortexGrad.addColorStop(1, "#E5DBFC");

      // A. Tronco Encefálico (Pons & Medulla) con sombreado cilíndrico
      const stemGrad = ctx.createLinearGradient(226, 228, 268, 228);
      stemGrad.addColorStop(0, "#DDD6FE");
      stemGrad.addColorStop(0.5, "#EDE9FE");
      stemGrad.addColorStop(1, "#C4B5FD");
      ctx.fillStyle = stemGrad;
      ctx.fill(stemSrc);

      // B. Cerebelo (Arquitectura foliar)
      const cerebellumGrad = ctx.createRadialGradient(315, 255, 10, 315, 255, 75);
      cerebellumGrad.addColorStop(0, "#EDE9FE");
      cerebellumGrad.addColorStop(0.7, "#DDD6FE");
      cerebellumGrad.addColorStop(1, "#C4B5FD");
      ctx.fillStyle = cerebellumGrad;
      ctx.fill(cerebellumSrc);

      // C. Hemisferio Cerebral (Cortex)
      ctx.fillStyle = cortexGrad;
      ctx.fill(cerebrumSrc);

      // Borde sutil hiperrealista (no línea de cómic gruesa)
      ctx.strokeStyle = "rgba(109, 40, 217, 0.28)";
      ctx.lineWidth = 2 / bs;
      ctx.stroke(cerebrumSrc);
      ctx.stroke(cerebellumSrc);
      ctx.stroke(stemSrc);

      // ─── 3. PLIEGUES Y SURCOS CORTICALES EN RELIEVE 3D (EMBOSSED SHADING) ───
      // Pase 1: Sombra hendidura (profundidad del surco)
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "rgba(109, 40, 217, 0.32)";
      ctx.lineWidth = 3.6;
      for (const s of sulciSrcs) ctx.stroke(s);

      // Pase 2: Cresta de luz especular en el borde superior del pliegue
      ctx.save();
      ctx.translate(0, -0.9);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.3;
      for (const s of sulciSrcs) ctx.stroke(s);
      ctx.restore();

      // Estrías cerebelosas horizontales (Folia)
      ctx.strokeStyle = "rgba(109, 40, 217, 0.28)";
      ctx.lineWidth = 2.2;
      for (const f of foliaSrcs) ctx.stroke(f);
      ctx.save();
      ctx.translate(0, -0.6);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1.0;
      for (const f of foliaSrcs) ctx.stroke(f);
      ctx.restore();

      ctx.restore();
      ctx.restore();

      // Auto-enfoque al MOC activo si no hay interacción
      const focus =
        hover >= 0
          ? hover
          : hubIndices[Math.floor(Math.max(0, t - t0) / 3800) % hubIndices.length]!;
      const near = adj[focus] || new Set<number>();

      // ─── 4. ENLACES SINÁPTICOS (OBSIDIAN GRAPH EDGES) ───
      for (const [ia, ib] of links) {
        const a = nodes[ia]!;
        const b = nodes[ib]!;
        const hot = ia === focus || ib === focus;

        if (hot) {
          ctx.strokeStyle = "#6D28D9";
          ctx.lineWidth = 2.6;
        } else {
          ctx.strokeStyle = "rgba(109, 40, 217, 0.18)";
          ctx.lineWidth = 1.0;
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // ─── 5. PULSOS ELÉCTRICOS DE TRANSMISIÓN SINÁPTICA ───
      for (const p of pulses) {
        const a = nodes[p.from]!;
        const b = nodes[p.to]!;
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#A78BFA";
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // ─── 6. NODOS REALES DEL VAULT CON IDENTIDAD OBSIDIAN ───
      for (const nd of nodes) {
        const on = nd.id === focus;
        const isNear = near.has(nd.id);
        const isMoc = nd.group === "moc";

        // Coloración Obsidian auténtica por categoría
        let nodeColor = "#7C3AED"; // Default violeta de Obsidian
        let haloColor = "rgba(124, 58, 237, 0.25)";

        if (isMoc) {
          nodeColor = on ? "#6D28D9" : "#8B5CF6";
          haloColor = "rgba(139, 92, 246, 0.35)";
        } else if (nd.group === "project") {
          nodeColor = "#F59E0B"; // Ámbar dorado para proyectos reales
          haloColor = "rgba(245, 158, 11, 0.35)";
        } else if (nd.group === "engineering") {
          nodeColor = "#10B981"; // Esmeralda para arquitectura técnica
          haloColor = "rgba(16, 185, 129, 0.35)";
        } else if (nd.group === "agents") {
          nodeColor = "#4C1D95"; // Violeta oscuro ejecutivo para agentes
          haloColor = "rgba(76, 29, 149, 0.35)";
        } else if (nd.group === "satellite") {
          nodeColor = "rgba(139, 92, 246, 0.45)";
          haloColor = "transparent";
        }

        // Halo pulsante para MOCs o nodos activos
        if (on || isNear || isMoc) {
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, nd.r + (on ? 7 : isMoc ? 5 : 3), 0, Math.PI * 2);
          ctx.fillStyle = haloColor;
          ctx.fill();
        }

        // Cuerpo del nodo
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Borde blanco de alto contraste
        ctx.strokeStyle = on ? "#FFFFFF" : isMoc ? "#EDE9FE" : "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = isMoc ? 2.2 : 1.4;
        ctx.stroke();
      }

      // ─── 7. ETIQUETAS DE TEXTO ANTI-COLISIÓN (ESTILO OBSIDIAN) ───
      interface DrawnLabel {
        x: number;
        y: number;
        w: number;
        h: number;
      }
      const drawnBoxes: DrawnLabel[] = [];

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const tryDrawLabel = (name: string, x: number, y: number, isHighlight: boolean) => {
        if (!name) return;
        ctx.font = isHighlight
          ? "800 13px Inter Variable, Inter, sans-serif"
          : "700 12px Inter Variable, Inter, sans-serif";
        const metrics = ctx.measureText(name);
        const textW = metrics.width;
        const boxW = textW + 18;
        const boxH = 26;

        let boxX = x - boxW / 2;
        let boxY = y + 14;

        const collides = (bx: number, by: number) => {
          return drawnBoxes.some(
            (b) =>
              bx < b.x + b.w + 6 &&
              bx + boxW + 6 > b.x &&
              by < b.y + b.h + 4 &&
              by + boxH + 4 > b.y,
          );
        };

        if (collides(boxX, boxY)) {
          boxY = y - boxH - 12;
        }

        if (collides(boxX, boxY) && !isHighlight) return;

        drawnBoxes.push({ x: boxX, y: boxY, w: boxW, h: boxH });

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 6);

        if (isHighlight) {
          ctx.fillStyle = "#09090B";
          ctx.fill();
          ctx.strokeStyle = "#A78BFA";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.fill();
          ctx.strokeStyle = "rgba(109, 40, 217, 0.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#09090B";
        }

        ctx.fillText(name, x, boxY + boxH / 2);
        ctx.restore();
      };

      // Nodo enfocado (mayor prioridad)
      const focusNode = nodes[focus]!;
      tryDrawLabel(focusNode.name, focusNode.x, focusNode.y, true);

      // Vecinos directos
      const sortedNeighbors = Array.from(near)
        .map((id) => nodes[id]!)
        .filter((n) => n.name)
        .sort((a, b) => {
          const da = Math.hypot(a.x - focusNode.x, a.y - focusNode.y);
          const db = Math.hypot(b.x - focusNode.x, b.y - focusNode.y);
          return da - db;
        })
        .slice(0, 3);

      for (const nn of sortedNeighbors) {
        tryDrawLabel(nn.name, nn.x, nn.y, false);
      }

      // MOCs principales
      for (const hid of hubIndices) {
        if (hid !== focus && !near.has(hid)) {
          const hn = nodes[hid]!;
          tryDrawLabel(hn.name, hn.x, hn.y, false);
        }
      }

      // ─── 8. OBSIDIAN NOTE INSPECTOR (Tarjeta flotante en la esquina inferior) ───
      if (focusNode.name) {
        const cardW = 340;
        const cardH = 82;
        const cardX = Math.min(W - cardW - 16, Math.max(16, focusNode.x - cardW / 2));
        const cardY = H - cardH - 12;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardW, cardH, 10);
        ctx.fillStyle = "rgba(9, 9, 11, 0.92)";
        ctx.fill();
        ctx.strokeStyle = "#8B5CF6";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Icono y título de la nota
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#A78BFA";
        ctx.font = "800 11px JetBrains Mono, monospace";
        ctx.fillText(`[[${focusNode.file || focusNode.name}]]`, cardX + 12, cardY + 10);

        // Badge de etiqueta
        if (focusNode.tag) {
          ctx.fillStyle = "#6D28D9";
          const tagW = ctx.measureText(focusNode.tag).width + 12;
          ctx.beginPath();
          ctx.roundRect(cardX + cardW - tagW - 12, cardY + 9, tagW, 16, 4);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "700 9px Inter Variable, Inter, sans-serif";
          ctx.fillText(focusNode.tag, cardX + cardW - tagW - 6, cardY + 12);
        }

        // Descripción de la nota
        ctx.fillStyle = "#E4E4E7";
        ctx.font = "500 11px Inter Variable, Inter, sans-serif";
        const descText = focusNode.desc || "Nota de conocimiento indexada en Obsidian Vault";
        ctx.fillText(descText.slice(0, 52) + (descText.length > 52 ? "..." : ""), cardX + 12, cardY + 34);

        // Subtítulo con metadata
        ctx.fillStyle = "#A1A1AA";
        ctx.font = "600 10px Inter Variable, Inter, sans-serif";
        ctx.fillText(`Vault: AI-DESIGN-KNOWLEDGE-V2 · ${adj[focusNode.id]?.size || 0} conexiones`, cardX + 12, cardY + 54);

        ctx.restore();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      step(now);
      draw(now);
    };

    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? true;
    });
    io.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [theme]);

  return (
    <div
      ref={wrap}
      className={`relative h-full min-h-[340px] w-full overflow-hidden ${theme === "light" ? "bg-transparent" : "bg-[#0B0C10]"}`}
    >
      <canvas
        ref={cv}
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        role="img"
        aria-label="Grafo de notas del cerebro de IA en movimiento: arrastra un nodo"
      />
    </div>
  );
}
