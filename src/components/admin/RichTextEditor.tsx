"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading3,
  List,
  ListOrdered,
  Link2,
  Unlink,
  Undo2,
  Redo2,
  RemoveFormatting
} from "lucide-react";
import { useEffect, useRef } from "react";

export type RichTextEditorProps = {
  value?: unknown;
  onChange?: (value: any) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
};

function parseInitialContent(val: unknown) {
  if (!val) return "";
  if (typeof val === "object") return val;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }
  return "";
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Scrie conținutul aici...",
  minHeight = "min-h-[140px]",
  className = ""
}: RichTextEditorProps) {
  const initial = parseInitialContent(value);
  const isInternalUpdateRef = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-starsim-gold underline font-medium",
          target: "_blank",
          rel: "noopener noreferrer"
        }
      })
    ],
    content: initial,
    editorProps: {
      attributes: {
        class: `prose prose-sm prose-slate max-w-none focus:outline-none p-3 ${minHeight} text-slate-800 leading-relaxed font-normal`
      }
    },
    onUpdate: ({ editor }) => {
      isInternalUpdateRef.current = true;
      const json = editor.getJSON();
      onChange?.(json);
    }
  });

  // Keep editor synchronized if external value changes significantly
  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }
    const currentJson = JSON.stringify(editor.getJSON());
    const parsed = parseInitialContent(value);
    const incomingJson = typeof parsed === "object" ? JSON.stringify(parsed) : parsed;
    
    if (incomingJson && incomingJson !== currentJson) {
      editor.commands.setContent(parsed, false);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className={`rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-400 ${minHeight}`}>
        Se încarcă editorul...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Introdu adresa link-ului (URL):", previousUrl || "https://");

    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const btnClass = (isActive: boolean) =>
    `p-1.5 rounded-lg text-xs font-medium transition-colors ${
      isActive
        ? "bg-starsim-navy text-white shadow-xs"
        : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
    }`;

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white transition-all focus-within:border-starsim-blue/50 focus-within:ring-2 focus-within:ring-starsim-blue/10 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 px-2 py-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Îngroșat (Bold)"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Cursiv (Italic)"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>

        <span className="my-0.5 h-4 w-px bg-slate-200" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive("heading", { level: 3 }))}
          title="Subtitlu (H3)"
        >
          <Heading3 className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Listă cu buline"
        >
          <List className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title="Listă numerotată"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </button>

        <span className="my-0.5 h-4 w-px bg-slate-200" />

        <button
          type="button"
          onClick={setLink}
          className={btnClass(editor.isActive("link"))}
          title="Adaugă link"
        >
          <Link2 className="h-3.5 w-3.5" />
        </button>

        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
            title="Elimină link"
          >
            <Unlink className="h-3.5 w-3.5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="p-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-200"
          title="Curăță formatarea"
        >
          <RemoveFormatting className="h-3.5 w-3.5" />
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Anulează (Undo)"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Refă (Redo)"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
