import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Megaphone, ClipboardList } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Course {
  title: string;
  place: string;
}
interface Practice {
  period: string;
  role: string;
  place: string;
}

const cards = [
  {
    icon: Megaphone,
    head: "bg-[#6D28D9] text-white",
    level: "Ciclo Superior · CFGS",
    learned: [
      "Estrategia digital",
      "Posicionamiento SEO",
      "Conversión comercial",
      "Diseño de propuestas",
      "Lanzamiento de producto",
    ],
    apply:
      "Cada web que hago nace con SEO técnico y pensada para convertir, no solo para verse bien.",
  },
  {
    icon: ClipboardList,
    head: "bg-[#09090B] text-white",
    level: "Ciclo Medio · CFGM",
    learned: ["Facturación", "Albaranes", "Contabilidad", "Operativa interna de empresa"],
    apply:
      "Por eso mi ERP gestiona stock, facturación y albaranes: sé cómo se trabaja de verdad en una empresa.",
  },
];

/** Formación reglada en Monlau: qué estudié, qué aprendí y cómo lo aplico hoy. */
export function FormacionSection({
  courses,
  practices,
}: {
  courses: Course[];
  practices: Practice[];
}) {
  const reduce = useReducedMotion();
  return (
    <section
      id="formacion"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] py-14 text-white sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <p
            aria-hidden="true"
            className="font-display text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.85] font-bold tracking-[-0.03em] text-transparent uppercase [-webkit-text-stroke:3px_#FFFFFF]"
          >
            Formación
          </p>
          <h2 className="font-display max-w-[28ch] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.12] font-bold tracking-[-0.03em] sm:text-right">
            Primero aprendí cómo funciona un negocio por dentro.{" "}
            <span className="rounded-md bg-[#6D28D9] px-2 py-0.5 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
              Después, a construirle las herramientas.
            </span>
          </h2>
        </div>

        <div className="mt-9 grid gap-7 md:grid-cols-2 lg:gap-9">
          {cards.map((c, i) => {
            const course = courses[i];
            const practice = practices[i];
            const hours = /(\d+)\s*h/.exec(practice?.period ?? "")?.[1];
            const years = (practice?.period ?? "").replace(/\s*·\s*\d+\s*h/, "");
            const Icon = c.icon;
            return (
              <motion.article
                key={c.level}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="flex flex-col overflow-hidden rounded-[22px] border-[3px] border-white bg-white text-[#09090B] shadow-[9px_9px_0_#6D28D9]"
              >
                <div className={`flex items-center gap-3 px-5 py-4 ${c.head}`}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] bg-white text-[#09090B]">
                    <Icon size={24} strokeWidth={2.6} />
                  </span>
                  <span className="rounded-full border-[3px] border-white px-3.5 py-1 text-[15px] font-bold tracking-wide uppercase">
                    {c.level}
                  </span>
                  <span className="font-display ml-auto text-[22px] leading-none font-bold tracking-[-0.03em]">
                    Monlau
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.04em]">
                      {course?.title.replace(/^CF(GS|GM) en /, "")}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-2 text-[16px] font-semibold text-[#52525B]">
                      <GraduationCap size={18} strokeWidth={2.6} className="text-[#6D28D9]" />
                      {course?.place}
                    </p>
                  </div>

                  <div>
                    <p className="text-[15px] font-bold tracking-[0.08em] text-[#6D28D9] uppercase">
                      Lo que aprendí
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {c.learned.map((l) => (
                        <li
                          key={l}
                          className="rounded-full border-[3px] border-[#09090B] bg-[#F4F4F5] px-3.5 py-1 text-[16px] font-bold"
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[15px] font-bold tracking-[0.08em] text-[#6D28D9] uppercase">
                      Cómo lo aplico hoy
                    </p>
                    <p className="mt-1.5 text-[18px] leading-snug font-semibold text-[#27272A]">
                      {c.apply}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-4 rounded-2xl border-[3px] border-[#09090B] bg-[#09090B] px-4 py-3 text-white">
                    <Briefcase size={22} strokeWidth={2.6} className="shrink-0 text-[#A78BFA]" />
                    <span className="min-w-0 flex-1 text-[16px] leading-tight font-semibold">
                      <span className="block font-bold">Prácticas en {practice?.place}</span>
                      <span className="text-[#D4D4D8]">{years}</span>
                    </span>
                    {hours ? (
                      <span className="font-display text-[34px] leading-none font-bold tracking-[-0.04em]">
                        {hours}
                        <span className="ml-1 text-[20px] text-[#A78BFA]">h</span>
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
