import React from "react";
import { Star, Heart, Award, CheckCircle2 } from "lucide-react";
import { InstagramIcon, TikTokIcon } from "@/components/brand/social-icons";

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  platform: "instagram" | "tiktok";
  destination: string;
  avatar: string;
  quote: string;
  likes: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Familia Morales",
    handle: "@morales_adventures",
    platform: "instagram",
    destination: "Disney World & Universal Orlando",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "¡La mejor decisión de nuestras vidas! Pandi nos armó la estrategia para subirnos a Tron y Guardians of the Galaxy sin hacer horas de fila. ¡Y nos costó lo mismo que la web oficial!",
    likes: "2.4k",
    rating: 5,
  },
  {
    id: "t2",
    name: "Carlos & Andrea",
    handle: "@viajandoxelmundo",
    platform: "tiktok",
    destination: "Crucero Caribe & Bahamas",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "Nuestro primer crucero y estábamos perdidos con los paquetes de bebidas y propinas. Con Pandi pagamos a 12 meses y nos dieron un crédito a bordo de regalo. 100/10.",
    likes: "14.8k",
    rating: 5,
  },
  {
    id: "t3",
    name: "Mariana S.",
    handle: "@mariana_trips",
    platform: "instagram",
    destination: "París, Roma y Madrid",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    quote: "Increíble viaje de 12 días por Europa. Los trenes ya estaban reservados en los mejores horarios y los hoteles estaban al lado de las estaciones. Cero preocupaciones.",
    likes: "3.1k",
    rating: 5,
  },
];

const certifications = [
  {
    title: "Disney EarMarked Partner",
    description: "Agencia autorizada con capacitación oficial Disney Destinations",
  },
  {
    title: "Universal Parks Specialist",
    description: "Expertos certificados en Universal Orlando Resort y Epic Universe",
  },
  {
    title: "Miembro CLIA",
    description: "Asociación Internacional de Líneas de Cruceros garantizada",
  },
  {
    title: "Garantía de Mejor Precio",
    description: "Monitoreo continuo de promociones antes de tu salida",
  },
];

export function SocialProof() {
  return (
    <section id="comunidad" className="py-20 bg-muted/30 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-xs font-bold text-accent">
            <Heart className="h-3.5 w-3.5 fill-accent" />
            <span>Comunidad Pandi en Redes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Historias reales de viajeros que confiaron en nosotros
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Más de 1,200 familias y parejas han disfrutado de vacaciones mágicas sin estrés. Conoce lo que comparten en TikTok e Instagram.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-3xl bg-card p-7 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Header: Avatar, Name, Platform tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.handle}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {item.platform === "instagram" ? (
                      <InstagramIcon className="h-3.5 w-3.5 text-pink-500" />
                    ) : (
                      <TikTokIcon className="h-3.5 w-3.5 text-foreground" />
                    )}
                  </span>
                </div>

                {/* Destination tag */}
                <div className="inline-block rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  📍 {item.destination}
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Footer Engagement */}
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-medium">
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> {item.likes} me gusta
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Viajero Verificado
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Certifications & Partnerships */}
        <div className="mt-16 rounded-3xl bg-card border border-border p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="h-4 w-4" />
                <span>Certificaciones Oficiales</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Respaldo de las marcas líderes mundiales
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Trabajamos de forma directa con los operadores turísticos oficiales para darte garantías completas en tus reservas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-2xl">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-bold text-foreground">{cert.title}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
