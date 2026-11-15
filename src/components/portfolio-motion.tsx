import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotion } from "./motion-pref";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Bot,
  BrainCircuit,
  Check,
  Code2,
  FileCode2,
  FolderGit2,
  Layers,
  Send,
  Sparkles,
} from "lucide-react";

export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-[#0044FF] via-[#60A5FA] to-[#0044FF]"
      style={{ scaleX }}
    />
  );
}

export function MaskedText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ y: 8 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function VelocityMarqueeRow({
  children,
  baseVelocity = -1.6,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 320 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 2.2], { clamp: false });
  const reduce = useReducedMotion();

  const x = useTransform(baseX, (v) => {
    const wrapped = (((v % 50) + 50) % 50) - 50;
    return `${wrapped}%`;
  });

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = baseVelocity * (delta / 1000);
    const boost = velocityFactor.get();
    moveBy += Math.sign(baseVelocity || -1) * Math.abs(boost) * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      className={`flex w-max whitespace-nowrap ${className ?? ""}`}
      style={{ x: reduce ? "0%" : x }}
    >
      <span className="shrink-0">{children}</span>
      <span className="shrink-0">{children}</span>
      <span className="shrink-0">{children}</span>
      <span className="shrink-0">{children}</span>
    </motion.div>
  );
}

