import { notFound } from 'next/navigation';
import Recruitment from '@/components/Recruitment';
import { buildMetadata, SITE } from '@/lib/seo';
import { getJobOffer } from '@/lib/leaders-api';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const job = await getJobOffer(id);
    if (!job) return buildMetadata(SITE.recruitmentSeo);
    const desc = (job.description || '').replace(/\s+/g, ' ').trim();
    return buildMetadata({
      title: `${job.title} — Carrières ${SITE.name}`,
      description: desc.length > 155 ? `${desc.slice(0, 155)}…` : desc || SITE.recruitmentSeo.description,
      path: `/recrutement/${id}`,
    });
  } catch {
    return buildMetadata(SITE.recruitmentSeo);
  }
}

export default async function JobOfferPage({ params }) {
  const { id } = await params;
  if (!id || !/^[a-f0-9]{24}$/i.test(id)) notFound();
  return <Recruitment jobId={id} />;
}
