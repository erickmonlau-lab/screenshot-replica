import type { ReactNode } from "react";

/* Four animated scenes for the "En vivo" window. Pure SVG + SMIL/CSS, no JS loop. */

const BLUE = "#3B82F6";
const CREAM = "#F4EAD0";
const GREEN = "#10B981";
const ORANGE = "#FF6D5A";

function Stage({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#080A10]">
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
        <animate attributeName="opacity" values="0;1;0" dur="4.8s" begin={`${delay}s`} repeatCount="indefinite" />
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
          <path d={d} fill="none" stroke={BLUE} strokeWidth={3} strokeDasharray="6 10" opacity={0.7}>
            <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1.2s" repeatCount="indefinite" />
          </path>
          <circle r={6} fill={CREAM} filter="url(#glow)">
            <animateMotion dur="2.4s" begin={`${(i % 4) * 0.6}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      <Node x={10} y={170} w={190} title="Webhook" sub="Nuevo pedido" color={ORANGE} delay={0} />
      <Node x={240} y={170} w={190} title="Agente IA" sub="Valida y decide" color={BLUE} delay={0.8} />
      <Node x={480} y={50} title="CRM" sub="Cliente creado" color={GREEN} delay={1.6} />
      <Node x={480} y={170} title="Stock" sub="Reserva stock" color={GREEN} delay={2.0} />
      <Node x={480} y={290} title="WhatsApp" sub="Aviso al cliente" color={GREEN} delay={2.4} />
      <g transform="translate(703 175)">
        <circle cx={30} cy={30} r={30} fill={GREEN} opacity={0.15} />
        <circle cx={30} cy={30} r={22} fill={GREEN} filter="url(#glow)" />
        <path d="M 19 31 L 27 39 L 42 22" fill="none" stroke="#06150F" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
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
            <line x1={380} y1={200} x2={m.x} y2={m.y} stroke={BLUE} strokeWidth={4} strokeDasharray="8 10" filter="url(#glow)">
              <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1s" repeatCount="indefinite" />
            </line>
            <circle cx={m.x} cy={m.y} r={60} fill="#12151F" stroke={CREAM} strokeWidth={3} />
            <text x={m.x} y={m.y - 2} textAnchor="middle" fill="#FFFFFF" fontSize={18} fontWeight={700}>
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
      <circle cx={380} cy={200} r={58} fill="#0F1D3D" stroke={BLUE} strokeWidth={4} filter="url(#glow)" />
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
      <rect x={20} y={20} width={380} height={360} rx={16} fill="#0D1018" stroke="#2A3042" strokeWidth={2} />
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
              <animate attributeName="width" values="0;0;340;340;0" keyTimes={`0;${(i * 0.1 + 0.02).toFixed(2)};${(i * 0.1 + 0.12).toFixed(2)};0.92;1`} dur={`${CYCLE}s`} repeatCount="indefinite" />
            </rect>
          </clipPath>
          <text x={36} y={102 + i * 40} fill={c} fontSize={17} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" clipPath={`url(#cl${i})`}>
            {t.replace(/ /g, " ")}
          </text>
        </g>
      ))}
      <rect x={36} y={332} width={10} height={22} fill={CREAM}>
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>

      {/* preview */}
      <rect x={430} y={20} width={310} height={360} rx={16} fill="#12151F" stroke="#2A3042" strokeWidth={2} />
      <rect x={446} y={36} width={278} height={14} rx={7} fill="#1E2434" />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={446 + k * 96} y={66} width={86} height={58} rx={12} fill={BLUE} opacity={0}>
          <animate attributeName="opacity" values="0;0;0.9;0.9;0" keyTimes={`0;${0.42 + k * 0.05};${0.5 + k * 0.05};0.92;1`} dur={`${CYCLE}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k} opacity={0}>
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${0.58 + k * 0.05};${0.66 + k * 0.05};0.92;1`} dur={`${CYCLE}s`} repeatCount="indefinite" />
          <rect x={446} y={146 + k * 44} width={278} height={34} rx={9} fill="#1A1F2E" />
          <rect x={458} y={158 + k * 44} width={70} height={10} rx={5} fill={CREAM} opacity={0.8} />
          <rect x={620} y={158 + k * 44} width={90} height={10} rx={5} fill={k % 2 ? ORANGE : GREEN} opacity={0.9} />
        </g>
      ))}
    </Stage>
  );
}

/* ───────────── 4 · second brain: an Obsidian-style window with graph view ───────────── */

function rng(seed: number) {
  let v = seed;
  return () => {
    v = (v * 16807) % 2147483647;
    return (v - 1) / 2147483646;
  };
}

const OBS_BG = "#1E1E1E";
const OBS_SIDE = "#262626";
const OBS_TEXT = "#DCDDDE";
const OBS_MUTED = "#9A9A9A";
const OBS_NODE = "#8F8F8F";
const OBS_LINK = "#4A4A4A";
const OBS_ACCENT = "#A882FF";

const CLUSTERS: { id: string; label: string; x: number; y: number; notes: string[] }[] = [
  { id: "reglas", label: "reglas-agente", x: 470, y: 225, notes: ["estilo-codigo", "revision-pr", "seguridad"] },
  { id: "skills", label: "claude-skills", x: 330, y: 135, notes: ["n8n-flujos", "prompts", "agentes"] },
  { id: "proyectos", label: "proyectos", x: 625, y: 140, notes: ["diversplas", "gesgrama", "breadpdf"] },
  { id: "clientes", label: "clientes", x: 650, y: 320, notes: ["briefs", "presupuestos"] },
  { id: "erp", label: "erp-interno", x: 335, y: 320, notes: ["stock", "albaranes", "facturas"] },
  { id: "decisiones", label: "decisiones", x: 495, y: 85, notes: ["adr-stack", "adr-seo"] },
];

