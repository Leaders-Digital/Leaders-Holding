import React from 'react'
import Link from 'next/link'
import Logo from '/public/images/logo.png'
import Projects from '../../api/project'
import Services from '../../api/service'
import Image from 'next/image'


const Footer = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <Link onClick={ClickHandler} href="/">
                                        <Image src={Logo} alt="blog" />
                                    </Link>
                                </div>
                                <p>Leaders Holding est spécialisée dans la gestion des filiales, centralisant les décisions stratégiques, financières et fiscales pour optimiser la coordination et l'efficacité des ressources.</p>
                                <ul>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-twitter-alt"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-google"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget wpo-service-link-widget">
                                <div className="widget-title">
                               
                                </div>
                                <div className="contact-ft">
                                    <ul>
                                        <li><i className="fi flaticon-location"></i>Cité des Pins, Les berges du lac 2 1053 Tunis, Tunisie</li>
                                        <li><i className="fi flaticon-phone-call"></i>+216 20 200 200</li>
                                        <li><i className="fi flaticon-send"></i>contact@leadersholding.tn</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    
                                </div>
                                <ul>
                                <li>Mentions légales</li>
                                <li>Politique de confidentialité</li>
                                <li>Politique de cookies</li>
                                <li>Les Offres d'emplois</li>
                                
                                </ul>
                            </div>
                        </div>

                        {/* <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget instagram">
                                <div className="widget-title">
                                    <h3>Projects</h3>
                                </div>
                                <ul className="d-flex">
                                    {Projects.slice(0, 6).map((project, pritem) => (
                                        <li key={pritem}><Link onClick={ClickHandler} href='/project-single/[slug]' as={`/project-single/${project.slug}`}><Image src={project.pImg} alt="" /></Link></li>
                                    ))}
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <p className="copyright"> Copyright &copy; 2024  by LeadersDigital</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;