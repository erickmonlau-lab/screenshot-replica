import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accentTitle?: string;
  description?: string;
  rightSlot?: ReactNode;
  className?: string;
}

/** Heading that types itself when scrolled into view (reserves its final layout). */
export function SectionHeading({
  eyebrow,
  title,
  accentTitle,
  description,
  rightSlot,
  className = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const full = accentTitle ? `${title} ${accentTitle}` : title;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(full.length);
      return;
    }
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= full.length) window.clearInterval(id);
    }, 34);
    return () => window.clearInterval(id);
  }, [inView, full, reduce]);

  const renderPart = (text: string, start: number, accent: boolean) => {
    const typed = Math.max(0, Math.min(text.length, count - start));
    const hasCursor = count >= start && count <= start + text.length;
    return (
      <span className={accent ? "t-accent" : undefined} aria-hidden="true">
        {text.slice(0, typed)}
        {hasCursor ? (
          <span className="animate-cursor-blink mx-px inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-[#0044FF] align-baseline" />
        ) : null}
        <span className="invisible">{text.slice(typed)}</span>
      </span>
    );
  };

  return (
    <div
      className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8 ${className}`}
    >
      <div className="max-w-3xl">
        <p className="t-muted mb-2.5 font-mono text-[10.5px] font-bold tracking-[0.28em] uppercase">
          {eyebrow}
        </p>
        <h2
          ref={ref}
          aria-label={full}
          className="t-ink font-display text-[28px] leading-[1.04] font-extrabold tracking-[-0.035em] sm:text-4xl lg:text-[38px] 2xl:text-[52px]"
        >
          {renderPart(title, 0, false)}
          {accentTitle ? (
            <>
              <span aria-hidden="true"> </span>
              {renderPart(accentTitle, title.length + 1, true)}
            </>
          ) : null}
        </h2>
        {description ? (
          <p className="t-muted mt-2.5 max-w-2xl text-[13px] leading-relaxed sm:text-sm 2xl:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}
