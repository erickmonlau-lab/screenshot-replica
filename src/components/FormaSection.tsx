import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Sparkles, WifiOff, Zap } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

function PhoneMockup({
  src,
  alt,
  rotate,
  delay,
  badge,
  className = "",
}: {
  src: string;
  alt: string;
  rotate: number;
  delay: number;
  badge?: string;
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
        animate={reduce ? { y: 0 } : { y: [0, -10, 0] }}
        transition={{ duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {badge && (
          <div className="absolute -top-3 left-4 z-20 rounded-full border-2 border-white bg-[#6D28D9] px-3 py-0.5 text-[11px] font-black text-white shadow-[2px_2px_0_#000]">
            {badge}
          </div>
        )}
        <div className="overflow-hidden rounded-[36px] border-[3px] border-white bg-[#09090B] p-2 shadow-[10px_10px_0_#6D28D9]">
          <div className="relative overflow-hidden rounded-[26px] bg-[#121216]">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              draggable={false}
              className="block w-full select-none"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Sección de Aplicaciones Web & PWA: experiencia nativa sin fricción de descarga */
export function FormaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="web-apps"
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 text-white"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Columna Izquierda: Redacción estilo Apple */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-[#6D28D9] px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#FFFFFF]">
              Web Apps · Progressive Web Apps (PWA)
            </span>

            <h2 className="font-display mt-5 text-[clamp(3.6rem,7.5vw,6.2rem)] leading-[0.88] font-black tracking-[-0.05em] text-white">
              Web Apps.
              <span className="block text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.05] font-black tracking-[-0.04em] text-[#A78BFA] mt-3">
                Nativas en el navegador. Rápidas como el rayo.
              </span>
            </h2>

            <p className="mt-5 max-w-[46ch] text-base leading-relaxed font-medium text-zinc-300 sm:text-lg">
              Desarrollo interfaces táctiles y aplicaciones web reactivas que se sienten como software
              instalado. Sin barreras de descarga en App Store ni comisiones: abres una URL y la
              experiencia vuela a 60 fps con almacenamiento local persistente.
            </p>

            {/* Tríada de ventajas clave formato Apple */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border-2 border-zinc-700 bg-[#16161D] p-3.5 shadow-[3px_3px_0_#6D28D9]">
                <p className="font-display text-xl font-black tracking-tight text-[#A78BFA]">
                  60 FPS.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-zinc-400">
                  Animaciones aceleradas por GPU y respuesta táctil instantánea.
                </p>
              </div>

              <div className="rounded-xl border-2 border-zinc-700 bg-[#16161D] p-3.5 shadow-[3px_3px_0_#FFFFFF]">
                <p className="font-display text-xl font-black tracking-tight text-white">
                  Offline-First.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-zinc-400">
                  IndexedDB local: funciona sin cobertura y sincroniza al volver la red.
                </p>
              </div>

              <div className="rounded-xl border-2 border-zinc-700 bg-[#16161D] p-3.5 shadow-[3px_3px_0_#6D28D9]">
                <p className="font-display text-xl font-black tracking-tight text-[#A78BFA]">
                  0 fricción.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-zinc-400">
                  Instalable con icono propio en iOS y Android sin pasar por tiendas.
                </p>
              </div>
            </div>

            {/* Píldoras técnicas */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React 19 & TypeScript",
                "IndexedDB Local Storage",
                "Service Workers & Cache",
                "Gestos Táctiles 60 FPS",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-zinc-700 bg-[#181822] px-3.5 py-1 text-xs sm:text-sm font-bold text-zinc-200"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contacto"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-white bg-[#6D28D9] px-7 py-3.5 text-base font-bold text-white shadow-[4px_4px_0_#FFFFFF] transition-all duration-150 hover:bg-white hover:text-[#09090B] hover:border-white active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span>Pídeme una propuesta de Web App</span>
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>

          {/* Columna Derecha: Teléfonos flotantes con UI de Web App */}
          <div className="relative mx-auto flex h-[460px] w-full max-w-[620px] items-center justify-center sm:h-[540px] lg:col-span-6">
            <PhoneMockup
              src="/forma-dashboard.png"
              alt="Web App reactiva: panel de control táctil"
              badge="⚡ Carga en 0.2s"
              rotate={-4}
              delay={0}
              className="absolute top-2 left-[2%] z-10 w-[46vw] max-w-[250px] sm:top-4 sm:left-[6%]"
            />
            <PhoneMockup
              src="/forma-exercise.png"
              alt="Web App reactiva: temporizadores y estado persistente"
              badge="● Offline Listo"
              rotate={3}
              delay={0.25}
              className="absolute right-[2%] bottom-2 z-20 w-[48vw] max-w-[265px] sm:right-[4%] sm:bottom-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
