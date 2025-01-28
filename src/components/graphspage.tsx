import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { faFile } from "@fortawesome/pro-light-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";
import FileExplorerModal from "./fileexplorermodal";
import CreateGraphModal from "./creategraphmodal";
import {
    Bar,
    Line,
    Pie,
    Doughnut,
    Radar,
    PolarArea,
    Scatter,
    Bubble,
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend
);


export default function GraphsPage() {

    const commonData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Sample Data",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const scatterData = {
        datasets: [
            {
                label: "Scatter Dataset",
                data: [
                    { x: 1, y: 1 },
                    { x: 2, y: 4 },
                    { x: 3, y: 9 },
                    { x: 4, y: 16 },
                    { x: 5, y: 25 },
                ],
                backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
        ],
    };

    const bubbleData = {
        datasets: [
            {
                label: "Bubble Dataset",
                data: [
                    { x: 5, y: 10, r: 10 },
                    { x: 15, y: 5, r: 15 },
                    { x: 20, y: 7, r: 7 },
                    { x: 25, y: 12, r: 12 },
                ],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    // pie data
    const pieData = {

        "labels": ["Charlie", "Mac", "Dennis", "Dee"],
        "datasets": [
            {
                "label": "Operator Job Distribution",
                "data": [6, 4, 4, 3],
                "backgroundColor": [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)"
                ],
                "hoverBackgroundColor": [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)"
                ]
            }
        ]
    }

    // bar data
    const barData = {
        "labels": ["Dee", "Charlie", "Mac", "Dennis"],
        "datasets": [{
            "label": "Number of Batches",
            "data": [11, 8, 7, 7],
            "backgroundColor": "rgba(75, 192, 192, 0.2)",
            "borderColor": "rgba(75, 192, 192, 1)",
            "borderWidth": 1
        }]
    }

    const chartTypes = [
        { component: <Bar data={barData} />, name: "Bar Chart" },
        { component: <Line data={commonData} />, name: "Line Chart" },
        { component: <Pie data={pieData} />, name: "Pie Chart" },
        { component: <Doughnut data={commonData} />, name: "Doughnut Chart" },
        { component: <Radar data={commonData} />, name: "Radar Chart" },
        { component: <PolarArea data={commonData} />, name: "Polar Area Chart" },
        { component: <Scatter data={scatterData} />, name: "Scatter Chart" },
        { component: <Bubble data={bubbleData} />, name: "Bubble Chart" },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoredFiles, setSelectedStoredFiles] = useState<{ fileID: string; filename: string }[]>([]);
    const [graphmodalOpen, setGraphModalOpen] = useState(false);
    const [createdCharts, setCreatedCharts] = useState<any[]>([]);

    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid || "";


    // Remove a file from the selected list
    const removeSelectedFile = (fileID: string) => {
        setSelectedStoredFiles((prevFiles) => prevFiles.filter((file) => file.fileID !== fileID));
    };

    // Handle file selection
    const handleFileExplorerSelect = (fileData: { fileID: string; filename: string }[]) => {
        console.log("Stored files selected:", fileData);
        setSelectedStoredFiles((prevFiles) => [...prevFiles, ...fileData]);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openGraphModal = () => {
        setGraphModalOpen(true);
    }

    useEffect(() => {
        console.log("Created Charts:", createdCharts);
    }, [createdCharts]);
    // display graphs
    const displayGraph = (chartType: string, chartData: any) => {
        console.log("displayGraph called with:", chartType, chartData);
        // Basic validation
        if (!chartData || typeof chartData !== "object") {
            console.error("Invalid data provided for the chart:", chartData);
            return;
        }

        console.log("Chart Data:", chartData);

        // Instead of storing a React element, store a configuration object
        setCreatedCharts(prevCharts => [
            ...prevCharts,
            { type: chartType, data: chartData }
        ]);
    };

    const chartSections = createdCharts.map((chartObj, index) => {
        const { type, data } = chartObj;

        // Optional: safeguard check before rendering
        if (!data?.datasets) {
            console.warn("Data is missing datasets:", data);
            return null;
        }

        console.log("createdCharts in render:", createdCharts);

        return (
            <div
                key={index}
                className="group h-80 p-4 border border-gray-200 rounded-lg flex flex-col items-center hover:scale-105 transition-transform"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full">
                        {(() => {
                            switch (type) {
                                case "Line":
                                    return <Line data={data} />;
                                case "Bar":
                                    return <Bar data={data} />;
                                case "Pie":
                                    return <Pie data={data} />;
                                case "Doughnut":
                                    return <Doughnut data={data} />;
                                case "Radar":
                                    return <Radar data={data} />;
                                case "Polar Area":
                                    return <PolarArea data={data} />;
                                case "Scatter":
                                    return <Scatter data={data} />;
                                case "Bubble":
                                    return <Bubble data={data} />;
                                default:
                                    // Fallback chart if `type` doesn't match
                                    return <Line data={data} />;
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    });


    return (
        <div className="flex flex-col w-full h-full  p-6 px-16 ">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-4">Graph Creation</h2>
            <p className="text-gray-600 mb-6">Select a file to generate data-driven graphs</p>
            <div className="flex items-center justify-between mb-6">
                {/* Upload File Button and Label */}
                <div className="flex items-center">
                    <button
                        onClick={openModal}
                        className="relative flex items-center justify-center w-20 h-20 bg-white rounded shadow hover:bg-gray-100 transition border border-gray-200"
                    >
                        <FontAwesomeIcon icon={faFile as IconProp} size="3x" className="text-gray-500" />
                        <div className="absolute bottom-0 right-0 rounded-full">
                            <FontAwesomeIcon icon={faCirclePlus as IconProp} size="2x" className="text-blue-700" />
                        </div>
                    </button>
                    <span className="ml-4 text-gray-700">Add a file</span>
                </div>

                {/* Generate Button */}
                <button
                    onClick={openGraphModal}
                    className="px-8 py-3 rounded shadow text-white ml-auto bg-blue-600 hover:bg-blue-700 transition"
                >
                    Create a Graph
                </button>
            </div>
            {/* Selected Stored Files List */}
            <div className="flex flex-row  w-full space-x-2 mb-6">
                {selectedStoredFiles.map((file) => (
                    <div
                        key={file.fileID}
                        className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-2"
                    >
                        <div className="file-info flex items-center">
                            <FontAwesomeIcon icon={faFile as IconProp} className="text-pink-500 text-[22px] mr-2" />
                            <div>
                                <p className="text-sm font-medium">{file.filename}</p>
                            </div>
                        </div>
                        <FontAwesomeIcon
                            icon={faTimesCircle as IconProp}
                            className="text-gray-500 hover:text-red-500 cursor-pointer text-[18px] ml-2"
                            onClick={() => removeSelectedFile(file.fileID)}
                        />
                    </div>
                ))}
            </div>

            {/* Graphs Section */}
            <div className="w-full flex-grow bg-white rounded-lg border border-gray-300 p-4">
                <div className="grid grid-cols-3 gap-4 h-full">
                    
                    {chartSections}
                </div>
            </div>

            {/* File Explorer Modal */}
            <FileExplorerModal
                open={isModalOpen}
                onClose={closeModal}
                onFileSelect={handleFileExplorerSelect}
                firebaseUid={firebaseUid}
            />

            {/* Graph creation Modal */}
            <CreateGraphModal
                isOpen={graphmodalOpen}
                firebaseUid={firebaseUid}
                onClose={() => {
                    setGraphModalOpen(false);

                }}
                selectedStoredFiles={selectedStoredFiles}
                displayGraph={displayGraph}
            />


        </div>
    );
}