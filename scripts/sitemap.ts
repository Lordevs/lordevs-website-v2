import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables from .env
config(); // Tries to load .env by default
// If using .env.local, we can try to load it if .env doesn't exist or we want to support it
// But usually in local dev, .env is standard. If the user has .env.local, we might need:
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase credentials in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BASE_URL = (
  process.env.VITE_FRONTEND_URL || "https://DotCode.com"
).replace(/['"‘]+/g, "");

// Static routes
const staticRoutes = [
  { url: BASE_URL, changefreq: "daily", priority: 1.0 },
  { url: `${BASE_URL}/case-studies`, changefreq: "daily", priority: 0.9 },
  { url: `${BASE_URL}/about`, changefreq: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/career`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/contact`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/news`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/privacy-policy`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/cookies-policy`, changefreq: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/terms-conditions`, changefreq: "monthly", priority: 0.7 },
];

interface ProjectResult {
  project_slug: string;
  updated_at: string;
}

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

    const projects = data as unknown as ProjectResult[];

    return (
      projects?.map((project) => ({
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
  console.log("Generating sitemap...");
  console.log("BASE_URL:", BASE_URL);

  try {
    const sitemap = new SitemapStream({ hostname: BASE_URL });

    const dynamicRoutes = await getCaseStudyRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    allRoutes.forEach((route) => sitemap.write(route));
    sitemap.end();

    const xml = await streamToPromise(sitemap);

    // Ensure dist directory exists
    const { mkdirSync, existsSync } = await import("fs");
    if (!existsSync("dist")) {
      mkdirSync("dist", { recursive: true });
    }

    writeFileSync("dist/sitemap.xml", xml.toString());
    console.log("✅ Sitemap generated with", allRoutes.length, "entries");
  } catch (error) {
    console.error("❌ Failed to generate sitemap:", error);
    process.exit(1);
  }
}

// Run script
generateSitemap();
