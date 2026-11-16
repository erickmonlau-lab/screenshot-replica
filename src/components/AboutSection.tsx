import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { RotatingSeal } from "./RotatingSeal";
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

const facts = [
  { k: "Ubicación", v: "La Sagrera, Barcelona" },
  { k: "Idiomas", v: "Español · Catalán · Inglés B2" },
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
      head: "bg-[#0044FF] text-white",
      shadow: "shadow-[8px_8px_0_#0044FF]",
      study: education[0]?.title ?? "",
      studyPlace: education[0]?.place ?? "",
      job: experience[0],
      points: experience[0]?.points ?? [],
    },
    {
      name: "Gestión",
      head: "bg-[#09090B] text-white",
      shadow: "shadow-[8px_8px_0_#09090B]",
      study: education[1]?.title ?? "",
      studyPlace: education[1]?.place ?? "",
      job: experience[1],
      points: experience[1]?.points ?? [],
    },
    {
      name: "Tecnología",
      head: "bg-[#FFD60A] text-[#09090B]",
      shadow: "shadow-[8px_8px_0_#0044FF]",
      study: education[2]?.title ?? "",
      studyPlace: education[2]?.place ?? "",
      job: undefined,
      points: techPoints,
    },
  ];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="flex flex-col items-center gap-6 lg:col-span-4 lg:items-start">
        <RotatingSeal
          text="MARKETING · GESTIÓN · TECNOLOGÍA · MARKETING · GESTIÓN · TECNOLOGÍA · "
          size={340}
          fontSize={17}
          duration={28}
          className="border-[3px] border-[#09090B] bg-[#FFD60A] shadow-[8px_8px_0_#09090B]"
        >
          <img
            src="/erick-portrait-studio.png"
            alt="Erick Rodríguez"
            loading="lazy"
            className="h-[224px] w-[224px] rounded-full border-[3px] border-[#09090B] bg-[#0044FF] object-cover object-top"
          />
        </RotatingSeal>

        <dl className="grid w-full max-w-[340px] gap-2.5">
          {facts.map((f) => (
            <div
              key={f.k}
              className="rounded-xl border-[3px] border-[#09090B] bg-white px-4 py-2.5 text-[#09090B] shadow-[4px_4px_0_#09090B]"
            >
              <dt className="text-[15px] font-semibold text-[#52525B]">{f.k}</dt>
              <dd className="font-display text-[18px] leading-tight font-bold tracking-[-0.02em]">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={cvUrl}
          download="Erick-Rodriguez-CV.pdf"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-7 py-3.5 text-base font-semibold text-white shadow-[4px_4px_0_#0044FF] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#0044FF] dark:border-white dark:bg-white dark:text-[#09090B]"
        >
          <span>Descargar CV completo</span>
          <Download size={18} />
        </a>
      </div>

      <div className="lg:col-span-8">
        <p className="t-ink font-display max-w-[34ch] text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.12] font-bold tracking-[-0.035em]">
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
              className={`${p.shadow} flex flex-col overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-white text-[#09090B]`}
            >
              <h3
                className={`${p.head} font-display border-b-[3px] border-[#09090B] px-5 py-3 text-[28px] leading-none font-bold tracking-[-0.04em]`}
              >
                {p.name}
              </h3>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-[16px] leading-snug font-bold">
                  {p.study}
                  <span className="block text-[15px] font-semibold text-[#52525B]">
                    {p.studyPlace}
                  </span>
                </p>
                {p.job ? (
                  <p className="text-[16px] leading-snug font-bold text-[#0044FF]">
                    {p.job.role}
                    <span className="block text-[15px] font-semibold text-[#52525B]">
                      {p.job.place} · {p.job.period}
                    </span>
                  </p>
                ) : null}
                <ul className="mt-auto space-y-1.5 border-t-2 border-[#09090B]/15 pt-3 text-[15px] leading-snug font-medium text-[#3F3F46]">
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
