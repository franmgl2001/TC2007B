import PriorityChart from '../components/PriorityChart';
import GroupedClassroomBar from '../components/GroupedClassroomBar';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



export const ReportList = () => {
    const [Classification, setClassification] = useState("Categoría");

    return (
        <div>
            <h2>My Resource</h2>
            <GroupedClassroomBar dynamicValue={Classification} />
            <PriorityChart dynamicValue={Classification} />
        </div>
    );
};

