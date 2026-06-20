import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { MediaType } from "@prisma/client";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const documentMimeTypes = new Set(["application/pdf"]);
const videoMimeTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov"
};

export function getUploadRoot() {
  return path.resolve(
    process.env.UPLOAD_DIR ||
      path.join(process.cwd(), process.env.NODE_ENV === "production" ? "uploads" : "public/uploads")
  );
}

export function publicUploadUrl(storageKey: string) {
  return `/uploads/${storageKey.replace(/\\/g, "/")}`;
}

export function uploadContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  const entry = Object.entries(extensionByMimeType).find(([, value]) => value === extension);
  return entry?.[0] || "application/octet-stream";
}

export async function readStoredUpload(storageKey: string) {
  const root = getUploadRoot();
  const normalizedKey = storageKey.replace(/\\/g, "/").replace(/^\/+/, "");
  const filePath = path.resolve(root, normalizedKey);

  if (!filePath.startsWith(root)) throw new Error("Invalid upload path.");

  return {
    bytes: await readFile(filePath),
    contentType: uploadContentType(filePath)
  };
}

function sanitizeSegment(value: string, fallback: string) {
  const cleaned = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  return cleaned || fallback;
}

function mediaTypeForMime(mimeType: string): MediaType {
  if (imageMimeTypes.has(mimeType)) return "IMAGE";
  if (videoMimeTypes.has(mimeType)) return "VIDEO";
  if (documentMimeTypes.has(mimeType)) return "DOCUMENT";
  throw new Error("Tipul fișierului nu este acceptat.");
}

function assertUploadAllowed(file: File) {
  if (!file.size) throw new Error("Fișierul încărcat este gol.");
  if (file.size > env.MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`Fișierul depășește limita de ${env.MAX_UPLOAD_MB} MB.`);
  }

  mediaTypeForMime(file.type);
}

export function uploadedFileFromForm(formData: FormData, key: string) {
  const value = formData.get(key);
  if (value instanceof File && value.size > 0) return value;
  return null;
}

export async function saveUploadedFile(file: File, folder = "media") {
  assertUploadAllowed(file);

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const safeFolder = sanitizeSegment(folder, "media");
  const originalName = file.name || "upload";
  const extension = extensionByMimeType[file.type] || path.extname(originalName).toLowerCase() || ".bin";
  const baseName = sanitizeSegment(path.basename(originalName, path.extname(originalName)), "fisier");
  const filename = `${baseName}-${randomUUID().slice(0, 10)}${extension}`;
  const storageKey = `${safeFolder}/${year}/${month}/${filename}`;
  const targetDir = path.join(getUploadRoot(), safeFolder, year, month);

  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, filename), Buffer.from(await file.arrayBuffer()));

  return {
    type: mediaTypeForMime(file.type),
    url: publicUploadUrl(storageKey),
    storageKey,
    filename,
    originalName,
    mimeType: file.type,
    size: file.size
  };
}

export async function createMediaAssetFromUpload({
  file,
  folder,
  uploadedById,
  alt,
  caption,
  credit
}: {
  file: File;
  folder?: string | null;
  uploadedById?: string | null;
  alt?: string | null;
  caption?: string | null;
  credit?: string | null;
}) {
  const stored = await saveUploadedFile(file, folder || "media");

  return prisma.mediaAsset.create({
    data: {
      ...stored,
      uploadedById,
      alt: alt || null,
      caption: caption || null,
      credit: credit || null,
      folder: folder || null
    }
  });
}

export async function deleteStoredUpload(storageKey?: string | null) {
  if (!storageKey) return;

  const root = getUploadRoot();
  const filePath = path.resolve(root, storageKey.replace(/\\/g, "/").replace(/^\/+/, ""));
  if (!filePath.startsWith(root)) return;

  try {
    await unlink(filePath);
  } catch {}
}
