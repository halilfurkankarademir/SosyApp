import React from "react";

const PrimaryButtonOutline = ({ buttonText }) => {
    return (
        <button className="z-10 w-full flex justify-center cursor-pointer md:py-3 md:px-3 py-3 px-1 border-2 border-blue-500 font-semibold rounded-full shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
            {buttonText}
        </button>
    );
};

export default PrimaryButtonOutline;
