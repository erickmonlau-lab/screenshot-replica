import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Bell,
  Bot,
  Database,
  Globe,
  Layers,
  Plug,
  Receipt,
  Rocket,
  Search,
  X,
} from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const VIOLET = "#6D28D9";
const LIME = "#C6F432";
const INK = "#09090B";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ───────── 01 · Diagnóstico ───────── */
function Diagnostico() {
  const reduce = useReducedMotion();
  const rows = [
    "Pedidos por WhatsApp",
    "Excel sin sincronizar",
    "Facturas a mano",
    "Avisos que se pierden",
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border-[3px] border-[#09090B] bg-white p-4 shadow-[8px_8px_0_#09090B] sm:p-5">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border-[3px] border-[#09090B]"
            style={{ background: LIME }}
          >
            <Search size={22} strokeWidth={3} color={INK} />
          </span>
          <p className="font-display text-[26px] leading-none font-black tracking-[-0.04em] text-[#09090B]">
            Auditoría de tu negocio
          </p>
        </div>
        <ul className="mt-4 grid gap-2.5">
          {rows.map((r, i) => (
            <motion.li
              key={r}
              initial={reduce ? false : { x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.22, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border-[3px] border-[#09090B] bg-[#F4F5F8] px-3 py-2.5 sm:px-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#09090B]"
                style={{ background: VIOLET }}
              >
                <X size={18} strokeWidth={4} color="#FFFFFF" />
              </span>
              <span className="text-[17px] font-bold text-[#09090B] sm:text-[19px]">{r}</span>
              <span className="ml-auto hidden rounded-lg bg-[#09090B] px-2.5 py-1 text-[15px] font-bold text-white sm:block">
                Fuga
              </span>
            </motion.li>
          ))}
        </ul>
        {reduce ? null : (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 left-0 h-2"
            style={{ background: LIME, top: 70 }}
            animate={{ y: [0, 240, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}

/* ───────── 02 · Arquitectura ───────── */
function Node({
  icon: Icon,
  label,
  className,
  delay,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 16, delay }}
      className={`flex min-w-[92px] flex-col items-center gap-2 rounded-2xl border-[3px] border-[#09090B] px-3 py-3 shadow-[5px_5px_0_#09090B] sm:min-w-[130px] sm:px-5 sm:py-4 ${className}`}
    >
      <Icon size={30} strokeWidth={2.6} />
      <span className="font-display text-[18px] leading-tight font-black tracking-[-0.02em] sm:text-[21px]">
        {label}
      </span>
    </motion.div>
  );
}

function Wire({ vertical = false, delay = 0 }: { vertical?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={`relative shrink-0 bg-[#09090B] ${vertical ? "h-8 w-1.5" : "h-1.5 w-6 sm:w-14"}`}
    >
      {reduce ? null : (
        <motion.span
          className="absolute rounded-full"
          style={{
            background: LIME,
            border: `2px solid ${INK}`,
            width: 14,
            height: 14,
            top: vertical ? 0 : -4,
            left: vertical ? -4 : 0,
          }}
          animate={vertical ? { y: [0, 20] } : { x: [0, 36] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay }}
        />
      )}
    </div>
  );
}

function Arquitectura() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="flex items-center">
        <Node icon={Globe} label="Web" className="bg-white text-[#09090B]" delay={0.1} />
        <Wire delay={0.2} />
        <Node icon={Layers} label="ERP" className="bg-[#09090B] text-white" delay={0.3} />
        <Wire delay={0.5} />
        <Node icon={Database} label="Datos" className="bg-[#C6F432] text-[#09090B]" delay={0.5} />
      </div>
      <Wire vertical delay={0.3} />
      <Node icon={Plug} label="Tus herramientas" className="bg-white text-[#09090B]" delay={0.7} />
    </div>
  );
}

/* ───────── 03 · Desarrollo ───────── */
function Desarrollo() {
  const reduce = useReducedMotion();
  const bricks = [
    { t: "React + TypeScript", c: "bg-white text-[#09090B]" },
    { t: "APIs seguras", c: "text-[#09090B]", lime: true },
    { t: "Base de datos", c: "bg-[#09090B] text-white" },
    { t: "Integraciones", c: "bg-white text-[#09090B]" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 sm:p-8">
      {bricks.map((b, i) => (
        <motion.div
          key={b.t}
          initial={reduce ? false : { y: -160, opacity: 0, rotate: i % 2 ? 4 : -4 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.15 + i * 0.35 }}
          className={`w-[88%] max-w-[470px] rounded-xl border-[3px] border-[#09090B] px-5 py-3 text-[20px] font-black tracking-[-0.02em] shadow-[5px_5px_0_#09090B] sm:text-[23px] ${b.c}`}
          style={{
            marginLeft: i % 2 ? 36 : 0,
            background: b.lime ? LIME : undefined,
          }}
        >
          {b.t}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── 04 · Producción ───────── */
function Produccion() {
  const reduce = useReducedMotion();
  const stops = ["Local", "Pruebas", "En línea"];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-4 sm:p-8">
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border-[3px] border-[#09090B] bg-white shadow-[8px_8px_0_#09090B]">
        <div className="flex items-center gap-2 border-b-[3px] border-[#09090B] bg-[#E3E5E9] px-3 py-2.5">
          <span className="h-3 w-3 rounded-full border-2 border-[#09090B] bg-white" />
          <span className="h-3 w-3 rounded-full border-2 border-[#09090B] bg-white" />
          <span className="h-3 w-3 rounded-full border-2 border-[#09090B] bg-white" />
          <span className="ml-2 rounded-full border-2 border-[#09090B] bg-white px-3 py-0.5 text-[15px] font-bold text-[#09090B]">
            tu-negocio.com
          </span>
        </div>
        <div className="flex items-center justify-center gap-4 px-4 py-7 sm:py-9">
          <motion.span
            initial={reduce ? false : { rotate: -30, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 11, delay: 0.5 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-[#09090B]"
            style={{ background: VIOLET }}
          >
            <Rocket size={28} strokeWidth={2.6} color="#FFFFFF" />
          </motion.span>
          <motion.span
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.9 }}
            className="font-display rounded-xl border-[3px] border-[#09090B] px-5 py-2 text-[30px] leading-none font-black tracking-[-0.04em] text-[#09090B] shadow-[4px_4px_0_#09090B] sm:text-[38px]"
            style={{ background: LIME }}
          >
            EN LÍNEA
          </motion.span>
        </div>
      </div>

      <div className="relative w-full max-w-[520px] px-2">
        <div aria-hidden="true" className="absolute top-[15px] right-8 left-8 h-1.5 bg-[#09090B]" />
        {reduce ? null : (
          <motion.span
            aria-hidden="true"
            className="absolute top-[7px] left-8 h-5 w-5 rounded-full border-[3px] border-[#09090B]"
            style={{ background: LIME }}
            initial={{ x: 0 }}
            animate={{ x: "min(430px, 70vw)" }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
          />
        )}
        <ol className="relative flex justify-between">
          {stops.map((s, i) => (
            <li key={s} className="flex w-20 flex-col items-center gap-2">
              <span
                className="h-8 w-8 rounded-lg border-[3px] border-[#09090B]"
                style={{ background: i === stops.length - 1 ? LIME : "#FFFFFF" }}
              />
              <span className="text-[16px] font-black text-white">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ───────── 05 · Automatización ───────── */
function Automatizacion() {
  const reduce = useReducedMotion();
  const chain = [
    { icon: Bell, t: "Aviso", c: "bg-white text-[#09090B]" },
    { icon: Bot, t: "IA", c: "bg-[#09090B] text-white" },
    { icon: Receipt, t: "Factura", c: "bg-white text-[#09090B]", lime: false },
    { icon: Banknote, t: "Cobro", c: "text-[#09090B]", lime: true },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {chain.map((n, i) => (
          <div key={n.t} className="flex items-center gap-2 sm:gap-3">
            <motion.div
              initial={reduce ? false : { y: 30, opacity: 0 }}
              animate={reduce ? { y: 0, opacity: 1 } : { y: 0, opacity: 1, scale: [1, 1.1, 1] }}
              transition={{
                y: { duration: 0.5, delay: 0.1 + i * 0.2, ease: EASE },
                opacity: { duration: 0.4, delay: 0.1 + i * 0.2 },
                scale: { duration: 0.7, delay: 1 + i * 0.6, repeat: Infinity, repeatDelay: 2.4 },
              }}
              className={`flex w-[82px] flex-col items-center gap-2 rounded-2xl border-[3px] border-[#09090B] py-4 shadow-[5px_5px_0_#09090B] sm:w-[112px] ${n.c}`}
              style={{ background: n.lime ? LIME : undefined }}
            >
              <n.icon size={30} strokeWidth={2.6} />
              <span className="font-display text-[19px] leading-none font-black tracking-[-0.02em] sm:text-[22px]">
                {n.t}
              </span>
            </motion.div>
            {i < chain.length - 1 ? (
              <ArrowRight size={26} strokeWidth={3.5} color={INK} className="shrink-0" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 rounded-2xl border-[3px] border-[#09090B] bg-white px-5 py-3 shadow-[6px_6px_0_#09090B]">
        <span className="font-display text-[24px] leading-none font-black tracking-[-0.03em] text-[#09090B] sm:text-[28px]">
          Sin tareas manuales
        </span>
        <span
          aria-hidden="true"
          className="flex h-9 w-16 items-center justify-end rounded-lg border-[3px] border-[#09090B] px-1"
          style={{ background: LIME }}
        >
          <span className="h-5 w-5 rounded-md border-[3px] border-[#09090B] bg-[#09090B]" />
        </span>
      </div>
    </div>
  );
}

const SCENES = [Diagnostico, Arquitectura, Desarrollo, Produccion, Automatizacion];

/** Escenas de proceso: bloques sólidos de color, poca letra, una idea por paso. */
export function ProcessScenes({ active }: { active: number }) {
  const Scene = SCENES[active] ?? Diagnostico;
  return (
    <div className="relative min-h-[380px] w-full overflow-hidden rounded-[24px] border-[3px] border-[#09090B] bg-[#6D28D9] shadow-[10px_10px_0_#09090B] sm:aspect-[16/10] sm:min-h-0">
      <span
        aria-hidden="true"
        className="absolute -top-10 -right-10 h-32 w-32 rotate-12 border-[3px] border-[#09090B]"
        style={{ background: LIME }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-12 -left-10 h-28 w-40 -rotate-6 border-[3px] border-[#09090B] bg-[#09090B]"
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Scene />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
