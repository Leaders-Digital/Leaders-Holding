import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import About from '../../components/about'
import ServiceSection2 from '../../components/ServiceSection2/ServiceSection2';
import FunFact from '../../components/FunFact'
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'
import TimelineSlider from '../../components/TimelineSlider/TimelineSlider';


const AboutPage =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'À propos de nous'} pagesub={'À propos'}/> 
            <About abClass={'wpo-about-section-s2'}/>

            <TimelineSlider />
           
            <ServiceSection2 srvClass={'wpo-service-section-s3'}/>
   
            <FunFact fnClass={'section-padding'}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default AboutPage;
