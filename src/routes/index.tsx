import { createFileRoute } from "@tanstack/react-router";
import cvPdf from "@/assets/erick-rodriguez-cv.pdf.asset.json";

import { HeaderV2 } from "@/components/v2/HeaderV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { CaseStudiesV2 } from "@/components/v2/CaseStudiesV2";
import { CapabilitiesV2 } from "@/components/v2/CapabilitiesV2";
import { MethodologyV2 } from "@/components/v2/MethodologyV2";
import { TrajectoryV2 } from "@/components/v2/TrajectoryV2";
import { ContactDualV2 } from "@/components/v2/ContactDualV2";
import { FooterV2 } from "@/components/v2/FooterV2";

export const Route = createFileRoute("/")({
  component: PortfolioIndexV2,
});

function PortfolioIndexV2() {
  const cvUrl = cvPdf?.url || "/erick-rodriguez-cv.pdf";

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#111111] font-sans antialiased selection:bg-[#1D4ED8] selection:text-white">
      {/* Navegación Swiss Editorial con doble camino (Clientes vs Recruiters) */}
      <HeaderV2 cvUrl={cvUrl} />

      {/* Flujo Principal de Contenidos */}
      <main id="main-content">
        {/* 00. Hero Editorial, Retrato Auténtico & Métrica Oficial Verificada */}
        <HeroV2 cvUrl={cvUrl} />

        {/* 01. Casos de Estudio en Profundidad (Oderalo, BreadPDF, Gesgrama/Diversplas, FORMA) */}
        <CaseStudiesV2 />

        {/* 02. Qué resuelvo — 4 Pilares Conectados de Negocio y Tecnología */}
        <CapabilitiesV2 />

        {/* 03. Cómo trabajo — Metodología de 5 Fases y Sistema de Memoria Operativa */}
        <MethodologyV2 />

        {/* 04. Trayectoria — Formación Dual Oficial, 932 h Prácticas y Subvención NextGenEU */}
        <TrajectoryV2 cvUrl={cvUrl} />

        {/* 05. Contacto Dual — Proyectos de Clientes vs Selección/Equipos */}
        <ContactDualV2 cvUrl={cvUrl} />
      </main>

      {/* Footer Minimalista Técnico Suizo */}
      <FooterV2 />
    </div>
  );
}
