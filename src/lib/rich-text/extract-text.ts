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

export function tiptapToPlainText(content: unknown): string {
  if (!content) return "";
  const doc = content as any;
  if (doc.type === "doc" && Array.isArray(doc.content)) {
    return doc.content
      .map((block: any) => {
        if (!block) return "";
        const textParts: string[] = [];
        function walk(node: any) {
          if (!node) return;
          if (node.text) textParts.push(node.text);
          if (Array.isArray(node.content)) node.content.forEach(walk);
        }
        walk(block);
        return textParts.join("");
      })
      .filter((text: string) => text !== undefined && text !== null)
      .join("\n\n");
  }
  return extractPlainTextFromTiptapJson(content);
}

