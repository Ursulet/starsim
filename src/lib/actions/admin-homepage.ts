"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { defaultHomepageSettings, normalizeHomepageSettings, type HomepageSettings } from "@/lib/homepage-settings";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/server/auth/session";

function text(formData: FormData, key: string, fallback: string) {
  return String(formData.get(key) || "").trim() || fallback;
}

function cleanHref(value: string, fallback: string) {
  const cleaned = value.trim();
  if (!cleaned) return fallback;
  if (cleaned.startsWith("/") || cleaned.startsWith("https://") || cleaned.startsWith("http://")) return cleaned;
  return fallback;
}

export async function updateHomepageSettingsAction(formData: FormData) {
  await requireAdminUser();

  const current = normalizeHomepageSettings(
    (
      await prisma.siteSettings.findUnique({
        where: { key: "homepage" },
        select: { value: true }
      })
    )?.value
  );

  const data: HomepageSettings = {
    heroIntro: text(formData, "heroIntro", current.heroIntro),
    heroImageUrl: cleanHref(text(formData, "heroImageUrl", current.heroImageUrl), defaultHomepageSettings.heroImageUrl),
    heroPrimaryLabel: text(formData, "heroPrimaryLabel", current.heroPrimaryLabel),
    heroPrimaryHref: cleanHref(text(formData, "heroPrimaryHref", current.heroPrimaryHref), current.heroPrimaryHref),
    heroSecondaryLabel: text(formData, "heroSecondaryLabel", current.heroSecondaryLabel),
    heroSecondaryHref: cleanHref(text(formData, "heroSecondaryHref", current.heroSecondaryHref), current.heroSecondaryHref),
    missionTitle: text(formData, "missionTitle", current.missionTitle),
    missionSubtitle: text(formData, "missionSubtitle", current.missionSubtitle),
    missionCards: current.missionCards.map((card, index) => ({
      icon: card.icon,
      title: text(formData, `missionCards.${index}.title`, card.title),
      text: text(formData, `missionCards.${index}.text`, card.text)
    })),
    programsTitle: text(formData, "programsTitle", current.programsTitle),
    eventsTitle: text(formData, "eventsTitle", current.eventsTitle),
    eventsEmptyTitle: text(formData, "eventsEmptyTitle", current.eventsEmptyTitle),
    eventsEmptyDescription: text(formData, "eventsEmptyDescription", current.eventsEmptyDescription),
    eventsCtaLabel: text(formData, "eventsCtaLabel", current.eventsCtaLabel),
    eventsCtaHref: cleanHref(text(formData, "eventsCtaHref", current.eventsCtaHref), current.eventsCtaHref),
    contributionTitle: text(formData, "contributionTitle", current.contributionTitle),
    contributionSubtitle: text(formData, "contributionSubtitle", current.contributionSubtitle),
    contributionCards: current.contributionCards.map((card, index) => ({
      icon: card.icon,
      title: text(formData, `contributionCards.${index}.title`, card.title),
      text: text(formData, `contributionCards.${index}.text`, card.text),
      href: cleanHref(text(formData, `contributionCards.${index}.href`, card.href), card.href),
      action: text(formData, `contributionCards.${index}.action`, card.action)
    }))
  };

  await prisma.siteSettings.upsert({
    where: { key: "homepage" },
    update: { value: data },
    create: { key: "homepage", value: data }
  });

  revalidatePath("/");
  revalidatePath("/admin/prima-pagina");
  redirect("/admin/prima-pagina?updated=1");
}
