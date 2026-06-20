import Link from "next/link";
import { createAdminContentAction, updateAdminContentAction } from "@/lib/actions/admin-content";
import { adminContentModules, type AdminContentType, type AdminField } from "@/lib/admin/content";
import { extractPlainTextFromTiptapJson } from "@/lib/rich-text/extract-text";

function dateInputValue(value: unknown) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

function fieldValue(item: any, field: AdminField) {
  if (!item) return "";
  if (field.name === "body") return item.content ? extractPlainTextFromTiptapJson(item.content).replace(/\. /g, ".\n\n") : "";
  if (field.name === "tags" && Array.isArray(item.tags)) return item.tags.join(", ");
  const value = item[field.name];
  if (field.type === "datetime") return dateInputValue(value);
  if (value === null || value === undefined) return "";
  return String(value);
}

function renderField(field: AdminField, item: any) {
  const value = fieldValue(item, field);
  const baseClass = "focus-ring rounded-xl border border-slate-200 px-3 py-2 font-normal text-slate-800";

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

export function ContentForm({ type, item }: { type: AdminContentType; item?: any }) {
  const config = adminContentModules[type];
  const action = item ? updateAdminContentAction : createAdminContentAction;

  return (
    <form action={action} className="max-w-[1100px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <input type="hidden" name="type" value={type} />
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        {config.fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" || field.name === "body" ? "md:col-span-2" : undefined}>
            {renderField(field, item)}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="focus-ring rounded-xl bg-starsim-navy px-5 py-3 text-sm font-bold text-white">
          {item ? "Salvează modificările" : config.newLabel}
        </button>
        <Link href={config.basePath} className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-bold text-starsim-navy">
          Înapoi la lista
        </Link>
        {item && config.publicBasePath && item.slug ? (
          <Link href={`${config.publicBasePath}/${item.slug}`} className="rounded-xl border border-starsim-gold px-5 py-3 text-center text-sm font-bold text-starsim-navy">
            Vezi public
          </Link>
        ) : null}
      </div>
    </form>
  );
}
