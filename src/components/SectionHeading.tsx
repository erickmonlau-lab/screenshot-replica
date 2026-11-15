import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "./motion-pref";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accentTitle?: string;
  description?: string;
  rightSlot?: ReactNode;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Marketing-scale heading: words rise out of a mask when scrolled into view. */
export function SectionHeading({
  eyebrow,
  title,
  accentTitle,
  description,
  rightSlot,
  className = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const full = accentTitle ? `${title} ${accentTitle}` : title;

  const words = [
    ...title.split(" ").map((w) => ({ w, accent: false })),
    ...(accentTitle ? accentTitle.split(" ").map((w) => ({ w, accent: true })) : []),
  ].filter((x) => x.w);

  return (
    <div className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10 ${className}`}>
      <div className="max-w-5xl">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#0044FF] uppercase sm:text-[13px]"
        >
          {eyebrow}
        </motion.p>
        <h2
          ref={ref}
          aria-label={full}
          className="t-ink font-display text-[clamp(2.5rem,7.2vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.045em]"
        >
          {words.map((x, i) => (
            <span
              key={`${x.w}-${i}`}
              aria-hidden="true"
              className="inline-block overflow-hidden pb-[0.1em] align-top"
            >
              <motion.span
                className={`inline-block ${x.accent ? "text-[#0044FF]" : ""}`}
                initial={reduce ? false : { y: "115%" }}
                animate={inView || reduce ? { y: 0 } : { y: "115%" }}
                transition={{ duration: 0.85, delay: i * 0.06, ease: EASE }}
              >
                {x.w}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h2>
        {description ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="t-muted mt-5 max-w-[46ch] text-lg leading-snug font-medium sm:text-xl lg:text-2xl"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}

/** Giant closing headline; each line is a block, words rise out of a mask. */
export function BigHeading({
  lines,
  className = "",
}: {
  lines: { text: string; accent?: boolean }[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <h2 ref={ref} aria-label={lines.map((l) => l.text).join(" ")} className={className}>
      {lines.map((line) => (
        <span key={line.text} aria-hidden="true" className="block">
          {line.text.split(" ").map((w, i, arr) => {
            const d = n++ * 0.08;
            return (
              <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className={`inline-block ${line.accent ? "text-[#0044FF]" : ""}`}
                  initial={reduce ? false : { y: "115%" }}
                  animate={inView || reduce ? { y: 0 } : { y: "115%" }}
                  transition={{ duration: 0.95, delay: d, ease: EASE }}
                >
                  {w}
                  {i < arr.length - 1 ? "\u00a0" : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}
