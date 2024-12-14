import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Footer from '../../components/footer/Footer'
import Scrollbar from '../../components/scrollbar/scrollbar'
import ListeEntreprise from '../../components/ListeEntreprise';


const NosEntreprise =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Nos filiales'} pagesub={'Nos filiales'}/> 
            <ListeEntreprise />
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default NosEntreprise;
