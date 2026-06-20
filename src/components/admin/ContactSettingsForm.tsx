import Link from "next/link";
import { updateContactSettingsAction } from "@/lib/actions/admin-contact-settings";

type ContactSettingsFormProps = {
  settings: {
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    schedule?: string | null;
    mapUrl?: string | null;
    introText?: string | null;
    footerDescription?: string | null;
    footerCopyright?: string | null;
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    youtubeUrl?: string | null;
    tiktokUrl?: string | null;
    linkedinUrl?: string | null;
  } | null;
};

function TextInput({
  label,
  name,
  value,
  placeholder,
  type = "text"
}: {
  label: string;
  name: string;
  value?: string | null;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={value || ""}
        placeholder={placeholder}
        className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal text-slate-800"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  placeholder,
  rows = 4
}: {
  label: string;
  name: string;
  value?: string | null;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <textarea
        name={name}
        defaultValue={value || ""}
        placeholder={placeholder}
        rows={rows}
        className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal leading-6 text-slate-800"
      />
    </label>
  );
}

export function ContactSettingsForm({ settings }: ContactSettingsFormProps) {
  return (
    <form action={updateContactSettingsAction} className="max-w-[1100px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput label="Email public" name="email" type="email" value={settings?.email} placeholder="contact@starsim.ro" />
        <TextInput label="Telefon public / WhatsApp" name="phone" value={settings?.phone} placeholder="+40 723 123 456" />
        <TextInput label="Oraș" name="city" value={settings?.city} placeholder="București" />
        <TextInput label="Program" name="schedule" value={settings?.schedule} placeholder="Luni - Vineri, 10:00 - 18:00" />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <TextArea label="Adresă" name="address" value={settings?.address} placeholder="București, România" />
        <TextArea label="Intro pagina Contact" name="introText" value={settings?.introText} placeholder="Scrie-ne pentru programe, evenimente, voluntariat sau parteneriate." />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Footer</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <TextArea
            label="Descriere scurtă footer"
            name="footerDescription"
            value={settings?.footerDescription}
            placeholder="Asociatie dedicata promovarii astronomiei..."
          />
          <TextArea
            label="Text copyright / slogan"
            name="footerCopyright"
            value={settings?.footerCopyright}
            placeholder="De la o stea, la un vis. Toate drepturile rezervate."
            rows={3}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h2 className="font-semibold text-starsim-navy">Linkuri sociale și hartă</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <TextInput label="Facebook" name="facebookUrl" value={settings?.facebookUrl} placeholder="https://facebook.com/..." />
          <TextInput label="Instagram" name="instagramUrl" value={settings?.instagramUrl} placeholder="https://instagram.com/..." />
          <TextInput label="YouTube" name="youtubeUrl" value={settings?.youtubeUrl} placeholder="https://youtube.com/..." />
          <TextInput label="TikTok" name="tiktokUrl" value={settings?.tiktokUrl} placeholder="https://tiktok.com/@..." />
          <TextInput label="LinkedIn" name="linkedinUrl" value={settings?.linkedinUrl} placeholder="https://linkedin.com/company/..." />
          <TextInput label="Link Google Maps" name="mapUrl" value={settings?.mapUrl} placeholder="https://maps.google.com/..." />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="focus-ring rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white">Salvează datele</button>
        <Link href="/contact" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
          Vezi pagina contact
        </Link>
      </div>
    </form>
  );
}
