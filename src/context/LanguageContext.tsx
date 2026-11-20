import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICT } from "@/i18n/dictionary";

export type Locale = "es" | "ca" | "en";

export interface Translations {
  nav: {
    home: string;
    process: string;
    projects: string;
    erp: string;
    webApps: string;
    brain: string;
    experience: string;
    contact: string;
    talk: string;
    downloadCv: string;
  };
  hero: {
    title: string;
    titleHighlight: string;
    ctaProjects: string;
    ctaErp: string;
  };
  metrics: {
    production: string;
    savings: string;
    speed: string;
    clients: string;
  };
  process: {
    badge: string;
    title: string;
  };
  projects: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewLive: string;
    viewCase: string;
  };
  erp: {
    badge: string;
    title: string;
    headline: string;
    description: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    ctaDemo: string;
  };
  webApps: {
    badge: string;
    title: string;
    headline: string;
    description: string;
  };
  cerebro: {
    badge: string;
    title: string;
    headline: string;
    howIWork: string;
    description: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    dragHint: string;
  };
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    direct: string;
    whatsapp: string;
    downloadCv: string;
  };
}

const translations: Record<Locale, Translations> = {
  es: {
    nav: {
      home: "Inicio",
      process: "Proceso",
      projects: "Proyectos",
      erp: "ERP",
      webApps: "Web Apps",
      brain: "Cerebro",
      experience: "Sobre mí",
      contact: "Contacto",
      talk: "Hablemos",
      downloadCv: "Descargar CV",
    },
    hero: {
      title: "Entiendo tu negocio.",
      titleHighlight: "Construyo la solución.",
      ctaProjects: "Ver proyectos",
      ctaErp: "Ver el ERP",
    },
    metrics: {
      production: "En producción",
      savings: "Ahorro operativo medio",
      speed: "Velocidad de carga",
      clients: "Satisfacción clientes",
    },
    process: {
      badge: "Método de trabajo",
      title: "De la idea a producción en semanas, no meses.",
    },
    projects: {
      kicker: "Casos reales en producción",
      title: "Proyectos.",
      titleHighlight: "Webs reales y aplicaciones en producción.",
      subtitle:
        "Software a medida pensado para captar clientes, gestionar operaciones y automatizar tareas.",
      viewLive: "Visitar web",
      viewCase: "Ver caso",
    },
    erp: {
      badge: "Caso real · en producción",
      title: "ERP.",
      headline: "Del aviso a la factura, sin papeles.",
      description:
        "De la llamada al cobro en un único flujo continuo. Diseñado a medida para eliminar el caos operativo: agenda inteligente para la central, partes con firma digital para los técnicos y facturación automática en segundos.",
      point1Title: "0 papeles.",
      point1Desc: "Firma digital del cliente en pantalla desde el móvil del técnico.",
      point2Title: "Tiempo real.",
      point2Desc: "Estado de rutas, avisos cerrados y material consumido al segundo.",
      point3Title: "1 clic.",
      point3Desc: "El albarán validado emite y envía la factura sin reescribir nada.",
      ctaDemo: "Pídeme la demo en directo",
    },
    webApps: {
      badge: "Aplicaciones Web Modernas",
      title: "Web Apps.",
      headline: "PWA y software que se siente nativo.",
      description:
        "Desarrollo aplicaciones web progresivas (PWA) con React y TypeScript, rápidas, offline-first y pensadas para usarse a diario desde cualquier dispositivo.",
    },
    cerebro: {
      badge: "Segundo Cerebro & Arquitectura IA",
      title: "Cerebro",
      headline: "La IA ya sabe",
      howIWork: "cómo trabajo.",
      description:
        "Guardo mis decisiones, reglas y datos de cada proyecto en notas enlazadas en Obsidian. Antes de empezar, la IA lee las que necesita.",
      step1Title: "Escribo",
      step1Desc: "Cada decisión, regla o cliente es una nota enlazada.",
      step2Title: "La IA lee",
      step2Desc: "Abre el índice y carga solo las notas del proyecto.",
      step3Title: "Trabaja a mi manera",
      step3Desc: "Aplica mis normas sin que se las repita.",
      dragHint:
        "Cada punto es una nota. Arrástralos: la luz recorre las conexiones, como la IA al leer.",
    },
    contact: {
      badge: "Contacto",
      title: "Hablemos",
      titleHighlight: "de tu proyecto.",
      subtitle:
        "Cuéntame qué necesitas y te respondo, o te enseño en persona el ERP y cómo automatizar tus procesos.",
      direct: "Contacto directo",
      whatsapp: "Escribir por WhatsApp",
      downloadCv: "Descargar CV",
    },
  },
  ca: {
    nav: {
      home: "Inici",
      process: "Procés",
      projects: "Projectes",
      erp: "ERP",
      webApps: "Web Apps",
      brain: "Cervell",
      experience: "Sobre mi",
      contact: "Contacte",
      talk: "Parlem",
      downloadCv: "Descarregar CV",
    },
    hero: {
      title: "Entenc el teu negoci.",
      titleHighlight: "Construeixo la solució.",
      ctaProjects: "Veure projectes",
      ctaErp: "Veure l'ERP",
    },
    metrics: {
      production: "En producció",
      savings: "Estalvi operatiu mitjà",
      speed: "Velocitat de càrrega",
      clients: "Satisfacció clients",
    },
    process: {
      badge: "Mètode de treball",
      title: "De la idea a producció en setmanes, no mesos.",
    },
    projects: {
      kicker: "Casos reals en producció",
      title: "Projectes.",
      titleHighlight: "Webs reals i aplicacions en producció.",
      subtitle:
        "Software a mida pensat per captar clients, gestionar operacions i automatitzar tasques.",
      viewLive: "Visitar web",
      viewCase: "Veure cas",
    },
    erp: {
      badge: "Cas real · en producció",
      title: "ERP.",
      headline: "De l'avís a la factura, sense papers.",
      description:
        "De la trucada al cobrament en un únic flux continu. Dissenyat a mida per eliminar el caos operatiu: agenda intel·ligent per a la central, comunicats amb signatura digital per als tècnics i facturació automàtica en segons.",
      point1Title: "0 papers.",
      point1Desc: "Signatura digital del client en pantalla des del mòbil del tècnic.",
      point2Title: "Temps real.",
      point2Desc: "Estat de rutes, avisos tancats i material consumit al segon.",
      point3Title: "1 clic.",
      point3Desc: "L'albarà validat emet i envia la factura sense reescribir res.",
      ctaDemo: "Demana'm la demo en directe",
    },
    webApps: {
      badge: "Aplicacions Web Modernes",
      title: "Web Apps.",
      headline: "PWA i software que es percep natiu.",
      description:
        "Desenvolupo aplicacions web progressives (PWA) amb React i TypeScript, ràpides, offline-first i pensades per a l'ús diari des de qualsevol dispositiu.",
    },
    cerebro: {
      badge: "Segon Cervell & Arquitectura IA",
      title: "Cervell",
      headline: "La IA ja sap",
      howIWork: "com treballo.",
      description:
        "Guardo les meves decisions, regles i dades de cada projecte en notes enllaçades a Obsidian. Abans de començar, la IA llegeix les que necessita.",
      step1Title: "Escric",
      step1Desc: "Cada decisió, regla o client és una nota enllaçada.",
      step2Title: "La IA llegeix",
      step2Desc: "Obre l'índex i carrega només les notes del projecte.",
      step3Title: "Treballa a la meva manera",
      step3Desc: "Aplica les meves normes sense haver-les de repetir.",
      dragHint:
        "Cada punt és una nota. Arrossega'ls: la llum recorre les connexions com la IA en llegir.",
    },
    contact: {
      badge: "Contacte",
      title: "Parlem",
      titleHighlight: "del teu projecte.",
      subtitle:
        "Explica'm què necessites i et responc, o t'ensenyo en persona l'ERP i com automatitzar els teus processos.",
      direct: "Contacte directe",
      whatsapp: "Escriure per WhatsApp",
      downloadCv: "Descarregar CV",
    },
  },
  en: {
    nav: {
      home: "Home",
      process: "Process",
      projects: "Projects",
      erp: "ERP",
      webApps: "Web Apps",
      brain: "Brain",
      experience: "About me",
      contact: "Contact",
      talk: "Let's talk",
      downloadCv: "Download CV",
    },
    hero: {
      title: "I understand your business.",
      titleHighlight: "I build the solution.",
      ctaProjects: "View projects",
      ctaErp: "Explore ERP",
    },
    metrics: {
      production: "In production",
      savings: "Avg. operational savings",
      speed: "Page load speed",
      clients: "Client satisfaction",
    },
    process: {
      badge: "Work methodology",
      title: "From idea to production in weeks, not months.",
    },
    projects: {
      kicker: "Real cases in production",
      title: "Projects.",
      titleHighlight: "Live websites and apps in production.",
      subtitle:
        "Tailored software designed to acquire clients, manage daily operations, and automate tasks.",
      viewLive: "Visit site",
      viewCase: "View case",
    },
    erp: {
      badge: "Real case · in production",
      title: "ERP.",
      headline: "From dispatch to payout, zero paper.",
      description:
        "From dispatch to payout in one continuous flow. Custom-engineered to eliminate operational chaos: smart dispatch scheduling, mobile app with digital client signing, and one-click automated invoicing.",
      point1Title: "Zero paper.",
      point1Desc: "Client signs directly on technician's phone in seconds.",
      point2Title: "Real-time.",
      point2Desc: "Instant job status, live routes, and part inventory updates.",
      point3Title: "1 click.",
      point3Desc: "Approved dispatch slip generates and sends the invoice instantly.",
      ctaDemo: "Request live walkthrough",
    },
    webApps: {
      badge: "Modern Web Applications",
      title: "Web Apps.",
      headline: "PWAs and software that feels truly native.",
      description:
        "I engineer progressive web applications (PWA) with React and TypeScript—blazing fast, offline-first, and built for daily operational demands on any device.",
    },
    cerebro: {
      badge: "Second Brain & AI Architecture",
      title: "Brain",
      headline: "The AI already knows",
      howIWork: "how I work.",
      description:
        "I document architectural decisions, design guidelines, and client specs in linked Obsidian notes. Autonomous agents ingest relevant notes before writing a line of code.",
      step1Title: "I write",
      step1Desc: "Every decision, constraint, or client spec is an interconnected note.",
      step2Title: "AI reads",
      step2Desc: "Agents traverse the graph and ingest only what the task requires.",
      step3Title: "Executes my way",
      step3Desc: "Enforces production standards autonomously without repeating prompts.",
      dragHint: "Each node is an Obsidian note. Drag to watch energy propagate across connections.",
    },
    contact: {
      badge: "Contact",
      title: "Let's talk",
      titleHighlight: "about your project.",
      subtitle:
        "Tell me what you need and I'll reply promptly, or I can give you a live walkthrough of the ERP and automation workflows.",
      direct: "Direct contact",
      whatsapp: "Chat on WhatsApp",
      downloadCv: "Download CV",
    },
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Translations;
  /** Traduce una frase escrita en español al idioma activo (si falta, devuelve el español). */
  tr: (es: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "es",
  setLocale: () => {},
  t: translations.es,
  tr: (es) => es,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang") as Locale | null;
      if (saved && (saved === "es" || saved === "ca" || saved === "en")) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem("portfolio_lang", next);
    } catch {
      // ignore
    }
  };

  const t = translations[locale];

  const tr = useCallback(
    (es: string) => {
      if (locale === "es") return es;
      const entry = DICT[es.replace(/ /g, " ")];
      if (!entry) {
        if (import.meta.env.DEV) console.warn(`[i18n] falta traducción: "${es}"`);
        return es;
      }
      return entry[locale];
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
