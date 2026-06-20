"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/lib/actions/contact";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, null);
  return (
    <form action={action} className="premium-card grid gap-4 p-6">
      {state?.message ? <p className="rounded-xl bg-starsim-ivory p-3 text-sm font-semibold text-starsim-navy">{state.message}</p> : null}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="grid gap-2 text-sm font-semibold">Nume<input name="name" required className="focus-ring rounded-xl border border-starsim-border px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Email<input name="email" type="email" required className="focus-ring rounded-xl border border-starsim-border px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Telefon<input name="phone" className="focus-ring rounded-xl border border-starsim-border px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Tip solicitare
        <select name="type" className="focus-ring rounded-xl border border-starsim-border px-4 py-3 font-normal">
          <option value="GENERAL">General</option>
          <option value="EVENT">Eveniment</option>
          <option value="VOLUNTEERING">Voluntariat</option>
          <option value="PARTNERSHIP">Parteneriat</option>
          <option value="DONATION">Donatie</option>
          <option value="SCHOOL">Scoala</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">Subiect<input name="subject" className="focus-ring rounded-xl border border-starsim-border px-4 py-3 font-normal" /></label>
      <label className="grid gap-2 text-sm font-semibold">Mesaj<textarea name="message" required minLength={10} className="focus-ring min-h-36 rounded-xl border border-starsim-border px-4 py-3 font-normal" /></label>
      <label className="flex gap-3 text-sm text-starsim-muted"><input name="consent" type="checkbox" required /> Sunt de acord sa fiu contactat pentru aceasta solicitare.</label>
      <button disabled={pending} className="focus-ring rounded-full bg-starsim-navy px-6 py-3 font-bold text-white hover:bg-starsim-blue disabled:opacity-60">
        {pending ? "Se trimite..." : "Trimite mesajul"}
      </button>
    </form>
  );
}
