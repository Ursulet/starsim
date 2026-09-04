"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  UploadCloud,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import type { AdminMediaOption } from "@/lib/admin/content-data";

export type DonationCardItem = {
  id: string;
  title: string;
  amount?: number | string | null;
  currency?: string;
  badge?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  content?: any;
  buttonText?: string | null;
  buttonUrl?: string | null;
  isActive?: boolean;
};

type DonationCardsEditorProps = {
  initialCards?: any[];
  mediaOptions?: AdminMediaOption[];
};

function normalizeCards(items?: any[]): DonationCardItem[] {
  if (!Array.isArray(items) || items.length === 0) {
    return [
      {
        id: "card-1",
        title: "Materiale pentru ateliere",
        amount: 50,
        currency: "lei",
        badge: "Popular",
        imageUrl: null,
        imageAlt: "Materiale atelier",
        content: "Ajută la pregătirea materialelor educaționale și kiturilor de astronomie pentru elevi.",
        buttonText: "Donează 50 lei",
        buttonUrl: "#cont-bancar",
        isActive: true
      },
      {
        id: "card-2",
        title: "O grupă de copii la observator",
        amount: 150,
        currency: "lei",
        badge: "Impact direct",
        imageUrl: null,
        imageAlt: "Grupă de copii",
        content: "Susține participarea completă a unei grupe la o activitate ghidată Star Sim.",
        buttonText: "Donează 150 lei",
        buttonUrl: "#cont-bancar",
        isActive: true
      },
      {
        id: "card-3",
        title: "O seară de observații astronomice",
        amount: 500,
        currency: "lei",
        badge: "Susținător Star",
        imageUrl: null,
        imageAlt: "Seară astronomică",
        content: "Contribuie la logistica telescoapelor și organizarea unei nopți deschise sub stele.",
        buttonText: "Donează 500 lei",
        buttonUrl: "#cont-bancar",
        isActive: true
      }
    ];
  }

  return items.map((item, idx) => ({
    id: String(item.id || `card_${idx}_${Date.now()}`),
    title: String(item.title || item.label || `Cauză #${idx + 1}`),
    amount: item.amount !== undefined && item.amount !== null ? item.amount : "",
    currency: String(item.currency || "lei"),
    badge: item.badge ? String(item.badge) : "",
    imageUrl: item.imageUrl ? String(item.imageUrl) : null,
    imageAlt: item.imageAlt ? String(item.imageAlt) : "",
    content: item.content !== undefined ? item.content : (item.impact ? String(item.impact) : ""),
    buttonText: String(item.buttonText || (item.amount ? `Donează ${item.amount} ${item.currency || "lei"}` : "Donează")),
    buttonUrl: String(item.buttonUrl || "#cont-bancar"),
    isActive: item.isActive !== false
  }));
}

