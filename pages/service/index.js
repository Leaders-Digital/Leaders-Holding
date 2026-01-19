import React, {Fragment} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'
import SEO from '../../components/SEO';
import { getSEOConfig, getBreadcrumbStructuredData } from '../../lib/seoConfig';


const ServicePage =() => {
    const router = useRouter();
    const seoConfig = getSEOConfig(router.pathname, router.query);
    
    const breadcrumbData = getBreadcrumbStructuredData([
        { name: 'Accueil', url: '/' },
        { name: 'Services', url: '/service' }
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
            <PageTitle pageTitle={'Services'} pagesub={'Services'}/> 
            <ServiceSection/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ServicePage;
