"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useState, ChangeEvent } from "react";
import {
  AlertCircle,
  Building2,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Upload,
  User,
  Users
} from "lucide-react";
import {
  updateOrganizationSettingsAction,
  type OrganizationActionState
} from "@/lib/actions/admin-organization";
import type { OrganizationSettings } from "@/lib/queries/settings";

type OrganizationSettingsFormProps = {
  settings: OrganizationSettings;
};

export function OrganizationSettingsForm({ settings }: OrganizationSettingsFormProps) {
  const [state, formAction, isPending] = useActionState<OrganizationActionState, FormData>(
    updateOrganizationSettingsAction,
    null
  );

  // Live preview state
  const [presidentName, setPresidentName] = useState(settings.presidentName || "Gîrdeanu Ștefan");
  const [presidentRole, setPresidentRole] = useState(settings.presidentRole || "Președinte");
  const [presidentBio, setPresidentBio] = useState(
    settings.presidentBio || "Coordonează direcțiile strategice, inițiativele educaționale și parteneriatele instituționale ale asociației."
  );
  const [presidentImageUrl, setPresidentImageUrl] = useState(settings.presidentImageUrl || "");

  const [vicePresidentName, setVicePresidentName] = useState(settings.vicePresidentName || "Claudiu Simion");
  const [vicePresidentRole, setVicePresidentRole] = useState(settings.vicePresidentRole || "Vicepreședinte");
  const [vicePresidentBio, setVicePresidentBio] = useState(
    settings.vicePresidentBio || "Asigură organizarea atelierelor practice STEM, logistica evenimentelor de observare și legătura cu comunitatea."
  );
  const [vicePresidentImageUrl, setVicePresidentImageUrl] = useState(settings.vicePresidentImageUrl || "");

  const [officialEmail, setOfficialEmail] = useState(settings.officialEmail || "contact@starsim.ro");
  const [phone1, setPhone1] = useState(settings.phone1 || "");
  const [phone2, setPhone2] = useState(settings.phone2 || "");
  const [headquarters, setHeadquarters] = useState(settings.headquarters || "Constanța");
  const [cui, setCui] = useState(settings.cui || "");

  // Local file preview handlers
  const handlePresidentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPresidentImageUrl(objectUrl);
    }
  };

  const handleVicePresidentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVicePresidentImageUrl(objectUrl);
    }
  };

  return (
    <form action={formAction} encType="multipart/form-data" className="max-w-[1100px] space-y-8">
      {state?.error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <span>{state.error}</span>
        </div>
      ) : null}

      {/* 1. Conducerea Asociației */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-starsim-navy/5 text-starsim-navy">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-starsim-navy">Conducerea Asociației Star Sim</h2>
            <p className="text-xs text-slate-500">
              Reprezentanții din conducere afișați pe pagina „Despre noi”.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Președinte (Reprezentant legal unic) */}
          <div className="rounded-2xl border-2 border-starsim-gold/40 bg-gradient-to-br from-white to-amber-50/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-starsim-gold text-xs font-bold text-white">
                  1
                </span>
                <h3 className="text-sm font-bold text-starsim-navy">Președinte</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                <ShieldCheck className="h-3 w-3" />
                Reprezentant legal unic
              </span>
            </div>

            <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
              Nume complet
              <input
                name="presidentName"
                value={presidentName}
                onChange={(e) => setPresidentName(e.target.value)}
                placeholder="Gîrdeanu Ștefan"
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal text-slate-800"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
              Funcție
              <input
                name="presidentRole"
                value={presidentRole}
                onChange={(e) => setPresidentRole(e.target.value)}
                placeholder="Președinte"
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal text-slate-800"
              />
            </label>

            {/* Poză Președinte */}
            <div className="space-y-2 rounded-xl bg-white p-3.5 border border-slate-200/80">
              <span className="text-xs font-semibold text-starsim-navy block">
                Poză de profil
              </span>
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
                  {presidentImageUrl ? (
                    <Image
                      src={presidentImageUrl}
                      alt={presidentName || "Președinte"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                    <Upload className="h-3.5 w-3.5 text-starsim-gold" />
                    <span>Încarcă poză</span>
                    <input
                      type="file"
                      name="presidentImageFile"
                      accept="image/*"
                      onChange={handlePresidentFileChange}
                      className="sr-only"
                    />
                  </label>
                  <input
                    type="hidden"
                    name="presidentImageUrl"
                    value={presidentImageUrl.startsWith("blob:") ? settings.presidentImageUrl || "" : presidentImageUrl}
                  />
                  <p className="text-[11px] text-slate-400">Recomandat: format pătrat sau portret (JPG, PNG, WEBP)</p>
                </div>
              </div>
            </div>

            <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
              Descriere / Rol în asociație
              <textarea
                name="presidentBio"
                rows={2}
                value={presidentBio}
                onChange={(e) => setPresidentBio(e.target.value)}
                placeholder="Coordonează direcțiile strategice, inițiativele educaționale..."
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-normal text-slate-800 leading-relaxed text-xs"
              />
            </label>
          </div>

          {/* Vicepreședinte */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-starsim-navy text-xs font-bold text-white">
                  2
                </span>
                <h3 className="text-sm font-bold text-starsim-navy">Vicepreședinte</h3>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-200">
                Conducere executivă
              </span>
            </div>

            <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
              Nume complet
              <input
                name="vicePresidentName"
                value={vicePresidentName}
                onChange={(e) => setVicePresidentName(e.target.value)}
                placeholder="Claudiu Simion"
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal text-slate-800"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
              Funcție
              <input
                name="vicePresidentRole"
                value={vicePresidentRole}
                onChange={(e) => setVicePresidentRole(e.target.value)}
                placeholder="Vicepreședinte"
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal text-slate-800"
              />
            </label>

            {/* Poză Vicepreședinte */}
            <div className="space-y-2 rounded-xl bg-white p-3.5 border border-slate-200/80">
              <span className="text-xs font-semibold text-starsim-navy block">
                Poză de profil
              </span>
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
                  {vicePresidentImageUrl ? (
                    <Image
                      src={vicePresidentImageUrl}
                      alt={vicePresidentName || "Vicepreședinte"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                    <Upload className="h-3.5 w-3.5 text-starsim-gold" />
                    <span>Încarcă poză</span>
                    <input
                      type="file"
                      name="vicePresidentImageFile"
                      accept="image/*"
                      onChange={handleVicePresidentFileChange}
                      className="sr-only"
                    />
                  </label>
                  <input
                    type="hidden"
                    name="vicePresidentImageUrl"
                    value={vicePresidentImageUrl.startsWith("blob:") ? settings.vicePresidentImageUrl || "" : vicePresidentImageUrl}
                  />
                  <p className="text-[11px] text-slate-400">Recomandat: format pătrat sau portret (JPG, PNG, WEBP)</p>
                </div>
              </div>
            </div>

            <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
              Descriere / Rol în asociație
              <textarea
                name="vicePresidentBio"
                rows={2}
                value={vicePresidentBio}
                onChange={(e) => setVicePresidentBio(e.target.value)}
                placeholder="Asigură organizarea atelierelor practice STEM..."
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-normal text-slate-800 leading-relaxed text-xs"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Contact & Date de Identificare */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-starsim-navy/5 text-starsim-navy">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-starsim-navy">Contact & Date de Identificare</h2>
            <p className="text-xs text-slate-500">
              Afișate pe cardul de contact de pe pagina „Despre noi”.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Email oficial
            <input
              name="officialEmail"
              type="email"
              value={officialEmail}
              onChange={(e) => setOfficialEmail(e.target.value)}
              placeholder="contact@starsim.ro"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Telefon 1 (Principal)
            <input
              name="phone1"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              placeholder="ex: +40 723 123 456"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Telefon 2 (Secundar)
            <input
              name="phone2"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              placeholder="ex: +40 722 000 000"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Sediu
            <input
              name="headquarters"
              value={headquarters}
              onChange={(e) => setHeadquarters(e.target.value)}
              placeholder="Constanța"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Cod Fiscal (CUI / CIF)
            <input
              name="cui"
              value={cui}
              onChange={(e) => setCui(e.target.value)}
              placeholder="ex: 12345678"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Adresă completă / Județ
            <input
              name="address"
              defaultValue={settings.address || "Constanța, România"}
              placeholder="Constanța, România"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy sm:col-span-2 lg:col-span-3">
            Nr. Înregistrare Registrul Asociațiilor și Fundațiilor (opțional)
            <input
              name="regNumber"
              defaultValue={settings.regNumber || ""}
              placeholder="ex: Dosar nr. ... / Înreg. Reg. Asociații"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>
        </div>
      </div>

      {/* 3. Previzualizare Live pe Pagina Despre Noi */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Previzualizare Live pe pagina „Despre noi”
            </span>
          </div>
          <span className="text-xs text-slate-400">Design nou • 3 carduri</span>
        </div>

        {/* Live Preview Container */}
        <div className="mt-5 rounded-3xl bg-slate-50 p-6 md:p-8 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl font-bold text-starsim-navy md:text-3xl">
              Conducerea Asociației Star Sim
            </h3>
            <p className="mt-2 text-xs text-starsim-muted">
              Echipa dedicată promovării astronomiei, educației practice și inspirării tinerelor generații.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {/* Card 1: Președinte */}
            <div className="navy-gradient rounded-2xl p-6 text-white shadow-md border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-starsim-gold/20 px-2.5 py-0.5 text-[11px] font-bold text-starsim-softGold border border-starsim-gold/30">
                    <ShieldCheck className="h-3 w-3" />
                    Reprezentant legal
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3.5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-starsim-gold/40 bg-white/10 shadow-sm">
                    {presidentImageUrl ? (
                      <Image
                        src={presidentImageUrl}
                        alt={presidentName || "Președinte"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-starsim-gold to-amber-600 font-serif text-lg font-bold text-starsim-navy">
                        {presidentName ? presidentName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("") : "GȘ"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white leading-tight">
                      {presidentName || "Gîrdeanu Ștefan"}
                    </h4>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-starsim-softGold mt-0.5">
                      {presidentRole || "Președinte"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {presidentBio || "Coordonează direcțiile strategice, inițiativele educaționale..."}
                </p>
              </div>
            </div>

            {/* Card 2: Vicepreședinte */}
            <div className="navy-gradient rounded-2xl p-6 text-white shadow-md border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 border border-white/10">
                    Conducere executivă
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3.5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-starsim-gold/40 bg-white/10 shadow-sm">
                    {vicePresidentImageUrl ? (
                      <Image
                        src={vicePresidentImageUrl}
                        alt={vicePresidentName || "Vicepreședinte"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-starsim-gold to-amber-600 font-serif text-lg font-bold text-starsim-navy">
                        {vicePresidentName ? vicePresidentName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("") : "CS"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white leading-tight">
                      {vicePresidentName || "Claudiu Simion"}
                    </h4>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-starsim-softGold mt-0.5">
                      {vicePresidentRole || "Vicepreședinte"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {vicePresidentBio || "Asigură organizarea atelierelor practice STEM..."}
                </p>
              </div>
            </div>

            {/* Card 3: Contact */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-starsim-gold/15 flex items-center justify-center text-starsim-gold">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-starsim-navy">
                    Contact
                  </h4>
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <Mail className="h-4 w-4 text-starsim-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase text-slate-400 block">Email</span>
                      <span className="font-semibold text-starsim-navy truncate block">{officialEmail || "contact@starsim.ro"}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <Phone className="h-4 w-4 text-starsim-gold shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase text-slate-400 block">Telefon</span>
                      <span className="font-semibold text-starsim-navy block">{phone1 || "[Telefon 1]"} {phone2 ? `/ ${phone2}` : ""}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[9px] font-bold uppercase text-slate-400 block">Sediu</span>
                      <span className="font-bold text-starsim-navy text-xs block">{headquarters || "Constanța"}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[9px] font-bold uppercase text-slate-400 block">CUI</span>
                      <span className="font-bold text-starsim-navy text-xs block">{cui || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-starsim-navy">Formular contact →</span>
                <span className="font-bold text-starsim-gold">Susține asociația</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-starsim-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Se salvează modificările...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Salvează Conducerea & Contactul</span>
            </>
          )}
        </button>

        <Link
          href="/despre"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-starsim-navy shadow-xs transition-colors hover:bg-slate-50"
        >
          <ExternalLink className="h-4 w-4 text-slate-400" />
          <span>Vezi pagina Despre noi în tab nou</span>
        </Link>
      </div>
    </form>
  );
}
