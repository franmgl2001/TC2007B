import PriorityChart from '../components/PriorityChart';
import GroupedClassroomBar from '../components/GroupedClassroomBar';
import IncidentLineChart from '../components/IncidentLineChart';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



export const ReportList = () => {
    const [Classification, setClassification] = useState("Categoría");

    return (
        <div>
            <h2>My Resource</h2>
            <select onChange={(e) => setClassification(e.target.value)}>
                <option value="Categoría">Categoría</option>
                <option value="Prioridad">Prioridad</option>
                <option value="Status">Status</option>
            </select>
            <IncidentLineChart />
            <GroupedClassroomBar dynamicValue={Classification} />
            <PriorityChart dynamicValue={Classification} />
        </div>
    );
};

