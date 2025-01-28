import React from 'react';
import GraphsToggle from './graphstoggle';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 
import GraphsPage from './graphspage';
import SavedGraphs from './savedgraphs';

export default function GraphsStaging ()  {
    // Access Redux state to determine the current section
    const graphsSection = useSelector((state: RootState) => state.graphs.graphsSection);

    return (
        <div className="flex flex-col w-full h-full">
           <div className='flex flex-row w-full px-8'>
                <GraphsToggle /> {/* Render GraphsToggle */} 
            </div>
            

            {/* Conditional rendering based on the Redux state */}
            <div className="content-area w-full h-full ">
                {graphsSection === 'create' && <GraphsPage />} {/* Render GraphsPage */}
                {graphsSection === 'saved' && <SavedGraphs />} {/* Render SavedGraphs */}
            </div>
        </div>
    );
};
