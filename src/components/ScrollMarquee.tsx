import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotion } from "./motion-pref";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Texto en outline que corre solo y reacciona (velocidad y sentido) a la velocidad del scroll.
 * Trazo sólido: sin transparencias.
 */
export function ScrollMarquee({
  text,
  speed = -3.2,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const dt = delta / 1000;
    const b = boost.get();
    if (b < -0.08) dir.current = -1;
    else if (b > 0.08) dir.current = 1;
    const multiplier = 1 + Math.min(6, Math.abs(b));
    baseX.set(baseX.get() + dir.current * speed * dt * multiplier);
  });

  const item = (
    <span
      className={`font-display pr-12 leading-none font-bold tracking-[-0.02em] text-transparent uppercase select-none [-webkit-text-stroke:2.5px_#09090B] dark:[-webkit-text-stroke:2.5px_#FFFFFF] ${className}`}
    >
      {text}
    </span>
  );

  return (
    <motion.div
      style={{ x }}
      className="flex w-max items-center whitespace-nowrap will-change-transform"
    >
      {item}
      {item}
      {item}
      {item}
    </motion.div>
  );
}
