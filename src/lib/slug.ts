const diacritics: Record<string, string> = {
  a: "a",
  ă: "a",
  â: "a",
  î: "i",
  ș: "s",
  ş: "s",
  ț: "t",
  ţ: "t"
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[ăâîșşțţ]/g, (char) => diacritics[char] || char)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

export function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function normalizePath(path: string): string {
  return ensureLeadingSlash(path.trim()).replace(/\/{2,}/g, "/");
}
