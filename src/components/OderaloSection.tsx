import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Receipt,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
  Wrench,
  Search,
  Check,
  Activity,
  Layers,
} from "lucide-react";
import { useReducedMotion } from "./motion-pref";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Ticket {
  id: string;
  client: string;
  service: string;
  technician: string;
  time: string;
  status: "en_ruta" | "en_curso" | "firmado";
  statusLabel: string;
  parts: string;
  amount: string;
}

const mockTickets: Ticket[] = [
  {
    id: "T-4094",
    client: "Restaurante El Rincón",
    service: "Mantenimiento Climatización",
    technician: "David L.",
    time: "10:30h",
    status: "firmado",
    statusLabel: "FIRMADO ✓",
    parts: "Presostato + Filtros",
    amount: "420,00 €",
  },
  {
    id: "T-4093",
    client: "Logística BarnaPort",
    service: "Revisión Cuadro Eléctrico",
    technician: "Marc S.",
    time: "11:15h",
    status: "en_curso",
    statusLabel: "EN CURSO (85%)",
    parts: "Magnetotérmico 40A",
    amount: "285,00 €",
  },
  {
    id: "T-4092",
    client: "Colegi Frederic Mistral",
    service: "Instalación Válvula Presión",
    technician: "Carlos M.",
    time: "12:00h",
    status: "en_ruta",
    statusLabel: "EN RUTA",
    parts: "Válvula DN25 + Kit",
    amount: "310,00 €",
  },
];

