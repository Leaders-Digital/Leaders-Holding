import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'


const NosEntreprise =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Nos Entreprise'} pagesub={'Services'}/> 
            
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default NosEntreprise;
