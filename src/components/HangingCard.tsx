import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "./motion-pref";

/** Conference-badge style ID card hanging from a lanyard; swings on its own and can be dragged. */
export function HangingCard() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-140, 0, 140], [-12, 0, 12]), {
    stiffness: 120,
    damping: 9,
  });

  return (
    <div className="relative mx-auto flex w-[250px] flex-col items-center sm:w-[270px] lg:mx-0">
      <motion.div
        style={{ transformOrigin: "50% 0%" }}
        animate={reduce ? { rotate: 0 } : { rotate: [-2.2, 2.2, -2.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        {/* lanyard */}
        <div
          aria-hidden="true"
          className="flex h-[92px] w-[22px] items-center justify-center overflow-hidden bg-[#09090B]"
        >
          <span
            className="text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap text-white uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Erick Rodríguez
          </span>
        </div>
        <div
          aria-hidden="true"
          className="-mb-2 h-5 w-5 rounded-full border-[3px] border-zinc-500 bg-transparent"
        />

        <motion.div
          drag="x"
          dragConstraints={{ left: -140, right: 140 }}
          dragElastic={0.25}
          dragSnapToOrigin
          style={{ x, rotate, transformOrigin: "50% 0%" }}
          className="w-full cursor-grab touch-pan-y overflow-hidden rounded-[22px] border-2 border-[#09090B] bg-white text-[#09090B] shadow-[6px_6px_0_#0044FF] active:cursor-grabbing"
        >
          <div className="flex justify-center pt-3">
            <span className="block h-2.5 w-14 rounded-full border-2 border-[#09090B] bg-[#E4E4E7]" />
          </div>
          <div className="mx-4 mt-3 overflow-hidden rounded-2xl border-2 border-[#09090B] bg-[#0044FF]">
            <img
              src="/erick-portrait-studio.png"
              alt="Erick Rodríguez"
              loading="lazy"
              draggable={false}
              className="h-[220px] w-full object-cover object-top select-none sm:h-[240px]"
            />
          </div>
          <div className="px-5 pt-4 pb-5">
            <p className="font-display text-[26px] leading-none font-bold tracking-[-0.04em]">
              Erick Rodríguez
            </p>
            <p className="mt-1.5 text-[13px] font-semibold tracking-[0.04em] text-[#0044FF]">
              Web · ERPs · IA — Barcelona
            </p>
            <div className="mt-4 flex items-end justify-between gap-3 border-t-2 border-dashed border-[#09090B]/25 pt-3">
              <span className="font-mono text-[11px] leading-tight font-bold tracking-[0.1em] text-[#52525B] uppercase">
                Agente del Cambio
                <br />
                375 h
              </span>
              <span
                aria-hidden="true"
                className="h-8 w-16"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg,#09090B 0 2px,transparent 2px 4px,#09090B 4px 5px,transparent 5px 8px)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
