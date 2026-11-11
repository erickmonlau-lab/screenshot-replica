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
  strength = 0.08,
}: {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 17, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 170, damping: 17, mass: 0.5 });
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);
  const smoothLightX = useSpring(lightX, { stiffness: 260, damping: 28 });
  const smoothLightY = useSpring(lightY, { stiffness: 260, damping: 28 });
  const [active, setActive] = useState(false);

  return (
    <motion.div
      className={className}
      data-magnetic="true"
      data-active={active ? "true" : "false"}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch") return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = e.clientX - rect.left - rect.width / 2;
        const centerY = e.clientY - rect.top - rect.height / 2;
        x.set(centerX * strength);
        y.set(centerY * strength);
        lightX.set(e.clientX - rect.left);
        lightY.set(e.clientY - rect.top);
        if (!active) setActive(true);
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
          style={{ x: smoothLightX, y: smoothLightY }}
          animate={{ opacity: active && !reduced ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
      {children}
    </motion.div>
  );
}

export function AgentFlow() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduced || !visible) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1150);
    return () => clearInterval(timer);
  }, [reduced, visible]);

  const labels = ["Una tarea, un objetivo", "Agente autónomo", "Resultado, conectado"];

  return (
    <div ref={ref} className="flow" data-step={activeStep}>
      {[Send, Bot, Check].map((Icon, i) => {
        const isCurrent = activeStep === i;
        return (
          <div className="flow-step" key={labels[i]}>
            {i > 0 && (
              <div className="flow-line">
                <motion.span
                  className="flow-packet"
                  animate={
                    reduced
                      ? {}
                      : {
                          y: [0, 38],
                          opacity: [0, 1, 1, 0],
                          scale: [0.85, 1.15, 0.9],
                        }
                  }
                  transition={{
                    duration: 1.35,
                    repeat: Infinity,
                    delay: (i - 1) * 0.65,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
            <motion.div
              className={`flow-node ${isCurrent ? "flow-node-active" : ""}`}
              animate={
                reduced
                  ? {}
                  : {
                      scale: isCurrent ? 1.045 : 1,
                      y: isCurrent ? -2 : 0,
                      boxShadow: isCurrent
                        ? "0 8px 20px -6px rgba(22, 22, 22, 0.22), 0 0 0 6px rgba(238, 127, 32, 0.28)"
                        : "0 0 0 0px rgba(238, 127, 32, 0)",
                    }
              }
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <Icon size={18} />
              <span>{labels[i]}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

const MODELS = [
  { name: "Claude + Skills", task: "Arquitectura, código y agentes" },
  { name: "Gemini", task: "Contexto amplio y multimodal" },
  { name: "ChatGPT", task: "Razonamiento y síntesis ágil" },
  { name: "Perplexity", task: "Investigación verificada en vivo" },
];

export function ModelCycle() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (reduced || !visible) return;
    const timer = setInterval(() => setActive((n) => (n + 1) % MODELS.length), 2100);
    return () => clearInterval(timer);
  }, [reduced, visible]);

  return (
    <div ref={ref} className="model-cycle-wrap" data-active={active}>
      <div className="model-list">
        {MODELS.map((model, i) => {
          const isSelected = active === i;
          return (
            <motion.span
              key={model.name}
              className={isSelected ? "model-active" : ""}
              onPointerEnter={() => setActive(i)}
              animate={{
                scale: isSelected && !reduced ? 1.05 : 1,
                y: isSelected && !reduced ? -1.5 : 0,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <i className="model-dot" aria-hidden="true" />
              {model.name}
            </motion.span>
          );
        })}
      </div>
      <div className="model-task-status" aria-live="off">
        <span className="model-task-indicator" />
        <span>{MODELS[active].task}</span>
      </div>
    </div>
  );
}

export function CodeFlow() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (reduced || !visible) return;
    const timer = setInterval(() => setActiveLine((n) => (n + 1) % 3), 1300);
    return () => clearInterval(timer);
  }, [reduced, visible]);

  return (
    <div ref={ref} className="code-preview" data-line={activeLine}>
      <div className={`code-line ${activeLine === 0 ? "code-line-active" : ""}`}>
        <em>const</em> idea = tuNegocio;
      </div>
      <div className={`code-line ${activeLine === 1 ? "code-line-active" : ""}`}>
        <em>await</em> crear(idea);
      </div>
      <div className={`code-line ${activeLine === 2 ? "code-line-active" : ""}`}>
        // listo para producción
        <motion.span
          aria-hidden="true"
          className="code-cursor"
          animate={reduced ? {} : { opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export function MemoryFlow() {
  const reduced = useReducedMotion();
  return (
    <div className="brain-visual">
      <motion.div
        className="memory-node memory-source"
        animate={reduced ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FileText size={30} />
      </motion.div>
      <div className="memory-connection">
        {[0, 1, 2].map((i) => (
          <motion.span
            className="memory-packet"
            key={i}
            animate={
              reduced
                ? {}
                : {
                    x: [0, 46],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1.15, 0.85],
                  }
            }
            transition={{
              duration: 1.65,
              repeat: Infinity,
              delay: i * 0.55,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.div
        className="memory-node memory-brain"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(212, 243, 74, 0)",
                  "0 0 0 10px rgba(212, 243, 74, 0.16)",
                  "0 0 0 0 rgba(212, 243, 74, 0)",
                ],
              }
        }
        transition={{ duration: 1.65, repeat: Infinity, ease: "easeInOut" }}
      >
        <BrainCircuit size={42} />
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
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        delay,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
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
      ease: [0.16, 1, 0.3, 1],
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
