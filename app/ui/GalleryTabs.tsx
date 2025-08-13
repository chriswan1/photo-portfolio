"use client";

import { useState, useMemo } from "react";
import { PortfolioItem } from "@/app/lib/sheet";
import { GalleryGrid } from "./GalleryGrid";

type TabType = "all" | "photos" | "videos";
type SortType = "date-asc" | "date-desc" | "recent" | "alphabetical";

interface GalleryTabsProps {
  items: PortfolioItem[];
}

export function GalleryTabs({ items }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [sortBy, setSortBy] = useState<SortType>("recent");

  const filteredAndSortedItems = useMemo(() => {
    // First filter by tab
    const filtered = (() => {
      switch (activeTab) {
        case "photos":
          return items.filter((i) => i.type === "photo");
        case "videos":
          return items.filter((i) => i.type === "video");
        default:
          return items;
      }
    })();

    // Then sort
    switch (sortBy) {
      case "date-asc":
        return [...filtered].sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateA - dateB;
        });
      case "date-desc":
        return [...filtered].sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
      case "recent":
        // Sort by ID (assuming higher ID = more recent upload)
        return [...filtered].sort((a, b) => {
          const idA = parseInt(a.id) || 0;
          const idB = parseInt(b.id) || 0;
          return idB - idA;
        });
      case "alphabetical":
        return [...filtered].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      default:
        return filtered;
    }
  }, [items, activeTab, sortBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tab buttons */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "text-foreground underline underline-offset-4"
                : "text-muted hover:text-foreground"
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "photos"
                ? "text-foreground underline underline-offset-4"
                : "text-muted hover:text-foreground"
            }`}
          >
            Photos ({items.filter((i) => i.type === "photo").length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "videos"
                ? "text-foreground underline underline-offset-4"
                : "text-muted hover:text-foreground"
            }`}
          >
            Videos ({items.filter((i) => i.type === "video").length})
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm text-muted">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="text-sm border border-border rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      <GalleryGrid items={filteredAndSortedItems} />
    </div>
  );
}
