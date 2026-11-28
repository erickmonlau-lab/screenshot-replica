import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarClock, CalendarDays, PenTool, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: CalendarDays,
    title: "Estrategia",
    text: "Un calendario de 30 días.",
  },
  {
    icon: PenTool,
    title: "Claude crea",
    text: "Diseños, textos y descripciones.",
  },
  {
    icon: ShieldCheck,
    title: "Revisión",
    text: "Cada dato, contrastado.",
  },
  {
    icon: CalendarClock,
    title: "Antigravity programa",
    text: "En Meta Business Suite.",
  },
];

/** Dos ejemplos con piezas reales, en el orden en que quedan en la cuadrícula. */
const brands = [
  {
    id: "oderalo",
    name: "Oderalo",
    handle: "oderalo.erp",
    prefix: "/social/post-0",
    initial: "O",
    avatar: "bg-[#6D28D9]",
  },
  {
    id: "diversplas",
    name: "Diversplas",
    handle: "diversplas_extraescolares",
    prefix: "/social/diversplas-0",
    initial: "D",
    avatar: "bg-[#1D2F8C]",
  },
];

const TOTAL = 9;

/** Cadena de agentes que prepara contenido para redes: los pasos se encienden y se resalta la pieza en curso en las dos cuentas. */
export function SocialAgentsSection() {
  const reduce = useReducedMotion();
  const { tr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [state, setState] = useState({ step: 0, piece: TOTAL - 1 });
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    if (!inView || picked || reduce) return;
    const id = window.setInterval(() => {
      setState(({ step, piece }) => {
        const next = (step + 1) % steps.length;
        // Al cerrar la vuelta se pasa a la pieza anterior: se suben de la 9 a la 1.
        return { step: next, piece: next === 0 ? (piece + TOTAL - 1) % TOTAL : piece };
      });
    }, 750);
    return () => window.clearInterval(id);
  }, [inView, picked, reduce]);

  return (
    <section
      id="redes"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-white py-14 text-[#09090B] sm:py-16"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full border-[3px] border-[#09090B] bg-[#09090B] px-4 py-1.5 text-[15px] font-bold tracking-[0.08em] text-white uppercase max-sm:tracking-normal">
                {tr("Redes sociales con agentes")}
              </span>
              <h2 className="font-display mt-5 text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.06] font-bold tracking-[-0.05em] [text-wrap:balance]">
                {tr("Mis agentes preparan las redes.")}
                <span className="mt-3 block">
                  <span className="rounded-lg bg-[#6D28D9] px-3 pt-1 pb-1.5 text-white">
                    {tr("Yo decido.")}
                  </span>
                </span>
              </h2>
            </div>
            <p className="max-w-[52ch] text-[19px] lg:col-span-5 lg:pb-1 leading-snug font-semibold text-[#27272A] [text-wrap:pretty]">
              {tr(
                "Contenido para redes de principio a fin. Dos ejemplos: mi ERP y una empresa de extraescolares.",
              )}
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-16">
            {steps.map((s, i) => {
              const on = state.step === i;
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative flex flex-col">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setPicked(true);
                      setState((v) => ({ ...v, step: i }));
                    }}
                    className={`flex w-full flex-1 items-center gap-3.5 rounded-2xl border-[3px] border-[#09090B] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none ${
                      on
                        ? "bg-[#6D28D9] text-white shadow-[6px_6px_0_#09090B]"
                        : "bg-white shadow-[4px_4px_0_#09090B]"
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] ${
                        on ? "bg-white text-[#6D28D9]" : "bg-[#09090B] text-white"
                      }`}
                    >
                      <Icon size={23} strokeWidth={2.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display block text-[21px] leading-tight font-bold tracking-[-0.03em] [text-wrap:balance]">
                        {i + 1}. {tr(s.title)}
                      </span>
                      <span className="mt-0.5 block text-[16px] leading-snug font-semibold [text-wrap:balance]">
                        {tr(s.text)}
                      </span>
                    </span>
                  </button>
                  {i < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={`absolute top-[calc(50%-14px)] -right-[51px] z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#09090B] transition-colors duration-300 xl:flex ${
                        state.step > i ? "bg-[#6D28D9] text-white" : "bg-white text-[#09090B]"
                      }`}
                    >
                      <ArrowRight size={17} strokeWidth={3} />
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="mt-4 hidden h-3.5 overflow-hidden rounded-full border-[3px] border-[#09090B] bg-white xl:block"
                  >
                    <span
                      className={`block h-full bg-[#6D28D9] transition-[width] ease-linear ${
                        state.step >= i ? "w-full duration-700" : "w-0 duration-200"
                      }`}
                    />
                  </span>
                </li>
              );
            })}
          </ol>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-[980px] grid-cols-[minmax(0,1fr)] justify-items-center gap-10 md:grid-cols-2">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="w-full max-w-[440px] rounded-[34px] border-[3px] border-[#09090B] bg-[#09090B] p-3 text-white shadow-[10px_10px_0_#6D28D9]"
            >
              <div className="flex items-center gap-3 px-1.5 pt-1.5 pb-3">
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white font-bold max-[400px]:hidden md:max-lg:hidden ${brand.avatar}`}
                >
                  {brand.initial}
                </span>
                <h3 className="min-w-0 leading-tight">
                  <span className="block truncate text-[15px] font-bold sm:text-[17px]">
                    {brand.handle}
                  </span>
                  <span className="block text-[15px] font-normal text-[#D4D4D8]">
                    {brand.name} · Instagram
                  </span>
                </h3>
              </div>
              <ul className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: TOTAL }, (_, i) => {
                  const current = i === state.piece;
                  return (
                    <li
                      key={`${brand.id}-${i}`}
                      className={`relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-300 ${
                        current ? "z-10 scale-[1.06] ring-[3px] ring-[#A78BFA]" : ""
                      }`}
                    >
                      <img
                        src={`${brand.prefix}${i + 1}.webp`}
                        alt={`${tr("Publicación de Instagram")} ${i + 1} · ${brand.name}`}
                        width={432}
                        height={540}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
