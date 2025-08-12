"use client";

import { useState } from "react";
import { PortfolioItem } from "@/app/lib/sheet";
import { GalleryGrid } from "./GalleryGrid";

type TabType = "all" | "photos" | "videos";

interface GalleryTabsProps {
  items: PortfolioItem[];
}

export function GalleryTabs({ items }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredItems = (() => {
    switch (activeTab) {
      case "photos":
        return items.filter((i) => i.type === "photo");
      case "videos":
        return items.filter((i) => i.type === "video");
      default:
        return items;
    }
  })();

  return (
    <div>
      <div className="flex gap-6 mb-6">
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
      <GalleryGrid items={filteredItems} />
    </div>
  );
}
