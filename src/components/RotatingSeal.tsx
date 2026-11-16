import { useId } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "./motion-pref";

/**
 * Sello con texto circular que gira despacio. El viewBox coincide con el tamaño
 * en píxeles, así que `fontSize` es el tamaño real del texto (mínimo 15 px).
 */
export function RotatingSeal({
  text,
  size = 180,
  fontSize = 15,
  duration = 22,
  className = "",
  ringClassName = "",
  children,
}: {
  text: string;
  size?: number;
  fontSize?: number;
  duration?: number;
  className?: string;
  ringClassName?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const r = size / 2 - fontSize * 1.45;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div
      className={`relative shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        aria-hidden="true"
        animate={reduce ? { rotate: 0 } : { rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          <defs>
            <path
              id={id}
              d={`M${c},${c} m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 -${2 * r},0`}
            />
          </defs>
          <text
            className={`font-bold ${ringClassName || "fill-[#09090B]"}`}
            style={{ fontSize }}
          >
            <textPath href={`#${id}`} textLength={circ - 4} lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      ) : null}
    </div>
  );
}
