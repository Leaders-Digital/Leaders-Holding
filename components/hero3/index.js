import React, { Component } from "react";
import Slider from "react-slick";
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Hero3 = () => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        fade: true
    };

    return (
        <section className="wpo-hero-slider">
        <div className="hero-container">
            <div className="hero-wrapper">
                <Slider {...settings}>
                    {/* Slide 1 */}
                    <div className="hero-slide">
                        <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-2.jpg'})` }}>
                            <div className="container">
                                <div className="slide-content">
                                    <div className="slide-title">
                                        <h2>Leaders Holding</h2>
                                    </div>
                                    <div className="slide-text">
                                        <p>
                                            Gestion et structuration des filiales pour une planification stratégique efficace.
                                        </p>
                                    </div>
                                    <div className="slide-btns">
                                        <Link href="/about" className="theme-btn">En savoir plus</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Slide 2 */}
                    <div className="hero-slide">
                        <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-3.jpg'})` }}>
                            <div className="container">
                                <div className="slide-content">
                                    <div className="slide-title">
                                        <h2>Décisions centralisées</h2>
                                    </div>
                                    <div className="slide-text">
                                        <p>
                                            Coordination optimale des activités et ressources des filiales.
                                        </p>
                                    </div>
                                    <div className="slide-btns">
                                        <Link href="/about" className="theme-btn">Découvrir</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    </section>
    
    
    )
}
export default Hero3;