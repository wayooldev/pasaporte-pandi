import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito, Fraunces, Great_Vibes } from "next/font/google";
import { brandConfig, specialtiesLabelList } from "@/config/brand";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildOrganizationJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const specialtiesTitle = specialtiesLabelList(", ");

export const metadata: Metadata = {
  title: `${brandConfig.name} | Agencia de viajes · ${specialtiesTitle}`,
  description: brandConfig.description,
  metadataBase: new URL(brandConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${brandConfig.name} | ${specialtiesTitle}`,
    description: brandConfig.description,
    url: brandConfig.siteUrl,
    siteName: brandConfig.name,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/brand/pandi-logo.png",
        width: 800,
        height: 800,
        alt: `${brandConfig.name} — ${brandConfig.slogan}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name} | Cotiza ${specialtiesTitle}`,
    description: brandConfig.description,
    images: ["/brand/pandi-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html
        lang="es"
        className={`scroll-smooth ${bodyFont.variable} ${displayFont.variable} ${scriptFont.variable}`}
      >
        <body className="antialiased font-sans bg-background text-foreground min-h-screen flex flex-col">
          <JsonLdScript data={buildOrganizationJsonLd()} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
