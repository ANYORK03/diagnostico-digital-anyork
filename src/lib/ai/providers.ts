interface ProviderArgs {
  system: string;
  user: string;
  signal: AbortSignal;
}

async function callOpenAiCompatible(args: {
  baseUrl: string;
  apiKey: string;
  model: string;
  system: string;
  user: string;
  signal: AbortSignal;
}): Promise<string> {
  const res = await fetch(`${args.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      model: args.model,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: args.system },
        { role: "user", content: args.user },
      ],
    }),
    signal: args.signal,
  });

  if (!res.ok) {
    throw new Error(`Proveedor OpenAI-compatible respondió ${res.status}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string") throw new Error("Respuesta sin contenido de texto");
  return text;
}

export async function callOpenAi({ system, user, signal }: ProviderArgs): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY no configurada");
  return callOpenAiCompatible({
    baseUrl: "https://api.openai.com/v1",
    apiKey,
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    system,
    user,
    signal,
  });
}

export async function callGroq({ system, user, signal }: ProviderArgs): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY no configurada");
  return callOpenAiCompatible({
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey,
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    system,
    user,
    signal,
  });
}

export async function callAnthropic({ system, user, signal }: ProviderArgs): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY no configurada");
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      temperature: 0.4,
      system,
      messages: [{ role: "user", content: user }],
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Anthropic respondió ${res.status}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text;
  if (typeof text !== "string") throw new Error("Respuesta sin contenido de texto");
  return text;
}

export async function callGemini({ system, user, signal }: ProviderArgs): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      }),
      signal,
    },
  );

  if (!res.ok) {
    throw new Error(`Gemini respondió ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string") throw new Error("Respuesta sin contenido de texto");
  return text;
}

export type AiProviderName = "openai" | "anthropic" | "gemini" | "groq";

export const PROVIDERS: Record<AiProviderName, (args: ProviderArgs) => Promise<string>> = {
  openai: callOpenAi,
  anthropic: callAnthropic,
  gemini: callGemini,
  groq: callGroq,
};
