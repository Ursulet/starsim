import { MessageCircle } from "lucide-react";
import { getContactSettings } from "@/lib/queries/settings";

function normalizePhone(phone?: string | null) {
  const digits = (phone || "+40723123456").replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0")) return `40${digits.slice(1)}`;

  return digits;
}

export async function WhatsAppButton() {
  const contact = await getContactSettings();
  const phone = normalizePhone(contact?.phone);
  const message = encodeURIComponent("Buna! As vrea mai multe informatii despre activitatile Star Sim.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring fixed bottom-24 right-5 z-[65] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition hover:-translate-y-1 md:bottom-7 md:right-7"
      aria-label="Scrie-ne pe WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
