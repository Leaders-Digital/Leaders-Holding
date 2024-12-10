import React, { Fragment } from 'react';
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



const HomePage = () => {
    return (
        <Fragment>
            <Navbar />
            <Hero3 />
            <Features />
            <About />
            <ServiceSection />
         
            <Testimonial />
            < div style={{ paddingBottom: '20px' }}>
                <Support />
            </div>
     
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;