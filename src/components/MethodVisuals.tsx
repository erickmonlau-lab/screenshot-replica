import type { ReactNode } from "react";
import {
  Check,
  CheckCircle2,
  MessageSquare,
  Zap,
  Sparkles,
  Code2,
  Terminal,
  Lock,
  Globe,
  Gauge,
  TrendingUp,
  Bot,
  Workflow,
  Star,
  Cpu,
  Layers,
} from "lucide-react";

/* ───────────── Método cards (legacy exports preserved for compatibility) ───────────── */

const COBALT = "#0044FF";
const GREEN = "#10B981";

function Mini({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 360 160" className="h-auto w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function WebMini() {
  return (
    <Mini label="Resultados de búsqueda con tu web en primera posición">
      <rect
        x={10}
        y={8}
        width={340}
        height={144}
        rx={14}
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth={3}
      />
      <rect
        x={24}
        y={22}
        width={312}
        height={26}
        rx={13}
        fill="#F1F2F5"
        stroke="#09090B"
        strokeWidth={2}
      />
      <circle cx={42} cy={35} r={6} fill="none" stroke="#09090B" strokeWidth={2.5} />
      <rect x={58} y={31} width={120} height={8} rx={4} fill="#09090B" opacity={0.7} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect
            x={24}
            y={62 + k * 30}
            width={k === 0 ? 312 : 240}
            height={22}
            rx={7}
            fill={k === 0 ? "#E6EEFF" : "#F6F6F8"}
          />
          {k === 0 ? <rect x={24} y={62} width={6} height={22} rx={3} fill={COBALT} /> : null}
          <rect
            x={40}
            y={69 + k * 30}
            width={k === 0 ? 120 : 100}
            height={8}
            rx={4}
            fill="#09090B"
            opacity={k === 0 ? 0.85 : 0.3}
          />
        </g>
      ))}
      <g>
        <rect x={262} y={63} width={64} height={20} rx={10} fill={COBALT} />
        <text x={294} y={77.5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={800}>
          SEO
        </text>
      </g>
    </Mini>
  );
}

export function ErpMini() {
  const bars = [0.45, 0.7, 0.5, 0.9, 0.62, 0.8];
  return (
    <Mini label="Panel de un ERP con indicadores y gráfico">
      <rect
        x={10}
        y={8}
        width={340}
        height={144}
        rx={14}
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth={3}
      />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect
            x={24 + k * 106}
            y={22}
            width={96}
            height={38}
            rx={9}
            fill={k === 1 ? COBALT : "#F1F2F5"}
          />
        </g>
      ))}
      {bars.map((h, k) => (
        <rect
          key={k}
          className="bar-grow"
          x={30 + k * 50}
          y={140 - h * 66}
          width={30}
          height={h * 66}
          rx={6}
          fill={k === 3 ? COBALT : "#09090B"}
          opacity={k === 3 ? 1 : 0.85}
        />
      ))}
    </Mini>
  );
}

export function IaMini() {
  const nodes = [
    { x: 24, label: "Aviso", c: "#FF6D5A" },
    { x: 140, label: "IA", c: COBALT },
    { x: 256, label: "Hecho", c: GREEN },
  ];
  return (
    <Mini label="Flujo automático: aviso, IA y tarea hecha">
      <rect
        x={10}
        y={8}
        width={340}
        height={144}
        rx={14}
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth={3}
      />
      {nodes.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={46}
            width={76}
            height={68}
            rx={14}
            fill="#fff"
            stroke="#09090B"
            strokeWidth={3}
          />
          <circle cx={n.x + 38} cy={72} r={11} fill={n.c} />
          <text
            x={n.x + 38}
            y={102}
            textAnchor="middle"
            fill="#09090B"
            fontSize={15}
            fontWeight={800}
          >
            {n.label}
          </text>
        </g>
      ))}
    </Mini>
  );
}

/* ───────────── PROCESO STAGE (Elevated, Vibrant & High-Contrast) ───────────── */

