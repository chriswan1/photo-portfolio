import { fetchPortfolioItems } from "@/app/lib/sheet";
import { GalleryGrid } from "@/app/ui/GalleryGrid";
import { Navigation } from "@/app/ui/Navigation";

export const dynamic = "force-static";

export default async function Home() {
  const featuredItems = (await fetchPortfolioItems()).filter((i) => i.featured === true);
  
  return (
    <main className="min-h-screen p-8 sm:p-12 max-w-6xl mx-auto">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
          <p className="text-neutral-600 mt-1">Photography & Videography</p>
        </div>
        <Navigation />
      </header>
      
      {featuredItems.length > 0 ? (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Work</h2>
          <GalleryGrid items={featuredItems} />
        </section>
      ) : (
        <section className="rounded-lg border border-neutral-200 p-6 bg-white">
          <h2 className="text-xl font-medium">Getting started</h2>
          <ol className="list-decimal list-inside text-neutral-700 mt-3 space-y-2">
            <li>Create a Google Sheet with the columns: <span className="font-mono">id,type,title,description,url,thumbnailUrl,tags,date,featured</span>.</li>
            <li>File → Share → Publish to web → select the sheet as CSV. Copy the CSV URL.</li>
            <li>Add the URL to the <span className="font-mono">SHEET_CSV_URL</span> constant in <span className="font-mono">app/lib/sheet.ts</span>.</li>
            <li>Run the dev server: <span className="font-mono">npm run dev</span>.</li>
          </ol>
          <p className="text-sm text-neutral-500 mt-4">Featured images will appear here once the sheet URL is set and items are marked as featured.</p>
        </section>
      )}
    </main>
  );
}
