import PriorityChart from '../components/PriorityChart';
import GroupedClassroomBar from '../components/GroupedClassroomBar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



export const ReportList = () => (
    <div>
        <h2>My Resource</h2>
        <GroupedClassroomBar />
        <PriorityChart />
    </div>
);

