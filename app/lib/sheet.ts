import Papa from "papaparse";

export type PortfolioItem = {
  id: string;
  type: "photo" | "video";
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  tags?: string;
  date?: string;
  featured?: boolean;
};

// Replace this with your published Google Sheet CSV URL
export const SHEET_CSV_URL = process.env.NEXT_PUBLIC_SHEET_CSV_URL || "";

export function extractDriveFileId(inputUrl: string): string | null {
  // Matches: https://drive.google.com/file/d/FILE_ID/... or uc?id=FILE_ID
  const filePathMatch = inputUrl.match(/\/file\/d\/([^/]+)/);
  if (filePathMatch) return filePathMatch[1];
  const ucMatch = inputUrl.match(/[?&]id=([^&]+)/);
  if (ucMatch) return ucMatch[1];
  return null;
}

export function toDriveViewUrl(inputUrl: string): string {
  const id = extractDriveFileId(inputUrl);
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : inputUrl;
}

export function toDriveThumbnailUrl(inputUrl: string, width: number = 1200): string {
  const id = extractDriveFileId(inputUrl);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${width}` : inputUrl;
}

export function toDrivePreviewEmbedUrl(inputUrl: string): string {
  const id = extractDriveFileId(inputUrl);
  return id ? `https://drive.google.com/file/d/${id}/preview` : inputUrl;
}

export function isGooglePhotosUrl(url: string): boolean {
  return /photos\.google\.com|photos\.app\.goo\.gl/.test(url);
}

export function parseBooleanLike(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "").trim().toLowerCase();
  return ["true", "1", "yes", "y"].includes(normalized);
}

async function resolveGooglePhotosThumbnail(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const html = await res.text();
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i)
      || html.match(/<meta[^>]+name=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (ogMatch && ogMatch[1]) {
      return ogMatch[1];
    }
  } catch {
    // ignore
  }
  return null;
}

export async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
  if (!SHEET_CSV_URL) return [];
  const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } });
  const csv = await response.text();
  const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = (parsed.data as any[]).filter(Boolean);

  const items: PortfolioItem[] = await Promise.all(
    rows.map(async (row) => {
      const item: PortfolioItem = {
        id: String(row.id || "").trim(),
        type: String(row.type || "photo").trim() as "photo" | "video",
        title: String(row.title || "Untitled").trim(),
        description: String(row.description || "").trim() || undefined,
        url: String(row.url || "").trim(),
        thumbnailUrl: String(row.thumbnailUrl || "").trim() || undefined,
        tags: String(row.tags || "").trim() || undefined,
        date: String(row.date || "").trim() || undefined,
        featured: parseBooleanLike(row.featured),
      };

      if (!item.thumbnailUrl) {
        if (item.url.includes("drive.google.com")) {
          item.thumbnailUrl = toDriveThumbnailUrl(item.url);
        } else if (isGooglePhotosUrl(item.url)) {
          item.thumbnailUrl = (await resolveGooglePhotosThumbnail(item.url)) || undefined;
        }
      }

      return item;
    })
  );

  return items;
}

export function filterItems(items: PortfolioItem[], predicate: (i: PortfolioItem) => boolean) {
  return items.filter(predicate);
}


