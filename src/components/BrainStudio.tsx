import { useEffect, useRef, useState, useMemo } from "react";
import {
  Brain,
  ShieldCheck,
  Cpu,
  Database,
  Sparkles,
  RotateCcw,
  Network,
  Share2,
  ExternalLink,
  Layers,
  FileCode,
} from "lucide-react";

/* ───────────── 1. Authoritative Obsidian Vault Node Definitions ───────────── */

export type NodeCategory = "moc" | "skill" | "rule" | "project" | "system";

export interface VaultNode {
  id: number;
  slug: string;
  filename: string;
  label: string;
  category: NodeCategory;
  summary: string;
  connectionsCount?: number;
  // Position & physics
  anchorX: number;
  anchorY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  deg: number;
}

export interface VaultLink {
  source: number;
  target: number;
  length: number;
}

export interface Pulse {
  linkIdx: number;
  source: number;
  target: number;
  progress: number; // 0 -> 1
  speed: number;
  color: string;
}

const CATEGORY_CONFIG: Record<
  NodeCategory,
  {
    name: string;
    label: string;
    color: string;
    glow: string;
    bg: string;
    border: string;
  }
> = {
  moc: {
    name: "Map of Content",
    label: "MOC",
    color: "#A78BFA", // Obsidian Violet
    glow: "rgba(167, 139, 250, 0.45)",
    bg: "rgba(167, 139, 250, 0.12)",
    border: "rgba(167, 139, 250, 0.35)",
  },
  skill: {
    name: "Agent Skill",
    label: "SKILL",
    color: "#38BDF8", // Electric Sky
    glow: "rgba(56, 189, 248, 0.45)",
    bg: "rgba(56, 189, 248, 0.12)",
    border: "rgba(56, 189, 248, 0.35)",
  },
  rule: {
    name: "Regla / Principio",
    label: "REGLA",
    color: "#34D399", // Emerald
    glow: "rgba(52, 211, 153, 0.45)",
    bg: "rgba(52, 211, 153, 0.12)",
    border: "rgba(52, 211, 153, 0.35)",
  },
  project: {
    name: "Proyecto / Caso",
    label: "PROYECTO",
    color: "#F59E0B", // Warm Amber
    glow: "rgba(245, 158, 11, 0.45)",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.35)",
  },
  system: {
    name: "Sistema / Config",
    label: "SISTEMA",
    color: "#EC4899", // Magenta Pink
    glow: "rgba(236, 72, 153, 0.45)",
    bg: "rgba(236, 72, 153, 0.12)",
    border: "rgba(236, 72, 153, 0.35)",
  },
};

