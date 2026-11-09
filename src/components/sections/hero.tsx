"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { brandConfig } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  ShieldCheck,
  Sparkles,
  Headset,
  BadgePercent,
  ArrowRight,
  Star,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "¡Hola Pasaporte Pandi! Quiero cotizar un viaje personalizado."
    );
    window.open(
      `https://wa.me/${brandConfig.contact.whatsapp.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <section className="relative overflow-hidden brand-glow border-b border-border/60 py-14 md:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-secondary-foreground ring-1 ring-inset ring-accent/30"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Europa · Disney · Cruceros · Playas</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
              className="font-display text-4xl font-black tracking-tight text-foreground leading-[1.12] sm:text-5xl lg:text-6xl"
            >
              {brandConfig.slogan.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="bg-gradient-to-r from-primary via-[#3d5a80] to-accent bg-clip-text text-transparent">
                {brandConfig.slogan.split(" ").slice(3).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease }}
              className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {brandConfig.tagline}.{" "}
              <strong className="font-semibold text-foreground">Asesoría cercana</strong> por
              WhatsApp y cotización personalizada sin tarifas publicadas en la web.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease }}
              className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Link href="#cotizador" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="accent"
                  className="w-full rounded-full text-base font-bold shadow-lg shadow-accent/30 sm:w-auto"
                >
                  Cotiza tu viaje ahora
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="whatsapp"
                onClick={openWhatsApp}
                className="w-full rounded-full text-base font-bold sm:w-auto animate-pulse-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp con un asesor
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex w-full items-center justify-center gap-4 border-t border-border/70 pt-5 lg:justify-start"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-accent/40 shadow-md">
                <Image
                  src="/brand/pandi-logo.png"
                  alt="Pandi"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-foreground">Maty · Pasaporte Pandi</span>
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  Agente de viajes · Especialista Europa · Dog lover 🐾
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-md">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-2 -top-4 z-10 sm:-right-4"
                >
                  <Badge variant="accent" className="px-3 py-1 text-xs font-bold shadow-md">
                    ★ Cotiza con un asesor
                  </Badge>
                </motion.div>

                <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-2xl shadow-primary/10 ring-1 ring-primary/5">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full">
                      <Image
                        src="/brand/pandi-logo.png"
                        alt="Logo Pasaporte Pandi"
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        ¿Por qué viajar con Pandi?
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Viajes personalizados · Cero estrés
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-muted/70 p-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <div>
                        <h4 className="text-xs font-bold text-foreground">Sin costos ocultos</h4>
                        <p className="text-xs text-muted-foreground">
                          Nuestros honorarios los cubren hoteles y navieras. Pagas lo mismo o menos.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-muted/70 p-3">
                      <BadgePercent className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h4 className="text-xs font-bold text-foreground">Cotización a tu medida</h4>
                        <p className="text-xs text-muted-foreground">
                          Armas tu solicitud en minutos; un asesor responde con disponibilidad real.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-muted/70 p-3">
                      <Headset className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <h4 className="text-xs font-bold text-foreground">WhatsApp directo</h4>
                        <p className="text-xs text-muted-foreground">
                          Habla con Maty y arma tu Europa, Disney, crucero o playa a tu medida.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <Link href="#cotizador" className="block">
                      <Button className="w-full rounded-full font-bold" variant="default">
                        Ir al cotizador
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="#paquetes" className="block">
                      <Button className="w-full rounded-full font-semibold" variant="outline">
                        Ver paquetes destacados
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5" delay={0.1}>
          {brandConfig.trustBadges.map((badge) => (
            <StaggerItem key={badge.title}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card/90 p-4 text-center shadow-sm transition-colors hover:border-accent/50 sm:text-left">
                <span className="text-xs font-extrabold text-foreground">{badge.title}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{badge.subtitle}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
