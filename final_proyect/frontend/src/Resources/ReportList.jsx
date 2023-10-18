import PriorityChart from '../components/PriorityChart';
import GroupedClassroomBar from '../components/GroupedClassroomBar';
import IncidentLineChart from '../components/IncidentLineChart';
import { List} from 'react-admin';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



export const ReportList = () => {
    const [Classification, setClassification] = useState("Categoría");

    return (
            <div>
                <h2>&nbsp;&nbsp;Reporte</h2>
                <select onChange={(e) => setClassification(e.target.value)}>
                    <option value="Categoría">Categoría</option>
                    <option value="Prioridad">Prioridad</option>
                    <option value="Status">Status</option>
                </select>
                
                <div>
                    
                    <GroupedClassroomBar dynamicValue={Classification} />
                    
                </div>
                <div>
                    <canvas height="50px"></canvas>
                        <PriorityChart dynamicValue={Classification} />   
                </div>
                <div>
                <canvas height="50px"></canvas>
                    <IncidentLineChart />
                </div>
            </div >
    );
};
