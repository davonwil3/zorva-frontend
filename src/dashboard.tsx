import React, { useState } from "react";
import './css/app.css';
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
import Insights from "./components/insights";
import './index.css'

function Dashboard() {
    const [currentView, setCurrentView] = useState('datasets');

    const handleViewChange = (view: React.SetStateAction<string>) => {
        setCurrentView(view);
    };

    return (
        <div className="app-page">
            <div className="dashboard-view">
                <div className="flex flex-col items-center h-full w-[16%] min-w-[250px] bg-[#F9F9F9] relative py-[5px]">
                    {/* Logo Section */}
                    <div className="flex items-center w-full h-[10%] p-[9.5px]">
                        <h2 className="ml-[20px] mr-[13px]">Zorva</h2>
                        <div className="w-[30px] h-[30px] bg-cover rounded-full" style={{ backgroundImage: "url('/public/assets/zorvalogo.png')" }} />
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
                    <div className="group flex flex-row items-center mt-[6px] mb-[6px] w-full p-[9.5px] cursor-pointer hover:bg-[#E3E3E3]">
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
                <div className="dashboard">
                    {currentView === 'upload' && <Upload />}
                    {currentView === 'datasets' && <DataSets />}
                    {currentView === 'insights' && <Insights />}
                </div>
            </div>
        </div >
    );
}

export default Dashboard;
