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

/* ───────────── 4 · second brain: live force-directed graph, Obsidian style ───────────── */

interface GNode {
  id: number;
  name: string;
  group: "a" | "b" | "o";
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

const A_NAMES = [
  "CLAUDE", "AGENTS", "MOC-INDEX", "09-UNIVERSAL-FIELD", "TEMPLATE-DESIGN-SYSTEM", "08-UI-PATTERNS",
  "07-MOTION", "06-ACCESSIBILITY", "05-TYPOGRAPHY", "04-COLOR", "03-LAYOUT", "02-COMPONENTS", "01-FOUNDATIONS",
  "SKILL-premium-ui", "SKILL-motion", "SKILL-apple-design", "REGLAS-agente", "DECISIONES", "PROJECTS",
  "PROMPTS", "N8N-flujos", "ERP-interno", "CLIENTES", "BRIEFS", "PRESUPUESTOS", "ANTIGRAVITY-protocol",
  "ORDERALO", "PORTFOLIO", "ENGINEERING", "PERFORMANCE", "SEO-tecnico", "REFERENCES", "TEMPLATES",
  "EVIDENCE-REGISTER", "REFERENCE-INDEX", "AGENT-ROUTER",
];
const B_NAMES = [
  "MOC-PROJECTS", "MOC-APP-PATTERNS", "GALLERY", "MOC-EVIDENCE", "01-CORE-DESIGN-PRINCIPLES",
  "02-CREATIVE-DIRECTION", "03-START-HERE", "04-COMPOSITION-AND-LAYOUT", "05-TYPOGRAPHY",
  "06-COLOR-AND-BRAND", "MOC-ENGINEERING", "BREADPDF", "GESGRAMA", "KOVIA", "OTHER-PROJECTS", "REMOTION-DESIGN",
];
const O_NAMES = [
  "ORDERALO_identidad-definitiva", "SKILL-premium-ui-validation", "DESIGN-SYSTEM-proposal",
  "KOVIA-JARVIS-REMOTION", "2026-11-09-auditoria", "2026-11-10-decision-stack", "ANTIGRAVITY-POSTMORTEM",
  "PORTFOLIO_AUDIT-fuentes", "OBSIDIAN-IMPLEMENTATION-REPORT", "2026-11-19-decisiones-diseno",
  "2026-11-18-integraciones", "ideas-sueltas", "checklist-lanzamiento", "inbox", "2026-11-12-notas",
  "landing-prueba-verificable", "reuniones", "snapshot",
];

function buildGraph(): { nodes: GNode[]; links: [number, number, number][] } {
  const r = rng(5);
  const nodes: GNode[] = [];
  const links: [number, number, number][] = [];
  const mk = (name: string, group: GNode["group"], ax: number, ay: number, spread: number): GNode => {
    const ang = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * spread;
    const n: GNode = { id: nodes.length, name, group, x: 0, y: 0, vx: 0, vy: 0, ax, ay, ox: Math.cos(ang) * d, oy: Math.sin(ang) * d, r: 4, deg: 0 };
    nodes.push(n);
    return n;
  };
  const link = (a: GNode, b: GNode, len: number) => {
    links.push([a.id, b.id, len]);
    a.deg++;
    b.deg++;
  };

  // dense cluster A
  const A = A_NAMES.map((nm) => mk(nm, "a", 0.56, 0.46, 0.3));
  A.forEach((n, i) => {
    for (let k = 0; k < 4; k++) {
      const t = A[Math.floor(r() * A.length)]!;
      if (t !== n && !links.some((l) => (l[0] === n.id && l[1] === t.id) || (l[0] === t.id && l[1] === n.id))) link(n, t, 125);
    }
    if (i > 0) link(n, A[Math.floor(r() * 4)]!, 125);
  });

  // star cluster B
  const hub = mk("MOC-DESIGN", "b", 0.2, 0.56, 0.01);
  B_NAMES.forEach((nm) => link(hub, mk(nm, "b", 0.2, 0.56, 0.3), 100));
  link(hub, A[3]!, 150);

  // orphans
  O_NAMES.forEach((nm, i) => {
    const o = mk(nm, "o", 0.08 + r() * 0.84, 0.1 + r() * 0.8, 0.02);
    if (i === 4) link(o, nodes[nodes.length - 2]!, 90);
    if (i === 10) link(o, nodes[nodes.length - 3]!, 90);
  });

  nodes.forEach((n) => {
    n.r = 3.6 + Math.sqrt(n.deg) * 1.35;
  });
  return { nodes, links };
}

export function BrainVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, links } = buildGraph();
    const adj: Set<number>[] = nodes.map(() => new Set());
    links.forEach(([a, b]) => {
      adj[a]!.add(b);
      adj[b]!.add(a);
    });
    const hubs = [nodes.findIndex((n) => n.name === "MOC-DESIGN"), 0, 3, 13, 26];

    let W = 0;
    let H = 0;
    let dpr = 1;
    let placed = false;
    const resize = () => {
      const r = box.getBoundingClientRect();
      const nw = Math.max(200, r.width);
      const nh = Math.max(200, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = nw * dpr;
      canvas.height = nh * dpr;
      canvas.style.width = nw + "px";
      canvas.style.height = nh + "px";
      if (!placed) {
        nodes.forEach((n) => {
          n.x = n.ax * nw + n.ox * nh;
          n.y = n.ay * nh + n.oy * nh;
          n.ax *= nw;
          n.ay *= nh;
        });
        placed = true;
      } else {
        nodes.forEach((n) => {
          n.x *= nw / W;
          n.y *= nh / H;
          n.ax *= nw / W;
          n.ay *= nh / H;
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
      let bd = 1e9;
      nodes.forEach((n) => {
        const d = Math.hypot(n.x - pt.x, n.y - pt.y);
        if (d < n.r + 10 && d < bd) {
          bd = d;
          best = n.id;
        }
      });
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
      const S = Math.min(W, H) / 400;
      const cut = 320 * S;
      for (let i = 0; i < n; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j]!;
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 > cut * cut) continue;
          if (d2 < 1) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            d2 = 1;
          }
          const aa = a.group === "a" && b.group === "a";
          const f = Math.min(aa ? 4 : 1.6, ((aa ? 3400 : 620) * S * S) / d2);
          const d = Math.sqrt(d2);
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }
      for (const [ia, ib, len] of links) {
        const a = nodes[ia]!;
        const b = nodes[ib]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - len * S) * 0.022;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
      for (const nd of nodes) {
        const k = nd.group === "o" ? 0.0016 : 0.0007;
        nd.vx += (nd.ax - nd.x) * k + Math.sin(t * 0.0009 + nd.id * 1.7) * 0.02 * S;
        nd.vy += (nd.ay - nd.y) * k + Math.cos(t * 0.0008 + nd.id * 2.3) * 0.02 * S;
        nd.vx *= 0.88;
        nd.vy *= 0.88;
        const sp = Math.hypot(nd.vx, nd.vy);
        if (sp > 4) {
          nd.vx = (nd.vx / sp) * 4;
          nd.vy = (nd.vy / sp) * 4;
        }
        nd.x += nd.vx;
        nd.y += nd.vy;
        nd.x = Math.min(W - 64, Math.max(64, nd.x));
        nd.y = Math.min(H - 34, Math.max(20, nd.y));
      }
      if (drag >= 0) {
        const d = nodes[drag]!;
        d.x = pt.x;
        d.y = pt.y;
        d.vx = 0;
        d.vy = 0;
      }
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#1B1B1B";
      ctx.fillRect(0, 0, W, H);

      const focus = hover >= 0 ? hover : hubs[Math.floor(Math.max(0, t - t0) / 3200) % hubs.length]!;
      const near = adj[focus]!;

      ctx.lineWidth = 1;
      for (const [ia, ib] of links) {
        const a = nodes[ia]!;
        const b = nodes[ib]!;
        const hot = ia === focus || ib === focus;
        ctx.strokeStyle = hot ? "rgba(168,130,255,0.95)" : "rgba(150,150,150,0.26)";
        ctx.lineWidth = hot ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      ctx.textAlign = "center";
      ctx.font = "13px Inter Variable, Inter, system-ui, sans-serif";
      for (const nd of nodes) {
        const on = nd.id === focus;
        const isNear = near.has(nd.id);
        ctx.fillStyle = on ? "#A882FF" : isNear ? "#CDB8FF" : nd.group === "b" ? "#8A8A8A" : "#B9B9B9";
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r + (on ? 2 : 0), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = on || isNear ? "#EDEDED" : "rgba(160,160,160,0.5)";
        if (nd.group === "o" || nd.deg >= 7 || on || isNear) ctx.fillText(nd.name, nd.x, nd.y + nd.r + 15);
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
  }, []);

  return (
    <div ref={wrap} className="relative h-full min-h-[260px] w-full overflow-hidden bg-[#1B1B1B]">
      <canvas ref={cv} className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing" role="img" aria-label="Grafo de notas del cerebro de IA en movimiento: arrastra un nodo" />
    </div>
  );
}
