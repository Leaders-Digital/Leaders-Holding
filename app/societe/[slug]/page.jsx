import { notFound } from 'next/navigation';
import Home from '@/components/Home';
import { nameFromSlug, slugify, societyMetadata, SOCIETY_NAMES } from '@/lib/seo';

export function generateStaticParams() {
  return SOCIETY_NAMES.map((name) => ({ slug: slugify(name) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return societyMetadata(slug);
}

export default async function SocietyPage({ params }) {
  const { slug } = await params;
  if (!nameFromSlug(slug)) notFound();
  return <Home initialSocietySlug={slug} skipIntro />;
}