export function OderaloSection() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"despacho" | "facturas">("despacho");
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(mockTickets[0]);

  // 3D subtle tilt on pointer
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotY = useTransform(sx, (v) => -4 + v * 6);
  const rotX = useTransform(sy, (v) => 2 + v * -4);
  const phoneX = useTransform(sx, (v) => v * 10);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="erp"
      onPointerMove={onMove}
      className="relative scroll-mt-[62px] overflow-hidden border-t-[3px] border-[#09090B] bg-[#F4F4F6] py-12 sm:py-16 lg:py-20 text-[#09090B]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Columna Izquierda: Redacción estilo Apple */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#09090B] bg-[#6D28D9] px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#09090B]">
              Sistema Operativo a Medida · En Producción
            </span>

            {/* Titular contundente estilo Apple */}
            <h2 className="font-display mt-5 text-[clamp(3.6rem,7.5vw,6.2rem)] leading-[0.88] font-black tracking-[-0.05em] text-[#09090B]">
              ERP.
              <span className="block text-[clamp(1.8rem,3.2vw,2.9rem)] leading-[1.05] font-black tracking-[-0.04em] text-[#6D28D9] mt-3">
                Todo tu negocio. En un solo pulso.
              </span>
            </h2>

            <p className="mt-5 max-w-[42ch] text-base leading-relaxed font-medium text-[#27272A] sm:text-lg">
              De la llamada al cobro en un único flujo continuo. Diseñado a medida para eliminar el
              caos operativo: agenda inteligente para la central, partes con firma digital para los
              técnicos y facturación automática en segundos.
            </p>

            {/* Tríada de ventajas clave con formato Apple */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border-2 border-[#09090B] bg-white p-3.5 shadow-[3px_3px_0_#09090B]">
                <p className="font-display text-xl font-black tracking-tight text-[#6D28D9]">
                  0 papeles.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-[#52525B]">
                  Firma digital del cliente en pantalla desde el móvil del técnico.
                </p>
              </div>

              <div className="rounded-xl border-2 border-[#09090B] bg-white p-3.5 shadow-[3px_3px_0_#09090B]">
                <p className="font-display text-xl font-black tracking-tight text-[#09090B]">
                  Tiempo real.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-[#52525B]">
                  Estado de rutas, avisos cerrados y material consumido al segundo.
                </p>
              </div>

              <div className="rounded-xl border-2 border-[#09090B] bg-white p-3.5 shadow-[3px_3px_0_#09090B]">
                <p className="font-display text-xl font-black tracking-tight text-[#6D28D9]">
                  1 clic.
                </p>
                <p className="mt-1 text-xs leading-snug font-semibold text-[#52525B]">
                  El albarán validado emite y envía la factura sin reescribir nada.
                </p>
              </div>
            </div>

            {/* Píldoras de arquitectura técnica */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React & TypeScript",
                "App Móvil PWA Offline-First",
                "Firma Digital en Pantalla",
                "Facturación Automática",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border-2 border-[#09090B] bg-white px-3.5 py-1 text-xs sm:text-sm font-bold text-[#09090B] shadow-[2px_2px_0_#09090B]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-[#09090B] bg-[#09090B] px-7 py-3.5 text-base font-bold text-white shadow-[4px_4px_0_#6D28D9] transition-all duration-150 hover:bg-[#6D28D9] hover:border-[#6D28D9] hover:shadow-[4px_4px_0_#09090B] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span>Pídeme la demo en directo</span>
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>

          {/* Columna Derecha: Interfaz Operativa Real (Laptop + Móvil) */}
          <div className="relative mt-8 sm:mt-10 lg:mt-0 lg:col-span-7" style={{ perspective: 1600 }}>
            {/* Badge flotante superior estilo Apple */}
            <div className="absolute -top-5 right-2 z-30 hidden sm:flex items-center gap-2 rounded-full border-2 border-[#09090B] bg-white px-3.5 py-1 text-xs font-bold shadow-[3px_3px_0_#6D28D9]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sincronización Cloud en Vivo · 14 técnicos</span>
            </div>

            <motion.div style={{ rotateY: reduce ? 0 : rotY, rotateX: reduce ? 0 : rotX }}>
              {/* Laptop Frame */}
              <div className="overflow-hidden rounded-[20px] border-[3px] border-[#09090B] bg-[#09090B] p-2 sm:p-2.5 shadow-[12px_12px_0_#6D28D9]">
                {/* Pantalla viva del ERP */}
                <div className="relative flex flex-col rounded-xl bg-[#0F0F14] text-white border border-[#272730] overflow-hidden">
                  {/* Chrome Barra Superior */}
                  <div className="flex items-center justify-between border-b border-[#272730] bg-[#181820] px-3.5 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                      </div>
                      <span className="ml-2 font-mono text-[11px] text-zinc-400">
                        erp.sistema/despacho/operaciones
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1.5 rounded-md bg-[#252532] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                        <Users size={12} className="text-[#A78BFA]" />
                        <span>14 activos</span>
                      </div>
                      <div className="h-5 w-5 rounded-full bg-[#6D28D9] flex items-center justify-center text-[10px] font-bold">
                        ER
                      </div>
                    </div>
                  </div>

                  {/* Barra de pestañas del ERP */}
                  <div className="flex items-center justify-between border-b border-[#272730] bg-[#12121A] px-3.5 py-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab("despacho")}
                        className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
                          activeTab === "despacho"
                            ? "bg-[#6D28D9] text-white shadow-sm"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        ⚡ Despacho &amp; Rutas
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("facturas")}
                        className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
                          activeTab === "facturas"
                            ? "bg-[#6D28D9] text-white shadow-sm"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Facturación &amp; Cobros
                      </button>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                      <CheckCircle2 size={12} /> Sincronizado
                    </span>
                  </div>

                  {/* Cuerpo del Dashboard */}
                  <div className="p-3 sm:p-4 space-y-3.5">
                    {/* Fila de Métricas Rápidas */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="rounded-lg border border-[#272730] bg-[#161622] p-2 sm:p-2.5">
                        <p className="text-[10px] sm:text-xs font-medium text-zinc-400">Avisos hoy</p>
                        <p className="mt-0.5 font-display text-base sm:text-xl font-black text-white">
                          28 <span className="text-[10px] font-normal text-emerald-400">(4 en curso)</span>
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#272730] bg-[#161622] p-2 sm:p-2.5">
                        <p className="text-[10px] sm:text-xs font-medium text-zinc-400">Firmados</p>
                        <p className="mt-0.5 font-display text-base sm:text-xl font-black text-[#A78BFA]">
                          21 <span className="text-[10px] font-normal text-zinc-400">100% digital</span>
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#272730] bg-[#161622] p-2 sm:p-2.5">
                        <p className="text-[10px] sm:text-xs font-medium text-zinc-400">Facturado hoy</p>
                        <p className="mt-0.5 font-display text-base sm:text-xl font-black text-white">
                          8.420 €
                        </p>
                      </div>
                    </div>

                    {/* Tabla de Tickets en Vivo */}
                    <div className="rounded-lg border border-[#272730] bg-[#14141E] overflow-hidden">
                      <div className="flex items-center justify-between border-b border-[#272730] px-3 sm:pl-32 lg:pl-36 py-1.5 text-[10px] sm:text-xs font-semibold text-zinc-400 bg-[#1A1A26]">
                        <span>TICKET / CLIENTE</span>
                        <span className="hidden sm:inline">TÉCNICO &amp; REPUESTOS</span>
                        <span>ESTADO &amp; TOTAL</span>
                      </div>
                      <div className="divide-y divide-[#20202E]">
                        {mockTickets.map((t) => {
                          const isSelected = selectedTicket.id === t.id;
                          return (
                            <button
                              type="button"
                              key={t.id}
                              onClick={() => setSelectedTicket(t)}
                              className={`w-full flex items-center justify-between p-2.5 sm:pl-32 lg:pl-36 text-left text-xs transition-colors ${
                                isSelected ? "bg-[#25203D]" : "hover:bg-[#1A1A26]"
                              }`}
                            >
                              <div className="min-w-0 pr-2">
                                <p className="font-bold text-white truncate flex items-center gap-1.5">
                                  <span className="font-mono text-[10px] text-zinc-400">{t.id}</span>
                                  {t.client}
                                </p>
                                <p className="text-[11px] text-zinc-400 truncate">{t.service}</p>
                              </div>

                              <div className="hidden sm:block text-right text-zinc-300 pr-2">
                                <p className="font-medium text-[11px]">{t.technician}</p>
                                <p className="text-[10px] text-zinc-500 truncate">{t.parts}</p>
                              </div>

                              <div className="text-right shrink-0">
                                <span
                                  className={`inline-block rounded px-2 py-0.5 text-[10px] font-black ${
                                    t.status === "firmado"
                                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                      : t.status === "en_curso"
                                      ? "bg-[#6D28D9]/30 text-[#C4B5FD] border border-[#6D28D9]/50"
                                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  }`}
                                >
                                  {t.statusLabel}
                                </span>
                                <p className="font-mono text-[11px] font-bold text-zinc-200 mt-0.5">
                                  {t.amount}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Fila de Automatización en Vivo (n8n Webhook) */}
                    <div className="flex items-center justify-between rounded-lg border border-[#3B2568] bg-[#1C1433] px-3 sm:pl-32 lg:pl-36 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-[#C4B5FD] animate-pulse shrink-0" />
                        <span className="text-[11px] font-medium text-zinc-200">
                          <strong className="text-white">Flujo automático:</strong> Albarán firmado por el
                          cliente ➔ Factura PDF generada y enviada al instante.
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-emerald-400 hidden sm:inline shrink-0 ml-2">
                        200 OK
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Base del portátil */}
              <div className="mx-auto h-3 w-[92%] rounded-b-2xl border-[3px] border-t-0 border-[#09090B] bg-white shadow-md" />

              {/* Móvil: App del Técnico (PWA) con Firma Digital animada */}
              <motion.div
                style={{ x: reduce ? 0 : phoneX }}
                className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-10 -left-2 sm:-left-6 lg:-left-8 w-[26%] sm:w-[23%] min-w-[125px] max-w-[160px] z-30"
              >
                <div className="overflow-hidden rounded-[26px] border-[3px] border-[#09090B] bg-[#09090B] p-1.5 shadow-[8px_8px_0_#09090B]">
                  <div className="rounded-[20px] bg-[#12121A] text-white p-2.5 border border-[#272730] flex flex-col justify-between aspect-[9/19]">
                    {/* Header Móvil */}
                    <div>
                      <div className="mx-auto h-3 w-10 rounded-full bg-black mb-1.5" />
                      <div className="flex items-center justify-between text-[9px] text-zinc-400 border-b border-[#272730] pb-1">
                        <span className="font-mono font-bold text-white">App Técnico</span>
                        <span className="text-emerald-400">● Online</span>
                      </div>

                      <div className="mt-1.5">
                        <span className="rounded bg-[#6D28D9] px-1.5 py-0.5 text-[8px] font-bold text-white">
                          PARTE #4094
                        </span>
                        <p className="mt-1 font-bold text-[10px] text-white leading-tight">
                          Restaurante El Rincón
                        </p>
                      </div>

                      {/* Checklist */}
                      <div className="mt-2 space-y-1 text-[8px] text-zinc-300">
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Check size={10} strokeWidth={3} />
                          <span>Inspección realizada</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Check size={10} strokeWidth={3} />
                          <span>Repuesto sustituido</span>
                        </div>
                      </div>
                    </div>

                    {/* Canvas de Firma Digital */}
                    <div className="rounded-lg border border-[#3B2568] bg-[#1E1738] p-1.5">
                      <p className="text-[8px] font-semibold text-zinc-300">Firma del cliente:</p>
                      <svg viewBox="0 0 100 36" className="w-full h-7 my-0.5">
                        <motion.path
                          d="M 5 24 Q 20 4 35 20 T 65 14 T 85 26 T 95 12"
                          fill="none"
                          stroke="#A78BFA"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: [0, 1, 1, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.6, 0.9, 1],
                          }}
                        />
                      </svg>
                      <div className="flex items-center justify-between text-[7px] text-zinc-400 border-t border-[#3B2568] pt-0.5">
                        <span>A. García</span>
                        <span className="text-emerald-400 font-bold">✓ Conforme</span>
                      </div>
                    </div>

                    {/* Botón enviar */}
                    <div className="rounded bg-[#6D28D9] py-1 text-center text-[9px] font-black text-white shadow-sm">
                      Parte sincronizado
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
