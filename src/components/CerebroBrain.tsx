import { useEffect, useRef } from "react";
import { useReducedMotion } from "./motion-pref";

/*
 * Cerebro ilustrado: silueta lateral con circunvoluciones generadas por código
 * (laberinto de pliegues) y, dentro, el grafo de notas de Obsidian.
 * Una "ola de lectura" recorre los nodos para mostrar cómo la IA lee las notas.
 */

/* Vista dorsal: dos hemisferios simétricos con contorno lobulado y surco longitudinal */
function hemiPoints(): number[][] {
  const pts: number[][] = [];
  const N = 160;
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2;
    const c = Math.cos(th);
    const sn = Math.sin(th);
    // borde medial casi recto (t -> 1) y lateral redondeado (t -> -1)
    const t = Math.sign(c) * Math.pow(Math.abs(c), c > 0 ? 0.55 : 1);
    const lobe = (1 - t) / 2;
    const rr = 1 + lobe * (0.05 * Math.sin(11 * th + 0.6) + 0.034 * Math.sin(19 * th + 2.1));
    const front = 0.8 + 0.2 * ((sn + 1) / 2); // más estrecho por delante
    const x = 199.3 - lobe * 176 * front * rr;
    const y = 172 + 150 * Math.sign(sn) * Math.pow(Math.abs(sn), 1) * (1 + (rr - 1) * 0.8);
    pts.push([x, y]);
  }
  return pts;
}
function smoothPath(pts: number[][], mirror: boolean): Path2D {
  const q = new Path2D();
  const p = pts.map(([x, y]) => [mirror ? 400 - x! : x!, y!]);
  const n = p.length;
  q.moveTo((p[0]![0]! + p[n - 1]![0]!) / 2, (p[0]![1]! + p[n - 1]![1]!) / 2);
  for (let i = 0; i < n; i++) {
    const a = p[i]!;
    const b = p[(i + 1) % n]!;
    q.quadraticCurveTo(a[0]!, a[1]!, (a[0]! + b[0]!) / 2, (a[1]! + b[1]!) / 2);
  }
  q.closePath();
  return q;
}

type Kind = "hub" | "project" | "skill" | "rule" | "note";
interface GN {
  name: string;
  kind: Kind;
  x: number;
  y: number;
  adj: number[];
}

// Nombres reales de mi vault; las posiciones se reparten por zonas del cerebro
const NAMED: [string, Kind, number, number][] = [
  ["MOC-INDEX", "hub", 200, 172],
  ["AGENTS", "hub", 108, 150],
  ["PROJECTS", "hub", 292, 112],
  ["MOC-DESIGN", "hub", 292, 232],
  ["ORDERALO", "project", 252, 72],
  ["GESGRAMA", "project", 336, 92],
  ["BREADPDF", "project", 346, 156],
  ["DIVERSPLAS", "project", 238, 132],
  ["SKILL-apple-design", "skill", 340, 226],
  ["04-COLOR", "skill", 300, 280],
  ["05-TYPOGRAPHY", "skill", 244, 240],
  ["02-COMPONENTS", "skill", 232, 200],
  ["CLAUDE", "rule", 58, 112],
  ["REGLAS-agente", "rule", 62, 196],
  ["DECISIONES", "rule", 122, 252],
  ["06-ACCESSIBILITY", "rule", 150, 92],
];
const NAMED_LINKS: [string, string][] = [
  ["MOC-INDEX", "AGENTS"],
  ["MOC-INDEX", "PROJECTS"],
  ["MOC-INDEX", "MOC-DESIGN"],
  ["PROJECTS", "MOC-DESIGN"],
  ["PROJECTS", "ORDERALO"],
  ["PROJECTS", "GESGRAMA"],
  ["PROJECTS", "BREADPDF"],
  ["PROJECTS", "DIVERSPLAS"],
  ["MOC-DESIGN", "SKILL-apple-design"],
  ["MOC-DESIGN", "04-COLOR"],
  ["MOC-DESIGN", "05-TYPOGRAPHY"],
  ["MOC-DESIGN", "02-COMPONENTS"],
  ["AGENTS", "CLAUDE"],
  ["AGENTS", "REGLAS-agente"],
  ["AGENTS", "DECISIONES"],
  ["AGENTS", "06-ACCESSIBILITY"],
  ["MOC-INDEX", "DIVERSPLAS"],
  ["MOC-INDEX", "02-COMPONENTS"],
  ["MOC-INDEX", "06-ACCESSIBILITY"],
];

