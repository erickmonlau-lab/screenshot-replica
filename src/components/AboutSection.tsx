import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Check,
  BadgeCheck,
  Download,
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

function CardLabel({
  icon: I,
  children,
  className = "",
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-1.5 text-[16px] font-extrabold tracking-[0.05em] text-[#6D28D9] uppercase ${className}`}
    >
      <I size={18} strokeWidth={2.8} />
      {children}
    </p>
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
      name: "Marketing digital",
      study: education[0],
      job: experience[0],
      points: experience[0]?.points ?? [],
    },
    {
      name: "Gestión administrativa",
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
    "border-b-[3px] border-[#09090B] bg-[#A78BFA] text-[#09090B]",
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

        <div className="mt-9 grid grid-rows-[repeat(4,auto)] gap-x-5 gap-y-0 min-[1150px]:grid-cols-3 max-[1149px]:gap-y-5">
          {pillars.map((p, i) => {
            const Icon = icons[i]!;
            const hoursSrc = `${p.job?.period ?? ""} ${p.study?.title ?? ""}`;
            const hours = /(\d+)\s*h/.exec(hoursSrc)?.[1];
            const studyTitle = (p.study?.title ?? "").replace(/\s*\(\d+\s*h\)/, "");
            const period = (p.job?.period ?? "").replace(/\s*·\s*\d+\s*h/, "");
            const last = i === 2;
            return (
              <motion.article
                key={p.name}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="row-span-4 grid grid-rows-subgrid overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[7px_7px_0_#09090B]"
              >
                <div className={`flex flex-col gap-1.5 px-3.5 py-3 ${heads[i]}`}>
                  <h3 className="font-display flex items-center gap-2 text-[20px] leading-none font-bold tracking-[-0.03em] whitespace-nowrap">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-[3px] border-[#09090B] bg-white text-[#09090B]">
                      <Icon size={18} strokeWidth={2.6} />
                    </span>
                    {tr(p.name)}
                  </h3>
                  {hours ? (
                    <p className="flex items-baseline gap-2 leading-none">
                      <span className="font-display text-[28px] font-bold tracking-[-0.04em]">
                        {hours} h
                      </span>
                      <span className="text-[16px] font-bold">
                        {tr(last ? "formación" : "prácticas")}
                      </span>
                    </p>
                  ) : null}
                </div>
                <div className="px-5 pt-5">
                  <CardLabel icon={GraduationCap}>{tr("Formación")}</CardLabel>
                  <p className="mt-1 text-[17px] leading-snug font-bold">{tr(studyTitle)}</p>
                  <p className="text-[15px] font-semibold text-[#09090B]">
                    {tr(p.study?.place ?? "")}
                  </p>
                </div>
                {p.job ? (
                  <div className="px-5 pt-4 pb-4">
                    <CardLabel icon={Briefcase}>{tr("Experiencia")}</CardLabel>
                    <p className="mt-1 text-[17px] leading-snug font-bold">{tr(p.job.role)}</p>
                    <p className="text-[15px] font-semibold text-[#09090B]">{tr(p.job.place)}</p>
                    {period ? (
                      <span className="mt-1.5 inline-block rounded-md border-2 border-[#09090B] bg-[#F4F4F5] px-2 py-0.5 text-[15px] font-bold whitespace-nowrap text-[#09090B]">
                        {period.replace(/\s*—\s*/, "–")}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="px-5 pt-4 pb-4">
                    <CardLabel icon={BadgeCheck}>{tr("Reconocimiento")}</CardLabel>
                    <p className="mt-1 text-[17px] leading-snug font-bold">
                      {tr("Acreditación oficial")}
                    </p>
                    <p className="text-[15px] font-semibold text-[#09090B]">
                      {tr("Generalitat de Catalunya")}
                    </p>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {["2025–2026", tr("375 horas")].map((c) => (
                        <span
                          key={c}
                          className="inline-block rounded-md border-2 border-[#09090B] bg-[#F4F4F5] px-2 py-0.5 text-[15px] font-bold whitespace-nowrap text-[#09090B]"
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                <div className="px-5 pb-5">
                  <div className="border-t-[3px] border-[#09090B] pt-3.5">
                    {last ? (
                      <CardLabel icon={GraduationCap} className="mb-2">
                        {tr("Qué cubre")}
                      </CardLabel>
                    ) : null}
                    <ul className="space-y-2">
                      {p.points.slice(0, last ? 3 : 2).map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2.5 text-[16px] leading-snug font-semibold text-[#09090B] [text-wrap:pretty]"
                        >
                          <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-white">
                            <Check size={12} strokeWidth={4} />
                          </span>
                          {tr(pt)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
