import type { ZodError } from "zod";

export type ActionResult<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function actionSuccess<T>(data?: T, message?: string): ActionResult<T> {
  return { ok: true, data, message };
}

export function actionError(error: string, fieldErrors?: Record<string, string[]>): ActionResult<never> {
  return { ok: false, error, fieldErrors };
}

export function parseZodError(error: ZodError): Record<string, string[]> {
  return error.flatten().fieldErrors as Record<string, string[]>;
}
