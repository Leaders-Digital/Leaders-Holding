import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router' // Import useRouter from Next.js
import abimg from '/public/images/about.jpg'
import spimg1 from '/public/images/ab-shape-1.png'
import spimg2 from '/public/images/ab-shape-2.png'
import spicon from '/public/images/icon/badge.svg'
import sign from '/public/images/signeture.png'
import Image from 'next/image'
import DoughnutChart from '../DoughnutChart'



const About = (props) => {
    const router = useRouter(); // Initialize the router

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    // Check if the current route is '/about'
    const isAboutPage = router.pathname === '/about';

    return (
        <section className={`wpo-about-section ${props.abClass}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="wpo-about-wrap">
                            <div className="wpo-about-img">
                                <Image src={abimg} alt="" />
                                <div className="wpo-ab-shape-1"><Image src={spimg1} alt="" /></div>
                                <div className="wpo-ab-shape-2"><Image src={spimg2} alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="wpo-about-text">
                            <div className="wpo-about-icon">
                                <div className="icon">
                                    <Image src={spicon} alt="" />
                                </div>
                            </div>
                            <div className="wpo-about-icon-content">
                                <h2>Des Solutions <span>Structurées et Centralisées</span></h2>
                                <p>
                                    Leaders Holding, créé en 2019, regroupe plus de 15 sociétés multisectorielles opérant dans une diversité de secteurs économiques. Nos activités couvrent des domaines variés tels que l'immobilier, la cosmétique, la communication et le marketing digital, les services, le consulting, l'import & export, ainsi que le commerce.
                                    Grâce à cette diversité, nous proposons une gamme complète de services et de produits adaptés à différents marchés, en garantissant à nos clients des prestations de qualité et une expertise pointue dans chaque secteur.
                                </p>
                                {isAboutPage && (
                                    <p>
                                        Depuis sa création, Leaders Holding s'est forgé une solide réputation en offrant des solutions innovantes et sur-mesure. Aujourd'hui, notre groupe est fier de son rayonnement international avec une présence active en Afrique, au Moyen-Orient et en Europe. Nous comptons plus de 150 collaborateurs passionnés et dévoués, qui partagent les valeurs fondamentales de proximité, de transparence et d'excellence.
                                        <br />
                                    </p>
                                )}



                                {!isAboutPage && (
                                    <>
                                        <div className="signeture">
                                            <span><Image src={sign} alt="" /></span>
                                            <p>Ben Ismail Zied, Directeur Général</p>
                                        </div>
                                        <Link onClick={ClickHandler} href="/about" className="btn theme-btn">En savoir plus</Link>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                {isAboutPage && (

                    <DoughnutChart />

                )}
            </div>
        </section>
    )
}

export default About;
