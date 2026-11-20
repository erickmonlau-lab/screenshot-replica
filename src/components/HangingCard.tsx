import { useEffect, useRef, useState } from "react";
import { createLanyard } from "./rope-physics";
import { Flag } from "./Flag";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Badge on a stretchy lanyard. Verlet rope + rigid card: it swings on its own, stretches when you
 * pull it, and keeps swinging after you let go (no dependencies, runs on rAF).
 */
export function HangingCard({
  width = 250,
  seg = 7,
  bottom = 100,
  spread = 220,
  className = "",
}: {
  width?: number;
  seg?: number;
  bottom?: number;
  spread?: number;
  className?: string;
}) {
  const { tr } = useLanguage();
  const SEG = seg; // rope links
  const LINK = 22; // rest length of each link
  const cardH = Math.round(width * 2.2);
  const [areaW, setAreaW] = useState(width + spread);
  useEffect(() => {
    setAreaW(Math.min(width + spread, Math.max(width + 20, window.innerWidth - 40)));
  }, [width, spread]);
  const areaH = SEG * LINK + cardH + bottom;

  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ptr = useRef({ x: 0, y: 0, down: false, gx: 0, gy: 0 });

  useEffect(() => {
    const {
      pts,
      A,
      B,
      step: physicsStep,
    } = createLanyard({ areaW, areaH, seg: SEG, link: LINK, cardH });

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let visible = true;
    const DT = 1000 / 60;

    const step = () => physicsStep(ptr.current);

    const render = () => {
      const path = pathRef.current;
      const card = cardRef.current;
      if (!path || !card) return;
      let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
      for (let i = 1; i <= SEG; i++) {
        const p = pts[i]!;
        const n = pts[i + 1] && i < SEG ? pts[i + 1]! : p;
        const mx = (p.x + n.x) / 2;
        const my = (p.y + n.y) / 2;
        d += i < SEG ? ` Q ${p.x} ${p.y} ${mx} ${my}` : ` L ${p.x} ${p.y}`;
      }
      path.setAttribute("d", d);
      const ang = Math.atan2(-(B.x - A.x), B.y - A.y);
      card.style.transform = `translate(${A.x - width / 2}px, ${A.y}px) rotate(${ang}rad)`;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) {
        last = now;
        return;
      }
      acc += Math.min(100, now - last);
      last = now;
      let n = 0;
      while (acc >= DT && n < 4) {
        step();
        acc -= DT;
        n++;
      }
      render();
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? true;
    });
    if (boxRef.current) io.observe(boxRef.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [areaW, areaH, cardH, width]);

  const local = (e: React.PointerEvent) => {
    const r = boxRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div
      ref={boxRef}
      className={`pointer-events-none relative select-none ${className}`}
      style={{ width: areaW, height: areaH }}
    >
      <svg
        aria-hidden="true"
        width={areaW}
        height={areaH}
        className="pointer-events-none absolute inset-0 overflow-visible"
      >
        <path
          ref={pathRef}
          d={`M ${areaW / 2} 0 L ${areaW / 2} ${SEG * LINK}`}
          fill="none"
          stroke="#09090B"
          strokeWidth={15}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        ref={cardRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const p = local(e);
          const card = cardRef.current!;
          const r = card.getBoundingClientRect();
          const b = boxRef.current!.getBoundingClientRect();
          ptr.current = {
            x: p.x,
            y: p.y,
            down: true,
            gx: p.x - (r.left + r.width / 2 - b.left),
            gy: p.y - (r.top + r.height / 2 - b.top),
          };
        }}
        onPointerMove={(e) => {
          if (!ptr.current.down) return;
          const p = local(e);
          ptr.current.x = p.x;
          ptr.current.y = p.y;
        }}
        onPointerUp={() => {
          ptr.current.down = false;
        }}
        onPointerCancel={() => {
          ptr.current.down = false;
        }}
        className="pointer-events-auto absolute top-0 left-0 cursor-grab touch-none overflow-hidden rounded-[22px] border-2 border-[#09090B] bg-white text-[#09090B] shadow-[7px_7px_0_#6D28D9] active:cursor-grabbing"
        style={{
          width,
          height: cardH,
          transform: `translate(${areaW / 2 - width / 2}px, ${SEG * LINK}px)`,
          transformOrigin: `${width / 2}px 0px`,
          willChange: "transform",
        }}
      >
        <div className="flex justify-center pt-3">
          <span className="block h-3 w-16 rounded-full border-2 border-[#09090B] bg-[#E4E4E7]" />
        </div>
        <div className="mx-4 mt-3 overflow-hidden rounded-2xl border-2 border-[#09090B] bg-[#6D28D9]">
          <img
            src="/erick-portrait-studio.png"
            alt="Erick Rodríguez"
            loading="lazy"
            draggable={false}
            className="w-full object-cover object-top"
            style={{ height: Math.round(width * 0.74) }}
          />
        </div>
        <div className="px-5 pt-4">
          <p className="font-display text-[24px] leading-none font-bold tracking-[-0.04em] whitespace-nowrap">
            Erick Rodríguez
          </p>
          <p className="mt-2 text-[19px] leading-none font-extrabold text-[#6D28D9]">
            {tr("Negocio + IA")}
          </p>
          <p className="mt-1 text-base font-medium text-[#52525B]">La Sagrera, Barcelona</p>
        </div>
        <div className="mt-3 flex flex-col items-start gap-1.5 px-5">
          {["Marketing digital", "Gestión administrativa", "Desarrollo con IA"].map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#09090B] px-3.5 py-1.5 text-[15px] leading-none font-bold whitespace-nowrap text-white"
            >
              {tr(t)}
            </span>
          ))}
        </div>
        <div className="mt-3 px-4">
          <div className="flex gap-1">
            {[
              ["es", "ES"],
              ["ca", "CA"],
              ["en", "EN"],
            ].map(([f, c]) => (
              <span
                key={c}
                className="flex items-center rounded-lg border-2 border-[#09090B] bg-white px-2.5 py-1.5 text-[15px] leading-none font-bold text-[#09090B]"
              >
                <Flag code={f!} />
                <span className="sr-only">{c}</span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-[15px] leading-tight font-semibold text-[#09090B]">
            {tr("Español y Catalán: nativos")}
          </p>
        </div>
      </div>
    </div>
  );
}
