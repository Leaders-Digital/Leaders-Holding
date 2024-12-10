import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar.js'
import PageTitle from '../../components/pagetitle/PageTitle.js'
import Footer from '../../components/footer/Footer.js'
import Scrollbar from '../../components/scrollbar/scrollbar.js'
import Pricing from '../../components/Pricing/Pricing.js'
import TableCarriere from '../../components/TableCarriere';


const PricingPage =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Votre carrière chez Leaders Holding'} pagesub={'carriere'}/> 
           <TableCarriere />
           
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default PricingPage;
