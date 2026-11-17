import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

const features = ["Plan semanal", "Entreno del día", "Ejercicio guiado", "Series y temporizador"];

function Phone({
  src,
  alt,
  width,
  rotate,
  delay,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  rotate: number;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      style={{ width }}
    >
      <motion.div
        animate={reduce ? { y: 0 } : { y: [0, -12, 0] }}
        transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="led-box rounded-[38px] p-2.5">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            draggable={false}
            className="block w-full rounded-[28px] bg-[#09090B] select-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Forma: app móvil de entrenamiento, con sus pantallas reales en dos móviles LED. */
export function FormaSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="forma"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] py-14 text-white sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-6"
        >
          <span className="led-chip inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[16px] font-bold">
            <span className="led-dot h-2.5 w-2.5 rounded-full" />
            App móvil de entrenamiento
          </span>
          <h2 className="font-display led-text mt-5 text-[clamp(4.5rem,11vw,10rem)] leading-[0.85] font-bold tracking-[-0.065em]">
            Forma
          </h2>
          <p className="font-display mt-4 text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.04em] text-[#9DB8FF]">
            Tu plan de entrenamiento, en el bolsillo.
          </p>
          <p className="mt-4 max-w-[46ch] text-lg leading-snug font-medium text-[#D4D4D8] sm:text-xl">
            App con el plan de la semana por días, el entrenamiento de hoy y un ejercicio guiado
            con series, temporizador y próximos ejercicios.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {features.map((f) => (
              <li key={f} className="led-chip rounded-full px-4 py-1.5 text-[16px] font-bold">
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            className="mt-7 inline-flex min-h-[54px] items-center gap-2 rounded-full border-2 border-[#3D6BFF] bg-[#0044FF] px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_24px_2px_#0044FF] transition-all duration-150 active:scale-[0.97]"
          >
            <span>Pídeme la demo</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </motion.div>

        <div className="relative mx-auto flex h-[560px] w-full max-w-[640px] items-center justify-center lg:col-span-6">
          <Phone
            src="/forma-dashboard.png"
            alt="Pantalla de inicio de Forma con el plan semanal"
            width={250}
            rotate={-5}
            delay={0}
            className="absolute left-[4%] top-4 z-10 sm:left-[8%]"
          />
          <Phone
            src="/forma-exercise.png"
            alt="Pantalla de ejercicio guiado de Forma"
            width={262}
            rotate={4}
            delay={0.3}
            className="absolute right-[2%] bottom-0 sm:right-[6%]"
          />
        </div>
      </div>
    </section>
  );
}
