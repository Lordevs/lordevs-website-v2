import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { createClient } from "../src/lib/supabase/client";

const supabase = createClient();

const BASE_URL = import.meta.env.VITE_FRONTEND_URL || "https://lordevs.com";
const APP_URL = import.meta.env.VITE_APP_URL || "https://app.lordevs.com";

// Static routes
const staticRoutes = [
  { url: BASE_URL, changefreq: "daily", priority: 1.0 },
  { url: `${BASE_URL}/`, changefreq: "daily", priority: 0.9 },
  { url: `${BASE_URL}/ranking`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/contact`, changefreq: "monthly", priority: 0.7 },
  { url: APP_URL, changefreq: "monthly", priority: 0.8 },
  { url: `${APP_URL}/signup`, changefreq: "monthly", priority: 0.8 },
];

// Dynamic routes from Supabase
async function getCompetitionRoutes() {
  try {
    const { data, error } = await supabase
      .from("competitions") // Your table name
      .select("slug,end_date")
      .order("end_date", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error:", error);
      return [];
    }

    return (
      data?.map((competition: any) => ({
        url: `${BASE_URL}/competition/${competition.slug}`,
        lastmod: competition.end_date
          ? new Date(competition.end_date).toISOString()
          : new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      })) || []
    );
  } catch (err) {
    console.warn("Failed to fetch competitions:", err);
    return [];
  }
}

// Generate sitemap
async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  const dynamicRoutes = await getCompetitionRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  allRoutes.forEach((route) => sitemap.write(route));
  sitemap.end();

  const xml = await streamToPromise(sitemap);
  writeFileSync("dist/sitemap.xml", xml.toString());
  console.log("✅ Sitemap generated with", allRoutes.length, "entries");
}

// Run script
generateSitemap();
