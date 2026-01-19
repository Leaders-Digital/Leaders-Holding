import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * SEO Component for Next.js
 * Handles all meta tags, Open Graph, Twitter Cards, and structured data
 */
const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  nofollow = false,
  structuredData,
  keywords,
}) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leaders-holding.com';
  
  // Build full canonical URL
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`)
    : `${baseUrl}${router.asPath}`;

  // Default OG image
  const defaultOgImage = `${baseUrl}/images/og-default.jpg`;
  const ogImageUrl = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)
    : defaultOgImage;

  // Build title with site name
  const siteName = 'Leaders Holding';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  // Robots meta
  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  else robotsContent.push('index');
  if (nofollow) robotsContent.push('nofollow');
  else robotsContent.push('follow');

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || 'Leaders Holding - Gestion et structuration des filiales pour une planification stratégique efficace.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'Leaders Holding - Gestion et structuration des filiales pour une planification stratégique efficace.'} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || 'Leaders Holding - Gestion et structuration des filiales pour une planification stratégique efficace.'} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEO;
