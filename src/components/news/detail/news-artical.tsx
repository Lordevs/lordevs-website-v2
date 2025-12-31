import { ArrowLeft, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { NewsRow } from "@/lib/types/database";

interface NewsArticleProps {
  blog: NewsRow | null;
  loading: boolean;
  error: string | null;
}

export default function NewsArticle({
  blog,
  loading,
  error,
}: NewsArticleProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 pb-20 pt-10">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 rounded bg-gray-700/50" />
          <div className="h-12 w-3/4 rounded bg-gray-700/50" />
          <div className="aspect-video w-full rounded-2xl bg-gray-700/50" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-gray-700/50" />
            <div className="h-4 w-full rounded bg-gray-700/50" />
            <div className="h-4 w-2/3 rounded bg-gray-700/50" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          {error || "Article not found"}
        </h2>
        <Button onClick={() => navigate("/news")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
        </Button>
      </div>
    );
  }

  const { title, content, published_at, thumbnail_url, excerpt } = blog;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareDescription = excerpt || content?.slice(0, 200) || "";

  const linkedInShareUrl =
    `https://www.linkedin.com/shareArticle?mini=true` +
    `&url=${encodeURIComponent(currentUrl)}` +
    `&title=${encodeURIComponent(title)}` +
    `&summary=${encodeURIComponent(shareDescription)}` +
    `&source=${encodeURIComponent(
      typeof window !== "undefined" ? window.location.host : ""
    )}`;

  return (
    <article className="container mx-auto max-w-4xl px-4 pb-20 pt-10">
      {/* Back Button */}
      <Link
        to="/news"
        className="mb-8 inline-flex items-center text-sm text-gray-400 transition-colors hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to News
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-400 text-sm">
          Posted on{" "}
          {new Date(published_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-12 space-y-4 sm:space-y-0">
        <div />
        <div className="flex flex-col items-start sm:items-end space-y-2">
          <span className="text-gray-400 text-sm font-medium">
            Share this news
          </span>
          <div className="flex space-x-4">
            <Link
              to={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn">
              <Linkedin className="w-10 h-10 text-gray-400 border border-gray-700 rounded-full p-2.5 hover:text-white hover:border-white transition-all transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-64 md:h-[450px] relative mb-12 rounded-3xl overflow-hidden border border-[#4F1AD61A] group">
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
          style={{
            background: "radial-gradient(circle at center, #0F091226, #0C0912)",
          }}>
          <img
            src={thumbnail_url || "/opengraph-image.png"}
            alt={title}
            className="object-contain opacity-80 w-[300px] h-[300px]"
          />
        </div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#41A2F8] prose-li:text-gray-300">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: (props) => (
              <h1 className="text-4xl font-bold my-8 text-white" {...props} />
            ),
            h2: (props) => (
              <h2
                className="text-3xl font-bold my-6 text-white border-b border-[#4F1AD61A] pb-2"
                {...props}
              />
            ),
            h3: (props) => (
              <h3 className="text-2xl font-bold my-4 text-white" {...props} />
            ),
            p: (props) => (
              <p
                className="text-lg leading-relaxed text-gray-300 my-4"
                {...props}
              />
            ),
            a: (props) => (
              <a
                className="text-[#41A2F8] hover:underline underline-offset-4"
                {...props}
              />
            ),
            li: (props) => (
              <li className="ml-6 list-disc text-gray-300 my-2" {...props} />
            ),
            ul: (props) => <ul className="my-6 space-y-2" {...props} />,
            ol: (props) => (
              <ol className="my-6 list-decimal ml-6 space-y-2" {...props} />
            ),
            table: (props) => (
              <div className="overflow-x-auto my-10 border border-[#4F1AD61A] rounded-2xl bg-[#0C0912]/50 backdrop-blur-sm">
                <table
                  className="w-full text-left border-collapse"
                  {...props}
                />
              </div>
            ),
            thead: (props) => <thead className="bg-[#4F1AD60D]" {...props} />,
            tbody: (props) => (
              <tbody className="divide-y divide-[#4F1AD61A]" {...props} />
            ),
            tr: (props) => (
              <tr className="hover:bg-white/2 transition-colors" {...props} />
            ),
            th: (props) => (
              <th
                className="py-4 px-6 font-bold text-lg text-white whitespace-nowrap border-b border-[#4F1AD61A]"
                {...props}
              />
            ),
            td: (props) => (
              <td className="py-4 px-6 text-gray-300 align-top" {...props} />
            ),
            blockquote: (props) => (
              <blockquote
                className="border-l-4 border-[#41A2F8] pl-6 my-8 italic text-gray-400 bg-[#4F1AD605] py-4 rounded-r-lg"
                {...props}
              />
            ),
            code: (props) => (
              <code
                className="bg-[#4F1AD61A] px-1.5 py-0.5 rounded text-[#41A2F8] font-mono text-sm"
                {...props}
              />
            ),
          }}>
          {content || ""}
        </ReactMarkdown>
      </div>
    </article>
  );
}
