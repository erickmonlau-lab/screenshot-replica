import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarClock, CalendarDays, PenTool, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: CalendarDays,
    title: "Estrategia",
    text: "Un calendario de 30 días.",
    log: "Calendario: elige la pieza del día",
  },
  {
    icon: PenTool,
    title: "Claude crea",
    text: "Diseños, textos y descripciones.",
    log: "Claude: diseña la imagen y escribe el texto",
  },
  {
    icon: ShieldCheck,
    title: "Revisión",
    text: "Cada dato, contrastado.",
    log: "Revisión: comprueba lo que afirma cada pieza",
  },
  {
    icon: CalendarClock,
    title: "Antigravity programa",
    text: "En Meta Business Suite.",
    log: "Antigravity: asigna fecha y hora",
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
const LAST = steps.length - 1;

/** Cadena de agentes que prepara contenido para redes: los pasos se encienden y la cuadrícula se llena. */
export function SocialAgentsSection() {
  const reduce = useReducedMotion();
  const { tr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [state, setState] = useState({ step: 0, done: 0 });
  const [picked, setPicked] = useState(false);
  const [brandIndex, setBrandIndex] = useState(0);
  const brand = brands[brandIndex] ?? brands[0]!;

  useEffect(() => {
    if (!inView || picked || reduce) return;
    const id = window.setInterval(() => {
      setState(({ step, done }) => {
        const next = (step + 1) % steps.length;
        // Al llegar a «programar», una pieza entra en la cuadrícula; llena, vuelve a empezar.
        if (next === 0 && done === TOTAL) return { step: next, done: 0 };
        return { step: next, done: next === LAST ? Math.min(done + 1, TOTAL) : done };
      });
    }, 750);
    return () => window.clearInterval(id);
  }, [inView, picked, reduce]);

  return (
    <section
      id="redes"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-white py-14 text-[#09090B] sm:py-16"
    >
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-[1380px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="min-w-0 lg:col-span-7"
        >
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
          <p className="mt-4 max-w-[52ch] text-[19px] leading-snug font-semibold text-[#27272A] [text-wrap:pretty]">
            {tr(
              "Contenido para redes de principio a fin. Dos ejemplos: mi ERP y una empresa de extraescolares.",
            )}
          </p>

          <ol className="mt-7 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => {
              const on = state.step === i;
              const Icon = s.icon;
              return (
                <li key={s.title} className="flex">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setPicked(true);
                      setState((v) => ({ ...v, step: i }));
                    }}
                    className={`flex w-full items-center gap-3.5 rounded-2xl border-[3px] border-[#09090B] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none ${
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
                </li>
              );
            })}
          </ol>

          <div className="mt-5 flex min-h-[78px] items-center gap-3 rounded-2xl bg-[#09090B] px-4 py-3 text-white sm:min-h-[60px]">
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-[#A78BFA]"
            />
            <p className="font-mono text-[15px] leading-snug">{tr(steps[state.step]?.log ?? "")}</p>
          </div>
        </motion.div>

        <div className="mx-auto w-full max-w-[420px] min-w-0 lg:col-span-5">
          <div
            role="group"
            aria-label={tr("Elige un ejemplo")}
            className="mb-4 grid grid-cols-2 gap-3"
          >
            {brands.map((b, i) => (
              <button
                key={b.id}
                type="button"
                aria-pressed={i === brandIndex}
                onClick={() => {
                  setBrandIndex(i);
                  setPicked(false);
                  setState({ step: 0, done: TOTAL });
                }}
                className={`min-h-[48px] rounded-full border-[3px] border-[#09090B] px-4 text-[17px] font-bold transition-all duration-150 hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none ${
                  i === brandIndex
                    ? "bg-[#6D28D9] text-white shadow-[4px_4px_0_#09090B]"
                    : "bg-white shadow-[3px_3px_0_#09090B]"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
          <div className="rounded-[34px] border-[3px] border-[#09090B] bg-[#09090B] p-3 text-white shadow-[10px_10px_0_#6D28D9]">
            <div className="flex items-center gap-3 px-1.5 pt-1.5 pb-3">
              <span
                aria-hidden="true"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white font-bold max-[400px]:hidden ${brand.avatar}`}
              >
                {brand.initial}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[15px] font-bold sm:text-[17px]">
                  {brand.handle}
                </span>
                <span className="block text-[15px] text-[#D4D4D8]">Instagram</span>
              </span>
              <span
                aria-hidden="true"
                className="font-display ml-auto text-[26px] leading-none font-bold tracking-[-0.03em]"
              >
                {state.done}
                <span className="text-[#A78BFA]">/{TOTAL}</span>
              </span>
            </div>
            <ul className="grid grid-cols-3 gap-1.5">
              {Array.from({ length: TOTAL }, (_, i) => {
                // Se suben del 9 al 1, así el primero queda arriba a la izquierda.
                const filled = i >= TOTAL - state.done;
                return (
                  <li
                    key={`${brand.id}-${i}`}
                    className={`relative aspect-[3/4] overflow-hidden rounded-lg border-2 ${
                      filled ? "border-transparent" : "border-dashed border-[#52525B]"
                    }`}
                  >
                    <motion.img
                      src={`${brand.prefix}${i + 1}.webp`}
                      alt={`${tr("Publicación de Instagram")} ${i + 1} · ${brand.name}`}
                      width={432}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      initial={false}
                      animate={{ opacity: filled ? 1 : 0.16, scale: filled ? 1 : 0.9 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
