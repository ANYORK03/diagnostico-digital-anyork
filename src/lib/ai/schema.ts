import { z } from "zod";
import { LEAK_AREAS } from "../types";

export const aiResultSchema = z.object({
  score: z.number().min(0).max(100),
  main_leak: z.enum(LEAK_AREAS),
  main_leak_label: z.string().min(1),
  executive_reading: z.string().min(1),
  evidence: z.array(z.string().min(1)).min(1).max(4),
  hypotheses: z.array(z.string().min(1)).min(1).max(4),
  secondary_leaks: z.array(z.string().min(1)).min(1).max(3),
  first_actions: z.array(z.string().min(1)).min(1).max(4),
  recommended_offer: z.string().min(1),
  why_this_offer: z.string().min(1),
  warning: z.string().min(1),
});

export type AiResult = z.infer<typeof aiResultSchema>;
