import { ArrowDown, ArrowUpRight, Download, CheckCircle2, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface HeroV2Props {
  cvUrl?: string;
}

export function HeroV2({ cvUrl = "/erick-rodriguez-cv.pdf" }: HeroV2Props) {
  return (
    <section className="relative overflow-hidden bg-[#F6F5F0] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 border-b border-[#D4D4D0]">
      {/* Subtle architectural background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#D4D4D0_1px,transparent_1px),linear-gradient(to_bottom,#D4D4D0_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      <div className="relative mx-auto w-full max-w-[1380px] px-5 sm:px-8">
        {/* Top Kicker Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4D4D0] pb-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
              PRODUCT BUILDER · BARCELONA
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#57575C]">
            <MapPin size={13} className="text-[#1D4ED8]" />
            <span>Presencial o Remoto</span>
            <span className="hidden sm:inline text-[#D4D4D0]">|</span>
            <span className="hidden sm:inline">Disponible para contratación & proyectos</span>
          </div>
        </div>

        {/* Main Grid: Headline + Portrait */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column (7 cols): Editorial Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[0.98] font-black tracking-[-0.04em] text-[#111111]">
              Conecto negocio y tecnología para crear soluciones{" "}
              <span className="inline-block relative">
                <span className="relative z-10 text-[#1D4ED8]">digitales</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 right-0 h-3 bg-[#1D4ED8]/15 -rotate-1 rounded-sm -z-0"
                />
              </span>{" "}
              que funcionan.
            </h1>

            <p className="mt-6 max-w-[48ch] text-lg sm:text-xl leading-relaxed font-medium text-[#57575C]">
              Entiendo cómo opera una empresa, detecto problemas y construyo las herramientas que necesita:{" "}
              <strong className="font-bold text-[#111111]">productos web</strong>,{" "}
              <strong className="font-bold text-[#111111]">sistemas de gestión</strong> y{" "}
              <strong className="font-bold text-[#111111]">automatizaciones</strong>.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#contacto"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-[#111111] bg-[#1D4ED8] px-7 py-3 text-sm sm:text-base font-bold text-white shadow-[4px_4px_0_#111111] transition-all hover:bg-[#1E40AF] hover:shadow-[5px_5px_0_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111111]"
              >
                <span>Hablemos de tu proyecto</span>
                <ArrowUpRight size={18} className="stroke-[2.5]" />
              </a>

              <a
                href={cvUrl}
                download="Erick-Rodriguez-CV.pdf"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-[#111111] bg-white px-6 py-3 text-sm sm:text-base font-bold text-[#111111] shadow-[4px_4px_0_#D4D4D0] transition-all hover:border-[#1D4ED8] hover:text-[#1D4ED8] hover:shadow-[4px_4px_0_#1D4ED8] active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Download size={16} />
                <span>Descargar CV</span>
              </a>

              <a
                href="#proyectos"
                className="inline-flex min-h-[50px] items-center justify-center gap-1.5 px-4 text-xs sm:text-sm font-bold text-[#57575C] transition-colors hover:text-[#111111]"
              >
                <span>Ver casos ↓</span>
              </a>
            </div>

            {/* Credibility badges strip */}
            <div className="mt-10 pt-8 border-t border-[#D4D4D0] grid grid-cols-3 gap-4">
              <div>
                <span className="font-display block text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                  04
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-[#57575C] leading-snug">
                  Casos de estudio reales
                </span>
              </div>

              <div>
                <span className="font-display block text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                  932 h
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-[#57575C] leading-snug">
                  Prácticas en empresa
                </span>
              </div>

              <div>
                <span className="font-display block text-2xl sm:text-3xl font-black text-[#1D4ED8] tracking-tight">
                  375 h
                </span>
                <span className="mt-0.5 block text-xs font-semibold text-[#57575C] leading-snug">
                  Agente del Cambio (Oficial)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Authentic Portrait + Overlaid Official Credential */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              {/* Solid graphic backing frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-[#111111] bg-[#EFEFE9]"
              />

              {/* White photo card with subtle shadow */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#111111] bg-white p-3 shadow-[6px_6px_0_#111111]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#F6F5F0] to-[#EAE9E2]">
                  <img
                    src="/erick-portrait-studio.png"
                    alt="Erick Rodríguez — Product Builder"
                    className="h-full w-full object-cover object-top select-none"
                    loading="eager"
                  />
                  {/* Subtle vignette border */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
                </div>

                {/* Overlaid tactile credential badge (Bottom) */}
                <div className="mt-3 rounded-xl border border-[#D4D4D0] bg-[#F6F5F0] p-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#1D4ED8] uppercase">
                      <ShieldCheck size={14} />
                      Acreditación Oficial
                    </span>
                    <span className="rounded bg-amber-400/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-400/40">
                      Subvención Salarial
                    </span>
                  </div>
                  <p className="mt-1 font-display text-sm font-bold text-[#111111] leading-tight">
                    Agente del Cambio Tecnológico · 375 h
                  </p>
                  <p className="mt-0.5 text-xs text-[#57575C] leading-snug">
                    Acreditación oficial Generalitat de Catalunya y Fondos NextGenerationEU para impulsar la transformación digital en empresas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
