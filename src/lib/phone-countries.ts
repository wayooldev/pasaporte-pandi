/** Common dial codes for the quote request form. Default: Mexico. */
export const PHONE_COUNTRIES = [
  { dial: "52", label: "México", short: "MX", iso: "mx" },
  { dial: "1", label: "EE.UU. / Canadá", short: "US", iso: "us" },
  { dial: "34", label: "España", short: "ES", iso: "es" },
  { dial: "57", label: "Colombia", short: "CO", iso: "co" },
  { dial: "54", label: "Argentina", short: "AR", iso: "ar" },
  { dial: "56", label: "Chile", short: "CL", iso: "cl" },
  { dial: "51", label: "Perú", short: "PE", iso: "pe" },
  { dial: "593", label: "Ecuador", short: "EC", iso: "ec" },
  { dial: "502", label: "Guatemala", short: "GT", iso: "gt" },
  { dial: "504", label: "Honduras", short: "HN", iso: "hn" },
  { dial: "503", label: "El Salvador", short: "SV", iso: "sv" },
  { dial: "506", label: "Costa Rica", short: "CR", iso: "cr" },
  { dial: "507", label: "Panamá", short: "PA", iso: "pa" },
] as const;

export type PhoneDialCode = (typeof PHONE_COUNTRIES)[number]["dial"];

export const DEFAULT_PHONE_DIAL: PhoneDialCode = "52";

export function getPhoneCountry(dial: string) {
  return PHONE_COUNTRIES.find((c) => c.dial === dial) ?? PHONE_COUNTRIES[0];
}

export function flagImageUrl(iso: string, width = 40): string {
  return `https://flagcdn.com/w${width}/${iso.toLowerCase()}.png`;
}

/** Build E.164-ish display: +52 5512345678 */
export function formatInternationalPhone(dial: string, localDigits: string): string {
  const digits = localDigits.replace(/\D/g, "");
  return `+${dial} ${digits}`;
}
