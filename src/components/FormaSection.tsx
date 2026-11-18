import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;
// Rojo de GYMVITY (la app es negra y roja): texto blanco sobre él supera 4,5:1
const RED = "#E3182D";
const INK = "#09090B";

/** Móvil con la captura real de la app, flotando suavemente */
function Phone({
  src,
  alt,
  rotate,
  delay,
  className = "",
}: {
  src: string;
  alt: string;
  rotate: number;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      <motion.div
        animate={reduce ? { y: 0 } : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="overflow-hidden rounded-[34px] border-[3px] border-white bg-[#09090B] p-2"
          style={{ boxShadow: `7px 7px 0 ${RED}` }}
        >
          <div className="aspect-[390/844] overflow-hidden rounded-[26px] bg-white">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              draggable={false}
              className="block h-full w-full object-cover object-top select-none"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const facts = [
  { big: "144", t: "ejercicios", d: "Con técnica, filtros y favoritos guardados." },
  { big: "Instalable", t: "android · ios", d: "Manifest web y base Capacitor." },
  { big: "Social", t: "comunidad", d: "Rutinas de otros atletas en la app." },
];

/** Web Apps: caso real GYMVITY, app de entrenamiento hecha con tecnología web */
export function FormaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="web-apps"
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] text-white"
      style={{ background: RED }}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Columna de texto: alineada con el contenedor de 1400px */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="px-6 py-14 sm:px-10 lg:py-12 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]"
        >
          <span className="inline-flex items-center rounded-lg border-[3px] border-[#09090B] bg-white px-3.5 py-1.5 text-[15px] font-black tracking-wider text-[#09090B] uppercase shadow-[4px_4px_0_#09090B]">
            Web Apps · Caso real GYMVITY
          </span>

          <h2 className="font-display mt-6 text-[clamp(4rem,7.5vw,6.8rem)] leading-[0.88] font-black tracking-[-0.05em] text-white [text-shadow:5px_5px_0_#09090B]">
            Web Apps.
          </h2>
          <p className="font-display mt-4 max-w-[26ch] text-[clamp(1.6rem,2.5vw,2.3rem)] leading-[1.02] font-black tracking-[-0.03em] text-[#09090B]">
            Apps que se usan desde el móvil, sin pasar por tienda.
          </p>

          <p className="mt-4 max-w-[62ch] text-[18px] leading-relaxed font-semibold text-white xl:text-[19px]">
            Desarrollo aplicaciones web pensadas para el móvil: se abren desde una URL y se sienten
            como una app. Prueba de ello es <strong>GYMVITY</strong>, mi app de entrenamiento con
            biblioteca de ejercicios, rutinas de la comunidad y seguimiento de progreso.
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {facts.map((f) => (
              <li
                key={f.t}
                className="rounded-xl border-[3px] border-[#09090B] bg-white p-4 text-[#09090B] shadow-[5px_5px_0_#09090B]"
                             >
                <p
                  className="font-display text-[30px] leading-none font-black tracking-tight"
                  style={{ color: RED }}
                >
                  {f.big}
                </p>
                <p className="font-display mt-1 text-[18px] leading-tight font-black uppercase">
                  {f.t}
                </p>
                <p className="mt-2 text-[15px] leading-snug font-semibold text-[#3F3F46]">{f.d}</p>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {["React 19", "TypeScript", "TanStack Start", "Capacitor"].map((pill) => (
              <span
                key={pill}
                className="rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-3.5 py-1 text-[15px] font-bold text-white"
              >
                {pill}
              </span>
            ))}
          </div>

          <a
            href="#contacto"
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-7 py-3 text-base font-bold text-white shadow-[5px_5px_0_#FFFFFF] transition-all duration-150 hover:bg-white hover:text-[#09090B] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <span>Pídeme una propuesta de Web App</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </motion.div>

        {/* Panel negro: APPS entera arriba y tres móviles debajo, sin taparla */}
        <div className="relative flex flex-col items-center justify-center gap-8 overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] px-6 pt-8 pb-10 lg:border-t-0 lg:border-l-[3px] lg:px-8 lg:pt-10 lg:pb-12">
          <div
            aria-hidden="true"
            className="font-display leading-none font-black tracking-[-0.05em] text-white select-none text-[clamp(5rem,12vw,9.5rem)] lg:text-[clamp(5.5rem,8.5vw,9rem)] [text-shadow:0.04em_0.04em_0_#E3182D]"
          >
            APPS
          </div>

          <div className="flex w-full max-w-[620px] items-end justify-center -space-x-4 sm:-space-x-8">
            <Phone
              src="/forma-ejercicios-v2.png"
              alt="GYMVITY: biblioteca de 144 ejercicios con filtros"
              rotate={-6}
              delay={0.2}
              className="w-[31%] max-w-[190px] translate-y-3"
            />
            <Phone
              src="/forma-home-v2.png"
              alt="GYMVITY: pantalla de inicio con rutinas de la comunidad"
              rotate={0}
              delay={0}
              className="relative z-10 w-[40%] max-w-[250px]"
            />
            <Phone
              src="/forma-progreso-v2.png"
              alt="GYMVITY: registro de progreso con consistencia y volumen"
              rotate={6}
              delay={0.4}
              className="w-[31%] max-w-[190px] translate-y-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
