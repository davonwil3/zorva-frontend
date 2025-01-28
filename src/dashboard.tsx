import React, { useState } from "react";
import Upload from "./components/upload";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faChartLineUp, faDatabase, faFileChartPie } from '@fortawesome/pro-light-svg-icons';
import { faWrench } from '@fortawesome/pro-light-svg-icons';
import { faHouse } from '@fortawesome/pro-light-svg-icons';
import { faGear } from '@fortawesome/pro-light-svg-icons';
import { faQuestion } from "@fortawesome/pro-light-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLightbulbOn } from '@fortawesome/pro-light-svg-icons';
import DataSets from "./components/datasets";
import InsightsStaging from "./components/insightsstaging";
import { Link } from "react-router-dom";
import './index.css'
import GraphsStaging from "./components/graphsstaging";
import ManualData from "./components/manualdata";

function Dashboard() {
    const [currentView, setCurrentView] = useState('datasets');

    const handleViewChange = (view: React.SetStateAction<string>) => {
        setCurrentView(view);
    };

    return (
        <div className="">
            <div className="flex flex-row w-full h-screen min-h-[812px]">
                {/* Sidebar Menu */}
                <div className="menu flex flex-col items-center  h-screen w-[6%]  bg-[#F9F9F9] fixed top-0 left-0 py-[5px] min-h-[812px]">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center w-full ">
                        <Link to="/" className="flex items-center space-x-2 lg:space-x-1 cursor-pointer">
                            <img
                                src="/assets/logosymbol.png"
                                alt="Logo image"
                                className="w-8 h-8 lg:w-[50px] lg:h-[50px]"
                            />

                        </Link>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("dashboard")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faHouse as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Dashboard
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("upload")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faArrowUpFromBracket as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Upload
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("datasets")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faDatabase as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Datasets
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("insights")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faLightbulbOn as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Insights
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("graphs")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faChartLineUp as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Graphs
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("reports")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faFileChartPie as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Reports
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("integrations")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faWrench as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Integrations
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("settings")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faGear as IconProp} />
                            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Settings
                            </span>
                        </div>
                    </div>

                    <div className="group flex flex-row justify-center items-center w-full p-[9.5px] cursor-pointer relative" onClick={() => handleViewChange("help")}>
                        <div className="hover:bg-[#E3E3E3] p-2 px-4 rounded relative">
                            <FontAwesomeIcon className="text-[21px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faQuestion as IconProp} />
                            <span className="absolute bottom-full  mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                                Help
                            </span>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col justify-start items-center w-full bg-white ml-[5%] min-h-[812px] ">
                    {currentView === 'upload' && <Upload />}
                    {currentView === 'datasets' && <DataSets />}
                    {currentView === 'insights' && <InsightsStaging />}
                    {currentView === 'graphs' && <GraphsStaging />}
                    {currentView === 'manual' && <ManualData />}
                </div>
            </div>
        </div >
    );
}

export default Dashboard;
