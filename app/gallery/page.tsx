import { fetchPortfolioItems } from "@/app/lib/sheet";
import { GalleryTabs } from "@/app/ui/GalleryTabs";
import { Navigation } from "@/app/ui/Navigation";

export const dynamic = "force-static";

export default async function GalleryPage() {
  const items = await fetchPortfolioItems();
  
  return (
    <main className="min-h-screen p-8 sm:p-12 max-w-6xl mx-auto">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
          <p className="text-neutral-600 mt-1">Photography & Videography</p>
        </div>
        <Navigation />
      </header>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
        <GalleryTabs items={items} />
      </section>
    </main>
  );
}


