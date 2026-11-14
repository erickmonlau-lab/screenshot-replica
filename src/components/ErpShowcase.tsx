import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Boxes,
  GitBranch,
  Lock,
  Receipt,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const kpis = [
  {
    icon: Boxes,
    label: "Stock almacén",
    value: "384 refs",
    note: "Reposición automática",
  },
  {
    icon: Receipt,
    label: "Facturación",
    value: "Sincronizada",
    note: "Albarán → Factura",
  },
  {
    icon: Workflow,
    label: "Flujos n8n",
    value: "12 activos",
    note: "Webhooks en vivo",
  },
  {
    icon: Activity,
    label: "Control operativo",
    value: "RBAC multi-rol",
    note: "Oficina + App campo",
  },
];

const stockRows = [
  { sku: "INV-104", item: "Kit Sensor & Válvula DN25", stock: "18 uds", state: "Stock óptimo" },
  { sku: "INV-209", item: "Módulo Telemetría Modbus", stock: "04 uds", state: "Alerta n8n" },
  { sku: "INV-312", item: "Pack Mantenimiento B2B", stock: "42 uds", state: "Reservado" },
];

const flowNodes = [
  { step: "01", title: "App Campo", detail: "Cierre de parte + consumo material" },
  { step: "02", title: "Webhook n8n", detail: "Descuento de stock + validación RBAC" },
  { step: "03", title: "ERP & Factura", detail: "Generación automática y registro" },
];

export function ErpShowcase() {
  const [view, setView] = useState<"panels" | "flows">("panels");

  return (
    <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden bg-[#09090B] p-4 text-white sm:p-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0044FF] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            <ShieldCheck size={12} /> Confidencial · Modo oscuro
          </span>
          <span className="hidden text-xs font-medium text-zinc-400 sm:inline">
            Esquema ERP &amp; App privada sin publicar
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setView("panels")}
            className={`rounded-full px-3 py-1 transition-colors ${
              view === "panels" ? "bg-white text-[#09090B]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Paneles &amp; Stock
          </button>
          <button
            type="button"
            onClick={() => setView("flows")}
            className={`rounded-full px-3 py-1 transition-colors ${
              view === "flows" ? "bg-white text-[#09090B]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Flujos n8n
          </button>
        </div>
      </div>

      {/* Main Dark Wireframe Workspace */}
      <div className="my-3 flex flex-1 flex-col justify-between gap-3">
        {/* 4 Dark Telemetry Panels */}
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {kpis.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-lg border border-white/12 bg-[#131317] p-2.5"
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400">
                  <span className="truncate">{item.label}</span>
                  <Icon size={13} className="shrink-0 text-[#60A5FA]" />
                </div>
                <div className="mt-1 font-display text-sm font-bold tracking-tight text-white">
                  {item.value}
                </div>
                <div className="mt-0.5 truncate text-[10px] text-zinc-500">{item.note}</div>
              </div>
            );
          })}
        </div>

        {view === "panels" ? (
          /* Stock & Operations Wireframe Table */
          <div className="flex-1 rounded-xl border border-dashed border-white/15 bg-[#111115] p-3">
            <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <span>Tabla de stock &amp; almacén</span>
              <span className="inline-flex items-center gap-1 text-[#60A5FA]">
                <Lock size={10} /> Demo completa presencial
              </span>
            </div>
            <div className="space-y-1.5">
              {stockRows.map((row) => (
                <div
                  key={row.sku}
                  className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#09090B] px-3 py-2 text-xs"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-[#60A5FA]">
                      {row.sku}
                    </span>
                    <span className="truncate font-medium text-zinc-100">{row.item}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
                      {row.stock}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        row.state === "Alerta n8n"
                          ? "bg-[#0044FF] text-white"
                          : "bg-white/10 text-zinc-200"
                      }`}
                    >
                      {row.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Dark Automation Pipeline View */
          <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-3">
            {flowNodes.map((node) => (
              <div
                key={node.step}
                className="flex flex-col justify-between rounded-xl border border-white/12 bg-[#131317] p-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#60A5FA]">
                    NODO {node.step}
                  </span>
                  <GitBranch size={14} className="text-zinc-500" />
                </div>
                <div className="mt-3">
                  <div className="font-display text-sm font-bold text-white">{node.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{node.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Direct In-Person Scheduling Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
        <span className="text-xs font-medium text-zinc-400">
          Dos proyectos reales en producción para ver cara a cara
        </span>
        <a
          href="#contacto"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#0044FF] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-white hover:text-[#09090B]"
        >
          <span>Agendar demo presencial</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
