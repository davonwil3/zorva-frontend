import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { app } from "../index";
import { faFile } from "@fortawesome/pro-light-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";


export default function GraphsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    return (
        <div className="flex flex-col w-full h-full  p-6 px-12 pt-[50px]">
            {/* Heading */}
            <div className="flex flex-row w-full items-start">
                <div className="flex flex-col pt-[8px]">
                    <h2 className="text-2xl font-semibold mb-4">Graph Creation</h2>
                    <p className="text-gray-600 mb-6">Select a file to generate data-driven graphs</p>
                </div>
                <div className="flex items-center ml-auto">
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
            </div>
            {/* Graphs Section */}
            <div className="flex flex-col w-full h-full mt-6 border-t border-gray-300 rounded-md p-4">
                <p className="text-gray-600 mb-4">Graphs will be displayed here</p>
            </div>


        </div>
    );
}