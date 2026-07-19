"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AREAS_STRIP } from "@/lib/questions";

const STEP_MS = 320;

export function Analyzing() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % AREAS_STRIP.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <p className="text-base font-medium text-da-white">Analizando tu negocio…</p>
      <div className="flex w-full max-w-sm flex-col gap-2.5">
        {AREAS_STRIP.map((area, i) => {
          const passed = i < activeIndex || (i === activeIndex && activeIndex === AREAS_STRIP.length - 1);
          const isActive = i === activeIndex;
          return (
            <div
              key={area}
              className="flex items-center gap-3 rounded-lg border border-da-panel-border bg-da-panel px-4 py-2.5 text-left text-sm"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  passed ? "border-da-green bg-da-green" : "border-white/25"
                }`}
              >
                {isActive && !passed && (
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-da-green"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </span>
              <span className={isActive ? "text-da-white" : "text-da-gray"}>{area}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
