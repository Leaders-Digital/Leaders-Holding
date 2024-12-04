import React from 'react'

import prdimg1 from '/public/images/icon/document.svg'
import prdimg2 from '/public/images/icon/bar-graph.svg'
import prdimg3 from '/public/images/icon/clipboard.svg'
import Image from 'next/image'


const Features = (props) => {

    const featres = [
        {
            fIcon: prdimg1,
            title: 'Gestion et Structuration',
            des: 'Leaders Holding supervise et coordonne les activités de ses filiales pour une efficacité optimale.',
        },
        {
            fIcon: prdimg2,
            title: 'Planification Stratégique',
            des: 'Offrir flexibilité et opportunités fiscales grâce à une centralisation des décisions clés.',
        },
        {
            fIcon: prdimg3,
            title: 'Coordination des Ressources',
            des: 'Assurer une gestion harmonisée des ressources pour soutenir le développement des filiales.',
        },
    ];
    

    return(
        <section className={`wpo-features-section section-padding  ${props.featuresClass}`}>
            <div className="container">
                <div className="row">
                    {featres.map((featres, fitem) => (
                        <div className="col-lg-4 col-md-6 col-12" key={fitem}>
                            <div className="wpo-features-item">
                                <div className="wpo-features-icon">
                                    <div className="icon">
                                        <Image src={featres.fIcon} alt=""/>
                                    </div>
                                </div>
                                <div className="wpo-features-text">
                                    <h2>{featres.title}</h2>
                                    <p>{featres.des}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features;