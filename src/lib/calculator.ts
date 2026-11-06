export type DestinationKey = "disney" | "crucero" | "europa" | "playa";
export type ExperienceStyle = "esencial" | "clasico" | "deluxe";

export interface QuoteInputs {
  destination: DestinationKey;
  adults: number;
  children: number;
  travelMonth: string; // "enero", "febrero", ...
  experienceStyle: ExperienceStyle;
}

export interface QuoteCalculationResult {
  folio: string;
  destinationKey: DestinationKey;
  destinationLabel: string;
  totalTravelers: number;
  adults: number;
  children: number;
  travelMonth: string;
  experienceStyle: ExperienceStyle;
  pandiTotalUsd: number;
  pandiPerPersonUsd: number;
  pandiMinRangeUsd: number;
  pandiMaxRangeUsd: number;
  diyTotalUsd: number;
  diyPerPersonUsd: number;
  savingsUsd: number;
  savingsPercentage: number;
  inclusions: string[];
  diyRisks: string[];
  pandiAdvantages: string[];
}

export const DESTINATIONS_CONFIG: Record<
  DestinationKey,
  {
    label: string;
    description: string;
    basePandiAdult: number;
    basePandiChild: number;
    baseDiyAdult: number;
    baseDiyChild: number;
    inclusions: string[];
    diyRisks: string[];
  }
> = {
  disney: {
    label: "Orlando: Disney & Universal",
    description: "Parques temáticos, hoteles in-resort y reservas mágicas",
    basePandiAdult: 1450,
    basePandiChild: 1150,
    baseDiyAdult: 1820,
    baseDiyChild: 1480,
    inclusions: [
      "Hospedaje temático con transporte oficial a parques",
      "Pases multidía Disney Park Hopper + Universal Studios",
      "Estrategia de filas rápidas (Lightning Lane & Express Pass)",
      "Reservas de restaurantes con personajes icónicos",
      "Monitoreo de promociones retroactivas antes de viajar",
      "Asesoría concierge Pandi 24/7 vía WhatsApp",
    ],
    diyRisks: [
      "Filas de 90+ minutos por falta de estrategia en apps complejas",
      "Pérdida de reservaciones de restaurantes con meses de anticipación",
      "Tarifas no reembolsables sin derecho a promociones sobrevenidas",
      "Cero soporte en caso de cancelaciones o emergencias en parque",
    ],
  },
  crucero: {
    label: "Crucero Caribe & Bahamas",
    description: "Navegación en barcos de última generación e islas privadas",
    basePandiAdult: 890,
    basePandiChild: 590,
    baseDiyAdult: 1190,
    baseDiyChild: 850,
    inclusions: [
      "Camarote con balcón y todas las comidas gourmet incluidas",
      "Parada en isla privada exclusiva con club de playa y parques",
      "Propinas de tripulación e impuestos portuarios incluidos",
      "Bono de crédito a bordo para bebidas o excursiones",
      "Check-in marítimo anticipado gestionado por Pandi",
    ],
    diyRisks: [
      "Sorpresas de cargos adicionales de $150+ USD por persona en propinas",
      "Elección de cabina ruidosa o con vibración de motores",
      "Complicaciones con documentación migratoria y tiempos de embarque",
    ],
  },
  europa: {
    label: "Europa: Madrid, París y Roma",
    description: "Ciudades icónicas con trenes de alta velocidad y hoteles céntricos",
    basePandiAdult: 2350,
    basePandiChild: 1950,
    baseDiyAdult: 2950,
    baseDiyChild: 2450,
    inclusions: [
      "Vuelos internacionales y trenes de alta velocidad entre capitales",
      "Hoteles boutique céntricos 4 estrellas con desayuno buffet",
      "Entradas prioritarias sin fila a museos y monumentos principales",
      "Paseos y tours guiados en español",
      "Itinerario digital interactivo minuto a minuto en app",
    ],
    diyRisks: [
      "Pérdida de conexiones de trenes por traslados lejanos a estaciones",
      "Boletos agotados en Louvre, Coliseo o Vaticano",
      "Sobrecostos de equipaje y hoteles fuera del centro histórico",
    ],
  },
  playa: {
    label: "Cancún & Riviera Maya All-Inclusive",
    description: "Resorts 5 estrellas de lujo frente a playa turquesa",
    basePandiAdult: 780,
    basePandiChild: 420,
    baseDiyAdult: 1050,
    baseDiyChild: 620,
    inclusions: [
      "Resort 5 estrellas All-Inclusive frente al mar",
      "Traslados privados ida y vuelta aeropuerto-hotel",
      "Pase de un día con transporte a parque temático (Xcaret / Xel-Há)",
      "Bebidas premium y restaurantes temáticos ilimitados",
      "Amenidad de bienvenida especial y late check-out garantizado",
    ],
    diyRisks: [
      "Cobros abusivos en traslados y taxis en el aeropuerto",
      "Tarifas no transparentes que excluyen impuestos ambientales",
      "Resorts lejanos a atractivos principales o con sargazo imprevisto",
    ],
  },
};

