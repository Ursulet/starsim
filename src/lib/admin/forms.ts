import { z } from "zod";

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalid");
export const seoTitleSchema = z.string().max(70).optional().or(z.literal(""));
export const seoDescriptionSchema = z.string().max(170).optional().or(z.literal(""));
export const emailSchema = z.string().email();
export const publishStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const eventStatusSchema = z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]);
export const urlOptionalSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null))
  .refine((value) => !value || value.startsWith("/") || /^https?:\/\//.test(value), "URL invalid");
