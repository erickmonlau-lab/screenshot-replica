import { motion } from "framer-motion";
import { Briefcase, Check, Code2, Download, GraduationCap, Megaphone, ClipboardList } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { HangingCard } from "./HangingCard";
import { SectionTitle } from "./SectionTitle";

interface Job {
  period: string;
  role: string;
  place: string;
  points: string[];
}
interface Study {
  period: string;
  title: string;
  place: string;
  summary: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const techPoints = [
  "Webs a medida en React y TypeScript, con SEO técnico.",
  "ERP propio: stock, facturación y albaranes.",
  "Flujos con n8n y agentes de IA que trabajan solos.",
];

/** Perfil híbrido: tres pilares (marketing, gestión, tecnología) con su evidencia real. */
export function AboutSection({
  experience,
  education,
  cvUrl,
}: {
  experience: Job[];
  education: Study[];
  pills?: string[];
  cvUrl: string;
}) {
  const reduce = useReducedMotion();
  const pillars = [
    {
      name: "Marketing",
      study: education[0],
      job: experience[0],
      points: experience[0]?.points ?? [],
    },
    {
      name: "Gestión",
      study: education[1],
      job: experience[1],
      points: experience[1]?.points ?? [],
    },
    {
      name: "Tecnología",
      study: education[2],
      job: { period: "", role: "Proyectos propios", place: "Oderalo (ERP) · GYMVITY (app)", points: [] },
      points: techPoints,
    },
  ];

  const icons = [Megaphone, ClipboardList, Code2];
  const heads = [
    "border-b-[3px] border-[#09090B] bg-[#6D28D9] text-white",
    "border-b-[3px] border-[#09090B] bg-[#09090B] text-white",
    "border-b-[3px] border-[#09090B] bg-white text-[#09090B]",
  ];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
      {/* Tarjeta colgante: cuelga del borde superior de la sección */}
      <div className="flex flex-col items-center lg:items-start">
        <HangingCard width={250} seg={5} bottom={24} spread={70} />
        <div className="mt-2 flex flex-col items-start gap-3">
          <a
            href={cvUrl}
            download="Erick-Rodriguez-CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-[#6D28D9] px-7 py-3 text-base font-bold text-white shadow-[5px_5px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
          >
            <span>Descargar CV completo</span>
            <Download size={18} />
          </a>
          <span className="rounded-full border-[3px] border-[#09090B] bg-white px-5 py-2.5 text-[16px] font-bold text-[#09090B]">
            Español · Catalán · Inglés B2
          </span>
        </div>

      </div>

      <div className="pt-4 sm:pt-6">
        <SectionTitle
          compact
          word="Sobre mí"
          sub="Perfil híbrido."
          accent="Negocio + tecnología."
        />

        <p className="t-ink font-display max-w-[52ch] text-[clamp(1.4rem,2vw,1.85rem)] leading-[1.15] font-bold tracking-[-0.035em]">
          No soy solo programador: vengo del marketing y la gestión, y por eso construyo lo que tu
          negocio necesita de verdad.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = icons[i]!;
            const hoursSrc = `${p.job?.period ?? ""} ${p.study?.title ?? ""}`;
            const hours = /(\d+)\s*h/.exec(hoursSrc)?.[1];
            const studyTitle = (p.study?.title ?? "").replace(/\s*\(\d+\s*h\)/, "");
            const period = (p.job?.period ?? "").replace(/\s*·\s*\d+\s*h/, "");
            return (
              <motion.article
                key={p.name}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="flex flex-col overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[7px_7px_0_#09090B]"
              >
                <div className={`flex items-center justify-between gap-3 px-4 py-3 ${heads[i]}`}>
                  <h3 className="font-display flex items-center gap-2.5 text-[28px] leading-none font-bold tracking-[-0.04em]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] bg-white text-[#09090B]">
                      <Icon size={20} strokeWidth={2.6} />
                    </span>
                    {p.name}
                  </h3>
                  {hours ? (
                    <span className="text-right leading-none">
                      <span className="font-display block text-[28px] font-bold tracking-[-0.04em]">
                        {hours} h
                      </span>
                      <span className="text-[15px] font-semibold opacity-90">
                        {i === 2 ? "formación" : "prácticas"}
                      </span>
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-3.5 p-5">
                  <div>
                    <p className="flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                      <GraduationCap size={17} strokeWidth={2.6} />
                      Formación
                    </p>
                    <p className="mt-1 text-[17px] leading-snug font-bold">{studyTitle}</p>
                    <p className="text-[15px] font-semibold text-[#52525B]">{p.study?.place}</p>
                  </div>
                  {p.job ? (
                    <div>
                      <p className="flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                        <Briefcase size={17} strokeWidth={2.6} />
                        {i === 2 ? "Proyectos" : "Experiencia"}
                      </p>
                      <p className="mt-1 text-[17px] leading-snug font-bold">{p.job.role}</p>
                      <p className="text-[15px] font-semibold text-[#52525B]">
                        {p.job.place}
                        {period ? ` · ${period}` : ""}
                      </p>
                    </div>
                  ) : null}
                  <ul className="mt-auto space-y-2 border-t-[3px] border-[#09090B] pt-3.5">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-[15px] leading-snug font-semibold text-[#27272A]"
                      >
                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-white">
                          <Check size={12} strokeWidth={4} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </div>
  );
}
