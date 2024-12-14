import React, { useState } from 'react';
import Image from 'next/image';
import logodigital from '../../public/images/logo/digital.png';
import logomakeup from '../../public/images/logo/makeup.png';
import logoimmo from '../../public/images/logo/immo.png';
import logobuilding from '../../public/images/logo/building.png';
import logobusiness from '../../public/images/logo/business.png';
import logoimporter from '../../public/images/logo/import.png';
import logofish from '../../public/images/logo/fish.png';
import logotravel from '../../public/images/logo/travel.png';


const ListeEntreprise = () => {
    const [selectedFiliale, setSelectedFiliale] = useState(null);

    const filiales = [

        {
            name: "Leaders Building",
            logo: logobuilding,
            description: "Experte dans le domaine de la construction de bâtiments résidentiels, commerciaux et industriels, notre entreprise garantit la qualité en matière de durabilité, de conformité aux normes appliquées ainsi que la sécurité. Nous proposons des prix étudiés et très compétitifs. Nous offrons une large gamme de services incluant l'étude de projet, la construction et la réhabilitation, la gestion et la supervision, ainsi que le conseil et l'expertise technique.",
            contact: {
                telephone: "+216 27246345",
                email: "leadersbuilding22@gmail.com",
                address: "Tunis - Kélibia - Hammamet",
                website:"https://leaders-building.com/"
            }
        },
        {
            name: "Leaders Makeup",
            logo: logomakeup,
            description: "Leaders Makeup est une entreprise spécialisée dans le domaine de la cosmétique, offrant une vaste gamme de produits axés sur la beauté, incluant soins de la peau, maquillage et produits capillaires. Distributeur exclusif de la marque Wakeup Cosmetics Milano en Tunisie et en Afrique, elle propose une sélection diversifiée de marques et de produits pour répondre aux besoins et aux préférences de sa clientèle.",
            contact: {
                telephone: "+216 26644400",
                email: "Contact@leaders-makeup.com",
                address: "Cité des Pins, Les berges du lac 2  1053 Tunis, Tunisie",
                 website:"https://wakeup-cosmetics.tn/"
            }
        },
        {
            name: "Leaders immobilier",
            logo: logoimmo,
            description: "Le réseau de LEADERS IMMOBILIER s'étend sur 6 agences en Tunisie et en Italie, couvrant tous types de biens immobiliers. Il se distingue par son expertise, son professionnalisme et son engagement à garantir la sécurité dans le domaine de l'immobilier. LEADERS IMMOBILIER propose les meilleures opportunités adaptées à vos besoins, avec une attention particulière portée à la satisfaction des clients.",
            contact: {
                telephone: "+216 27246300",
                email: "Contact@leadersimmo.com",
                address: "Lac 2 - Aouina - Hammamet - Mrezga - Kélibia - Milano",
                website: "https://leaders-immo.com/"
            }
        },
        {
            name: "Leaders Digital",
            logo: logodigital,
            description: "Société de communication spécialisée dans le domaine du marketing, nous élaborons des plans de communication sur mesure en accord avec les objectifs de nos clients, afin d'accroître leur visibilité et leur notoriété. Grâce à une équipe dynamique, créative et innovante, nous apportons des solutions originales et avant-gardistes pour relever les défis spécifiques de chaque client.",
            contact: {
                telephone: "+216 27246370",
                email: "leaders-digital2021@gmail.com",
                address: "Lac 2,  Hammamet",
                website: "https://leaders-digital.com/"
            }
        },
        {
            name: "Leaders Business",
            logo: logobusiness,
            description: "Société de conseil en stratégie et management, nous intervenons dans divers secteurs pour assister et accompagner les entreprises dans l’élaboration de stratégies spécifiques et personnalisées, adaptées à leurs besoins et à leurs secteurs d’activité. Nous œuvrons pour améliorer les performances des établissements et les aider à s’adapter à des environnements complexes. Notre mission est de garantir une transformation durable et une croissance continue de l’activité de nos clients.",
            contact: {
                telephone: "+216 27360020",
                email: "leadersbusiness23@gmail.com",
                address: "Cité des Pins, Les berges du lac 2  1053 Tunis, Tunisie",
                website: "https://leaders-business.com/"
            }
        },
        {
            name: "Leaders import et export",
            logo: logoimporter,
            description: "Nous offrons des solutions complètes pour faciliter les échanges commerciaux internationaux grâce à notre expertise approfondie en matière de réglementations internationales. Nous garantissons des opérations commerciales efficaces et conformes aux normes en vigueur, assurant ainsi le succès et la fluidité des transactions de nos clients.",
            contact: {
                telephone: "+216 267246300",
                email: "",
                address: "Cité des Pins, Les berges du lac 2  1053 Tunis, Tunisie",
                website: "https://www.leadersimportexport.com/"
            }
        },
        {
            name: "Leaders fish",
            logo: logofish,
            description: "Leaders Fish est spécialisée dans la vente en gros, au détail et la distribution de poissons, crustacés, mollusques et fruits de mer. Elle propose des produits frais, surgelés, sauvages ou élevés avec des emballages adaptés. Ses clients sont des importateurs et acheteurs en restauration, industrie alimentaire, commerce de gros et vente au détail.",
            contact: {
                telephone: "",
                email: "",
                address: "",
                
            }
        },
        
        {
            name: "Leaders travel",
            logo: logotravel,
            description: "Leaders Travel est une agence de voyage spécialisée dans le tourisme, les loisirs et le divertissement, offrant des expériences sur mesure pour répondre aux envies de ses clients. Elle organise des séjours et des excursions en Tunisie et à l'étranger, pour des vacances, événements ou escapades culturelles, afin de créer des moments uniques et inoubliables.",
            contact: {
                telephone: "",
                email: "",
                address: ""
            }
        }

    ];

    const openModal = (filiale) => {
        setSelectedFiliale(filiale);
    };

    const closeModal = () => {
        setSelectedFiliale(null);
    };

    return (
        <section className="wpo-service-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="wpo-section-title">
                            <span>Nos filiales</span>
                            <h2>Découvrez nos filiales</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {filiales.map((filiale, index) => (
                        <div className="col-lg-4 col-md-6 col-12" key={index}>
                            <div
                                className="wpo-service-item"
                                style={{

                                    padding: '15px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div className="wpo-service-text" style={{ flex: '1' }}>
                                    <h2>{filiale.name}</h2>
                                    <p>{filiale.description.slice(0, 100)}...</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openModal(filiale)}
                                        style={{
                                            marginTop: '10px',
                                            backgroundColor: '#BF9043',
                                            color: 'black',
                                            padding: '5px 10px',
                                            fontSize: '12px',
                                            border: '1px solid #BF9043',
                                            borderRadius: '4px',
                                            color: 'white',
                                        }}
                                    >
                                        En savoir plus
                                    </button>

                                </div>
                                <div className="wpo-service-icon" style={{ flexShrink: '0', marginLeft: '10px' }}>
                                    <Image src={filiale.logo} alt={filiale.name} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedFiliale && (
                    <div className="modal" style={modalStyles}>
                        <div className="modal-content" style={modalContentStyles}>
                            <span
                                className="close"
                                onClick={closeModal}
                                style={closeButtonStyles}
                            >
                                &times;
                            </span>
                            <h2>{selectedFiliale.name}</h2>
                            <Image
                                src={selectedFiliale.logo}
                                alt={selectedFiliale.name}
                                width={100}
                                height={100}
                                style={{ alignSelf: "center" }}
                            />
                            <p>{selectedFiliale.description}</p>
                            <div>
                                <h3>Contact Information:</h3>
                                <p><strong>Telephone:</strong> {selectedFiliale.contact.telephone}</p>
                                <p><strong>Email:</strong> {selectedFiliale.contact.email}</p>
                                <p><strong>Address:</strong> {selectedFiliale.contact.address}</p>
                                <p><strong>Site web:</strong> <a href={selectedFiliale.contact.website}>{selectedFiliale.contact.website}</a></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
};

const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center"
};

const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "20px",
    fontSize: "1.5rem",
    cursor: "pointer"
};

export default ListeEntreprise;
