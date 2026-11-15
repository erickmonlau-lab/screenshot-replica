import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accentTitle?: string;
  description?: string;
  surface?: "dark" | "light";
  showCursor?: boolean;
  rightSlot?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  accentTitle,
  description,
  surface = "dark",
  showCursor = true,
  rightSlot,
  className = "",
}: SectionHeadingProps) {
  const isDark = surface === "dark";

  return (
    <div
      className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8 ${className}`}
    >
      <div className="max-w-3xl">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#0044FF]" aria-hidden="true" />
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            {eyebrow}
          </p>
        </div>

        <h2
          className={`font-display text-2xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-3xl lg:text-[34px] 2xl:text-[46px] ${
            isDark ? "text-white" : "text-[#09090B]"
          }`}
        >
          <span>{title}</span>
          {accentTitle ? (
            <span className={isDark ? "text-[#3B82F6]" : "text-[#0044FF]"}> {accentTitle}</span>
          ) : null}
          {showCursor ? (
            <span
              className="animate-cursor-blink ml-1.5 inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-[#0044FF] align-baseline"
              aria-hidden="true"
            />
          ) : null}
        </h2>

        {description ? (
          <p
            className={`mt-2.5 max-w-2xl text-[13px] leading-relaxed sm:text-sm 2xl:text-[15px] ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}
