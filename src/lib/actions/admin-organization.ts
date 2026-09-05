"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";
import { defaultOrganizationSettings, type OrganizationSettings } from "@/lib/queries/settings";
import { createMediaAssetFromUpload, saveUploadedFile, uploadedFileFromForm } from "@/lib/uploads";

export type OrganizationActionState = { error: string } | null;

const optionalString = (max: number = 300) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((val) => val || "");

const organizationSchema = z.object({
  presidentName: optionalString(120),
  presidentRole: optionalString(120),
  presidentBio: optionalString(500),
  vicePresidentName: optionalString(120),
  vicePresidentRole: optionalString(120),
  vicePresidentBio: optionalString(500),
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
  const user = await requireRole(["ADMIN"]);

  try {
    const raw = {
      presidentName: String(formData.get("presidentName") || ""),
      presidentRole: String(formData.get("presidentRole") || ""),
      presidentBio: String(formData.get("presidentBio") || ""),
      vicePresidentName: String(formData.get("vicePresidentName") || ""),
      vicePresidentRole: String(formData.get("vicePresidentRole") || ""),
      vicePresidentBio: String(formData.get("vicePresidentBio") || ""),
      officialEmail: String(formData.get("officialEmail") || ""),
      phone1: String(formData.get("phone1") || ""),
      phone2: String(formData.get("phone2") || ""),
      headquarters: String(formData.get("headquarters") || ""),
      cui: String(formData.get("cui") || ""),
      address: String(formData.get("address") || ""),
      regNumber: String(formData.get("regNumber") || "")
    };

    const parsed = organizationSchema.parse(raw);

    // Handle President Photo
    let presidentImageUrl = String(formData.get("presidentImageUrl") || "").trim() || null;
    const presidentUpload = uploadedFileFromForm(formData, "presidentImageFile");
    if (presidentUpload) {
      try {
        const asset = await createMediaAssetFromUpload({
          file: presidentUpload,
          folder: "conducere",
          uploadedById: user?.id,
          alt: parsed.presidentName || "Gîrdeanu Ștefan"
        });
        presidentImageUrl = asset.url;
      } catch {
        try {
          const uploadRes = await saveUploadedFile(presidentUpload, "conducere");
          presidentImageUrl = uploadRes.url;
        } catch (err) {
          console.error("Error uploading president photo:", err);
        }
      }
    }

    // Handle Vice-President Photo
    let vicePresidentImageUrl = String(formData.get("vicePresidentImageUrl") || "").trim() || null;
    const vicePresidentUpload = uploadedFileFromForm(formData, "vicePresidentImageFile");
    if (vicePresidentUpload) {
      try {
        const asset = await createMediaAssetFromUpload({
          file: vicePresidentUpload,
          folder: "conducere",
          uploadedById: user?.id,
          alt: parsed.vicePresidentName || "Claudiu Simion"
        });
        vicePresidentImageUrl = asset.url;
      } catch {
        try {
          const uploadRes = await saveUploadedFile(vicePresidentUpload, "conducere");
          vicePresidentImageUrl = uploadRes.url;
        } catch (err) {
          console.error("Error uploading vice president photo:", err);
        }
      }
    }

    const payload: OrganizationSettings = {
      presidentName: parsed.presidentName || defaultOrganizationSettings.presidentName,
      presidentRole: parsed.presidentRole || defaultOrganizationSettings.presidentRole,
      presidentImageUrl,
      presidentBio: parsed.presidentBio || defaultOrganizationSettings.presidentBio,
      vicePresidentName: parsed.vicePresidentName || defaultOrganizationSettings.vicePresidentName,
      vicePresidentRole: parsed.vicePresidentRole || defaultOrganizationSettings.vicePresidentRole,
      vicePresidentImageUrl,
      vicePresidentBio: parsed.vicePresidentBio || defaultOrganizationSettings.vicePresidentBio,
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
