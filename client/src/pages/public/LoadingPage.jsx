import React from "react";
import { colors } from "../../utils/constants";

const LoadingPage = () => {
    return (
        <>
            <div className="page-container justify-center items-center flex flex-col">
                <h1
                    className="text-2xl md:text-5xl select-none cursor-pointer lg:ml-8 "
                    style={{
                        color: colors.pink,
                        fontFamily: "Bagel Fat One",
                    }}
                >
                    SosyApp
                </h1>
            </div>
        </>
    );
};

export default LoadingPage;
