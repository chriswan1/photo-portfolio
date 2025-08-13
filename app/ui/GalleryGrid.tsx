"use client";

import React, { useEffect, useState } from "react";
import { PortfolioItem, toDrivePreviewEmbedUrl, toDriveViewUrl } from "@/app/lib/sheet";

type Props = {
  items: PortfolioItem[];
};

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return "";
  }
}

export function GalleryGrid({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="text-sm text-muted">No items yet. Add rows to your Google Sheet and refresh.</div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card
            key={item.id}
            item={item}
            onOpen={() => setActiveIndex(idx)}
            onHover={() => setHoverIndex(idx)}
            onLeave={() => setHoverIndex((i) => (i === idx ? null : i))}
            isHovered={hoverIndex === idx}
            isOtherShrunk={hoverIndex !== null && hoverIndex !== idx}
          />
        ))}
      </div>
      <Lightbox
        items={items}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
        onNext={() => setActiveIndex((i) => (i === null ? i : (i + 1) % items.length))}
      />
    </>
  );
}

function Card({
  item,
  onOpen,
  onHover,
  onLeave,
  isHovered,
  isOtherShrunk,
}: {
  item: PortfolioItem;
  onOpen: () => void;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
  isOtherShrunk: boolean;
}) {
  const isVideo = item.type === "video";
  const isGooglePhotos = /photos\.google\.com|photos\.app\.goo\.gl/.test(item.url);
  const isDrive = /drive\.google\.com/.test(item.url);

  return (
    <article
      className={`group border border-border bg-white overflow-hidden rounded-none transition-all duration-300 ${
        isHovered ? 'scale-105 z-10' : 'scale-100'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="aspect-video bg-neutral-100 overflow-hidden relative">
        <div className="w-full h-full transition-all duration-200 ease-out">
          {isVideo && isDrive ? (
            <iframe
              className="w-full h-full"
              src={toDrivePreviewEmbedUrl(item.url)}
              allow="autoplay; fullscreen"
            />
          ) : isDrive ? (
            <button type="button" onClick={onOpen} className="block w-full h-full text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnailUrl || toDriveViewUrl(item.url)}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ) : (
            <button type="button" onClick={onOpen} className="flex items-center justify-center w-full h-full">
              {item.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="text-sm text-neutral-600">{isGooglePhotos ? "View on Google Photos" : "Open link"}</div>
              )}
            </button>
          )}
        </div>
        {isVideo && (
          <button
            type="button"
            aria-label="Open preview"
            onClick={onOpen}
            className="absolute inset-0"
          />
        )}
      </div>
      <div className={`p-3 ${isHovered ? 'block' : 'hidden'} bg-white/90 backdrop-blur-sm rounded-none shadow-sm transition-shadow absolute bottom-0 left-0 right-0 z-20`}>
        <h3 className="font-medium text-sm truncate" title={item.title}>{item.title}</h3>
        {item.date && (
          <p className="text-xs text-muted mt-1">{formatDate(item.date)}</p>
        )}
        {item.description ? (
          <p className="text-xs text-muted mt-1 line-clamp-2">{item.description}</p>
        ) : null}
      </div>
    </article>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    if (index !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKey);
        document.body.style.overflow = "";
      };
    }
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;

  const item = items[index];
  const isVideo = item.type === "video";
  const isDrive = /drive\.google\.com/.test(item.url);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-[80vw] h-[80vh] bg-white rounded-none shadow-lg relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute top-2 right-2 text-black/80 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
          {isVideo && isDrive ? (
            <iframe 
              className="w-full h-full" 
              src={`${toDrivePreviewEmbedUrl(item.url)}?autoplay=1&mute=0`} 
              allow="autoplay; fullscreen; encrypted-media" 
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnailUrl || toDriveViewUrl(item.url) || item.url}
              alt={item.title}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
        <button
          type="button"
          aria-label="Previous"
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-3 py-2"
        >
          ›
        </button>
      </div>
    </div>
  );
}


