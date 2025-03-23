import React, { memo } from "react";

const LargeButton = ({ buttonTxt, desc, handleClick, icon }) => {
    return (
        <div
            className="flex flex-col items-center justify-center p-8 bg-neutral-800  rounded-lg cursor-pointer hover:bg-neutral-700 transition duration-300"
            onClick={handleClick}
        >
            {icon && <span className="mb-2">{icon}</span>}
            {/* React Icons kullanımı */}
            <h2 className="md:text-2xl font-semibold text-white">
                {buttonTxt}
            </h2>
            <p className="text-sm md:text-md text-gray-400">{desc}</p>
        </div>
    );
};

export default memo(LargeButton);
