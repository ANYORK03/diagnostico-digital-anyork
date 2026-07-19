"use client";

import { MotionConfig } from "framer-motion";

/** Respeta prefers-reduced-motion en todas las animaciones de framer-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
