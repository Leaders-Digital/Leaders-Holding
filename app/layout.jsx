import './globals.css';
import { Inter_Tight, IBM_Plex_Mono } from 'next/font/google';
import { buildMetadata, organizationJsonLd, SITE } from '@/lib/seo';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
});

export const metadata = {
  ...buildMetadata(SITE.defaultSeo),
  icons: {
    icon: '/favicon.webp',
    apple: '/og-image.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${interTight.variable} ${ibmPlexMono.variable}`} style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
