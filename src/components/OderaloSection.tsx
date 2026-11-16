import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RotatingSeal } from "./RotatingSeal";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

// Recorrido (en % de la altura de la imagen) para que la captura se deslice de arriba abajo
// dentro de una pantalla: 1 - (alto visible / alto imagen).
const LAPTOP_TRAVEL = -(1 - (10 / 16) * (1440 / 2660)) * 100;
const PHONE_TRAVEL = -(1 - 19.5 / 9 / (3376 / 390)) * 100;

const features = ["Agenda de avisos", "App del técnico", "Firma del cliente", "Stock y facturación"];

/** Auto-scroll de una captura larga dentro de un contenedor con overflow oculto. */
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

/** ERP Oderalo: grabación de su web (portátil + móvil) que se desliza sola. */
export function OderaloSection() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 16 });
  const sy = useSpring(py, { stiffness: 70, damping: 16 });
  const rotY = useTransform(sx, (v) => -7 + v * 8);
  const rotX = useTransform(sy, (v) => 3 + v * -6);
  const phoneX = useTransform(sx, (v) => v * 26);

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
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#E3E5E9] py-14 text-[#09090B] sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-5"
        >
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#09090B] bg-[#FFD60A] px-3.5 py-1.5 text-[16px] font-bold shadow-[4px_4px_0_#09090B]">
            ERP + app de campo · prototipo funcional
          </span>
          <h2 className="font-display mt-5 text-[clamp(4rem,10vw,9rem)] leading-[0.85] font-bold tracking-[-0.065em]">
            Oderalo
          </h2>
          <p className="font-display mt-4 text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.04em] text-[#0044FF]">
            Del aviso a la factura, sin papeles.
          </p>
          <p className="mt-4 max-w-[44ch] text-lg leading-snug font-medium text-[#3F3F46] sm:text-xl">
            Mi ERP para empresas de servicios en campo: agenda, app del técnico con firma del
            cliente, stock y facturación en un mismo sistema. Versión de prueba local: los datos
            se guardan solo en el navegador.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="rounded-full border-2 border-[#09090B] bg-white px-4 py-1.5 text-[16px] font-bold"
              >
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            className="mt-7 inline-flex min-h-[54px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-7 py-3.5 text-base font-semibold text-white shadow-[5px_5px_0_#0044FF] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#0044FF]"
          >
            <span>Pídeme la demo en directo</span>
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </a>
        </motion.div>

        <div className="relative lg:col-span-7" style={{ perspective: 1600 }}>
          <motion.div style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}>
            {/* Portátil */}
            <div className="overflow-hidden rounded-[18px] border-[3px] border-[#09090B] bg-[#09090B] p-2 shadow-[12px_12px_0_#0044FF]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black">
                <AutoScroll
                  src="/oderalo-desktop.webp"
                  alt="Grabación de la web de Oderalo desplazándose"
                  travel={LAPTOP_TRAVEL}
                  duration={16}
                />
              </div>
            </div>
            <div className="mx-auto h-3 w-[92%] rounded-b-2xl border-[3px] border-t-0 border-[#09090B] bg-white" />

            {/* Móvil */}
            <motion.div
              style={{ x: reduce ? 0 : phoneX }}
              className="absolute -bottom-6 -left-2 w-[27%] min-w-[130px] sm:-left-6 lg:-left-10"
            >
              <div className="overflow-hidden rounded-[26px] border-[3px] border-[#09090B] bg-[#09090B] p-1.5 shadow-[8px_8px_0_#09090B]">
                <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[20px] bg-black">
                  <AutoScroll
                    src="/oderalo-mobile.webp"
                    alt="Grabación de la web de Oderalo en móvil desplazándose"
                    travel={PHONE_TRAVEL}
                    duration={20}
                    delay={0.6}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute -top-8 -right-2 z-10 hidden sm:block lg:-right-4">
            <RotatingSeal
              text="ERP · APP DE CAMPO · FACTURACIÓN · ERP · "
              size={170}
              className="border-[3px] border-[#09090B] bg-[#FFD60A] shadow-[6px_6px_0_#09090B]"
            >
              <span className="font-display text-[28px] leading-none font-bold tracking-[-0.05em]">
                ER
              </span>
            </RotatingSeal>
          </div>
        </div>
      </div>
    </section>
  );
}
