export interface BrandSpecialty {
  key: "europa" | "disney" | "cruceros" | "playas";
  label: string;
}

export interface BrandFaqItem {
  question: string;
  answer: string;
}

export interface BrandConfig {
  name: string;
  legalName: string;
  tagline: string;
  slogan: string;
  description: string;
  siteUrl: string;
  specialties: BrandSpecialty[];
  sameAs: string[];
  faqs: BrandFaqItem[];
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
    "Agencia de viajes personalizados especializada en Europa, Disney, cruceros y playas. Asesoría cercana por WhatsApp y cotización a tu medida, de principio a fin.",
  siteUrl: "https://pasaportepandi.com",
  specialties: [
    { key: "europa", label: "Europa" },
    { key: "disney", label: "Disney" },
    { key: "cruceros", label: "Cruceros" },
    { key: "playas", label: "Playas" },
  ],
  social: {
    instagram: "https://www.instagram.com/PasaportePandi",
    tiktok: "https://www.tiktok.com/@pasaporte.pandi",
    facebook: "https://www.facebook.com/pasaportepandi",
    linktree: "https://linktr.ee/pasaportepandi",
  },
  sameAs: [
    "https://www.instagram.com/PasaportePandi",
    "https://www.facebook.com/pasaportepandi",
    "https://www.tiktok.com/@pasaporte.pandi",
    "https://linktr.ee/pasaportepandi",
  ],
  faqs: [
    {
      question: "¿Qué es Pasaporte Pandi?",
      answer:
        "Somos una agencia de viajes personalizados en México. Nos especializamos en Europa, Disney, cruceros y playas, con asesoría cercana por WhatsApp.",
    },
    {
      question: "¿Cómo solicito una cotización?",
      answer:
        "Usa el cotizador en el sitio para armar tu solicitud (destino, viajeros y mes tentativo). Recibes un folio y un asesor te responde por WhatsApp con disponibilidad real. No publicamos tarifas en la web.",
    },
    {
      question: "¿En qué destinos se especializan?",
      answer:
        "Europa, Disney y Universal, cruceros, y playas. Cada viaje se arma a la medida de tu familia, pareja o viaje en solitario.",
    },
    {
      question: "¿Por qué cotizar con un asesor en lugar de armarlo solo?",
      answer:
        "Coordinamos reservas, logística e itinerario contigo. Hablas directo con tu agente, sin costos ocultos de asesoría: nuestros honorarios los cubren hoteles y navieras.",
    },
  ],
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+528110429340",
    whatsappDisplay: "+52 811 042 9340",
    email: "hola@pasaportepandi.com",
    hours: "Lun - Sáb: 9:00 AM - 8:00 PM (Hora CDMX)",
  },
  trustBadges: [
    {
      title: "Especialistas Europa",
      subtitle: "Itinerarios sin estrés ni logística improvisada",
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
      title: "Cotización personalizada",
      subtitle: "Solicita tu propuesta con disponibilidad real",
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
        "Si baja la tarifa antes de viajar, tu asesor te avisa para aplicar el ajuste a tu favor.",
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
        "Europa, Disney, crucero o playa: día a día pensado para tu familia, pareja o viaje solo.",
      icon: "Compass",
    },
  ],
};

export function specialtiesLabelList(separator = ", "): string {
  return brandConfig.specialties.map((s) => s.label).join(separator);
}
