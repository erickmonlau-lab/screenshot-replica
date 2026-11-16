import { useState } from "react";
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

const fan = [
  "md:-rotate-[5deg] md:translate-y-4",
  "md:-rotate-[1.6deg]",
  "md:rotate-[1.6deg]",
  "md:rotate-[5deg] md:translate-y-4",
];

/** "Un núcleo común. Tu sector encima." equivalent: tabs that swap the tool wall. */
export function StackSwitcher({ tools }: { tools: StackTool[] }) {
  const [active, setActive] = useState(groups[0]!.id);
  const group = groups.find((g) => g.id === active) ?? groups[0]!;
  const shown = group.names
    .map((n) => tools.find((t) => t.name === n))
    .filter((t): t is StackTool => Boolean(t));

  return (
    <div>
      <div
        role="tablist"
        aria-label="Grupos de herramientas"
        className="grid grid-cols-2 gap-4 [perspective:1200px] md:grid-cols-4 md:gap-6"
      >
        {groups.map((g, i) => {
          const on = g.id === active;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(g.id)}
              className={`group relative flex h-[220px] flex-col justify-between overflow-hidden rounded-[18px] border-2 bg-[#1B1D24] p-5 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-4 hover:rotate-0 md:h-[380px] md:p-6 ${fan[i]} ${
                on
                  ? "-translate-y-3 border-[#F4EAD0] md:rotate-0"
                  : "border-[#3A3D48] hover:border-[#F4EAD0]"
              }`}
            >
              <span className="text-base font-semibold text-zinc-400">0{i + 1}</span>
              <span
                className={`font-display block origin-left text-[clamp(3.4rem,7.6vw,7.4rem)] leading-[0.9] font-extrabold tracking-[-0.02em] [transform:scaleX(0.76)] transition-[color,text-shadow] duration-500 ${
                  on
                    ? "text-[#F4EAD0] [text-shadow:0_0_26px_rgba(244,234,208,0.75),0_0_60px_rgba(244,234,208,0.35)]"
                    : "text-[#9A978A] [text-shadow:0_0_12px_rgba(244,234,208,0.12)] group-hover:text-[#F4EAD0] group-hover:[text-shadow:0_0_22px_rgba(244,234,208,0.6)]"
                }`}
              >
                {g.word}
              </span>
              <span className="text-lg font-semibold text-zinc-300">{g.sub}</span>
            </button>
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
          <p className="mt-10 max-w-[40ch] text-xl leading-snug font-semibold tracking-[-0.02em] text-white sm:text-2xl">
            {group.line}
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
