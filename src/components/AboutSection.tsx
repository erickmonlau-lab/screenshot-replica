import { motion } from "framer-motion";
import { Download } from "lucide-react";
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

const tones = [
  "bg-[#0044FF] text-white",
  "bg-[#09090B] text-white",
  "bg-[#FFD60A] text-[#09090B]",
  "bg-white text-[#09090B]",
];

/** Compact ticket row with side notches. */
function MiniTicket({ i, title, meta }: { i: number; title: string; meta: string }) {
  const reduce = useReducedMotion();
  const notch =
    "radial-gradient(circle at 0 50%, transparent 11px, #000 12px), radial-gradient(circle at 100% 50%, transparent 11px, #000 12px)";
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
      className="transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div
        className={`${tones[i % tones.length]} rounded-[16px] border-2 border-[#09090B] px-6 py-3 shadow-[4px_4px_0_#09090B]`}
        style={{
          WebkitMaskImage: notch,
          maskImage: notch,
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <p className="font-display text-lg leading-tight font-bold tracking-[-0.02em]">{title}</p>
        <p className="text-[15px] leading-snug font-semibold opacity-85">{meta}</p>
      </div>
    </motion.li>
  );
}

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
  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3">
        <HangingCard width={215} seg={4} bottom={40} className="mx-auto lg:mx-0 lg:-ml-6" />
      </div>

      <div className="lg:col-span-5">
        <p className="t-ink font-display text-[clamp(1.5rem,2.2vw,2.05rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
          Combino desarrollo web e IA con base sólida en marketing digital y gestión administrativa:
          construyo la solución completa y la llevo a producción sin depender de intermediarios.
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {facts.map((f) => (
            <div
              key={f.k}
              className="rounded-2xl border-2 border-[#09090B] bg-[#09090B] px-5 py-3 text-white shadow-[4px_4px_0_#0044FF]"
            >
              <dt className="text-[15px] font-semibold text-zinc-400">{f.k}</dt>
              <dd className="font-display text-lg leading-tight font-bold tracking-[-0.02em]">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={cvUrl}
          download="Erick-Rodriguez-CV.pdf"
          className="t-bg-ink t-on-ink mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97]"
        >
          <span>Descargar CV completo</span>
          <Download size={18} />
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
        <div>
          <h3 className="t-ink font-display mb-3 text-2xl leading-none font-bold tracking-[-0.04em]">
            Experiencia
          </h3>
          <ul className="space-y-3">
            {experience.map((e, i) => (
              <MiniTicket key={e.role} i={i} title={e.role} meta={`${e.place} · ${e.period}`} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="t-ink font-display mb-3 text-2xl leading-none font-bold tracking-[-0.04em]">
            Formación
          </h3>
          <ul className="space-y-3">
            {education.map((e, i) => (
              <MiniTicket key={e.title} i={i + 2} title={e.title} meta={`${e.place} · ${e.period}`} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
