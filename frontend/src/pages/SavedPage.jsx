import React from "react";
import Navbar from "../components/common/Navbar";

const SavedPage = () => {
    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-36"></div>
        </>
    );
};

export default SavedPage;
