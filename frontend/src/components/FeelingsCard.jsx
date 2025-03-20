import React from "react";

const FeelingsCard = ({ handleClickEmoji }) => {
    return (
        <div
            className="bg-neutral-800 border-2 border-neutral-700 rounded-lg text-xl
        flex flex-row justify-between p-2 w-48 h-12 absolute top-72 left-4/12"
        >
            <div
                className="hover:scale-125 transition-all duration-200 cursor-pointer"
                onClick={() => handleClickEmoji("Mutlu hissediyor!😄")}
            >
                <span title="Mutlu">😄</span>
            </div>
            <div
                className="hover:scale-125 transition-all duration-200 cursor-pointer"
                onClick={() => handleClickEmoji("Üzgün hissediyor! 😔")}
            >
                <span title="Üzgün">😔</span>
            </div>
            <div
                className="hover:scale-125 transition-all duration-200 cursor-pointer"
                onClick={() => handleClickEmoji("Sıkılmış hissediyor! 😑")}
            >
                <span title="Sıkılmış">😑</span>
            </div>
            <div
                className="hover:scale-125 transition-all duration-200 cursor-pointer"
                onClick={() => handleClickEmoji("Kızgın hissediyor! 😡")}
            >
                <span title="Kızgın">😡</span>
            </div>
            <div
                className="hover:scale-125 transition-all duration-200 cursor-pointer"
                onClick={() => handleClickEmoji("Korkmuş hissediyor! 😱")}
            >
                <span title="Korkmuş">😱</span>
            </div>
        </div>
    );
};

export default FeelingsCard;
