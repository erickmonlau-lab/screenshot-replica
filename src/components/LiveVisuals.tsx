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
  group: "hub" | "skill" | "rule" | "project" | "satellite";
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

function buildGraph(): {
  nodes: GNode[];
  links: [number, number, number][];
  hubIndices: number[];
} {
  const r = rng(7);
  const nodes: GNode[] = [];
  const links: [number, number, number][] = [];

  const addNode = (
    name: string,
    group: GNode["group"],
    ax: number,
    ay: number,
    spread: number,
  ): GNode => {
    const ang = r() * Math.PI * 2;
    const dist = Math.sqrt(r()) * spread;
    const n: GNode = {
      id: nodes.length,
      name,
      group,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      ax,
      ay,
      ox: Math.cos(ang) * dist,
      oy: Math.sin(ang) * dist,
      r: group === "hub" ? 8 : 4.5,
      deg: 0,
    };
    nodes.push(n);
    return n;
  };

  const link = (a: GNode, b: GNode, len = 130) => {
    links.push([a.id, b.id, len]);
    a.deg++;
    b.deg++;
  };

  // 1. Core Hub: MOC-INDEX (Center-right anchor)
  const mocIndex = addNode("MOC-INDEX", "hub", 0.66, 0.48, 0.02);

  // 2. Design Hub: MOC-DESIGN (Bottom-right cluster)
  const mocDesign = addNode("MOC-DESIGN", "hub", 0.84, 0.68, 0.02);

  // 3. Projects Hub: PROJECTS (Top-right cluster)
  const mocProjects = addNode("PROJECTS", "hub", 0.82, 0.26, 0.02);

  // 4. Engineering & Agent Hub: AGENTS (Center-left cluster)
  const mocAgents = addNode("AGENTS", "hub", 0.52, 0.58, 0.02);

  // Hub connections (Backbone)
  link(mocIndex, mocDesign, 150);
  link(mocIndex, mocProjects, 140);
  link(mocIndex, mocAgents, 130);
  link(mocDesign, mocProjects, 180);

  // Design cluster (around MOC-DESIGN: 0.84, 0.68)
  const designNodes = [
    "SKILL-apple-design",
    "SKILL-premium-ui",
    "SKILL-motion",
    "05-TYPOGRAPHY",
    "04-COLOR",
    "03-LAYOUT",
    "02-COMPONENTS",
    "01-FOUNDATIONS",
  ].map((name) => addNode(name, "skill", 0.84, 0.68, 0.18));

  designNodes.forEach((n) => {
    link(mocDesign, n, 110 + r() * 40);
  });
  link(designNodes[0]!, designNodes[3]!, 90); // apple-design -> typography
  link(designNodes[1]!, designNodes[2]!, 90); // premium-ui -> motion
  link(designNodes[5]!, designNodes[6]!, 85); // layout -> components

  // Projects cluster (around PROJECTS: 0.82, 0.26)
  const projectNodes = ["ORDERALO", "GESGRAMA", "BREADPDF", "ERP-interno", "DIVERSPLAS"].map(
    (name) => addNode(name, "project", 0.82, 0.26, 0.16),
  );

  projectNodes.forEach((n) => {
    link(mocProjects, n, 100 + r() * 40);
  });
  link(projectNodes[0]!, designNodes[0]!, 160); // Orderalo -> apple-design
  link(projectNodes[2]!, designNodes[1]!, 160); // BreadPDF -> premium-ui

  // Agent & Rules cluster (around AGENTS: 0.52, 0.58)
  const agentNodes = [
    "CLAUDE",
    "N8N-flujos",
    "REGLAS-agente",
    "06-ACCESSIBILITY",
    "DECISIONES",
  ].map((name) => addNode(name, "rule", 0.52, 0.58, 0.16));

  agentNodes.forEach((n) => {
    link(mocAgents, n, 105 + r() * 35);
  });
  link(agentNodes[2]!, designNodes[7]!, 170); // reglas-agente -> foundations
  link(agentNodes[3]!, designNodes[0]!, 180); // accessibility -> apple-design

  // Satellites / Deep context notes floating gracefully
  const satellites = [
    "TEMPLATE-DESIGN-SYSTEM",
    "08-UI-PATTERNS",
    "07-MOTION",
    "09-UNIVERSAL-FIELD",
    "ANTIGRAVITY-protocol",
    "PERFORMANCE",
  ].map((name, i) =>
    addNode(name, "satellite", 0.6 + (i % 3) * 0.14, 0.15 + Math.floor(i / 3) * 0.65, 0.08),
  );

  link(satellites[0]!, mocDesign, 140);
  link(satellites[1]!, designNodes[5]!, 100);
  link(satellites[2]!, designNodes[2]!, 100);
  link(satellites[3]!, mocAgents, 150);
  link(satellites[4]!, agentNodes[0]!, 110);
  link(satellites[5]!, projectNodes[2]!, 120);

  // Notas sueltas sin título: dan densidad al cerebro (no llevan etiqueta)
  const hosts = nodes.filter((n) => n.group !== "hub");
  for (let i = 0; i < 26; i++) {
    const sat = addNode("", "satellite", 0.5 + 0.4 * r(), 0.12 + 0.62 * r(), 0.04);
    link(sat, hosts[Math.floor(r() * hosts.length)]!, 90 + r() * 60);
  }

  nodes.forEach((n) => {
    if (n.group === "hub") {
      n.r = 6.5 + Math.sqrt(n.deg) * 1.2;
    } else {
      n.r = 3.6 + Math.sqrt(n.deg) * 0.9;
    }
  });

  const hubIndices = [mocIndex.id, mocDesign.id, mocProjects.id, mocAgents.id];

  return { nodes, links, hubIndices };
}

