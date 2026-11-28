/**
 * Diccionario de traducciones por frase: la clave es el texto en español tal y como aparece en
 * la página. `tr()` (ver LanguageContext) devuelve la versión en catalán o inglés; si falta una
 * clave, devuelve el español y avisa por consola en desarrollo.
 */
export type Entry = { ca: string; en: string };

export const DICT: Record<string, Entry> = {
  /* ───────── Métricas ───────── */
  "Resultados en cifras": { ca: "Resultats en xifres", en: "Results in numbers" },
  "de experiencia real": { ca: "d'experiència real", en: "of real experience" },
  "Marketing, gestión y desarrollo web en proyectos en producción.": {
    ca: "Màrqueting, gestió i desenvolupament web en projectes en producció.",
    en: "Marketing, management and web development in live projects.",
  },
  "Agente del Cambio Tecnológico": {
    ca: "Agent del Canvi Tecnològic",
    en: "Technological Change Agent",
  },
  "Acreditación oficial de la Generalitat de Catalunya.": {
    ca: "Acreditació oficial de la Generalitat de Catalunya.",
    en: "Official accreditation from the Generalitat de Catalunya.",
  },
  "en un solo perfil": { ca: "en un sol perfil", en: "in one profile" },
  "Marketing digital, gestión administrativa y desarrollo con IA.": {
    ca: "Màrqueting digital, gestió administrativa i desenvolupament amb IA.",
    en: "Digital marketing, administration and AI development.",
  },
  "para trabajar contigo": { ca: "per treballar amb tu", en: "to work with you" },
  "Español y catalán nativos, e inglés.": {
    ca: "Castellà i català natius, i anglès.",
    en: "Native Spanish and Catalan, and English.",
  },
  "3 webs y un ERP, en producción": { ca: "3 webs i un ERP, en producció", en: "3 websites and an ERP, live" },
  "diversplas.es, gesgrama.com, breadpdf.com y Oderalo.": {
    ca: "diversplas.es, gesgrama.com, breadpdf.com i Oderalo.",
    en: "diversplas.es, gesgrama.com, breadpdf.com and Oderalo.",
  },
  "online y en producción": { ca: "en línia i en producció", en: "online and live" },
  "diversplas.es, gesgrama.com y breadpdf.com.": {
    ca: "diversplas.es, gesgrama.com i breadpdf.com.",
    en: "diversplas.es, gesgrama.com and breadpdf.com.",
  },
  "proyectos online": { ca: "projectes en línia", en: "online projects" },
  "diversplas.es, gesgrama.com y breadpdf.com, en producción.": {
    ca: "diversplas.es, gesgrama.com i breadpdf.com, en producció.",
    en: "diversplas.es, gesgrama.com and breadpdf.com, live.",
  },

  /* ───────── Proceso ───────── */
  Proceso: { ca: "Procés", en: "Process" },
  "Cinco pasos, de la auditoría a un negocio que": {
    ca: "Cinc passos, de l'auditoria a un negoci que",
    en: "Five steps, from audit to a business that",
  },
  "funciona solo.": { ca: "funciona sol.", en: "runs itself." },
  Paso: { ca: "Pas", en: "Step" },
  "Ver paso": { ca: "Veure pas", en: "Go to step" },
  Diagnóstico: { ca: "Diagnosi", en: "Diagnosis" },
  Arquitectura: { ca: "Arquitectura", en: "Architecture" },
  Desarrollo: { ca: "Desenvolupament", en: "Development" },
  Producción: { ca: "Producció", en: "Production" },
  Automatización: { ca: "Automatització", en: "Automation" },
  "Primero encuentro lo que te": {
    ca: "Primer trobo el que et",
    en: "First I find what",
  },
  "hace perder tiempo.": { ca: "fa perdre temps.", en: "is costing you time." },
  "Analizo tus procesos actuales para detectar fugas de tiempo y pedidos que se pierden por falta de sincronización.":
    {
      ca: "Analitzo els teus processos actuals per detectar fuites de temps i comandes que es perden per falta de sincronització.",
      en: "I analyse your current processes to spot time leaks and orders lost for lack of synchronisation.",
    },
  "Fugas de tiempo detectadas": { ca: "Fuites de temps detectades", en: "Time leaks found" },
  "Dibujo el sistema": { ca: "Dibuixo el sistema", en: "I draw the system" },
  "antes de programar.": { ca: "abans de programar.", en: "before building it." },
  "Estructura de la base de datos, flujos de clientes y cómo se comunican la web, el ERP y tus herramientas.":
    {
      ca: "Estructura de la base de dades, fluxos de clients i com es comuniquen la web, l'ERP i les teves eines.",
      en: "Database structure, customer flows and how the website, the ERP and your tools talk to each other.",
    },
  "Sistema ordenado desde el diseño": {
    ca: "Sistema ordenat des del disseny",
    en: "A system organised from the design stage",
  },
  "Lo construyo pieza a pieza,": {
    ca: "Ho construeixo peça a peça,",
    en: "I build it piece by piece,",
  },
  "con código tipado.": { ca: "amb codi tipat.", en: "with typed code." },
  "React y TypeScript, APIs seguras e integraciones con tus herramientas, pieza a pieza.": {
    ca: "React i TypeScript, APIs segures i integracions amb les teves eines, peça a peça.",
    en: "React and TypeScript, secure APIs and integrations with your tools, piece by piece.",
  },
  "Código tipado y mantenible": { ca: "Codi tipat i mantenible", en: "Typed, maintainable code" },
  "Lo publico rápido": { ca: "El publico ràpid", en: "I ship it fast" },
  "y lo dejo vigilado.": { ca: "i el deixo vigilat.", en: "and keep an eye on it." },
  "Despliegue en la nube con el rendimiento y los Core Web Vitals cuidados.": {
    ca: "Desplegament al núvol amb el rendiment i els Core Web Vitals cuidats.",
    en: "Cloud deployment with performance and Core Web Vitals taken care of.",
  },
  "En producción y vigilado": { ca: "En producció i vigilat", en: "Live and monitored" },
  "Y lo dejo": { ca: "I el deixo", en: "And I leave it" },
  "trabajando solo.": { ca: "treballant sol.", en: "working on its own." },
  "n8n y modelos de IA gestionan avisos, facturas y atención sin tareas manuales.": {
    ca: "n8n i models d'IA gestionen avisos, factures i atenció sense tasques manuals.",
    en: "n8n and AI models handle alerts, invoices and customer care with no manual tasks.",
  },
  "Tareas repetitivas automatizadas": {
    ca: "Tasques repetitives automatitzades",
    en: "Repetitive tasks automated",
  },
  "Pedidos por WhatsApp": { ca: "Comandes per WhatsApp", en: "Orders by WhatsApp" },
  "Excel sin sincronizar": { ca: "Excel sense sincronitzar", en: "Unsynced Excel sheets" },
  "Facturas a mano": { ca: "Factures a mà", en: "Invoices by hand" },
  "Avisos que se pierden": { ca: "Avisos que es perden", en: "Alerts that get lost" },
  "Auditoría de tu negocio": { ca: "Auditoria del teu negoci", en: "Audit of your business" },
  Fuga: { ca: "Fuita", en: "Leak" },
  "Fugas detectadas": { ca: "Fuites detectades", en: "Leaks found" },
  Web: { ca: "Web", en: "Web" },
  Datos: { ca: "Dades", en: "Data" },
  "Tus herramientas": { ca: "Les teves eines", en: "Your tools" },
  "APIs seguras": { ca: "APIs segures", en: "Secure APIs" },
  "EN LÍNEA": { ca: "EN LÍNIA", en: "LIVE" },
  "Publicado en la nube": { ca: "Publicat al núvol", en: "Published in the cloud" },
  "Core Web Vitals cuidados": { ca: "Core Web Vitals cuidats", en: "Core Web Vitals taken care of" },
  "Vigilado en producción": { ca: "Vigilat en producció", en: "Monitored in production" },
  Local: { ca: "Local", en: "Local" },
  Pruebas: { ca: "Proves", en: "Testing" },
  "En línea": { ca: "En línia", en: "Live" },
  Aviso: { ca: "Avís", en: "Alert" },
  IA: { ca: "IA", en: "AI" },
  Idiomas: { ca: "Idiomes", en: "Languages" },
  "Español y Catalán: nativos": { ca: "Castellà i català: natius", en: "Spanish and Catalan: native" },
  "Marketing digital": { ca: "Màrqueting digital", en: "Digital marketing" },
  "Gestión administrativa": { ca: "Gestió administrativa", en: "Administration" },
  "Desarrollo con IA": { ca: "Desenvolupament amb IA", en: "Development with AI" },
  "Qué hice": { ca: "Què vaig fer", en: "What I did" },
  Reconocimiento: { ca: "Reconeixement", en: "Recognition" },
  "375 horas": { ca: "375 hores", en: "375 hours" },
  Acreditación: { ca: "Acreditació", en: "Accreditation" },
  Factura: { ca: "Factura", en: "Invoice" },
  Cobro: { ca: "Cobrament", en: "Payment" },
  "Sin tareas manuales": { ca: "Sense tasques manuals", en: "No manual tasks" },

  /* ───────── Proyectos ───────── */
  Proyectos: { ca: "Projectes", en: "Projects" },
  "Web a medida": { ca: "Web a mida", en: "Custom website" },
  "Arquitectura Web": { ca: "Arquitectura web", en: "Web architecture" },
  "React & TypeScript": { ca: "React i TypeScript", en: "React & TypeScript" },
  "En producción": { ca: "En producció", en: "Live" },
  Posicionándose: { ca: "Posicionant-se", en: "Ranking up" },
  "Indexada en Google": { ca: "Indexada a Google", en: "Indexed on Google" },
  "Web a medida para colegios y AFAs: gestión de extraescolares y casales": {
    ca: "Web a mida per a escoles i AFAs: gestió d'extraescolars i casals",
    en: "Custom website for schools and parent associations: after-school and summer-camp management",
  },
  "Web a medida para empresa, recién lanzada y posicionándose en Google": {
    ca: "Web a mida per a empresa, recent llançada i posicionant-se a Google",
    en: "Custom business website, newly launched and climbing on Google",
  },
  "Plataforma propia para trabajar con PDF ya indexada en Google con múltiples páginas": {
    ca: "Plataforma pròpia per treballar amb PDF ja indexada a Google amb múltiples pàgines",
    en: "Own PDF platform, already indexed on Google across many pages",
  },
  "SEO Técnico": { ca: "SEO tècnic", en: "Technical SEO" },
  "Recién lanzada": { ca: "Recent llançada", en: "Just launched" },
  "SEO On-Page": { ca: "SEO On-Page", en: "On-page SEO" },
  "SEO Programático": { ca: "SEO programàtic", en: "Programmatic SEO" },
  "Producto propio": { ca: "Producte propi", en: "Own product" },
  "Web para gestión de extraescolares y casales para colegios y AFAs, desarrollada íntegramente por mí y ya en producción.":
    {
      ca: "Web per a la gestió d'extraescolars i casals per a escoles i AFAs, desenvolupada íntegrament per mi i ja en producció.",
      en: "Website for managing after-school activities and summer camps for schools and parent associations, built entirely by me and already live.",
    },
  "Web a medida para empresa, recién lanzada a producción y posicionándose en Google para captación orgánica de clientes.":
    {
      ca: "Web a mida per a empresa, recent llançada a producció i posicionant-se a Google per captar clients de manera orgànica.",
      en: "Custom business website, just launched and climbing on Google to win customers organically.",
    },
  "Plataforma propia para trabajar con PDF directamente en el navegador, ya indexada en Google con múltiples páginas operativas.":
    {
      ca: "Plataforma pròpia per treballar amb PDF directament al navegador, ja indexada a Google amb múltiples pàgines operatives.",
      en: "Own platform to work with PDFs right in the browser, already indexed on Google with many working pages.",
    },
  "Web a medida para una empresa de montaje de cocinas": {
    ca: "Web a mida per a una empresa de muntatge de cuines",
    en: "Custom website for a kitchen-installation company",
  },
  "Web a medida para una empresa de montaje profesional de cocinas en Cataluña, con presupuesto por WhatsApp.": {
    ca: "Web a mida per a una empresa de muntatge professional de cuines a Catalunya, amb pressupost per WhatsApp.",
    en: "Custom website for a professional kitchen-installation company in Catalonia, with quotes via WhatsApp.",
  },
  "Formación Profesional": { ca: "Formació Professional", en: "Vocational training" },
  "Grado Superior": { ca: "Grau Superior", en: "Higher level" },
  "Grado Medio": { ca: "Grau Mitjà", en: "Intermediate level" },
  "Redes sociales con agentes": { ca: "Xarxes socials amb agents", en: "Social media with agents" },
  "Mis agentes preparan las redes.": { ca: "Els meus agents preparen les xarxes.", en: "My agents prepare the social posts." },
  "Yo decido.": { ca: "Jo decideixo.", en: "I make the calls." },
  "Estrategia": { ca: "Estratègia", en: "Strategy" },
  "Un calendario de 30 días.": { ca: "Un calendari de 30 dies.", en: "A 30-day calendar." },
  "Claude crea": { ca: "Claude crea", en: "Claude creates" },
  "Diseños, textos y descripciones.": { ca: "Dissenys, textos i descripcions.", en: "Designs, copy and captions." },
  "Revisión": { ca: "Revisió", en: "Review" },
  "Cada dato, contrastado.": { ca: "Cada dada, contrastada.", en: "Every fact, double-checked." },
  "Antigravity programa": { ca: "Antigravity programa", en: "Antigravity schedules" },
  "En Meta Business Suite.": { ca: "A Meta Business Suite.", en: "In Meta Business Suite." },
  "Publicación de Instagram": { ca: "Publicació d’Instagram", en: "Instagram post" },
  "Contenido para redes de principio a fin. Dos ejemplos: mi ERP y una empresa de extraescolares.": { ca: "Contingut per a xarxes de principi a fi. Dos exemples: el meu ERP i una empresa d’extraescolars.", en: "Social content from start to finish. Two examples: my ERP and an after-school activities company." },
  "Ver historia": { ca: "Veure història", en: "View story" },
  "Historia de Instagram": { ca: "Història d’Instagram", en: "Instagram story" },
  "Demo": { ca: "Demo", en: "Demo" },
  "Sectores": { ca: "Sectors", en: "Sectors" },
  "Dudas": { ca: "Dubtes", en: "FAQ" },
  "Actividades": { ca: "Activitats", en: "Activities" },
  "AFAs": { ca: "AFAs", en: "PTAs" },
  "Casales": { ca: "Casals", en: "Camps" },
  "Zonas": { ca: "Zones", en: "Areas" },
  "Visitar web": { ca: "Visitar web", en: "Visit site" },
  "Probar plataforma": { ca: "Provar plataforma", en: "Try the platform" },
  "Stock almacén": { ca: "Estoc magatzem", en: "Warehouse stock" },
  "Reposición automática": { ca: "Reposició automàtica", en: "Automatic restocking" },
  "Albarán → Factura": { ca: "Albarà → Factura", en: "Delivery note → Invoice" },
  "Flujos n8n": { ca: "Fluxos n8n", en: "n8n flows" },
  "Webhooks en vivo": { ca: "Webhooks en viu", en: "Live webhooks" },
  "Control operativo": { ca: "Control operatiu", en: "Operations control" },
  "Oficina + App campo": { ca: "Oficina + App de camp", en: "Office + Field app" },
  "Tabla de stock & almacén": { ca: "Taula d'estoc i magatzem", en: "Stock & warehouse table" },
  "Stock óptimo": { ca: "Estoc òptim", en: "Healthy stock" },
  "Alerta n8n": { ca: "Alerta n8n", en: "n8n alert" },
  Reservado: { ca: "Reservat", en: "Reserved" },
  "App Campo": { ca: "App de camp", en: "Field app" },
  "Cierre de parte + consumo material": {
    ca: "Tancament de comunicat + consum de material",
    en: "Job report close-out + material use",
  },
  "Descuento de stock + validación RBAC": {
    ca: "Descompte d'estoc + validació RBAC",
    en: "Stock deduction + RBAC validation",
  },
  "ERP & Factura": { ca: "ERP i factura", en: "ERP & Invoice" },
  "Generación automática y registro": {
    ca: "Generació automàtica i registre",
    en: "Automatic generation and record",
  },

  /* ───────── Web Apps ───────── */
  "Web Apps · Caso real GYMVITY": {
    ca: "Web Apps · Cas real GYMVITY",
    en: "Web Apps · Real case GYMVITY",
  },
  "Apps que se usan desde el móvil, sin pasar por tienda.": {
    ca: "Apps que s'utilitzen des del mòbil, sense passar per botiga.",
    en: "Apps you use from your phone, no app store needed.",
  },
  "Desarrollo aplicaciones web pensadas para el móvil: se abren desde una URL y se sienten como una app. Prueba de ello es":
    {
      ca: "Desenvolupo aplicacions web pensades per al mòbil: s'obren des d'una URL i es senten com una app. Prova d'això és",
      en: "I build web apps designed for the phone: they open from a URL and feel like a native app. Proof of that is",
    },
  ", mi app de entrenamiento con biblioteca de ejercicios, rutinas de la comunidad y seguimiento de progreso.":
    {
      ca: ", la meva app d'entrenament amb biblioteca d'exercicis, rutines de la comunitat i seguiment del progrés.",
      en: ", my training app with an exercise library, community routines and progress tracking.",
    },
  ejercicios: { ca: "exercicis", en: "exercises" },
  "Con técnica, filtros y favoritos guardados.": {
    ca: "Amb tècnica, filtres i preferits guardats.",
    en: "With technique, filters and saved favourites.",
  },
  Instalable: { ca: "Instal·lable", en: "Installable" },
  "android · ios": { ca: "android · ios", en: "android · ios" },
  "Manifest web y base Capacitor.": {
    ca: "Manifest web i base Capacitor.",
    en: "Web manifest and Capacitor base.",
  },
  Social: { ca: "Social", en: "Social" },
  comunidad: { ca: "comunitat", en: "community" },
  "Rutinas de otros atletas en la app.": {
    ca: "Rutines d'altres atletes a l'app.",
    en: "Other athletes' routines in the app.",
  },
  "Hablemos de tu Web App": {
    ca: "Parlem de la teva Web App",
    en: "Let's talk about your Web App",
  },
  "Pídeme una propuesta de Web App": {
    ca: "Demana'm una proposta de Web App",
    en: "Ask me for a Web App proposal",
  },
  "GYMVITY: biblioteca de 144 ejercicios con filtros": {
    ca: "GYMVITY: biblioteca de 144 exercicis amb filtres",
    en: "GYMVITY: library of 144 exercises with filters",
  },
  "GYMVITY: pantalla de inicio con rutinas de la comunidad": {
    ca: "GYMVITY: pantalla d'inici amb rutines de la comunitat",
    en: "GYMVITY: home screen with community routines",
  },
  "GYMVITY: registro de progreso con consistencia y volumen": {
    ca: "GYMVITY: registre de progrés amb consistència i volum",
    en: "GYMVITY: progress log with consistency and volume",
  },

  /* ───────── Stack ───────── */
  "Con qué": { ca: "Amb què", en: "What I" },
  "trabajo.": { ca: "treballo.", en: "work with." },
  Stack: { ca: "Stack", en: "Stack" },
  "Herramientas que uso": { ca: "Eines que faig servir", en: "Tools I use" },
  Frontend: { ca: "Frontend", en: "Frontend" },
  Lenguaje: { ca: "Llenguatge", en: "Language" },
  Framework: { ca: "Framework", en: "Framework" },
  Estilos: { ca: "Estils", en: "Styling" },
  Workflows: { ca: "Workflows", en: "Workflows" },
  LLM: { ca: "LLM", en: "LLM" },
  "Second Brain": { ca: "Second Brain", en: "Second Brain" },
  "E-Commerce": { ca: "E-commerce", en: "E-commerce" },
  CMS: { ca: "CMS", en: "CMS" },
  "UI/UX": { ca: "UI/UX", en: "UI/UX" },
  Visual: { ca: "Visual", en: "Visual" },
  Integración: { ca: "Integració", en: "Integration" },
  Git: { ca: "Git", en: "Git" },
  "Agentes IA": { ca: "Agents IA", en: "AI agents" },

  /* ───────── Sobre mí ───────── */
  "Sobre mí": { ca: "Sobre mi", en: "About me" },
  "Perfil híbrido.": { ca: "Perfil híbrid.", en: "Hybrid profile." },
  "Negocio + IA.": { ca: "Negoci + IA.", en: "Business + AI." },
  "No vengo del código: vengo del marketing y la gestión. Con la IA construyo lo que tu negocio necesita de verdad.":
    {
      ca: "No vinc del codi: vinc del màrqueting i la gestió. Amb la IA construeixo el que el teu negoci necessita de debò.",
      en: "I don't come from code: I come from marketing and management. With AI I build what your business really needs.",
    },
  Marketing: { ca: "Màrqueting", en: "Marketing" },
  Gestión: { ca: "Gestió", en: "Management" },
  prácticas: { ca: "pràctiques", en: "internship" },
  formación: { ca: "formació", en: "training" },
  Formación: { ca: "Formació", en: "Education" },
  Experiencia: { ca: "Experiència", en: "Experience" },
  "Qué cubre": { ca: "Què cobreix", en: "What it covers" },
  "Transformación digital": { ca: "Transformació digital", en: "Digital transformation" },
  "Automatización de procesos": { ca: "Automatització de processos", en: "Process automation" },
  "IA aplicada": { ca: "IA aplicada", en: "Applied AI" },
  "Índice": { ca: "Índex", en: "Index" },
  "Proyecto": { ca: "Projecte", en: "Project" },
  "Skill": { ca: "Skill", en: "Skill" },
  "Regla": { ca: "Regla", en: "Rule" },
  "Nota": { ca: "Nota", en: "Note" },
  "Regla o nota": { ca: "Regla o nota", en: "Rule or note" },
  "Toca y arrastra los puntos": { ca: "Toca i arrossega els punts", en: "Tap and drag the dots" },
  "de prácticas en empresas reales": { ca: "de pràctiques en empreses reals", en: "of internships in real companies" },
  "516 h de marketing digital y 416 h de gestión administrativa.": {
    ca: "516 h de màrqueting digital i 416 h de gestió administrativa.",
    en: "516 h of digital marketing and 416 h of administrative management.",
  },
  "Lo construyo con IA,": { ca: "Ho construeixo amb IA,", en: "I build it with AI," },
  "pieza a pieza y revisado.": { ca: "peça a peça i revisat.", en: "piece by piece and reviewed." },
  "Marketing digital, gestión e IA aplicada al negocio.": {
    ca: "Màrqueting digital, gestió i IA aplicada al negoci.",
    en: "Digital marketing, administration and AI applied to business.",
  },
  "Secciones": { ca: "Seccions", en: "Sections" },
  "Hecho en Barcelona": { ca: "Fet a Barcelona", en: "Made in Barcelona" },
  "en PageSpeed Insights": { ca: "a PageSpeed Insights", en: "on PageSpeed Insights" },
  "En móvil, con 100 en accesibilidad, buenas prácticas y SEO, en mis webs en producción.": {
    ca: "En mòbil, amb 100 en accessibilitat, bones pràctiques i SEO, a les meves webs en producció.",
    en: "On mobile, with 100 in accessibility, best practices and SEO, on my live websites.",
  },
  "Italiano: lectura": { ca: "Italià: lectura", en: "Italian: reading" },
  "Un punto, una nota": { ca: "Un punt, una nota", en: "One dot, one note" },
  "Decisión, regla o cliente.": { ca: "Decisió, regla o client.", en: "Decision, rule or client." },
  "Arrástralos": { ca: "Arrossega'ls", en: "Drag them" },
  "Arrastran a sus vecinos.": { ca: "Arrosseguen els veïns.", en: "They pull their neighbours." },
  "La luz es la IA": { ca: "La llum és la IA", en: "The light is the AI" },
  "Lee siguiendo los enlaces.": { ca: "Llegeix seguint els enllaços.", en: "It reads by following links." },
  "IA aplicada a la empresa": { ca: "IA aplicada a l'empresa", en: "AI applied to the business" },
  "CFGS en Marketing y Publicidad": {
    ca: "CFGS en Màrqueting i Publicitat",
    en: "Higher Vocational Degree in Marketing & Advertising",
  },
  "CFGM en Gestión Administrativa": {
    ca: "CFGM en Gestió Administrativa",
    en: "Intermediate Vocational Degree in Administrative Management",
  },
  "Agente del Cambio Tecnológico (375 h)": {
    ca: "Agent del Canvi Tecnològic (375 h)",
    en: "Technological Change Agent (375 h)",
  },
  "Monlau, Barcelona": { ca: "Monlau, Barcelona", en: "Monlau, Barcelona" },
  "Generalitat de Catalunya": { ca: "Generalitat de Catalunya", en: "Generalitat de Catalunya" },
  "Prácticas en Marketing Digital": {
    ca: "Pràctiques en Màrqueting Digital",
    en: "Internship in Digital Marketing",
  },
  "Prácticas de Gestión Administrativa y Logística": {
    ca: "Pràctiques de Gestió Administrativa i Logística",
    en: "Internship in Administrative Management & Logistics",
  },
  "Diset Control de Plagas": { ca: "Diset Control de Plagas", en: "Diset Control de Plagas" },
  "Ferretería FIMSA": { ca: "Ferretería FIMSA", en: "Ferretería FIMSA" },
  "Monitor de Fútbol Base": { ca: "Monitor de Futbol Base", en: "Youth Football Coach" },
  "Escuela Wagner, Barcelona": { ca: "Escola Wagner, Barcelona", en: "Escuela Wagner, Barcelona" },
  "Gestión integral de e-commerce en Shopify y WordPress.": {
    ca: "Gestió integral d'e-commerce a Shopify i WordPress.",
    en: "End-to-end e-commerce management on Shopify and WordPress.",
  },
  "Atención al cliente por WhatsApp Business, derivando a comerciales.": {
    ca: "Atenció al client per WhatsApp Business, derivant a comercials.",
    en: "Customer service via WhatsApp Business, handing leads to the sales team.",
  },
  "Diseño visual y prototipado de piezas y pantallas en Figma y Canva.": {
    ca: "Disseny visual i prototipatge de peces i pantalles a Figma i Canva.",
    en: "Visual design and prototyping of assets and screens in Figma and Canva.",
  },
  "Control administrativo diario: facturación, albaranes y contabilidad.": {
    ca: "Control administratiu diari: facturació, albarans i comptabilitat.",
    en: "Daily admin control: invoicing, delivery notes and bookkeeping.",
  },
  "Gestión y control de inventarios físicos y digitales.": {
    ca: "Gestió i control d'inventaris físics i digitals.",
    en: "Management and control of physical and digital inventory.",
  },
  "Coordinación operativa continua con proveedores y clientes.": {
    ca: "Coordinació operativa contínua amb proveïdors i clients.",
    en: "Ongoing operational coordination with suppliers and customers.",
  },
  "Planificación semanal de entrenamientos y objetivos de equipo.": {
    ca: "Planificació setmanal d'entrenaments i objectius d'equip.",
    en: "Weekly training planning and team goals.",
  },
  "Liderazgo y gestión dinámica de grupos.": {
    ca: "Lideratge i gestió dinàmica de grups.",
    en: "Leadership and dynamic group management.",
  },
  "Comunicación cercana y seguimiento continuo con las familias.": {
    ca: "Comunicació propera i seguiment continu amb les famílies.",
    en: "Close communication and ongoing follow-up with families.",
  },
  "Webs a medida en React y TypeScript, con SEO técnico.": {
    ca: "Webs a mida en React i TypeScript, amb SEO tècnic.",
    en: "Custom websites in React and TypeScript, with technical SEO.",
  },
  "Flujos con n8n y agentes de IA que trabajan solos.": {
    ca: "Fluxos amb n8n i agents d'IA que treballen sols.",
    en: "n8n workflows and AI agents that work on their own.",
  },
  "Descargar CV completo": { ca: "Descarregar CV complet", en: "Download full CV" },
  "Español y Català: nativos · English": {
    ca: "Castellà i català: natius · English",
    en: "Spanish and Catalan: native · English",
  },
  "Negocio + IA": { ca: "Negoci + IA", en: "Business + AI" },
  "La Sagrera, Barcelona": { ca: "La Sagrera, Barcelona", en: "La Sagrera, Barcelona" },

  /* ───────── Formación ───────── */
  "Primero aprendí cómo funciona un negocio por dentro.": {
    ca: "Primer vaig aprendre com funciona un negoci per dins.",
    en: "First I learned how a business works from the inside.",
  },
  "Después, a construirle las herramientas.": {
    ca: "Després, a construir-li les eines.",
    en: "Then, how to build its tools.",
  },
  Centro: { ca: "Centre", en: "School" },
  "Marketing y Publicidad": { ca: "Màrqueting i Publicitat", en: "Marketing & Advertising" },
  "Gestión Administrativa": { ca: "Gestió Administrativa", en: "Administrative Management" },
  "Lo que estudié y aprendí": {
    ca: "El que he estudiat i après",
    en: "What I studied and learned",
  },
  "Cómo lo aplico hoy": { ca: "Com ho aplico avui", en: "How I use it today" },
  "Estrategia digital": { ca: "Estratègia digital", en: "Digital strategy" },
  SEO: { ca: "SEO", en: "SEO" },
  "Conversión comercial": { ca: "Conversió comercial", en: "Sales conversion" },
  "Diseño de propuestas": { ca: "Disseny de propostes", en: "Proposal design" },
  "Lanzamiento de producto": { ca: "Llançament de producte", en: "Product launch" },
  Facturación: { ca: "Facturació", en: "Invoicing" },
  Albaranes: { ca: "Albarans", en: "Delivery notes" },
  Contabilidad: { ca: "Comptabilitat", en: "Bookkeeping" },
  "Operativa interna": { ca: "Operativa interna", en: "Internal operations" },
  "Cada web que hago nace con SEO técnico y pensada para convertir, no solo para verse bien.": {
    ca: "Cada web que faig neix amb SEO tècnic i pensada per convertir, no només per lluir bé.",
    en: "Every website I build starts with technical SEO and is made to convert, not just to look good.",
  },
  "Mi ERP nace aquí: en Diset vi cómo una empresa de control de plagas trabaja con su software de gestión y lo uní a lo que estudié.":
    {
      ca: "El meu ERP neix aquí: a Diset vaig veure com una empresa de control de plagues treballa amb el seu programari de gestió i ho vaig unir al que havia estudiat.",
      en: "My ERP starts here: at Diset I saw how a pest-control company works with its management software and combined it with what I studied.",
    },
  "Prácticas en": { ca: "Pràctiques a", en: "Internship at" },

  /* ───────── Subvención ───────── */
  "Subvenciones salariales directas": {
    ca: "Subvencions salarials directes",
    en: "Direct salary subsidies",
  },
  "Contratarme puede abrirle a tu empresa": {
    ca: "Contractar-me pot obrir a la teva empresa",
    en: "Hiring me can open up for your company",
  },
  "subvenciones salariales.": { ca: "subvencions salarials.", en: "salary subsidies." },
  "Tengo la acreditación oficial de la Generalitat como Agente del Cambio Tecnológico. Por eso, la empresa que me contrate puede acceder a subvenciones salariales directas para digitalización e inteligencia artificial.":
    {
      ca: "Tinc l'acreditació oficial de la Generalitat com a Agent del Canvi Tecnològic. Per això, l'empresa que em contracti pot accedir a subvencions salarials directes per a digitalització i intel·ligència artificial.",
      en: "I hold the Generalitat's official accreditation as a Technological Change Agent. That is why the company that hires me can access direct salary subsidies for digitalisation and artificial intelligence.",
    },
  "Consultar contratación": { ca: "Consultar contractació", en: "Ask about hiring" },
  "Me contratas": { ca: "Em contractes", en: "You hire me" },
  "Sumas un perfil de marketing, gestión e IA.": {
    ca: "Suma un perfil de màrqueting, gestió i IA.",
    en: "You add a marketing, management and AI profile.",
  },
  "Acreditación oficial": { ca: "Acreditació oficial", en: "Official accreditation" },
  "Agente del Cambio Tecnológico, Generalitat de Catalunya.": {
    ca: "Agent del Canvi Tecnològic, Generalitat de Catalunya.",
    en: "Technological Change Agent, Generalitat de Catalunya.",
  },
  "Subvención salarial directa": { ca: "Subvenció salarial directa", en: "Direct salary subsidy" },
  "Para digitalización e inteligencia artificial.": {
    ca: "Per a digitalització i intel·ligència artificial.",
    en: "For digitalisation and artificial intelligence.",
  },

  /* ───────── Contacto, pie y varios ───────── */
  Email: { ca: "Correu", en: "Email" },
  "WhatsApp y teléfono": { ca: "WhatsApp i telèfon", en: "WhatsApp & phone" },
  Ubicación: { ca: "Ubicació", en: "Location" },
  "Ver el vídeo": { ca: "Veure el vídeo", en: "Watch the video" },
  "Cerrar vídeo": { ca: "Tancar el vídeo", en: "Close video" },
  "Vídeo de Oderalo": { ca: "Vídeo d'Oderalo", en: "Oderalo video" },
  "Presencial, híbrido o remoto": {
    ca: "Presencial, híbrid o en remot",
    en: "On-site, hybrid or remote",
  },
  Copiar: { ca: "Copiar", en: "Copy" },
  Copiado: { ca: "Copiat", en: "Copied" },
  "Copiar correo": { ca: "Copiar correu", en: "Copy email" },
  "Copiar teléfono": { ca: "Copiar telèfon", en: "Copy phone" },
  "Marketing · Gestión · Desarrollo Web · ERP · Automatización IA": {
    ca: "Màrqueting · Gestió · Desenvolupament Web · ERP · Automatització IA",
    en: "Marketing · Management · Web Development · ERP · AI Automation",
  },
  "ERICK RODRÍGUEZ · MARKETING · GESTIÓN · IA · BARCELONA · DISPONIBLE PARA CONTRATACIÓN · 375 H AGENTE DEL CAMBIO · ":
    {
      ca: "ERICK RODRÍGUEZ · MÀRQUETING · GESTIÓ · IA · BARCELONA · DISPONIBLE PER A CONTRACTACIÓ · 375 H AGENT DEL CANVI · ",
      en: "ERICK RODRÍGUEZ · MARKETING · MANAGEMENT · AI · BARCELONA · AVAILABLE FOR HIRE · 375 H CHANGE AGENT · ",
    },
  "Erick Rodríguez — Marketing · Gestión · IA — ": {
    ca: "Erick Rodríguez — Màrqueting · Gestió · IA — ",
    en: "Erick Rodríguez — Marketing · Management · AI — ",
  },
};
