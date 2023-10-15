import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, PointElement, LineElement);

const IncidentLineChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Resumen de Aulas',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    useEffect(() => {
        const apiUrl = 'https://localhost:3011/report/incidents'; // Updated URL without dynamicValue
        const authToken = localStorage.getItem('auth');

        // Make an API request using Axios
        axios.get(apiUrl, {
            headers: {
                authentication: `${authToken}`,
                ContentType: 'application/json',
            },
        })
            .then(response => {
                const colors = [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6',
                    'rgba(53, 62, 25, 0.6',
                ];

                // Data for the first line
                const data1 = {
                    label: 'label_inc',
                    data: [1, 22, 3, 44, 35, 6, 7],
                    borderColor: colors[0],
                    backgroundColor: colors[0],
                };

                // Data for the second line
                const data2 = {
                    label: 'label_res',
                    data: [1, 2, 3, 4, 5, 6, 7],
                    borderColor: colors[1],
                    backgroundColor: colors[1],
                };

                setChartData({
                    labels: response.data.label_inc, // You can use the common labels here
                    datasets: [data1, data2], // Combine both datasets
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <Line options={options} data={chartData} />
        </div>
    );
};

export default IncidentLineChart;
