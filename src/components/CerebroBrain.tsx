import { useEffect, useRef } from "react";
import { useReducedMotion } from "./motion-pref";

/*
 * Cerebro ilustrado: silueta lateral con circunvoluciones generadas por código
 * (laberinto de pliegues) y, dentro, el grafo de notas de Obsidian.
 * Una "ola de lectura" recorre los nodos para mostrar cómo la IA lee las notas.
 */

const CEREBRUM_D =
  "M55 170 C33 140 45 96 86 70 C116 40 166 30 200 42 C226 22 276 24 298 48 C336 40 372 68 368 108 C392 128 388 168 362 184 C350 196 330 200 312 198 C296 206 270 208 250 214 C238 238 190 246 155 238 C135 232 120 222 118 210 C104 200 78 192 55 170 Z";
const CEREBELLUM_D =
  "M262 214 C290 208 340 212 346 238 C350 262 318 282 288 278 C262 274 246 250 262 214 Z";
const STEM_D =
  "M212 222 C214 250 222 278 230 298 C236 312 252 316 258 304 C262 288 258 260 256 228 Z";
const CEREBELLUM_LINES =
  "M276 226 C300 219 330 225 340 240 M272 242 C300 235 332 241 342 256 M278 258 C298 253 324 259 332 270 M240 250 C242 268 245 284 248 298";
