import { motion } from "framer-motion";

interface DrawnProps {
  className?: string;
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ScribbleUnderline({
  className = "w-full h-3.5 text-[#F59E0B]",
}: DrawnProps) {
  return (
    <svg
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={`pointer-events-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <motion.path
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        strokeWidth={4.5}
        d="M3 10 C68 3 158 3 297 7 C205 10 112 13 22 17 C108 15 196 14 282 15"
      />
    </svg>
  );
}

export function HandDrawnArrow({
  className = "w-16 h-11 text-[#F59E0B]",
}: DrawnProps) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <motion.path
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        strokeWidth={3.2}
        d="M112 12 C86 6 66 20 72 36 C78 50 98 42 90 29 C82 17 56 27 42 46 C32 58 20 63 8 65"
      />
      <motion.path
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.85, duration: 0.3 }}
        strokeWidth={3.2}
        d="M20 53 L7 65 L23 73"
      />
    </svg>
  );
}

export function HandDrawnCircle({
  className = "pointer-events-none absolute -inset-x-5 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+40px)] overflow-visible text-[#F59E0B]",
}: DrawnProps) {
  return (
    <svg
      viewBox="0 0 260 110"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.15, ease: "easeInOut" }}
        strokeWidth={3.5}
        d="M28 18 C75 4 195 3 234 22 C262 36 258 76 220 90 C168 106 60 105 22 86 C-4 72 -3 32 32 16 C65 4 140 5 190 12"
      />
    </svg>
  );
}

export function SignatureSpark({
  className = "w-7 h-7 text-[#F59E0B]",
}: DrawnProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <motion.path
        {...strokeProps}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        strokeWidth={3}
        d="M18 3 L18 11 M18 25 L18 33 M3 18 L11 18 M25 18 L33 18 M7.5 7.5 L13 13 M23 23 L28.5 28.5 M28.5 7.5 L23 13 M13 23 L7.5 28.5"
      />
    </svg>
  );
}
