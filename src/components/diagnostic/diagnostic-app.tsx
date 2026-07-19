"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS } from "@/lib/questions";
import { track } from "@/lib/analytics";
import {
  clearDiagnosticState,
  readDiagnosticState,
  readUtm,
  writeDiagnosticState,
} from "@/lib/storage";
import type { Answer, DiagnoseResponse, DiagnosticResult, LeadInfo } from "@/lib/types";
import { ProgressBar } from "./progress-bar";
import { QuizQuestion } from "./quiz-question";
import { LeadForm } from "./lead-form";
import { Analyzing } from "./analyzing";
import { ResultScreen } from "./result-screen";

type Step = "quiz" | "form" | "analyzing" | "result";

const MIN_ANALYZING_MS = 1800;

export function DiagnosticApp() {
  const [step, setStep] = useState<Step>("quiz");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [lead, setLead] = useState<LeadInfo | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const hydrated = useRef(false);
  const startTracked = useRef(false);
  const leadTracked = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const saved = readDiagnosticState();
    if (!saved) return;
    setAnswers(saved.answers);
    setQuestionIndex(saved.questionIndex);
    if (saved.step === "result" && saved.result && saved.lead) {
      setLead(saved.lead as LeadInfo);
      setResult(saved.result);
      setStep("result");
    } else if (saved.answers.length > 0) {
      setStep(saved.step === "form" ? "form" : "quiz");
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeDiagnosticState({
      step: step === "analyzing" ? "form" : step,
      questionIndex,
      answers,
      lead: lead ?? undefined,
      result: result ?? undefined,
    });
  }, [step, questionIndex, answers, lead, result]);

  function handleAnswer(optionId: string) {
    if (!startTracked.current) {
      startTracked.current = true;
      track("diagnostic_started");
    }

    const question = QUESTIONS[questionIndex];
    const next = [...answers.filter((a) => a.questionId !== question.id), {
      questionId: question.id,
      optionId,
    }];
    setAnswers(next);
    track("question_completed", { question: question.id, index: questionIndex + 1 });

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setStep("form");
    }
  }

  function handleBack() {
    setQuestionIndex((i) => Math.max(0, i - 1));
  }

  async function handleLeadSubmit(leadInfo: LeadInfo) {
    setLead(leadInfo);
    setSubmitError(null);
    setSubmitting(true);
    setStep("analyzing");
    if (!leadTracked.current) {
      leadTracked.current = true;
      track("lead_captured");
    }

    const start = Date.now();
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, lead: leadInfo, utm: readUtm() }),
      });

      if (res.status === 400) {
        setSubmitError("Algunos datos no se ven bien. Revísalos e inténtalo de nuevo.");
        setStep("form");
        return;
      }
      if (!res.ok) throw new Error(`API respondió ${res.status}`);
      const data: DiagnoseResponse = await res.json();

      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_ANALYZING_MS - elapsed);
      await new Promise((r) => setTimeout(r, remaining));

      setResult(data.result);
      setStep("result");
      track("diagnostic_completed", { source: data.source });
    } catch {
      setSubmitError(
        "No pudimos generar tu diagnóstico en este momento. Revisa tu conexión e inténtalo de nuevo.",
      );
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  }

  function handleRestart() {
    clearDiagnosticState();
    setAnswers([]);
    setQuestionIndex(0);
    setLead(null);
    setResult(null);
    setStep("quiz");
  }

  const currentQuestion = QUESTIONS[questionIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id)?.optionId;

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-da-panel-border bg-da-bg-elevated p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] sm:p-9">
      {step === "quiz" && (
        <div className="flex flex-col gap-7">
          <ProgressBar current={questionIndex + 1} total={QUESTIONS.length} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <QuizQuestion
                question={currentQuestion}
                selectedOptionId={currentAnswer}
                onAnswer={handleAnswer}
                onBack={handleBack}
                isFirst={questionIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {step === "form" && (
        <div className="flex flex-col gap-4">
          <LeadForm onSubmit={handleLeadSubmit} submitting={submitting} />
          {submitError && (
            <p role="alert" className="text-sm text-red-400">
              {submitError}
            </p>
          )}
        </div>
      )}

      {step === "analyzing" && <Analyzing />}

      {step === "result" && result && lead && (
        <div className="flex flex-col gap-8">
          <ResultScreen result={result} lead={lead} />
          <button
            type="button"
            onClick={handleRestart}
            className="self-center text-xs font-medium text-da-gray-dim transition-colors hover:text-da-gray"
          >
            Hacer el diagnóstico de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
