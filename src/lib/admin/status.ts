export const statusMeta: Record<string, { label: string; tone: "neutral" | "success" | "warning" | "danger" | "info" }> = {
  DRAFT: { label: "Ciornă", tone: "neutral" },
  PUBLISHED: { label: "Publicat", tone: "success" },
  ARCHIVED: { label: "Arhivat", tone: "warning" },
  CANCELLED: { label: "Anulat", tone: "danger" },
  COMPLETED: { label: "Finalizat", tone: "info" },
  NEW: { label: "Nou", tone: "info" },
  READ: { label: "Citit", tone: "neutral" },
  IN_PROGRESS: { label: "În lucru", tone: "warning" },
  RESOLVED: { label: "Rezolvat", tone: "success" },
  SPAM: { label: "Spam", tone: "danger" },
  ACTIVE: { label: "Activ", tone: "success" },
  DISABLED: { label: "Dezactivat", tone: "danger" },
  UNSUBSCRIBED: { label: "Dezabonat", tone: "neutral" },
  BOUNCED: { label: "Respins", tone: "warning" }
};
