import { useEffect, useRef, useState } from "react";
import { Bot, Check, Code2, Layers, Rocket, Search } from "lucide-react";
import { ProcessScenes } from "./ProcessScenes";

const STEP_ICONS = [Search, Layers, Code2, Rocket, Bot];

const steps = [
  {
    n: "01",
    label: "Diagnóstico",
    titlePrefix: "Primero encuentro lo que te",
    titleSuffix: "hace perder tiempo.",
    text: "Analizo tus procesos actuales para detectar fugas de tiempo y pedidos que se pierden por falta de sincronización.",
    done: "Fugas de tiempo detectadas",
  },
  {
    n: "02",
    label: "Arquitectura",
    titlePrefix: "Dibujo el sistema",
    titleSuffix: "antes de programar.",
    text: "Estructura de la base de datos, flujos de clientes y cómo se comunican la web, el ERP y tus herramientas.",
    done: "Sistema ordenado desde el diseño",
  },
  {
    n: "03",
    label: "Desarrollo",
    titlePrefix: "Lo construyo pieza a pieza,",
    titleSuffix: "con código tipado.",
    text: "React y TypeScript, APIs seguras e integraciones con tus herramientas, pieza a pieza.",
    done: "Código tipado y mantenible",
  },
  {
    n: "04",
    label: "Producción",
    titlePrefix: "Lo publico rápido",
    titleSuffix: "y lo dejo vigilado.",
    text: "Despliegue en la nube con el rendimiento y los Core Web Vitals cuidados.",
    done: "En producción y vigilado",
  },
  {
    n: "05",
    label: "Automatización",
    titlePrefix: "Y lo dejo",
    titleSuffix: "trabajando solo.",
    text: "n8n y modelos de IA gestionan avisos, facturas y atención sin tareas manuales.",
    done: "Tareas repetitivas automatizadas",
  },
];

/** Sección fijada que avanza con el scroll: tarjeta del paso, escena y selector de pasos. */
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

  const scrollToStep = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    if (total > 0) {
      const targetScrollTop = window.scrollY + r.top + (index / (steps.length - 1)) * total + 10;
      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
    setActive(index);
  };

  return (
    <section
      id="proceso"
      className="scroll-mt-[62px] border-t-[3px] border-[#09090B] bg-[#09090B] text-white"
    >
      <div ref={ref} className="relative h-[340vh]">
        <div className="sticky top-0 flex h-screen min-h-[640px] items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1380px] px-5 pt-20 pb-4 sm:px-8">
            {/* Título fijo de la sección */}
            <div className="hidden items-end justify-between gap-8 sm:flex">
              <p
                aria-hidden="true"
                className="font-display text-[clamp(2.8rem,5.4vw,4.6rem)] leading-[0.85] font-bold tracking-[-0.03em] text-transparent uppercase [-webkit-text-stroke:3px_#FFFFFF]"
              >
                Proceso
              </p>
              <h2 className="font-display max-w-[24ch] text-right text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.5] font-bold tracking-[-0.03em]">
                Cinco pasos, de la auditoría a un negocio que{" "}
                <span className="rounded-md bg-[#6D28D9] px-2 py-1 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                  funciona solo.
                </span>
              </h2>
            </div>

            <div className="grid items-stretch gap-5 sm:mt-5 lg:grid-cols-12 lg:gap-6">
              {/* Tarjeta del paso */}
              <div className="relative lg:col-span-4">
                <div className="relative h-full min-h-[13.5rem] sm:min-h-[22rem]">
                  {steps.map((s, i) => {
                    const Icon = STEP_ICONS[i]!;
                    return (
                      <div
                        key={s.n}
                        aria-hidden={i !== active}
                        style={{
                          opacity: i === active ? 1 : 0,
                          transform: `translateY(${i === active ? 0 : i < active ? -28 : 28}px)`,
                          pointerEvents: i === active ? "auto" : "none",
                          transition:
                            "opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                        className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[8px_8px_0_#6D28D9]"
                      >
                        <div className="flex items-center gap-3 border-b-[3px] border-[#09090B] bg-[#6D28D9] px-4 py-3 text-white">
                          <span className="font-display text-[clamp(2.6rem,4vw,3.6rem)] leading-none font-bold tracking-[-0.04em]">
                            {s.n}
                          </span>
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border-[3px] border-[#09090B] bg-white text-[#09090B]">
                            <Icon size={22} strokeWidth={2.6} />
                          </span>
                          <span className="font-display text-[22px] leading-none font-bold tracking-[-0.03em] uppercase">
                            {s.label}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center gap-3 p-5">
                          <h3 className="font-display text-[clamp(1.9rem,2.8vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.04em]">
                            {s.titlePrefix} <span className="text-[#6D28D9]">{s.titleSuffix}</span>
                          </h3>
                          <p className="hidden text-[18px] leading-snug font-medium text-[#3F3F46] sm:block">
                            {s.text}
                          </p>
                          <span className="hidden w-fit items-center gap-2 rounded-xl border-[3px] border-[#09090B] bg-[#F4F4F5] px-3 py-1.5 text-[15px] font-bold sm:inline-flex">
                            <Check size={16} strokeWidth={3.5} className="text-[#6D28D9]" />
                            {s.done}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Escena */}
              <div className="lg:col-span-8">
                <ProcessScenes active={active} />
              </div>
            </div>

            {/* Selector de pasos */}
            <div className="mt-6">
              <ol className="grid grid-cols-5 gap-2 sm:gap-3">
                {steps.map((st, i) => {
                  const done = i < active;
                  const now = i === active;
                  const Icon = STEP_ICONS[i]!;
                  return (
                    <li key={st.n} aria-current={now ? "step" : undefined}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(i)}
                        aria-label={`Ver paso ${st.n}: ${st.label}`}
                        className={`flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-[3px] px-1.5 py-2.5 transition-all duration-300 sm:flex-row sm:justify-center sm:gap-3 sm:px-4 sm:py-3 ${
                          now
                            ? "-translate-y-1 border-white bg-[#6D28D9] text-white shadow-[5px_5px_0_#A78BFA]"
                            : done
                              ? "border-white bg-white text-[#09090B] hover:-translate-y-0.5"
                              : "border-[#52525B] bg-[#18181B] text-[#A1A1AA] hover:border-white hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-[3px] ${
                            now
                              ? "border-white bg-white text-[#6D28D9]"
                              : done
                                ? "border-[#09090B] bg-[#09090B] text-white"
                                : "border-[#52525B]"
                          }`}
                        >
                          {done ? (
                            <Check size={20} strokeWidth={3.5} />
                          ) : (
                            <Icon size={20} strokeWidth={2.6} />
                          )}
                        </span>
                        <span className="text-left leading-tight">
                          <span className="hidden text-[15px] font-bold opacity-80 sm:block">
                            Paso {st.n}
                          </span>
                          <span className="font-display hidden text-[18px] font-bold tracking-[-0.02em] sm:block">
                            {st.label}
                          </span>
                          <span className="font-display text-[16px] font-bold sm:hidden">
                            {st.n}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div
                aria-hidden="true"
                className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#27272A]"
              >
                <div
                  className="h-full rounded-full bg-[#6D28D9] transition-[width] duration-300"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
