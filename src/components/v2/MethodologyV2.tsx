import { useState } from "react";
import { CheckCircle2, ChevronRight, FileText, BrainCircuit, ArrowDown, Sparkles, Terminal } from "lucide-react";

export function MethodologyV2() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: "01",
      title: "Entender el negocio",
      kicker: "Diagnóstico operativo",
      what: "Analizo la operativa actual de la empresa, los cuellos de botella en la gestión diaria y las herramientas en uso.",
      why: "La mayoría de problemas de software surgen de construir la solución equivocada sin entender cómo opera el negocio real.",
      deliverable: "Brief estratégico de requerimientos, alcance técnico cerrado y modelo de procesos.",
      nextConnection: "Define con exactitud qué flujos y datos deben representarse en la fase de diseño.",
    },
    {
      num: "02",
      title: "Diseñar la solución",
      kicker: "Arquitectura & Prototipado",
      what: "Diseño la arquitectura de la información, flujos de navegación y pantallas interactivas en Figma antes de tocar código.",
      why: "Validar la interfaz y la experiencia con el cliente en diseño ahorra semanas de reprogramación posterior.",
      deliverable: "Prototipo interactivo en alta fidelidad y guía de estilos con tokens de diseño.",
      nextConnection: "Sirve de especificación visual y funcional directa para la construcción con componentes.",
    },
    {
      num: "03",
      title: "Construir e integrar",
      kicker: "Desarrollo con tipado estricto",
      what: "Desarrollo la solución con React y TypeScript, estructurando componentes limpios, APIs e integraciones.",
      why: "El tipado estricto previene errores silenciosos en producción y garantiza que el software sea fácil de mantener y escalar.",
      deliverable: "Aplicación compilada sin errores, modular, documentada y lista para conectar.",
      nextConnection: "Se enlaza con la infraestructura de servidores y CDN para su despliegue continuo.",
    },
    {
      num: "04",
      title: "Desplegar y validar",
      kicker: "Producción & Rendimiento",
      what: "Configuro el despliegue en producción con certificado SSL, CDN perimetral (Edge) y auditoría de Core Web Vitals.",
      why: "Un software solo aporta valor cuando está disponible, carga de inmediato y es seguro para usuarios y clientes.",
      deliverable: "Plataforma en dominio propio, tiempos de respuesta rápidos y comprobación multidispositivo.",
      nextConnection: "Habilita el tráfico de usuarios reales y la recogida de datos de uso.",
    },
    {
      num: "05",
      title: "Medir y evolucionar",
      kicker: "Automatización & Crecimiento",
      what: "Configuro flujos de trabajo con n8n y herramientas de automatización para conectar formularios, ERP y notificaciones.",
      why: "El lanzamiento es solo el inicio: los procesos manuales que consumen tiempo deben pasar a ejecutarse en segundo plano.",
      deliverable: "Flujos de automatización activos, monitorización de incidencias y plan de iteraciones.",
      nextConnection: "Cierra el ciclo alimentando nuevas oportunidades de optimización operativa.",
    },
  ];

  return (
    <section id="como-trabajo" className="bg-[#F6F5F0] py-16 sm:py-20 lg:py-24 border-b border-[#D4D4D0]">
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4D4D0] pb-6 mb-12">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              03 · Metodología de Ejecución
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111] mt-1">
              Cómo trabajo.
            </h2>
          </div>
          <p className="max-w-[44ch] text-sm sm:text-base font-medium text-[#57575C]">
            Cinco fases estructuradas para transformar una necesidad comercial en un producto digital operativo.
          </p>
        </div>

        {/* 5-Phase Horizontal / Grid Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-8">
          {steps.map((st, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                  isCurrent
                    ? "border-[#111111] bg-white shadow-[4px_4px_0_#1D4ED8]"
                    : "border-[#D4D4D0] bg-[#EFEFE9] hover:bg-white hover:border-[#111111]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold text-[#1D4ED8]">{st.num}</span>
                  {isCurrent && <span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />}
                </div>
                <span className="font-display text-sm font-bold text-[#111111] mt-2">
                  {st.title}
                </span>
                <span className="text-[11px] text-[#57575C] mt-0.5">{st.kicker}</span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="rounded-2xl border-2 border-[#111111] bg-white p-6 sm:p-8 lg:p-10 shadow-[6px_6px_0_#111111]">
          <div className="flex items-center gap-3 border-b border-[#D4D4D0] pb-4 mb-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#111111] bg-[#1D4ED8] font-mono text-sm font-black text-white shadow-[2px_2px_0_#111111]">
              {steps[activeStep]?.num}
            </span>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#57575C]">
                Fase {steps[activeStep]?.num} · {steps[activeStep]?.kicker}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-[#111111]">
                {steps[activeStep]?.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="rounded-xl border border-[#D4D4D0] bg-[#F6F5F0] p-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111] block mb-1">
                  ¿Qué hago en esta fase?
                </span>
                <p className="text-sm sm:text-base text-[#111111] font-medium leading-relaxed">
                  {steps[activeStep]?.what}
                </p>
              </div>

              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#57575C] block mb-1">
                  ¿Por qué es imprescindible?
                </span>
                <p className="text-sm text-[#57575C] leading-relaxed">
                  {steps[activeStep]?.why}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border-2 border-[#10B981] bg-[#072418]/5 p-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Entregable tangible de la fase
                </span>
                <p className="text-sm sm:text-base font-bold text-[#111111] leading-relaxed">
                  {steps[activeStep]?.deliverable}
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-[#D4D4D0] p-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#57575C] block mb-1">
                  Conexión con la siguiente fase
                </span>
                <p className="text-xs sm:text-sm text-[#57575C] leading-relaxed">
                  {steps[activeStep]?.nextConnection}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge System & Operational Memory (Obsidian + IA) */}
        <div className="mt-10 rounded-2xl border-2 border-[#111111] bg-[#0E0E11] p-6 sm:p-8 lg:p-10 text-white shadow-[6px_6px_0_#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit size={16} className="text-[#3B82F6]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                  Memoria Operativa & Sistema de Documentación
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
                Cómo mantengo la continuidad técnica entre sesiones.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-[55ch]">
                Mi flujo de desarrollo se apoya en un repositorio estructurado en Markdown (Obsidian). Cada proyecto cuenta con un registro vivo de arquitectura, decisiones de diseño y reglas de negocio que los agentes de IA leen antes de proponer o modificar código.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
                  <span className="font-mono text-[11px] font-bold text-white block">
                    01 · Documentación
                  </span>
                  <span className="text-xs text-zinc-400 mt-1 block">
                    Decisiones y contratos de datos por escrito.
                  </span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
                  <span className="font-mono text-[11px] font-bold text-white block">
                    02 · Reglas de Código
                  </span>
                  <span className="text-xs text-zinc-400 mt-1 block">
                    Estándares tipados aplicados de forma consistente.
                  </span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
                  <span className="font-mono text-[11px] font-bold text-white block">
                    03 · Menos Fricción
                  </span>
                  <span className="text-xs text-zinc-400 mt-1 block">
                    La IA arranca con el contexto técnico del proyecto.
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Technical Panel */}
            <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <Terminal size={13} className="text-blue-400" />
                  obsidian://vault/proyectos/oderalo
                </span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] text-blue-300">
                  Markdown Link
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <p className="text-purple-400"># Arquitectura y Reglas de Negocio</p>
                <p className="text-zinc-400">
                  <span className="text-emerald-400">- Estado:</span> Flujo de avisos sincronizado en cliente.
                </p>
                <p className="text-zinc-400">
                  <span className="text-emerald-400">- Regla de Facturación:</span> El parte firmado genera automáticamente factura sin repicar campos.
                </p>
                <p className="text-zinc-400">
                  <span className="text-emerald-400">- Stack:</span> React 19 + TypeScript estricto.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex items-center justify-between">
                <span>Contexto cargado para agentes IA</span>
                <span className="text-emerald-400">● Listo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
