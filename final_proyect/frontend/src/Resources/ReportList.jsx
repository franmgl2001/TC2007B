import PriorityChart from '../components/PriorityChart';
import GroupedClassroomBar from '../components/GroupedClassroomBar';
import IncidentLineChart from '../components/IncidentLineChart';
import { List } from 'react-admin';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export const ReportTitle = () => {
    return (
        <List title="Reportes">
        </List>
    );
};

export const ReportList = () => {
    const [Classification, setClassification] = useState("Categoría");

    return (
        <div>
            <h2>&nbsp;&nbsp;Reportes</h2>
            <p>En esta sección se presenta un análisis visual de la creación de tickets en aulas, categorías y prioridades.
                Para poder llevar un seguimiento a través de tres gráficas interectivas, con las cuales poder comparar y comprender el flujo de tickets en función de diversas condiciones clave.</p><br />
            <select onChange={(e) => setClassification(e.target.value)}>
                <option value="Categoría">Categoría</option>
                <option value="Prioridad">Prioridad</option>
                <option value="Status">Estado</option>
            </select>

            <div>
                <GroupedClassroomBar dynamicValue={Classification} />
                <p>Gráfica de barras en donde se puede ver la comparación del número de tickets creados en las diferentes aulas, ya sea filtrando por categoría, prioridad o estado.</p>
            </div>

            <div>
                <canvas height="10px"></canvas>
                <PriorityChart dynamicValue={Classification} />
                <p>Gráfica de estilo "dona" para comparar la cantidad total del número de tickets sin necesidad de ser separado por aulas para llevar un control general. De igual manera se puede filtrar por categoría, prioridad o estado.</p>
            </div>
            <div>
                <canvas height="50px"></canvas>
                <IncidentLineChart />
                <p>Gráfica de líneas para comparar el número de tickets creados y resueltos en un periodo de tiempo, para poder llevar un seguimiento del flujo de tickets en función de las fechas de creación y resolución.</p>
            </div>
        </div >
    );
};
