import React from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const PriorityChart = ({ }) => {
    const [chartData, setChartData] = useState({
        labels: ["Alta", "Baja"],
        datasets: [
            {
                label: 'Priority',
                data: [1, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ]
    });

    useEffect(() => {
        // Make an API request using Axios
        axios.get('https://localhost:3011/report/priority')
            .then(response => {
                // Prepare data here (as shown in previous examples) and set it in state
                let data = {
                    labels: [],
                    datasets: [
                        {
                            label: 'Priority',
                            data: [],
                            backgroundColor: [
                                'rgba(53, 62, 25, 0.6)',     // Low
                                'rgba(54, 162, 235, 0.6)',   // Medium
                                'rgba(255, 99, 132, 0.6)',   // High


                            ],
                            borderColor: [
                                'rgba(53, 62, 25, 1)',       // Low border color
                                'rgba(54, 162, 235, 1)',     // Medium border color
                                'rgba(255, 99, 132, 1)',     // High border color


                            ],
                            borderWidth: 1,
                        },
                    ]
                };
                // Set data labels to report data keys
                data.labels = Object.keys(response.data);
                // Set data values to report data values
                data.datasets[0].data = Object.values(response.data);
                setChartData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div style={{ width: '200px', height: '200px' }}>
            <Pie
                data={chartData}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                }}


            />
        </div>
    );
}


export default PriorityChart;