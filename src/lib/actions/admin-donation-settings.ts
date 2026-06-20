"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function amountRows(formData: FormData) {
  return [0, 1, 2]
    .map((index) => ({
      amount: Number(text(formData, `amounts.${index}.amount`)),
      label: text(formData, `amounts.${index}.label`),
      impact: text(formData, `amounts.${index}.impact`)
    }))
    .filter((item) => Number.isFinite(item.amount) && item.amount > 0 && item.label);
}

export async function updateDonationSettingsAction(formData: FormData) {
  await requireRole(["ADMIN"]);

  await prisma.donationSettings.upsert({
    where: { id: "default" },
    update: {
      title: text(formData, "title") || "Susține educația prin astronomie",
      description: text(formData, "description") || null,
      bankAccount: text(formData, "bankAccount") || null,
      bankName: text(formData, "bankName") || null,
      beneficiaryName: text(formData, "beneficiaryName") || null,
      fiscalCode: text(formData, "fiscalCode") || null,
      recommendedAmounts: amountRows(formData),
      metaTitle: text(formData, "metaTitle") || null,
      metaDescription: text(formData, "metaDescription") || null
    },
    create: {
      id: "default",
      title: text(formData, "title") || "Susține educația prin astronomie",
      description: text(formData, "description") || null,
      bankAccount: text(formData, "bankAccount") || null,
      bankName: text(formData, "bankName") || null,
      beneficiaryName: text(formData, "beneficiaryName") || null,
      fiscalCode: text(formData, "fiscalCode") || null,
      recommendedAmounts: amountRows(formData),
      metaTitle: text(formData, "metaTitle") || null,
      metaDescription: text(formData, "metaDescription") || null
    }
  });

  revalidatePath("/doneaza");
  revalidatePath("/admin/doneaza");
  redirect("/admin/doneaza?updated=1");
}
