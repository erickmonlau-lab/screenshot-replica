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

/* ───────────── 4 · second brain: knowledge graph ───────────── */

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const HUBS = [
  { id: "reglas", label: "Reglas", x: 380, y: 200 },
  { id: "skills", label: "Skills", x: 190, y: 110 },
  { id: "proyectos", label: "Proyectos", x: 580, y: 110 },
  { id: "clientes", label: "Clientes", x: 600, y: 300 },
  { id: "erp", label: "ERP", x: 200, y: 310 },
  { id: "decisiones", label: "Decisiones", x: 390, y: 52 },
];

const GRAPH = (() => {
  const r = rng(7);
  const leaves: { x: number; y: number; hub: number; r: number }[] = [];
  HUBS.forEach((h, hi) => {
    const n = hi === 0 ? 12 : 9;
    for (let k = 0; k < n; k++) {
      const a = r() * Math.PI * 2;
      const d = 40 + r() * 78;
      leaves.push({
        x: Math.min(735, Math.max(25, h.x + Math.cos(a) * d)),
        y: Math.min(380, Math.max(22, h.y + Math.sin(a) * d * 0.8)),
        hub: hi,
        r: 3.5 + r() * 3,
      });
    }
  });
  const links: [number, number][] = [];
  // hubs connect to the central hub
  for (let i = 1; i < HUBS.length; i++) links.push([0, i]);
  return { leaves, links };
})();

export function BrainVisual() {
  const hubPos = HUBS.map((h) => [h.x, h.y] as const);
  return (
    <Stage label="Grafo de conocimiento: el cerebro de IA en Obsidian">
      <g stroke="#27407E" strokeWidth={1.6} opacity={0.9}>
        {GRAPH.leaves.map((l, i) => (
          <line key={`l${i}`} x1={l.x} y1={l.y} x2={hubPos[l.hub]![0]} y2={hubPos[l.hub]![1]} />
        ))}
        {GRAPH.links.map(([a, b], i) => (
          <line key={`h${i}`} x1={hubPos[a]![0]} y1={hubPos[a]![1]} x2={hubPos[b]![0]} y2={hubPos[b]![1]} strokeWidth={2.6} stroke="#3B82F6" />
        ))}
        {/* a few cross links between neighbours */}
        {GRAPH.leaves.filter((_, i) => i % 3 === 0).map((l, i, arr) => {
          const o = arr[(i + 1) % arr.length]!;
          return <line key={`x${i}`} x1={l.x} y1={l.y} x2={o.x} y2={o.y} strokeDasharray="3 6" opacity={0.6} />;
        })}
      </g>

      {GRAPH.links.map(([a, b], i) => (
        <circle key={`p${i}`} r={5} fill={CREAM} filter="url(#glow)">
          <animateMotion
            dur={`${3 + (i % 3)}s`}
            begin={`${i * 0.7}s`}
            repeatCount="indefinite"
            path={`M ${hubPos[a]![0]} ${hubPos[a]![1]} L ${hubPos[b]![0]} ${hubPos[b]![1]}`}
          />
        </circle>
      ))}

      {GRAPH.leaves.map((l, i) => (
        <circle key={`n${i}`} cx={l.x} cy={l.y} r={l.r} fill="#9CC2FF">
          <animate attributeName="opacity" values="0.45;1;0.45" dur={`${3 + (i % 5) * 0.7}s`} begin={`${(i % 7) * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {HUBS.map((h, i) => (
        <g key={h.id}>
          <circle cx={h.x} cy={h.y} r={i === 0 ? 30 : 22} fill={BLUE} opacity={0.18}>
            <animate attributeName="r" values={i === 0 ? "28;38;28" : "20;28;20"} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={h.x} cy={h.y} r={i === 0 ? 17 : 12} fill={BLUE} filter="url(#glow)" />
          <text x={h.x} y={h.y + (i === 0 ? 46 : 38)} textAnchor="middle" fill="#FFFFFF" fontSize={17} fontWeight={700}>
            {h.label}
          </text>
        </g>
      ))}
    </Stage>
  );
}
