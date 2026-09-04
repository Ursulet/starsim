import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(16).optional(),
  AUTH_TRUST_HOST: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  SEED_ADMIN_EMAIL: z.string().email().default("admin@starsim.ro"),
  SEED_ADMIN_PASSWORD: z.string().min(12).default("replace-with-a-strong-admin-password"),
  SEED_ADMIN_NAME: z.string().min(2).default("Star Sim Admin"),
  UPLOAD_DIR: z.string().min(1).optional(),
  MAX_UPLOAD_MB: z.coerce.number().min(1).max(50).default(10)
});

const parsed = envSchema.parse(process.env);

// Fail fast at runtime if critical vars are missing (but allow build without .env)
if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
  const missing: string[] = [];
  if (!parsed.DATABASE_URL) missing.push("DATABASE_URL");
  if (!parsed.AUTH_SECRET) missing.push("AUTH_SECRET");
  if (missing.length && !process.env.NEXT_PHASE?.includes("build")) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export const env = parsed;

