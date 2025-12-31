import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { truncateMarkdown } from "@/lib/markdown-utils";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Welcome } from "./welcome";

interface Headline {
  id: string;
  title: string;
  description: string;
  publishedDate: string; // ISO string
}

// MOCK DATA
const MOCK_HEADLINES: Headline[] = [
  {
    id: "1",
    title: "New AI Engine Released",
    description:
      "We are thrilled to announce the release of our new AI engine, capable of processing data 10x faster with higher accuracy.",
    publishedDate: "2024-12-28T10:00:00Z",
  },
  {
    id: "2",
    title: "Partnership with TechGiant Corp",
    description:
      "Lordevs has entered a strategic partnership with TechGiant Corp to bring advanced cloud solutions to our enterprise clients.",
    publishedDate: "2024-12-20T14:30:00Z",
  },
  {
    id: "3",
    title: "Community Hackathon Success",
    description:
      "Our annual community hackathon was a massive success with over 500 participants building innovative solutions for social good.",
    publishedDate: "2024-12-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Expansion to European Market",
    description:
      "We are expanding our operations to Europe with a new headquarters in London, aiming to better serve our global customer base.",
    publishedDate: "2024-11-25T11:00:00Z",
  },
];

export function BlogList() {
  const [headlines] = useState<Headline[]>(MOCK_HEADLINES);
  const [loading] = useState(false);

  if (loading) {
    return (
      <section className="py-16">
        <div className="text-center text-white">Loading headlines…</div>
      </section>
    );
  }

  if (headlines.length === 0) {
    return null;
  }

  return (
    <>
      <Welcome />
      <section className="py-16">
        <div className="divide-y divide-gray-700 text-white">
          {headlines.map((post) => (
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
                className="m-auto rounded-full md:m-0"
                src={"/images/team/member-1.png"} // Placeholder avatar
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
                  {new Date(post.publishedDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{post.title}</h3>
                <div className="mt-2 text-gray-300">
                  <ReactMarkdown>
                    {truncateMarkdown(post.description, 120)}
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
                    to={`/news/${post.id}`}
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
