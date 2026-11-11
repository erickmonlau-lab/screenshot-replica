import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bot, BrainCircuit, Check, FileText, Send } from "lucide-react";

export function Magnetic({
  children,
  className,
  spotlight = false,
}: {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 18 });
  const sy = useSpring(y, { stiffness: 100, damping: 18 });
  const lightX = useMotionValue(0),
    lightY = useMotionValue(0);
  const [active, setActive] = useState(false);
  return (
    <motion.div
      className={className}
      data-magnetic="true"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / 24);
        y.set((e.clientY - rect.top - rect.height / 2) / 24 - 7);
        lightX.set(e.clientX - rect.left);
        lightY.set(e.clientY - rect.top);
        setActive(true);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
        setActive(false);
      }}
    >
      {spotlight && (
        <motion.div
          aria-hidden="true"
          className="cursor-spotlight"
          style={{ x: lightX, y: lightY }}
          animate={{ opacity: active ? 1 : 0 }}
        />
      )}
      {children}
    </motion.div>
  );
}

export function AgentFlow() {
  const reduced = useReducedMotion();
  return (
    <div className="flow">
      {[Send, Bot, Check].map((Icon, i) => (
        <div className="flow-step" key={i}>
          {i > 0 && (
            <div className="flow-line">
              <motion.span
                className="flow-packet"
                animate={reduced ? {} : { y: [0, 42], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.7 }}
              />
            </div>
          )}
          <motion.div
            className="flow-node"
            animate={
              reduced
                ? {}
                : {
                    scale: [1, 1.055, 1],
                    boxShadow: [
                      "0 0 0 0 var(--motion-clear)",
                      "0 0 0 8px var(--motion-ring)",
                      "0 0 0 0 var(--motion-clear)",
                    ],
                  }
            }
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.7 }}
          >
            <Icon size={20} />
            {["Una tarea, un objetivo", "Agente autónomo", "Resultado, conectado"][i]}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function ModelCycle() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  useEffect(() => {
    if (reduced || !visible) return;
    const timer = setInterval(() => setActive((n) => (n + 1) % 4), 2200);
    return () => clearInterval(timer);
  }, [reduced, visible]);
  return (
    <div ref={ref} className="model-list" data-active={active}>
      {["Claude + Skills", "Gemini", "ChatGPT", "Perplexity"].map((name, i) => (
        <motion.span
          key={name}
          className={active === i ? "model-active" : ""}
          animate={{ scale: active === i && !reduced ? 1.06 : 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        >
          {name}
        </motion.span>
      ))}
    </div>
  );
}

export function MemoryFlow() {
  const reduced = useReducedMotion();
  return (
    <div className="brain-visual">
      <motion.div
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <FileText size={32} />
      </motion.div>
      <div className="memory-connection">
        {[0, 1, 2].map((i) => (
          <motion.span
            className="memory-packet"
            key={i}
            animate={reduced ? {} : { x: [0, 36], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>
      <motion.div
        animate={reduced ? {} : { scale: [1, 1.12, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <BrainCircuit size={44} />
      </motion.div>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, setNumber] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, {
      duration: 1.6,
      onUpdate: (n) => setNumber(Math.round(n)),
    });
    return () => controls.stop();
  }, [visible, value, reduced]);
  return (
    <span ref={ref}>
      {prefix}
      {new Intl.NumberFormat("es-ES", { useGrouping: true }).format(number)}
      {suffix}
    </span>
  );
}