const SYLVIAN = "M120 208 C160 190 205 190 250 208";

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
  ["MOC-INDEX", "hub", 200, 120],
  ["AGENTS", "hub", 105, 142],
  ["PROJECTS", "hub", 255, 82],
  ["MOC-DESIGN", "hub", 300, 165],
  ["ORDERALO", "project", 225, 52],
  ["GESGRAMA", "project", 300, 58],
  ["BREADPDF", "project", 336, 96],
  ["DIVERSPLAS", "project", 200, 86],
  ["SKILL-apple-design", "skill", 346, 148],
  ["04-COLOR", "skill", 330, 194],
  ["05-TYPOGRAPHY", "skill", 270, 194],
  ["02-COMPONENTS", "skill", 238, 150],
  ["CLAUDE", "rule", 72, 116],
  ["REGLAS-agente", "rule", 82, 176],
  ["DECISIONES", "rule", 135, 198],
  ["06-ACCESSIBILITY", "rule", 150, 100],
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
  skill: "#6D28D9",
  rule: "#4C1D95",
  note: "#A1A1AA",
};
const KIND_R: Record<Kind, number> = { hub: 9, project: 6.5, skill: 6, rule: 6, note: 3.6 };

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
    const cerebrumP = new Path2D(CEREBRUM_D);
    const cerebellumP = new Path2D(CEREBELLUM_D);
    const stemP = new Path2D(STEM_D);
    const inCerebrum = (x: number, y: number) => probe.isPointInPath(cerebrumP, x, y);
    const inMargin = (x: number, y: number, m: number) =>
      inCerebrum(x, y) &&
      inCerebrum(x - m, y) &&
      inCerebrum(x + m, y) &&
      inCerebrum(x, y - m) &&
      inCerebrum(x, y + m);

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
        const sx = 30 + rnd() * 350;
        const sy = 20 + rnd() * 230;
        const id = worms.length + 1;
        if (!inMargin(sx, sy, 8) || !free(sx, sy, id, 0)) continue;
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
            if (inMargin(nx, ny, 8) && free(nx, ny, id, step)) {
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
        ny += (130 - ny) * 0.08;
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
      const x = 34 + rnd2() * 340;
      const y = 28 + rnd2() * 210;
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

    const boxBlur = (src: Float32Array, w: number, h: number, r: number) => {
      const tmp = new Float32Array(src.length);
      const out = new Float32Array(src.length);
      const n = 2 * r + 1;
      for (let y = 0; y < h; y++) {
        let sum = 0;
        for (let x = -r; x <= r; x++) sum += src[y * w + Math.min(w - 1, Math.max(0, x))]!;
        for (let x = 0; x < w; x++) {
          tmp[y * w + x] = sum / n;
          sum += src[y * w + Math.min(w - 1, x + r + 1)]! - src[y * w + Math.max(0, x - r)]!;
        }
      }
      for (let x = 0; x < w; x++) {
        let sum = 0;
        for (let y = -r; y <= r; y++) sum += tmp[Math.min(h - 1, Math.max(0, y)) * w + x]!;
        for (let y = 0; y < h; y++) {
          out[y * w + x] = sum / n;
          sum += tmp[Math.min(h - 1, y + r + 1) * w + x]! - tmp[Math.max(0, y - r) * w + x]!;
        }
      }
      return out;
    };

    /*
     * Cerebro con relieve real: máscara -> cúpula (blur) + crestas (circunvoluciones)
     * -> mapa de alturas -> normales -> iluminación difusa/especular + oclusión en los surcos.
     */
    const shadePart = (
      drawMask: (c: CanvasRenderingContext2D) => void,
      drawRidges: ((c: CanvasRenderingContext2D) => void) | null,
      domeAmp: number,
      ridgeAmp: number,
      dark: [number, number, number],
      light: [number, number, number],
    ) => {
      const w = Math.round(W);
      const h = Math.round(H);
      const mk = document.createElement("canvas");
      mk.width = w;
      mk.height = h;
      const mc = mk.getContext("2d")!;
      mc.translate(bx, by);
      mc.scale(s, s);
      mc.fillStyle = "#fff";
      drawMask(mc);
      const md = mc.getImageData(0, 0, w, h).data;
      const mask = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) mask[i] = md[i * 4 + 3]! / 255;

      const rd0 = Math.max(4, Math.round(7 * s));
      let dome = boxBlur(mask, w, h, rd0);
      dome = boxBlur(dome, w, h, rd0);
      dome = boxBlur(dome, w, h, rd0);

      let ridge = new Float32Array(w * h);
      if (drawRidges) {
        const rk = document.createElement("canvas");
        rk.width = w;
        rk.height = h;
        const rc = rk.getContext("2d")!;
        rc.fillStyle = "#000";
        rc.fillRect(0, 0, w, h);
        rc.translate(bx, by);
        rc.scale(s, s);
        rc.lineCap = "round";
        rc.lineJoin = "round";
        drawRidges(rc);
        const rd = rc.getImageData(0, 0, w, h).data;
        for (let i = 0; i < w * h; i++) ridge[i] = rd[i * 4]! / 255;
        ridge = boxBlur(boxBlur(ridge, w, h, 1), w, h, 1);
      }

      const hgt = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const d = Math.min(1, dome[i]! * 1.35);
        hgt[i] = Math.pow(d, 0.72) * domeAmp + ridge[i]! * ridgeAmp * Math.min(1, d * 2);
      }

      const out = mc.createImageData(w, h);
      const lx0 = -0.55;
      const ly0 = -0.7;
      const lz0 = 0.62;
      const ln = Math.hypot(lx0, ly0, lz0);
      const lx = lx0 / ln;
      const ly = ly0 / ln;
      const lz = lz0 / ln;
      const hl = Math.hypot(lx, ly, lz + 1);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const m = mask[i]!;
          if (m < 0.02) continue;
          const hx = (hgt[i + 1]! - hgt[i - 1]!) * 0.5;
          const hy = (hgt[i + w]! - hgt[i - w]!) * 0.5;
          const nl = Math.hypot(hx, hy, 1);
          const nx = -hx / nl;
          const ny = -hy / nl;
          const nz = 1 / nl;
          const diff = Math.max(0, nx * lx + ny * ly + nz * lz);
          const spec = Math.pow(Math.max(0, (nx * lx + ny * ly + nz * (lz + 1)) / hl), 28) * 0.55;
          const ao = 0.66 + 0.34 * Math.pow(drawRidges ? ridge[i]! : 1, 0.7);
          const k = Math.min(1, 0.4 + diff * 0.85) * ao;
          const o = i * 4;
          out.data[o] = Math.min(255, dark[0] + (light[0] - dark[0]) * k + spec * 255);
          out.data[o + 1] = Math.min(255, dark[1] + (light[1] - dark[1]) * k + spec * 255);
          out.data[o + 2] = Math.min(255, dark[2] + (light[2] - dark[2]) * k + spec * 255);
          out.data[o + 3] = Math.round(Math.min(1, m * 1.5) * 255);
        }
      }
      const res = document.createElement("canvas");
      res.width = w;
      res.height = h;
      res.getContext("2d")!.putImageData(out, 0, 0);
      return res;
    };

    const tube = (rc: CanvasRenderingContext2D, paths: number[][][], k: number) => {
      const widths = [8.2, 6.6, 5.2, 3.9, 2.7, 1.5];
      const greys = [0.22, 0.42, 0.62, 0.8, 0.93, 1];
      widths.forEach((wd, wi) => {
        rc.lineWidth = wd * k;
        const g = Math.round(greys[wi]! * 255);
        rc.strokeStyle = `rgb(${g},${g},${g})`;
        for (const pts of paths) {
          rc.beginPath();
          rc.moveTo(pts[0]![0]!, pts[0]![1]!);
          for (let i = 1; i < pts.length - 1; i++) {
            const mx = (pts[i]![0]! + pts[i + 1]![0]!) / 2;
            const my = (pts[i]![1]! + pts[i + 1]![1]!) / 2;
            rc.quadraticCurveTo(pts[i]![0]!, pts[i]![1]!, mx, my);
          }
          rc.stroke();
        }
      });
    };

    const renderStill = () => {
      const off = document.createElement("canvas");
      off.width = Math.round(W * dpr);
      off.height = Math.round(H * dpr);
      const c = off.getContext("2d");
      if (!c) return;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.lineJoin = "round";
      c.lineCap = "round";

      // sombra dura
      c.save();
      c.translate(bx + 14, by + 14);
      c.scale(s, s);
      c.fillStyle = "#09090B";
      c.fill(stemP);
      c.fill(cerebellumP);
      c.fill(cerebrumP);
      c.restore();

      const outline = (path: Path2D, width: number) => {
        c.save();
        c.translate(bx, by);
        c.scale(s, s);
        c.strokeStyle = "#09090B";
        c.lineWidth = width / s;
        c.stroke(path);
        c.restore();
      };

      // tronco y cerebelo (más oscuros) y cerebro (más claro)
      c.drawImage(
        shadePart((m) => m.fill(stemP), null, 16, 0, [60, 30, 120], [196, 181, 253]),
        0,
        0,
        W,
        H,
      );
      outline(stemP, 4);

      c.drawImage(
        shadePart(
          (m) => m.fill(cerebellumP),
          (rc) => {
            rc.clip(cerebellumP);
            const lines: number[][][] = [];
            for (let k = 0; k < 9; k++) {
              const y0 = 218 + k * 7.2;
              lines.push([
                [262 + k * 1.5, y0],
                [292, y0 - 6 + k * 0.4],
                [322, y0 - 5 + k * 0.8],
                [346, y0 + 4 + k * 0.4],
              ]);
            }
            tube(rc, lines, 0.62);
          },
          20,
          6,
          [58, 28, 128],
          [203, 190, 255],
        ),
        0,
        0,
        W,
        H,
      );
      outline(cerebellumP, 4);

      c.drawImage(
        shadePart(
          (m) => m.fill(cerebrumP),
          (rc) => {
            rc.clip(cerebrumP);
            tube(rc, worms, 1);
            // surco de Silvio: una hendidura oscura
            rc.strokeStyle = "#000";
            rc.lineWidth = 3.4;
            rc.stroke(new Path2D(SYLVIAN));
          },
          34,
          4.6,
          [78, 40, 150],
          [252, 249, 255],
        ),
        0,
        0,
        W,
        H,
      );
      outline(cerebrumP, 4.5);
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
        ctx.strokeStyle = main ? "rgba(9,9,11,0.6)" : "rgba(9,9,11,0.32)";
        ctx.lineWidth = main ? 2 : 1.2;
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
        ctx.strokeStyle = "#8B5CF6";
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 3.2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // nodos
      nodes.forEach((n, i) => {
        const p = pos[i]!;
        const a = nbr ? (nbr.has(i) ? 1 : 0) : lit(i);
        const r =
          KIND_R[n.kind] *
          (n.kind === "note"
            ? Math.min(1.4, Math.max(1, s * 0.9))
            : Math.min(1.35, Math.max(0.9, s * 0.8)));
        if (a > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 7 + a * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,92,246,${0.35 * a})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = a > 0.5 && n.kind === "note" ? "#6D28D9" : KIND_COLOR[n.kind];
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
