"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  AlertCircle,
  Building2,
  Check,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserCheck,
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
  const [vicePresidentName, setVicePresidentName] = useState(settings.vicePresidentName || "Claudiu Simion");
  const [vicePresidentRole, setVicePresidentRole] = useState(settings.vicePresidentRole || "Vicepreședinte");
  const [officialEmail, setOfficialEmail] = useState(settings.officialEmail || "contact@starsim.ro");
  const [phone1, setPhone1] = useState(settings.phone1 || "");
  const [phone2, setPhone2] = useState(settings.phone2 || "");
  const [headquarters, setHeadquarters] = useState(settings.headquarters || "Constanța");
  const [cui, setCui] = useState(settings.cui || "");

  return (
    <form action={formAction} className="max-w-[1100px] space-y-8">
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
              Persoanele oficiale din conducere afișate pe pagina „Despre noi”.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Președinte */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-starsim-gold/20 text-xs font-bold text-starsim-gold">
                1
              </span>
              <h3 className="text-sm font-bold text-starsim-navy">Președinte</h3>
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
              Funcție / Rol oficial
              <input
                name="presidentRole"
                value={presidentRole}
                onChange={(e) => setPresidentRole(e.target.value)}
                placeholder="Președinte"
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal text-slate-800"
              />
            </label>
          </div>

          {/* Vicepreședinte */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-starsim-gold/20 text-xs font-bold text-starsim-gold">
                2
              </span>
              <h3 className="text-sm font-bold text-starsim-navy">Vicepreședinte</h3>
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
              Funcție / Rol oficial
              <input
                name="vicePresidentRole"
                value={vicePresidentRole}
                onChange={(e) => setVicePresidentRole(e.target.value)}
                placeholder="Vicepreședinte"
                className="focus-ring rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal text-slate-800"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Contact Oficial & Date de Identificare */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-starsim-navy/5 text-starsim-navy">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-starsim-navy">Contact Oficial și Date de Identificare</h2>
            <p className="text-xs text-slate-500">
              Datele oficiale ale asociației afișate alături de cardul conducerii.
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
            Telefon oficial 1 (Principal)
            <input
              name="phone1"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              placeholder="ex: +40 723 123 456"
              className="focus-ring rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal text-slate-800"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
            Telefon oficial 2 (Secundar)
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
          <span className="text-xs text-slate-400">Actualizare instantanee la tastare</span>
        </div>

        <div className="mt-5 rounded-3xl border border-starsim-border/60 bg-gradient-to-br from-slate-900 via-starsim-navy to-slate-950 p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Subtle star glow */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-starsim-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-starsim-gold/15 px-3 py-1 text-xs font-bold text-starsim-softGold border border-starsim-gold/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Reprezentanți Oficiali
            </div>

            <h3 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl">
              Conducerea Asociației Star Sim
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Organizație nonprofit dedicată promovării astronomiei și educației practice.
            </p>

            {/* Leadership Cards Grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* President */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-gold/20 text-starsim-softGold font-serif font-black text-lg border border-starsim-gold/30">
                    {presidentName ? presidentName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("") : "GȘ"}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{presidentName || "Gîrdeanu Ștefan"}</h4>
                    <p className="text-xs font-semibold text-starsim-softGold">{presidentRole || "Președinte"}</p>
                  </div>
                </div>
              </div>

              {/* Vice President */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-starsim-gold/20 text-starsim-softGold font-serif font-black text-lg border border-starsim-gold/30">
                    {vicePresidentName ? vicePresidentName.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("") : "CS"}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{vicePresidentName || "Claudiu Simion"}</h4>
                    <p className="text-xs font-semibold text-starsim-softGold">{vicePresidentRole || "Vicepreședinte"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Contact Pill Row */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-starsim-softGold mb-3">
                Contact Oficial & Date Identificare
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="h-4 w-4 text-starsim-gold shrink-0" />
                  <span className="truncate">{officialEmail || "contact@starsim.ro"}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="h-4 w-4 text-starsim-gold shrink-0" />
                  <span>{phone1 || "[Telefon 1]"}</span>
                  {phone2 ? <span className="text-slate-400">/ {phone2}</span> : null}
                </div>

                <div className="flex items-center gap-2 text-slate-200">
                  <MapPin className="h-4 w-4 text-starsim-gold shrink-0" />
                  <span>Sediu: {headquarters || "Constanța"}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-200">
                  <Building2 className="h-4 w-4 text-starsim-gold shrink-0" />
                  <span>CUI: {cui || "[CUI Asociație]"}</span>
                </div>
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
              <span>Salvează Conducerea & Contactul Oficial</span>
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
