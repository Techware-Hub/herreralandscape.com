"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds */
  delay?: number;
  className?: string;
  /** Animation direction */
  y?: number;
  as?: "div" | "li" | "span";
}

/**
 * Subtle fade-up entrance on scroll into view. Honors reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
