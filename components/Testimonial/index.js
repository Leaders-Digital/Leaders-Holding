import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ts1 from '/public/images/testimonial/img-1.jpg'
import ts2 from '/public/images/testimonial/img-2.jpg'
import ts3 from '/public/images/testimonial/img-3.jpg'
import Image from "next/image";


const Testimonial = (props) => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const testimonial = [
        {
            tsImg: ts1,
            Des: "Je tiens à partager un message rapide pour vous faire savoir que vous faites un excellent travail. Je suis heureux d'avoir décidé de travailler avec vous. C'est vraiment formidable à quel point tout est facile.",
            Title: 'Mohamed Ali',
            Sub: "Leaders Immobilier",
        },
        {
            tsImg: ts2,
            Des: "Merci à l'équipe de Leaders Holding pour leur expertise et leur accompagnement. Grâce à leur soutien, nous avons pu développer des stratégies solides et un plan d'action efficace.",
            Title: 'Sofia Khemiri',
            Sub: "Leaders Digital",
        },
        {
            tsImg: ts3,
            Des: "Leaders Holding nous a permis de structurer nos projets de manière optimale, avec un accompagnement stratégique sur mesure. Leur approche a vraiment fait la différence dans la croissance de notre entreprise.",
            Title: 'Karim Boubaker',
            Sub: "Leaders Building",
        },
        {
            tsImg: ts1,
            Des: "Une collaboration exceptionnelle avec l'équipe de Leaders Holding. Leur vision et leur stratégie ont renforcé nos projets et ont fait croître notre impact sur le marché.",
            Title: 'Amira Jemai',
            Sub: "Leaders Makeup",
        }
    ]
    

    return (
        <section className={`wpo-testimonial-section section-padding ${props.tClass}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <div className="wpo-testimonial-title">
                        <h2><i className="fi flaticon-left-quote"></i> Ce que disent <span>nos clients</span></h2>
                        </div>
                    </div>
                </div>
                <div className="wpo-testimonial-items wpo-testimonial-slider owl-carousel">
                    <Slider {...settings}>
                        {testimonial.map((tesmnl, tsm) => (
                            <div className="wpo-testimonial-item" key={tsm}>
                                <div className="wpo-testimonial-avatar">
                                    <Image src={tesmnl.tsImg} alt="" />
                                </div>
                                <div className="wpo-testimonial-text">
                                    <p>{tesmnl.Des}</p>
                                    <div className="wpo-testimonial-text-btm">
                                        <h3>{tesmnl.Title}</h3>
                                        <span>{tesmnl.Sub}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;