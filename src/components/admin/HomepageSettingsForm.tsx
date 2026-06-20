import Link from "next/link";
import { updateHomepageSettingsAction } from "@/lib/actions/admin-homepage";
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

export function HomepageSettingsForm({ settings }: { settings: HomepageSettings }) {
  return (
    <form action={updateHomepageSettingsAction} className="max-w-[1100px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <TextArea label="Text hero" name="heroIntro" value={settings.heroIntro} rows={5} />
        <TextInput label="Imagine hero" name="heroImageUrl" value={settings.heroImageUrl} placeholder="/images/mockup-site-asociatie.png" />
        <TextInput label="Buton principal" name="heroPrimaryLabel" value={settings.heroPrimaryLabel} />
        <TextInput label="Link buton principal" name="heroPrimaryHref" value={settings.heroPrimaryHref} />
        <TextInput label="Buton secundar" name="heroSecondaryLabel" value={settings.heroSecondaryLabel} />
        <TextInput label="Link buton secundar" name="heroSecondaryHref" value={settings.heroSecondaryHref} />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Misiune</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <TextInput label="Titlu sectiune" name="missionTitle" value={settings.missionTitle} />
          <TextInput label="Subtitlu sectiune" name="missionSubtitle" value={settings.missionSubtitle} />
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
          <TextInput label="Titlu sectiune" name="contributionTitle" value={settings.contributionTitle} />
          <TextInput label="Subtitlu sectiune" name="contributionSubtitle" value={settings.contributionSubtitle} />
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
        <button className="focus-ring rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white">Salveaza prima pagina</button>
        <Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
          Vezi site-ul
        </Link>
      </div>
    </form>
  );
}