const BRAIN = (() => {
  const r = rng(11);
  return CLUSTERS.map((c, ci) => {
    const n = ci === 0 ? 17 : 13;
    const leaves = Array.from({ length: n }, (_, k) => {
      const ang = r() * Math.PI * 2;
      const dist = 26 + Math.pow(r(), 0.7) * 84;
      return {
        x: Math.min(735, Math.max(232, c.x + Math.cos(ang) * dist * 1.1)),
        y: Math.min(352, Math.max(60, c.y + Math.sin(ang) * dist * 0.8)),
        r: 2.6 + r() * 3.2,
        name: k < c.notes.length ? c.notes[k]! : null,
      };
    });
    const links = leaves.map((l, k) => {
      const t = k > 2 && r() > 0.45 ? leaves[Math.floor(r() * k)]! : null;
      return t ? [l.x, l.y, t.x, t.y] : [l.x, l.y, c.x, c.y];
    });
    return { ...c, leaves, links };
  });
})();

const TREE: [string, boolean, boolean][] = [
  ["reglas", false, false],
  ["skills", true, false],
  ["claude-skills.md", false, true],
  ["n8n-flujos.md", false, false],
  ["proyectos", false, false],
  ["clientes", false, false],
  ["erp-interno", false, false],
  ["decisiones", false, false],
];

export function BrainVisual() {
  return (
    <Stage label="Vista de grafo del cerebro de IA en Obsidian">
      <rect width={760} height={400} fill={OBS_BG} />
      {/* sidebar */}
      <rect width={196} height={400} fill={OBS_SIDE} />
      <line x1={196} y1={0} x2={196} y2={400} stroke="#363636" strokeWidth={2} />
      <text x={16} y={30} fill={OBS_MUTED} fontSize={15} fontWeight={600}>
        Cerebro
      </text>
      {TREE.map(([name, open, active], i) => (
        <g key={name} transform={`translate(0 ${54 + i * 38})`}>
          {active ? <rect x={8} y={-4} width={180} height={30} rx={8} fill="#3A3A3A" /> : null}
          <path
            d={open ? "M 18 8 L 28 8 L 23 15 Z" : "M 20 5 L 20 15 L 27 10 Z"}
            fill={OBS_MUTED}
            transform={name.endsWith(".md") ? "translate(14 0)" : undefined}
            opacity={name.endsWith(".md") ? 0 : 1}
          />
          <text x={name.endsWith(".md") ? 44 : 36} y={16} fill={active ? "#fff" : OBS_TEXT} fontSize={15}>
            {name}
          </text>
        </g>
      ))}

      {/* tab bar */}
      <rect x={197} y={0} width={563} height={40} fill="#1A1A1A" />
      <rect x={210} y={6} width={190} height={34} rx={8} fill={OBS_BG} />
      <circle cx={232} cy={23} r={5} fill="none" stroke={OBS_MUTED} strokeWidth={2} />
      <circle cx={246} cy={17} r={3} fill={OBS_MUTED} />
      <text x={260} y={28} fill={OBS_TEXT} fontSize={15}>
        Vista de grafo
      </text>

      {/* graph */}
      {BRAIN.map((c, ci) => (
        <g key={c.id} className={ci % 2 ? "drift-b" : "drift-a"}>
          <g stroke={OBS_LINK} strokeWidth={1.1}>
            {c.links.map((l, i) => (
              <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
            ))}
          </g>
          {c.leaves.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={l.r} fill={OBS_NODE} />
          ))}
          {/* highlight (hover) pass: purple links and nodes of this cluster */}
          <g opacity={0}>
            <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.02;0.08;0.15;0.2;1" dur="12s" begin={`${ci * 2}s`} repeatCount="indefinite" />
            <g stroke={OBS_ACCENT} strokeWidth={1.8}>
              {c.links.map((l, i) => (
                <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
              ))}
            </g>
            {c.leaves.map((l, i) => (
              <circle key={i} cx={l.x} cy={l.y} r={l.r + 0.6} fill={OBS_ACCENT} />
            ))}
            <circle cx={c.x} cy={c.y} r={13} fill={OBS_ACCENT} />
          </g>
          <circle cx={c.x} cy={c.y} r={ci === 0 ? 11 : 9} fill="#B5B5B5" />
          <text x={c.x} y={c.y + 28} textAnchor="middle" fill={OBS_TEXT} fontSize={15} fontWeight={600}>
            {c.label}
          </text>
          {c.leaves
            .filter((l) => l.name)
            .map((l, i) => (
              <text key={i} x={l.x} y={l.y + 20} textAnchor="middle" fill={OBS_MUTED} fontSize={14}>
                {l.name}
              </text>
            ))}
        </g>
      ))}

      {/* settings panel, like Obsidian's graph controls */}
      <g transform="translate(588 52)">
        <rect width={156} height={118} rx={10} fill="#262626" stroke="#3A3A3A" strokeWidth={1.5} />
        {["Filtros", "Grupos", "Visualización", "Fuerzas"].map((t, i) => (
          <g key={t} transform={`translate(0 ${14 + i * 26})`}>
            <path d="M 14 6 L 14 16 L 21 11 Z" fill={OBS_MUTED} />
            <text x={32} y={17} fill={OBS_TEXT} fontSize={15}>
              {t}
            </text>
          </g>
        ))}
      </g>
    </Stage>
  );
}
