import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface StackTool {
  name: string;
  category: string;
  color: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const groups = [
  {
    id: "web",
    word: "WEB",
    sub: "Webs y SEO",
    line: "Webs rápidas, tipadas y pensadas para posicionar.",
    names: ["React", "TypeScript", "Next / Vite", "Tailwind"],
  },
  {
    id: "cms",
    word: "CMS",
    sub: "Tiendas y diseño",
    line: "Tiendas, gestores de contenido y diseño de interfaces.",
    names: ["WordPress", "Shopify", "Figma", "Canva"],
  },
  {
    id: "erp",
    word: "ERP",
    sub: "Sistemas y datos",
    line: "Sistemas internos conectados por APIs y webhooks.",
    names: ["APIs / Hooks", "React", "TypeScript"],
  },
  {
    id: "ia",
    word: "IA",
    sub: "Flujos y modelos",
    line: "Flujos autónomos y modelos de lenguaje con contexto de empresa.",
    names: ["n8n", "Agentes IA", "Claude Skills", "Gemini", "ChatGPT", "Obsidian"],
  },
];

const POSTER = [
  { box: "border-[#09090B] bg-[#0044FF] text-white" },
  { box: "border-[#09090B] bg-white text-[#09090B]" },
  { box: "border-[#09090B] bg-[#E3E5E9] text-[#09090B]" },
  { box: "border-white bg-[#09090B] text-white" },
] as const;

const fan = [
  "md:-rotate-[5deg] md:translate-y-4",
  "md:-rotate-[1.6deg]",
  "md:rotate-[1.6deg]",
  "md:rotate-[5deg] md:translate-y-4",
];

/** "Un núcleo común. Tu sector encima." equivalent: tabs that swap the tool wall. */
export function StackSwitcher({ tools }: { tools: StackTool[] }) {
  const [active, setActive] = useState(groups[0]!.id);
  const rowRef = useRef<HTMLDivElement>(null);
  const flips = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const update = () => {
      const row = rowRef.current;
      if (!row) return;
      const r = row.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.92 - r.top) / (window.innerHeight * 0.55)),
      );
      flips.current.forEach((el, i) => {
        if (!el) return;
        const t = Math.min(1, Math.max(0, p * 1.6 - i * 0.2));
        el.style.transform = `rotateY(${(1 - ease(t)) * 180}deg)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const group = groups.find((g) => g.id === active) ?? groups[0]!;
  const shown = group.names
    .map((n) => tools.find((t) => t.name === n))
    .filter((t): t is StackTool => Boolean(t));

  return (
    <div>
      <div
        ref={rowRef}
        role="tablist"
        aria-label="Grupos de herramientas"
        className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
      >
        {groups.map((g, i) => {
          const on = g.id === active;
          return (
            <div
              key={g.id}
              className={`transition-transform duration-500 ${fan[i]} ${on ? "md:!rotate-0 md:!-translate-y-3" : ""} md:hover:!rotate-0 md:hover:!-translate-y-4`}
              style={{ perspective: 1200 }}
            >
              <div
                ref={(el) => {
                  flips.current[i] = el;
                }}
                className="relative h-[220px] md:h-[330px]"
                style={{ transformStyle: "preserve-3d", transform: "rotateY(180deg)" }}
              >
                <button
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(g.id)}
                  className={`${POSTER[i]!.box} group absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[18px] border-[3px] p-5 text-left transition-shadow duration-300 md:p-6 [backface-visibility:hidden] ${
                    on ? "shadow-[12px_12px_0_#ffffff]" : "shadow-[7px_7px_0_#0044FF]"
                  }`}
                >
                  <span className="flex items-center justify-between text-base font-bold">
                    <span>0{i + 1}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[15px] ${on ? "bg-[#FFD60A] text-[#09090B]" : "opacity-0"}`}
                    >
                      Elegido
                    </span>
                  </span>
                  <span className="font-display block text-[clamp(3.6rem,8.2vw,8rem)] leading-[0.8] font-bold tracking-[-0.07em]">
                    {g.word}
                  </span>
                  <span className="text-lg font-semibold">{g.sub}</span>
                </button>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[18px] border-[3px] border-[#09090B] bg-[#0B0D14] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{
                    backgroundImage:
                      "repeating-radial-gradient(circle at 50% 50%, #0044FF 0 3px, transparent 3px 16px)",
                  }}
                >
                  <span className="font-display flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F4EAD0] bg-[#0B0D14] text-2xl font-bold text-[#F4EAD0]">
                    ER
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-12 max-w-[40ch] text-xl leading-snug font-semibold tracking-[-0.02em] text-white sm:text-2xl">
            {group.line}
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {shown.map((t) => {
              const Icon = t.icon;
              return (
                <li
                  key={t.name}
                  className="flex flex-col items-center gap-3 rounded-[20px] border-2 border-white bg-[#111114] px-3 py-6 text-center shadow-[5px_5px_0_#0044FF] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#09090B]"
                    style={{ borderBottom: `3px solid ${t.color}` }}
                  >
                    {Icon ? (
                      <Icon size={26} style={{ color: t.color }} />
                    ) : (
                      <span className="text-base font-bold" style={{ color: t.color }}>
                        {t.label.slice(0, 3)}
                      </span>
                    )}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-[-0.02em] text-white">
                    {t.name}
                  </span>
                  <span className="text-[15px] font-medium text-zinc-400">{t.category}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
