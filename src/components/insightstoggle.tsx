import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store"; // Update the path to your store
import { setInsightsSection } from "../redux/insightsslice";

export default function InsightsToggle() {
    const dispatch = useDispatch();

    // Access the current state from Redux
    const insightsSection = useSelector((state: RootState) => state.insights.insightsSection);

    // Handle section change
    const handleInsightSection = (event: React.MouseEvent<HTMLElement>, newSection: string | null) => {
        if (newSection) {
            dispatch(setInsightsSection(newSection)); // Dispatch the action to update Redux state
        }
    };

    return (
        <div className="flex flex-row w-[46%] relative h-[64px]">
            <ToggleButtonGroup
                value={insightsSection} // Bind to Redux state
                color="primary"
                exclusive
                onChange={handleInsightSection} // Update Redux state on change
                aria-label="insights section"
                className="mb-4 absolute top-4 left-4"
            >
                <ToggleButton
                    value="quick"
                    aria-label="web insights"
                    classes={{
                        root: 'py-2 px-4 text-sm md:py-3 md:px-6 md:text-base lg:py-2 lg:px-8 lg:text-lg',
                    }}
                >
                    Quick Insights
                </ToggleButton>
                <ToggleButton
                    value="chat"
                    aria-label="saved insights"
                    classes={{
                        root: 'py-2 px-4 text-sm md:py-3 md:px-6 md:text-base lg:py-2 lg:px-8 lg:text-lg',
                    }}
                >
                    Data Chat
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