const RAW_NODES: Array<{
  slug: string;
  filename: string;
  label: string;
  category: NodeCategory;
  summary: string;
  ax: number;
  ay: number;
}> = [
  // MOCs (Hubs nucleares)
  {
    slug: "moc-index",
    filename: "MOC-INDEX.md",
    label: "MOC-INDEX",
    category: "moc",
    summary:
      "Índice raíz del segundo cerebro. Conecta metodología, agentes de IA, normas de diseño y proyectos activos.",
    ax: 0.5,
    ay: 0.48,
  },
  {
    slug: "moc-design",
    filename: "MOC-DESIGN.md",
    label: "MOC-DESIGN",
    category: "moc",
    summary:
      "Sistema de diseño integral: principios Apple HIG, composición de retículas, jerarquía tipográfica y tokens.",
    ax: 0.72,
    ay: 0.32,
  },
  {
    slug: "moc-engineering",
    filename: "MOC-ENGINEERING.md",
    label: "MOC-ENGINEERING",
    category: "moc",
    summary:
      "Arquitectura técnica: TanStack Start, APIs seguras, flujos n8n, rendimiento web y bases de datos.",
    ax: 0.74,
    ay: 0.68,
  },
  {
    slug: "moc-projects",
    filename: "MOC-PROJECTS.md",
    label: "MOC-PROJECTS",
    category: "moc",
    summary:
      "Registro central de proyectos, auditorías de entregables, especificaciones de clientes y métricas de producción.",
    ax: 0.48,
    ay: 0.2,
  },

  // Skills (Capacidades del agente)
  {
    slug: "skill-apple-design",
    filename: "SKILL-apple-design.md",
    label: "SKILL-apple-design",
    category: "skill",
    summary:
      "Directrices Apple Human Interface: espaciados en múltiplos de 4, feedback háptico, tipografía SF Pro y contraste riguroso.",
    ax: 0.86,
    ay: 0.22,
  },
  {
    slug: "skill-premium-ui",
    filename: "SKILL-premium-ui.md",
    label: "SKILL-premium-ui",
    category: "skill",
    summary:
      "Acabado editorial y anti-slop: balance óptico de bordes, microinteracciones discretas y eliminación de clichés genéricos.",
    ax: 0.88,
    ay: 0.42,
  },
  {
    slug: "skill-motion",
    filename: "SKILL-motion.md",
    label: "SKILL-motion",
    category: "skill",
    summary:
      "Física de muelles naturales con Framer Motion, micro-transiciones reactivas y respeto estricto a prefers-reduced-motion.",
    ax: 0.84,
    ay: 0.54,
  },
  {
    slug: "skill-n8n",
    filename: "SKILL-n8n-automation.md",
    label: "SKILL-n8n",
    category: "skill",
    summary:
      "Orquestación de webhooks, sincronización CRM en tiempo real, alertas de incidencias y tareas asíncronas con n8n.",
    ax: 0.88,
    ay: 0.76,
  },
  {
    slug: "skill-model-routing",
    filename: "SKILL-model-routing.md",
    label: "SKILL-model-routing",
    category: "skill",
    summary:
      "Despacho algorítmico de tareas: Claude Sonnet para arquitectura/código, Gemini Flash para escaneos y Opus para síntesis.",
    ax: 0.62,
    ay: 0.84,
  },

  // Rules (Reglas deterministas)
  {
    slug: "01-core-design",
    filename: "01-CORE-DESIGN-PRINCIPLES.md",
    label: "01-CORE-DESIGN",
    category: "rule",
    summary:
      "Jerarquía implacable: un foco principal por pantalla, contraste 4.5:1 WCAG AA y eliminación de ruido decorativo.",
    ax: 0.32,
    ay: 0.62,
  },
  {
    slug: "03-typography",
    filename: "03-TYPOGRAPHY-HIERARCHY.md",
    label: "03-TYPOGRAPHY",
    category: "rule",
    summary:
      "Escala tipográfica proporcional. Ningún texto de cuerpo inferior a 12px para evitar fatiga visual en pantallas de alta densidad.",
    ax: 0.22,
    ay: 0.48,
  },
  {
    slug: "04-composition",
    filename: "04-COMPOSITION-LAYOUT.md",
    label: "04-COMPOSITION",
    category: "rule",
    summary:
      "Retículas 8pt/4pt, bento grids asimétricos equilibrados y márgenes exteriores consistentes en todos los breakpoints.",
    ax: 0.26,
    ay: 0.34,
  },
  {
    slug: "06-accessibility",
    filename: "06-ACCESSIBILITY-WCAG.md",
    label: "06-ACCESSIBILITY",
    category: "rule",
    summary:
      "Navegación por teclado completa, atributos ARIA semánticos, gestión de foco visible y ratios de contraste verificados.",
    ax: 0.18,
    ay: 0.64,
  },
  {
    slug: "10-anti-patterns",
    filename: "10-DESIGN-ANTI-PATTERNS.md",
    label: "10-ANTI-PATTERNS",
    category: "rule",
    summary:
      "Catálogo de anti-patrones prohibidos: sombras difusas grisáceas, scroll jank, textos de contraste bajo y cards vacías.",
    ax: 0.14,
    ay: 0.36,
  },
  {
    slug: "reglas-agente",
    filename: "REGLAS-AGENTE.md",
    label: "REGLAS-AGENTE",
    category: "rule",
    summary:
      "Reglas de sistema deterministas para Claude y Antigravity: verificar en navegador, cero código ciego y pruebas automáticas.",
    ax: 0.36,
    ay: 0.78,
  },
  {
    slug: "decisiones-stack",
    filename: "DECISIONES-STACK.md",
    label: "DECISIONES-STACK",
    category: "rule",
    summary:
      "Registro inmutable de decisiones técnicas: por qué TanStack Start, Vite, Tailwind CSS y Supabase para este ecosistema.",
    ax: 0.5,
    ay: 0.84,
  },

  // Projects (Casos reales)
  {
    slug: "orderalo",
    filename: "PROJECTS/ORDERALO.md",
    label: "ORDERALO",
    category: "project",
    summary:
      "SaaS de pedidos para hostelería con cartas QR dinámicas, panel de cocina en tiempo real y micro-animaciones en pedidos.",
    ax: 0.38,
    ay: 0.14,
  },
  {
    slug: "gesgrama",
    filename: "PROJECTS/GESGRAMA.md",
    label: "GESGRAMA",
    category: "project",
    summary:
      "Plataforma de presupuestos instantáneos y gestión técnica de instalaciones de césped artificial con cálculo métrico.",
    ax: 0.6,
    ay: 0.12,
  },
  {
    slug: "breadpdf",
    filename: "PROJECTS/BREADPDF.md",
    label: "BREADPDF",
    category: "project",
    summary:
      "Suite de herramientas PDF en el navegador con procesamiento local sin subida a servidor, ultrarrápida y privada.",
    ax: 0.72,
    ay: 0.16,
  },
  {
    slug: "erp-interno",
    filename: "PROJECTS/ERP-INTERNO.md",
    label: "ERP-INTERNO",
    category: "project",
    summary:
      "Sistema de gestión empresarial con facturación automatizada, control de inventario y trazabilidad operativa por n8n.",
    ax: 0.28,
    ay: 0.18,
  },
  {
    slug: "diversplas",
    filename: "PROJECTS/DIVERSPLAS.md",
    label: "DIVERSPLAS",
    category: "project",
    summary:
      "Catálogo industrial y portal corporativo de alta conversión para empresa de termoconformado y extrusión técnica.",
    ax: 0.44,
    ay: 0.28,
  },

  // System & Foundations
  {
    slug: "token-system",
    filename: "TOKEN-SYSTEM.md",
    label: "TOKEN-SYSTEM",
    category: "system",
    summary:
      "Definición central de tokens CSS semánticos: paletas HSL, radios de curvatura, elevaciones y tiempos de transición.",
    ax: 0.6,
    ay: 0.38,
  },
  {
    slug: "antigravity-rules",
    filename: "ANTIGRAVITY-RULES.md",
    label: "ANTIGRAVITY-RULES",
    category: "system",
    summary:
      "Protocolo de orquestación de subagentes, checkpoints automáticos en Git y límites de contexto de Antigravity.",
    ax: 0.42,
    ay: 0.62,
  },
  {
    slug: "evidence-register",
    filename: "EVIDENCE-REGISTER.md",
    label: "EVIDENCE-REGISTER",
    category: "system",
    summary:
      "Historial de capturas de navegador, tests automatizados y auditorías Lighthouse verificando cada hito desplegado.",
    ax: 0.64,
    ay: 0.54,
  },
  {
    slug: "agent-router",
    filename: "AGENT-ROUTER.md",
    label: "AGENT-ROUTER",
    category: "system",
    summary:
      "Matriz de enrutamiento que asigna automáticamente cada issue a la skill o subagente especializado más eficiente.",
    ax: 0.48,
    ay: 0.72,
  },
];

