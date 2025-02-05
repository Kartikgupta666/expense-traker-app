import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Graph = ({amount , date}) => {
    const data = {
        labels: date,
        datasets: [
            {
                label: "Price (₹)",
                data: amount,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: "Date", color: "#333" } },
            y: { title: { display: true, text: "Price (₹)", color: "#333" } },
        },
        plugins: {
            legend: { display: true },
        },
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[600px] mx-auto">
            <h3 className="text-xl font-semibold text-center mb-4">Expense Graph</h3>
            <div className="h-80">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Graph;
