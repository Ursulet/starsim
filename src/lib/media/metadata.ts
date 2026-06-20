export function getImageAlt(alt: string | null | undefined, fallback: string) {
  return alt?.trim() || fallback;
}
