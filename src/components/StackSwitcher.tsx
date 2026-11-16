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
    label: "Webs y SEO",
    line: "Webs rápidas, tipadas y pensadas para posicionar.",
    names: ["React", "TypeScript", "Next / Vite", "Tailwind", "WordPress", "Shopify"],
  },
  {
    id: "erp",
    label: "ERP y datos",
    line: "Sistemas internos conectados por APIs y webhooks.",
    names: ["APIs / Hooks", "React", "TypeScript", "Figma", "Canva"],
  },
  {
    id: "ia",
    label: "Automatización e IA",
    line: "Flujos autónomos y modelos de lenguaje con contexto de empresa.",
    names: ["n8n", "Agentes IA", "Claude Skills", "Gemini", "ChatGPT", "Obsidian"],
  },
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
      <div role="tablist" aria-label="Grupos de herramientas" className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={g.id === active}
            onClick={() => setActive(g.id)}
            className={`rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-[0.97] sm:text-base ${
              g.id === active
                ? "border-white bg-white text-[#09090B]"
                : "border-white/30 text-white hover:border-white"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-6 max-w-[40ch] text-xl leading-snug font-semibold tracking-[-0.02em] text-white sm:text-2xl">
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
                      <span className="text-sm font-bold" style={{ color: t.color }}>
                        {t.label.slice(0, 3)}
                      </span>
                    )}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-[-0.02em] text-white">
                    {t.name}
                  </span>
                  <span className="text-[13px] font-medium text-zinc-400">{t.category}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
