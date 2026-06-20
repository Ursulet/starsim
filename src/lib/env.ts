import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(16).optional(),
  AUTH_TRUST_HOST: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  SEED_ADMIN_EMAIL: z.string().email().default("admin@starsim.ro"),
  SEED_ADMIN_PASSWORD: z.string().min(12).default("replace-with-a-strong-admin-password"),
  SEED_ADMIN_NAME: z.string().min(2).default("Star Sim Admin"),
  MAX_UPLOAD_MB: z.coerce.number().min(1).max(50).default(10)
});

export const env = envSchema.parse(process.env);
