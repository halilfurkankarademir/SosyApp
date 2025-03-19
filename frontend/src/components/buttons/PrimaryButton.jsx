import React from "react";

const PrimaryButton = ({ buttonText, handleClick }) => {
    //Burada {buttonText} props olarak gelen degeri alacak ve butonun icine yazacak
    return (
        <button
            className="z-10 w-full flex justify-center items-center h-10 md:h-10 cursor-pointer font-semibold border border-transparent rounded-full shadow-sm text-white bg-indigo-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
};

export default PrimaryButton;