export const SEASON_MULTIPLIERS: Record<string, number> = {
  enero: 0.95,
  febrero: 1.0,
  marzo: 1.15,
  abril: 1.2,
  mayo: 1.05,
  junio: 1.25,
  julio: 1.3,
  agosto: 1.2,
  septiembre: 0.9,
  octubre: 1.05,
  noviembre: 1.15,
  diciembre: 1.35,
};

export const STYLE_MULTIPLIERS: Record<ExperienceStyle, { multiplier: number; label: string }> = {
  esencial: { multiplier: 1.0, label: "Experiencia Esencial" },
  clasico: { multiplier: 1.2, label: "Confort Superior" },
  deluxe: { multiplier: 1.45, label: "Experiencia VIP / All-Inclusive Deluxe" },
};

export const COMMON_PANDI_ADVANTAGES = [
  "Asesoría y diseño de viaje 100% gratuita",
  "Pagas exactamente lo mismo o menos que por tu cuenta",
  "Planes de pago flexibles sin intereses",
  "Soporte concierge de un humano real 24/7 vía WhatsApp",
  "Gestión de imprevistos, cambios de horario o reprogramación",
];

export function generateQuoteFolio(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PANDI-${year}-${randomChars}`;
}

export function calculateQuote(inputs: QuoteInputs): QuoteCalculationResult {
  const adults = Math.max(1, inputs.adults || 1);
  const children = Math.max(0, inputs.children || 0);
  const totalTravelers = adults + children;

  const config = DESTINATIONS_CONFIG[inputs.destination] || DESTINATIONS_CONFIG.disney;

  const normalizedMonth = (inputs.travelMonth || "enero").toLowerCase().trim();
  const seasonMultiplier = SEASON_MULTIPLIERS[normalizedMonth] ?? 1.0;

  const styleConfig = STYLE_MULTIPLIERS[inputs.experienceStyle] ?? STYLE_MULTIPLIERS.esencial;
  const styleMultiplier = styleConfig.multiplier;

  // Pandi cost calculation
  const pandiBase = (adults * config.basePandiAdult) + (children * config.basePandiChild);
  const rawPandiTotal = pandiBase * seasonMultiplier * styleMultiplier;
  const pandiTotalUsd = Math.round(rawPandiTotal / 5) * 5;
  const pandiPerPersonUsd = Math.round(pandiTotalUsd / totalTravelers);

  // Range estimation (approx -8% to +10% depending on flight/hotel exact room category)
  const pandiMinRangeUsd = Math.round((pandiTotalUsd * 0.92) / 10) * 10;
  const pandiMaxRangeUsd = Math.round((pandiTotalUsd * 1.10) / 10) * 10;

  // DIY cost calculation (Booking alone without agency volume discounts, paying full retail on attractions)
  const diyBase = (adults * config.baseDiyAdult) + (children * config.baseDiyChild);
  const rawDiyTotal = diyBase * seasonMultiplier * styleMultiplier;
  const diyTotalUsd = Math.round(rawDiyTotal / 5) * 5;
  const diyPerPersonUsd = Math.round(diyTotalUsd / totalTravelers);

  // Net Savings
  const rawSavings = Math.max(0, diyTotalUsd - pandiTotalUsd);
  const savingsUsd = rawSavings;
  const savingsPercentage = diyTotalUsd > 0 ? Math.round((savingsUsd / diyTotalUsd) * 100) : 0;

  return {
    folio: generateQuoteFolio(),
    destinationKey: inputs.destination,
    destinationLabel: config.label,
    totalTravelers,
    adults,
    children,
    travelMonth: inputs.travelMonth,
    experienceStyle: inputs.experienceStyle,
    pandiTotalUsd,
    pandiPerPersonUsd,
    pandiMinRangeUsd,
    pandiMaxRangeUsd,
    diyTotalUsd,
    diyPerPersonUsd,
    savingsUsd,
    savingsPercentage,
    inclusions: config.inclusions,
    diyRisks: config.diyRisks,
    pandiAdvantages: COMMON_PANDI_ADVANTAGES,
  };
}
