import { motion } from "framer-motion";
import { Download, GraduationCap, Sparkles, Wrench } from "lucide-react";
import { HangingCard } from "./HangingCard";
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

const facts = [
  { k: "Ubicación", v: "La Sagrera, Barcelona" },
  { k: "Idiomas", v: "Español · Catalán · Inglés B2" },
  { k: "Foco", v: "Webs · ERPs · IA" },
  { k: "Modalidad", v: "Presencial o remoto" },
];

const now = [
  { icon: Wrench, k: "Construyendo", v: "Webs y ERPs a medida" },
  { icon: Sparkles, k: "Explorando", v: "Agentes IA y n8n" },
  { icon: GraduationCap, k: "Aprendiendo", v: "Second Brain en Obsidian" },
];

const tones = [
  "bg-[#0044FF] text-white",
  "bg-[#09090B] text-white",
  "bg-[#FFD60A] text-[#09090B]",
  "bg-white text-[#09090B]",
];
const tilts = ["-rotate-[0.9deg]", "rotate-[0.7deg]", "-rotate-[0.4deg]"];

/** Ticket with side notches (mask) — used for experience and studies. */
function Ticket({
  i,
  period,
  title,
  place,
  lines,
}: {
  i: number;
  period: string;
  title: string;
  place: string;
  lines: string[];
}) {
  const reduce = useReducedMotion();
  const tone = tones[i % tones.length]!;
  const notch =
    "radial-gradient(circle at 0 78px, transparent 15px, #000 16px), radial-gradient(circle at 100% 78px, transparent 15px, #000 16px)";
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
      className={`${tilts[i % tilts.length]} transition-transform duration-300 hover:-translate-y-2 hover:rotate-0`}
    >
      <div
        className={`${tone} rounded-[20px] border-2 border-[#09090B] px-6 pt-6 pb-7 shadow-[6px_6px_0_#09090B]`}
        style={{
          WebkitMaskImage: notch,
          maskImage: notch,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <p className="text-base font-semibold tracking-[0.06em] uppercase opacity-80">{period}</p>
        <h4 className="font-display mt-3 text-[26px] leading-[1.05] font-bold tracking-[-0.035em]">
          {title}
        </h4>
        <p className="mt-2 text-lg font-semibold opacity-90">{place}</p>
        <div className="my-5 border-t-2 border-dashed border-current opacity-30" />
        <ul className="space-y-2.5">
          {lines.map((l) => (
            <li key={l} className="text-base leading-snug font-medium opacity-95">
              {l}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function AboutSection({
  experience,
  education,
  pills,
  cvUrl,
}: {
  experience: Job[];
  education: Study[];
  pills: string[];
  cvUrl: string;
}) {
  return (
    <div>
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <HangingCard width={250} className="mx-auto lg:mx-0 lg:-ml-8" />
        </div>

        <div className="lg:col-span-8">
          <p className="t-ink font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
            Combino desarrollo web e IA con base sólida en marketing digital y gestión
            administrativa: construyo la solución completa y la llevo a producción sin depender de
            intermediarios.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {facts.map((f) => (
              <div
                key={f.k}
                className="rounded-2xl border-2 border-[#09090B] bg-[#09090B] px-5 py-4 text-white shadow-[5px_5px_0_#0044FF]"
              >
                <dt className="text-base font-semibold text-zinc-400">{f.k}</dt>
                <dd className="font-display mt-1 text-xl leading-tight font-bold tracking-[-0.02em]">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {now.map(({ icon: I, k, v }) => (
              <div key={k} className="flex items-start gap-3">
                <I size={22} className="mt-1 shrink-0 text-[#0044FF]" />
                <div>
                  <p className="t-ink text-lg font-bold">{k}</p>
                  <p className="t-muted text-base leading-snug font-medium">{v}</p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {pills.map((p) => (
              <li
                key={p}
                className="t-line t-bg-card t-ink rounded-full border px-4 py-1.5 text-base font-semibold"
              >
                {p}
              </li>
            ))}
          </ul>

          <a
            href={cvUrl}
            download="Erick-Rodriguez-CV.pdf"
            className="t-bg-ink t-on-ink mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
          >
            <span>Descargar CV completo</span>
            <Download size={18} />
          </a>
        </div>
      </div>

      <h3 className="t-ink font-display mt-20 mb-8 text-[clamp(2rem,4vw,3.4rem)] leading-none font-bold tracking-[-0.045em]">
        Experiencia
      </h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {experience.map((e, i) => (
          <Ticket key={e.role} i={i} period={e.period} title={e.role} place={e.place} lines={e.points} />
        ))}
      </div>

      <h3 className="t-ink font-display mt-20 mb-8 text-[clamp(2rem,4vw,3.4rem)] leading-none font-bold tracking-[-0.045em]">
        Formación
      </h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {education.map((e, i) => (
          <Ticket
            key={e.title}
            i={i + 2}
            period={e.period}
            title={e.title}
            place={e.place}
            lines={[e.summary]}
          />
        ))}
      </div>
    </div>
  );
}
