import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileExplorerModal from "./fileexplorermodal";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { faFile } from "@fortawesome/pro-light-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";



export default function QuickInsights() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [files, setFiles] = useState([{ name: "" }]);
    const [insights, setInsights] = useState([{ title: "", description: "" }]);
    const [isGenerating, setIsGenerating] = useState(false);

    const auth = getAuth(app);
    const firebaseUid = auth.currentUser?.uid;

    // Open the file explorer modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close the file explorer modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle file selection
    const handleFileSelect = (selectedFiles: any) => {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        closeModal();
    };

    // Generate insights by calling the backend
    const generateInsights = async () => {
        if (files.length === 0) {
            alert("Please upload at least one file to generate insights.");
            return;
        }

        setIsGenerating(true);

        try {
            const response = await fetch("/api/generate-insights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ files }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate insights");
            }

            const data = await response.json();
            setInsights(data.insights); // Assuming the backend returns { insights: [...] }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col w-full h-full p-6 ">
            {/* Top Row: Upload and Generate Buttons */}
            <div className="flex items-center justify-between mb-6">
                {/* Upload File Button */}
                <button
                    onClick={openModal}
                    className="relative flex items-center justify-center w-20 h-20 bg-white  rounded shadow hover:bg-gray-100 transition border border-gray-200"
                >
                    <FontAwesomeIcon icon={faFile as IconProp} size="3x" className="text-gray-500" />
                    <div className="absolute bottom-0 right-0  rounded-full ">
                        <FontAwesomeIcon icon={faCirclePlus as IconProp} size="2x" className="text-blue-700" />
                    </div>
                </button>

                {/* Generate Button */}
                <button
                    onClick={generateInsights}
                    className={`px-8 py-3 rounded shadow text-white ${isGenerating
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 transition"
                        }`}
                    disabled={isGenerating}
                >
                    {isGenerating ? "Generating..." : "Generate"}
                </button>
            </div>

            {/* Files List */}
            {files.length > 0 && (
                <div className="flex space-x-4 mb-6 overflow-x-auto">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center px-4 py-2 bg-white rounded shadow hover:shadow-md transition"
                        >
                            <FontAwesomeIcon icon={ faFile as IconProp} className="text-gray-500 mr-2" />
                            <span className="text-gray-700 truncate">{file.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Insights Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.length > 0 ? (
                    insights.map((insight, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
                        >
                            <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                            <p className="text-gray-600">{insight.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full">
                        {isGenerating
                            ? "Generating insights..."
                            : "No insights to display. Upload files and generate insights."}
                    </p>
                )}
            </div>

            {/* File Explorer Modal */}
            <FileExplorerModal
                open={isModalOpen}
                onClose={closeModal}
                onFileSelect={handleFileSelect}
                firebaseUid= {firebaseUid}
      />
        </div>
    );
}
