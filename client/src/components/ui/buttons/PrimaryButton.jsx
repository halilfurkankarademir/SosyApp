import React, { memo } from "react";

const PrimaryButton = ({
    buttonText,
    handleClick,
    fullWidth,
    icon,
    disabled,
}) => {
    //Burada {buttonText} props olarak gelen degeri alacak ve butonun icine yazacak
    return (
        <button
            className={`z-10 ${
                fullWidth ? "w-full" : "w-auto"
            } px-4 flex justify-center text-md items-center h-10 md:h-10 cursor-pointer border border-transparent rounded-full shadow-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300`}
            disabled={disabled}
            onClick={handleClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {buttonText}
        </button>
    );
};

export default memo(PrimaryButton);
