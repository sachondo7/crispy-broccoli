import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var beneficios = [7200, 5612, 2032, 3226, 8320, 4210, 3230, 1230, 2235, 3210, 1232, 6120];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var misoptions = {
    responsive: true,
    animation: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            min: 0,
            max: 10000,
        },
        x: {
            ticks: { color: 'rgba(32, 114, 70)' }
        }
    }
};

var midata = {
    labels: meses,
    datasets: [
        {
            label: 'Monto Cotizaciones Emitidas en UF',
            data: beneficios,
            backgroundColor: 'rgba(32, 114, 70)'
        }
    ]
};

export default function BarsChart() {
    return <Bar data={midata} options={misoptions} />
}