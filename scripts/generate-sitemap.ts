// Genere public/sitemap.xml automatiquement avant chaque `vite dev` et `vite build`.
// Source : code-defined routes (publicContent.ts) + articles publies dans Supabase.

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { publicServices, serviceAreaPages } from "../src/data/publicContent";

// Charge .env (Vite expose VITE_*, mais ce script tourne hors de Vite)
const envPath = resolve(".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const BASE_URL = "https://lgm.marketing";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

type Entry = {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
};

const today = new Date().toISOString().slice(0, 10);

const staticEntries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/a-propos", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/services", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/blog", changefreq: "weekly", priority: "0.75", lastmod: today },
  { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: today },
];

const serviceEntries: Entry[] = publicServices.map((s) => ({
  path: `/services/${s.slug}`,
  changefreq: "monthly",
  priority: "0.8",
  lastmod: today,
}));

const zoneEntries: Entry[] = serviceAreaPages.map((z) => ({
  path: `/zones/${z.slug}`,
  changefreq: "monthly",
  priority: "0.8",
  lastmod: today,
}));

async function fetchBlogEntries(): Promise<Entry[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("[sitemap] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY absents — articles non inclus.");
    return [];
  }
  try {
    const url = `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=slug,published_at,updated_at`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) {
      console.warn(`[sitemap] Supabase fetch ${res.status}`);
      return [];
    }
    const rows = (await res.json()) as { slug: string; published_at?: string; updated_at?: string }[];
    return rows.map((row) => ({
      path: `/blog/${row.slug}`,
      changefreq: "weekly" as const,
      priority: "0.7",
      lastmod: (row.updated_at ?? row.published_at ?? today).slice(0, 10),
    }));
  } catch (err) {
    console.warn("[sitemap] fetch error", err);
    return [];
  }
}

function buildXml(entries: Entry[]) {
  const urls = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

(async () => {
  const blog = await fetchBlogEntries();
  const all = [...staticEntries, ...serviceEntries, ...zoneEntries, ...blog];
  writeFileSync(resolve("public/sitemap.xml"), buildXml(all));
  console.log(`[sitemap] ${all.length} entries written to public/sitemap.xml`);
})();
