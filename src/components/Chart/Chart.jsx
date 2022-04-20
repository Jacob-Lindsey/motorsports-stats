import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

import styles from "./Chart.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const Chart = () => {

    const options = {
        plugins: {
            legend: {
                labels: { color: 'rgb(217, 217, 217)' },
            },
            title: {
                color: 'rgb(217, 217, 217)',
                display: true,
                text: 'Sample Data',
            },
            zoom: {
                enabled: true,
                drag: true,
                speed: 0.1,
                threshold: 2,
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(217, 217, 217, 0.175)' },
                ticks: { color: 'rgb(217, 217, 217)' },
            },
            y: {
                grid: { color: 'rgba(217, 217, 217, 0.175)' },
                ticks: { color: 'rgb(217, 217, 217)' },
            },
        },
    };

    const labels = [];
    const data1 = [];
    const data2 = [];

    // Populate arrays with sample data points
    for (let i=1; i<27; i++) {
        labels.push(`Week ${i}`);
        data1.push(Math.floor(Math.random() * (1000*i)));
        data2.push(Math.floor(Math.random() * (1000*i)));
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: data1,
                borderColor: 'rgb(235, 125, 15)',
                backgroundColor: 'rgba(235, 125, 15, 0.5)',
                lineTension: 0.04,
            },
            {
                label: 'Dataset 2',
                data: data2,
                borderColor: 'rgb(123, 109, 242)',
                backgroundColor: 'rgba(123, 109, 242, 0.5)',
                lineTension: 0.04,
            },
        ]
    }

    return (
        <div className={styles.container}>
            <Line options={options} data={data} />
        </div>
    )

};

export default Chart;