/* Stage 1: Diagnóstico (Auditoría Técnica y de Negocio — Sin chats falsos) */
function ListenStage({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 ease-out ${
        active
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 text-[14px] font-bold text-zinc-200">
            <Terminal size={14} className="text-[#A78BFA]" />
            Auditoría de Procesos · Diagnóstico Inicial
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[13px] font-semibold text-[#DDD6FE]">
          <span className="h-2 w-2 rounded-full bg-[#A78BFA] animate-pulse" />
          Análisis en vivo del sistema
        </div>
      </div>

      {/* Audit Findings Matrix */}
      <div className="my-auto flex flex-col gap-2.5 py-1">
        {/* Finding 1 */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#14141C] p-3 transition-colors hover:border-purple-500/40">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rose-500/15 font-mono text-xs font-bold text-rose-400 border border-rose-500/30">
              01
            </span>
            <div>
              <p className="text-[14px] font-bold text-white">Fuga de presupuestos en WhatsApp</p>
              <p className="text-[13px] text-zinc-400">Pérdida de clientes por respuesta tardía entre llamadas y mensajes.</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-md bg-[#6D28D9]/20 px-2.5 py-1 font-mono text-[12px] font-bold text-[#DDD6FE] border border-[#8B5CF6]/30">
            → Respuesta &lt; 30s
          </span>
        </div>

        {/* Finding 2 */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#14141C] p-3 transition-colors hover:border-purple-500/40">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/15 font-mono text-xs font-bold text-amber-400 border border-amber-500/30">
              02
            </span>
            <div>
              <p className="text-[14px] font-bold text-white">14 h/semana en transcripción manual</p>
              <p className="text-[13px] text-zinc-400">Datos duplicados a mano entre Excel, facturas en papel y albaranes.</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-md bg-[#6D28D9]/20 px-2.5 py-1 font-mono text-[12px] font-bold text-[#DDD6FE] border border-[#8B5CF6]/30">
            → ERP sincronizado
          </span>
        </div>

        {/* Finding 3 */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#14141C] p-3 transition-colors hover:border-purple-500/40">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple-500/15 font-mono text-xs font-bold text-purple-300 border border-purple-500/30">
              03
            </span>
            <div>
              <p className="text-[14px] font-bold text-white">Web lenta y sin captación orgánica</p>
              <p className="text-[13px] text-zinc-400">Sin posicionamiento local ni medición de conversiones reales.</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-md bg-[#6D28D9]/20 px-2.5 py-1 font-mono text-[12px] font-bold text-[#DDD6FE] border border-[#8B5CF6]/30">
            → Web &lt; 0.8s + SEO
          </span>
        </div>
      </div>

      {/* Audit Outcome Bar */}
      <div className="flex items-center justify-between rounded-xl border border-[#8B5CF6]/40 bg-[#150F24]/90 p-3 shadow-[0_0_20px_rgba(109,40,217,0.2)]">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={18} className="text-[#A78BFA] shrink-0" />
          <div>
            <p className="text-[14px] font-bold text-white">Plan técnico validado</p>
            <p className="text-[13px] text-[#C4B5FD]">Objetivos definidos, arquitectura planificada y ahorro estimado de tiempo</p>
          </div>
        </div>
        <span className="rounded-lg border-2 border-[#09090B] bg-[#6D28D9] px-3 py-1 text-[13px] font-black text-white shadow-[2px_2px_0_#09090B]">
          ✓ DIAGNÓSTICO CERRADO
        </span>
      </div>
    </div>
  );
}

/* Stage 2: Diseñar (Diseño aprobado) */
function DesignStage({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 ease-out ${
        active
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Top Figma Canvas Bar */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 text-[14px] font-black text-white">
            F
          </div>
          <span className="text-[14px] font-bold text-zinc-200">
            Oderalo_Design_System_v3.fig
          </span>
          <span className="hidden sm:inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[14px] font-semibold text-zinc-400">
            ✦ Hi-Fi Prototype
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-purple-600/30 px-2 py-0.5 text-[14px] font-bold text-purple-300 border border-purple-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            Erick
          </span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-600/30 px-2 py-0.5 text-[14px] font-bold text-emerald-300 border border-emerald-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Cliente
          </span>
        </div>
      </div>

      {/* Main Split: UI Prototype & Design Tokens */}
      <div className="grid grid-cols-12 gap-3 my-auto py-1">
        {/* Left: UI Prototype Mockup */}
        <div className="col-span-8 flex flex-col gap-2 rounded-xl border border-blue-500/20 bg-[#101524] p-3 shadow-md">
          {/* Mockup Header */}
          <div className="flex items-center justify-between border-b border-[#1C1C20] pb-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[14px] text-[#A78BFA] tracking-tight">ODERALO</span>
              <div className="flex gap-1.5 text-[14px] text-zinc-400">
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-purple-300 font-semibold">Avisos</span>
                <span className="px-1 py-0.5">Facturas</span>
                <span className="px-1 py-0.5">Clientes</span>
              </div>
            </div>
            <span className="text-[14px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded border border-[#27272A] font-mono">⌘K</span>
          </div>

          {/* Hero Widget in Prototype */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] p-3 text-white shadow-md">
            <p className="text-[14px] font-medium text-purple-200">Gestión de avisos en campo</p>
            <h4 className="font-display text-sm font-extrabold leading-tight">Del aviso a la factura sin papeles</h4>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="rounded bg-[#6D28D9] border border-[#A78BFA] px-2.5 py-0.5 text-[13px] font-black text-white shadow-sm">
                + Crear Aviso
              </span>
              <span className="text-[13px] text-purple-100 font-medium">Sincronización en vivo</span>
            </div>
          </div>

          {/* 2 Quick Indicator Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-[#27272A] bg-[#161D2E] p-2">
              <span className="text-[14px] text-zinc-400 block">Avisos activos</span>
              <span className="font-display text-[14px] font-bold text-white flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Agenda al día
              </span>
            </div>
            <div className="rounded-lg border border-[#27272A] bg-[#161D2E] p-2">
              <span className="text-[14px] text-zinc-400 block">Facturación hoy</span>
              <span className="font-display text-[14px] font-bold text-emerald-400">
                Factura automática
              </span>
            </div>
          </div>
        </div>

        {/* Right: Design Tokens */}
        <div className="col-span-4 flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#101524] p-3">
          <div>
            <span className="text-[14px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-2">
              ✦ Design Tokens
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md bg-[#09090B] border border-zinc-700 shadow-sm" />
                <span className="text-[14px] font-mono text-zinc-200">#09090B</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md bg-white border border-zinc-700 shadow-sm" />
                <span className="text-[14px] font-mono text-zinc-200">#FFFFFF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md bg-[#6D28D9] shadow-sm" />
                <span className="text-[14px] font-mono text-zinc-200">#6D28D9</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md bg-[#A78BFA] shadow-sm" />
                <span className="text-[14px] font-mono text-zinc-200">#A78BFA</span>
              </div>
            </div>
          </div>

          <div className="mt-2 border-t border-[#27272A] pt-2 text-[14px] text-zinc-400">
            <p className="font-semibold text-zinc-300">Tipografía: Manrope</p>
            <p>Componentes accesibles</p>
          </div>
        </div>
      </div>

      {/* Approval Badge */}
      <div className="flex items-center justify-between rounded-xl border border-[#8B5CF6]/40 bg-[#150F24]/90 p-3 shadow-[0_0_20px_rgba(109,40,217,0.2)]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#A78BFA]" />
          <p className="text-[14px] font-semibold text-zinc-200">
            Flujos y diseño aprobados antes de escribir una línea de código.
          </p>
        </div>
        <span className="rounded-lg border-2 border-[#09090B] bg-[#6D28D9] px-3 py-1 text-[13px] font-black text-white shadow-[2px_2px_0_#09090B]">
          ✓ DISEÑO APROBADO
        </span>
      </div>
    </div>
  );
}

/* Stage 3: Construir (Producto construido) */
function BuildStage({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 ease-out ${
        active
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* IDE Tabs */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1.5 mr-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-1 rounded-t border-b-2 border-[#6D28D9] bg-[#161224] px-2.5 py-1 text-[14px] font-semibold text-white">
            <span className="rounded bg-[#6D28D9] px-1 text-[13px] font-bold text-white">TS</span>
            orders.service.ts
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-[14px] text-zinc-400">
            <span className="text-[#A78BFA] font-bold text-[14px]">⚛</span>
            App.tsx
          </div>
        </div>
        <span className="text-[14px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
          <Check size={12} strokeWidth={3} />
          TypeScript 5.7 · Strict Mode
        </span>
      </div>

      {/* Code Editor Surface */}
      <div className="my-auto rounded-xl border border-[#27272A] bg-[#0A0E18] p-3 font-mono text-[14px] sm:text-[14px] leading-relaxed text-zinc-200 shadow-inner">
        <div className="flex gap-2">
          <span className="select-none text-zinc-600">01</span>
          <p>
            <span className="text-purple-400 font-bold">export async function</span>{" "}
            <span className="text-cyan-400 font-semibold">procesarAviso</span>(
            <span className="text-amber-300">id</span>: <span className="text-emerald-400">string</span>) &#123;
          </p>
        </div>
        <div className="flex gap-2">
          <span className="select-none text-zinc-600">02</span>
          <p className="pl-4">
            <span className="text-purple-400">const</span> orden ={" "}
            <span className="text-purple-400">await</span> db.
            <span className="text-blue-400">ordenes</span>.
            <span className="text-yellow-300">actualizar</span>(&#123; id, estado:{" "}
            <span className="text-emerald-300 font-medium">"en_ruta"</span> &#125;);
          </p>
        </div>
        <div className="flex gap-2">
          <span className="select-none text-zinc-600">03</span>
          <p className="pl-4">
            <span className="text-purple-400">const</span> factura ={" "}
            <span className="text-purple-400">await</span> stripe.
            <span className="text-blue-400">invoices</span>.
            <span className="text-yellow-300">crear</span>(&#123; cliente: orden.cliente &#125;);
          </p>
        </div>
        <div className="flex gap-2">
          <span className="select-none text-zinc-600">04</span>
          <p className="pl-4">
            <span className="text-purple-400">await</span> n8n.
            <span className="text-blue-400">dispararFlujo</span>(
            <span className="text-emerald-300">"notificar_whatsapp"</span>, &#123; orden &#125;);
          </p>
        </div>
        <div className="flex gap-2">
          <span className="select-none text-zinc-600">05</span>
          <p className="pl-4">
            <span className="text-purple-400">return</span> &#123;{" "}
            <span className="text-cyan-300">ok:</span> <span className="text-amber-400">true</span>,{" "}
            <span className="text-cyan-300">facturaId:</span> factura.id &#125;;
          </p>
        </div>
        <div className="flex gap-2">
          <span className="select-none text-zinc-600">06</span>
          <p>&#125;</p>
        </div>
      </div>

      {/* Terminal & Build Execution */}
      <div className="rounded-xl border border-[#8B5CF6]/30 bg-[#100D1C] p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[14px] font-mono">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <Terminal size={14} className="text-[#A78BFA]" />
            $ pnpm run build --mode production
          </span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[14px] font-bold text-emerald-300 border border-emerald-500/30">
            ⚡ Vite · build
          </span>
        </div>

        {/* Progress Bar & Tech Tags */}
        <div className="flex items-center justify-between gap-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-emerald-400" />
          </div>
          <span className="shrink-0 text-[14px] font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={14} />
            0 errores
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#1C1C20] text-[14px]">
          <div className="flex gap-1.5">
            <span className="rounded bg-purple-500/10 px-2 py-0.5 font-bold text-purple-300 border border-purple-500/20">React 19</span>
            <span className="rounded bg-indigo-500/10 px-2 py-0.5 font-bold text-indigo-300 border border-indigo-500/20">TypeScript</span>
            <span className="rounded bg-violet-500/10 px-2 py-0.5 font-bold text-violet-300 border border-violet-500/20">Tailwind</span>
            <span className="rounded bg-zinc-800 px-2 py-0.5 font-bold text-zinc-300 border border-zinc-700">PostgreSQL</span>
          </div>
          <span className="rounded-md border border-[#A78BFA] bg-[#6D28D9] px-2.5 py-0.5 text-[12px] font-black text-white shadow-[2px_2px_0_#09090B]">
            ✓ PRODUCTO CONSTRUIDO
          </span>
        </div>
      </div>
    </div>
  );
}

/* Stage 4: Publicar (En producción) */
function PublishStage({ active }: { active: boolean }) {
  const scores = [
    { label: "Rendimiento", score: "✓", color: "#10B981" },
    { label: "Accesibilidad", score: "✓", color: "#10B981" },
    { label: "Buenas Prácticas", score: "✓", color: "#10B981" },
    { label: "SEO Técnico", score: "✓", color: "#10B981" },
  ];

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 ease-out ${
        active
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Cloud & Browser Bar */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#0F172A] px-3 py-1 text-[14px] font-mono text-zinc-200">
            <Lock size={12} className="text-emerald-400" />
            <span className="text-emerald-400">https://</span>tuempresa.es
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[14px] font-semibold text-blue-300 border border-blue-500/30">
            <Globe size={12} />
            Despliegue en la nube
          </span>
        </div>
      </div>

      {/* Google Lighthouse 100/100 Gauges */}
      <div className="my-auto py-2">
        <div className="mb-3 text-center">
          <span className="text-[14px] font-extrabold uppercase tracking-wider text-emerald-400">
            ✦ Rendimiento · SEO · Accesibilidad
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {scores.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-[#091814] p-3 text-center shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <div className="relative flex h-14 w-14 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-emerald-950 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-400 stroke-current"
                    strokeWidth="3.5"
                    strokeDasharray="100, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-display text-base font-extrabold text-white">
                  {s.score}
                </span>
              </div>
              <span className="mt-2 text-[14px] font-bold text-zinc-200 leading-tight">
                {s.label}
              </span>
              <span className="mt-0.5 text-[14px] text-emerald-400 font-semibold">Cuidado</span>
            </div>
          ))}
        </div>
      </div>

      {/* Production Deployment Status Banner */}
      <div className="flex items-center justify-between rounded-xl border border-[#8B5CF6]/40 bg-[#150F24]/90 p-3 shadow-[0_0_20px_rgba(109,40,217,0.2)]">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <p className="text-[14px] font-bold text-white">● EN PRODUCCIÓN · Despliegue cuidado</p>
            <p className="text-[13px] text-[#C4B5FD]">HTTPS, caché y despliegue automático</p>
          </div>
        </div>
        <span className="rounded-lg border-2 border-[#09090B] bg-[#6D28D9] px-3 py-1 text-[13px] font-black text-white shadow-[2px_2px_0_#09090B]">
          ✓ EN PRODUCCIÓN
        </span>
      </div>
    </div>
  );
}

/* Stage 5: Crecer (Posicionando y automatizado) */
function GrowStage({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 ease-out ${
        active
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      {/* Top Impact Metric Tags */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
        <span className="rounded-md border border-[#09090B] bg-[#6D28D9] px-2.5 py-0.5 text-[13px] font-black text-white shadow-[2px_2px_0_#09090B] flex items-center gap-1">
          <Star size={12} className="fill-white" />
          SEO TÉCNICO
        </span>
        <div className="flex items-center gap-3 text-[14px] font-bold">
          <span className="text-emerald-400 flex items-center gap-1">
            <TrendingUp size={14} />
            Más visitas orgánicas
          </span>
          <span className="text-[#A78BFA] flex items-center gap-1">
            <Cpu size={14} />
            Flujos con IA
          </span>
        </div>
      </div>

      {/* Main Split: SEO SERP Result & n8n Autonomous Workflow */}
      <div className="grid grid-cols-12 gap-3 my-auto py-1">
        {/* Left: Google Search Result & Growth */}
        <div className="col-span-6 flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#12111A] p-3 shadow-md">
          <div>
            <div className="flex items-center gap-1.5 text-[14px] text-emerald-400 font-medium">
              <span>https://tuempresa.es</span>
              <span className="text-zinc-500">›</span>
              <span>servicios</span>
            </div>
            <h4 className="font-display text-[14px] sm:text-sm font-bold text-[#A78BFA] mt-1 hover:underline cursor-pointer">
              Tu Empresa · Software a Medida y Automatización
            </h4>
            <p className="mt-1 text-[13px] text-zinc-300 leading-snug">
              Plataforma digital: presupuestos en segundos, seguimiento de avisos y facturación directa sin papeleos.
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-lg bg-purple-500/10 p-2 border border-purple-500/20">
            <span className="text-[13px] font-bold text-[#DDD6FE]">
              Resultado en buscadores
            </span>
            <span className="rounded bg-[#6D28D9] px-1.5 py-0.2 text-[12px] font-black text-white">
              SEO
            </span>
          </div>
        </div>

        {/* Right: n8n AI Autonomous Workflow */}
        <div className="col-span-6 flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#101018] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Workflow size={12} className="text-[#A78BFA]" />
              Pipeline Autónomo (n8n + IA)
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Workflow Connected Nodes */}
          <div className="flex flex-col gap-2 my-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-[#A78BFA] border border-purple-500/40">
                <Zap size={14} />
              </div>
              <div className="text-[13px]">
                <p className="font-bold text-white leading-none">Formulario / WhatsApp</p>
                <p className="text-[12px] text-zinc-400">Captación de aviso</p>
              </div>
            </div>

            <div className="pl-3.5 text-[#A78BFA] text-[13px] font-black">↓</div>

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2E1065] text-[#C4B5FD] border border-purple-500/40">
                <Bot size={14} />
              </div>
              <div className="text-[13px]">
                <p className="font-bold text-white leading-none">Agente IA</p>
                <p className="text-[12px] text-zinc-400">Clasifica y asigna técnico</p>
              </div>
            </div>

            <div className="pl-3.5 text-emerald-400 text-[13px] font-black">↓</div>

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 size={14} />
              </div>
              <div className="text-[13px]">
                <p className="font-bold text-white leading-none">ERP & Facturación</p>
                <p className="text-[12px] text-zinc-400">Cobro y factura en PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Activity Banner */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[#8B5CF6]/30 bg-[#140F24] p-2.5 text-[14px] text-purple-200">
        <span className="flex items-center gap-1.5 font-medium truncate">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-ping" />
          Flujo de ejemplo ejecutándose solo
        </span>
        <span className="shrink-0 whitespace-nowrap rounded-md border border-[#09090B] bg-[#6D28D9] px-2.5 py-1 text-[13px] font-black text-white shadow-[2px_2px_0_#09090B]">
          ✓ AUTOMATIZADO
        </span>
      </div>
    </div>
  );
}

/* ───────────── MAIN STAGE COMPONENT ───────────── */

export function ProcessStage({ active }: { active: number }) {
  return (
    <div className="relative aspect-[640/440] min-h-[380px] w-full overflow-hidden rounded-[24px] border-[3px] border-[#09090B] bg-[#0C0D14] shadow-[8px_8px_0_#09090B] hover:shadow-[10px_10px_0_#6D28D9] transition-all">
      {/* Background radial ambient lights for depth in purple */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />

      {/* 5 High-Impact Stages */}
      <ListenStage active={active === 0} />
      <DesignStage active={active === 1} />
      <BuildStage active={active === 2} />
      <PublishStage active={active === 3} />
      <GrowStage active={active === 4} />
    </div>
  );
}
