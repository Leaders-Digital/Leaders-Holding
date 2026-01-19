/**
 * Centralized SEO configuration for all routes
 * This file contains metadata for each page in the application
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leaders-holding.com';

// Note: We'll import these dynamically in getSEOConfig to avoid SSR issues
// import blogs from '../api/blogs';
// import Projects from '../api/project';
// import Services from '../api/service';

/**
 * Get SEO metadata for a specific route
 * @param {string} pathname - The route pathname
 * @param {object} query - Route query parameters (for dynamic routes)
 * @returns {object} SEO metadata object
 */
export const getSEOConfig = (pathname, query = {}) => {
  // Homepage
  if (pathname === '/' || pathname === '/home' || pathname === '/home2' || pathname === '/home3') {
    return {
      title: 'Accueil',
      description: 'Leaders Holding - Gestion et structuration des filiales pour une planification stratégique efficace. Plus de 15 sociétés multisectorielles opérant dans divers secteurs économiques.',
      keywords: 'Leaders Holding, gestion filiales, planification stratégique, holding, entreprises multisectorielles',
      canonical: '/',
      ogImage: '/images/logo.png',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Leaders Holding',
        url: baseUrl,
        logo: `${baseUrl}/images/logo.png`,
        description: 'Gestion et structuration des filiales pour une planification stratégique efficace',
        sameAs: [
          // Add social media URLs here
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          // Add contact information
        }
      }
    };
  }

  // About page
  if (pathname === '/about') {
    return {
      title: 'À propos de nous',
      description: 'Découvrez Leaders Holding, créé en 2019, regroupant plus de 15 sociétés multisectorielles. Présence internationale en Afrique, Moyen-Orient et Europe avec plus de 150 collaborateurs.',
      keywords: 'Leaders Holding, à propos, histoire, entreprise, groupe, filiales',
      canonical: '/about',
      ogImage: '/images/about.jpg',
    };
  }

  // Services pages
  if (pathname === '/service' || pathname === '/service-s2') {
    return {
      title: 'Nos Services',
      description: 'Découvrez nos services dans l\'immobilier, la cosmétique, la communication digitale, le consulting, l\'import-export et le commerce.',
      keywords: 'services, immobilier, cosmétique, communication digitale, consulting, import export',
      canonical: '/service',
      ogImage: '/images/logo.png',
    };
  }

  // Service single page
  if (pathname === '/service-single/[slug]' && query.slug) {
    // Dynamic import to avoid SSR issues
    const Services = require('../api/service').default;
    const service = Services.find(s => s.slug === query.slug);
    if (service) {
      const serviceImage = typeof service.sImg === 'string' ? service.sImg : '/images/logo.png';
      return {
        title: service.title || 'Service',
        description: service.des || `Découvrez notre service ${service.title}`,
        keywords: `service, ${service.title}, Leaders Holding`,
        canonical: `/service-single/${query.slug}`,
        ogImage: serviceImage,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.des,
          provider: {
            '@type': 'Organization',
            name: 'Leaders Holding',
            url: baseUrl
          }
        }
      };
    }
  }

  // Projects pages
  if (pathname === '/project' || pathname === '/project-s2') {
    return {
      title: 'Nos Projets',
      description: 'Découvrez nos projets et réalisations dans différents secteurs d\'activité.',
      keywords: 'projets, réalisations, portfolio, Leaders Holding',
      canonical: '/project',
      ogImage: '/images/logo.png',
    };
  }

  // Project single page
  if (pathname === '/project-single/[slug]' && query.slug) {
    const Projects = require('../api/project').default;
    const project = Projects.find(p => p.slug === query.slug);
    if (project) {
      const projectImage = typeof project.pImg === 'string' ? project.pImg : '/images/logo.png';
      return {
        title: project.title || 'Projet',
        description: project.description || `Découvrez notre projet ${project.title}`,
        keywords: `projet, ${project.title}, Leaders Holding`,
        canonical: `/project-single/${query.slug}`,
        ogImage: projectImage,
        ogType: 'article',
      };
    }
  }

  // Blog pages
  if (pathname === '/blog' || pathname === '/blog-fullwidth' || pathname === '/blog-left-sidebar') {
    return {
      title: 'Blog',
      description: 'Découvrez nos dernières actualités, conseils et articles sur la gestion d\'entreprise, le business et le consulting.',
      keywords: 'blog, actualités, conseils, articles, business, consulting',
      canonical: '/blog',
      ogImage: '/images/logo.png',
    };
  }

  // Blog single page
  if (pathname === '/blog-single/[slug]' && query.slug) {
    const blogs = require('../api/blogs').default;
    const blog = blogs.find(b => b.slug === query.slug);
    if (blog) {
      // Handle Next.js Image imports - convert to string path
      const blogImage = typeof blog.blogSingleImg === 'string' 
        ? blog.blogSingleImg 
        : typeof blog.screens === 'string'
        ? blog.screens
        : '/images/logo.png';
      return {
        title: blog.title,
        description: blog.description || `Lisez notre article: ${blog.title}`,
        keywords: `blog, article, ${blog.tag}, ${blog.title}`,
        canonical: `/blog-single/${query.slug}`,
        ogImage: blogImage,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.description,
          image: blogImage.startsWith('http') ? blogImage : `${baseUrl}${blogImage}`,
          datePublished: blog.create_at,
          author: {
            '@type': 'Person',
            name: blog.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'Leaders Holding',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/logo.png`
            }
          }
        }
      };
    }
  }

  // Contact page
  if (pathname === '/contact') {
    return {
      title: 'Contactez-nous',
      description: 'Contactez Leaders Holding pour toute demande d\'information ou de collaboration.',
      keywords: 'contact, Leaders Holding, demande, information',
      canonical: '/contact',
      ogImage: '/images/logo.png',
    };
  }

  // Career page
  if (pathname === '/carriere') {
    return {
      title: 'Carrières',
      description: 'Rejoignez Leaders Holding et faites partie d\'une équipe dynamique de plus de 150 collaborateurs.',
      keywords: 'carrières, emploi, recrutement, Leaders Holding, offres d\'emploi',
      canonical: '/carriere',
      ogImage: '/images/logo.png',
    };
  }

  // Spontaneous application page
  if (pathname === '/spontanee') {
    return {
      title: 'Candidature Spontanée',
      description: 'Envoyez votre candidature spontanée à Leaders Holding.',
      keywords: 'candidature spontanée, recrutement, emploi',
      canonical: '/spontanee',
      ogImage: '/images/logo.png',
    };
  }

  // Companies page
  if (pathname === '/nosentreprise') {
    return {
      title: 'Nos Entreprises',
      description: 'Découvrez les filiales de Leaders Holding opérant dans différents secteurs économiques.',
      keywords: 'entreprises, filiales, Leaders Holding, sociétés',
      canonical: '/nosentreprise',
      ogImage: '/images/logo.png',
    };
  }

  // 404 page
  if (pathname === '/404') {
    return {
      title: 'Page non trouvée',
      description: 'La page que vous recherchez n\'existe pas.',
      canonical: '/404',
      noindex: true,
    };
  }

  // Login/Register pages - noindex
  if (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password') {
    return {
      title: pathname === '/login' ? 'Connexion' : pathname === '/register' ? 'Inscription' : 'Mot de passe oublié',
      description: 'Page d\'authentification',
      canonical: pathname,
      noindex: true,
    };
  }

  // Default fallback
  return {
    title: 'Leaders Holding',
    description: 'Leaders Holding - Gestion et structuration des filiales pour une planification stratégique efficace.',
    canonical: pathname,
    ogImage: '/images/logo.png',
  };
};

/**
 * Generate breadcrumb structured data
 */
export const getBreadcrumbStructuredData = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
};

/**
 * Get WebSite structured data with SearchAction
 */
export const getWebSiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Leaders Holding',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};
