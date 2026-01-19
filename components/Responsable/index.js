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
                                Mr Zied Ben Ismail est le fondateur et président du Groupe Leaders Holding. Entrepreneur visionnaire, il a lancé le groupe en 2019 avec l’ambition de bâtir une structure solide et innovante, orientée vers la performance, la croissance durable et l’excellence. Depuis sa création, Leaders Holding n’a cessé de se développer en consolidant son positionnement et en accompagnant ses partenaires à travers des solutions stratégiques adaptées aux exigences du marché.
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
