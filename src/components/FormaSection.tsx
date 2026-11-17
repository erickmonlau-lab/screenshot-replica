import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIOLET = "#6D28D9";
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
          className="overflow-hidden rounded-[34px] border-[3px] bg-[#09090B] p-2"
          style={{ borderColor: INK, boxShadow: `7px 7px 0 ${INK}` }}
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
  { t: "144 ejercicios", d: "Biblioteca con técnica, filtros y favoritos guardados en el dispositivo." },
  { t: "Instalable", d: "Manifest web y base Capacitor preparada para Android e iOS." },
  { t: "Comunidad", d: "Rutinas de otros atletas y pestaña social dentro de la misma app." },
];

/** Web Apps: caso real GYMVITY, app de entrenamiento hecha con tecnología web */
export function FormaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="web-apps"
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-white py-14 text-[#09090B] sm:py-16 lg:py-14"
    >
      {/* Bloque de color de fondo */}
      <div
        aria-hidden="true"
        className="absolute -top-8 left-[46%] hidden h-24 w-24 rotate-12 border-[3px] border-[#09090B] lg:block"
        style={{ background: VIOLET }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Texto */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center rounded-lg border-[3px] border-[#09090B] bg-[#09090B] px-3.5 py-1.5 text-[15px] font-black tracking-wider text-white uppercase">
              Web Apps · Caso real GYMVITY
            </span>

            <h2 className="font-display mt-5 text-[clamp(3.6rem,8vw,7rem)] leading-[0.9] font-black tracking-[-0.05em]">
              Web Apps<span style={{ color: VIOLET }}>.</span>
            </h2>
            <p
              className="font-display mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.05] font-black tracking-[-0.03em]"
              style={{ color: VIOLET }}
            >
              Apps que se usan desde el móvil, sin pasar por tienda.
            </p>

            <p className="mt-5 max-w-[52ch] text-[18px] leading-relaxed font-medium text-[#27272A]">
              Desarrollo aplicaciones web pensadas para el móvil: se abren desde una URL y se
              sienten como una app. Prueba de ello es <strong>GYMVITY</strong>, mi app de
              entrenamiento con biblioteca de ejercicios, rutinas de la comunidad y seguimiento de
              progreso.
            </p>

            <ul className="mt-6 grid gap-3.5 sm:grid-cols-3">
              {facts.map((f) => (
                <li
                  key={f.t}
                  className="rounded-xl border-[3px] border-[#09090B] bg-white p-3.5"
                  style={{ boxShadow: `4px 4px 0 ${INK}` }}
                >
                  <p
                    className="font-display text-[20px] leading-tight font-black"
                    style={{ color: VIOLET }}
                  >
                    {f.t}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-snug font-semibold text-[#52525B]">
                    {f.d}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {["React 19", "TypeScript", "TanStack Start", "Capacitor"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border-[3px] border-[#09090B] bg-white px-3.5 py-1 text-[15px] font-bold"
                >
                  {pill}
                </span>
              ))}
            </div>

            <a
              href="#contacto"
              className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full border-[3px] border-[#09090B] px-7 py-3 text-base font-bold text-white transition-all duration-150 hover:bg-[#09090B] active:translate-x-[2px] active:translate-y-[2px]"
              style={{ background: VIOLET, boxShadow: `5px 5px 0 ${INK}` }}
            >
              <span>Pídeme una propuesta de Web App</span>
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Móviles sobre panel violeta */}
          <div className="relative mx-auto w-full max-w-[600px] lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[4%] bottom-[4%] rounded-[28px] border-[3px] border-[#09090B]"
              style={{ background: VIOLET, boxShadow: `10px 10px 0 ${INK}` }}
            />
            <div className="relative flex items-center justify-center gap-4 py-6 sm:gap-6">
              <Phone
                src="/forma-home-v2.png"
                alt="GYMVITY: pantalla de inicio con rutinas de la comunidad"
                rotate={-4}
                delay={0}
                className="w-[44%] max-w-[240px] translate-y-6"
              />
              <Phone
                src="/forma-ejercicios-v2.png"
                alt="GYMVITY: biblioteca de 144 ejercicios con filtros"
                rotate={3}
                delay={0.2}
                className="w-[44%] max-w-[240px] -translate-y-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
