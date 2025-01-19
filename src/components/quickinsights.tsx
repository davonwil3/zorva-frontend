import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileExplorerModal from "./fileexplorermodal";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { faFile } from "@fortawesome/pro-light-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";

export default function QuickInsights() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStoredFiles, setSelectedStoredFiles] = useState<
    { fileID: string; filename: string }[]
  >([]);
  const [insights, setInsights] = useState<{ title: string; description: string }[]>([]);
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
  const handleFileExplorerSelect = (fileData: { fileID: string; filename: string }[]) => {
    console.log("Stored files selected:", fileData);
    setSelectedStoredFiles((prevFiles) => [...prevFiles, ...fileData]);
  };

  // Remove a file from the selected list
  const removeSelectedFile = (fileID: string) => {
    setSelectedStoredFiles((prevFiles) => prevFiles.filter((file) => file.fileID !== fileID));
  };

  // Generate insights by calling the backend
const generateInsights = async () => {
  if (selectedStoredFiles.length === 0) {
    alert("Please upload at least one file to generate insights.");
    return;
  }

  setIsGenerating(true);

  try {
    // Extract only file IDs from the selectedStoredFiles
    const fileIDs = selectedStoredFiles.map((file) => file.fileID);

    // Make a POST request to the backend with the file IDs
    const response = await fetch("http://localhost:10000/api/generateInsights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid, fileIDs }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate insights. Please try again.");
    }

    // Parse the response data
    const data = await response.json();
    const rawData = data.response;
  

    // Use a regular expression to extract the JSON array
    const jsonMatch = rawData.match(/\[([\s\S]*?)\]/); // Matches anything between "[" and "]" including multiline
    if (!jsonMatch) {
      throw new Error("Unable to parse insights: No valid JSON array found.");
    }
  
    // Parse the extracted JSON string
    const insights = JSON.parse(jsonMatch[0]);
    setInsights(insights);
    console.log(insights);

    // Clear selected files after generating insights
    setSelectedStoredFiles([]);

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred.");
    }
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="flex flex-col w-full h-full  p-6 px-12">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4">Quick Insights</h2>
      <p className="text-gray-600 mb-6">Generate quick insights from your files</p>

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
          onClick={generateInsights}
          className={`px-8 py-3 rounded shadow text-white ml-auto ${isGenerating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
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

     {/* Insights Dashboard */}
<div className="relative w-full flex-1 min-h-[550px] ">
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
      // Overlay for no insights
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
        <div className="text-center">
          <img
            src="/assets/woman-insights.png"
            alt="No Insights"
            className="mx-auto mb-4 w-[40%] h-auto"
          />
          <h3 className="text-white text-3xl font-semibold mb-2">
            No insights yet
          </h3>
          <p className="text-gray-300">
            Add files to generate meaningful insights.
          </p>
        </div>
      </div>
    )}
  </div>
</div>


      {/* File Explorer Modal */}
      <FileExplorerModal
        open={isModalOpen}
        onClose={closeModal}
        onFileSelect={handleFileExplorerSelect}
        firebaseUid={firebaseUid}
      />
    </div>

  );
}
