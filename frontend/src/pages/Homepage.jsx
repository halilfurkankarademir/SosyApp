import React from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import NewPost from "../components/posts/NewPost";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-36">
                {/* Grid Layout */}
                <div
                    className="grid grid-cols-4 w-full"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar (Ekranın 1/3'ü) */}
                    <div className="col-span-1">
                        <Sidebar />
                    </div>

                    {/* NewPost (Ekranın 2/3'ü) */}
                    <div className="col-span-3">
                        <NewPost />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
