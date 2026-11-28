import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CalendarDays,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  { icon: CalendarDays, title: "Estrategia", text: "Un calendario de 30 días." },
  { icon: PenTool, title: "Claude crea", text: "Diseños, textos y descripciones." },
  { icon: ShieldCheck, title: "Revisión", text: "Cada dato, contrastado." },
  { icon: CalendarClock, title: "Antigravity programa", text: "En Meta Business Suite." },
];

/** Dos ejemplos con piezas reales: publicaciones, destacadas e historias. */
const brands = [
  {
    id: "oderalo",
    name: "ERP para servicios",
    handle: "oderalo.erp",
    posts: "/social/post-0",
    highlights: ["Demo", "Sectores", "Proceso", "Dudas"],
  },
  {
    id: "diversplas",
    name: "Extraescolares",
    handle: "diversplas_extraescolares",
    posts: "/social/diversplas-0",
    highlights: ["Actividades", "AFAs", "Casales", "Zonas"],
  },
];

const TOTAL = 9;
const STORIES = 4;

/** Cadena de agentes que prepara contenido para redes, con la vista de Instagram de dos marcas. */
export function SocialAgentsSection() {
  const reduce = useReducedMotion();
  const { tr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  // Cada «tick» enciende un paso; cada cuatro cambia la publicación resaltada y la historia.
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 750);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce]);

  const step = tick % steps.length;
  const round = Math.floor(tick / steps.length);
  const piece = TOTAL - 1 - (round % TOTAL);
  const story = round % STORIES;

  return (
    <section
      id="redes"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-white py-14 text-[#09090B] sm:py-16 xl:pt-[calc(96px*var(--escala,1))] xl:pb-10"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-8">
            <h2 className="font-display text-[clamp(2.1rem,2.7vw,2.6rem)] leading-[1.2] font-bold tracking-[-0.05em] [text-wrap:balance] lg:col-span-8">
              {tr("Mis agentes preparan las redes.")}{" "}
              <span className="rounded-lg bg-[#6D28D9] px-3 pb-1 whitespace-nowrap text-white">
                {tr("Yo decido.")}
              </span>
            </h2>
            <p className="max-w-[52ch] text-[18px] leading-snug font-semibold text-[#27272A] [text-wrap:pretty] lg:col-span-4">
              {tr(
                "Contenido para redes de principio a fin. Dos ejemplos: mi ERP y una empresa de extraescolares.",
              )}
            </p>
          </div>

          <ol className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-14">
            {steps.map((s, i) => {
              const on = step === i;
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative flex">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setPaused(true);
                      setTick((t) => t - (t % steps.length) + i);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border-[3px] border-[#09090B] px-3.5 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none ${
                      on
                        ? "bg-[#6D28D9] text-white shadow-[5px_5px_0_#09090B]"
                        : "bg-white shadow-[4px_4px_0_#09090B]"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] ${
                        on ? "bg-white text-[#6D28D9]" : "bg-[#09090B] text-white"
                      }`}
                    >
                      <Icon size={22} strokeWidth={2.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display block text-[18px] leading-tight font-bold tracking-[-0.03em] [text-wrap:balance]">
                        {tr(s.title)}
                      </span>
                      <span className="mt-0.5 block text-[15px] leading-snug font-semibold [text-wrap:balance]">
                        {tr(s.text)}
                      </span>
                    </span>
                  </button>
                  {i < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 -right-[44px] hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#09090B] transition-colors duration-300 xl:flex ${
                        step > i ? "bg-[#6D28D9] text-white" : "bg-white text-[#09090B]"
                      }`}
                    >
                      <ArrowRight size={14} strokeWidth={3.5} />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </motion.div>

        {/* Vista de Instagram de cada marca: perfil con publicaciones y, al lado, sus historias */}
        <div className="mt-8 grid gap-12 [--w:clamp(312px,calc(80svh/var(--escala,1)_-_392px),340px)] xl:grid-cols-2 xl:gap-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-5"
            >
              <div className="w-full max-w-[360px] rounded-[26px] border-[3px] border-[#09090B] bg-white p-3.5 shadow-[7px_7px_0_#6D28D9] md:w-[var(--w)] md:shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    src={`/social/ig/${brand.id}-avatar.webp`}
                    alt=""
                    width={112}
                    height={112}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-[#09090B] object-cover"
                  />
                  <h3 className="min-w-0 leading-tight">
                    <span className="block truncate text-[15px] font-bold tracking-[-0.01em]">
                      {brand.handle}
                    </span>
                    <span className="block truncate text-[15px] font-normal text-[#3F3F46]">
                      {brand.name}
                    </span>
                  </h3>
                </div>

                <ul className="mt-2.5 grid grid-cols-4 gap-0.5">
                  {brand.highlights.map((label, i) => (
                    <li key={label} className="min-w-0">
                      <button
                        type="button"
                        aria-pressed={story === i}
                        aria-label={`${tr("Ver historia")}: ${tr(label)} · ${brand.handle}`}
                        onClick={() => {
                          setPaused(true);
                          setTick(i * steps.length + steps.length - 1);
                        }}
                        className="flex w-full flex-col items-center gap-1 rounded-xl focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none"
                      >
                        <span
                          className={`rounded-full border-[3px] p-[2px] transition-colors duration-300 ${
                            story === i ? "border-[#6D28D9]" : "border-[#D4D4D8]"
                          }`}
                        >
                          <img
                            src={`/social/ig/${brand.id}-destacada-${i + 1}.webp`}
                            alt=""
                            width={112}
                            height={112}
                            loading="lazy"
                            className="block h-10 w-10 rounded-full object-cover"
                          />
                        </span>
                        <span className="w-full truncate text-center text-[11.5px] leading-tight tracking-[-0.02em] font-semibold">
                          {tr(label)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <ul className="mt-2.5 grid grid-cols-3 gap-2 border-t-2 border-[#E4E4E7] pt-2.5">
                  {Array.from({ length: TOTAL }, (_, i) => (
                    <li
                      key={`${brand.id}-${i}`}
                      className={`relative aspect-[4/5] overflow-hidden rounded-md transition-all duration-300 ${
                        i === piece ? "ring-[3px] ring-[#6D28D9] ring-offset-1" : ""
                      }`}
                    >
                      <img
                        src={`${brand.posts}${i + 1}.webp`}
                        alt={`${tr("Publicación de Instagram")} ${i + 1} · ${brand.handle}`}
                        width={432}
                        height={540}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-4">
                <figure className="relative aspect-[9/16] w-[230px] shrink-0 overflow-hidden rounded-[22px] border-[3px] border-[#09090B] bg-[#09090B] shadow-[7px_7px_0_#09090B] md:w-[calc(var(--w)*0.68)]">
                  {Array.from({ length: STORIES }, (_, i) => (
                    <img
                      key={i}
                      src={`/social/ig/${brand.id}-historia-${i + 1}.webp`}
                      alt={`${tr("Historia de Instagram")} ${i + 1} · ${brand.handle}`}
                      aria-hidden={story !== i}
                      width={432}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                        story === i ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <span aria-hidden="true" className="absolute inset-x-2 top-1.5 flex gap-1">
                    {Array.from({ length: STORIES }, (_, i) => (
                      <span
                        key={i}
                        className="h-1 flex-1 overflow-hidden rounded-full bg-[#A1A1AA]"
                      >
                        <span
                          className="block h-full bg-[#6D28D9] transition-[width] duration-700 ease-linear"
                          style={{
                            width: i < story ? "100%" : i === story ? `${(step + 1) * 25}%` : "0%",
                          }}
                        />
                      </span>
                    ))}
                  </span>
                </figure>
                <div className="flex items-center gap-3">
                  {[-1, 1].map((dir) => (
                    <button
                      key={dir}
                      type="button"
                      aria-label={`${tr(dir < 0 ? "Historia anterior" : "Historia siguiente")} · ${brand.handle}`}
                      onClick={() => {
                        setPaused(true);
                        const target = (story + dir + STORIES) % STORIES;
                        setTick(target * steps.length + steps.length - 1);
                      }}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[3px_3px_0_#09090B] transition-transform hover:-translate-y-0.5 hover:bg-[#F4F4F5] focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none ${
                        dir < 0 ? "order-first" : "order-last"
                      }`}
                    >
                      {dir < 0 ? (
                        <ArrowLeft size={18} strokeWidth={3} />
                      ) : (
                        <ArrowRight size={18} strokeWidth={3} />
                      )}
                    </button>
                  ))}
                  <span className="min-w-[52px] text-center text-[15px] font-bold tabular-nums">
                    {story + 1} / {STORIES}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
