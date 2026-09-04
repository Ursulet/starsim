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
      if (mark.type === "bold") content = <strong key="b">{content}</strong>;
      if (mark.type === "italic") content = <em key="i">{content}</em>;
      if (mark.type === "link" && isSafeHref(mark.attrs?.href)) {
        content = (
          <a
            key="a"
            href={mark.attrs.href}
            target={mark.attrs?.href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-starsim-gold underline hover:text-amber-600 transition-colors"
          >
            {content}
          </a>
        );
      }
    }
    return content;
  }
  if (node.type === "heading") {
    const Tag = `h${node.attrs?.level || 2}` as "h2" | "h3" | "h4";
    return <Tag key={index}>{children}</Tag>;
  }
  if (node.type === "bulletList") return <ul key={index} className="list-disc pl-5 my-2 space-y-1">{children}</ul>;
  if (node.type === "orderedList") return <ol key={index} className="list-decimal pl-5 my-2 space-y-1">{children}</ol>;
  if (node.type === "listItem") return <li key={index}>{children}</li>;
  if (node.type === "blockquote") return <blockquote key={index} className="border-l-4 border-starsim-gold pl-4 italic my-2">{children}</blockquote>;
  if (node.type === "image" && node.attrs?.src) {
    return <Image key={index} src={node.attrs.src} alt={node.attrs.alt || ""} width={900} height={520} className="my-8 rounded-2xl" />;
  }
  return <p key={index} className="whitespace-pre-wrap">{children}</p>;
}

export function RichTextRenderer({
  content,
  className = ""
}: {
  content?: unknown;
  className?: string;
}) {
  if (!content) return null;

  let doc: any = content;

  // Handle string input: could be a JSON string or plain text
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        doc = JSON.parse(trimmed);
      } catch {
        doc = trimmed;
      }
    } else {
      doc = trimmed;
    }
  }

  // Tiptap document
  if (doc && typeof doc === "object" && Array.isArray(doc.content) && doc.content.length > 0) {
    return (
      <div
        className={`prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-starsim-navy prose-a:font-semibold prose-a:text-starsim-gold prose-blockquote:border-starsim-gold ${className}`}
      >
        {doc.content.map(renderNode)}
      </div>
    );
  }

  // Plain text fallback (for legacy impact descriptions)
  if (typeof doc === "string" && doc.length > 0) {
    return (
      <div
        className={`prose prose-slate max-w-none text-starsim-muted leading-relaxed ${className}`}
      >
        {doc.split("\n\n").map((para, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {para}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
