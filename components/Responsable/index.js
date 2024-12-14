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
import iconres from '../../public/images/icon/badge.png'



const Responsable = (props) => {
    const router = useRouter(); // Initialize the router

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }


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
                                    <Image src={iconres} alt="" />

                                </div>
                            </div>
                            <div className="wpo-about-icon-content">
                                <h2> <span>Le Fondateur</span></h2>
                                <p>
                                    Monsieur Mohamed MEDDEB, l’un des pionniers de l’industrie en Tunisie, est issu d’une famille ayant opéré dans le secteur des boissons gazeuses.En 1978 et après des études en industries Agro-Alimentaires en France, M. Mohamed MEDDEB alors âgé de 24 ans, est rentré au pays pour lancer son premier projet de fabrication de yaourts et a révolutionné dès lors les habitudes culinaires en matière de consommation de lait et dérivés.
                                    <br></br> <br></br>
                                    En effet, son approche s’est basée sur la dynamisation du marché par le biais de l’introduction du marketing et en misant sur la qualité des produits. Son ambition pour la croissance de son Groupe a été couronnée par des alliances stratégiques d’envergure avec des grands leaders dans l’industrie du lait et dérivés et notamment DANONE et BONGRAIN. De nos jours, DELICE est devenue la marque la plus populaire et la plus proche des consommateurs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Responsable;
