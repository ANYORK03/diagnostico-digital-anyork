"use client";

import { motion } from "framer-motion";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Pregunta ${current} de ${total}`}
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          className="h-full rounded-full bg-da-green"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 160, damping: 26 }}
        />
      </div>
      <span className="shrink-0 text-xs tabular-nums text-da-gray">
        {current}/{total}
      </span>
    </div>
  );
}