export function DonationCardsEditor({ initialCards, mediaOptions = [] }: DonationCardsEditorProps) {
  const [cards, setCards] = useState<DonationCardItem[]>(() => normalizeCards(initialCards));
  const [expandedId, setExpandedId] = useState<string | null>(() => cards[0]?.id || null);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  const updateCard = (id: string, updates: Partial<DonationCardItem>) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const addCard = () => {
    const newId = `card_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newCard: DonationCardItem = {
      id: newId,
      title: "Cauză nouă",
      amount: "",
      currency: "lei",
      badge: "",
      imageUrl: null,
      imageAlt: "",
      content: "Descrie impactul acestei donații și cum ajută copiii...",
      buttonText: "Donează acum",
      buttonUrl: "#cont-bancar",
      isActive: true
    };
    setCards((prev) => [...prev, newCard]);
    setExpandedId(newId);
  };

  const removeCard = (id: string) => {
    if (cards.length <= 1) {
      alert("Trebuie să existe cel puțin un card.");
      return;
    }
    if (confirm("Sigur dorești să ștergi acest card?")) {
      setCards((prev) => prev.filter((c) => c.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= cards.length) return;
    setCards((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleFileSelect = (cardId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLocalPreviews((prev) => ({ ...prev, [cardId]: previewUrl }));
    }
  };

  const clearCardImage = (cardId: string) => {
    setLocalPreviews((prev) => {
      const copy = { ...prev };
      delete copy[cardId];
      return copy;
    });
    updateCard(cardId, { imageUrl: null });
  };

  return (
    <div className="space-y-4">
      {/* Hidden input to pass all card configurations to the server action */}
      <input type="hidden" name="cardsJson" value={JSON.stringify(cards)} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-starsim-navy">Carduri donații & Cauze recomandate</h2>
          <p className="text-xs text-slate-500">
            Adaugă carduri personalizate cu sumă, imagine, conținut WYSIWYG și butoane de acțiune.
          </p>
        </div>
        <button
          type="button"
          onClick={addCard}
          className="inline-flex items-center gap-1.5 rounded-xl bg-starsim-gold px-4 py-2 text-xs font-bold text-starsim-navy shadow-sm transition-all hover:bg-amber-400 hover:shadow"
        >
          <Plus className="h-4 w-4" />
          Adaugă card nou
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-2 text-sm font-semibold text-slate-600">Nu există niciun card creat.</p>
          <button
            type="button"
            onClick={addCard}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-starsim-navy px-4 py-2 text-xs font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            Creează primul card
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card, index) => {
            const isExpanded = expandedId === card.id;
            const currentImg = localPreviews[card.id] || card.imageUrl;

            return (
              <div
                key={card.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isExpanded
                    ? "border-starsim-blue/40 bg-white shadow-md ring-1 ring-starsim-blue/10"
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
                }`}
              >
                {/* Header / Summary Bar */}
                <div className="flex items-center gap-3 p-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => moveCard(index, "up")}
                      disabled={index === 0}
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-20"
                      title="Mută mai sus"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCard(index, "down")}
                      disabled={index === cards.length - 1}
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-20"
                      title="Mută mai jos"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    {currentImg ? (
                      <Image
                        src={currentImg}
                        alt={card.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Title & Meta */}
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : card.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-starsim-navy truncate">
                        {card.title || "Card fără titlu"}
                      </span>
                      {card.amount ? (
                        <span className="shrink-0 rounded-md bg-starsim-navy/10 px-2 py-0.5 text-xs font-bold text-starsim-navy">
                          {card.amount} {card.currency || "lei"}
                        </span>
                      ) : null}
                      {card.badge ? (
                        <span className="shrink-0 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                          {card.badge}
                        </span>
                      ) : null}
                      {!card.isActive ? (
                        <span className="shrink-0 rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                          Inactiv
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Card #{index + 1} &bull; Click pentru {isExpanded ? "restrângere" : "editare detaliată"}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateCard(card.id, { isActive: !card.isActive })}
                      className={`rounded-lg p-2 transition-colors ${
                        card.isActive ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-200"
                      }`}
                      title={card.isActive ? "Card activ (vizibil public)" : "Card inactiv (ascuns)"}
                    >
                      {card.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeCard(card.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Șterge cardul"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : card.id)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-200"
                      title={isExpanded ? "Restrânge" : "Extinde"}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Card Edit Form - Kept in DOM so file inputs & states are preserved */}
                <div className={isExpanded ? "border-t border-slate-100 bg-white p-5 space-y-5" : "hidden"}>
                    {/* Basic Info */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                          Titlu Cauză / Donatie
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateCard(card.id, { title: e.target.value })}
                            placeholder="ex: Materiale pentru ateliere"
                            className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                          Badge / Etichetă (opțional)
                          <input
                            type="text"
                            value={card.badge || ""}
                            onChange={(e) => updateCard(card.id, { badge: e.target.value })}
                            placeholder="ex: Popular, Urgent"
                            className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                          Suma recomandată (cifră)
                          <input
                            type="number"
                            value={card.amount ?? ""}
                            onChange={(e) => updateCard(card.id, { amount: e.target.value ? Number(e.target.value) : "" })}
                            placeholder="ex: 50"
                            className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                          Monedă / Periodicitate
                          <input
                            type="text"
                            value={card.currency || "lei"}
                            onChange={(e) => updateCard(card.id, { currency: e.target.value })}
                            placeholder="lei sau lei/lună"
                            className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="grid gap-1.5 text-xs font-semibold text-starsim-navy">
                          Text Buton Acțiune
                          <input
                            type="text"
                            value={card.buttonText || ""}
                            onChange={(e) => updateCard(card.id, { buttonText: e.target.value })}
                            placeholder="ex: Donează acum"
                            className="focus-ring rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Image Attachment Section */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <p className="text-xs font-bold text-starsim-navy">Poză Card Donație</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Poți încărca o imagine de pe calculator, poți alege una existentă din galerie sau poți adăuga un URL.
                      </p>

                      <div className="mt-3 flex flex-col sm:flex-row items-start gap-4">
                        {/* Preview Box */}
                        <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                          {currentImg ? (
                            <>
                              <Image
                                src={currentImg}
                                alt={card.title}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => clearCardImage(card.id)}
                                className="absolute top-1.5 right-1.5 rounded-full bg-red-600 p-1 text-white shadow-md hover:bg-red-700 transition-colors"
                                title="Elimină imaginea"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </>
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-slate-400">
                              <ImageIcon className="h-6 w-6" />
                              <span className="mt-1 text-[11px]">Fără imagine</span>
                            </div>
                          )}
                        </div>

                        {/* Upload & Selection Controls */}
                        <div className="flex-1 space-y-3 w-full">
                          {/* File input for direct upload */}
                          <div>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-starsim-navy px-3.5 py-2 text-xs font-bold text-white hover:bg-starsim-blue transition-colors">
                              <UploadCloud className="h-4 w-4" />
                              Încarcă imagine din computer
                              <input
                                type="file"
                                name={`card_file_${card.id}`}
                                accept="image/*"
                                onChange={(e) => handleFileSelect(card.id, e)}
                                className="hidden"
                              />
                            </label>
                            {localPreviews[card.id] && (
                              <span className="ml-2 text-xs font-semibold text-emerald-600">
                                ✓ Fișier nou pregătit pentru salvare
                              </span>
                            )}
                          </div>

                          {/* Media Library Picker if media options exist */}
                          {mediaOptions.length > 0 && (
                            <div>
                              <label className="grid gap-1 text-xs font-semibold text-slate-700">
                                Sau alege din galeria de imagini existente:
                                <select
                                  value={card.imageUrl || ""}
                                  onChange={(e) => {
                                    updateCard(card.id, { imageUrl: e.target.value || null });
                                    setLocalPreviews((prev) => {
                                      const copy = { ...prev };
                                      delete copy[card.id];
                                      return copy;
                                    });
                                  }}
                                  className="focus-ring rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800"
                                >
                                  <option value="">-- Alege din fișierele media --</option>
                                  {mediaOptions.map((opt) => (
                                    <option key={opt.id} value={opt.url}>
                                      {opt.alt || opt.filename}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                          )}

                          {/* Direct URL input */}
                          <div>
                            <input
                              type="text"
                              value={card.imageUrl || ""}
                              onChange={(e) => updateCard(card.id, { imageUrl: e.target.value || null })}
                              placeholder="Sau lipește link direct către imagine (https://...)"
                              className="focus-ring w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WYSIWYG Description Editor */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="text-xs font-bold text-starsim-navy">
                          Descriere & Impact Donație (Editor WYSIWYG)
                        </label>
                        <span className="text-[11px] text-slate-400">
                          Formatare avansată: bold, italic, liste, link-uri
                        </span>
                      </div>
                      <RichTextEditor
                        value={card.content}
                        onChange={(val) => updateCard(card.id, { content: val })}
                        placeholder="Explică detaliat ce realizăm cu această sumă, cui se adresează și ce materiale se achiziționează..."
                        minHeight="min-h-[120px]"
                      />
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}
