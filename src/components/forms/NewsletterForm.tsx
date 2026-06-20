"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, null);

  return (
    <form action={action} className="mt-3">
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input name="consent" type="hidden" value="true" />
      <div className="flex rounded-xl bg-white p-1">
        <input
          name="email"
          type="email"
          required
          className="min-w-0 flex-1 rounded-lg px-3 text-sm text-starsim-ink outline-none"
          placeholder="Adresă ta de email"
          aria-label="Email newsletter"
        />
        <button disabled={pending} className="rounded-lg bg-starsim-gold p-3 text-starsim-navy disabled:opacity-60" aria-label="Abonare newsletter">
          <Send className="h-4 w-4" />
        </button>
      </div>
      {state?.message ? (
        <p className={state.ok ? "mt-2 text-xs text-white/75" : "mt-2 text-xs text-red-200"}>{state.message}</p>
      ) : null}
    </form>
  );
}
