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
                        <FontAwesomeIcon className="menu-icon" icon={faHouse} />
                        <p>Home</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faClipboard} />
                        <p>Projects</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faListCheck} />
                        <p>Tasks</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faEnvelope} />
                        <p>Messages</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faCalendar} />
                        <p>Calendar</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faFolderOpen} />
                        <p>Files</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faChartLine} />
                        <p>Reports</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faGear} />
                        <p>Settings</p>
                    </div>
                </div>
                <div className="dashboard"> </div>
            </div>
        </div>
    );
}

export default Dashboard;
