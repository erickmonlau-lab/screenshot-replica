import { motion } from "framer-motion";
import { Download } from "lucide-react";
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

  const heads = [
    "bg-[#6D28D9] text-white",
    "bg-[#09090B] text-white",
    "bg-white text-[#09090B] border-b-[3px] border-[#09090B]",
  ];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
      {/* Tarjeta colgante: cuelga del borde superior de la sección */}
      <div className="flex justify-center lg:justify-start">
        <HangingCard width={250} seg={5} bottom={24} spread={70} />
      </div>

      <div className="pt-6 sm:pt-10">
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
          {pillars.map((p, i) => (
            <motion.article
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="flex flex-col overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[7px_7px_0_#09090B]"
            >
              <h3
                className={`font-display flex items-baseline justify-between gap-3 px-5 py-3 text-[28px] leading-none font-bold tracking-[-0.04em] ${heads[i]}`}
              >
                {p.name}
                <span className="text-[18px] opacity-80">0{i + 1}</span>
              </h3>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-[16px] leading-snug font-bold">
                  {p.study?.title}
                  <span className="block text-[15px] font-semibold text-[#52525B]">
                    {p.study?.place}
                  </span>
                </p>
                {p.job ? (
                  <p className="text-[16px] leading-snug font-bold text-[#6D28D9]">
                    {p.job.role}
                    <span className="block text-[15px] font-semibold text-[#52525B]">
                      {p.job.place}{p.job.period ? ` · ${p.job.period}` : ""}
                    </span>
                  </p>
                ) : null}
                <ul className="mt-auto space-y-1.5 border-t-[3px] border-[#09090B] pt-3 text-[15px] leading-snug font-medium text-[#27272A]">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
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
    </div>
  );
}
