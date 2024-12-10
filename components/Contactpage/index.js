import React from 'react';
import ContactForm from '../ContactFrom/ContactForm'

import cnt1 from '/public/images/icon/home.svg'
import cnt2 from '/public/images/icon/mail-2.svg'
import cnt3 from '/public/images/icon/app.svg'
import Image from 'next/image';

const Contactpage = () => {

    return(
        <section className="wpo-contact-pg-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-10 offset-lg-1">
                        <div className="office-info">
                            <div className="row">
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <Image src={cnt1} alt=""/>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Adresse</h2>
                                            <p>Cité des Pins, Les berges du lac 2 1053 Tunis, Tunisie</p>
                                        </div>
                                    </div>
                                </div> 
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <Image src={cnt2} alt=""/>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Écrivez-nous</h2>
                                            <p>contact@leadersholding.tn</p>
                                            <p>contact@leadersholding.tn</p>
                                            {/* <p>helloyou@gmail.com</p> */}
                                        </div>
                                    </div>
                                </div> 
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <Image src={cnt3} alt=""/>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Appelez maintenant</h2>
                                            <p>+216 20 200 200</p>
                                            <p>+216 20 200 200</p>
                                            {/* <p>+1 800 123 654 987</p> */}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="wpo-contact-title">
                            <h2>Besoin d'aide ?</h2>
                            <p>Nous sommes là pour vous aider et répondre à toutes vos questions. N'hésitez pas à nous contacter ! </p>
                        </div>
                        <div className="wpo-contact-form-area">
                            <ContactForm/>
                        </div>
                    </div>                
                </div>
            </div> 
            <section className="wpo-contact-map-section">
                <div className="wpo-contact-map">
                <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.88904979324!2d10.280831076406109!3d36.845133165164384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4badf1c8d0bd%3A0xd5909ee45877f3c1!2sLEADERS%20IMMOBILIER!5e0!3m2!1sen!2stn!4v1732886874992!5m2!1sen!2stn"  aria-hidden="false"></iframe>
                </div>
            </section>
        </section>
     )
        
}

export default Contactpage;
