"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fade + rise on scroll — use for section blocks. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Parent for staggered children with `StaggerItem`. */
export function Stagger({ children, className, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
