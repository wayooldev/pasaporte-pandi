import Link from "next/link";
import { PandiLogo } from "@/components/brand/logo";
import { brandConfig } from "@/config/brand";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
          <PandiLogo />
          <Link
            href="/"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {brandConfig.name}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: {lastUpdated}
        </p>

        <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {brandConfig.legalName}
      </footer>
    </div>
  );
}
