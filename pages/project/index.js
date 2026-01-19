import React, {Fragment} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'
import ProjectSectionS2 from '../../components/ProjectSectionS2/ProjectSectionS2';
import SEO from '../../components/SEO';
import { getSEOConfig, getBreadcrumbStructuredData } from '../../lib/seoConfig';



const ProjectPage =() => {
    const router = useRouter();
    const seoConfig = getSEOConfig(router.pathname, router.query);
    
    const breadcrumbData = getBreadcrumbStructuredData([
        { name: 'Accueil', url: '/' },
        { name: 'Projets', url: '/project' }
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
            <PageTitle pageTitle={'Projects'} pagesub={'Projects'}/> 
            <ProjectSectionS2/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ProjectPage;
