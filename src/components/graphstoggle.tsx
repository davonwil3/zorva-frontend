import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store"; // Update the path to your store
import { setGraphsSection } from "../redux/graphsslice";

export default function GraphsToggle() {
    const dispatch = useDispatch();

    // Access the current state from Redux
    const graphsSection = useSelector((state: RootState) => state.graphs.graphsSection);

    // Handle section change
    const handleGraphsSection = (event: React.MouseEvent<HTMLElement>, newSection: string | null) => {
        if (newSection) {
            dispatch(setGraphsSection(newSection)); // Dispatch the action to update Redux state
        }
    };

    return (
        <div className="flex flex-row w-[46%] relative h-[64px]">
            <ToggleButtonGroup
                value= {graphsSection} // Bind to Redux state
                color="primary"
                exclusive
                onChange={handleGraphsSection} // Update Redux state on change
                aria-label="graphs section"
                className="mb-4 absolute top-4 left-4"
            >
                <ToggleButton
                    value="create"
                    aria-label="create graphs"
                    classes={{
                        root: 'py-2 px-4 text-sm md:py-3 md:px-6 md:text-base lg:py-2 lg:px-8 lg:text-lg',
                    }}
                >
                    Create Graphs
                </ToggleButton>
                <ToggleButton
                    value="saved"
                    aria-label="saved graphs"
                    classes={{
                        root: 'py-2 px-4 text-sm md:py-3 md:px-6 md:text-base lg:py-2 lg:px-8 lg:text-lg',
                    }}
                >
                    Saved Graphs
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
