"use client";
export function RichTextEditor({ value, onChange }: { value?: string; onChange?: (value: string) => void }) {
  return <textarea value={value} onChange={(e) => onChange?.(e.target.value)} className="focus-ring min-h-64 w-full rounded-xl border border-slate-200 p-3" placeholder="Editor WYSIWYG/Tiptap JSON" />;
}
