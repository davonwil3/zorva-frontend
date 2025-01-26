import React from 'react';
import { useState, useEffect } from 'react';


export default function SavedGraphs() {
    const [graphs, setGraphs] = useState<any[]>([]);

   

    return (
        <div className="flex flex-col w-full h-full">
           <h2>saved graphs</h2>
        </div>
    );
}