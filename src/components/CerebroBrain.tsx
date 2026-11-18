import { useEffect, useRef } from "react";
import { useReducedMotion } from "./motion-pref";

/*
 * Cerebro ilustrado: silueta lateral con circunvoluciones generadas por código
 * (laberinto de pliegues) y, dentro, el grafo de notas de Obsidian.
 * Una "ola de lectura" recorre los nodos para mostrar cómo la IA lee las notas.
 */

const CEREBRUM_D =
  "M55 170 C33 140 45 96 86 70 C116 40 166 30 200 42 C226 22 276 24 298 48 C336 40 372 68 368 108 C392 128 388 168 362 184 C350 196 330 200 312 198 C296 206 270 208 250 214 C238 238 190 246 155 238 C135 232 120 222 118 210 C104 200 78 192 55 170 Z";
const CEREBELLUM_D = "M246 218 C268 204 314 206 330 226 C338 246 316 262 290 260 C264 256 238 238 246 218 Z";
const STEM_D = "M224 226 C226 242 228 254 232 266 C236 274 250 274 252 264 C252 250 250 236 248 224 Z";
const CEREBELLUM_LINES = "M262 222 C282 214 308 218 322 230 M258 234 C280 228 306 232 320 244 M262 246 C280 244 298 246 312 252";
const SULCI = [
  "M215 44 C224 78 206 108 218 140 C226 160 214 178 224 200",
  "M118 208 C160 188 206 190 252 210",
  "M70 70 L76 74 L82 77 L88 76 L94 73 L100 69 L106 65 L112 63 L118 64 L124 68 L130 72 L136 76 L142 77 L148 75 L154 71 L160 67 L166 64 L172 63 L178 66 L184 70 L190 74 L196 77",
  "M60 104 L66 103 L72 98 L78 92 L84 88 L90 89 L96 94 L102 100 L108 104 L114 103 L120 99 L126 92 L132 88 L138 89 L144 93 L150 99 L156 103 L162 103 L168 99 L174 93 L180 89 L186 89",
  "M52 130 L58 126 L64 121 L70 117 L76 117 L82 121 L88 126 L94 130 L100 131 L106 129 L112 124 L118 120 L124 117 L130 118 L136 122 L142 127 L148 130 L154 131 L160 128 L166 123 L172 119 L178 117 L184 119 L190 123 L196 128",
  "M62 157 L68 160 L74 160 L80 157 L86 152 L92 148 L98 145 L104 144 L110 146 L116 151 L122 155 L128 159 L134 160 L140 158 L146 155 L152 150 L158 146 L164 144 L170 145 L176 148 L182 153 L188 157",
  "M92 184 L98 180 L104 175 L110 172 L116 173 L122 177 L128 182 L134 184 L140 182 L146 178 L152 173 L158 172 L164 175 L170 180 L176 183",
  "M236 65 L242 68 L248 69 L254 66 L260 61 L266 57 L272 55 L278 57 L284 61 L290 66 L296 69 L302 68 L308 65 L314 60 L320 56 L326 55 L332 58 L338 63 L344 67 L350 69",
  "M240 97 L246 94 L252 90 L258 85 L264 82 L270 82 L276 85 L282 89 L288 94 L294 97 L300 98 L306 96 L312 92 L318 87 L324 83 L330 82 L336 83 L342 87 L348 92 L354 96 L360 98",
  "M246 124 L252 125 L258 121 L264 116 L270 112 L276 111 L282 115 L288 120 L294 124 L300 125 L306 122 L312 116 L318 112 L324 111 L330 114 L336 120 L342 124 L348 125 L354 122 L360 117 L366 112 L372 111",
  "M252 150 L258 145 L264 140 L270 138 L276 139 L282 143 L288 148 L294 152 L300 154 L306 152 L312 148 L318 143 L324 139 L330 138 L336 141 L342 145 L348 150 L354 154 L360 154 L366 150 L372 145",
  "M262 173 L268 177 L274 178 L280 176 L286 172 L292 168 L298 166 L304 167 L310 170 L316 174 L322 177 L328 178 L334 175 L340 171 L346 167",
].join(" ");

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

      // cada parte oculta lo que queda tras las que están por delante (sin relleno, no se solapan líneas)
      const hideOf = (front: Path2D[]) => {
        const hide = new Path2D();
        hide.rect(-100, -100, 700, 600);
        for (const f of front) hide.addPath(f);
        return hide;
      };
      const parts: [Path2D, Path2D[]][] = [
        [stemP, [cerebellumP, cerebrumP]],
        [cerebellumP, [cerebrumP]],
        [cerebrumP, []],
      ];
      const strokeParts = (color: string, width: number, dx: number) => {
        for (const [q, front] of parts) {
          c.save();
          if (front.length) c.clip(hideOf(front), "evenodd");
          c.translate(dx, dx);
          c.strokeStyle = color;
          c.lineWidth = width / s;
          c.stroke(q);
          c.restore();
        }
      };

      // sombra dura: el mismo contorno en negro, desplazado

      // pocos surcos marcados: central, Silvio y cuatro pliegues; estrías del cerebelo
      c.save();
      c.clip(cerebrumP);
      c.strokeStyle = "#D2C3FF";
      c.lineWidth = 2.6 / s;
      c.stroke(new Path2D(SULCI));
      c.restore();
      c.strokeStyle = "#D2C3FF";
      c.lineWidth = 3 / s;
      c.stroke(new Path2D(CEREBELLUM_LINES));

      // contorno blanco, encima
      strokeParts("#FFFFFF", 4.5, 0);
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
