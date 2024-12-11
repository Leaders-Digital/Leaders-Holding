import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { height } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const data = {
        labels: [
            'Pôle immobilier',
            'Gracia Services',
            'Leaders import & export',
            'Leaders business',
            'Leaders Fish',
            'Leaders Makeup',
            'Leaders digital',
            'IBC',
            'Leaders Travel'
        ],
        datasets: [
            {
                data: [47.2, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.5, 6.5],
                backgroundColor: [
                    'rgba(191, 144, 67, 0.8)',  // Original base color
                    'rgba(202, 153, 83, 0.8)', // Slightly lighter gradient
                    'rgba(213, 162, 99, 0.8)', // Further lighter
                    'rgba(224, 172, 115, 0.8)', // Moving towards light gold
                    'rgba(235, 181, 131, 0.8)', // Golden tone
                    'rgba(246, 190, 147, 0.8)', // Softer light gradient
                    'rgba(191, 122, 51, 0.8)',  // Darker gradient below base
                    'rgba(166, 104, 43, 0.8)',  // Deep brown
                    'rgba(141, 87, 36, 0.8)'    // Rich dark tone
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',

            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                    },
                },
            },
        },
    };

    return (


        <div className="container" >
            <div className="row">
                <div className="col-12">
                    <div className="wpo-section-title">
                        {/* <span>Sociétés
                            Leaders Holding</span>
                        <h2>Par secteur</h2> */}
                    </div>
                </div>
            </div>

            <div className="row" style={{display:"flex" , alignItems:"center"}}>
                <div class="col-12 col-lg-6">

                    <div className="wpo-about-text">
                       
                        <div className="wpo-about-icon-content">
                            <h2>Répartition des Sociétés <span>Leaders Holding</span> par Secteur</h2>
                            <p>
                                Cette infographie présente la répartition des sociétés de Leaders Holding selon leur secteur d'activité. Le secteur dominant est le Pôle immobilier, représentant 47,2 % des activités. Les autres secteurs sont répartis de manière équitable à hauteur de 6,6 %, incluant les domaines suivants : Gracia Services, Leaders Import & Export, Leaders Digital, Leaders Makeup, Leaders Business, Leaders Fish, IBC, et Leaders Travel.
                            </p>


                        </div>
                    </div>

                </div>
                <div class="col-12 col-lg-6"> <Doughnut data={data} options={options} /></div>
            </div>



        </div>

    )



};

export default DoughnutChart;
