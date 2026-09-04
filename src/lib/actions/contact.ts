"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  type: z.enum(["GENERAL", "EVENT", "VOLUNTEERING", "PARTNERSHIP", "DONATION", "SCHOOL"]).default("GENERAL"),
  subject: z.string().max(160).optional(),
  message: z.string().min(10).max(3000),
  consent: z.coerce.boolean(),
  website: z.string().optional()
});

export async function submitContactForm(_: unknown, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return { ok: false, message: "Verifică datele introduse." };
  if (parsed.data.website) return { ok: true, message: "Mulțumim. Mesajul tău a ajuns la noi." };

  // Rate limit: 5 messages per minute per email
  const { maxRequests, windowMs } = RATE_LIMITS.CONTACT;
  if (!rateLimit(`contact:${parsed.data.email}`, maxRequests, windowMs)) {
    return { ok: false, message: "Prea multe mesaje trimise. Te rugăm să aștepți un minut." };
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return { ok: true, message: "Mulțumim. Mesajul tău a ajuns la noi." };
  } catch {
    return { ok: false, message: "Mesajul nu a putut fi trimis momentan. Te rugăm să încerci din nou." };
  }
}

