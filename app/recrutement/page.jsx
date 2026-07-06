import Recruitment from '@/components/Recruitment';
import { buildMetadata, SITE } from '@/lib/seo';

export const metadata = buildMetadata(SITE.recruitmentSeo);

export default function RecrutementPage() {
  return <Recruitment />;
}
