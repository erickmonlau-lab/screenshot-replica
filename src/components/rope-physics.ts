export interface Pt {
  x: number;
  y: number;
  px: number;
  py: number;
  w: number; // inverse mass
  fixed?: boolean;
}

export interface Pointer {
  x: number;
  y: number;
  down: boolean;
  gx: number;
  gy: number;
}

type Link = [Pt, Pt, number, number];

/** Verlet rope with a rigid card (points A top / B bottom) at its end. */
export function createLanyard(opts: {
  areaW: number;
  areaH: number;
  seg: number;
  link: number;
  cardH: number;
  kick?: number;
}) {
  const { areaW, areaH, seg, link, cardH, kick = 70 } = opts;
  const ax = areaW / 2;
  const pts: Pt[] = [{ x: ax, y: 0, px: ax, py: 0, w: 0, fixed: true }];
  for (let i = 1; i <= seg; i++) pts.push({ x: ax, y: i * link, px: ax, py: i * link, w: 1 });
  const A = pts[seg]!;
  A.w = 0.45;
  const B: Pt = { x: ax + kick, y: A.y + cardH, px: ax + kick, py: A.y + cardH, w: 0.45 };
  pts.push(B);

  const links: Link[] = [];
  for (let i = 0; i < seg; i++) links.push([pts[i]!, pts[i + 1]!, link, 0.85]);
  links.push([A, B, cardH, 1]);

  const solve = ([p, q, len, k]: Link) => {
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const d = Math.hypot(dx, dy) || 0.0001;
    const diff = ((d - len) / d) * k;
    const ws = p.w + q.w;
    if (ws === 0) return;
    if (!p.fixed) {
      p.x += (dx * diff * p.w) / ws;
      p.y += (dy * diff * p.w) / ws;
    }
    if (!q.fixed) {
      q.x -= (dx * diff * q.w) / ws;
      q.y -= (dy * diff * q.w) / ws;
    }
  };

  function step(ptr: Pointer) {
    for (const p of pts) {
      if (p.fixed) continue;
      const vx = (p.x - p.px) * 0.992;
      const vy = (p.y - p.py) * 0.992;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + 0.85;
    }
    if (ptr.down) {
      const cx = (A.x + B.x) / 2;
      const cy = (A.y + B.y) / 2;
      const dx = (ptr.x - ptr.gx - cx) * 0.45;
      const dy = (ptr.y - ptr.gy - cy) * 0.45;
      A.x += dx;
      A.y += dy;
      B.x += dx;
      B.y += dy;
    }
    for (let it = 0; it < 7; it++) for (const l of links) solve(l);
    for (const p of pts) {
      if (p.fixed) continue;
      p.x = Math.min(areaW - 6, Math.max(6, p.x));
      p.y = Math.min(areaH - 6, Math.max(0, p.y));
    }
  }

  /** Rope length from anchor to card top, following the chain. */
  const ropeLength = () => {
    let L = 0;
    for (let i = 0; i < seg; i++) L += Math.hypot(pts[i + 1]!.x - pts[i]!.x, pts[i + 1]!.y - pts[i]!.y);
    return L;
  };

  return { pts, A, B, step, ropeLength, restRope: seg * link };
}