/* Silueta de cerebro (vista lateral) en un lienzo de 400x330, y sus circunvoluciones */
const BRAIN_D =
  "M70 196 C38 176 28 124 66 88 C86 58 138 40 174 56 C198 24 262 24 286 56 C330 40 378 76 366 126 C396 152 382 204 346 214 C334 240 298 250 274 238 C262 264 230 268 216 246 C190 256 162 244 150 238 C116 240 94 222 70 196 Z M262 240 C292 232 336 244 338 270 C338 294 296 304 270 288 C252 274 248 250 262 240 Z M218 246 C222 268 226 286 232 304 L252 304 C250 284 248 262 248 242 Z";
const FOLDS_D =
  "M104 128 C124 104 158 112 168 138 C178 160 206 154 216 128 M146 196 C162 172 194 178 204 200 M224 84 C238 106 268 98 284 76 M240 152 C256 132 292 142 302 168 C308 184 328 182 338 160 M96 168 C112 152 134 158 138 178 M284 198 C296 182 322 188 330 204 M120 92 C132 82 150 84 156 96 M300 104 C316 96 336 104 340 120";

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

    // Active signal pulses traveling through edges (synapses)
    const pulses: Array<{
      linkIdx: number;
      from: number;
      to: number;
      progress: number;
      speed: number;
    }> = [];

    const spawnPulse = () => {
      if (pulses.length >= 12) return;
      const linkIdx = Math.floor(Math.random() * links.length);
      const [a, b] = links[linkIdx]!;
      const forward = Math.random() > 0.5;
      pulses.push({
        linkIdx,
        from: forward ? a : b,
        to: forward ? b : a,
        progress: 0,
        speed: 0.007 + Math.random() * 0.009,
      });
    };

    // Pre-populate a few pulses
    for (let i = 0; i < 6; i++) {
      spawnPulse();
      if (pulses[i]) pulses[i]!.progress = Math.random();
    }

    const brainSrc = new Path2D(BRAIN_D);
    const foldsSrc = new Path2D(FOLDS_D);
    let brainPath = new Path2D();
    let bs = 1;
    let bx0 = 0;
    let by0 = 0;
    const buildBrain = (nw: number, nh: number) => {
      bs = Math.min((nw * 0.94) / 400, (nh * 0.94) / 330);
      bx0 = (nw - 400 * bs) / 2;
      by0 = (nh - 330 * bs) / 2;
      brainPath = new Path2D();
      brainPath.addPath(brainSrc, { a: bs, b: 0, c: 0, d: bs, e: bx0, f: by0 });
    };
    const inBrain = (x: number, y: number) => ctx.isPointInPath(brainPath, x * dpr, y * dpr);

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
          // Reparte los nodos por el interior del cerebro (anclas originales remapeadas)
          n.ax = bx0 + (0.2 + ((n.ax - 0.5) / 0.4) * 0.6) * 400 * bs;
          n.ay = by0 + (0.18 + ((n.ay - 0.12) / 0.62) * 0.5) * 330 * bs;
          n.x = n.ax + n.ox * nh * 0.5;
          n.y = n.ay + n.oy * nh * 0.5;
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
        const hitArea = Math.max(24, n.r + 16);
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

      // 1. Repulsion between all nodes to prevent clumping
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
          const minSeparation = 58 * S;
          const repulsionConstant = dist < minSeparation ? 2600 : 950;
          const f = Math.min(4.5, (repulsionConstant * S * S) / (d2 + 10 * S * S));
          const fx = (dx / dist) * f;
          const fy = (dy / dist) * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }

      // 2. Link tension (spring physics)
      for (const [ia, ib, len] of links) {
        const a = nodes[ia]!;
        const b = nodes[ib]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const targetLen = len * S;
        const f = (d - targetLen) * 0.016;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      // 3. Anchor attraction and breathing oscillation
      for (const nd of nodes) {
        const k = nd.group === "hub" ? 0.006 : 0.003;
        const breathX =
          Math.sin(t * 0.0008 + nd.id * 1.6) * 0.025 * S * (nd.group === "hub" ? 0.6 : 1);
        const breathY =
          Math.cos(t * 0.0007 + nd.id * 2.2) * 0.025 * S * (nd.group === "hub" ? 0.6 : 1);

        nd.vx += (nd.ax - nd.x) * k + breathX;
        nd.vy += (nd.ay - nd.y) * k + breathY;
        nd.vx *= 0.88;
        nd.vy *= 0.88;

        const sp = Math.hypot(nd.vx, nd.vy);
        if (sp > 4) {
          nd.vx = (nd.vx / sp) * 4;
          nd.vy = (nd.vy / sp) * 4;
        }

        nd.x += nd.vx;
        nd.y += nd.vy;

        // Mantiene cada nodo dentro de la silueta del cerebro
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!inBrain(nd.x, nd.y)) {
          const cx = bx0 + 200 * bs;
          const cy = by0 + 150 * bs;
          nd.x += (cx - nd.x) * 0.18;
          nd.y += (cy - nd.y) * 0.18;
          nd.vx *= 0.5;
          nd.vy *= 0.5;
        }
      }

      // Drag override
      if (drag >= 0) {
        const d = nodes[drag]!;
        d.x = pt.x;
        d.y = pt.y;
        d.vx = 0;
        d.vy = 0;
      }

      // 4. Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]!;
        p.progress += p.speed;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          if (Math.random() > 0.3) {
            spawnPulse();
          }
        }
      }
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clean Light Background or Dark
      if (isLight) {
        ctx.clearRect(0, 0, W, H);
      } else {
        ctx.fillStyle = "#0B0C10";
        ctx.fillRect(0, 0, W, H);
      }

      // Subtle ambient spotlight behind the constellation
      const bgGrad = ctx.createRadialGradient(
        W * 0.72,
        H * 0.5,
        20,
        W * 0.72,
        H * 0.5,
        Math.max(W, H) * 0.55,
      );
      if (isLight) {
        bgGrad.addColorStop(0, "transparent");
        bgGrad.addColorStop(0.5, "transparent");
        bgGrad.addColorStop(1, "transparent");
      } else {
        bgGrad.addColorStop(0, "rgba(0, 68, 255, 0.14)");
        bgGrad.addColorStop(0.5, "rgba(91, 151, 255, 0.04)");
        bgGrad.addColorStop(1, "transparent");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Cerebro: silueta rellena, circunvoluciones y contorno grueso
      if (isLight) {
        ctx.save();
        ctx.translate(14, 14);
        ctx.fillStyle = "#09090B";
        ctx.fill(brainPath);
        ctx.restore();
      }
      ctx.fillStyle = isLight ? "#FFFFFF" : "#1E1B4B";
      ctx.fill(brainPath);
      ctx.save();
      ctx.translate(bx0, by0);
      ctx.scale(bs, bs);
      ctx.lineCap = "round";
      ctx.strokeStyle = isLight ? "#DDD6FE" : "#4C1D95";
      ctx.lineWidth = 6;
      ctx.stroke(foldsSrc);
      ctx.lineJoin = "round";
      ctx.strokeStyle = isLight ? "#09090B" : "#FFFFFF";
      ctx.lineWidth = 5 / bs;
      ctx.stroke(brainSrc);
      ctx.restore();

      // Auto-focus cycle when not hovered
      const focus =
        hover >= 0
          ? hover
          : hubIndices[Math.floor(Math.max(0, t - t0) / 3600) % hubIndices.length]!;
      const near = adj[focus] || new Set<number>();

      // 1. Draw Links
      for (const [ia, ib] of links) {
        const a = nodes[ia]!;
        const b = nodes[ib]!;
        const hot = ia === focus || ib === focus;

        if (isLight) {
          ctx.strokeStyle = hot ? "#6D28D9" : "rgba(9, 9, 11, 0.22)";
          ctx.lineWidth = hot ? 2.5 : 1;
        } else {
          ctx.strokeStyle = hot ? "rgba(91, 151, 255, 0.95)" : "rgba(160, 175, 215, 0.16)";
          ctx.lineWidth = hot ? 1.8 : 0.9;
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // 2. Draw Synapse Signal Pulses
      for (const p of pulses) {
        const a = nodes[p.from]!;
        const b = nodes[p.to]!;
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "#6D28D9" : "#FFFFFF";
        ctx.shadowColor = "#6D28D9";
        ctx.shadowBlur = isLight ? 0 : 8;
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Nodes with distinctive, noticeable colors!
      const pulse = ((t - t0) % 3200) / 3200;

      for (const nd of nodes) {
        const on = nd.id === focus;
        const isNear = near.has(nd.id);
        const isHub = nd.group === "hub";

        // Determine node color
        let nodeColor = "#09090B"; // Default solid black
        let haloColor = "rgba(0, 68, 255, 0.25)";

        if (isLight) {
          // Marca: violeta + negro; ámbar solo como acento (proyectos)
          if (on) {
            nodeColor = "#6D28D9";
            haloColor = "rgba(109, 40, 217, 0.3)";
          } else if (isNear) {
            nodeColor = "#6D28D9";
            haloColor = "rgba(109, 40, 217, 0.2)";
          } else if (isHub) {
            nodeColor = "#09090B"; // índices (mapas)
            haloColor = "rgba(9, 9, 11, 0.16)";
          } else if (nd.group === "skill") {
            nodeColor = "#6D28D9"; // skills y guías de diseño
          } else if (nd.group === "rule") {
            nodeColor = "#4C1D95"; // agentes y reglas
          } else if (nd.group === "project") {
            nodeColor = "#F59E0B"; // proyectos
          } else {
            nodeColor = "#A1A1AA"; // notas sueltas
          }
        } else {
          // Dark mode palette
          if (on) {
            nodeColor = "#5B97FF";
            haloColor = "rgba(91, 151, 255, 0.65)";
          } else if (isNear) {
            nodeColor = "#9CC2FF";
            haloColor = "rgba(91, 151, 255, 0.35)";
          } else if (isHub) {
            nodeColor = "#FFFFFF";
            haloColor = "rgba(255, 255, 255, 0.25)";
          } else if (nd.group === "skill") {
            nodeColor = "#38BDF8";
          } else if (nd.group === "rule") {
            nodeColor = "#34D399";
          } else if (nd.group === "project") {
            nodeColor = "#F59E0B";
          } else {
            nodeColor = "#A6B0C8";
          }
        }

        // Radial glow for active node or hubs
        if (isHub || on) {
          const glowR = nd.r * (on ? 6.5 : 4);
          const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, glowR);
          g.addColorStop(0, haloColor);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Expanding ripple ring on focused node
        if (on) {
          ctx.strokeStyle = isLight
            ? `rgba(109, 40, 217, ${0.75 * (1 - pulse)})`
            : `rgba(91, 151, 255, ${0.75 * (1 - pulse)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, nd.r + 4 + pulse * 36, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner solid dot with border
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r + (on ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Subtle crisp white rim in light mode for extra pop
        if (isLight && (isHub || on)) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = on ? "#6D28D9" : "#09090B";
          ctx.stroke();
        }
      }

      // 4. Draw Clean Anti-Collision Labels (The Obsidian Way)
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
          ? "700 15px Inter Variable, Inter, sans-serif"
          : "600 15px Inter Variable, Inter, sans-serif";
        const metrics = ctx.measureText(name);
        const textW = metrics.width;
        const boxW = textW + 20;
        const boxH = 28;

        let boxX = x - boxW / 2;
        let boxY = y + 14;

        // Collision check against already drawn labels
        const collides = (bx: number, by: number) => {
          return drawnBoxes.some(
            (b) =>
              bx < b.x + b.w + 6 &&
              bx + boxW + 6 > b.x &&
              by < b.y + b.h + 4 &&
              by + boxH + 4 > b.y,
          );
        };

        // If it collides below, try placing it above the node
        if (collides(boxX, boxY)) {
          boxY = y - boxH - 12;
        }

        // If it still collides and it's not the primary focused node, omit it to prevent visual soup
        if (collides(boxX, boxY) && !isHighlight) {
          return;
        }

        drawnBoxes.push({ x: boxX, y: boxY, w: boxW, h: boxH });

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 5);

        if (isLight) {
          ctx.fillStyle = isHighlight ? "#09090B" : "rgba(255, 255, 255, 0.95)";
          ctx.fill();
          ctx.strokeStyle = isHighlight ? "#6D28D9" : "rgba(9, 9, 11, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = isHighlight ? "#FFFFFF" : "#09090B";
        } else {
          ctx.fillStyle = isHighlight ? "rgba(11, 14, 22, 0.92)" : "rgba(11, 14, 22, 0.78)";
          ctx.fill();
          ctx.strokeStyle = isHighlight ? "rgba(91, 151, 255, 0.55)" : "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = isHighlight ? "#FFFFFF" : "rgba(226, 232, 240, 0.88)";
        }

        ctx.fillText(name, x, boxY + boxH / 2);
        ctx.restore();
      };

      // A. Focused / Hovered node label (highest priority)
      const focusNode = nodes[focus]!;
      tryDrawLabel(focusNode.name, focusNode.x, focusNode.y, true);

      // B. Top 2 or 3 direct neighbors of focus node
      const sortedNeighbors = Array.from(near)
        .map((id) => nodes[id]!)
        .sort((a, b) => {
          const da = Math.hypot(a.x - focusNode.x, a.y - focusNode.y);
          const db = Math.hypot(b.x - focusNode.x, b.y - focusNode.y);
          return da - db;
        })
        .slice(0, 3);

      for (const nn of sortedNeighbors) {
        tryDrawLabel(nn.name, nn.x, nn.y, false);
      }

      // C. Major hubs (when not in conflict)
      for (const hid of hubIndices) {
        if (hid !== focus && !near.has(hid)) {
          const hn = nodes[hid]!;
          tryDrawLabel(hn.name, hn.x, hn.y, false);
        }
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
      className={`relative h-full min-h-[300px] w-full overflow-hidden ${theme === "light" ? "bg-transparent" : "bg-[#0B0C10]"}`}
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
