import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ProcessStage } from "./MethodVisuals";

const steps = [
  {
    n: "01",
    label: "Diagnóstico",
    titlePrefix: "Diagnóstico.",
    titleSuffix: "Auditoría técnica y operativa.",
    text: "Analizo tus procesos actuales para detectar fugas de tiempo y pedidos que se pierden por falta de sincronización.",
    done: "Cuellos de botella resueltos",
  },
  {
    n: "02",
    label: "Arquitectura",
    titlePrefix: "Arquitectura.",
    titleSuffix: "El mapa completo del sistema.",
    text: "Estructura de la base de datos, flujos de clientes y cómo se comunican la web, el ERP y tus herramientas.",
    done: "Sistema escalable sin parches",
  },
  {
    n: "03",
    label: "Desarrollo",
    titlePrefix: "Desarrollo.",
    titleSuffix: "Código tipado y robusto.",
    text: "React y TypeScript, APIs seguras y backend probado en producción sin librerías innecesarias.",
    done: "0 errores y rendimiento nativo",
  },
  {
    n: "04",
    label: "Producción",
    titlePrefix: "Producción.",
    titleSuffix: "Despliegue a máxima velocidad.",
    text: "Infraestructura cloud, edge caching y Core Web Vitals en verde para cargar en milisegundos.",
    done: "Carga en < 0.8s y 100% operativo",
  },
  {
    n: "05",
    label: "Automatización",
    titlePrefix: "Automatización.",
    titleSuffix: "Flujos autónomos con IA.",
    text: "n8n y modelos de IA gestionan avisos, facturas y atención sin tareas manuales.",
    done: "Ahorro de +15 h semanales",
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
    <section id="proceso" className="scroll-mt-[62px] border-t-[3px] border-[#09090B] bg-[#E3E5E9] text-[#09090B]">
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
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display block text-[clamp(4.5rem,12vw,8.5rem)] leading-[0.9] font-black tracking-[-0.04em] text-transparent [-webkit-text-stroke:2.5px_#09090B]">
                        {s.n}
                      </span>
                      <span className="rounded-full border-2 border-[#09090B] bg-[#6D28D9] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#09090B]">
                        {s.label}
                      </span>
                    </div>
                    <h2 className="font-display mt-3 max-w-[15ch] text-[clamp(2.1rem,4.8vw,4.2rem)] leading-[1.04] font-black tracking-[-0.04em] text-[#09090B]">
                      {s.titlePrefix}{" "}
                      <span className="block text-[#6D28D9]">{s.titleSuffix}</span>
                    </h2>
                    <p className="mt-4 max-w-[42ch] text-lg leading-relaxed font-medium text-[#52525B] sm:text-xl">
                      {s.text}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-xl border-2 border-[#09090B] bg-white px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#09090B] shadow-[3px_3px_0_#6D28D9]">
                        <Check size={16} strokeWidth={3} className="text-[#6D28D9]" />
                        {s.done}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProcessStage active={active} />
              <div className="relative mt-7 px-[26px]">
                <div
                  aria-hidden="true"
                  className="absolute top-[26px] right-[26px] left-[26px] h-[6px] -translate-y-1/2 rounded-full bg-[#CBD5E1]"
                >
                  <div
                    className="h-full rounded-full bg-[#6D28D9] transition-[width] duration-300"
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
                        <button
                          type="button"
                          onClick={() => scrollToStep(i)}
                          aria-label={`Ver paso ${st.n}: ${st.label}`}
                          className={`font-display flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-[3px] text-[20px] font-black transition-all duration-300 hover:scale-105 ${
                            now
                              ? "scale-110 border-[#09090B] bg-[#6D28D9] text-white shadow-[4px_4px_0_#09090B]"
                              : done
                                ? "border-[#09090B] bg-[#09090B] text-white"
                                : "border-zinc-400 bg-white text-zinc-600 hover:border-[#09090B]"
                          }`}
                        >
                          {done ? <Check size={22} strokeWidth={3.5} /> : st.n}
                        </button>
                        <span
                          className={`hidden text-[16px] font-bold transition-colors duration-300 sm:block ${
                            now ? "text-[#09090B]" : done ? "text-zinc-700" : "text-zinc-500"
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