export function TiltStage({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const smoothRx = useSpring(rx, { stiffness: 180, damping: 24 });
  const smoothRy = useSpring(ry, { stiffness: 180, damping: 24 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        className={className}
        style={{
          rotateX: smoothRx,
          rotateY: smoothRy,
          transformStyle: "preserve-3d",
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          ry.set(nx * 4.2);
          rx.set(-ny * 3.4);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

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
  const reduce = useReducedMotion();
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
      style={reduce ? {} : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType === "touch") return;
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
      {spotlight && !reduce && (
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

/* FASE 01 — Agentes autónomos y n8n (Nodos conectados con stroke-dashoffset) */
export function AgentFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!visible || reduce) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1250);
    return () => window.clearInterval(timer);
  }, [visible, reduce]);

  const nodes = [
    { icon: Send, title: "Disparador n8n / Webhook", sub: "Entrada de pedido o aviso" },
    { icon: Bot, title: "Agente autónomo planifica", sub: "Valida datos y decide ruta" },
    { icon: Check, title: "Tarea ejecutada sin intervención", sub: "CRM, stock y aviso listos" },
  ];

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-3" data-step={activeStep}>
      {/* Vertical SVG stroke-dashoffset connector line behind nodes */}
      <svg
        viewBox="0 0 12 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-7 top-6 z-0 h-[calc(100%-3rem)] w-3"
      >
        <line x1="6" y1="0" x2="6" y2="200" stroke="#262834" strokeWidth="2" />
        <motion.line
          x1="6"
          y1="0"
          x2="6"
          y2="200"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeDasharray="16 14"
          animate={reduce ? {} : { strokeDashoffset: [0, -60] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {nodes.map((node, i) => {
        const Icon = node.icon;
        const isCurrent = activeStep === i;
        return (
          <motion.div
            key={node.title}
            animate={
              reduce
                ? {}
                : {
                    scale: isCurrent ? 1.02 : 1,
                    x: isCurrent ? 4 : 0,
                  }
            }
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className={`relative z-10 flex items-center gap-3.5 rounded-xl border px-4 py-3.5 transition-colors ${
              isCurrent
                ? "border-[#3B82F6] bg-[#0B256B] text-white"
                : "border-[#262834] bg-[#14161F] text-zinc-200"
            }`}
          >
            <div
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${
                isCurrent
                  ? "border-[#60A5FA] bg-[#0044FF] text-white"
                  : "border-[#2E3140] bg-[#09090B] text-zinc-400"
              }`}
            >
              <Icon size={16} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white">{node.title}</div>
              <div className="text-xs text-zinc-400">{node.sub}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* FASE 02 — Enrutador visual de varios modelos según la consulta */
const ROUTER_CASES = [
  {
    query: "Arquitectura web + automatización con Skills",
    model: "Claude (Skills)",
    reason: "Contexto profundo, código limpio y flujos multi-paso",
  },
  {
    query: "Lectura multimodal de capturas y documentos largos",
    model: "Gemini",
    reason: "Ventana amplia y análisis visual rápido",
  },
  {
    query: "Síntesis comercial, copy B2B y lógica ágil",
    model: "ChatGPT",
    reason: "Iteración veloz sobre estructura y mensajería",
  },
  {
    query: "Investigación técnica y fuentes actualizadas en vivo",
    model: "Perplexity",
    reason: "Verificación con citas en tiempo real",
  },
] as const;

export function ModelCycle() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!visible || reduce) return;
    const timer = window.setInterval(() => setActive((n) => (n + 1) % ROUTER_CASES.length), 2200);
    return () => window.clearInterval(timer);
  }, [visible, reduce]);

  const current = ROUTER_CASES[active] ?? ROUTER_CASES[0];

  return (
    <div ref={ref} className="flex w-full flex-col gap-3.5" data-active={active}>
      {/* Query Prompt Box */}
      <div className="rounded-xl border border-[#262834] bg-[#09090B] px-4 py-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
          Consulta entrante
        </span>
        <p className="mt-1 text-sm font-semibold text-white">{current.query}</p>
      </div>

      {/* 4 Target Models Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {ROUTER_CASES.map((item, i) => {
          const isSelected = active === i;
          return (
            <motion.button
              key={item.model}
              type="button"
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              animate={
                reduce
                  ? {}
                  : {
                      scale: isSelected ? 1.03 : 1,
                      y: isSelected ? -2 : 0,
                    }
              }
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-xs font-bold transition-colors ${
                isSelected
                  ? "border-[#60A5FA] bg-[#0044FF] text-white"
                  : "border-[#262834] bg-[#14161F] text-zinc-300 hover:text-white"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  isSelected ? "bg-white" : "bg-zinc-600"
                }`}
                aria-hidden="true"
              />
              <span className="truncate">{item.model}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Routing Explanation */}
      <div className="flex items-center gap-2 rounded-lg border border-[#262834] bg-[#14161F] px-3.5 py-2.5 text-xs text-zinc-300">
        <Sparkles size={14} className="shrink-0 text-[#60A5FA]" />
        <span>{current.reason}</span>
      </div>
    </div>
  );
}

/* FASE 03 — Apps con código React/TypeScript -> Componente AI Studio / Stitch */
export function CodeFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"code" | "ui">("code");

  useEffect(() => {
    if (!visible || reduce) return;
    const timer = window.setInterval(() => {
      setPhase((prev) => (prev === "code" ? "ui" : "code"));
    }, 2200);
    return () => window.clearInterval(timer);
  }, [visible, reduce]);

  return (
    <div ref={ref} className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] font-semibold text-zinc-400">
          IDE Agéntico · AI Studio &amp; Stitch
        </span>
        <div className="flex items-center gap-1 rounded-full border border-[#262834] bg-[#09090B] p-0.5">
          <button
            type="button"
            onClick={() => setPhase("code")}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              phase === "code" ? "bg-[#0044FF] text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Code2 size={11} /> React / TS
          </button>
          <button
            type="button"
            onClick={() => setPhase("ui")}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              phase === "ui" ? "bg-white text-[#09090B]" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers size={11} /> AI Studio / Stitch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Left: React/TS Code Block */}
        <motion.div
          animate={reduce ? {} : { scale: phase === "code" ? 1 : 0.98 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-[#2C2F3D] bg-[#09090B] p-3.5 font-mono text-[11px] leading-relaxed text-zinc-200"
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-[#60A5FA]">
            <FileCode2 size={12} /> OrderCard.tsx
          </div>
          <div>
            <span className="text-zinc-500">{"<Card "}</span>
            <span className="text-blue-300">status</span>=
            <span className="text-white">&quot;live&quot;</span>
            <span className="text-zinc-500">{">"}</span>
          </div>
          <div className="pl-3 text-zinc-400">{"<StockSync n8n />"}</div>
          <div className="pl-3 text-zinc-400">{"<InvoiceTrigger />"}</div>
          <div className="text-zinc-500">{"</Card>"}</div>
        </motion.div>

        {/* Right: Morphed AI Studio / Stitch Visual UI */}
        <motion.div
          animate={
            reduce
              ? {}
              : {
                  scale: phase === "ui" ? 1.03 : 0.98,
                  borderColor: phase === "ui" ? "#60A5FA" : "#2C2F3D",
                }
          }
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="flex flex-col justify-between rounded-xl border bg-white p-3.5 text-[#09090B]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0044FF]">
              Stitch Prototype
            </span>
            <span className="rounded bg-[#09090B] px-1.5 py-0.5 text-[9px] font-bold text-white">
              PROD
            </span>
          </div>
          <div className="my-2">
            <div className="font-display text-sm font-extrabold">Panel Operativo ERP</div>
            <div className="text-[11px] text-[#6E6E73]">Web + App conectados por API</div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
            <motion.div
              className="h-full bg-[#0044FF]"
              animate={reduce ? {} : { width: phase === "ui" ? "100%" : "45%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* FASE 04 — Red de nodos Obsidian & Markdown (Memoria y reglas entre sesiones) */
const MEMORY_NODES = [
  { id: "obsidian", icon: BrainCircuit, label: "Obsidian Vault", note: "Base central" },
  { id: "rules", icon: FolderGit2, label: "Reglas.md", note: "Criterios de arquitectura" },
  { id: "session", icon: Bot, label: "Agentes en IDE", note: "Contexto entre sesiones" },
] as const;

export function MemoryFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    if (!visible || reduce) return;
    const timer = window.setInterval(() => setActiveNode((n) => (n + 1) % 3), 1500);
    return () => window.clearInterval(timer);
  }, [visible, reduce]);

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-3" data-node={activeNode}>
      {/* Horizontal SVG graph linking Obsidian -> Markdown -> Session */}
      <svg
        viewBox="0 0 360 34"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="h-7 w-full"
      >
        <line x1="40" y1="17" x2="320" y2="17" stroke="#262834" strokeWidth="2" />
        <motion.line
          x1="40"
          y1="17"
          x2="320"
          y2="17"
          stroke="#60A5FA"
          strokeWidth="2.5"
          strokeDasharray="12 10"
          animate={reduce ? {} : { strokeDashoffset: [0, -44] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {[40, 180, 320].map((cx, idx) => (
          <circle
            key={cx}
            cx={cx}
            cy="17"
            r={activeNode === idx ? "6" : "4"}
            fill={activeNode === idx ? "#0044FF" : "#18181B"}
            stroke="#60A5FA"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {MEMORY_NODES.map((node, i) => {
          const Icon = node.icon;
          const isCurrent = activeNode === i;
          return (
            <motion.div
              key={node.id}
              animate={reduce ? {} : { y: isCurrent ? -3 : 0, scale: isCurrent ? 1.03 : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className={`flex flex-col gap-1.5 rounded-xl border p-3.5 transition-colors ${
                isCurrent
                  ? "border-[#3B82F6] bg-[#0B256B] text-white"
                  : "border-[#262834] bg-[#14161F] text-zinc-200"
              }`}
            >
              <Icon size={16} className={isCurrent ? "text-[#60A5FA]" : "text-zinc-400"} />
              <div className="text-xs font-bold text-white">{node.label}</div>
              <div className="text-[11px] text-zinc-400">{node.note}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* Vertical Scroll-Lit Timeline for Experiencia */
export function ExperienceTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative mt-10 space-y-5 pl-6 sm:pl-9">
      {/* Static muted rail */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-0 top-4 w-[3px] rounded-full bg-slate-200"
      />
      {/* Dynamic #0044FF scroll fill rail */}
      <motion.div
        aria-hidden="true"
        style={reduce ? { scaleY: 1 } : { scaleY }}
        className="absolute bottom-4 left-0 top-4 w-[3px] origin-top rounded-full bg-[#0044FF]"
      />
      {children}
    </div>
  );
}

export function TimelineDot({ topClass = "top-7" }: { topClass?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      animate={
        reduce
          ? {}
          : inView
            ? {
                scale: [0.85, 1.2, 1],
                backgroundColor: "#0044FF",
                borderColor: "#FFFFFF",
                boxShadow: "0 0 0 4px rgba(0, 68, 255, 0.22)",
              }
            : {
                scale: 1,
                backgroundColor: "#FFFFFF",
                borderColor: "#94A3B8",
                boxShadow: "0 0 0 0px rgba(0, 68, 255, 0)",
              }
      }
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute -left-[31px] ${topClass} h-4 w-4 rounded-full border-2 sm:-left-[43px]`}
    />
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
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 10 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.36, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function formatWithDots(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {formatWithDots(value)}
      {suffix}
    </span>
  );
}
