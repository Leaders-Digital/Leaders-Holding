import React from "react";

const TimelineSlider = () => {
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-12">
                    <div className="wpo-section-title">
                        <span>Notre Histoire</span>
                        <h2>En Quelques dates</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="horizontal-timeline">
                        <ul className="list-inline items">
                            {[
                                {
                                    year: "2019",
                                    title: "CRÉATION DE SOCIÉTÉ",
                                    items: ["Leaders Immobilier"],
                                },
                                {
                                    year: "2020",
                                    title: "CRÉATION DE SOCIÉTÉ",
                                    items: [
                                        "Négoce Immobilier",
                                        "Portail Immobilier",
                                        "Leaders Digital",
                                        "Leaders Fish",
                                    ],
                                },
                                {
                                    year: "2021",
                                    title: "CRÉATION DE SOCIÉTÉ",
                                    items: ["Le Coin Immobilier", "Leaders Building"],
                                },
                                {
                                    year: "2022",
                                    title: "CRÉATION DE SOCIÉTÉ",
                                    items: [
                                        "Inna Immobilier",
                                        "Sté de Promotion Immobilière ben Ismail",
                                        "Leaders Business",
                                    ],
                                },
                                {
                                    year: "2023",
                                    title: "CRÉATION DE SOCIÉTÉ",
                                    items: [
                                        "Leaders Makeup",
                                        "Gracia Immobilier",
                                        "Leaders imports et Exports",
                                        "Gracia Service",
                                    ],
                                },
                                {
                                    year: "2024",
                                    title: "CRÉATION DE SOCIÉTÉ",
                                    items: [
                                        "Leaders Travel",
                                        
                                    ],
                                },
                            ].map(({ year, title, items }) => (
                                <li className="list-inline-item items-list" key={year}>
                                    <div className="px-4">
                                        <div className="event-date badge" style={{marginTop:"10px"}}>{year}</div>
                                        <h5 className="pt-2">{title}</h5>
                                        <ul className="text-muted">
                                            {items.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineSlider;
