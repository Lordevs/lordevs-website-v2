import ReactMarkdown from "react-markdown";
import { truncateMarkdown } from "@/lib/markdown-utils";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Welcome } from "./welcome";
import { useNews } from "@/hooks/use-news";

export function BlogList() {
  const { news: headlines, loading } = useNews(true);
  const listHeadlines = headlines ? headlines.slice(4) : [];

  if (loading) {
    return (
      <section className="py-16">
        <div className="text-center text-white">Loading headlines…</div>
      </section>
    );
  }

  if (listHeadlines.length === 0) {
    return null;
  }

  return (
    <>
      <Welcome />
      <section className="py-16">
        <div className="divide-y divide-gray-700 text-white">
          {listHeadlines.map((post) => (
            <div
              key={post.id}
              className="
              /* MOBILE: stack vertically with small padding */
              flex flex-col 
              space-y-4 
              px-4 py-6

              /* DESKTOP (≥md): 2-column layout */
              md:flex-row md:items-start md:justify-between md:space-y-0 md:px-32 md:py-8
            ">
              <img
                width={100}
                height={100}
                className="m-auto h-[100px] w-[100px] rounded-full object-cover md:m-0"
                src={post.thumbnail_url || "/opengraph-image.png"}
                alt="logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.visibility = "hidden"; // Hide if broken
                }}
              />
              {/*** 1) DATE / TITLE / DESCRIPTION BLOCK ***/}
              <div
                className="
                /* On mobile: full width, left‐aligned */
                w-full text-left 
                /* On desktop: flex‐1 in the center */
                md:w-auto md:flex-1 md:px-6
              ">
                <p className="text-sm text-gray-400">
                  {new Date(post.published_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{post.title}</h3>
                <div className="mt-2 text-gray-300">
                  <ReactMarkdown>
                    {truncateMarkdown(post.excerpt || post.content || "", 120)}
                  </ReactMarkdown>
                </div>
              </div>

              {/*** 2) READ MORE BUTTON BLOCK ***/}
              <div
                className="
                /* On mobile: center below text */
                flex justify-start 
                /* On desktop: shrink‐to‐fit and align right */
                md:w-auto md:justify-end
              ">
                <Button asChild variant="gradient" size="sm">
                  <Link
                    to={`/news/${post.slug || post.id}`}
                    className="flex items-center gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default BlogList;
