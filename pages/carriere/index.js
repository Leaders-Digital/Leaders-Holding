import React, {Fragment} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar/Navbar.js'
import PageTitle from '../../components/pagetitle/PageTitle.js'
import Footer from '../../components/footer/Footer.js'
import Scrollbar from '../../components/scrollbar/scrollbar.js'
import Pricing from '../../components/Pricing/Pricing.js'
import TableCarriere from '../../components/TableCarriere';
import SEO from '../../components/SEO';
import { getSEOConfig, getBreadcrumbStructuredData } from '../../lib/seoConfig';


const PricingPage =() => {
    const router = useRouter();
    const seoConfig = getSEOConfig(router.pathname, router.query);
    
    const breadcrumbData = getBreadcrumbStructuredData([
        { name: 'Accueil', url: '/' },
        { name: 'Carrières', url: '/carriere' }
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
            <PageTitle pageTitle={'Votre carrière chez Leaders Holding'} pagesub={'carriere'}/> 
           <TableCarriere />
           
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default PricingPage;
