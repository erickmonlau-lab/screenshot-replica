import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Laptop, Smartphone, Zap, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

// Recorrido (en % de la altura de la imagen) para que la captura se deslice de arriba abajo
// dentro de una pantalla: 1 - (alto visible / alto imagen).
const LAPTOP_TRAVEL = -(1 - (10 / 16) * (1440 / 2660)) * 100;
const PHONE_TRAVEL = -(1 - 19.5 / 9 / (3376 / 390)) * 100;

/** Auto-scroll fluido de la grabación real de Oderalo dentro de la pantalla */
function AutoScroll({
  src,
  alt,
  travel,
  duration,
  delay = 0,
}: {
  src: string;
  alt: string;
  travel: number;
  duration: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className="block w-full select-none"
      initial={{ y: "0%" }}
      animate={reduce ? { y: "0%" } : { y: ["0%", `${travel}%`] }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 1.2,
      }}
    />
  );
}

/** ERP Oderalo: caso real en producción con el portátil y móvil reales, redacción y presentación visual estilo Apple */
export function OderaloSection() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 65, damping: 16 });
  const sy = useSpring(py, { stiffness: 65, damping: 16 });
  const rotY = useTransform(sx, (v) => -5 + v * 7);
  const rotX = useTransform(sy, (v) => 2 + v * -5);
  const phoneX = useTransform(sx, (v) => v * 12);

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
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#F4F4F6] py-14 sm:py-18 lg:py-22 text-[#09090B]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-18">
          {/* Columna Izquierda: Redacción estilo Apple con Oderalo como caso real */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#09090B] bg-[#6D28D9] px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#09090B]">
              Caso Real · ERP Oderalo en Producción
            </span>

            {/* Titular contundente estilo Apple */}
            <h2 className="font-display mt-5 text-[clamp(3.6rem,7.5vw,6.2rem)] leading-[0.88] font-black tracking-[-0.05em] text-[#09090B]">
              ERP.
              <span className="block text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.05] font-black tracking-[-0.04em] text-[#6D28D9] mt-3">
                Oderalo: del aviso a la factura, sin papeles.
              </span>
            </h2>

            <p className="mt-5 max-w-[42ch] text-base leading-relaxed font-medium text-[#27272A] sm:text-lg">
              <strong>Oderalo</strong> es mi sistema ERP desarrollado a medida para empresas de
              servicios en campo. Centraliza llamadas, despacha rutas a los técnicos, recoge la firma
              del cliente en pantalla y emite la factura en un único flujo continuo sin papeles.
            </p>

            {/* Tríada de ventajas clave con formato Apple */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border-2 border-[#09090B] bg-white p-3.5 shadow-[3px_3px_0_#09090B]">
                <p className="font-display text-xl font-black tracking-tight text-[#6D28D9]">
                  0 papeles.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-[#52525B]">
                  Firma digital del cliente en la app de campo de Oderalo.
                </p>
              </div>

              <div className="rounded-xl border-2 border-[#09090B] bg-white p-3.5 shadow-[3px_3px_0_#09090B]">
                <p className="font-display text-xl font-black tracking-tight text-[#09090B]">
                  Tiempo real.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-[#52525B]">
                  La central Oderalo controla rutas GPS, avisos y stock al segundo.
                </p>
              </div>

              <div className="rounded-xl border-2 border-[#09090B] bg-white p-3.5 shadow-[3px_3px_0_#6D28D9]">
                <p className="font-display text-xl font-black tracking-tight text-[#6D28D9]">
                  1 clic.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-[#52525B]">
                  El albarán validado en Oderalo emite y concilia la factura al instante.
                </p>
              </div>
            </div>

            {/* Píldoras de arquitectura técnica */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Oderalo Web & Cloud",
                "Oderalo App PWA",
                "Firma Digital en Pantalla",
                "Facturación Automática",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border-2 border-[#09090B] bg-white px-3.5 py-1 text-xs sm:text-sm font-bold text-[#09090B] shadow-[2px_2px_0_#09090B]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-7 py-3.5 text-base font-bold text-white shadow-[4px_4px_0_#6D28D9] transition-all duration-150 hover:bg-[#6D28D9] hover:border-[#6D28D9] hover:shadow-[4px_4px_0_#09090B] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span>Pídeme la demo de Oderalo</span>
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>

          {/* Columna Derecha: Mockups Reales de Oderalo (Tablet/Portátil + Móvil) */}
          <div className="relative mt-8 sm:mt-10 lg:mt-0 lg:col-span-7" style={{ perspective: 1600 }}>
            {/* Badge flotante superior estilo Apple */}
            <div className="absolute -top-5 right-2 z-30 hidden sm:flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-3.5 py-1 text-xs font-bold shadow-[3px_3px_0_#6D28D9]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Oderalo Cloud en Vivo · Sistema en producción</span>
            </div>

            <motion.div style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}>
              {/* Portátil / Tablet mostrando la web real de Oderalo */}
              <div className="relative overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-[#09090B] p-2 sm:p-2.5 shadow-[12px_12px_0_#6D28D9]">
                {/* Cabecera / Barra estilo navegador macOS */}
                <div className="flex items-center justify-between border-b border-[#272730] bg-[#181820] px-3.5 py-1.5 rounded-t-lg mb-1">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                    </div>
                    <span className="ml-1 inline-flex items-center gap-1 rounded bg-[#6D28D9] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                      ODERALO
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400">
                      oderalo.app/despacho
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400">
                    <Laptop size={12} className="text-[#A78BFA]" />
                    <span className="hidden sm:inline">Vista Central / Oficina</span>
                  </div>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black">
                  <AutoScroll
                    src="/oderalo-desktop.webp"
                    alt="Grabación real de la web de Oderalo desplazándose"
                    travel={LAPTOP_TRAVEL}
                    duration={16}
                  />
                </div>
              </div>
              <div className="mx-auto h-3 w-[92%] rounded-b-2xl border-[3px] border-t-0 border-[#09090B] bg-white shadow-md" />

              {/* Móvil mostrando la grabación real de la app de campo de Oderalo */}
              <motion.div
                style={{ x: reduce ? 0 : phoneX }}
                className="absolute -bottom-8 sm:-bottom-12 lg:-bottom-14 left-0 sm:left-2 lg:left-4 w-[24%] sm:w-[22%] min-w-[110px] max-w-[155px] z-30"
              >
                <div className="overflow-hidden rounded-[26px] border-[3px] border-[#09090B] bg-[#09090B] p-1.5 shadow-[8px_8px_0_#09090B]">
                  {/* Badge de dispositivo */}
                  <div className="flex items-center justify-between text-[8px] font-bold text-zinc-400 px-1.5 py-0.5 bg-[#181820] rounded-t-[18px] border-b border-[#272730]">
                    <span className="text-white flex items-center gap-1">
                      <Smartphone size={9} /> Oderalo Móvil
                    </span>
                    <span className="text-emerald-400">● PWA</span>
                  </div>
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-b-[18px] bg-black">
                    <AutoScroll
                      src="/oderalo-mobile.webp"
                      alt="Grabación de la app móvil de Oderalo desplazándose"
                      travel={PHONE_TRAVEL}
                      duration={20}
                      delay={0.6}
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
