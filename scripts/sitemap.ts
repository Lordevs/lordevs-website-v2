import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { createClient } from "../src/lib/supabase/client";

const supabase = createClient();

const BASE_URL = import.meta.env.VITE_FRONTEND_URL || "https://lordevs.com";

// Static routes
const staticRoutes = [
  { url: BASE_URL, changefreq: "daily", priority: 1.0 },
  { url: `${BASE_URL}/case-studies`, changefreq: "daily", priority: 0.9 },
  { url: `${BASE_URL}/about`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/career`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/contact`, changefreq: "monthly", priority: 0.7 },
];

// Dynamic routes from Supabase
async function getCaseStudyRoutes() {
  try {
    const { data, error } = await supabase
      .from("projects") // Correct table name
      .select("project_slug, updated_at")
      .eq("is_active", true) // Only active projects
      .order("updated_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error:", error);
      return [];
    }

    return (
      data?.map((project: any) => ({
        url: `${BASE_URL}/case-studies/${project.project_slug}`,
        lastmod: project.updated_at
          ? new Date(project.updated_at).toISOString()
          : new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      })) || []
    );
  } catch (err) {
    console.warn("Failed to fetch projects:", err);
    return [];
  }
}

// Generate sitemap
async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  const dynamicRoutes = await getCaseStudyRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  allRoutes.forEach((route) => sitemap.write(route));
  sitemap.end();

  const xml = await streamToPromise(sitemap);
  writeFileSync("dist/sitemap.xml", xml.toString());
  console.log("✅ Sitemap generated with", allRoutes.length, "entries");
}

// Run script
generateSitemap();
