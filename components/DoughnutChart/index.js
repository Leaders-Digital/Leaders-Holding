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
                    'rgba(54, 162, 235, 0.8)', // Pôle immobilier
                    'rgba(75, 192, 192, 0.8)', // Gracia Services
                    'rgba(153, 102, 102, 0.8)', // Leaders import & export
                    'rgba(102, 51, 153, 0.8)', // Leaders business
                    'rgba(0, 0, 0, 0.8)',       // Leaders Fish
                    'rgba(255, 99, 132, 0.8)',  // Leaders Makeup
                    'rgba(54, 54, 235, 0.8)',   // Leaders digital
                    'rgba(255, 159, 64, 0.8)',  // IBC
                    'rgba(0, 255, 0, 0.8)'      // Leaders Travel
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

       
            <div className="container" style={{paddingTop:"90px"}}>
                <div className="row">
                    <div className="col-12">
                        <div className="wpo-section-title">
                            <span>Sociétés
                            Leaders Holding</span>
                            <h2>Par secteur</h2>
                        </div>
                    </div>
                </div>
       
                <Doughnut data={data} options={options} />
         
            </div>
     
    )



};

export default DoughnutChart;
