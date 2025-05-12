import React from "react";
import { FaTools } from "react-icons/fa";
import { colors } from "../../utils/constants";

const MaintenancePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white p-4">
            <div className="max-w-lg w-full bg-neutral-800 rounded-xl p-8 border border-neutral-700">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-neutral-700 rounded-full">
                            <FaTools className="text-4xl text-pink-500 animate-pulse" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-4">
                        Bakım Çalışması
                    </h1>

                    <p className="text-neutral-400 mb-8">
                        Sistemimizde bakım çalışması yapılmaktadır. Daha iyi bir
                        deneyim sunabilmek için kısa süre içinde geri döneceğiz.
                    </p>

                    <h1
                        className="text-xl md:text-2xl select-none mb-2"
                        style={{
                            fontFamily: "Bagel Fat One",
                            color: colors.pink,
                        }}
                    >
                        SosyApp
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
