import React from "react";

const PrimaryButtonOutline = ({ buttonText, handleClick }) => {
    return (
        <button
            className="z-10 w-full flex justify-center items-center h-10 cursor-pointer  border-2 border-indigo-500 font-semibold rounded-full shadow-sm text-indigo-400 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
};

export default PrimaryButtonOutline;
