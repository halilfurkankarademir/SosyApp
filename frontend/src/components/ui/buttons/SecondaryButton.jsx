import React from "react";

const SecondaryButton = ({ icon, buttonText, handleClick }) => {
    return (
        <button
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-4 rounded-full transition flex items-center justify-center space-x-2 cursor-pointer"
            onClick={handleClick}
        >
            {icon && <span>{icon}</span>}
            <span>{buttonText}</span>
        </button>
    );
};

export default SecondaryButton;
