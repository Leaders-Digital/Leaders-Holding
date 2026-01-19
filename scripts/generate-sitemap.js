/**
 * Sitemap Generator for Leaders Holding
 * Run this script to generate sitemap.xml: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leaders-holding.com';
const outputPath = path.join(__dirname, '../public/sitemap.xml');

// Import data sources - handle ES6 imports
let blogs, Projects, Services;

try {
  // Try to require the modules
  blogs = require('../api/blogs').default || require('../api/blogs');
  Projects = require('../api/project').default || require('../api/project');
  Services = require('../api/service').default || require('../api/service');
} catch (error) {
  // If require fails (ES6 modules), use hardcoded slugs
  console.warn('Warning: Could not import API files. Using hardcoded slugs.');
  blogs = [
    { slug: '8-Mistakes-First-Time-Founders-Make-When-Starting-a-Business' },
    { slug: '3-of-the-Worst-Ways-Small-Businesses-Waste-Money-on-Marketing' },
    { slug: 'Good-Advice-Tips-From-Successful-Small-Business-Owners' }
  ];
  Projects = [
    { slug: 'Digital-Analysis' },
    { slug: 'Corporate-Finance' },
    { slug: 'Market-Research' },
    { slug: 'Business-Analysis' },
    { slug: 'Consumer-Markets' },
    { slug: 'Insurance' }
  ];
  Services = [
    { slug: 'Gestion-Stratégique' },
    { slug: 'Finance-et-Fiscalité' },
    { slug: 'Recherche-de-Marché' },
    { slug: 'Analyse-Commerciale' },
    { slug: 'Gestion-des-Marchés' },
    { slug: 'Services-Juridiques' }
  ];
}

// Static pages
const staticPages = [
  { url: '', changefreq: 'daily', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.8' },
  { url: '/service', changefreq: 'monthly', priority: '0.8' },
  { url: '/project', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'weekly', priority: '0.8' },
  { url: '/contact', changefreq: 'monthly', priority: '0.7' },
  { url: '/carriere', changefreq: 'weekly', priority: '0.7' },
  { url: '/nosentreprise', changefreq: 'monthly', priority: '0.7' },
  { url: '/spontanee', changefreq: 'monthly', priority: '0.6' },
];

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
  xml += ' xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9';
  xml += ' http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add blog posts
  blogs.forEach(blog => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blog-single/${blog.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });

  // Add projects
  Projects.forEach(project => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/project-single/${project.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });

  // Add services
  Services.forEach(service => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/service-single/${service.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Write to file
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap generated successfully at ${outputPath}`);
  console.log(`   Total URLs: ${staticPages.length + blogs.length + Projects.length + Services.length}`);
}

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
