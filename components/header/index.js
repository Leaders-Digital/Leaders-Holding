import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '../../components/MobileMenu';
import HeaderTopbar from '../HeaderTopbar';
import Logo from '/public/images/logo.png';

const Header = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <header id="header" className={props.hclass}>
            <HeaderTopbar />
            <div className="wpo-site-header">
                <nav className="navigation navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-between">
                            {/* Logo Section */}
                            <div className="col-auto">
                                <div className="navbar-header">
                                    <Link onClick={ClickHandler} className="navbar-brand" href="/">
                                        <Image src={Logo} alt="Logo" />
                                    </Link>
                                </div>
                            </div>

                            {/* Links Section */}
                            <div className="col-lg-8 d-none d-lg-block">
                                <div id="navbar" className="navigation-holder">
                                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                                        <li>
                                            <Link onClick={ClickHandler} href="/">Accueil</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/about">À propos</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/service">Nos Services</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/#">Nos Entreprises</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/carriere">Carrières</Link>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} href="/">Carrières</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} href="/carriere">Nos Offres</Link></li>
                                                <li><Link onClick={ClickHandler} href="/spontanee">Candidature spontannée</Link></li>
                                               
                                            </ul>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/contact">Contact</Link>
                                        </li>
                                      
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-2">
                                <div className="header-right">
                                    <div className="close-form">
                                        <Link onClick={ClickHandler} className="theme-btn" href="/contact">Contact</Link>
                                    </div>
                                    
                                </div>
                            </div>

                            {/* Hamburger Menu Section */}
                            <div className="col-auto">
                                <div className="header-right d-lg-none">
                                    <div className="mobail-menu">
                                        <MobileMenu />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
