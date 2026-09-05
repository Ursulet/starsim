import Image from "next/image";
import React from "react";

function isSafeHref(href: string | undefined | null): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return true;
  if (/^https?:\/\//i.test(trimmed)) return true;
  if (/^mailto:/i.test(trimmed)) return true;
  if (/^tel:/i.test(trimmed)) return true;
  return false;
}

function parseFormattedText(text: string): React.ReactNode[] {
  // Support inline bold **text** or email/links in plain strings
  if (!text) return [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-starsim-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  if (node.type === "text") {
    let content: React.ReactNode = typeof node.text === "string" ? parseFormattedText(node.text) : node.text;

    for (const mark of node.marks || []) {
      if (mark.type === "bold") {
        content = (
          <strong key="b" className="font-bold text-starsim-navy">
            {content}
          </strong>
        );
      }
      if (mark.type === "italic") {
        content = (
          <em key="i" className="italic text-slate-800">
            {content}
          </em>
        );
      }
      if (mark.type === "link" && isSafeHref(mark.attrs?.href)) {
        content = (
          <a
            key="a"
            href={mark.attrs.href}
            target={mark.attrs?.href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="font-semibold text-starsim-navy underline decoration-starsim-gold/70 decoration-2 underline-offset-4 hover:text-starsim-gold hover:decoration-starsim-gold transition-colors"
          >
            {content}
          </a>
        );
      }
    }
    return <React.Fragment key={index}>{content}</React.Fragment>;
  }

  const children = node.content?.map(renderNode) || null;

  if (node.type === "heading") {
    const level = node.attrs?.level || 2;
    if (level === 1) {
      return (
        <h1
          key={index}
          className="font-serif text-2xl sm:text-3xl font-bold text-starsim-navy mt-10 mb-4 tracking-tight leading-tight"
        >
          {children}
        </h1>
      );
    }
    if (level === 2) {
      return (
        <h2
          key={index}
          className="font-serif text-xl sm:text-2xl font-bold text-starsim-navy mt-10 mb-4 pt-6 border-t border-slate-200/80 first:mt-0 first:pt-0 first:border-0 leading-snug tracking-tight"
        >
          {children}
        </h2>
      );
    }
    if (level === 3) {
      return (
        <h3
          key={index}
          className="font-serif text-lg sm:text-xl font-bold text-starsim-navy mt-7 mb-3 leading-snug"
        >
          {children}
        </h3>
      );
    }
    return (
      <h4
        key={index}
        className="font-sans text-base sm:text-lg font-bold text-starsim-navy mt-5 mb-2"
      >
        {children}
      </h4>
    );
  }

  if (node.type === "bulletList") {
    return (
      <ul
        key={index}
        className="my-4 pl-6 space-y-2 list-disc text-slate-700 text-[15px] sm:text-[16px] leading-[1.75] marker:text-starsim-gold"
      >
        {children}
      </ul>
    );
  }

  if (node.type === "orderedList") {
    return (
      <ol
        key={index}
        className="my-4 pl-6 space-y-2 list-decimal text-slate-700 text-[15px] sm:text-[16px] leading-[1.75] marker:text-starsim-gold font-medium"
      >
        {children}
      </ol>
    );
  }

  if (node.type === "listItem") {
    return (
      <li key={index} className="pl-1 text-slate-700">
        {children}
      </li>
    );
  }

  if (node.type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="my-6 border-l-4 border-starsim-gold bg-amber-50/40 rounded-r-2xl p-4 sm:p-5 italic text-slate-800 text-[15px] sm:text-[16px] leading-relaxed shadow-xs"
      >
        {children}
      </blockquote>
    );
  }

  if (node.type === "image" && node.attrs?.src) {
    return (
      <Image
        key={index}
        src={node.attrs.src}
        alt={node.attrs.alt || ""}
        width={900}
        height={520}
        className="my-8 rounded-2xl shadow-sm"
      />
    );
  }

  return (
    <p
      key={index}
      className="text-slate-700 text-[15px] sm:text-[16px] leading-[1.75] mb-4.5 last:mb-0"
    >
      {children}
    </p>
  );
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
      <div className={`prose prose-slate max-w-none ${className}`}>
        {doc.content.map(renderNode)}
      </div>
    );
  }

  // Plain text fallback (for legacy impact descriptions)
  if (typeof doc === "string" && doc.length > 0) {
    return (
      <div className={`max-w-none text-slate-700 leading-[1.75] text-[15px] sm:text-[16px] ${className}`}>
        {doc.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4 last:mb-0">
            {parseFormattedText(para)}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
