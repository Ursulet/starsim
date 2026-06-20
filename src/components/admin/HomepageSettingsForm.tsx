"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useState } from "react";
import { AlertCircle, Loader2, UploadCloud } from "lucide-react";
import { updateHomepageSettingsAction, type HomepageActionState } from "@/lib/actions/admin-homepage";
import type { AdminMediaOption } from "@/lib/admin/content-data";
import type { HomepageSettings } from "@/lib/homepage-settings";

function TextInput({
  label,
  name,
  value,
  placeholder
}: {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <input
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal text-slate-800"
      />
    </label>
  );
}

function TextArea({ label, name, value, rows = 3 }: { label: string; name: string; value: string; rows?: number }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <textarea
        name={name}
        defaultValue={value}
        rows={rows}
        className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal leading-6 text-slate-800"
      />
    </label>
  );
}

export function HomepageSettingsForm({
  settings,
  mediaOptions
}: {
  settings: HomepageSettings;
  mediaOptions: AdminMediaOption[];
}) {
  const [state, formAction, isPending] = useActionState<HomepageActionState, FormData>(
    updateHomepageSettingsAction,
    null
  );
  const selectedHero = mediaOptions.find((media) => media.url === settings.heroImageUrl);
  const [selectedHeroId, setSelectedHeroId] = useState<string>(selectedHero?.id || "");
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHeroId(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalPreview(URL.createObjectURL(file));
    } else {
      setLocalPreview(null);
    }
  };

  let previewUrl = settings.heroImageUrl;
  let isLocal = false;
  if (localPreview) {
    previewUrl = localPreview;
    isLocal = true;
  } else if (selectedHeroId) {
    const asset = mediaOptions.find((media) => media.id === selectedHeroId);
    if (asset) previewUrl = asset.url;
  }

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="max-w-[1100px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="currentHeroImageUrl" value={settings.heroImageUrl} />

      {state?.error ? (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <TextArea label="Text hero" name="heroIntro" value={settings.heroIntro} rows={5} />
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-starsim-navy">Imagine hero</p>
          <div className="relative">
            <Image
              src={previewUrl}
              alt="Imagine hero Star Sim"
              width={760}
              height={420}
              unoptimized
              className="h-44 w-full rounded-xl border border-slate-200 object-cover"
            />
            {isLocal && (
              <span className="absolute top-2 right-2 rounded bg-starsim-gold px-2 py-0.5 text-[10px] font-bold text-starsim-navy shadow-sm animate-pulse">
                Fișier nou
              </span>
            )}
          </div>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <select
              name="heroImageId"
              value={selectedHeroId}
              onChange={handleSelectChange}
              className="focus-ring min-w-0 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800"
            >
              <option value="">Păstrează imaginea actuală</option>
              {mediaOptions.map((media) => (
                <option key={media.id} value={media.id}>
                  {media.alt || media.filename}
                </option>
              ))}
            </select>
            <label className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-starsim-navy px-4 py-2 text-sm font-bold text-white hover:bg-starsim-blue">
              <UploadCloud className="h-4 w-4" />
              Încarcă
              <input
                name="heroImageUpload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <input
            name="heroImageAlt"
            defaultValue="Copii privind cerul înstelat prin telescop"
            className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
          />
        </div>
        <TextInput label="Buton principal" name="heroPrimaryLabel" value={settings.heroPrimaryLabel} />
        <TextInput label="Link buton principal" name="heroPrimaryHref" value={settings.heroPrimaryHref} />
        <TextInput label="Buton secundar" name="heroSecondaryLabel" value={settings.heroSecondaryLabel} />
        <TextInput label="Link buton secundar" name="heroSecondaryHref" value={settings.heroSecondaryHref} />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Misiune</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <TextInput label="Titlu secțiune" name="missionTitle" value={settings.missionTitle} />
          <TextInput label="Subtitlu secțiune" name="missionSubtitle" value={settings.missionSubtitle} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {settings.missionCards.map((card, index) => (
            <div key={card.icon} className="rounded-2xl border border-slate-200 bg-white p-4">
              <TextInput label={`Card ${index + 1} titlu`} name={`missionCards.${index}.title`} value={card.title} />
              <div className="mt-4">
                <TextArea label="Text" name={`missionCards.${index}.text`} value={card.text} rows={4} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Sectiuni dinamice</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <TextInput label="Titlu programe" name="programsTitle" value={settings.programsTitle} />
          <TextInput label="Titlu evenimente" name="eventsTitle" value={settings.eventsTitle} />
          <TextInput label="Text evenimente lipsa" name="eventsEmptyTitle" value={settings.eventsEmptyTitle} />
          <TextInput label="Descriere evenimente lipsa" name="eventsEmptyDescription" value={settings.eventsEmptyDescription} />
          <TextInput label="Buton evenimente" name="eventsCtaLabel" value={settings.eventsCtaLabel} />
          <TextInput label="Link buton evenimente" name="eventsCtaHref" value={settings.eventsCtaHref} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Contributii</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <TextInput label="Titlu secțiune" name="contributionTitle" value={settings.contributionTitle} />
          <TextInput label="Subtitlu secțiune" name="contributionSubtitle" value={settings.contributionSubtitle} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {settings.contributionCards.map((card, index) => (
            <div key={card.icon} className="rounded-2xl border border-slate-200 bg-white p-4">
              <TextInput label={`Card ${index + 1} titlu`} name={`contributionCards.${index}.title`} value={card.title} />
              <div className="mt-4">
                <TextArea label="Text" name={`contributionCards.${index}.text`} value={card.text} rows={4} />
              </div>
              <div className="mt-4 grid gap-4">
                <TextInput label="Link" name={`contributionCards.${index}.href`} value={card.href} />
                <TextInput label="Text buton" name={`contributionCards.${index}.action`} value={card.action} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          disabled={isPending}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white hover:bg-starsim-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isPending ? "Se salvează..." : "Salvează prima pagina"}
        </button>
        <Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
          Vezi site-ul
        </Link>
      </div>
    </form>
  );
}
