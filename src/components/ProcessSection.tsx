import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ProcessScenes } from "./ProcessScenes";

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
        <div className="sticky top-0 flex h-screen min-h-[620px] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1380px] items-center gap-10 px-5 pt-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="hidden items-center gap-2.5 rounded-full border-[3px] border-white bg-white px-4 py-1.5 text-[15px] font-bold tracking-[0.1em] text-[#09090B] uppercase sm:inline-flex">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6D28D9]" />
                Cómo trabajo · 5 pasos
              </p>
              <div className="relative mt-0 min-h-[15rem] sm:mt-5 sm:min-h-[26rem]">
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
                    className="absolute inset-0 flex flex-col justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display block text-[clamp(4rem,9vw,7rem)] leading-[0.9] font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:3px_#FFFFFF]">
                        {s.n}
                      </span>
                      <span className="rounded-full border-[3px] border-white bg-[#6D28D9] px-4 py-1 text-[15px] font-bold tracking-wider text-white uppercase">
                        {s.label}
                      </span>
                    </div>
                    <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,3.9vw,3.4rem)] leading-[1.06] font-bold tracking-[-0.04em] text-white">
                      {s.titlePrefix}
                      <span className="mt-2 block">
                        <span className="rounded-lg bg-[#6D28D9] px-3 py-0.5 leading-[1.3] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                          {s.titleSuffix}
                        </span>
                      </span>
                    </h2>
                    <p className="mt-5 max-w-[44ch] text-lg leading-relaxed font-medium text-[#D4D4D8] sm:text-xl">
                      {s.text}
                    </p>
                    <div className="mt-5 hidden items-center gap-2 sm:flex">
                      <span className="inline-flex items-center gap-2 rounded-xl border-[3px] border-white bg-white px-3.5 py-1.5 text-[15px] font-bold text-[#09090B] shadow-[4px_4px_0_#6D28D9]">
                        <Check size={16} strokeWidth={3} className="text-[#6D28D9]" />
                        {s.done}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProcessScenes active={active} />
              <div className="relative mt-7 px-[26px]">
                <div
                  aria-hidden="true"
                  className="absolute top-[26px] right-[26px] left-[26px] h-[6px] -translate-y-1/2 rounded-full bg-[#3F3F46]"
                >
                  <div
                    className="h-full rounded-full bg-[#6D28D9] transition-[width] duration-300"
                    style={{
                      width: `${
                        Math.max(
                          0,
                          Math.min(1, (progress * steps.length - 0.5) / (steps.length - 1)),
                        ) * 100
                      }%`,
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
                        <button
                          type="button"
                          onClick={() => scrollToStep(i)}
                          aria-label={`Ver paso ${st.n}: ${st.label}`}
                          className={`font-display flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-[3px] text-[20px] font-black transition-all duration-300 hover:scale-105 ${
                            now
                              ? "scale-110 border-white bg-[#6D28D9] text-white shadow-[4px_4px_0_#A78BFA]"
                              : done
                                ? "border-white bg-white text-[#09090B]"
                                : "border-[#52525B] bg-[#09090B] text-[#A1A1AA] hover:border-white"
                          }`}
                        >
                          {done ? <Check size={22} strokeWidth={3.5} /> : st.n}
                        </button>
                        <span
                          className={`hidden text-[16px] font-bold transition-colors duration-300 sm:block ${
                            now ? "text-white" : done ? "text-[#D4D4D8]" : "text-[#A1A1AA]"
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
