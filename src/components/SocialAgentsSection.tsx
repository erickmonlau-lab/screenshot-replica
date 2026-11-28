import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarClock, CalendarDays, PenTool, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  { icon: CalendarDays, title: "Estrategia" },
  { icon: PenTool, title: "Claude crea" },
  { icon: ShieldCheck, title: "Revisión" },
  { icon: CalendarClock, title: "Antigravity programa" },
];

/** Dos ejemplos con piezas reales: una historia grande y cuatro publicaciones por marca. */
const brands = [
  { id: "oderalo", handle: "oderalo.erp", name: "Mi ERP", posts: "/social/post-0" },
  {
    id: "diversplas",
    handle: "diversplas_extraescolares",
    name: "Empresa de extraescolares",
    posts: "/social/diversplas-0",
  },
];

const POSTS = 4;
const STORIES = 4;

/** Cadena de agentes que prepara contenido para redes, con ejemplos de dos marcas. */
export function SocialAgentsSection() {
  const reduce = useReducedMotion();
  const { tr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  // Cada «tick» enciende un paso; cada cuatro cambia la historia.
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 900);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce]);

  const step = tick % steps.length;
  const story = Math.floor(tick / steps.length) % STORIES;

  return (
    <section
      id="redes"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-white py-14 text-[#09090B] sm:py-16 xl:pt-[calc(96px*var(--escala,1))] xl:pb-8"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="grid gap-3 lg:grid-cols-12 lg:items-center lg:gap-8">
            <h2 className="font-display text-[clamp(2.1rem,2.7vw,2.6rem)] leading-[1.2] font-bold tracking-[-0.05em] [text-wrap:balance] lg:col-span-8">
              {tr("Mis agentes preparan las redes.")}{" "}
              <span className="rounded-lg bg-[#6D28D9] px-3 pb-1 whitespace-nowrap text-white">
                {tr("Yo decido.")}
              </span>
            </h2>
            <p className="max-w-[44ch] text-[17px] leading-snug font-semibold text-[#3F3F46] [text-wrap:pretty] lg:col-span-4">
              {tr("Del calendario a la publicación programada. Dos ejemplos.")}
            </p>
          </div>

          {/* Los cuatro pasos en una sola línea ligera */}
          <ol className="mt-5 grid grid-cols-2 gap-2.5 lg:flex lg:items-center lg:justify-between lg:gap-3">
            {steps.map((s, i) => {
              const on = step === i;
              const Icon = s.icon;
              return (
                <Fragment key={s.title}>
                  <li
                    className={`flex items-center gap-2.5 rounded-full border-[3px] border-[#09090B] py-2 pr-4 pl-2.5 transition-colors duration-300 ${
                      on ? "bg-[#6D28D9] text-white" : "bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        on ? "bg-white text-[#6D28D9]" : "bg-[#09090B] text-white"
                      }`}
                    >
                      <Icon size={17} strokeWidth={2.6} />
                    </span>
                    <span className="text-[15px] leading-tight font-bold sm:text-[16px]">
                      {tr(s.title)}
                    </span>
                  </li>
                  {i < steps.length - 1 ? (
                    <li aria-hidden="true" className="hidden flex-1 items-center lg:flex">
                      <span
                        className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                          step > i ? "bg-[#6D28D9]" : "bg-[#D4D4D8]"
                        }`}
                      />
                      <ArrowRight
                        size={18}
                        strokeWidth={3}
                        className={`-ml-1.5 shrink-0 ${step > i ? "text-[#6D28D9]" : "text-[#D4D4D8]"}`}
                      />
                    </li>
                  ) : null}
                </Fragment>
              );
            })}
          </ol>
        </motion.div>

        <div className="redes-marcas mt-7 grid gap-12 xl:grid-cols-2 xl:gap-12">
          {brands.map((brand) => (
            <article key={brand.id} className="flex flex-col items-center">
              <h3 className="mb-3 text-center leading-tight">
                <span className="block text-[17px] font-bold">@{brand.handle}</span>
                <span className="block text-[15px] font-semibold text-[#52525B]">
                  {tr(brand.name)}
                </span>
              </h3>

              <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row md:gap-3.5">
                {/* Historia: grande y nítida; al tocarla pasa a la siguiente */}
                <button
                  type="button"
                  aria-label={`${tr("Historia siguiente")} · ${brand.handle}`}
                  onClick={() => {
                    setPaused(true);
                    const next = (story + 1) % STORIES;
                    setTick(next * steps.length + steps.length - 1);
                  }}
                  className="relative aspect-[9/16] w-[250px] shrink-0 overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-[#09090B] shadow-[7px_7px_0_#6D28D9] focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none md:h-[var(--h)] md:w-auto"
                >
                  {Array.from({ length: STORIES }, (_, i) => (
                    <img
                      key={i}
                      src={`/social/ig/${brand.id}-historia-${i + 1}-540.webp`}
                      srcSet={`/social/ig/${brand.id}-historia-${i + 1}-540.webp 540w, /social/ig/${brand.id}-historia-${i + 1}-1080.webp 1080w`}
                      sizes="420px"
                      alt={`${tr("Historia de Instagram")} ${i + 1} · ${brand.handle}`}
                      aria-hidden={story !== i}
                      width={1080}
                      height={1920}
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
                </button>

                <ul className="grid w-full max-w-[340px] grid-cols-2 gap-2.5 md:w-auto md:max-w-none">
                  {Array.from({ length: POSTS }, (_, i) => (
                    <li
                      key={i}
                      className="relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-[#09090B] md:h-[calc((var(--h)_-_10px)/2)]"
                    >
                      <img
                        src={`${brand.posts}${i + 1}.webp`}
                        srcSet={`${brand.posts}${i + 1}.webp 432w, ${brand.posts}${i + 1}-864.webp 864w`}
                        sizes="280px"
                        alt={`${tr("Publicación de Instagram")} ${i + 1} · ${brand.handle}`}
                        width={864}
                        height={1080}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
