import React, { memo } from "react";

const PrimaryButton = ({
    buttonText,
    handleClick,
    fullWidth,
    icon,
    disabled,
    size = "medium", // small, medium, large
    className = "",
}) => {
    // Boyuta göre padding ve font büyüklüğü
    const getSizeClasses = () => {
        switch (size) {
            case "small":
                return "h-8 px-3 text-xs";
            case "large":
                return "h-12 px-6 text-base";
            case "medium":
            default:
                return "h-10 px-4 text-sm";
        }
    };

    // Touch cihazlar için özel sınıflar
    const touchClasses = "touch-target active:scale-95";

    // Ana buton sınıfları
    const baseClasses = `
        z-10 flex justify-center items-center gap-2
        ${fullWidth ? "w-full" : "w-auto"}
        ${getSizeClasses()}
        cursor-pointer
        border border-transparent rounded-full
        shadow-sm
        text-white
        bg-gradient-to-r from-pink-500 to-purple-600
        hover:from-pink-600 hover:to-purple-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
        transition-all duration-300
        ${touchClasses}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
    `;

    return (
        <button
            className={baseClasses}
            disabled={disabled}
            onClick={handleClick}
        >
            {icon && (
                <span className="flex items-center justify-center">{icon}</span>
            )}
            <span>{buttonText}</span>
        </button>
    );
};

export default memo(PrimaryButton);
