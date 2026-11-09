"use client";

import React from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { brandConfig } from "@/config/brand";

export function MobileActionBar() {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "¡Hola Pasaporte Pandi! Quiero asesoría personalizada para mis próximas vacaciones."
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsapp.replace(/\D/g, "")}?text=${text}`, "_blank");
  };

  return (
    <div
      data-testid="mobile-action-bar"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/80 bg-card/95 backdrop-blur-lg px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="flex items-center gap-3">
        {/* Quick jump to quote wizard */}
        <Link
          href="#cotizador"
          className="flex flex-col items-center justify-center rounded-xl bg-muted px-4 py-2 text-foreground font-semibold text-xs border border-border shrink-0 hover:bg-muted/80 transition-colors"
        >
          <Calculator className="h-4 w-4 text-primary mb-0.5" />
          <span>Cotizar</span>
        </Link>

        {/* Pulsating WhatsApp Trigger */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="relative flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-bold text-white shadow-md active:scale-[0.98] transition-transform overflow-hidden"
        >
          {/* Subtle pulse animation element */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>

          <WhatsAppIcon className="h-5 w-5" />
          <span>Cotizar por WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
