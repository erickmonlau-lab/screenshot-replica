import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const steps = [
  {
    n: "01",
    label: "Escuchar",
    title: "Escucho qué necesita tu negocio.",
    text: "Objetivos, clientes y el proceso que más tiempo te quita.",
    done: "Brief claro",
  },
  {
    n: "02",
    label: "Diseñar",
    title: "Diseño la solución completa.",
    text: "Estructura de la web, flujos y datos, antes de escribir una línea de código.",
    done: "Diseño aprobado",
  },
  {
    n: "03",
    label: "Construir",
    title: "Construyo con código tipado.",
    text: "React y TypeScript, APIs, base de datos e integraciones con tus herramientas.",
    done: "Producto construido",
  },
  {
    n: "04",
    label: "Publicar",
    title: "Lo llevo a producción.",
    text: "Despliegue, rendimiento y Core Web Vitals cuidados.",
    done: "En producción",
  },
  {
    n: "05",
    label: "Crecer",
    title: "Lo hago crecer y automatizo.",
    text: "SEO técnico para que te encuentren y n8n con IA para que se gestione solo.",
    done: "Posicionando y automatizado",
  },
];


const ROW_H = 84;
const GAP = 12;
const PITCH = ROW_H + GAP;
const FW = 300; // funnel svg width
const TOPW = [284, 236, 188, 140, 92, 52];

