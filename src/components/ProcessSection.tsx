import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ProcessStage } from "./MethodVisuals";

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
                      transition:
                        "opacity 550ms cubic-bezier(0.22,1,0.36,1), transform 550ms cubic-bezier(0.22,1,0.36,1)",
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
              <ProcessStage active={active} />
              <ol className="mt-5 grid grid-cols-5 gap-2">
                {steps.map((st, i) => {
                  const done = i < active;
                  const now = i === active;
                  return (
                    <li
                      key={st.n}
                      className={`flex items-center justify-center gap-1.5 rounded-full border-2 px-2 py-2 text-base font-semibold transition-all duration-300 ${
                        now
                          ? "border-[#3B82F6] bg-[#0F1D3D] text-white shadow-[0_0_24px_-6px_#3B82F6]"
                          : done
                            ? "border-white/25 bg-[#101219] text-zinc-200"
                            : "border-white/10 bg-[#0B0D14] text-zinc-500"
                      }`}
                    >
                      {done ? <Check size={16} strokeWidth={3} className="text-[#10B981]" /> : null}
                      <span className="hidden sm:inline">{st.label}</span>
                      <span className="sm:hidden">{st.n}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
