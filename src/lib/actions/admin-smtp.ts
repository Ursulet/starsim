"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/server/auth/session";
import { createTransporter } from "@/lib/mail";

export type SmtpActionState = {
  success?: string;
  error?: string;
} | null;

export async function saveSmtpSettingsAction(
  _prevState: SmtpActionState,
  formData: FormData
): Promise<SmtpActionState> {
  await requireRole(["ADMIN"]);

  const host = String(formData.get("host") || "").trim();
  const port = Number(formData.get("port") || 587);
  const user = String(formData.get("user") || "").trim();
  const pass = String(formData.get("pass") || "").trim();
  const from = String(formData.get("from") || "").trim();
  const secure = formData.get("secure") === "on";

  if (!host) {
    return { error: "Host-ul SMTP este obligatoriu." };
  }

  try {
    const config = { host, port, user, pass, from, secure };
    
    await prisma.siteSettings.upsert({
      where: { key: "smtp" },
      update: { value: config },
      create: { key: "smtp", value: config }
    });

    revalidatePath("/admin/smtp");
    return { success: "Setările SMTP au fost salvate cu succes!" };
  } catch (err: any) {
    console.error("[SMTP Save] Error:", err);
    return { error: "Salvarea setărilor SMTP a eșuat. Încearcă din nou." };
  }
}

export async function sendTestEmailAction(
  _prevState: SmtpActionState,
  formData: FormData
): Promise<SmtpActionState> {
  await requireRole(["ADMIN"]);

  const host = String(formData.get("host") || "").trim();
  const port = Number(formData.get("port") || 587);
  const user = String(formData.get("user") || "").trim();
  const pass = String(formData.get("pass") || "").trim();
  const from = String(formData.get("from") || "").trim();
  const secure = formData.get("secure") === "on";
  const to = String(formData.get("testEmail") || "").trim();

  if (!host) {
    return { error: "Completează host-ul SMTP înainte de a trimite testul." };
  }
  if (!to) {
    return { error: "Adresa de email pentru test este obligatorie." };
  }

  try {
    const config = { host, port, user, pass, from, secure };
    const transporter = await createTransporter(config);
    
    await transporter.sendMail({
      from: from || user,
      to,
      subject: "Test conexiune SMTP Star Sim",
      text: "Conexiunea SMTP a fost configurată cu succes în panoul de administrare Star Sim!",
      html: "<p>Conexiunea SMTP a fost configurată cu succes în panoul de administrare Star Sim!</p>"
    });

    return { success: `Email de test trimis cu succes către ${to}!` };
  } catch (err: any) {
    console.error("[SMTP Test] Error:", err);
    return { error: "Conexiunea SMTP a eșuat. Verifică datele de conectare și încearcă din nou." };
  }
}