/** Funnel and step rows as ONE composition: each band lines up with its row and is wired to it. */
function FunnelFlow({ progress, active }: { progress: number; active: number }) {
  const cx = FW / 2 - 14;
  const H = steps.length * PITCH + 120;
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${FW + 40} ${H}`}
        width={FW + 40}
        height={H}
        className="absolute top-0 left-0 hidden overflow-visible lg:block"
      >
        <defs>
          <linearGradient id="bandOn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1A56FF" />
            <stop offset="1" stopColor="#0033CC" />
          </linearGradient>
        </defs>
        {steps.map((s, i) => {
          const y = i * PITCH;
          const wt = TOPW[i]! / 2;
          const wb = (TOPW[i]! - ((TOPW[i]! - TOPW[i + 1]!) * ROW_H) / PITCH) / 2;
          const d = `M ${cx - wt} ${y} L ${cx + wt} ${y} L ${cx + wb} ${y + ROW_H} L ${cx - wb} ${y + ROW_H} Z`;
          const draw = Math.min(1, Math.max(0, progress * steps.length - i));
          const done = i < active;
          const now = i === active;
          const midX = cx + (wt + wb) / 2;
          return (
            <g key={s.n}>
              <path d={d} fill="#0B0D14" stroke="#262a38" strokeWidth={2} strokeLinejoin="round" />
              <path
                d={d}
                fill={now ? "url(#bandOn)" : done ? "#0F1D3D" : "none"}
                stroke="#3B82F6"
                strokeWidth={4}
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
                style={{
                  filter: draw > 0 ? "drop-shadow(0 0 6px #3B82F6) drop-shadow(0 0 18px #0044FF)" : "none",
                  transition: "fill 300ms",
                }}
              />
              <text
                x={cx}
                y={y + ROW_H / 2 + 7}
                textAnchor="middle"
                fontSize="21"
                fontWeight="800"
                fill={done || now ? "#FFFFFF" : "#52525B"}
              >
                {s.n}
              </text>
              {/* wire from band to its row */}
              <path
                d={`M ${midX} ${y + ROW_H / 2} H ${FW + 40}`}
                stroke={done || now ? "#3B82F6" : "#262a38"}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={now ? "8 8" : undefined}
                style={{ filter: done || now ? "drop-shadow(0 0 6px #3B82F6)" : "none", transition: "stroke 300ms" }}
              >
                {now ? <animate attributeName="stroke-dashoffset" from="32" to="0" dur="0.9s" repeatCount="indefinite" /> : null}
              </path>
            </g>
          );
        })}
        {/* spout + drop */}
        <path
          d={`M ${cx - 24} ${steps.length * PITCH - 4} V ${steps.length * PITCH + 50} M ${cx + 24} ${steps.length * PITCH - 4} V ${steps.length * PITCH + 50}`}
          stroke={progress > 0.97 ? "#3B82F6" : "#262a38"}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          style={{ filter: progress > 0.97 ? "drop-shadow(0 0 8px #3B82F6)" : "none" }}
        />
        <circle
          cx={cx}
          cy={steps.length * PITCH + 84}
          r={progress > 0.97 ? 17 : 6}
          fill={progress > 0.97 ? "#3B82F6" : "#262a38"}
          style={{ filter: progress > 0.97 ? "drop-shadow(0 0 12px #3B82F6) drop-shadow(0 0 28px #0044FF)" : "none", transition: "all 400ms" }}
        >
          {progress > 0.97 ? <animate attributeName="r" values="15;19;15" dur="1.4s" repeatCount="indefinite" /> : null}
        </circle>
        {/* falling particles through the funnel */}
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <circle key={k} cx={cx + ((k % 3) - 1) * 28} r={4} fill="#9CC2FF" opacity={progress > 0.02 ? 0.95 : 0}>
            <animate attributeName="cy" from={-10} to={steps.length * PITCH + 60} dur="3.2s" begin={`${k * 0.53}s`} repeatCount="indefinite" />
            <animate attributeName="cx" from={cx + ((k % 3) - 1) * 56} to={cx} dur="3.2s" begin={`${k * 0.53}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <ol className="space-y-2 lg:ml-[340px] lg:space-y-3">
        {steps.map((s, i) => {
          const done = i < active;
          const now = i === active;
          return (
            <li
              key={s.n}
              className={`flex items-center gap-4 rounded-2xl border px-5 py-3 transition-all duration-300 lg:min-h-[84px] lg:py-0 ${
                now
                  ? "border-[#3B82F6] bg-[#151a2c] shadow-[0_0_30px_-6px_#3B82F6]"
                  : "border-white/10 bg-[#101219]"
              }`}
            >
              <span className="font-mono text-base font-bold text-[#3B82F6] tabular-nums">{s.n}</span>
              <span className="min-w-0">
                <span
                  className={`font-display block text-xl font-semibold tracking-[-0.02em] sm:text-2xl ${
                    now ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {s.label}
                </span>
                <span className="hidden text-base font-medium text-zinc-500 sm:block">{s.done}</span>
              </span>
              {done ? <Check size={18} strokeWidth={3} className="ml-auto shrink-0 text-[#10B981]" /> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** "Del aviso al cobro" equivalent: a pinned section that advances as you scroll. */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const v = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      setProgress(v);
      setActive(Math.min(steps.length - 1, Math.floor(v * steps.length * 0.999)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const current = steps[active]!;

  return (
    <section id="proceso" className="section-dark t-line scroll-mt-[62px] border-t">
      <div ref={ref} className="relative h-[340vh]">
        <div className="sticky top-0 flex h-screen min-h-[620px] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1380px] items-center gap-10 px-5 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="mb-4 text-lg font-semibold tracking-[-0.01em] text-[#3B82F6] sm:text-xl">
                Paso {current.n} de 05
              </p>
              <div className="relative min-h-[19rem] sm:min-h-[25rem]">
                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    aria-hidden={i !== active}
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: `translateY(${i === active ? 0 : i < active ? -36 : 36}px)`,
                      transition: "opacity 550ms cubic-bezier(0.22,1,0.36,1), transform 550ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                    className="absolute inset-0"
                  >
                    <span className="hero-outline-light font-display block text-[clamp(5rem,15vw,11rem)] leading-[0.9] font-bold tracking-[-0.04em]">
                      {s.n}
                    </span>
                    <h2 className="t-ink font-display mt-2 max-w-[16ch] text-[clamp(2rem,5.2vw,4.4rem)] leading-[1] font-bold tracking-[-0.045em]">
                      {s.title}
                    </h2>
                    <p className="t-muted mt-4 max-w-[40ch] text-lg leading-snug font-medium sm:text-xl">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <FunnelFlow progress={progress} active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
