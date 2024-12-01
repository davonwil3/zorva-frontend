import React from "react";
import { useState, useEffect } from "react";
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/pro-light-svg-icons';
import { faClipboard } from '@fortawesome/pro-light-svg-icons';
import { faListCheck } from '@fortawesome/pro-light-svg-icons';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';
import { faCalendar } from '@fortawesome/pro-light-svg-icons';
import { faFolderOpen } from '@fortawesome/pro-light-svg-icons';
import { faChartLine } from '@fortawesome/pro-light-svg-icons';
import { faGear } from '@fortawesome/pro-light-svg-icons';
import { faPaintbrushFine } from '@fortawesome/pro-light-svg-icons';
import Chatbot from "./components/chatbot";
import { IconProp } from '@fortawesome/fontawesome-svg-core';





const Dashboard = () => {
    return (
        <div className="app-page">
            <div className="app-header">
                <div className="app-logo">
                    <div className="logo-img"></div>
                    <h2>Zorva</h2>
                </div>
                <div className="app-search">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="app-profile">
                    <div className="profile-img"></div>
                    <p>John Doe</p>
                </div>
            </div>
            <div className="dashboard-view">
                <div className="menu">
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faHouse as IconProp} />
                        <p>Home</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faClipboard as IconProp} />
                        <p>Projects</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faListCheck as IconProp} />
                        <p>Tasks</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faEnvelope as IconProp} />
                        <p>Messages</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendar as IconProp} />
                        <p>Calendar</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faFolderOpen as IconProp} />
                        <p>Files</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faPaintbrushFine as IconProp} />
                        <p>Whiteboards</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faChartLine as IconProp} />
                        <p>Reports</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faGear as IconProp} />
                        <p>Settings</p>
                    </div>
                </div>
                <div className="dashboard"> 
                    <Chatbot />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
