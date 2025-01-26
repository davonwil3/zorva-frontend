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
import GraphsPage from "./components/graphspage";

function Dashboard() {
    const [currentView, setCurrentView] = useState('datasets');

    const handleViewChange = (view: React.SetStateAction<string>) => {
        setCurrentView(view);
    };

    return (
        <div className="">
            <div className="flex flex-row w-full h-screen min-h-[812px]">
                {/* Sidebar Menu */}
                <div className="menu flex flex-col items-center h-screen w-[16%] min-w-[220px] bg-[#F9F9F9] fixed top-0 left-0 py-[5px] min-h-[812px]">
                    {/* Logo Section */}
                    <div className="flex items-center w-full h-[10%] px-[20px]">
                        <Link to="/" className="flex items-center space-x-2 lg:space-x-1 cursor-pointer">
                            <img
                                src="/assets/logosymbol.png"
                                alt="Logo image"
                                className="w-8 h-8 lg:w-[50px] lg:h-[50px]"
                            />
                            <p className="text-2xl font-semibold lg:text-2xl">Zorva</p>
                        </Link>
                    </div>

                    {/* Dashboard */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]" onClick={() => handleViewChange("dashboard")}>
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faHouse as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Dashboard</p>
                    </div>

                    {/* Upload */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]" onClick={() => handleViewChange("upload")}>
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faArrowUpFromBracket as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Upload</p>
                    </div>

                    {/* Datasets */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]" onClick={() => handleViewChange("datasets")}>
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faDatabase as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Datasets</p>
                    </div>

                    {/* Insights */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]" onClick={() => handleViewChange("insights")}>
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faLightbulbOn as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Insights</p>
                    </div>

                    {/* Graphs */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]" onClick={() => handleViewChange("graphs")}>
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faChartLineUp as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Graphs</p>
                    </div>

                    {/* Reports */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]">
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faFileChartPie as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Reports</p>
                    </div>

                    {/* Integrations */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]">
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faWrench as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Integrations</p>
                    </div>

                    {/* Settings */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]">
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faGear as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Settings</p>
                    </div>

                    {/* Help */}
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]">
                        <FontAwesomeIcon className="text-[21px] ml-[20px] mr-[13px] text-[#0C2F4A] group-hover:text-[#0C2F4A]" icon={faQuestion as IconProp} />
                        <p className="text-[13px] text-[#0C2F4A] text-center mt-[6.5px] font-light group-hover:text-[#0C2F4A]">Help</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center w-full bg-white ml-[16%] min-h-[812px]">
                    {currentView === 'upload' && <Upload />}
                    {currentView === 'datasets' && <DataSets />}
                    {currentView === 'insights' && <InsightsStaging />}
                    {currentView === 'graphs' && <GraphsPage />}
                </div>
            </div>
        </div >
    );
}

export default Dashboard;
