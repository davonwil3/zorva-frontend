import React from "react";
import { useState, useEffect } from "react";
import './css/app.css';
import Upload from "./components/upload";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faChartLineUp, faDatabase, faFileChartPie } from '@fortawesome/pro-light-svg-icons';
import { faWrench } from '@fortawesome/pro-light-svg-icons';
import { faHouse } from '@fortawesome/pro-light-svg-icons';
import { faChartColumn } from '@fortawesome/pro-light-svg-icons';
import { faFolderOpen } from '@fortawesome/pro-light-svg-icons';
import { faMicrochipAi } from '@fortawesome/pro-light-svg-icons';
import { faGear } from '@fortawesome/pro-light-svg-icons';
import { faMessageDots } from '@fortawesome/pro-light-svg-icons';
import { faQuestion } from "@fortawesome/pro-light-svg-icons";
import Chatbot from "./components/chatbot";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLightbulbOn} from '@fortawesome/pro-light-svg-icons';





function Dashboard() {

    return (
        <div className="app-page">


            <div className="dashboard-view">
                <div className="menu">
                    <div className="logo">
                        <h2>Zorva</h2>
                        <div className="logo-pic"></div>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faHouse as IconProp} />
                        <p>Dashboard</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faArrowUpFromBracket as IconProp} />
                        <p>Upload</p>
                    </div>

                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faDatabase as IconProp} />
                        <p>Datasets</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faLightbulbOn as IconProp} />
                        <p>Insights</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faFileChartPie as IconProp} />
                        <p>Reports</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faChartLineUp as IconProp} />
                        <p>Graphs</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faWrench as IconProp} />
                        <p>Integrations</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faGear as IconProp} />
                        <p>Settings</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faQuestion as IconProp} />
                        <p>Help</p>
                    </div>

                </div>
                <div className="dashboard">
                    <Upload />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
