import { motion } from "framer-motion";
import { BookOpen, Briefcase, ClipboardList, Megaphone, Wrench } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

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
      ["Estrategia digital", "SEO", "Conversión comercial"],
      ["Diseño de propuestas", "Lanzamiento de producto"],
    ],
    apply:
      "Cada web que hago nace con SEO técnico y pensada para convertir, no solo para verse bien.",
  },
  {
    icon: ClipboardList,
    head: "bg-[#09090B] text-white",
    level: "Ciclo Medio · CFGM",
    learned: [
      ["Facturación", "Albaranes"],
      ["Contabilidad", "Operativa interna"],
    ],
    apply:
      "Mi ERP nace aquí: en Diset vi cómo una empresa de control de plagas trabaja con su software de gestión y lo uní a lo que estudié.",
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
  const { tr } = useLanguage();
  return (
    <section
      id="formacion"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#09090B] py-10 text-white sm:py-12"
    >
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4 lg:flex-nowrap">
          <div className="flex items-center gap-4 sm:gap-5">
            <p
              aria-hidden="true"
              className="font-display text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.85] font-bold tracking-[-0.03em] text-white uppercase [text-shadow:0.045em_0.045em_0_#6D28D9]"
            >
              {tr("Formación")}
            </p>
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 160 124"
              initial={reduce ? false : { rotate: -26, y: -40, opacity: 0 }}
              whileInView={{ rotate: -9, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.3 }}
              className="h-[clamp(3.8rem,6vw,5.8rem)] w-auto shrink-0 overflow-visible"
            >
              <motion.g
                animate={{ y: reduce ? 0 : [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M42 60 v26 c0 16 76 16 76 0 v-26"
                  fill="#6D28D9"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <polygon
                  points="80,10 154,44 80,78 6,44"
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <path
                  d="M80 44 L138 60 L138 96"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="128"
                  y="94"
                  width="20"
                  height="26"
                  rx="5"
                  fill="#A78BFA"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                />
                <circle cx="80" cy="44" r="6" fill="#09090B" />
              </motion.g>
            </motion.svg>
          </div>
          <h2 className="font-display max-w-[34ch] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.5] font-bold tracking-[-0.03em] sm:text-right">
            {tr("Primero aprendí cómo funciona un negocio por dentro.")}{" "}
            <span className="mt-1 inline-block rounded-md bg-[#6D28D9] px-2 py-1 whitespace-nowrap">
              {tr("Después, a construirle las herramientas.")}
            </span>
          </h2>
        </div>

        <div className="mt-6 grid gap-7 md:grid-cols-2 lg:gap-9">
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
                    {tr(c.level)}
                  </span>
                  <span className="ml-auto text-right leading-none">
                    <span className="block text-[15px] font-bold tracking-[0.1em] uppercase opacity-90">
                      {tr("Centro")}
                    </span>
                    <span className="font-display mt-1 block text-[26px] font-bold tracking-[-0.03em]">
                      Monlau
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <h3 className="font-display text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.04em]">
                    {tr((course?.title ?? "").replace(/^CF(GS|GM) en /, ""))}
                  </h3>

                  <div>
                    <p className="font-display flex items-center gap-2 text-[20px] leading-none font-bold tracking-[-0.02em]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#09090B] text-white">
                        <BookOpen size={16} strokeWidth={2.8} />
                      </span>
                      {tr("Lo que estudié y aprendí")}
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      {c.learned.map((row) => (
                        <ul key={row.join()} className="flex flex-wrap gap-2">
                          {row.map((l) => (
                            <li
                              key={l}
                              className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#09090B] bg-white px-3 py-1 text-[16px] font-bold whitespace-nowrap shadow-[3px_3px_0_#09090B]"
                            >
                              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#6D28D9]" />
                              {tr(l)}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center rounded-2xl border-[3px] border-[#09090B] bg-[#6D28D9] px-4 py-3.5 text-white shadow-[4px_4px_0_#09090B]">
                    <p className="font-display flex items-center gap-2 text-[20px] leading-none font-bold tracking-[-0.02em]">
                      <Wrench size={20} strokeWidth={2.8} />
                      {tr("Cómo lo aplico hoy")}
                    </p>
                    <p className="mt-2 text-[19px] leading-snug font-semibold [text-wrap:balance]">
                      {tr(c.apply)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-4 rounded-2xl border-[3px] border-[#09090B] bg-[#09090B] px-4 py-3 text-white">
                    <Briefcase size={22} strokeWidth={2.6} className="shrink-0 text-[#A78BFA]" />
                    <span className="min-w-0 flex-1 text-[16px] leading-tight font-semibold">
                      <span className="block font-bold">
                        {tr("Prácticas en")} {practice?.place}
                      </span>
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
