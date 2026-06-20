"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

type GalleryImageItem = {
  id: string;
  media: {
    url: string;
    alt: string | null;
  };
  caption?: string | null;
};

type GalleryViewProps = {
  images: GalleryImageItem[];
  albumTitle: string;
};

export function GalleryView({ images, albumTitle }: GalleryViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
    }
  }, [activeIndex, images.length]);

  const showPrev = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
    }
  }, [activeIndex, images.length]);

  // Key navigation listeners
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  return (
    <>
      {/* Grid of Images */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group premium-card overflow-hidden cursor-pointer relative transition-all duration-300 hover:-translate-y-1 hover:shadow-premium bg-white border border-slate-100"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
              <Image
                src={image.media.url}
                alt={image.media.alt || `${albumTitle} ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-starsim-navy/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <div className="rounded-full bg-white/20 backdrop-blur-md p-3 text-white border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                  <Maximize2 className="h-5 w-5" />
                </div>
              </div>
            </div>
            {image.caption ? (
              <div className="p-4 border-t border-slate-50 bg-white">
                <p className="text-sm font-medium text-starsim-navy line-clamp-2 leading-relaxed">
                  {image.caption}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 text-white">
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
                {albumTitle}
              </h4>
              <p className="text-xs text-slate-500">
                Imaginea {activeIndex + 1} din {images.length}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition cursor-pointer"
              aria-label="Închide"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Area */}
          <div className="relative flex flex-1 items-center justify-center px-4">
            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 z-10 rounded-full bg-black/55 p-3 text-white hover:bg-black/80 transition cursor-pointer border border-white/10"
              aria-label="Imaginea anterioară"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image container */}
            <div className="relative max-h-[75vh] max-w-[85vw] w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full max-h-[70vh]">
                <Image
                  src={images[activeIndex].media.url}
                  alt={images[activeIndex].media.alt || `${albumTitle} ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 z-10 rounded-full bg-black/55 p-3 text-white hover:bg-black/80 transition cursor-pointer border border-white/10"
              aria-label="Imaginea următoare"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom Bar / Caption */}
          <div className="px-6 py-5 text-center text-white bg-gradient-to-t from-black/80 to-transparent">
            {images[activeIndex].caption ? (
              <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-slate-200">
                {images[activeIndex].caption}
              </p>
            ) : (
              <p className="text-xs text-slate-500 italic">Nu există descriere pentru această imagine.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
