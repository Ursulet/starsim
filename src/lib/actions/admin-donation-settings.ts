"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";
import { createMediaAssetFromUpload, saveUploadedFile, uploadedFileFromForm } from "@/lib/uploads";

export type DonationActionState = { error: string } | null;

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

async function processCards(formData: FormData, userId?: string) {
  const rawCardsJson = formData.get("cardsJson");
  
  if (rawCardsJson && typeof rawCardsJson === "string") {
    try {
      const cards = JSON.parse(rawCardsJson);
      if (Array.isArray(cards)) {
        const processed = [];

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          if (!card) continue;

          // Check if a new file was uploaded for this card
          const uploadedFile = uploadedFileFromForm(formData, `card_file_${card.id}`);
          let finalImageUrl = card.imageUrl || null;

          if (uploadedFile) {
            try {
              const asset = await createMediaAssetFromUpload({
                file: uploadedFile,
                folder: "donatii",
                uploadedById: userId,
                alt: card.imageAlt || card.title
              });
              finalImageUrl = asset.url;
            } catch {
              try {
                const uploadRes = await saveUploadedFile(uploadedFile, "donatii");
                finalImageUrl = uploadRes.url;
              } catch (err) {
                console.error(`Error uploading card image for card ${card.id}:`, err);
              }
            }
          }

          const parsedAmount =
            card.amount !== "" && card.amount !== null && card.amount !== undefined && !Number.isNaN(Number(card.amount))
              ? Number(card.amount)
              : null;

          processed.push({
            id: String(card.id || `card_${i}_${Date.now()}`),
            title: String(card.title || card.label || "Cauză"),
            label: String(card.title || card.label || "Cauză"), // backward compatibility
            amount: parsedAmount,
            currency: String(card.currency || "lei"),
            badge: card.badge ? String(card.badge).trim() : null,
            imageUrl: finalImageUrl,
            imageAlt: card.imageAlt ? String(card.imageAlt).trim() : null,
            content: card.content || null,
            impact: typeof card.content === "string" ? card.content : (card.impact || null), // backward compatibility
            buttonText: card.buttonText ? String(card.buttonText).trim() : null,
            buttonUrl: card.buttonUrl ? String(card.buttonUrl).trim() : "#cont-bancar",
            isActive: card.isActive !== false
          });
        }

        return processed;
      }
    } catch (e) {
      console.error("Failed to parse cardsJson:", e);
    }
  }

  // Legacy fallback if cardsJson was not submitted
  return [0, 1, 2]
    .map((index) => ({
      id: `legacy_${index}`,
      amount: Number(text(formData, `amounts.${index}.amount`)),
      title: text(formData, `amounts.${index}.label`),
      label: text(formData, `amounts.${index}.label`),
      impact: text(formData, `amounts.${index}.impact`),
      content: text(formData, `amounts.${index}.impact`),
      currency: "lei",
      buttonText: "Donează prin transfer",
      buttonUrl: "#cont-bancar",
      isActive: true
    }))
    .filter((item) => Number.isFinite(item.amount) && item.amount > 0 && item.label);
}

export async function updateDonationSettingsAction(
  _prevState: DonationActionState,
  formData: FormData
): Promise<DonationActionState> {
  const user = await requireRole(["ADMIN"]);

  try {
    const cards = await processCards(formData, user?.id);

    const beneficiaryName = text(formData, "beneficiaryName") || "Asociația Star Sim";
    const fiscalCode = text(formData, "fiscalCode") || null;
    const bankAccount = text(formData, "bankAccount") || null;
    const bankName = text(formData, "bankName") || null;
    const headquarters = text(formData, "headquarters") || "Constanța";
    const address = text(formData, "address") || "Constanța, România";
    const regNumber = text(formData, "regNumber") || null;
    const secondaryIban = text(formData, "secondaryIban") || null;
    const paymentReference = text(formData, "paymentReference") || "Donație – Asociația Star Sim";
    const contactEmail = text(formData, "contactEmail") || "contact@starsim.ro";
    const contactPhone = text(formData, "contactPhone") || null;

    const organizationDetails = {
      beneficiaryName,
      fiscalCode,
      headquarters,
      address,
      regNumber,
      bankAccount,
      bankName,
      secondaryIban,
      paymentReference,
      email: contactEmail,
      phone: contactPhone
    };

    const updatePayload = {
      title: text(formData, "title") || "Susține educația prin astronomie",
      description: text(formData, "description") || null,
      bankAccount,
      bankName,
      beneficiaryName,
      fiscalCode,
      recommendedAmounts: cards,
      content: { cards, organizationDetails },
      metaTitle: text(formData, "metaTitle") || null,
      metaDescription: text(formData, "metaDescription") || null
    };

    await prisma.donationSettings.upsert({
      where: { id: "default" },
      update: updatePayload,
      create: {
        id: "default",
        ...updatePayload
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Eroare necunoscută la salvarea donațiilor.";
    return { error: message };
  }

  revalidatePath("/doneaza");
  revalidatePath("/admin/doneaza");
  redirect("/admin/doneaza?updated=1");
}
