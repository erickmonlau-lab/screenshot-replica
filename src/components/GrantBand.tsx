import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BadgeCheck, Coins, UserPlus } from "lucide-react";
import { useReducedMotion } from "./motion-pref";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: UserPlus,
    title: "Me contratas",
    text: "Sumas un perfil de marketing, gestión e IA.",
  },
  {
    icon: BadgeCheck,
    title: "Acreditación oficial",
    text: "Agente del Cambio Tecnológico, Generalitat de Catalunya.",
  },
  {
    icon: Coins,
    title: "Subvención salarial directa",
    text: "Para digitalización e inteligencia artificial.",
  },
];

/** Subvención salarial: sección violeta con el camino de la contratación en tres pasos. */
export function GrantBand() {
  const reduce = useReducedMotion();
  const { tr } = useLanguage();
  return (
    <section
      id="subvencion"
      className="scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#6D28D9] py-14 text-white sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border-[3px] border-[#09090B] bg-white px-4 py-1.5 text-[15px] font-bold tracking-[0.08em] text-[#09090B] uppercase shadow-[4px_4px_0_#09090B]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#09090B] bg-[#6D28D9]" />
            {tr("Subvenciones salariales directas")}
          </span>
          <h2 className="font-display mt-7 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.04] font-bold tracking-[-0.05em]">
            {tr("Contratarme puede abrirle a tu empresa")}
            <span className="mt-2 block">
              <span className="rounded-lg bg-[#09090B] px-3 pt-1 pb-1.5 leading-[1.3] lg:whitespace-nowrap [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                {tr("subvenciones salariales.")}
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-[50ch] text-lg leading-snug font-semibold [text-wrap:balance] sm:text-xl">
            {tr(
              "Tengo la acreditación oficial de la Generalitat como Agente del Cambio Tecnológico. Por eso, la empresa que me contrate puede acceder a subvenciones salariales directas para digitalización e inteligencia artificial.",
            )}
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex min-h-[54px] items-center gap-2 rounded-full border-[3px] border-[#09090B] bg-white px-8 py-3.5 text-base font-bold text-[#09090B] shadow-[6px_6px_0_#09090B] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090B]"
          >
            <span>{tr("Consultar contratación")}</span>
            <ArrowUpRight size={18} strokeWidth={2.8} />
          </a>
        </motion.div>

        <div className="lg:col-span-6">
          <ol className="mx-auto flex max-w-[600px] flex-col items-stretch">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              const Icon = s.icon;
              return (
                <li key={s.title} className="flex flex-col items-center">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.2, ease: EASE }}
                    className={`flex w-full items-center gap-4 rounded-[20px] border-[3px] border-[#09090B] p-5 shadow-[8px_8px_0_#09090B] sm:p-6 ${
                      last ? "bg-[#F59E0B] text-[#09090B]" : "bg-white text-[#09090B]"
                    }`}
                  >
                    <span
                      className={`font-display flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#09090B] text-[34px] leading-none font-bold ${
                        last ? "bg-[#09090B] text-white" : "bg-[#6D28D9] text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-[clamp(1.4rem,1.9vw,1.8rem)] leading-tight font-bold tracking-[-0.03em]">
                        {tr(s.title)}
                      </span>
                      <span
                        className={`mt-1 block text-[18px] leading-snug font-semibold [text-wrap:balance] ${
                          last ? "text-[#09090B]" : "text-[#3F3F46]"
                        }`}
                      >
                        {tr(s.text)}
                      </span>
                    </span>
                    <Icon
                      size={44}
                      strokeWidth={2.4}
                      className={`hidden shrink-0 sm:block ${last ? "text-[#09090B]" : "text-[#6D28D9]"}`}
                    />
                  </motion.div>
                  {last ? null : (
                    <ArrowDown size={40} strokeWidth={3.5} className="my-2 text-[#09090B]" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
