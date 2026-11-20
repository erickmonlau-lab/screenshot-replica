import { motion } from "framer-motion";
import {
  Briefcase,
  Check,
  BadgeCheck,
  Download,
  Globe,
  GraduationCap,
  Megaphone,
  ClipboardList,
} from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { HangingCard } from "./HangingCard";
import { SectionTitle } from "./SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

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

/** Temas de la acreditación oficial (solo formación). */
const accreditationTopics = ["Transformación digital", "Automatización de procesos", "IA aplicada"];

function Flag({ code }: { code: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 30 20"
      className="h-[26px] w-[39px] rounded-[4px] border-2 border-[#09090B]"
    >
      {code === "es" ? (
        <>
          <rect width="30" height="20" fill="#C8102E" />
          <rect y="5" width="30" height="10" fill="#FCD116" />
        </>
      ) : code === "ca" ? (
        <>
          <rect width="30" height="20" fill="#FCD116" />
          <g fill="#C8102E">
            <rect y="2.22" width="30" height="2.22" />
            <rect y="6.67" width="30" height="2.22" />
            <rect y="11.11" width="30" height="2.22" />
            <rect y="15.56" width="30" height="2.22" />
          </g>
        </>
      ) : (
        <>
          <rect width="30" height="20" fill="#1F3A8A" />
          <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="3.4" />
          <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
          <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="3.4" />
        </>
      )}
    </svg>
  );
}

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
  const { tr } = useLanguage();
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
      name: "Acreditación",
      study: education[2],
      job: undefined,
      points: accreditationTopics,
    },
  ];

  const icons = [Megaphone, ClipboardList, BadgeCheck];
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
            <span>{tr("Descargar CV completo")}</span>
            <Download size={18} />
          </a>
          <div className="w-full">
            <p className="mb-2 flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
              <Globe size={17} strokeWidth={2.6} />
              {tr("Idiomas")}
            </p>
            <ul className="grid grid-cols-3 gap-2.5">
              {[
                { name: "Español", flag: "es" },
                { name: "Català", flag: "ca" },
                { name: "English", flag: "en" },
              ].map((l) => (
                <li
                  key={l.name}
                  className="flex flex-col items-center gap-1.5 rounded-xl border-[3px] border-[#09090B] bg-white px-1 py-2 shadow-[3px_3px_0_#09090B]"
                >
                  <Flag code={l.flag} />
                  <span className="text-[15px] leading-none font-bold">{l.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[15px] font-semibold text-[#52525B]">
              {tr("Español y Català: nativos")}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 sm:pt-6">
        <SectionTitle
          compact
          word={tr("Sobre mí")}
          sub={tr("Perfil híbrido.")}
          accent={tr("Negocio + IA.")}
        />

        <p className="t-ink font-display max-w-[52ch] text-[clamp(1.4rem,2vw,1.85rem)] leading-[1.15] font-bold tracking-[-0.035em]">
          {tr(
            "No vengo del código: vengo del marketing y la gestión. Con la IA construyo lo que tu negocio necesita de verdad.",
          )}
        </p>

        <div className="mt-6 grid gap-5 min-[1150px]:grid-cols-3">
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
                className="@container flex flex-col overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[7px_7px_0_#09090B]"
              >
                <div
                  className={`flex flex-col items-start gap-2 px-4 py-3 @[280px]:flex-row @[280px]:items-center @[280px]:justify-between ${heads[i]}`}
                >
                  <h3 className="font-display flex shrink-0 items-center gap-2 text-[22px] leading-none font-bold tracking-[-0.04em]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-[3px] border-[#09090B] bg-white text-[#09090B]">
                      <Icon size={20} strokeWidth={2.6} />
                    </span>
                    {tr(p.name)}
                  </h3>
                  {hours ? (
                    <span className="shrink-0 leading-none @[280px]:text-right">
                      <span className="font-display block text-[26px] font-bold tracking-[-0.04em]">
                        {hours} h
                      </span>
                      <span className="text-[15px] font-semibold opacity-90">
                        {tr(i === 2 ? "formación" : "prácticas")}
                      </span>
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-3.5 p-5">
                  <div>
                    <p className="flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                      <GraduationCap size={17} strokeWidth={2.6} />
                      {tr("Formación")}
                    </p>
                    <p className="mt-1 text-[17px] leading-snug font-bold">{tr(studyTitle)}</p>
                    <p className="text-[15px] font-semibold text-[#52525B]">
                      {tr(p.study?.place ?? "")}
                    </p>
                  </div>
                  {p.job ? (
                    <div>
                      <p className="flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                        <Briefcase size={17} strokeWidth={2.6} />
                        {tr("Experiencia")}
                      </p>
                      <p className="mt-1 text-[17px] leading-snug font-bold">{tr(p.job.role)}</p>
                      <p className="text-[15px] font-semibold text-[#52525B]">{tr(p.job.place)}</p>
                      {period ? (
                        <span className="mt-1.5 inline-block rounded-md border-2 border-[#09090B] bg-[#F4F4F5] px-2 py-0.5 text-[15px] font-bold whitespace-nowrap text-[#09090B]">
                          {period.replace(/\s*—\s*/, "–")}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  {i === 2 ? (
                    <div className="flex flex-1 flex-col">
                      <p className="mb-2.5 flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                        <GraduationCap size={17} strokeWidth={2.6} />
                        {tr("Qué cubre")}
                      </p>
                      <ul className="flex flex-1 flex-col gap-2.5">
                        {p.points.map((pt) => (
                          <li
                            key={pt}
                            className="font-display flex flex-1 items-center gap-2.5 rounded-xl border-[3px] border-[#09090B] bg-[#F4F4F5] px-3 py-2 text-[18px] leading-tight font-bold tracking-[-0.02em] shadow-[3px_3px_0_#09090B]"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-white">
                              <Check size={15} strokeWidth={4} />
                            </span>
                            {tr(pt)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="mt-auto border-t-[3px] border-[#09090B] pt-3.5">
                      {i === 2 ? (
                        <p className="mb-2 flex items-center gap-1.5 text-[15px] font-bold tracking-[0.06em] text-[#6D28D9] uppercase">
                          <GraduationCap size={17} strokeWidth={2.6} />
                          {tr("Qué cubre")}
                        </p>
                      ) : null}
                      <ul className="space-y-2">
                        {p.points.slice(0, i === 2 ? 3 : 2).map((pt) => (
                          <li
                            key={pt}
                            className="flex items-start gap-2.5 text-[15px] leading-snug font-semibold text-[#27272A] [text-wrap:pretty]"
                          >
                            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-white">
                              <Check size={12} strokeWidth={4} />
                            </span>
                            {tr(pt)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