// Definición de enlaces conceptuales reales
const RAW_LINKS: Array<[string, string]> = [
  // MOC-INDEX como núcleo
  ["moc-index", "moc-design"],
  ["moc-index", "moc-engineering"],
  ["moc-index", "moc-projects"],
  ["moc-index", "reglas-agente"],
  ["moc-index", "antigravity-rules"],
  ["moc-index", "agent-router"],

  // MOC-DESIGN ramas
  ["moc-design", "skill-apple-design"],
  ["moc-design", "skill-premium-ui"],
  ["moc-design", "skill-motion"],
  ["moc-design", "01-core-design"],
  ["moc-design", "03-typography"],
  ["moc-design", "04-composition"],
  ["moc-design", "token-system"],
  ["moc-design", "evidence-register"],

  // MOC-ENGINEERING ramas
  ["moc-engineering", "decisiones-stack"],
  ["moc-engineering", "skill-n8n"],
  ["moc-engineering", "skill-model-routing"],
  ["moc-engineering", "erp-interno"],
  ["moc-engineering", "breadpdf"],

  // MOC-PROJECTS ramas
  ["moc-projects", "orderalo"],
  ["moc-projects", "gesgrama"],
  ["moc-projects", "breadpdf"],
  ["moc-projects", "erp-interno"],
  ["moc-projects", "diversplas"],
  ["moc-projects", "evidence-register"],

  // Cross-pollination entre proyectos y skills
  ["orderalo", "skill-apple-design"],
  ["orderalo", "skill-motion"],
  ["orderalo", "token-system"],
  ["orderalo", "skill-n8n"],

  ["gesgrama", "04-composition"],
  ["gesgrama", "token-system"],
  ["gesgrama", "decisiones-stack"],

  ["breadpdf", "skill-premium-ui"],
  ["breadpdf", "03-typography"],

  ["diversplas", "01-core-design"],
  ["diversplas", "04-composition"],

  // Cross-pollination entre reglas y skills
  ["skill-apple-design", "03-typography"],
  ["skill-apple-design", "06-accessibility"],
  ["skill-apple-design", "10-anti-patterns"],

  ["skill-premium-ui", "01-core-design"],
  ["skill-premium-ui", "skill-motion"],
  ["skill-premium-ui", "token-system"],

  ["reglas-agente", "06-accessibility"],
  ["reglas-agente", "10-anti-patterns"],
  ["reglas-agente", "antigravity-rules"],
  ["agent-router", "skill-model-routing"],
  ["agent-router", "antigravity-rules"],
];

