"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { AlertCircle, CheckCircle, Loader2, Mail, Save, Send } from "lucide-react";
import { saveSmtpSettingsAction, sendTestEmailAction, type SmtpActionState } from "@/lib/actions/admin-smtp";
import type { SmtpConfig } from "@/lib/mail";

function TextInput({
  label,
  name,
  type = "text",
  value,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal text-slate-800"
      />
    </label>
  );
}

export function SmtpSettingsForm({ smtp }: { smtp: SmtpConfig | null }) {
  const [saveState, saveFormAction, isSavePending] = useActionState<SmtpActionState, FormData>(
    saveSmtpSettingsAction,
    null
  );

  const [testState, testFormAction, isTestPending] = useActionState<SmtpActionState, FormData>(
    sendTestEmailAction,
    null
  );

  const [testEmail, setTestEmail] = useState("");

  const initialConfig = smtp || {
    host: "",
    port: 587,
    user: "",
    pass: "",
    from: "",
    secure: false
  };

  return (
    <div className="max-w-[1000px] space-y-8">
      {/* Save Settings Form */}
      <form
        action={saveFormAction}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-starsim-navy mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Mail className="h-5 w-5 text-starsim-gold" />
          Server de expediere (SMTP)
        </h2>

        {saveState?.error ? (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{saveState.error}</span>
          </div>
        ) : null}

        {saveState?.success ? (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{saveState.success}</span>
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput label="Host SMTP" name="host" value={initialConfig.host} placeholder="smtp.mailtrap.io sau smtp.gmail.com" />
          <TextInput label="Port SMTP" name="port" type="number" value={String(initialConfig.port)} placeholder="587 sau 465" />
          <TextInput label="Utilizator SMTP (User)" name="user" value={initialConfig.user} placeholder="utilizator@exemplu.com" />
          <TextInput label="Parolă SMTP (Password)" name="pass" type="password" value={initialConfig.pass} placeholder="••••••••••••" />
          <TextInput label="Email Expeditor (From)" name="from" value={initialConfig.from} placeholder="no-reply@starsim.ro" />

          <div className="flex items-end">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-starsim-navy w-full h-[42px] cursor-pointer">
              <input 
                name="secure" 
                type="checkbox" 
                defaultChecked={initialConfig.secure} 
                className="h-4 w-4 rounded border-slate-300" 
              />
              Conexiune securizată (SSL / TLS)
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSavePending}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white hover:bg-starsim-blue disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSavePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSavePending ? "Se salvează..." : "Salvează configurația"}
          </button>
          <Link href="/admin/setari" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
            Înapoi la setări
          </Link>
        </div>
      </form>

      {/* Test Settings Form */}
      {smtp?.host && (
        <form
          action={testFormAction}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
        >
          <h3 className="text-base font-bold text-starsim-navy mb-2 flex items-center gap-2">
            <Send className="h-4 w-4 text-starsim-gold" />
            Testează conexiunea SMTP
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Trimite un email de probă pentru a verifica dacă setările salvate mai sus funcționează corect.
          </p>

          {/* Hidden inputs to send current credentials to test action */}
          <input type="hidden" name="host" value={initialConfig.host} />
          <input type="hidden" name="port" value={initialConfig.port} />
          <input type="hidden" name="user" value={initialConfig.user} />
          <input type="hidden" name="pass" value={initialConfig.pass} />
          <input type="hidden" name="from" value={initialConfig.from} />
          <input type="hidden" name="secure" value={initialConfig.secure ? "on" : ""} />

          {testState?.error ? (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-100 px-4 py-2 text-xs text-red-700">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{testState.error}</span>
            </div>
          ) : null}

          {testState?.success ? (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-2 text-xs text-emerald-800">
              <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span>{testState.success}</span>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              name="testEmail"
              type="email"
              placeholder="nume@exemplu.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              required
              className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 bg-white"
            />
            <button
              type="submit"
              disabled={isTestPending || !testEmail}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-gold px-4 py-2 text-sm font-bold text-starsim-navy hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isTestPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isTestPending ? "Se trimite..." : "Trimite email test"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
