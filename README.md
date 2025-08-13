Portfolio site using Next.js (App Router) + Tailwind.

## Getting Started

1) Create a Google Sheet with columns: `id,type,title,description,url,thumbnailUrl,tags,date,featured`.
2) File → Share → Publish to web → select the sheet as CSV. Copy that URL.
3) Create `.env.local` and set:

```
NEXT_PUBLIC_SHEET_CSV_URL=YOUR_PUBLISHED_SHEET_CSV_URL
```

4) Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Navigation:
- `/gallery` All
- `/photos` Photos only
- `/videos` Videos only
- `/featured` Featured (rows with `featured = TRUE`)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
