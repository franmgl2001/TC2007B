import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const PriorityChart = ({ dynamicValue }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Priority',
                data: [],
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

    const authToken = localStorage.getItem('auth');
    const apiUrl = `http://localhost:3011/report/pie/${dynamicValue}`;
    useEffect(() => {
        // Make an API request using Axios
        axios.get(apiUrl, {
            headers: {
                authentication: `${authToken}`,
                ContentType: 'application/json',
            },
        })
            .then(response => {
                // Prepare data here (as shown in previous examples) and set it in state
                let data = {
                    labels: [],
                    datasets: [
                        {
                            label: dynamicValue,
                            data: [],
                            backgroundColor: [
                                'rgba(255, 152, 121, 0.7)',
                                'rgba(93, 178, 173, 0.7)',
                                'rgba(166, 192, 128, 0.7)', 
                                'rgba(221, 119, 128, 0.7)', 
                                'rgba(255, 116, 127, 0.7)', 
                                'rgba(255, 191, 104, 0.7)', 
                                'rgba(214, 202, 117, 0.7)', 
                                'rgba(170, 142, 198, 15)', 
                                'rgba(107, 144, 163, 0.7)' 


                            ],
                            borderColor: [
                                'rgba(255, 152, 121, 0.9)', // Border Color for Orange
                                'rgba(93, 178, 173, 0.9)', // Border Color for Teal
                                'rgba(166, 192, 128, 0.9)', // Border Color for Green
                                'rgba(221, 119, 128, 0.9)', // Border Color for Red
                                'rgba(255, 116, 127, 0.9)', // Border Color for Pink
                                'rgba(255, 191, 104, 0.9)', // Border Color for Yellow
                                'rgba(214, 202, 117, 0.9)', // Border Color for Pale Yellow
                                'rgba(170, 142, 198, 0.9)', // Border Color for Purple
                                'rgba(107, 144, 163, 0.9)' // Border Color for Blue


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
    }, [dynamicValue]);


    return (
        <div style={{width:'40%', margin: 'auto'}}>
            <Doughnut
                data={chartData}
                options={{
                    radius: '100%',
                    maintainAspectRatio: true,
                    responsive: true, 
                }}
            />
        </div>
    );
}


export default PriorityChart;