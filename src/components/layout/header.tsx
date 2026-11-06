"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PandiLogo } from "@/components/brand/logo";
import { brandConfig } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Cotizador Mágico", href: "#cotizador" },
    { label: "Paquetes & Destinos", href: "#paquetes" },
    { label: "¿Por qué Pandi?", href: "#beneficios" },
    { label: "Comunidad & Reseñas", href: "#comunidad" },
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "¡Hola Pasaporte Pandi! Me gustaría cotizar un viaje personalizado."
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <PandiLogo showText />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-primary font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={handleWhatsAppClick}
            variant="whatsapp"
            size="default"
            className="rounded-full shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Hablar con un Asesor</span>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            aria-label="Abrir menú de navegación"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-foreground hover:bg-muted focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-foreground/90 hover:text-primary py-2 px-2 rounded-lg hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  handleWhatsAppClick();
                }}
                variant="whatsapp"
                className="w-full justify-center rounded-xl py-3"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Inmediato</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
