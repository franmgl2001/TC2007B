import { React, useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const GroupedClassroomBar = ({ dynamicValue }) => {
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
        maintainAspectRatio: true,
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
        const apiUrl = `https://localhost:3011/report/classroom/${dynamicValue}`;
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
                    'rgba(255, 152, 121, 0.7)', // 
                    'rgba(93, 178, 173, 0.7)',
                    'rgba(166, 192, 128, 0.7)', 
                    'rgba(221, 119, 128, 0.7)', 
                    'rgba(255, 116, 127, 0.7)', 
                    'rgba(255, 191, 104, 0.7)', 
                    'rgba(214, 202, 117, 0.7)', 
                    'rgba(170, 142, 198, 15)', 
                    'rgba(107, 144, 163, 0.7)' 
                ]
                let colorIndex = 0;
                // Prepare data here (as shown in previous examples) and set it in state
                let data = { labels: [], datasets: [], backgroundColor: [] }
                // Set data labels to report data keys
                data.labels = response.data.labels;
                // Set data values to report data values
                Object.keys(response.data.datasets).forEach(element => {
                    data.datasets.push({

                        label: element
                        , data: response.data.datasets[element]
                        , backgroundColor: colors[colorIndex]
                    })
                    colorIndex++;
                });
                data["backgroundColor"] = [
                    'rgba(53, 62, 25, 0.6)',     // Low
                    'rgba(54, 162, 235, 0.6)',   // Medium
                    'rgba(255, 99, 132, 0.6)',   // High

                ]
                setChartData(data);
            })

            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [dynamicValue]);




    return (
        <div >
            <Bar options={options} data={chartData} />
        </div>
    )


}


export default GroupedClassroomBar;