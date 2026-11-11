import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay, duration: 0.65 }}>{children}</motion.div>;
}

export function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, setNumber] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, { duration: 1.6, onUpdate: n => setNumber(Math.round(n)) });
    return () => controls.stop();
  }, [visible, value, reduced]);
  return <span ref={ref}>{prefix}{new Intl.NumberFormat("es-ES", { useGrouping: true }).format(number)}{suffix}</span>;
}