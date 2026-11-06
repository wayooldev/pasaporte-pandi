export interface BrandConfig {
  name: string;
  legalName: string;
  tagline: string;
  slogan: string;
  description: string;
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    hours: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    facebook: string;
    linktree: string;
  };
  trustBadges: Array<{
    title: string;
    subtitle: string;
    icon: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export const brandConfig: BrandConfig = {
  name: "Pasaporte Pandi",
  legalName: "Pasaporte Pandi Travel Agency",
  tagline: "Viajes personalizados a Europa, Disney, cruceros y playas",
  slogan: "Viajes que se convierten en recuerdos",
  description:
    "Agencia de viajes personalizados a Europa, Disney, cruceros y playas. Te ayudamos a vivir de (y para) los viajes con asesoría cercana, ahorro real y acompañamiento de principio a fin.",
  contact: {
    // Número confirmado por el cliente; Linktree también lista wa.me/528110429340
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+528332390177",
    whatsappDisplay: "+52 833 239 0177",
    email: "hola@pasaportepandi.com",
    hours: "Lun - Sáb: 9:00 AM - 8:00 PM (Hora CDMX)",
  },
  social: {
    instagram: "https://www.instagram.com/PasaportePandi",
    tiktok: "https://www.tiktok.com/@pasaporte.pandi",
    facebook: "https://www.facebook.com/pasaportepandi",
    linktree: "https://linktr.ee/pasaportepandi",
  },
  trustBadges: [
    {
      title: "Especialistas Europa",
      subtitle: "Itinerarios sin estrés ni logística DIY",
      icon: "ShieldCheck",
    },
    {
      title: "Disney & Cruceros",
      subtitle: "Parques, navieras y playas a tu medida",
      icon: "BadgePercent",
    },
    {
      title: "Asesoría cercana",
      subtitle: "Habla directo con tu agente por WhatsApp",
      icon: "Headset",
    },
    {
      title: "Ahorro vs. hacerlo solo",
      subtitle: "Compara precio Pandi vs DIY en el cotizador",
      icon: "Sparkles",
    },
  ],
  benefits: [
    {
      title: "Cero dolores de cabeza",
      description:
        "Reservas, trenes, pases y restaurantes coordinados por nosotros. Tú solo disfrutas.",
      icon: "CheckCircle",
    },
    {
      title: "Promociones monitoreadas",
      description:
        "Si baja la tarifa antes de viajar, te avisamos para aplicar el ajuste a tu favor.",
      icon: "PiggyBank",
    },
    {
      title: "Planes de pago flexibles",
      description:
        "Aparta con anticipo y liquida en mensualidades según el destino y la temporada.",
      icon: "CreditCard",
    },
    {
      title: "Itinerario a tu ritmo",
      description:
        "Europa, Disney o playa: día a día pensado para tu familia, pareja o viaje solo.",
      icon: "Compass",
    },
  ],
};
