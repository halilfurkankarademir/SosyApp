import React from "react";
import { NavigationPanel } from "./";

const Sidebar = () => {
    return (
        <div className="hidden md:block md:col-span-1 fixed">
            <NavigationPanel />
        </div>
    );
};

export default Sidebar;
