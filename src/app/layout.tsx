import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito, Fraunces, Great_Vibes } from "next/font/google";
import { brandConfig } from "@/config/brand";
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

export const metadata: Metadata = {
  title: `${brandConfig.name} | ${brandConfig.slogan}`,
  description: brandConfig.description,
  metadataBase: new URL("https://pasaportepandi.com"),
  openGraph: {
    title: `${brandConfig.name} | Europa, Disney, Cruceros y Playas`,
    description: brandConfig.description,
    url: "https://pasaportepandi.com",
    siteName: brandConfig.name,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/brand/pandi-logo.png",
        width: 800,
        height: 800,
        alt: "Pasaporte Pandi — Viajes que se convierten en recuerdos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name} | ${brandConfig.slogan}`,
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
