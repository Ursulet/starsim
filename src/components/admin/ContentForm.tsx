"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { AlertCircle, ArrowLeft, ExternalLink, Loader2, Save, UploadCloud } from "lucide-react";
import {
  createAdminContentAction,
  updateAdminContentAction,
  type ActionState
} from "@/lib/actions/admin-content";
import { adminContentModules, type AdminContentType, type AdminField } from "@/lib/admin/content";
import type { AdminMediaOption } from "@/lib/admin/content-data";
import { extractPlainTextFromTiptapJson } from "@/lib/rich-text/extract-text";
import { DeleteConfirmButton } from "./DeleteConfirmButton";

function dateInputValue(value: unknown) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

function fieldValue(item: any, field: AdminField) {
  if (!item) return "";
  if (field.name === "body")
    return item.content ? extractPlainTextFromTiptapJson(item.content).replace(/\. /g, ".\n\n") : "";
  if (field.name === "tags" && Array.isArray(item.tags)) return item.tags.join(", ");
  const value = item[field.name];
  if (field.type === "datetime") return dateInputValue(value);
  if (value === null || value === undefined) return "";
  return String(value);
}

function relatedMedia(item: any, fieldName: string): AdminMediaOption | null {
  const relationName = {
    heroImageId: "heroImage",
    coverImageId: "coverImage",
    logoId: "logo",
    imageId: "image"
  }[fieldName];

  return relationName && item?.[relationName] ? item[relationName] : null;
}

function formatBytes(size?: number | null) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function MediaPreview({ media, label }: { media?: AdminMediaOption | null; label: string }) {
  if (!media) {
    return (
      <div className="grid aspect-[5/3] min-h-32 place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm font-medium text-slate-400">
        Fără imagine
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <Image src={media.url} alt={media.alt || label} width={640} height={384} unoptimized className="h-40 w-full object-cover" />
      <div className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
        <p className="truncate font-semibold text-starsim-navy">{media.filename}</p>
        <p>{media.mimeType}</p>
      </div>
    </div>
  );
}

function renderMediaField(field: AdminField, item: any, mediaOptions: AdminMediaOption[]) {
  const selectedId = fieldValue(item, field);
  const preview = relatedMedia(item, field.name) || mediaOptions.find((media) => media.id === selectedId) || null;

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-starsim-navy">{field.label}</p>
        {field.help ? <p className="mt-1 text-xs text-slate-500">{field.help}</p> : null}
      </div>
      <MediaPreview media={preview} label={field.label} />
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <select
          name={field.name}
          defaultValue={selectedId}
          className="focus-ring min-w-0 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800"
        >
          <option value="">Fără imagine selectată</option>
          {mediaOptions.map((media) => (
            <option key={media.id} value={media.id}>
              {media.alt || media.filename}
            </option>
          ))}
        </select>
        <label className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-starsim-navy px-4 py-2 text-sm font-bold text-white hover:bg-starsim-blue">
          <UploadCloud className="h-4 w-4" />
          Încarcă
          <input name={`${field.name}Upload`} type="file" accept={field.accept || "image/*"} className="sr-only" />
        </label>
      </div>
      <input
        name={`${field.name}Alt`}
        defaultValue={preview?.alt || item?.title || item?.name || ""}
        placeholder="Text alternativ pentru imagine"
        className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
      />
    </div>
  );
}

function renderFileField(field: AdminField, item: any) {
  const isEditing = Boolean(item?.id);

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-starsim-navy">{field.label}</p>
        {item?.url ? (
          <p className="mt-1 text-xs text-slate-500">
            {item.originalName || item.filename} {formatBytes(item.size) ? `/ ${formatBytes(item.size)}` : ""}
          </p>
        ) : null}
      </div>
      {item?.type === "IMAGE" && item.url ? (
        <Image
          src={item.url}
          alt={item.alt || item.originalName || item.filename}
          width={760}
          height={420}
          unoptimized
          className="h-48 w-full rounded-xl border border-slate-200 object-cover"
        />
      ) : item?.url ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{item.mimeType}</div>
      ) : null}
      <label className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-starsim-navy px-4 py-3 text-sm font-bold text-white hover:bg-starsim-blue">
        <UploadCloud className="h-4 w-4" />
        {isEditing ? "Înlocuiește fișierul" : "Alege fișier"}
        <input name={field.name} type="file" accept={field.accept} required={field.required && !isEditing} className="sr-only" />
      </label>
    </div>
  );
}

function renderField(field: AdminField, item: any, mediaOptions: AdminMediaOption[]) {
  const value = fieldValue(item, field);
  const baseClass = "focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal text-slate-800";

  if (field.type === "media") return renderMediaField(field, item, mediaOptions);
  if (field.type === "file") return renderFileField(field, item);

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-starsim-navy">
        <input name={field.name} type="checkbox" defaultChecked={Boolean(item?.[field.name])} className="h-4 w-4 rounded border-slate-300" />
        {field.label}
      </label>
    );
  }

  return (
    <label className="grid gap-2 text-sm font-semibold text-starsim-navy">
      {field.label}
      {field.type === "textarea" ? (
        <textarea name={field.name} defaultValue={value} required={field.required} rows={field.rows || 4} placeholder={field.placeholder} className={`${baseClass} leading-6`} />
      ) : field.type === "select" ? (
        <select name={field.name} defaultValue={value || field.options?.[0]?.value} className={baseClass}>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          type={field.type === "datetime" ? "datetime-local" : field.type}
          defaultValue={field.type === "password" ? "" : value}
          required={field.required && !item}
          placeholder={field.placeholder}
          className={baseClass}
        />
      )}
      {field.help ? <span className="text-xs font-normal text-slate-500">{field.help}</span> : null}
    </label>
  );
}

export function ContentForm({
  type,
  item,
  mediaOptions
}: {
  type: AdminContentType;
  item?: any;
  mediaOptions: AdminMediaOption[];
}) {
  const config = adminContentModules[type];
  const baseAction = item ? updateAdminContentAction : createAdminContentAction;
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(baseAction, null);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="max-w-[1100px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <input type="hidden" name="type" value={type} />
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      {/* Error banner */}
      {state?.error ? (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        {config.fields.map((field) => (
          <div
            key={field.name}
            className={
              field.type === "textarea" || field.name === "body" || field.type === "media" || field.type === "file"
                ? "md:col-span-2"
                : undefined
            }
          >
            {renderField(field, item, mediaOptions)}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap">
        <button
          disabled={isPending}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white hover:bg-starsim-blue disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isPending ? "Se salvează..." : item ? "Salvează modificările" : config.newLabel}
        </button>
        <Link
          href={config.basePath}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Înapoi la listă
        </Link>
        {item && config.publicBasePath && item.slug ? (
          <Link
            href={`${config.publicBasePath}/${item.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-starsim-gold px-5 py-3 text-center text-sm font-bold text-starsim-navy"
          >
            <ExternalLink className="h-4 w-4" />
            Vezi public
          </Link>
        ) : null}
        {item ? <DeleteConfirmButton type={type} id={item.id} className="sm:ml-auto" inForm /> : null}
      </div>
    </form>
  );
}
