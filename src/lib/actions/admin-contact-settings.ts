"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";

export type ContactActionState = { error: string } | null;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || null);

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || null)
  .refine((value) => !value || /^https?:\/\//.test(value), "Linkul trebuie să înceapă cu http:// sau https://");

const contactSettingsSchema = z.object({
  email: z.string().trim().email("Email invalid").optional().or(z.literal("")),
  phone: optionalText(40),
  address: optionalText(220),
  city: optionalText(120),
  schedule: optionalText(180),
  mapUrl: optionalUrl,
  introText: optionalText(260),
  footerDescription: optionalText(360),
  footerCopyright: optionalText(180),
  facebookUrl: optionalUrl,
  instagramUrl: optionalUrl,
  youtubeUrl: optionalUrl,
  tiktokUrl: optionalUrl,
  linkedinUrl: optionalUrl
});

export async function updateContactSettingsAction(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  // Auth check OUTSIDE try/catch so redirect() propagates correctly
  await requireRole(["ADMIN"]);

  try {
    const parsed = contactSettingsSchema.parse({
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      city: String(formData.get("city") || ""),
      schedule: String(formData.get("schedule") || ""),
      mapUrl: String(formData.get("mapUrl") || ""),
      introText: String(formData.get("introText") || ""),
      footerDescription: String(formData.get("footerDescription") || ""),
      footerCopyright: String(formData.get("footerCopyright") || ""),
      facebookUrl: String(formData.get("facebookUrl") || ""),
      instagramUrl: String(formData.get("instagramUrl") || ""),
      youtubeUrl: String(formData.get("youtubeUrl") || ""),
      tiktokUrl: String(formData.get("tiktokUrl") || ""),
      linkedinUrl: String(formData.get("linkedinUrl") || "")
    });

    await prisma.contactSettings.upsert({
      where: { id: "default" },
      update: { ...parsed, email: parsed.email || null },
      create: { id: "default", ...parsed, email: parsed.email || null }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută.";
    return { error: message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/admin/contact");
  redirect("/admin/contact?updated=1");
}
