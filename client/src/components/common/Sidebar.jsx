import React from "react";
import { NavigationPanel, SuggestionsCard } from "./";

const Sidebar = () => {
    return (
        <div className="hidden md:block md:col-span-1">
            <NavigationPanel />
            <div className="mt-4">
                <SuggestionsCard />
            </div>
        </div>
    );
};

export default Sidebar;
