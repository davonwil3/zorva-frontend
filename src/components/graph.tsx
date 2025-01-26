import React from "react";
import {
    Line,
    Bar,
    Pie,
    Radar,
    Scatter,
    Bubble,
    PolarArea,
    Doughnut,
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

// Register Chart.js components globally
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Graph( props: any) {
    const { type, data, options } = props;
    // Dynamically select the graph component based on the `type` prop
    const renderGraph = () => {
        switch (type) {
            case "line":
                return <Line data={data} options={options} />;
            case "bar":
                return <Bar data={data} options={options} />;
            case "pie":
                return <Pie data={data} options={options} />;
            case "radar":
                return <Radar data={data} options={options} />;
            case "scatter":
                return <Scatter data={data} options={options} />;
            case "bubble":
                return <Bubble data={data} options={options} />;
            case "polarArea":
                return <PolarArea data={data} options={options} />;
            case "doughnut":
                return <Doughnut data={data} options={options} />;
            default:
                return <p>Invalid graph type: {type}</p>;
        }
    };

    return <div className="graph-container">{renderGraph()}</div>;
}
