import React from 'react'

import prdimg1 from '/public/images/icon/document.svg'
import prdimg2 from '/public/images/icon/bar-graph.svg'
import prdimg3 from '/public/images/icon/clipboard.svg'
import Image from 'next/image'


const Features = (props) => {

    const featres = [
        {
            fIcon: prdimg1,
            title: 'La satisfaction client',
            des: 'La satisfaction de nos clients fait partie de notre quotidien. Nous avons fait de la satisfaction de notre clientèle notre objectif majeur.',
        },
        {
            fIcon: prdimg2,
            title: 'L’innovation',
            des: 'L’innovation est notre force motrice pour la croissance et le succès. Elle nous permet de répondre aux attentes d’une clientèle exigeante et informée.',
        },
        {
            fIcon: prdimg3,
            title: 'L’adaptabilité',
            des: 'Chaque client est unique. Nos équipes se distinguent par leur capacité d’adaptation pour maximiser la satisfaction de notre clientèle.',
        },
    ];
    
    

    return(
        <section className={`wpo-features-section section-padding  ${props.featuresClass}`}>
            <div className="container">
            <div className="row">
                    <div className="col-12">
                        <div className="wpo-section-title">
                            <span>Notre vision</span>
                            <h2>L’avenir en perspective</h2>
                        </div>
                    </div>
                </div>
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