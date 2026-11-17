import { useState } from "react";
import { MessageCircle, Mail, Download, ArrowUpRight, Copy, Check, Github, Linkedin, MapPin, Send, ShieldCheck } from "lucide-react";

interface ContactDualV2Props {
  cvUrl?: string;
}

export function ContactDualV2({ cvUrl = "/erick-rodriguez-cv.pdf" }: ContactDualV2Props) {
  const email = "hola.erickrodriguez@gmail.com";
  const phone = "+34 640 63 0459";
  const whatsapp = "https://wa.me/34640630459";
  const github = "https://github.com/erickmonlau-lab";
  const linkedin = "https://www.linkedin.com/in/erick-rodriguez-martinez";

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Desarrollo Web");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const projectServices = [
    "Desarrollo Web",
    "Sistemas ERP / Gestión",
    "Automatización n8n & IA",
    "Producto Digital",
    "Estrategia SEO",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contacto" className="bg-[#0E0E11] py-16 sm:py-20 lg:py-24 text-white border-b border-[#272732]">
      <div className="mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="border-b border-zinc-800 pb-8 mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
              05 · Contacto y Conversión
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Iniciemos una conversación.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-[55ch]">
            Tanto si necesitas desarrollar un producto digital o automatizar tu empresa, como si buscas incorporar un perfil técnico multidisciplinar a tu equipo.
          </p>
        </div>

        {/* Dual Path Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Path 1: Clients & Companies (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border-2 border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-[6px_6px_0_#1D4ED8]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div>
                <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Para Empresas & Proyectos
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                  Hablemos de tu proyecto
                </h3>
              </div>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle size={14} />
                <span>WhatsApp directo</span>
              </a>
            </div>

            {/* Scope selection buttons */}
            <div className="mb-6">
              <label className="font-mono text-xs text-zinc-400 block mb-2 font-semibold uppercase">
                ¿Qué tipo de solución necesitas?
              </label>
              <div className="flex flex-wrap gap-2">
                {projectServices.map((service) => {
                  const isSelected = selectedService === service;
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#1D4ED8] text-white border border-blue-400 shadow-sm"
                          : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-850"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            {formSubmitted ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                <Check size={28} className="mx-auto text-emerald-400" />
                <h4 className="font-bold text-white text-lg">Mensaje preparado</h4>
                <p className="text-xs text-zinc-300">
                  Gracias por tu interés. También puedes contactarme directamente por WhatsApp para una respuesta más rápida.
                </p>
                <a
                  href={`${whatsapp}?text=${encodeURIComponent(`Hola Erick, me interesa hablar sobre ${selectedService}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Abrir chat de WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] text-zinc-400 block mb-1">Nombre o Empresa</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#1D4ED8] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-zinc-400 block mb-1">Email o Teléfono</label>
                    <input
                      type="text"
                      required
                      placeholder="ejemplo@empresa.com"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#1D4ED8] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-zinc-400 block mb-1">Detalles del problema o necesidad</label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntame brevemente qué proceso o web necesitas construir..."
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#1D4ED8] focus:outline-hidden resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl border border-white bg-[#1D4ED8] px-6 py-3 text-sm font-bold text-white shadow-[3px_3px_0_#ffffff] hover:bg-[#1E40AF] transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <span>Enviar consulta de proyecto</span>
                    <Send size={14} />
                  </button>

                  <a
                    href={`${whatsapp}?text=${encodeURIComponent(`Hola Erick, me interesa consultarte sobre ${selectedService}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    <MessageCircle size={15} />
                    <span>O escríbeme por WhatsApp directo</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Path 2: Recruiters & Teams (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border-2 border-zinc-700 bg-zinc-950 p-6 sm:p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Para Recruiters & Equipos
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                Evaluación de perfil
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Disponibilidad para incorporación en equipos de producto, ingeniería y transformación digital.
              </p>
            </div>

            {/* Direct CV Download */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Curriculum Vitae</span>
                <span className="font-mono text-[10px] text-zinc-400">PDF Oficial</span>
              </div>
              <p className="text-xs text-zinc-400 leading-snug">
                Formación reglada, 932 horas de prácticas en empresa y acreditación oficial de 375 h.
              </p>
              <a
                href={cvUrl}
                download="Erick-Rodriguez-CV.pdf"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white px-4 py-2.5 text-xs font-bold text-[#0E0E11] hover:bg-zinc-100 transition-colors"
              >
                <Download size={14} className="text-[#1D4ED8]" />
                <span>Descargar Erick-Rodriguez-CV.pdf</span>
              </a>
            </div>

            {/* Verified Profiles */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs font-bold text-white hover:border-zinc-700 hover:bg-zinc-850 transition-colors"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="ml-auto text-zinc-500" />
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs font-bold text-white hover:border-zinc-700 hover:bg-zinc-850 transition-colors"
              >
                <Linkedin size={16} className="text-blue-400" />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="ml-auto text-zinc-500" />
              </a>
            </div>

            {/* Quick Contact & Copy Bar */}
            <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-zinc-900 p-2.5 border border-zinc-800/80">
                <div className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-blue-400 shrink-0" />
                  <span className="font-mono text-zinc-200 truncate">{email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(email, "email")}
                  className="rounded px-2 py-0.5 text-[10px] font-bold text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-zinc-900 p-2.5 border border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <MessageCircle size={13} className="text-emerald-400 shrink-0" />
                  <span className="font-mono text-zinc-200">{phone}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(phone, "phone")}
                  className="rounded px-2 py-0.5 text-[10px] font-bold text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedPhone ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-zinc-500 pt-1 text-[11px]">
                <MapPin size={12} />
                <span>Barcelona (La Sagrera) · Presencial o Remoto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
