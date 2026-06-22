import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure: boolean;
};

export async function getSmtpConfig(): Promise<SmtpConfig | null> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { key: "smtp" }
    });
    if (settings && typeof settings.value === "object" && settings.value !== null) {
      const v = settings.value as any;
      return {
        host: String(v.host || ""),
        port: Number(v.port || 587),
        user: String(v.user || ""),
        pass: String(v.pass || ""),
        from: String(v.from || ""),
        secure: Boolean(v.secure)
      };
    }
  } catch {}
  
  // Fallback to env
  if (process.env.SMTP_HOST) {
    return {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASSWORD || "",
      from: process.env.SMTP_FROM || "",
      secure: process.env.SMTP_SECURE === "true"
    };
  }

  return null;
}

export async function createTransporter(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.user && config.pass ? {
      user: config.user,
      pass: config.pass
    } : undefined
  });
}

export async function sendMail(to: string, subject: string, text: string, html?: string) {
  const config = await getSmtpConfig();
  if (!config || !config.host) {
    console.warn("SMTP is not configured. Cannot send email.");
    return false;
  }
  
  try {
    const transporter = await createTransporter(config);
    await transporter.sendMail({
      from: config.from || config.user,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br/>")
    });
    return true;
  } catch (error) {
    console.error("Failed to send email via SMTP:", error);
    return false;
  }
}
