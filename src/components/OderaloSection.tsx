import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIOLET = "#6D28D9";
const LIME = "#C6F432";
const INK = "#09090B";

/** Captura real de la plataforma Oderalo (datos de demostración) */
function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className="block h-full w-full object-cover object-top select-none"
    />
  );
}

const flow = [
  { n: "1", t: "Cita", d: "Se agenda y se asigna al técnico con su ruta." },
  { n: "2", t: "Parte", d: "El técnico lo rellena en el sitio y el cliente firma en pantalla." },
  { n: "3", t: "Factura", d: "Sale de los datos del parte, sin volver a escribir nada." },
];

/** ERP Oderalo: caso real. Pantalla grande cruzando el título gigante, sobre el morado de la marca. */
export function OderaloSection() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 65, damping: 16 });
  const sy = useSpring(py, { stiffness: 65, damping: 16 });
  const rotY = useTransform(sx, (v) => -6 + v * 7);
  const rotX = useTransform(sy, (v) => 3 + v * -5);
  const phoneX = useTransform(sx, (v) => v * 14);
  const wordX = useTransform(sx, (v) => v * -14);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="erp"
      onPointerMove={onMove}
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] py-12 text-white sm:py-14 lg:pt-14 lg:pb-[10.5rem]"
      style={{ background: VIOLET }}
    >
      {/* Palabra gigante en contorno: las pantallas la cruzan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[2%] mx-auto flex w-full max-w-[1720px] justify-end px-6 sm:px-10"
      >
        <motion.div
          style={{ x: reduce ? 0 : wordX }}
          className="font-display select-none text-[clamp(4.5rem,19vw,9rem)] lg:text-[clamp(7rem,10.5vw,9.5rem)] leading-none font-black tracking-[-0.05em] whitespace-nowrap text-transparent [-webkit-text-stroke:3px_#C6F432]"
        >
          ODERALO
        </motion.div>
      </div>

      {/* Bloques de color */}
      <div
        aria-hidden="true"
        className="absolute -top-10 right-[8%] h-28 w-28 rotate-12 border-[3px] border-[#09090B]"
        style={{ background: LIME }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-30px] left-[5%] hidden h-24 w-64 -skew-x-12 border-[3px] border-[#09090B] bg-[#09090B] lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-12 min-[1700px]:gap-24">
          {/* Texto */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            <span
              className="inline-flex items-center rounded-lg border-[3px] border-[#09090B] px-3.5 py-1.5 text-[15px] font-black tracking-wider text-[#09090B] uppercase shadow-[4px_4px_0_#09090B]"
              style={{ background: LIME }}
            >
              Caso real · en producción
            </span>

            <h2 className="font-display mt-7 text-[clamp(2.4rem,4vw,3.7rem)] leading-[1] font-black tracking-[-0.045em] text-white">
              Del aviso a la factura,{" "}
              <span className="text-[#C6F432]">sin papeles.</span>
            </h2>

            <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed font-medium text-white">
              <strong>Oderalo</strong> es el ERP que desarrollé a medida para empresas de servicios
              en campo: citas, rutas, parte firmado y facturación en un único flujo.
            </p>

            <ol className="mt-8 grid gap-3.5">
              {flow.map((f) => (
                <li
                  key={f.n}
                  className="flex items-center gap-3 rounded-xl border-[3px] border-[#09090B] bg-white p-2 shadow-[4px_4px_0_#09090B]"
                >
                  <span
                    className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-[3px] border-[#09090B] text-[22px] font-black text-[#09090B]"
                    style={{ background: LIME }}
                  >
                    {f.n}
                  </span>
                  <p className="text-[15px] leading-snug font-semibold text-[#52525B]">
                    <span className="font-display block text-[19px] font-black text-[#09090B]">
                      {f.t}
                    </span>
                    {f.d}
                  </p>
                </li>
              ))}
            </ol>

            <a
              href="#contacto"
              className="mt-9 inline-flex min-h-[52px] items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-7 py-3 text-base font-bold text-white shadow-[5px_5px_0_#C6F432] transition-all duration-150 hover:bg-white hover:text-[#09090B] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span>Pídeme la demo de Oderalo</span>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Pantallas reales */}
          <div className="relative pb-10 lg:col-span-7 lg:pb-12 lg:pt-10" style={{ perspective: 1600 }}>
            <motion.div style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}>
              <div className="relative overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-[#09090B] p-2 shadow-[14px_14px_0_#09090B] sm:p-2.5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black">
                  <Screen src="/oderalo-app-agenda-v2.png" alt="Agenda de citas de Oderalo: listado, contadores del día y filtros" />
                </div>
              </div>

              <motion.div
                style={{ x: reduce ? 0 : phoneX }}
                className="absolute -bottom-2 -left-2 z-20 w-[32%] max-w-[200px] min-w-[120px] sm:-left-6 lg:-bottom-6 lg:-left-8"
              >
                <div
                  className="overflow-hidden rounded-[26px] border-[3px] border-[#09090B] bg-[#09090B] p-1.5 shadow-[8px_8px_0_#C6F432]"
                  style={{ transform: "rotate(-4deg)" }}
                >
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[20px] bg-black">
                    <Screen src="/oderalo-app-campo-v2.png" alt="App de campo de Oderalo: ruta del técnico con sus citas del día" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
