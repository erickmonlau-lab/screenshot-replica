import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIOLET = "#6D28D9";
const WHITE = "#FFFFFF";
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
  const { locale, t } = useLanguage();
  const reduce = useReducedMotion();

  const flowData = {
    es: [
      { n: "1", t: "Cita", d: "Se agenda y se asigna al técnico con su ruta." },
      {
        n: "2",
        t: "Parte",
        d: "El técnico lo rellena en el sitio y el cliente firma en pantalla.",
      },
      { n: "3", t: "Factura", d: "Sale de los datos del parte, sin volver a escribir nada." },
    ],
    ca: [
      { n: "1", t: "Cita", d: "S'agenda i s'assigna al tècnic amb la seva ruta." },
      { n: "2", t: "Comunicat", d: "El tècnic l'omple in situ i el client signa en pantalla." },
      { n: "3", t: "Factura", d: "Surt de les dades del comunicat, sense tornar a escriure res." },
    ],
    en: [
      { n: "1", t: "Booking", d: "Scheduled and assigned to technician with route." },
      { n: "2", t: "Job Slip", d: "Filled on site by technician, signed on mobile screen." },
      { n: "3", t: "Invoice", d: "Generated directly from job slip, zero duplicate entry." },
    ],
  };

  const currentFlow = flowData[locale] || flowData.es;
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
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] py-12 text-white sm:py-14 lg:pt-14 lg:pb-10"
      style={{ background: VIOLET }}
    >
      {/* Palabra gigante en contorno: las pantallas la cruzan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[5%] mx-auto flex w-full max-w-[1720px] justify-end px-6 sm:px-10"
      >
        <motion.div
          style={{ x: reduce ? 0 : wordX }}
          className="font-display select-none text-[clamp(4.5rem,19vw,9rem)] lg:text-[clamp(7rem,10.5vw,9.5rem)] leading-none font-black tracking-[-0.05em] whitespace-nowrap text-white [text-shadow:0.04em_0.04em_0_#09090B]"
        >
          ODERALO
        </motion.div>
      </div>

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
              style={{ background: WHITE }}
            >
              {t.erp.badge}
            </span>

            <h2 className="font-display mt-7 text-[clamp(2.4rem,4vw,3.7rem)] leading-[1] font-black tracking-[-0.045em] text-white">
              {t.erp.headline.split(",")[0] ? (
                <>
                  {t.erp.headline.split(",")[0]},
                  <br />
                  <span className="mt-1 inline-block whitespace-nowrap rounded-lg bg-[#09090B] px-2.5 text-white">
                    {t.erp.headline.split(",")[1]?.trim() || ""}
                  </span>
                </>
              ) : (
                t.erp.headline
              )}
            </h2>

            <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed font-medium text-white xl:text-[19px]">
              {t.erp.description}
            </p>

            <ol className="mt-8 grid max-w-[540px] gap-3.5">
              {currentFlow.map((f) => (
                <li
                  key={f.n}
                  className="flex items-center gap-3 rounded-xl border-[3px] border-[#09090B] bg-white p-2"
                >
                  <span
                    className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-[3px] border-[#09090B] text-[22px] font-black text-white"
                    style={{ background: VIOLET }}
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
              className="mt-9 inline-flex min-h-[52px] items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-7 py-3 text-base font-bold text-white shadow-[5px_5px_0_#FFFFFF] transition-all duration-150 hover:bg-white hover:text-[#09090B] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <Play size={18} strokeWidth={2.5} fill="currentColor" />
              <span>{t.erp.ctaDemo}</span>
            </a>
          </motion.div>

          {/* Pantallas reales */}
          <div
            className="relative pb-10 lg:col-span-7 lg:pt-2 lg:pb-[calc(clamp(7rem,10.5vw,9.5rem)+3.5rem)]"
            style={{ perspective: 1600 }}
          >
            <motion.div style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}>
              <div className="relative overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-[#09090B] p-2 shadow-[10px_10px_0_#09090B] sm:p-2.5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black">
                  <Screen
                    src="/oderalo-app-agenda-v2.png"
                    alt="Agenda de citas de Oderalo: listado, contadores del día y filtros"
                  />
                </div>
              </div>

              <motion.div
                style={{ x: reduce ? 0 : phoneX }}
                className="absolute -bottom-2 -left-2 z-20 w-[32%] max-w-[200px] min-w-[120px] sm:-left-6 lg:-bottom-6 lg:left-0"
              >
                <div
                  className="overflow-hidden rounded-[26px] border-[3px] border-[#09090B] bg-[#09090B] p-1.5 shadow-[6px_6px_0_#09090B]"
                  style={{ transform: "rotate(-4deg)" }}
                >
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[20px] bg-black">
                    <Screen
                      src="/oderalo-app-campo-v2.png"
                      alt="App de campo de Oderalo: ruta del técnico con sus citas del día"
                    />
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
