import {
  animate,
  motion,
  useInView,
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
        if (e.pointerType === "touch") return;
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
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
      {children}
    </motion.div>
  );
}

export function AgentFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1150);
    return () => clearInterval(timer);
  }, [visible]);

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
                  animate={{
                    y: [0, 38],
                    opacity: [0, 1, 1, 0],
                    scale: [0.85, 1.15, 0.9],
                  }}
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
              animate={{
                scale: isCurrent ? 1.045 : 1,
                y: isCurrent ? -2 : 0,
                boxShadow: isCurrent
                  ? "0 8px 20px -6px rgba(22, 22, 22, 0.22), 0 0 0 6px rgba(238, 127, 32, 0.28)"
                  : "0 0 0 0px rgba(238, 127, 32, 0)",
              }}
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
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => setActive((n) => (n + 1) % MODELS.length), 2100);
    return () => clearInterval(timer);
  }, [visible]);

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
                scale: isSelected ? 1.05 : 1,
                y: isSelected ? -1.5 : 0,
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
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => setActiveLine((n) => (n + 1) % 3), 1300);
    return () => clearInterval(timer);
  }, [visible]);

  const lines = [
    "claude → código y arquitectura",
    "gemini → contexto y revisión",
    "deploy → verificado en producción",
  ];

  return (
    <div ref={ref} className="code-box" aria-label="Flujo de desarrollo con IA">
      {lines.map((line, i) => {
        const isCurrent = activeLine === i;
        return (
          <motion.span
            key={line}
            className={isCurrent ? "code-line-active" : ""}
            animate={{
              x: isCurrent ? 5 : 0,
              opacity: isCurrent ? 1 : 0.62,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <b>0{i + 1}</b> {line}
            {isCurrent && <i className="code-cursor" aria-hidden="true" />}
          </motion.span>
        );
      })}
    </div>
  );
}

export function MemoryFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => setActiveNode((n) => (n + 1) % 3), 1400);
    return () => clearInterval(timer);
  }, [visible]);

  const nodes = [
    { icon: FileText, label: "Notas" },
    { icon: BrainCircuit, label: "Obsidian" },
    { icon: Bot, label: "Agentes" },
  ];

  return (
    <div ref={ref} className="memory-map" aria-hidden="true" data-node={activeNode}>
      {nodes.map((node, i) => {
        const Icon = node.icon;
        const isCurrent = activeNode === i;
        return (
          <div className="memory-step" key={node.label}>
            {i > 0 && (
              <i className="memory-connector">
                <motion.span
                  className="memory-pulse"
                  animate={{ x: [-12, 34], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: (i - 1) * 0.7,
                    ease: "easeInOut",
                  }}
                />
              </i>
            )}
            <motion.span
              className={isCurrent ? "memory-node-active" : ""}
              animate={{
                scale: isCurrent ? 1.07 : 1,
                y: isCurrent ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 230, damping: 18 }}
            >
              <Icon size={16} /> {node.label}
            </motion.span>
          </div>
        );
      })}
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView) return;
    setValue(0);
    const controls = animate(0, to, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("es-ES")}
      {suffix}
    </span>
  );
}
