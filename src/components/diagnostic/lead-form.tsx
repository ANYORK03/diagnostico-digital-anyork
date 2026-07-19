"use client";

import { FormEvent, useState } from "react";
import type { LeadInfo } from "@/lib/types";

const BUSINESS_TYPES = [
  "Restaurante o comida",
  "Salón, barbería o belleza",
  "Servicios profesionales",
  "Comercio local",
  "Servicio por WhatsApp o delivery",
  "Otro",
];

type FormState = Omit<LeadInfo, "consent" | "website">;

const EMPTY_STATE: FormState = {
  ownerName: "",
  businessName: "",
  city: "",
  country: "",
  whatsapp: "",
  email: "",
  businessType: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(state: FormState): Errors {
  const errors: Errors = {};
  if (state.ownerName.trim().length < 2) errors.ownerName = "Cuéntanos tu nombre.";
  if (state.businessName.trim().length < 2) errors.businessName = "Escribe el nombre de tu negocio.";
  if (state.city.trim().length < 2) errors.city = "Falta la ciudad.";
  if (state.country.trim().length < 2) errors.country = "Falta el país.";
  if (!/^[+\d][\d\s()-]{6,19}$/.test(state.whatsapp.trim())) {
    errors.whatsapp = "Escribe un número de WhatsApp válido.";
  }
  if (state.email && !/^\S+@\S+\.\S+$/.test(state.email)) {
    errors.email = "Ese correo no parece válido.";
  }
  if (state.businessType.trim().length < 2) errors.businessType = "Cuéntanos a qué se dedica tu negocio.";
  return errors;
}

export function LeadForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (lead: LeadInfo) => void;
  submitting: boolean;
}) {
  const [state, setState] = useState<FormState>(EMPTY_STATE);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [consentError, setConsentError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(state);
    setErrors(validation);
    setConsentError(consent ? null : "Necesitamos tu autorización para continuar.");
    if (Object.keys(validation).length > 0 || !consent) return;

    onSubmit({ ...state, consent: true, website });
  }

  const fieldClass =
    "w-full rounded-xl border border-da-panel-border bg-da-panel px-4 py-3 text-sm text-da-white outline-none transition-colors placeholder:text-da-gray-dim focus:border-da-green";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-semibold text-da-white sm:text-2xl">
          Tu diagnóstico está listo.
        </h3>
        <p className="mt-1 text-sm text-da-gray">
          Dinos a quién pertenece para personalizarlo y guardar tu resultado.
        </p>
      </div>

      {/* Honeypot: campo oculto para visitantes reales, invisible mediante CSS. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">No llenar este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <Field
        id="ownerName"
        label="Nombre del dueño"
        value={state.ownerName}
        onChange={(v) => update("ownerName", v)}
        error={errors.ownerName}
        className={fieldClass}
        autoComplete="name"
      />
      <Field
        id="businessName"
        label="Nombre del negocio"
        value={state.businessName}
        onChange={(v) => update("businessName", v)}
        error={errors.businessName}
        className={fieldClass}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          id="city"
          label="Ciudad"
          value={state.city}
          onChange={(v) => update("city", v)}
          error={errors.city}
          className={fieldClass}
        />
        <Field
          id="country"
          label="País"
          value={state.country}
          onChange={(v) => update("country", v)}
          error={errors.country}
          className={fieldClass}
        />
      </div>
      <Field
        id="whatsapp"
        label="Número de WhatsApp"
        value={state.whatsapp}
        onChange={(v) => update("whatsapp", v)}
        error={errors.whatsapp}
        className={fieldClass}
        type="tel"
        autoComplete="tel"
        placeholder="+1 809 000 0000"
      />
      <Field
        id="email"
        label="Correo electrónico (opcional)"
        value={state.email ?? ""}
        onChange={(v) => update("email", v)}
        error={errors.email}
        className={fieldClass}
        type="email"
        autoComplete="email"
      />

      <div>
        <label htmlFor="businessType" className="mb-1.5 block text-xs font-medium text-da-gray">
          Tipo de negocio
        </label>
        <input
          id="businessType"
          list="business-types"
          value={state.businessType}
          onChange={(e) => update("businessType", e.target.value)}
          className={fieldClass}
          placeholder="Ej. Barbería, restaurante, servicios..."
        />
        <datalist id="business-types">
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
        <ErrorText error={errors.businessType} />
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-da-gray">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (e.target.checked) setConsentError(null);
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-da-green"
        />
        <span>
          Autorizo a Digital Anyork LLC a usar esta información para recibir mi
          diagnóstico y su seguimiento relacionado.
        </span>
      </label>
      <ErrorText error={consentError ?? undefined} />

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 flex min-h-[52px] items-center justify-center rounded-full bg-da-green px-6 text-sm font-semibold tracking-wide text-[#04120a] transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {submitting ? "Analizando…" : "VER MI DIAGNÓSTICO →"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  className,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  className: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-da-gray">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <ErrorText id={`${id}-error`} error={error} />
    </div>
  );
}

function ErrorText({ id, error }: { id?: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
      {error}
    </p>
  );
}
