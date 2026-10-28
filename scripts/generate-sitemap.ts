// Genere public/sitemap.xml automatiquement avant chaque `vite dev` et `vite build`.
// Source : routes permanentes definies dans le code (publicContent.ts).

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

const BASE_URL = "https://agencelgm.com";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

type Entry = {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
};


const staticEntries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/systeme-acquisition", changefreq: "monthly", priority: "0.9" },
  { path: "/a-propos", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/logo", changefreq: "monthly", priority: "0.85" },
  { path: "/services/site-internet", changefreq: "monthly", priority: "0.85" },
  { path: "/cabinets-comptables", changefreq: "monthly", priority: "0.85" },
  { path: "/blog", changefreq: "weekly", priority: "0.75" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

const serviceEntries: Entry[] = publicServices.map((s) => ({
  path: `/services/${s.slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const zoneEntries: Entry[] = serviceAreaPages.map((z) => ({
  path: `/zones/${z.slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

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
  // Routes permanentes uniquement : les articles sont lus depuis la base a l'execution.
  const all = [...staticEntries, ...serviceEntries, ...zoneEntries];
  writeFileSync(resolve("public/sitemap.xml"), buildXml(all));
  console.log(`[sitemap] ${all.length} entries written to public/sitemap.xml`);
})();