function rng(seed: number) {
  let v = seed;
  return () => {
    v = (v * 16807) % 2147483647;
    return (v - 1) / 2147483646;
  };
}

const KIND_COLOR: Record<Kind, string> = {
  hub: "#09090B",
  project: "#F59E0B",
  skill: "#FFFFFF",
  rule: "#DDD6FE",
  note: "#C4B5FD",
};
const KIND_R: Record<Kind, number> = { hub: 11, project: 8, skill: 7.5, rule: 7.5, note: 4.4 };

export function CerebroBrain() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ───────── geometría en el espacio del dibujo (400 × 330) ─────────
    const probe = document.createElement("canvas").getContext("2d");
    if (!probe) return;
    const hemiPts = hemiPoints();
    const hemiL = smoothPath(hemiPts, false);
    const hemiR = smoothPath(hemiPts, true);
    const inL = (x: number, y: number) => probe.isPointInPath(hemiL, x, y);
    const inAny = (x: number, y: number) => inL(x, y) || probe.isPointInPath(hemiR, x, y);
    const around = (f: (x: number, y: number) => boolean, x: number, y: number, m: number) =>
      f(x, y) && f(x - m, y) && f(x + m, y) && f(x, y - m) && f(x, y + m);
    const inMargin = (x: number, y: number, m: number) => around(inAny, x, y, m);
    const inMarginL = (x: number, y: number, m: number) => around(inL, x, y, m);

    // ───────── circunvoluciones: gusanos que no se tocan (laberinto) ─────────
    const genWorms = () => {
      const rnd = rng(23);
      const CELL = 4;
      const GW = Math.ceil(400 / CELL);
      const GH = Math.ceil(330 / CELL);
      const grid = new Int16Array(GW * GH);
      const stepAt = new Int16Array(GW * GH);
      const RING = 6;
      const ANG = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
      const cellOf = (x: number, y: number) => {
        const cx = Math.floor(x / CELL);
        const cy = Math.floor(y / CELL);
        return cx < 0 || cy < 0 || cx >= GW || cy >= GH ? -1 : cy * GW + cx;
      };
      const free = (x: number, y: number, id: number, step: number) => {
        const check = (px: number, py: number) => {
          const c = cellOf(px, py);
          if (c < 0) return true;
          const g = grid[c]!;
          return g === 0 || (g === id && step - stepAt[c]! <= 16);
        };
        if (!check(x, y)) return false;
        for (const a of ANG) {
          if (!check(x + Math.cos(a) * RING, y + Math.sin(a) * RING)) return false;
        }
        return true;
      };
      const mark = (x: number, y: number, id: number, step: number) => {
        for (let dy = -3; dy <= 3; dy += CELL) {
          for (let dx = -3; dx <= 3; dx += CELL) {
            const c = cellOf(x + dx, y + dy);
            if (c >= 0) {
              grid[c] = id;
              stepAt[c] = step;
            }
          }
        }
      };
      const worms: number[][][] = [];
      for (let attempt = 0; attempt < 9000; attempt++) {
        const sx = 14 + rnd() * 186;
        const sy = 24 + rnd() * 290;
        const id = worms.length + 1;
        if (!inMarginL(sx, sy, 8) || !free(sx, sy, id, 0)) continue;
        const pts: number[][] = [[sx, sy]];
        mark(sx, sy, id, 0);
        let x = sx;
        let y = sy;
        let ang = rnd() * Math.PI * 2;
        let av = 0;
        for (let step = 1; step < 600; step++) {
          av += (rnd() - 0.5) * 0.55;
          av *= 0.86;
          ang += av;
          let moved = false;
          for (const turn of [0, 0.5, -0.5, 1.1, -1.1]) {
            const a = ang + turn;
            const nx = x + Math.cos(a) * 3;
            const ny = y + Math.sin(a) * 3;
            if (inMarginL(nx, ny, 8) && free(nx, ny, id, step)) {
              x = nx;
              y = ny;
              ang = a;
              moved = true;
              break;
            }
          }
          if (!moved) break;
          pts.push([x, y]);
          mark(x, y, id, step);
        }
        if (pts.length > 7) worms.push(pts);
        else for (let i = 0; i < grid.length; i++) if (grid[i] === id) grid[i] = 0;
      }
      return worms;
    };
    const worms = genWorms();

    // ───────── grafo ─────────
    const nodes: GN[] = NAMED.map(([name, kind, x, y]) => {
      let nx = x;
      let ny = y;
      for (let i = 0; i < 40 && !inMargin(nx, ny, 12); i++) {
        nx += (200 - nx) * 0.08;
        ny += (172 - ny) * 0.08;
      }
      return { name, kind, x: nx, y: ny, adj: [] };
    });
    const idx = new Map(nodes.map((n, i) => [n.name, i]));
    const links: [number, number, boolean][] = [];
    const link = (a: number, b: number, main: boolean) => {
      links.push([a, b, main]);
      nodes[a]!.adj.push(b);
      nodes[b]!.adj.push(a);
    };
    NAMED_LINKS.forEach(([a, b]) => link(idx.get(a)!, idx.get(b)!, true));

    const rnd2 = rng(5);
    for (let tries = 0; tries < 900 && nodes.length < NAMED.length + 44; tries++) {
      const x = 24 + rnd2() * 352;
      const y = 34 + rnd2() * 270;
      if (!inMargin(x, y, 12)) continue;
      if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 22)) continue;
      const id = nodes.length;
      nodes.push({ name: "", kind: "note", x, y, adj: [] });
      const near = nodes
        .slice(0, id)
        .map((n, i) => ({ i, d: Math.hypot(n.x - x, n.y - y) }))
        .sort((p, q) => p.d - q.d);
      if (near[0] && near[0].d < 80) link(id, near[0].i, false);
      if (near[1] && near[1].d < 60) link(id, near[1].i, false);
    }
    const hubs = nodes.map((n, i) => (n.kind === "hub" ? i : -1)).filter((i) => i >= 0);

    const bfs = (start: number) => {
      const d = new Array<number>(nodes.length).fill(-1);
      d[start] = 0;
      const q = [start];
      while (q.length) {
        const c = q.shift()!;
        for (const n of nodes[c]!.adj) {
          if (d[n] === -1) {
            d[n] = d[c]! + 1;
            q.push(n);
          }
        }
      }
      return d.map((v) => (v < 0 ? 0 : v));
    };

    // ───────── lienzo ─────────
    let W = 0;
    let H = 0;
    let dpr = 1;
    let s = 1;
    let bx = 0;
    let by = 0;
    let still: HTMLCanvasElement | null = null;

    // Estado físico de cada nodo (en px): se estira al arrastrarlo y vuelve como una goma
    const P = nodes.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 }));
    const rest = links.map(() => 0);

    // Cerebro como dibujo de líneas (sin relleno): contorno blanco con sombra negra desplazada
    // y circunvoluciones como trazos finos
    const renderStill = () => {
      const off = document.createElement("canvas");
      off.width = Math.round(W * dpr);
      off.height = Math.round(H * dpr);
      const c = off.getContext("2d");
      if (!c) return;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.lineJoin = "round";
      c.lineCap = "round";
      c.translate(bx, by);
      c.scale(s, s);

      const strokeAll = (color: string, width: number, dx: number) => {
        c.save();
        c.translate(dx, dx);
        c.strokeStyle = color;
        c.lineWidth = width / s;
        c.stroke(hemiL);
        c.stroke(hemiR);
        c.restore();
      };

      // sombra dura: el mismo contorno en negro, desplazado
      strokeAll("#09090B", 6, 7);

      // circunvoluciones: izquierda y su reflejo en el hemisferio derecho
      const gyri = (mirror: boolean, clipP: Path2D) => {
        c.save();
        c.clip(clipP);
        c.strokeStyle = "#D2C3FF";
        c.lineWidth = 3 / s;
        const X = (x: number) => (mirror ? 400 - x : x);
        for (const pts of worms) {
          c.beginPath();
          c.moveTo(X(pts[0]![0]!), pts[0]![1]!);
          for (let i = 1; i < pts.length - 1; i++) {
            const mx = (pts[i]![0]! + pts[i + 1]![0]!) / 2;
            const my = (pts[i]![1]! + pts[i + 1]![1]!) / 2;
            c.quadraticCurveTo(X(pts[i]![0]!), pts[i]![1]!, X(mx), my);
          }
          c.stroke();
        }
        c.restore();
      };
      gyri(false, hemiL);
      gyri(true, hemiR);

      // contorno blanco, encima
      strokeAll("#FFFFFF", 4.5, 0);
      still = off;
    };

    const placeNodes = () => {
      nodes.forEach((n, i) => {
        P[i]!.ax = bx + n.x * s;
        P[i]!.ay = by + n.y * s;
        P[i]!.x = P[i]!.ax;
        P[i]!.y = P[i]!.ay;
        P[i]!.vx = 0;
        P[i]!.vy = 0;
      });
      links.forEach(([a, b], i) => {
        rest[i] = Math.hypot(P[a]!.ax - P[b]!.ax, P[a]!.ay - P[b]!.ay);
      });
    };

    const resize = () => {
      const r = box.getBoundingClientRect();
      W = Math.max(240, r.width);
      H = Math.max(240, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      s = Math.min((W * 0.9) / 400, (H * 0.9) / 330);
      bx = (W - 400 * s) / 2;
      by = (H - 330 * s) / 2 - 6;
      renderStill();
      placeNodes();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    // ───────── interacción: hover y arrastre elástico ─────────
    let hover = -1;
    let drag = -1;
    const pt = { x: -999, y: -999 };
    const nearest = (maxD: number) => {
      let best = -1;
      let bd = maxD;
      P.forEach((p, i) => {
        const d = Math.hypot(p.x - pt.x, p.y - pt.y);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pt.x = e.clientX - r.left;
      pt.y = e.clientY - r.top;
    };
    const onMove = (e: PointerEvent) => {
      local(e);
      if (drag < 0) {
        hover = nearest(24);
        canvas.style.cursor = hover >= 0 ? "grab" : "default";
      }
    };
    const onDown = (e: PointerEvent) => {
      local(e);
      const i = nearest(28);
      if (i >= 0) {
        drag = i;
        hover = i;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      }
    };
    const onUp = () => {
      drag = -1;
      canvas.style.cursor = "default";
    };
    const onLeave = () => {
      if (drag < 0) hover = -1;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    // ───────── animación: ola de lectura + física ─────────
    const HOP = 430;
    let hubK = 0;
    let waveStart = performance.now();
    let waveDist = bfs(hubs[0]!);
    let maxD = Math.max(...waveDist);
    let visible = true;
    let raf = 0;

    const physics = (t: number) => {
      // enlaces: muelles suaves (transmiten el estirón a los vecinos)
      links.forEach(([a, b], i) => {
        const pa = P[a]!;
        const pb = P[b]!;
        const dx = pb.x - pa.x;
        const dy = pb.y - pa.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - rest[i]!) * 0.012;
        pa.vx += (dx / d) * f;
        pa.vy += (dy / d) * f;
        pb.vx -= (dx / d) * f;
        pb.vy -= (dy / d) * f;
      });
      P.forEach((p, i) => {
        if (i === drag) {
          p.x = Math.max(8, Math.min(W - 8, pt.x));
          p.y = Math.max(8, Math.min(H - 8, pt.y));
          p.vx = 0;
          p.vy = 0;
          return;
        }
        const driftX = Math.sin(t * 0.0007 + i * 1.7) * 1.6;
        const driftY = Math.cos(t * 0.0006 + i * 1.3) * 1.6;
        p.vx += (p.ax + driftX - p.x) * 0.05;
        p.vy += (p.ay + driftY - p.y) * 0.05;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.x += p.vx;
        p.y += p.vy;
      });
    };

    const draw = (t: number) => {
      physics(t);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (still) ctx.drawImage(still, 0, 0, W, H);

      if (!reduce && t - waveStart > maxD * HOP + 3000) {
        waveStart = t;
        hubK = (hubK + 1) % hubs.length;
        waveDist = bfs(hubs[hubK]!);
        maxD = Math.max(...waveDist);
      }
      const el = reduce ? 0 : t - waveStart;
      const fade = reduce ? 0 : Math.max(0, Math.min(1, 1 - (el - (maxD * HOP + 900)) / 1500));
      const lit = (i: number) =>
        reduce ? 0 : Math.max(0, Math.min(1, (el - waveDist[i]! * HOP) / HOP)) * fade;

      const focusI = drag >= 0 ? drag : hover;
      const nbr = focusI >= 0 ? new Set([focusI, ...nodes[focusI]!.adj]) : null;
      const pos = P;

      // enlaces base
      for (const [a, b, main] of links) {
        ctx.beginPath();
        ctx.moveTo(pos[a]!.x, pos[a]!.y);
        ctx.lineTo(pos[b]!.x, pos[b]!.y);
        ctx.strokeStyle = main ? "#FFFFFF" : "#C4B5FD";
        ctx.lineWidth = main ? 2.2 : 1.3;
        ctx.stroke();
      }
      // enlaces activos (ola de lectura o hover)
      for (const [a, b] of links) {
        let from = waveDist[a]! <= waveDist[b]! ? a : b;
        let f = 1;
        let alpha = 1;
        if (nbr) {
          if (a !== focusI && b !== focusI) continue;
          from = focusI;
        } else {
          f = Math.max(0, Math.min(1, (el - waveDist[from]! * HOP) / HOP));
          alpha = Math.max(0.3, fade);
          if (f <= 0 || fade <= 0) continue;
        }
        const to = from === a ? b : a;
        ctx.beginPath();
        ctx.moveTo(pos[from]!.x, pos[from]!.y);
        ctx.lineTo(
          pos[from]!.x + (pos[to]!.x - pos[from]!.x) * f,
          pos[from]!.y + (pos[to]!.y - pos[from]!.y) * f,
        );
        ctx.strokeStyle = "#F59E0B";
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // nodos
      nodes.forEach((n, i) => {
        const p = pos[i]!;
        const a = nbr ? (nbr.has(i) ? 1 : 0) : lit(i);
        const r =
          KIND_R[n.kind] *
          Math.min(1.25, Math.max(0.85, s * 0.7));
        if (a > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 7 + a * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,158,11,${0.45 * a})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2);
        ctx.fillStyle = n.kind === "hub" ? "#FFFFFF" : "#09090B";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = a > 0.5 && n.kind !== "hub" ? "#F59E0B" : KIND_COLOR[n.kind];
        ctx.fill();
      });

      // etiquetas: hubs siempre; nodo activo y vecinos con nombre
      const boxes: { x: number; y: number; w: number; h: number }[] = [];
      ctx.font = "700 15px Inter Variable, Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = (i: number, strong: boolean) => {
        const n = nodes[i]!;
        if (!n.name) return;
        const p = pos[i]!;
        const tw = ctx.measureText(n.name).width;
        const w = tw + 20;
        const h = 28;
        let x = p.x - w / 2;
        let y = p.y + 16;
        const hit = (xx: number, yy: number) =>
          boxes.some(
            (b) => xx < b.x + b.w + 4 && xx + w + 4 > b.x && yy < b.y + b.h + 3 && yy + h + 3 > b.y,
          );
        if (hit(x, y)) y = p.y - h - 14;
        if (hit(x, y) && !strong) return;
        x = Math.max(6, Math.min(W - w - 6, x));
        boxes.push({ x, y, w, h });
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 7);
        ctx.fillStyle = strong ? "#09090B" : "#FFFFFF";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#09090B";
        ctx.stroke();
        ctx.fillStyle = strong ? "#FFFFFF" : "#09090B";
        ctx.fillText(n.name, x + w / 2, y + h / 2 + 0.5);
      };
      if (focusI >= 0) {
        label(focusI, true);
        nodes[focusI]!.adj.forEach((j) => label(j, false));
      } else {
        const focus = hubs[hubK]!;
        label(focus, true);
        hubs.forEach((h) => h !== focus && label(h, false));
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (visible) draw(now);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? true;
    });
    io.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <div ref={wrap} className="relative h-full w-full">
      <canvas
        ref={cv}
        role="img"
        aria-label="Cerebro con el grafo de notas de Obsidian: una ola recorre las notas como lo hace la IA al leer"
        className="block touch-pan-y select-none"
      />
    </div>
  );
}
