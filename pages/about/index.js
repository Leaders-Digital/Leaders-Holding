import React, {Fragment} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import About from '../../components/about'
import ServiceSection2 from '../../components/ServiceSection2/ServiceSection2';
import FunFact from '../../components/FunFact'
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'
import TimelineSlider from '../../components/TimelineSlider/TimelineSlider';
import Responsable from '../../components/Responsable';
import SEO from '../../components/SEO';
import { getSEOConfig, getBreadcrumbStructuredData } from '../../lib/seoConfig';


const AboutPage =() => {
    const router = useRouter();
    const seoConfig = getSEOConfig(router.pathname, router.query);
    
    // Add breadcrumb structured data
    const breadcrumbData = getBreadcrumbStructuredData([
        { name: 'Accueil', url: '/' },
        { name: 'À propos', url: '/about' }
    ]);
    
    const structuredData = [breadcrumbData, seoConfig.structuredData].filter(Boolean);
    
    return(
        <Fragment>
            <SEO 
                title={seoConfig.title}
                description={seoConfig.description}
                canonical={seoConfig.canonical}
                ogImage={seoConfig.ogImage}
                keywords={seoConfig.keywords}
                structuredData={structuredData.length > 0 ? structuredData : undefined}
            />
            <Navbar/>
            <PageTitle pageTitle={'À propos de nous'} pagesub={'À propos'}/> 
            <About abClass={'wpo-about-section-s2'}/>

            <Responsable />
            

            <TimelineSlider />
           
            <ServiceSection2 srvClass={'wpo-service-section-s3'}/>
   
            <FunFact fnClass={'section-padding'}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AboutPage;
