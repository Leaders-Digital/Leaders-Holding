import React, { useState } from 'react';
import Logo from '/public/images/logo.png'
import Link from 'next/link'
import MobileMenu from '../../components/MobileMenu'
import HeaderTopbar from '../HeaderTopbar'
import Image from 'next/image'


const Header = (props) => {

    const [menuActive, setMenuState] = useState(false);
    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <header id="header" className={props.hclass}>
            <HeaderTopbar/>
            <div className="wpo-site-header">
                <nav className="navigation navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                                <div className="mobail-menu">
                                    <MobileMenu />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-6">
                                <div className="navbar-header">
                                    <Link onClick={ClickHandler} className="navbar-brand" href="/home"><Image  src={Logo}
                                        alt="" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-1 col-1">
                                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                                    <button className="menu-close"><i className="ti-close"></i></button>
                                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                                        <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} href="/">Accueil</Link>
                                            
                                        </li>
                                        <li><Link onClick={ClickHandler} href="/about">À propos</Link></li>

                                        <li><Link onClick={ClickHandler} href="/about">Nos Services</Link></li>
                                        <li><Link onClick={ClickHandler} href="/about">Nos Entreprises</Link></li>
                                        {/* <li><Link onClick={ClickHandler} href="/about">Actualités </Link></li> */}
                                        <li><Link onClick={ClickHandler} href="/about">Carrières </Link></li>
                                        <li><Link onClick={ClickHandler} href="/about">Contact </Link></li>


                                        
                                        {/* <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} href="/">Projects</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} href="/project">Project</Link></li>
                                                <li><Link onClick={ClickHandler} href="/project-s2">Project Style 2</Link></li>
                                                <li><Link onClick={ClickHandler} href="/project-single/Consumer-Markets">Project Single</Link></li>
                                            </ul>
                                        </li> */}
                                        {/* <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} href="/">Pages</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} href="/pricing">Pricing</Link></li>
                                                <li><Link onClick={ClickHandler} href="/testimonial">Testimonial</Link></li>
                                                <li><Link onClick={ClickHandler} href="/404">Error 404</Link></li>
                                                <li><Link onClick={ClickHandler} href="/login">Login</Link></li>
                                                <li><Link onClick={ClickHandler} href="/register">Register</Link></li>
                                            </ul>
                                        </li> */}
                                        {/* <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} href="/blog">Blog</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} href="/blog">Blog right sidebar</Link></li>
                                                <li><Link onClick={ClickHandler} href="/blog-left-sidebar">Blog left sidebar</Link></li>
                                                <li><Link onClick={ClickHandler} href="/blog-fullwidth">Blog fullwidth</Link></li>
                                                <li className="menu-item-has-children">
                                                    <Link onClick={ClickHandler} href="/">Blog details</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link onClick={ClickHandler} href="/blog-single/8-Mistakes-First-Time-Founders-Make-When-Starting-a-Business">Blog details right sidebar</Link>
                                                        </li>
                                                        <li><Link onClick={ClickHandler} href="/blog-single-left-sidebar/8-Mistakes-First-Time-Founders-Make-When-Starting-a-Business">Blog details left
                                                            sidebar</Link></li>
                                                        <li><Link onClick={ClickHandler} href="/blog-single-fullwidth/8-Mistakes-First-Time-Founders-Make-When-Starting-a-Business">Blog details
                                                            fullwidth</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><Link onClick={ClickHandler} href="/contact">Contact</Link></li> */}
                                    </ul>

                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2 col-2">
                                <div className="header-right">
                                    <div className="close-form">
                                        <Link onClick={ClickHandler} className="theme-btn" href="/contact">Contact</Link>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header;