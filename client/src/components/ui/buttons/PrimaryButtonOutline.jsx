import React, { memo } from "react";

const PrimaryButtonOutline = ({ buttonText, handleClick, fullWidth, icon }) => {
    return (
        <button
            className={`z-10 ${
                fullWidth ? "w-full" : "w-auto"
            } px-4 flex justify-center text-sm items-center h-10 md:h-10 cursor-pointer font-semibold border-2  rounded-full shadow-sm text-indigo-200 border-indigo-500  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {buttonText}
        </button>
    );
};

export default memo(PrimaryButtonOutline);
