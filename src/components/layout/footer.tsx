import React from "react";
import Link from "next/link";
import { PandiLogo } from "@/components/brand/logo";
import { brandConfig } from "@/config/brand";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/brand/social-icons";
import { Lock, Heart, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground pt-16 pb-24 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <PandiLogo showText />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {brandConfig.description}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {brandConfig.slogan}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={brandConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Pasaporte Pandi"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground/80 hover:text-pink-500 hover:bg-pink-50 transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={brandConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Pasaporte Pandi"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground/80 hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={brandConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Pasaporte Pandi"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground/80 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Explorar
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#cotizador" className="hover:text-primary transition-colors">
                  Cotizador Mágico
                </Link>
              </li>
              <li>
                <Link href="#paquetes" className="hover:text-primary transition-colors">
                  Paquetes Destacados
                </Link>
              </li>
              <li>
                <Link href="#como-cotizar" className="hover:text-primary transition-colors">
                  Cómo cotizar
                </Link>
              </li>
              <li>
                <Link href="#comunidad" className="hover:text-primary transition-colors">
                  Opiniones de Clientes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Atención
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>{brandConfig.contact.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>{brandConfig.contact.email}</span>
              </li>
              <li className="text-xs text-muted-foreground/80 pt-1">
                {brandConfig.contact.hours}
              </li>
            </ul>
          </div>

          {/* Trust Guarantees */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Garantías Pandi
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Viajes organizados bajo regulaciones de agencias de viajes oficiales. Tus fondos protegidos y reservas garantizadas.
            </p>
            <div className="pt-1">
              <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                ✓ Reserva 100% Segura
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar with discreet admin link */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            © {currentYear} {brandConfig.legalName}. Hecho con <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> para viajeros felices.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:underline">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="hover:underline">
              Términos de Servicio
            </Link>
            {/* Discreet Admin Login Link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-muted-foreground/60 hover:text-foreground transition-colors"
              title="Acceso Administrativo"
            >
              <Lock className="h-3 w-3" />
              <span>Portal Asesores</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
