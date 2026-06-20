"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });
    setLoading(false);
    if (result?.error) setError("Email sau parolă incorectă.");
    else router.push("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#F8FAFC] p-5">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
        <Image src="/images/logo-starsim.png" alt="Star Sim" width={220} height={84} className="mx-auto h-16 w-auto" />
        <h1 className="mt-6 text-center font-serif text-3xl text-starsim-navy">Admin CMS</h1>
        <p className="mt-2 text-center text-sm text-slate-500">Autentificare pentru echipa Star Sim</p>
        {error ? <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <label className="mt-6 grid gap-2 text-sm font-semibold">Email<input name="email" type="email" required className="focus-ring rounded-xl border border-slate-200 px-4 py-3 font-normal" /></label>
        <label className="mt-4 grid gap-2 text-sm font-semibold">Parolă<input name="password" type="password" required className="focus-ring rounded-xl border border-slate-200 px-4 py-3 font-normal" /></label>
        <button disabled={loading} className="focus-ring mt-6 w-full rounded-xl bg-starsim-navy px-5 py-3 font-bold text-white hover:bg-starsim-blue disabled:opacity-60">
          {loading ? "Se verifică..." : "Intră în admin"}
        </button>
        <Link href="/" className="mt-5 block text-center text-sm font-semibold text-starsim-gold">Înapoi la site</Link>
      </form>
    </main>
  );
}
