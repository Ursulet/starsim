import Image from "next/image";

function isSafeHref(href: string | undefined | null): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  if (/^https?:\/\//i.test(trimmed)) return true;
  if (/^mailto:/i.test(trimmed)) return true;
  if (/^tel:/i.test(trimmed)) return true;
  return false;
}

function renderNode(node: any, index: number): React.ReactNode {
  if (!node) return null;
  const children = node.content?.map(renderNode) || node.text || null;
  if (node.type === "text") {
    let content: React.ReactNode = node.text;
    for (const mark of node.marks || []) {
      if (mark.type === "bold") content = <strong>{content}</strong>;
      if (mark.type === "italic") content = <em>{content}</em>;
      if (mark.type === "link" && isSafeHref(mark.attrs?.href)) {
        content = <a href={mark.attrs.href} rel="noopener noreferrer">{content}</a>;
      }
    }
    return content;
  }
  if (node.type === "heading") {
    const Tag = `h${node.attrs?.level || 2}` as "h2";
    return <Tag key={index}>{children}</Tag>;
  }
  if (node.type === "bulletList") return <ul key={index}>{children}</ul>;
  if (node.type === "orderedList") return <ol key={index}>{children}</ol>;
  if (node.type === "listItem") return <li key={index}>{children}</li>;
  if (node.type === "blockquote") return <blockquote key={index}>{children}</blockquote>;
  if (node.type === "image" && node.attrs?.src) {
    return <Image key={index} src={node.attrs.src} alt={node.attrs.alt || ""} width={900} height={520} className="my-8 rounded-2xl" />;
  }
  return <p key={index} className="whitespace-pre-wrap">{children}</p>;
}

export function RichTextRenderer({ content }: { content?: unknown }) {
  const doc = content as any;
  if (!doc?.content?.length) return null;
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-starsim-navy prose-a:font-semibold prose-a:text-starsim-gold prose-blockquote:border-starsim-gold">
      {doc.content.map(renderNode)}
    </div>
  );
}
