"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";
import { defaultOrganizationSettings, type OrganizationSettings } from "@/lib/queries/settings";

export type OrganizationActionState = { error: string } | null;

const optionalString = (max: number = 200) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((val) => val || "");

const organizationSchema = z.object({
  presidentName: optionalString(120),
  presidentRole: optionalString(120),
  vicePresidentName: optionalString(120),
  vicePresidentRole: optionalString(120),
  officialEmail: z.string().trim().email("Email invalid").optional().or(z.literal("")),
  phone1: optionalString(50),
  phone2: optionalString(50),
  headquarters: optionalString(150),
  cui: optionalString(60),
  address: optionalString(250),
  regNumber: optionalString(100)
});

export async function updateOrganizationSettingsAction(
  _prevState: OrganizationActionState,
  formData: FormData
): Promise<OrganizationActionState> {
  await requireRole(["ADMIN"]);

  try {
    const raw = {
      presidentName: String(formData.get("presidentName") || ""),
      presidentRole: String(formData.get("presidentRole") || ""),
      vicePresidentName: String(formData.get("vicePresidentName") || ""),
      vicePresidentRole: String(formData.get("vicePresidentRole") || ""),
      officialEmail: String(formData.get("officialEmail") || ""),
      phone1: String(formData.get("phone1") || ""),
      phone2: String(formData.get("phone2") || ""),
      headquarters: String(formData.get("headquarters") || ""),
      cui: String(formData.get("cui") || ""),
      address: String(formData.get("address") || ""),
      regNumber: String(formData.get("regNumber") || "")
    };

    const parsed = organizationSchema.parse(raw);

    const payload: OrganizationSettings = {
      presidentName: parsed.presidentName || defaultOrganizationSettings.presidentName,
      presidentRole: parsed.presidentRole || defaultOrganizationSettings.presidentRole,
      vicePresidentName: parsed.vicePresidentName || defaultOrganizationSettings.vicePresidentName,
      vicePresidentRole: parsed.vicePresidentRole || defaultOrganizationSettings.vicePresidentRole,
      officialEmail: parsed.officialEmail || defaultOrganizationSettings.officialEmail,
      phone1: parsed.phone1 || "",
      phone2: parsed.phone2 || "",
      headquarters: parsed.headquarters || defaultOrganizationSettings.headquarters,
      cui: parsed.cui || "",
      address: parsed.address || defaultOrganizationSettings.address,
      regNumber: parsed.regNumber || ""
    };

    await prisma.siteSettings.upsert({
      where: { key: "organization" },
      update: { value: payload },
      create: { key: "organization", value: payload }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare la salvarea setărilor organizației.";
    return { error: message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/despre");
  revalidatePath("/contact");
  revalidatePath("/doneaza");
  revalidatePath("/admin/despre");
  redirect("/admin/despre?updated=1");
}
