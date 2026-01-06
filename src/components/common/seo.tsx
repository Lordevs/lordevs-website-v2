import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export function SEO({ title, description, url, image }: SEOProps) {
  const siteUrl = "https://DotCode.com";
  const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/opengraph-image.png`;
  const ogImage = image || defaultImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