function buildVaultGraph(): {
  nodes: VaultNode[];
  links: VaultLink[];
  adj: Map<number, Set<number>>;
  slugToId: Map<string, number>;
} {
  const slugToId = new Map<string, number>();
  const nodes: VaultNode[] = RAW_NODES.map((n, i) => {
    slugToId.set(n.slug, i);
    return {
      id: i,
      slug: n.slug,
      filename: n.filename,
      label: n.label,
      category: n.category,
      summary: n.summary,
      anchorX: n.ax,
      anchorY: n.ay,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: n.category === "moc" ? 7 : 5,
      deg: 0,
    };
  });

  const links: VaultLink[] = [];
  const adj = new Map<number, Set<number>>();
  nodes.forEach((n) => adj.set(n.id, new Set()));

  RAW_LINKS.forEach(([sSlug, tSlug]) => {
    const sId = slugToId.get(sSlug);
    const tId = slugToId.get(tSlug);
    if (sId !== undefined && tId !== undefined) {
      links.push({ source: sId, target: tId, length: 110 });
      adj.get(sId)!.add(tId);
      adj.get(tId)!.add(sId);
      nodes[sId]!.deg++;
      nodes[tId]!.deg++;
    }
  });

  nodes.forEach((n) => {
    n.connectionsCount = n.deg;
    if (n.category === "moc") {
      n.r = 7.5 + Math.sqrt(n.deg) * 1.2;
    } else {
      n.r = 4.2 + Math.sqrt(n.deg) * 1.1;
    }
  });

  return { nodes, links, adj, slugToId };
}

/* ───────────── 2. Interactive Brain Studio Component ───────────── */

