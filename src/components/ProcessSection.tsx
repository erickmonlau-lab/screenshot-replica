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
              <div className="relative mt-7 px-[26px]">
                <div
                  aria-hidden="true"
                  className="absolute top-[26px] right-[26px] left-[26px] h-[6px] -translate-y-1/2 rounded-full bg-white/15"
                >
                  <div
                    className="h-full rounded-full bg-[#0044FF] transition-[width] duration-300"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(1, (progress * steps.length - 0.5) / (steps.length - 1)),
                      ) * 100}%`,
                    }}
                  />
                </div>
                <ol className="relative flex justify-between">
                  {steps.map((st, i) => {
                    const done = i < active;
                    const now = i === active;
                    return (
                      <li
                        key={st.n}
                        aria-current={now ? "step" : undefined}
                        className="-mx-[26px] flex w-[104px] flex-col items-center gap-2"
                      >
                        <span
                          className={`font-display flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] text-[20px] font-bold transition-all duration-300 ${
                            now
                              ? "scale-110 border-[#09090B] bg-white text-[#09090B] shadow-[5px_5px_0_#0044FF]"
                              : done
                                ? "border-[#09090B] bg-[#0044FF] text-white"
                                : "border-white/30 bg-[#09090B] text-zinc-400"
                          }`}
                        >
                          {done ? <Check size={22} strokeWidth={3.5} /> : st.n}
                        </span>
                        <span
                          className={`hidden text-[17px] font-semibold transition-colors duration-300 sm:block ${
                            now ? "text-white" : done ? "text-zinc-300" : "text-zinc-500"
                          }`}
                        >
                          {st.label}
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
