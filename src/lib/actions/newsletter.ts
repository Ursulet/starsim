"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional(),
  consent: z.coerce.boolean().default(true),
  website: z.string().optional()
});

export async function subscribeNewsletter(_: unknown, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = newsletterSchema.safeParse(raw);

  if (!parsed.success) {
    return { ok: false, message: "Te rugam sa introduci o adresa de email valida." };
  }

  if (parsed.data.website) {
    return { ok: true, message: "Multumim pentru abonare." };
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      update: {
        name: parsed.data.name || null,
        status: "ACTIVE",
        consent: parsed.data.consent,
        unsubscribedAt: null
      },
      create: {
        email: parsed.data.email.toLowerCase(),
        name: parsed.data.name || null,
        consent: parsed.data.consent,
        source: "footer"
      }
    });

    return { ok: true, message: "Multumim pentru abonare." };
  } catch {
    return { ok: false, message: "Abonarea nu a putut fi salvata momentan." };
  }
}