export function BrainStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [activeFilter, setActiveFilter] = useState<NodeCategory | "all">("all");
  const [inspectedId, setInspectedId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Initial graph data memoized
  const graphData = useMemo(() => buildVaultGraph(), []);

  // Connected neighbors for active inspected node
  const inspectedNode = useMemo(() => {
    if (inspectedId === null) {
      // Default to MOC-INDEX or null
      return graphData.nodes[0] || null;
    }
    return graphData.nodes[inspectedId] || null;
  }, [inspectedId, graphData]);

  const connectedNeighbors = useMemo(() => {
    if (!inspectedNode) return [];
    const neighborIds = graphData.adj.get(inspectedNode.id) || new Set();
    return Array.from(neighborIds).map((id) => graphData.nodes[id]!);
  }, [inspectedNode, graphData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = containerRef.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, links, adj } = graphData;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let placed = false;

    // Signal pulses state
    const pulses: Pulse[] = [];
    const MAX_PULSES = 16;

    // Helper to spawn a pulse along a random link or specific link
    const spawnPulse = (specificLinkIdx?: number) => {
      if (pulses.length >= MAX_PULSES && specificLinkIdx === undefined) return;
      const linkIdx =
        specificLinkIdx !== undefined ? specificLinkIdx : Math.floor(Math.random() * links.length);
      const l = links[linkIdx]!;
      const sNode = nodes[l.source]!;
      const tNode = nodes[l.target]!;
      const forward = Math.random() > 0.5;
      pulses.push({
        linkIdx,
        source: forward ? sNode.id : tNode.id,
        target: forward ? tNode.id : sNode.id,
        progress: 0,
        speed: 0.006 + Math.random() * 0.008,
        color: CATEGORY_CONFIG[sNode.category].color,
      });
    };

    // Pre-populate pulses
    for (let i = 0; i < 8; i++) {
      spawnPulse();
      if (pulses[i]) pulses[i]!.progress = Math.random();
    }

    const resize = () => {
      const r = box.getBoundingClientRect();
      const nw = Math.max(300, r.width);
      const nh = Math.max(300, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = nw * dpr;
      canvas.height = nh * dpr;
      canvas.style.width = `${nw}px`;
      canvas.style.height = `${nh}px`;

      if (!placed) {
        // First placement with controlled jitter around anchor
        nodes.forEach((n, idx) => {
          const angle = (idx / nodes.length) * Math.PI * 2;
          const jitterDist = 20;
          n.x = n.anchorX * nw + Math.cos(angle) * jitterDist;
          n.y = n.anchorY * nh + Math.sin(angle) * jitterDist;
        });
        placed = true;
      } else {
        // Rescale positions smoothly
        const scaleX = nw / W;
        const scaleY = nh / H;
        nodes.forEach((n) => {
          n.x *= scaleX;
          n.y *= scaleY;
        });
      }
      W = nw;
      H = nh;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    // Pointer interaction
    let hoverId = -1;
    let dragId = -1;
    const pt = { x: 0, y: 0 };

    const updatePointerPos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pt.x = e.clientX - r.left;
      pt.y = e.clientY - r.top;
    };

    const pickNode = () => {
      let best = -1;
      let minD = 1e9;
      for (const n of nodes) {
        const d = Math.hypot(n.x - pt.x, n.y - pt.y);
        const hitRadius = Math.max(20, n.r + 14);
        if (d < hitRadius && d < minD) {
          minD = d;
          best = n.id;
        }
      }
      return best;
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerPos(e);
      if (dragId < 0) {
        const picked = pickNode();
        if (picked !== hoverId) {
          hoverId = picked;
          if (picked >= 0) {
            setInspectedId(picked);
            // Spawn pulses on connected links
            links.forEach((l, idx) => {
              if (l.source === picked || l.target === picked) {
                spawnPulse(idx);
              }
            });
          }
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      updatePointerPos(e);
      const picked = pickNode();
      if (picked >= 0) {
        dragId = picked;
        hoverId = picked;
        setInspectedId(picked);
        canvas.setPointerCapture(e.pointerId);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      dragId = -1;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
    };

    const onPointerLeave = () => {
      if (dragId < 0) {
        hoverId = -1;
      }
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    // Physics step
    let lastTime = performance.now();
    let animId = 0;
    let isVisible = true;

    const stepPhysics = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 16;
      lastTime = now;
      const S = Math.min(W, H) / 500;
      const nLen = nodes.length;

      // 1. Repulsion between nodes (Coulomb force)
      for (let i = 0; i < nLen; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nLen; j++) {
          const b = nodes[j]!;
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          const minD = 38 * S;
          if (d2 > 260 * 260 * S * S) continue;
          if (d2 < 1) {
            dx = (Math.random() - 0.5) * 4;
            dy = (Math.random() - 0.5) * 4;
            d2 = 1;
          }
          const dist = Math.sqrt(d2);
          // Stronger repulsion if nodes are too close
          const strength = dist < minD ? 1200 : 450;
          const f = (strength * S * S) / (d2 + 10);
          const fx = (dx / dist) * f * dt;
          const fy = (dy / dist) * f * dt;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }

      // 2. Spring force along links
      for (const l of links) {
        const a = nodes[l.source]!;
        const b = nodes[l.target]!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const targetLen = l.length * S * 0.95;
        const displacement = dist - targetLen;
        const f = displacement * 0.018 * dt;
        const fx = (dx / dist) * f;
        const fy = (dy / dist) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      // 3. Anchor attraction + harmonic breathing
      const tSec = now * 0.001;
      for (const n of nodes) {
        const targetX = n.anchorX * W;
        const targetY = n.anchorY * H;
        // Subtle organic breathing oscillation
        const breathX = Math.sin(tSec * 0.8 + n.id * 1.5) * 4 * S;
        const breathY = Math.cos(tSec * 0.7 + n.id * 2.1) * 4 * S;

        const anchorStrength = n.category === "moc" ? 0.0018 : 0.0012;
        n.vx += (targetX + breathX - n.x) * anchorStrength * dt;
        n.vy += (targetY + breathY - n.y) * anchorStrength * dt;

        // Damping
        n.vx *= 0.86;
        n.vy *= 0.86;

        // Speed limit
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 5) {
          n.vx = (n.vx / sp) * 5;
          n.vy = (n.vy / sp) * 5;
        }

        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // Soft viewport bounds constraint
        const pad = 24 * S;
        n.x = Math.max(pad, Math.min(W - pad, n.x));
        n.y = Math.max(pad, Math.min(H - pad, n.y));
      }

      // Drag override
      if (dragId >= 0) {
        const dNode = nodes[dragId]!;
        dNode.x = pt.x;
        dNode.y = pt.y;
        dNode.vx = 0;
        dNode.vy = 0;
      }

      // 4. Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]!;
        p.progress += p.speed * dt;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          // Spawn another pulse periodically
          if (Math.random() > 0.4) {
            spawnPulse();
          }
        }
      }
    };

    // Anti-collision label helper
    interface PillBox {
      x: number;
      y: number;
      w: number;
      h: number;
    }

    const drawPill = (
      label: string,
      x: number,
      y: number,
      categoryColor: string,
      isPrimary: boolean,
      placedBoxes: PillBox[],
    ) => {
      ctx.font = isPrimary
        ? "600 12px Inter Variable, Inter, sans-serif"
        : "500 11px Inter Variable, Inter, sans-serif";
      const textMetrics = ctx.measureText(label);
      const padX = isPrimary ? 10 : 8;
      const pillH = isPrimary ? 24 : 20;
      const dotR = isPrimary ? 3.5 : 2.5;
      const dotGap = 6;
      const pillW = textMetrics.width + padX * 2 + dotR * 2 + dotGap;

      // Desired position: centered horizontally below the node
      let pillX = x - pillW / 2;
      let pillY = y + 12;

      // Bound check inside canvas
      if (pillX < 6) pillX = 6;
      if (pillX + pillW > W - 6) pillX = W - pillW - 6;

      const collides = (bx: number, by: number) => {
        return placedBoxes.some((b) => {
          return (
            bx < b.x + b.w + 4 && bx + pillW + 4 > b.x && by < b.y + b.h + 4 && by + pillH + 4 > b.y
          );
        });
      };

      // If it collides below, try placing it above the node
      if (collides(pillX, pillY)) {
        pillY = y - pillH - 12;
      }

      // If it still collides and it's not the primary hovered node, skip drawing it to avoid visual slop
      if (collides(pillX, pillY) && !isPrimary) {
        return;
      }

      // Register placed box
      placedBoxes.push({ x: pillX, y: pillY, w: pillW, h: pillH });

      // Draw Pill Background
      ctx.save();
      ctx.beginPath();
      // Rounded rect
      const rx = pillH / 2;
      ctx.roundRect(pillX, pillY, pillW, pillH, rx);

      ctx.fillStyle = isPrimary ? "rgba(10, 13, 22, 0.94)" : "rgba(14, 18, 28, 0.88)";
      ctx.fill();

      ctx.lineWidth = isPrimary ? 1.5 : 1;
      ctx.strokeStyle = isPrimary ? categoryColor : "rgba(255, 255, 255, 0.16)";
      ctx.stroke();

      // Category colored indicator dot
      const dotX = pillX + padX + dotR;
      const dotY = pillY + pillH / 2;
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2);
      ctx.fillStyle = categoryColor;
      ctx.fill();

      // Label Text
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isPrimary ? "#FFFFFF" : "rgba(235, 240, 255, 0.88)";
      ctx.fillText(label, dotX + dotR + dotGap, pillY + pillH / 2);
      ctx.restore();
    };

    const render = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Deep studio background
      ctx.fillStyle = "#0B0C10";
      ctx.fillRect(0, 0, W, H);

      // Subtle background dot grid for authentic Obsidian look
      const gridStep = 32;
      ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
      for (let gx = gridStep; gx < W; gx += gridStep) {
        for (let gy = gridStep; gy < H; gy += gridStep) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const focusId = hoverId >= 0 ? hoverId : -1;
      const focusNeighbors =
        focusId >= 0 ? adj.get(focusId) || new Set<number>() : new Set<number>();

      // Filter check helper
      const isNodeFiltered = (n: VaultNode) => {
        return activeFilter === "all" || n.category === activeFilter;
      };

      // 1. Draw Links
      for (const l of links) {
        const a = nodes[l.source]!;
        const b = nodes[l.target]!;

        const isConnectedToFocus = focusId >= 0 && (l.source === focusId || l.target === focusId);
        const bothFiltered = isNodeFiltered(a) && isNodeFiltered(b);

        let strokeStyle = "rgba(148, 163, 184, 0.12)";
        let lineWidth = 1;

        if (isConnectedToFocus) {
          strokeStyle = CATEGORY_CONFIG[nodes[focusId]!.category].color;
          lineWidth = 2;
        } else if (bothFiltered && activeFilter !== "all") {
          strokeStyle = "rgba(148, 163, 184, 0.28)";
          lineWidth = 1.2;
        } else if (!bothFiltered) {
          strokeStyle = "rgba(148, 163, 184, 0.04)";
          lineWidth = 0.8;
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // 2. Draw Signal Pulses along edges (Synapses)
      for (const p of pulses) {
        const sNode = nodes[p.source]!;
        const tNode = nodes[p.target]!;
        const px = sNode.x + (tNode.x - sNode.x) * p.progress;
        const py = sNode.y + (tNode.y - sNode.y) * p.progress;

        const pulseColor = p.color || "#38BDF8";
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = pulseColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Nodes
      for (const n of nodes) {
        const isHovered = n.id === focusId;
        const isNeighbor = focusNeighbors.has(n.id);
        const matchesFilter = isNodeFiltered(n);
        const catConfig = CATEGORY_CONFIG[n.category];

        const nodeRadius = n.r + (isHovered ? 3 : isNeighbor ? 1 : 0);

        // Alpha based on filter and focus
        let alpha = 1;
        if (activeFilter !== "all" && !matchesFilter) {
          alpha = 0.2;
        } else if (focusId >= 0 && !isHovered && !isNeighbor) {
          alpha = 0.45;
        }

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow ring for hovered node or hubs
        if (isHovered || (n.category === "moc" && matchesFilter)) {
          const glowGrad = ctx.createRadialGradient(
            n.x,
            n.y,
            0,
            n.x,
            n.y,
            nodeRadius * (isHovered ? 4.5 : 3),
          );
          glowGrad.addColorStop(0, isHovered ? catConfig.glow : "rgba(167, 139, 250, 0.22)");
          glowGrad.addColorStop(1, "transparent");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, nodeRadius * (isHovered ? 4.5 : 3), 0, Math.PI * 2);
          ctx.fill();
        }

        // Concentric ripple on active hovered node
        if (isHovered) {
          const rippleTime = (now % 1800) / 1800;
          ctx.strokeStyle = catConfig.color;
          ctx.globalAlpha = (1 - rippleTime) * 0.8;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, nodeRadius + 2 + rippleTime * 22, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = alpha;
        }

        // Inner solid node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#FFFFFF" : isNeighbor ? catConfig.color : catConfig.color;
        ctx.fill();

        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.strokeStyle = isHovered ? catConfig.color : "rgba(255,255,255,0.4)";
        ctx.stroke();

        ctx.restore();
      }

      // 4. Draw Anti-collision Labels
      const placedBoxes: PillBox[] = [];

      // A. If a node is hovered, draw its pill first (highest priority)
      if (focusId >= 0) {
        const fn = nodes[focusId]!;
        drawPill(fn.label, fn.x, fn.y, CATEGORY_CONFIG[fn.category].color, true, placedBoxes);

        // B. Draw pills for up to 4 closest neighbors of the hovered node
        const neighborNodes = Array.from(focusNeighbors)
          .map((id) => nodes[id]!)
          .sort((a, b) => {
            const da = Math.hypot(a.x - fn.x, a.y - fn.y);
            const db = Math.hypot(b.x - fn.x, b.y - fn.y);
            return da - db;
          })
          .slice(0, 4);

        for (const nn of neighborNodes) {
          drawPill(nn.label, nn.x, nn.y, CATEGORY_CONFIG[nn.category].color, false, placedBoxes);
        }
      } else {
        // When not hovering, show only the 4 main MOC hubs
        const hubsToLabel = nodes.filter((n) => n.category === "moc" && isNodeFiltered(n));
        for (const hn of hubsToLabel) {
          drawPill(hn.label, hn.x, hn.y, CATEGORY_CONFIG[hn.category].color, false, placedBoxes);
        }

        // If a specific category filter is chosen, also label top 3 nodes of that category
        if (activeFilter !== "all") {
          const catNodes = nodes
            .filter((n) => n.category === activeFilter && n.category !== "moc")
            .slice(0, 3);
          for (const cn of catNodes) {
            drawPill(cn.label, cn.x, cn.y, CATEGORY_CONFIG[cn.category].color, false, placedBoxes);
          }
        }
      }
    };

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (!isVisible) return;
      stepPhysics(now);
      render(now);
    };

    animId = requestAnimationFrame(loop);

    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(box);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [graphData, activeFilter]);

  // Reset graph layout
  const handleReset = () => {
    const { nodes } = graphData;
    const box = containerRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    nodes.forEach((n, idx) => {
      const angle = (idx / nodes.length) * Math.PI * 2;
      n.x = n.anchorX * r.width + Math.cos(angle) * 15;
      n.y = n.anchorY * r.height + Math.sin(angle) * 15;
      n.vx = 0;
      n.vy = 0;
    });
    setInspectedId(null);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#090A0F] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)]">
      {/* ── macOS Obsidian Studio Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-[#0D0F17]/90 px-4 py-2.5 backdrop-blur-md">
        {/* Left: Window Dots & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80 ring-1 ring-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80 ring-1 ring-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80 ring-1 ring-white/10" />
          </div>
          <div className="flex items-center gap-2 pl-1 text-xs font-medium text-zinc-300">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-purple-500/20 text-[10px] text-purple-300 ring-1 ring-purple-500/40">
              💎
            </span>
            <span className="font-mono text-[11px] text-zinc-200">erick-brain.vault</span>
            <span className="text-zinc-600">/</span>
            <span className="text-[11px] text-zinc-400">graph-view</span>
          </div>
        </div>

        {/* Right: Live Status Badge + Reset */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-500/20">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            42 notas activas
          </span>

          <button
            type="button"
            onClick={handleReset}
            title="Centrar y reajustar grafo"
            className="flex h-6 items-center gap-1 rounded bg-white/5 px-2 text-[11px] font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* ── Category Filter Pills Bar ── */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/6 bg-[#0B0D14]/80 px-4 py-2">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
          Filtrar:
        </span>
        {(
          [
            { id: "all", label: "Todos", count: 42 },
            { id: "moc", label: "MOCs", count: 4, color: "#A78BFA" },
            { id: "skill", label: "Skills", count: 5, color: "#38BDF8" },
            { id: "rule", label: "Reglas", count: 7, color: "#34D399" },
            { id: "project", label: "Proyectos", count: 5, color: "#F59E0B" },
          ] as const
        ).map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                isActive
                  ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200"
              }`}
            >
              {f.id !== "all" && (
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: f.color }} />
              )}
              <span>{f.label}</span>
              <span className="text-[10px] text-zinc-500">({f.count})</span>
            </button>
          );
        })}
      </div>

      {/* ── Canvas Graph Container ── */}
      <div
        ref={containerRef}
        className="relative min-h-[360px] flex-1 cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* ── Floating Live Inspector Card ── */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 max-w-[420px] rounded-xl border border-white/12 bg-[#0E121D]/90 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-200 sm:bottom-4 sm:left-4">
          {inspectedNode ? (
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: CATEGORY_CONFIG[inspectedNode.category].bg,
                      color: CATEGORY_CONFIG[inspectedNode.category].color,
                      border: `1px solid ${CATEGORY_CONFIG[inspectedNode.category].border}`,
                    }}
                  >
                    {CATEGORY_CONFIG[inspectedNode.category].label}
                  </span>
                  <span className="font-mono text-xs font-semibold text-white">
                    {inspectedNode.filename}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-zinc-400">
                  {inspectedNode.connectionsCount} conexiones
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-zinc-300">{inspectedNode.summary}</p>

              {connectedNeighbors.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-white/8 pt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                    Conecta con:
                  </span>
                  {connectedNeighbors.slice(0, 4).map((nb) => (
                    <span
                      key={nb.id}
                      className="rounded bg-white/6 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 ring-1 ring-white/10"
                    >
                      {nb.label}
                    </span>
                  ))}
                  {connectedNeighbors.length > 4 && (
                    <span className="text-[10px] text-zinc-300">
                      +{connectedNeighbors.length - 4} más
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Obsidian Second Brain</p>
                <p className="text-[11px] text-zinc-400">
                  Pasa el ratón o arrastra cualquier nodo para inspeccionar sus reglas.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom-right interactive hint */}
        <div className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-zinc-400 backdrop-blur-sm sm:flex">
          <span>💡 Arrastra nodos para reorganizar</span>
        </div>
      </div>
    </div>
  );
}
