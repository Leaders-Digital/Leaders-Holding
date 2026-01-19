import React, {Fragment} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Contactpage from '../../components/Contactpage'
import Footer from '../../components/footer/Footer.js'
import Scrollbar from '../../components/scrollbar/scrollbar'
import SEO from '../../components/SEO';
import { getSEOConfig, getBreadcrumbStructuredData } from '../../lib/seoConfig';

const ContactPage =() => {
    const router = useRouter();
    const seoConfig = getSEOConfig(router.pathname, router.query);
    
    const breadcrumbData = getBreadcrumbStructuredData([
        { name: 'Accueil', url: '/' },
        { name: 'Contact', url: '/contact' }
    ]);
    
    return(
        <Fragment>
            <SEO 
                title={seoConfig.title}
                description={seoConfig.description}
                canonical={seoConfig.canonical}
                ogImage={seoConfig.ogImage}
                keywords={seoConfig.keywords}
                structuredData={breadcrumbData}
            />
            <Navbar/>
            <PageTitle pageTitle={'Contactez-nous'} pagesub={'Contact'}/> 
            <Contactpage/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ContactPage;

