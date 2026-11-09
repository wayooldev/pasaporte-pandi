import React from "react";
import { flagImageUrl } from "@/lib/phone-countries";
import { cn } from "@/lib/utils";

interface CountryFlagProps {
  iso: string;
  alt?: string;
  className?: string;
}

export function CountryFlag({ iso, alt = "", className }: CountryFlagProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagImageUrl(iso, 40)}
      alt={alt}
      width={20}
      height={14}
      loading="lazy"
      decoding="async"
      className={cn(
        "block h-3.5 w-5 shrink-0 rounded-[2px] object-cover shadow-sm ring-1 ring-black/10",
        className
      )}
    />
  );
}
