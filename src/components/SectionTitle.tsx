import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Bracket label + giant outlined word, e.g. "[ 01 — MÉTODO ]" over "MÉTODO". */
export function SectionTitle({
  word,
  sub,
  accent,
  center = false,
  className = "",
}: {
  sub?: string;
  accent?: string;
  index?: string;
  label?: string;
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
      <div
        aria-hidden="true"
        className="outline-title font-display text-[clamp(2.6rem,11vw,10.5rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase"
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pt-[0.24em] pb-[0.06em] align-top">
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
      {sub ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className={`t-ink font-display mt-5 max-w-[26ch] text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.05] font-bold tracking-[-0.04em] sm:max-w-[38ch] ${center ? "mx-auto" : ""}`}
        >
          {sub} {accent ? <span className="text-[#0044FF]">{accent}</span> : null}
        </motion.p>
      ) : null}
    </div>
  );
}
