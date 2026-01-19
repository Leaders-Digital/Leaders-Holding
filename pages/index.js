import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/hero';
import Features from '../components/Features';
import About from '../components/about'
import ServiceSection from '../components/ServiceSection/ServiceSection';
import Pricing from '../components/Pricing/Pricing'
import FunFact from '../components/FunFact'
import ProjectSection from '../components/ProjectSection/ProjectSection';
import Testimonial from '../components/Testimonial'
import Support from '../components/Support'
import BlogSection from '../components/BlogSection'
import Footer from '../components/footer/Footer'
import Scrollbar from '../components/scrollbar/scrollbar'
import Hero3 from '../components/hero3';
import TimelineSlider from '../components/TimelineSlider/TimelineSlider';
import PartnerSlider from '../components/PartnerSlider';
import SEO from '../components/SEO';
import { getSEOConfig, getWebSiteStructuredData } from '../lib/seoConfig';



const HomePage = () => {
    const router = useRouter();
    const seoConfig = getSEOConfig(router.pathname, router.query);
    const websiteStructuredData = getWebSiteStructuredData();
    
    // Merge website structured data with page structured data
    const structuredData = seoConfig.structuredData 
        ? [websiteStructuredData, seoConfig.structuredData]
        : websiteStructuredData;

    return (
        <Fragment>
            <SEO 
                title={seoConfig.title}
                description={seoConfig.description}
                canonical={seoConfig.canonical}
                ogImage={seoConfig.ogImage}
                keywords={seoConfig.keywords}
                structuredData={structuredData}
            />
            <Navbar />
            <Hero3 />
            <Features />
            <About />
            <TimelineSlider />
            <ServiceSection />

           
            < div style={{ paddingBottom: '40px' }}>
            <PartnerSlider />
            </div>

            < div style={{ paddingBottom: '40px' }}>
                <Support />
            </div>
     
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;