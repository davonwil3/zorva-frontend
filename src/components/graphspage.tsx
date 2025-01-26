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


export default function GraphsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoredFiles, setSelectedStoredFiles] = useState<{ fileID: string; filename: string }[]>([]);
    const [graphmodalOpen, setGraphModalOpen] = useState(false);

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
    return (
        <div className="flex flex-col w-full h-full  p-6 px-12 ">
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
            <div className="flex flex-col w-full border-t border-gray-300 flex-1 min-h-[550px]">
                <p className="text-gray-600 mb-4">Graphs will be displayed here</p>
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
            />


        </div>
    );
}