import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar.js'
import PageTitle from '../../components/pagetitle/PageTitle.js'
import Footer from '../../components/footer/Footer.js'
import Scrollbar from '../../components/scrollbar/scrollbar.js'
import TableCarriere from '../../components/TableCarriere';
import CondidatureSpontanee from '../../components/CondidatureSpontanee/index.js';


const Spontanee =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Votre carrière chez Leaders Holding'} pagesub={'spontanee'}/> 
           <CondidatureSpontanee />
           
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default Spontanee;
