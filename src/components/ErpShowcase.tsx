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
    <div className="relative flex min-h-[250px] w-full flex-col justify-between bg-[#16161D] p-3 text-white sm:p-3.5 2xl:min-h-[340px] 2xl:p-5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#303240] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0044FF] px-2.5 py-1 text-sm font-bold uppercase tracking-wider text-white">
            <ShieldCheck size={13} /> Vista previa
          </span>
          <span className="hidden text-sm font-medium text-zinc-300 sm:inline sm:text-sm">
            ERP interno · datos de ejemplo
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-[#383B4B] bg-[#21222C] p-0.5 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setView("panels")}
            className={`rounded-full px-3 py-1 transition-colors ${
              view === "panels" ? "bg-white text-[#09090B]" : "text-zinc-300 hover:text-white"
            }`}
          >
            Paneles &amp; Stock
          </button>
          <button
            type="button"
            onClick={() => setView("flows")}
            className={`rounded-full px-3 py-1 transition-colors ${
              view === "flows" ? "bg-white text-[#09090B]" : "text-zinc-300 hover:text-white"
            }`}
          >
            Flujos n8n
          </button>
        </div>
      </div>

      {/* Main Dark Wireframe Workspace */}
      <div className="my-2.5 flex flex-1 flex-col justify-between gap-2.5">
        {/* 4 Dark Telemetry Panels */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {kpis.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-lg border border-[#323544] bg-[#21222C] p-2">
                <div className="flex items-center justify-between text-sm font-medium text-zinc-300">
                  <span className="truncate">{item.label}</span>
                  <Icon size={13} className="shrink-0 text-[#60A5FA]" />
                </div>
                <div className="mt-0.5 font-display text-sm font-bold tracking-tight text-white">
                  {item.value}
                </div>
                <div className="truncate text-sm text-zinc-400 sm:text-sm">{item.note}</div>
              </div>
            );
          })}
        </div>

        {view === "panels" ? (
          /* Stock & Operations Wireframe Table */
          <div className="flex-1 rounded-xl border border-dashed border-[#3B3F52] bg-[#1C1E27] p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-zinc-300">
              <span>Tabla de stock &amp; almacén</span>
              <span className="inline-flex items-center gap-1 text-[#60A5FA]">
                <Lock size={12} /> Datos de ejemplo
              </span>
            </div>
            <div className="space-y-1.5">
              {stockRows.map((row) => (
                <div
                  key={row.sku}
                  className="flex items-center justify-between gap-2 rounded-lg border border-[#303240] bg-[#111218] px-3 py-1.5 text-sm sm:text-sm"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-[#60A5FA]">{row.sku}</span>
                    <span className="truncate font-medium text-white">{row.item}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden font-mono text-sm text-zinc-300 sm:inline">
                      {row.stock}
                    </span>
                    <span
                      className={`rounded px-2.5 py-0.5 text-sm font-bold ${
                        row.state === "Alerta n8n"
                          ? "bg-[#0044FF] text-white"
                          : "bg-[#2A2D3B] text-white"
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
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
            {flowNodes.map((node) => (
              <div
                key={node.step}
                className="flex flex-col justify-between rounded-xl border border-[#323544] bg-[#21222C] p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#60A5FA]">
                    NODO {node.step}
                  </span>
                  <GitBranch size={14} className="text-zinc-400" />
                </div>
                <div className="mt-2">
                  <div className="font-display text-sm font-bold text-white">{node.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{node.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#303240] pt-2.5">
        <span className="text-sm font-medium text-zinc-300">
          Maqueta del ERP: la demo completa se enseña en persona
        </span>
      </div>
    </div>
  );
}
