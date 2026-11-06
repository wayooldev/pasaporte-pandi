import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  /** Show wordmark next to the mark. Prefer the full circular logo alone when false. */
  showText?: boolean;
  /** Use compact avatar mark (for tight headers / mobile). */
  compact?: boolean;
}

export function PandiLogo({
  className = "",
  showText = false,
  compact = false,
}: LogoProps) {
  const size = compact ? 40 : 56;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group ${className}`}
      aria-label="Pasaporte Pandi — inicio"
    >
      <span
        className="relative shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-primary/15 transition-transform duration-300 group-hover:scale-105 group-hover:ring-accent/40"
        style={{ width: size, height: size }}
      >
        <Image
          src="/brand/pandi-logo.png"
          alt="Pasaporte Pandi"
          width={size * 2}
          height={size * 2}
          className="h-full w-full object-cover"
          priority
        />
      </span>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Pasaporte{" "}
            <span className="font-script text-primary text-[1.15em]">Pandi</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Viajes que se convierten en recuerdos
          </span>
        </div>
      )}
    </Link>
  );
}
