import React from "react";

const StatCard = ({ title, value, icon }) => {
    return (
        <div className="bg-neutral-800 p-5 rounded-xl shadow flex items-center space-x-4 border border-neutral-700/50">
            {" "}
            {/* Rounded-xl, border transparanlığı */}
            {/* İkon Bölümü */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-neutral-700 rounded-full">
                {" "}
                {/* İkon arkaplanı */}
                {/* İkonu dinamik olarak render et ve rengini ayarla */}
                {React.cloneElement(icon, {
                    className: "h-6 w-6 text-pink-500",
                })}
            </div>
            {/* Metin Bölümü */}
            <div className="flex-1">
                <p className="text-sm text-neutral-400 font-medium truncate">
                    {title}
                </p>{" "}
                {/* Truncate eklendi */}
                <p className="text-2xl font-bold text-white mt-1">
                    {value}
                </p>{" "}
                {/* Font bold, margin top */}
            </div>
        </div>
    );
};

export default StatCard;
