/**
 * Controla la convocatoria de los 3 casos de implementación gratuita sin
 * rediseñar la página: cambia NEXT_PUBLIC_FREE_CASES_OPEN y vuelve a desplegar.
 */
export const FREE_CASES_OPEN = process.env.NEXT_PUBLIC_FREE_CASES_OPEN !== "false";
