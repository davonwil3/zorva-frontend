import React from 'react';
import InsightsToggle from './insightstoggle'; 
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 
import InsightsComponent from './insights'; 
import QuickInsights from './quickinsights';

export default function InsightsStaging ()  {
    // Access Redux state to determine the current section
    const insightsSection = useSelector((state: RootState) => state.insights.insightsSection);

    return (
        <div className="flex flex-col w-full h-full">
           <div className='flex flex-row w-full px-8'>
            {insightsSection === 'quick'  &&<InsightsToggle />} 
        
            </div>
            

            {/* Conditional rendering based on the Redux state */}
            <div className="content-area w-full h-full">
                {insightsSection === 'quick' && <QuickInsights />} {/* Render QuickInsights */}
                {insightsSection === 'chat' && <InsightsComponent />} {/* Render InsightsComponent */}
            </div>
        </div>
    );
};



