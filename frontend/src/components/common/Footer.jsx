import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-white py-6 px-4 mt-auto">
            <div className="container mx-auto">
                <div className="flex flex-col justify-between items-center">
                    <div className="mb-4">
                        <h1
                            className="text-xl select-none cursor-pointer"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                            onClick={() => navigate("/home")}
                        >
                            SosyApp
                        </h1>
                    </div>

                    <div className="text-center text-sm">
                        <p className="mb-2">
                            &copy; {year} SosyApp. Tüm hakları saklıdır.
                        </p>
                        <p>
                            <span
                                className="cursor-pointer hover:text-pink-500 transition-colors"
                                onClick={() => navigate("/privacy-policy")}
                            >
                                Gizlilik Politikası
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
