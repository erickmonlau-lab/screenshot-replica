import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?inline";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../context/LanguageContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Erick Rodríguez — Marketing digital, gestión e IA en Barcelona" },
      {
        name: "description",
        content:
          "Técnico en marketing digital y gestión administrativa, con acreditación oficial en transformación digital. Diseño y construyo herramientas a medida con IA. Barcelona.",
      },
      { name: "author", content: "Erick Rodríguez" },
      {
        property: "og:title",
        content: "Erick Rodríguez — Marketing digital, gestión e IA en Barcelona",
      },
      {
        property: "og:description",
        content:
          "Marketing digital, gestión administrativa y desarrollo con IA aplicada al negocio. Casos reales en producción.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://erickrodriguez.es/" },
      { property: "og:site_name", content: "Erick Rodríguez" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://erickrodriguez.es/#persona",
          name: "Erick Rodríguez",
          alternateName: "Erick Rodríguez Martínez",
          url: "https://erickrodriguez.es/",
          jobTitle: "Técnico en Marketing Digital y Gestión Administrativa",
          description:
            "Técnico en marketing digital y gestión administrativa, con acreditación oficial en transformación digital. Diseña y construye herramientas a medida con IA.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Barcelona",
            addressCountry: "ES",
          },
          alumniOf: { "@type": "EducationalOrganization", name: "Monlau Formación Profesional" },
          knowsLanguage: ["es", "ca", "en"],
          knowsAbout: [
            "Marketing digital",
            "SEO",
            "Gestión administrativa",
            "Transformación digital",
            "Automatización de procesos",
            "Inteligencia artificial aplicada",
            "ERP",
          ],
          sameAs: ["https://www.linkedin.com/in/erick-rodriguez-martinez"],
        }),
      },
    ],
    styles: [{ children: appCss }],
    links: [
      { rel: "canonical", href: "https://erickrodriguez.es/" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
