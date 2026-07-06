import { buildWorld } from './group-data';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://leadersholding.tn').replace(/\/$/, '');

export const SITE = {
  name: 'Leaders Holding',
  tagline: 'Plusieurs sociétés. Une vision.',
  locale: 'fr_TN',
  email: 'contact@leadersholding.tn',
  phone: '+216 27 360 038',
  address: {
    street: 'Cité des Pins, Les Berges du Lac 2',
    city: 'Tunis',
    postalCode: '1053',
    country: 'TN',
  },
  defaultSeo: {
    title: 'Leaders Holding — Groupe diversifié à Tunis | Immobilier, Construction, Digital',
    description:
      'Leaders Holding est un groupe tunisien de 25 sociétés actives dans l\'immobilier, la construction, la technologie, le commerce, l\'agriculture et plus encore. Siège à Tunis depuis 2020.',
    path: '/',
  },
  recruitmentSeo: {
    title: 'Carrières & Recrutement — Leaders Holding',
    description:
      'Découvrez les offres d\'emploi du groupe Leaders Holding à Tunis et en Tunisie. Postulez aux postes ouverts en immobilier, construction, digital, commerce et autres secteurs.',
    path: '/recrutement',
  },
};

export const SOCIETY_NAMES = [
  'Leaders Immobilier', 'Le Portail Immobilier', 'Le Coin Immobilier', 'Négoce Immobilier',
  'Inna Immobilier', 'Global Leaders Trade', 'Gratia Immobilier', 'Sté Promotion Ben Ismail',
  'Leaders Building', 'Leaders Diamant Aluminium', 'Leaders Extra Electric', 'Leaders Digital',
  'Leaders Import Export', 'Leaders Fish', 'Leaders Agro Elite', 'Leaders Makeup',
  'Nexting Etude', 'Gratia Service', 'Leaders Business', 'Leaders Multiworks',
  'Leaders Luxury Cars', 'Leaders Wood', 'Leaders Travel', 'Leaders Holding', 'Leaders Luxury',
];

export function slugify(name) {
  return (name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function nameFromSlug(slug) {
  return SOCIETY_NAMES.find((n) => slugify(n) === slug) || null;
}

export function absoluteUrl(path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function buildMetadata({ title, description, path = '/' }) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: SITE.locale,
      title,
      description,
      url,
      images: [{ url: absoluteUrl('/og-image.webp'), width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/og-image.webp')],
    },
  };
}

export function societyMetadata(slug) {
  const name = nameFromSlug(slug);
  if (!name) return {};
  const world = buildWorld(name);
  if (!world) return {};
  const about = world.about || '';
  const description = about.length > 155 ? `${about.slice(0, 155)}…` : about;
  return buildMetadata({
    title: `${world.name} — ${SITE.name}`,
    description,
    path: `/societe/${slug}`,
  });
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE_URL,
    logo: absoluteUrl('/og-image.webp'),
    description: SITE.defaultSeo.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  };
}
