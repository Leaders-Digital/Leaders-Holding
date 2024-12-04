import React from 'react'
import Link from 'next/link'
import abimg from '/public/images/about.jpg'
import spimg1 from '/public/images/ab-shape-1.png'
import spimg2 from '/public/images/ab-shape-2.png'
import spicon from '/public/images/icon/badge.svg'
import sign from '/public/images/signeture.png'
import Image from 'next/image'


const About = (props) => {
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
                                    <Image src={spicon} alt="" />
                                </div>
                            </div>
                            <div className="wpo-about-icon-content">
    <h2>Des Solutions <span>Structurées et Centralisées</span></h2>
    <p>
        Leaders Holding est spécialisée dans la gestion des filiales, 
        centralisant les décisions stratégiques, financières et fiscales pour 
        optimiser la coordination et l'efficacité des ressources. 
        Nous créons un écosystème robuste pour soutenir leur croissance et leur succès.
    </p>
    <div className="signeture">
        <span><Image src={sign} alt="" /></span>
        <p>Mohamed Mejri, Directeur Général</p>
    </div>
    <Link onClick={ClickHandler} href="/about" className="btn theme-btn">En savoir plus</Link>
</div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;