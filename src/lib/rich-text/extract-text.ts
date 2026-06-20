export function extractPlainTextFromTiptapJson(content: unknown): string {
  const parts: string[] = [];
  function walk(node: any) {
    if (!node) return;
    if (node.text) parts.push(node.text);
    if (Array.isArray(node.content)) node.content.forEach(walk);
  }
  walk(content);
  return parts.join(" ").trim();
}
