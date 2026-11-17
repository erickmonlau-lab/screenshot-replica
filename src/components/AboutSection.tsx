import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useReducedMotion } from "./motion-pref";

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

const facts = ["La Sagrera, Barcelona", "Español · Catalán · Inglés B2"];

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
      job: undefined,
      points: techPoints,
    },
  ];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <div className="relative overflow-hidden rounded-[24px] border-[3px] border-[#09090B] bg-[#0044FF] shadow-[10px_10px_0_#09090B]">
          <img
            src="/erick-portrait-studio.png"
            alt="Erick Rodríguez"
            loading="lazy"
            className="mx-auto mt-6 h-[330px] w-auto max-w-none object-contain object-bottom"
          />
          <div className="flex items-center gap-2.5 border-t-[3px] border-[#09090B] bg-[#09090B] px-4 py-3">
            <span className="led-dot h-2.5 w-2.5 rounded-full" />
            <span className="font-display text-[20px] leading-none font-bold tracking-[-0.03em] text-white">
              Erick Rodríguez
            </span>
          </div>
        </div>

        <ul className="mt-6 grid gap-2.5">
          {facts.map((f) => (
            <li
              key={f}
              className="led-chip rounded-xl px-4 py-2.5 text-[17px] leading-tight font-bold"
            >
              {f}
            </li>
          ))}
        </ul>

        <a
          href={cvUrl}
          download="Erick-Rodriguez-CV.pdf"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-7 py-3.5 text-base font-semibold text-white shadow-[4px_4px_0_#0044FF] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#0044FF]"
        >
          <span>Descargar CV completo</span>
          <Download size={18} />
        </a>
      </div>

      <div className="lg:col-span-9">
        <p className="t-ink font-display max-w-[36ch] text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.12] font-bold tracking-[-0.035em]">
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
              className="led-box flex flex-col p-5 text-white"
            >
              <h3 className="font-display flex items-center gap-2.5 text-[28px] leading-none font-bold tracking-[-0.04em]">
                <span className="led-dot h-3 w-3 rounded-full" />
                {p.name}
              </h3>
              <div className="mt-4 flex flex-1 flex-col gap-3">
                <p className="text-[16px] leading-snug font-bold">
                  {p.study?.title}
                  <span className="block text-[15px] font-semibold text-[#B4B8C2]">
                    {p.study?.place}
                  </span>
                </p>
                {p.job ? (
                  <p className="text-[16px] leading-snug font-bold text-[#9DB8FF]">
                    {p.job.role}
                    <span className="block text-[15px] font-semibold text-[#B4B8C2]">
                      {p.job.place} · {p.job.period}
                    </span>
                  </p>
                ) : null}
                <ul className="mt-auto space-y-1.5 border-t-2 border-[#1B2A66] pt-3 text-[15px] leading-snug font-medium text-[#D4D4D8]">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
