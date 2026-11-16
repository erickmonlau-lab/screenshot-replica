import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Escucho qué necesita tu negocio.",
    text: "Objetivos, clientes y el proceso que más tiempo te quita.",
    done: "Brief claro",
  },
  {
    n: "02",
    title: "Diseño la solución completa.",
    text: "Estructura de la web, flujos y datos, antes de escribir una línea de código.",
    done: "Diseño aprobado",
  },
  {
    n: "03",
    title: "Construyo con código tipado.",
    text: "React y TypeScript, APIs, base de datos e integraciones con tus herramientas.",
    done: "Producto construido",
  },
  {
    n: "04",
    title: "Lo llevo a producción.",
    text: "Despliegue, rendimiento y Core Web Vitals cuidados.",
    done: "En producción",
  },
  {
    n: "05",
    title: "Lo hago crecer y automatizo.",
    text: "SEO técnico para que te encuentren y n8n con IA para que se gestione solo.",
    done: "Posicionando y automatizado",
  },
];

/** "Del aviso al cobro" equivalent: a pinned section that advances as you scroll. */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const v = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
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
          <div className="mx-auto grid w-full max-w-[1380px] items-center gap-10 px-5 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#0044FF] uppercase sm:text-[13px]">
                Cómo trabajo · Paso {current.n} de 05
              </p>
              <div className="relative min-h-[17rem] sm:min-h-[21rem]">
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

            <div className="lg:col-span-5">
              <div className="rounded-[22px] border-2 border-white bg-[#111114] p-5 shadow-[6px_6px_0_#0044FF] sm:p-6">
                <div className="mb-4 flex items-center gap-2 border-b border-white/15 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-[13px] font-semibold tracking-[0.12em] text-zinc-300 uppercase">
                    Estado del proyecto
                  </span>
                </div>
                <ol className="space-y-2.5">
                  {steps.map((s, i) => {
                    const done = i < active;
                    const now = i === active;
                    return (
                      <li
                        key={s.n}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors duration-300 ${
                          now ? "bg-[#0044FF] text-white" : "text-zinc-400"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            done
                              ? "bg-[#10B981] text-[#09090B]"
                              : now
                                ? "bg-white text-[#0044FF]"
                                : "border border-zinc-600"
                          }`}
                        >
                          {done ? <Check size={14} strokeWidth={3} /> : s.n}
                        </span>
                        <span className="text-[15px] font-semibold sm:text-base">
                          {done || now ? s.done : `Paso ${s.n}`}
                        </span>
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
