import React, { memo } from "react";
import Navbar from "./Navbar";

const LoadingScreen = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-neutral-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white text-pink-500"></div>
            </div>
        </>
    );
};

export default memo(LoadingScreen);
