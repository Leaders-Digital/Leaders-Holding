import React, { Fragment } from 'react';
import { useRouter } from 'next/router'
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import BlogList from '../../components/BlogList/BlogList';
import Scrollbar from '../../components/scrollbar/scrollbar';
import SEO from '../../components/SEO';
import { getSEOConfig, getBreadcrumbStructuredData } from '../../lib/seoConfig';



const BlogSingle = (props) => {
    const router = useRouter()
    const seoConfig = getSEOConfig(router.pathname, router.query);
    
    const breadcrumbData = getBreadcrumbStructuredData([
        { name: 'Accueil', url: '/' },
        { name: 'Blog', url: '/blog' }
    ]);

    return (
        <Fragment>
            <SEO 
                title={seoConfig.title}
                description={seoConfig.description}
                canonical={seoConfig.canonical}
                ogImage={seoConfig.ogImage}
                keywords={seoConfig.keywords}
                structuredData={breadcrumbData}
            />
            <Navbar />
            <PageTitle pageTitle='Latest News' pagesub="blog" />
            <BlogList/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogSingle;
