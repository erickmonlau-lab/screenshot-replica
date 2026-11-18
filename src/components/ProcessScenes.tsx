import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Bell,
  Bot,
  Check,
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
const INK = "#09090B";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ───────── 01 · Diagnóstico: una auditoría que va marcando fugas ───────── */
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
            style={{ background: VIOLET }}
          >
            <Search size={22} strokeWidth={3} color="#FFFFFF" />
          </span>
          <p className="font-display text-[26px] leading-none font-bold tracking-[-0.04em] text-[#09090B]">
            Auditoría de tu negocio
          </p>
        </div>
        <ul className="mt-4 grid gap-2.5">
          {rows.map((r, i) => (
            <motion.li
              key={r}
              initial={reduce ? false : { x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.3, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border-[3px] border-[#09090B] bg-[#F4F4F5] px-3 py-2.5 sm:px-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#09090B]"
                style={{ background: VIOLET }}
              >
                <X size={18} strokeWidth={4} color="#FFFFFF" />
              </span>
              <span className="text-[17px] font-bold text-[#09090B] sm:text-[19px]">{r}</span>
              <motion.span
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.7 + i * 0.3 }}
                className="ml-auto hidden rounded-lg bg-[#09090B] px-2.5 py-1 text-[15px] font-bold text-white sm:block"
              >
                Fuga
              </motion.span>
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + rows.length * 0.3, duration: 0.4 }}
          className="mt-4 flex items-center justify-between rounded-xl bg-[#09090B] px-4 py-3 text-white"
        >
          <span className="text-[17px] font-bold">Fugas detectadas</span>
          <span className="font-display text-[30px] leading-none font-bold">{rows.length}</span>
        </motion.div>
        {reduce ? null : (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 left-0 h-1.5 bg-[#6D28D9]"
            style={{ top: 70 }}
            animate={{ y: [0, 230, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}

/* ───────── 02 · Arquitectura: el mapa del sistema con datos viajando ───────── */
const MAP_W = 540;
const MAP_H = 340;
const CENTER = { x: 270, y: 140 };
const MAP_NODES = [
  { icon: Globe, label: "Web", x: 80, y: 48, c: "bg-white text-[#09090B]" },
  { icon: Database, label: "Datos", x: 460, y: 48, c: "bg-white text-[#09090B]" },
  { icon: Plug, label: "Tus herramientas", x: 270, y: 292, c: "bg-white text-[#09090B]" },
];

function Arquitectura() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-[540px]" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {MAP_NODES.map((n, i) => (
            <g key={n.label}>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={n.x}
                y2={n.y}
                stroke={INK}
                strokeWidth={6}
                strokeLinecap="round"
              />
              {reduce ? null : (
                <motion.circle
                  r={9}
                  fill="#FFFFFF"
                  stroke={INK}
                  strokeWidth={3}
                  initial={{ cx: CENTER.x, cy: CENTER.y }}
                  animate={{ cx: [CENTER.x, n.x], cy: [CENTER.y, n.y] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.45 }}
                />
              )}
            </g>
          ))}
        </svg>

        {MAP_NODES.map((n, i) => (
          <motion.div
            key={n.label}
            initial={reduce ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 + i * 0.2 }}
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border-[3px] border-[#09090B] px-3 py-2.5 shadow-[5px_5px_0_#09090B] sm:px-4 ${n.c}`}
            style={{ left: `${(n.x / MAP_W) * 100}%`, top: `${(n.y / MAP_H) * 100}%` }}
          >
            <n.icon size={26} strokeWidth={2.6} />
            <span className="font-display text-[17px] leading-tight font-bold tracking-[-0.02em] whitespace-nowrap sm:text-[19px]">
              {n.label}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={reduce ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border-[3px] border-[#09090B] bg-[#09090B] px-5 py-3 text-white shadow-[5px_5px_0_#FFFFFF]"
          style={{ left: `${(CENTER.x / MAP_W) * 100}%`, top: `${(CENTER.y / MAP_H) * 100}%` }}
        >
          <Layers size={30} strokeWidth={2.6} />
          <span className="font-display text-[22px] leading-none font-bold tracking-[-0.03em]">
            ERP
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── 03 · Desarrollo: un editor que escribe código tipado ───────── */
const CODE: { t: string; k?: boolean }[][] = [
  [{ t: "type", k: true }, { t: " Pedido = { id: string; total: number }" }],
  [],
  [{ t: "async function", k: true }, { t: " crearPedido(p: Pedido) {" }],
  [{ t: "  await", k: true }, { t: " validar(p)" }],
  [{ t: "  await", k: true }, { t: " guardar(p)" }],
  [{ t: "  return", k: true }, { t: " enviarAviso(p.id)" }],
  [{ t: "}" }],
];

function Desarrollo() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 sm:p-8">
      <div className="w-full max-w-[540px] overflow-hidden rounded-2xl border-[3px] border-[#09090B] bg-[#09090B] shadow-[8px_8px_0_#FFFFFF]">
        <div className="flex items-center gap-2 border-b-[3px] border-[#3F3F46] px-3 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#6D28D9]" />
          <span className="h-3 w-3 rounded-full bg-white" />
          <span className="h-3 w-3 rounded-full bg-[#3F3F46]" />
          <span className="ml-3 rounded-md bg-[#27272A] px-3 py-0.5 text-[15px] font-bold text-white">
            pedidos.ts
          </span>
        </div>
        <pre className="overflow-hidden px-4 py-4 font-mono text-[15px] leading-[1.7] text-white sm:text-[16px]">
          {CODE.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.28 }}
              className="min-h-[1.7em] whitespace-pre"
            >
              {line.map((tok, j) => (
                <span key={j} className={tok.k ? "text-[#A78BFA]" : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === CODE.length - 1 && !reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-[3px] bg-[#A78BFA]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ) : null}
            </motion.div>
          ))}
        </pre>
      </div>
      <ul className="flex flex-wrap justify-center gap-2.5">
        {["React", "TypeScript", "APIs seguras"].map((t, i) => (
          <motion.li
            key={t}
            initial={reduce ? false : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2 + i * 0.15 }}
            className="rounded-full border-[3px] border-[#09090B] bg-white px-4 py-1.5 text-[16px] font-bold text-[#09090B] shadow-[3px_3px_0_#09090B]"
          >
            {t}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 04 · Producción: del entorno local a la web en línea ───────── */
function Produccion() {
  const reduce = useReducedMotion();
  const stops = ["Local", "Pruebas", "En línea"];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-4 sm:p-8">
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border-[3px] border-[#09090B] bg-white shadow-[8px_8px_0_#09090B]">
        <div className="flex items-center gap-2 border-b-[3px] border-[#09090B] bg-[#F4F4F5] px-3 py-2.5">
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
            transition={{ type: "spring", stiffness: 180, damping: 11, delay: 1.9 }}
            className="flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-[#09090B]"
            style={{ background: VIOLET }}
          >
            <Rocket size={28} strokeWidth={2.6} color="#FFFFFF" />
          </motion.span>
          <motion.span
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 2.2 }}
            className="font-display rounded-xl border-[3px] border-[#09090B] bg-[#09090B] px-5 py-2 text-[30px] leading-none font-bold tracking-[-0.04em] text-white shadow-[4px_4px_0_#6D28D9] sm:text-[38px]"
          >
            EN LÍNEA
          </motion.span>
        </div>
      </div>

      <ol className="flex w-full max-w-[520px] items-center justify-between gap-2">
        {stops.map((s, i) => (
          <motion.li
            key={s}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.7 }}
            className="flex flex-1 items-center gap-2"
          >
            <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border-[3px] border-[#09090B] bg-white px-3 py-2 text-[16px] font-bold text-[#09090B] shadow-[3px_3px_0_#09090B]">
              <Check size={18} strokeWidth={3.5} color={VIOLET} />
              {s}
            </span>
            {i < stops.length - 1 ? (
              <ArrowRight size={22} strokeWidth={3.5} color={INK} className="shrink-0" />
            ) : null}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ───────── 05 · Automatización: del aviso al cobro sin tocar nada ───────── */
function Automatizacion() {
  const reduce = useReducedMotion();
  const chain = [
    { icon: Bell, t: "Aviso", c: "bg-white text-[#09090B]" },
    { icon: Bot, t: "IA", c: "bg-[#09090B] text-white" },
    { icon: Receipt, t: "Factura", c: "bg-white text-[#09090B]" },
    { icon: Banknote, t: "Cobro", c: "bg-white text-[#09090B]" },
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
            >
              <n.icon size={30} strokeWidth={2.6} />
              <span className="font-display text-[19px] leading-none font-bold tracking-[-0.02em] sm:text-[22px]">
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
        <span className="font-display text-[24px] leading-none font-bold tracking-[-0.03em] text-[#09090B] sm:text-[28px]">
          Sin tareas manuales
        </span>
        <span
          aria-hidden="true"
          className="flex h-9 w-16 items-center justify-end rounded-lg border-[3px] border-[#09090B] bg-[#6D28D9] px-1"
        >
          <span className="h-5 w-5 rounded-md border-[3px] border-[#09090B] bg-white" />
        </span>
      </div>
    </div>
  );
}

const SCENES = [Diagnostico, Arquitectura, Desarrollo, Produccion, Automatizacion];
const SCENE_LABELS = ["Diagnóstico", "Arquitectura", "Desarrollo", "Producción", "Automatización"];

/** Pantalla del proceso: una escena por paso, con barra superior que indica en qué paso vas. */
export function ProcessScenes({ active }: { active: number }) {
  const Scene = SCENES[active] ?? Diagnostico;
  return (
    <div className="w-full overflow-hidden rounded-[24px] border-[3px] border-white bg-[#6D28D9] shadow-[10px_10px_0_#A78BFA]">
      <div className="flex items-center justify-between border-b-[3px] border-white bg-[#09090B] px-4 py-2.5 text-white">
        <span className="flex items-center gap-2 text-[15px] font-bold tracking-[0.08em] uppercase">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A78BFA]" />
          {SCENE_LABELS[active]}
        </span>
        <span className="font-display text-[18px] font-bold">
          0{active + 1} <span className="text-[#A1A1AA]">/ 05</span>
        </span>
      </div>
      <div className="relative min-h-[360px] sm:aspect-[16/10] sm:min-h-0">
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
    </div>
  );
}
