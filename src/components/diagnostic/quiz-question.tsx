"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/types";

const ADVANCE_DELAY_MS = 280;

export function QuizQuestion({
  question,
  selectedOptionId,
  onAnswer,
  onBack,
  isFirst,
}: {
  question: Question;
  selectedOptionId?: string;
  onAnswer: (optionId: string) => void;
  onBack: () => void;
  isFirst: boolean;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    setPendingId(null);
  }, [question.id]);

  function handleSelect(optionId: string) {
    if (pendingId) return;
    setPendingId(optionId);
    window.setTimeout(() => onAnswer(optionId), ADVANCE_DELAY_MS);
  }

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[11px] font-semibold tracking-[0.16em] text-da-green">
        {question.areaLabel.toUpperCase()}
      </span>
      <h3 className="text-balance text-xl font-semibold leading-snug text-da-white sm:text-2xl">
        {question.title}
      </h3>

      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = (pendingId ?? selectedOptionId) === option.id;
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              whileTap={{ scale: 0.985 }}
              disabled={Boolean(pendingId)}
              aria-pressed={isSelected}
              className={`flex min-h-[52px] items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-sm transition-colors duration-150 sm:text-[15px] ${
                isSelected
                  ? "border-da-green bg-da-green-dim text-da-white"
                  : "border-da-panel-border bg-da-panel text-da-white/90 hover:border-white/25 active:border-da-green/60"
              }`}
            >
              <span>{option.label}</span>
              <span
                aria-hidden
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isSelected ? "border-da-green bg-da-green" : "border-white/25"
                }`}
              >
                {isSelected && (
                  <svg viewBox="0 0 12 10" className="h-2.5 w-3" fill="none">
                    <path
                      d="M1 5L4.3 8.5L11 1"
                      stroke="#04120a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      {!isFirst && (
        <button
          type="button"
          onClick={onBack}
          className="self-start text-xs font-medium text-da-gray transition-colors hover:text-da-white"
        >
          ← Volver a la pregunta anterior
        </button>
      )}
    </div>
  );
}
