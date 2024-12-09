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
                                    Créé en 2019, Leaders Holding a développé un savoir-faire technique et commercial remarquable dans divers domaines, aussi bien à l'échelle locale qu'internationale.
                                    Notre groupe ne cesse de croître et étend aujourd'hui ses activités à de multiples secteurs.
                                </p>
                                {isAboutPage && (
                                    <p>
                                        Nous sommes actuellement présents en Afrique, au Moyen-Orient et en Europe, et nous comptons un total de 150 collaborateurs.
                                        Notre proximité, expertise et transparence nous ont permis de gagner en notoriété ainsi que la confiance de nos clients et partenaires.
                                        Toujours à l'affût des nouveautés, nous restons attentifs au marché et prêts à saisir les bonnes opportunités.
                                    </p>
                                )}


                                {!isAboutPage && (
                                    <>
                                        <div className="signeture">
                                            <span><Image src={sign} alt="" /></span>
                                            <p>Mohamed Mejri, Directeur Général</p>
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
