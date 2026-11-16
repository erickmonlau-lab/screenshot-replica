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


const BAND_W = [200, 164, 128, 94, 62, 38];
const BAND_H = 62;

/** Stepped funnel: each band draws itself as its step is reached, then fills. */
function Funnel({ progress }: { progress: number }) {
  const cx = 110;
  const bands = steps.map((s, i) => {
    const y = 10 + i * BAND_H;
    const wt = BAND_W[i]! / 2;
    const wb = BAND_W[i + 1]! / 2;
    const d = `M ${cx - wt} ${y} L ${cx + wt} ${y} L ${cx + wb} ${y + BAND_H} L ${cx - wb} ${y + BAND_H} Z`;
    const draw = Math.min(1, Math.max(0, progress * steps.length - i));
    return { s, i, y, d, draw };
  });
  const spoutY = 10 + steps.length * BAND_H;
  const dropOn = progress > 0.97;

  return (
    <div aria-hidden="true" className="hidden items-center justify-center lg:col-span-3 lg:flex">
      <svg viewBox="0 0 220 420" className="h-auto w-full max-w-[230px] overflow-visible">
        {bands.map(({ s, i, y, d, draw }) => (
          <g key={s.n}>
            <path d={d} fill="#0B0D14" stroke="#262a38" strokeWidth={2} strokeLinejoin="round" />
            <path
              d={d}
              fill={draw >= 1 ? "#0F1D3D" : "none"}
              stroke="#3B82F6"
              strokeWidth={3.5}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
              style={{
                filter: draw > 0 ? "drop-shadow(0 0 5px #3B82F6) drop-shadow(0 0 14px #0044FF)" : "none",
                transition: "fill 300ms",
              }}
            />
            <text
              x={cx}
              y={y + BAND_H / 2 + 6}
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill={draw >= 1 ? "#FFFFFF" : "#52525B"}
              style={{ transition: "fill 300ms" }}
            >
              {s.n}
            </text>
          </g>
        ))}
        <path
          d={`M ${cx - 19} ${spoutY} L ${cx - 19} ${spoutY + 46} M ${cx + 19} ${spoutY} L ${cx + 19} ${spoutY + 46}`}
          stroke={dropOn ? "#3B82F6" : "#262a38"}
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
          style={{ filter: dropOn ? "drop-shadow(0 0 6px #3B82F6)" : "none", transition: "stroke 300ms" }}
        />
        <circle
          cx={cx}
          cy={spoutY + 78}
          r={dropOn ? 13 : 5}
          fill={dropOn ? "#3B82F6" : "#262a38"}
          style={{
            filter: dropOn ? "drop-shadow(0 0 10px #3B82F6) drop-shadow(0 0 22px #0044FF)" : "none",
            transition: "all 400ms",
          }}
        />
      </svg>
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

            <Funnel progress={progress} />

            <div className="lg:col-span-4">
              <div className="relative pl-9">
                <span aria-hidden="true" className="absolute top-3 bottom-3 left-[13px] w-px bg-white/15" />
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-[12px] w-[3px] rounded-full bg-[#3B82F6]"
                  style={{
                    height: `calc((100% - 24px) * ${progress})`,
                    boxShadow: "0 0 12px #3B82F6, 0 0 26px #0044FF",
                  }}
                />
                <ol className="space-y-2 sm:space-y-3">
                  {steps.map((s, i) => {
                    const done = i < active;
                    const now = i === active;
                    return (
                      <li
                        key={s.n}
                        className={`relative flex items-center gap-4 rounded-2xl border px-5 py-3 transition-all sm:py-4 duration-300 ${
                          now
                            ? "border-[#3B82F6] bg-[#151a2c] shadow-[0_0_28px_-6px_#3B82F6]"
                            : "border-white/10 bg-[#101219]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute top-1/2 -left-[31px] h-3 w-3 -translate-y-1/2 rounded-full border-2 transition-colors duration-300 ${
                            done || now
                              ? "border-[#3B82F6] bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]"
                              : "border-zinc-600 bg-[#09090B]"
                          }`}
                        />
                        <span className="font-mono text-base font-bold text-[#3B82F6] tabular-nums">
                          {s.n}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`font-display block text-lg font-semibold tracking-[-0.02em] sm:text-xl ${
                              now ? "text-white" : "text-zinc-300"
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="hidden text-[15px] font-medium text-zinc-500 sm:block sm:text-base">
                            {s.done}
                          </span>
                        </span>
                        {done ? (
                          <Check size={16} strokeWidth={3} className="ml-auto shrink-0 text-[#10B981]" />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
