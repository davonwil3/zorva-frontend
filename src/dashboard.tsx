import React from "react";
import { useState, useEffect } from "react";
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/pro-light-svg-icons';
import { faWrench } from '@fortawesome/pro-light-svg-icons';
import { faMessageBot } from '@fortawesome/pro-light-svg-icons';
import { faChartColumn } from '@fortawesome/pro-light-svg-icons';
import { faFolderOpen } from '@fortawesome/pro-light-svg-icons';
import { faMicrochipAi } from '@fortawesome/pro-light-svg-icons';
import { faGear } from '@fortawesome/pro-light-svg-icons';
import { faMessageDots } from '@fortawesome/pro-light-svg-icons';
import { faQuestion } from "@fortawesome/pro-light-svg-icons";
import Chatbot from "./components/chatbot";
import { IconProp } from '@fortawesome/fontawesome-svg-core';





function Dashboard () {

    
    return (
        <div className="app-page">
            
            
            <div className="dashboard-view">
                <div className="menu">
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faMessageBot as IconProp} />
                        <p>Chat</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faArrowUpFromBracket as IconProp} />
                        <p>Upload</p>
                    </div>
                   
                    <div className="icon">
                        <FontAwesomeIcon className="menu-icon" icon={faMessageDots as IconProp} />
                        <p>Conversations</p>
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
                    <Chatbot />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
