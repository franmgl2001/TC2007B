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
        responsive: true
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

                console.log(response.data.dataInc);
                console.log(response.data.dataRes);
                // Data for the first line
                const data1 = {
                    id: '1',
                    label: 'Issued Tickets',
                    data: response.data.dataInc,
                    borderColor: colors[0],
                    backgroundColor: colors[0],
                };

                // Data for the second line
                const data2 = {
                    id: '2',
                    label: 'Resolved Tickets',
                    data: response.data.dataRes,
                    borderColor: colors[1],
                    backgroundColor: colors[1],
                };


                setChartData({
                    labels: response.data.labels, // You can use the common labels here
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
