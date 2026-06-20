"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

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
  if (!parsed.success) return { ok: false, message: "Verifica datele introduse." };
  if (parsed.data.website) return { ok: true, message: "Multumim. Mesajul tau a ajuns la noi." };
  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return { ok: true, message: "Multumim. Mesajul tau a ajuns la noi." };
  } catch {
    return { ok: false, message: "Mesajul nu a putut fi trimis momentan. Te rugam sa incerci din nou." };
  }
}
