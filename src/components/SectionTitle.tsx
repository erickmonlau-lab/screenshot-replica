import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Bracket label + giant outlined word, e.g. "[ 01 — MÉTODO ]" over "MÉTODO". */
export function SectionTitle({
  index,
  label,
  word,
  center = false,
  className = "",
}: {
  index: string;
  label: string;
  word: string;
  center?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const words = word.split(" ");

  return (
    <div ref={ref} className={`mb-8 sm:mb-10 ${center ? "text-center" : ""} ${className}`}>
      <p className="t-muted mb-3 font-mono text-[12px] font-bold tracking-[0.18em] uppercase sm:text-[13px]">
        [ {index} — {label} ]
      </p>
      <div
        aria-hidden="true"
        className="outline-title font-display text-[clamp(2.6rem,11vw,10.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase"
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "110%" }}
              animate={inView || reduce ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? "\u00a0" : ""}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}
