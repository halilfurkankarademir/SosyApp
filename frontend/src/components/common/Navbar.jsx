import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-neutral-900 fixed w-full px-16 top-0 z-50 py-8">
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo (Solda) */}
                <h1
                    className="text-5xl select-none cursor-pointer"
                    style={{
                        color: "#f986f3",
                        fontFamily: "Bagel Fat One",
                    }}
                    onClick={() => navigate("/home")}
                >
                    SosyApp
                </h1>

                {/* Arama Çubuğu */}
                <div className="relative ml-auto mr-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Dünyayı keşfet..."
                        className="w-full text-sm px-10 py-2 rounded-xl bg-neutral-800 focus:outline-none text-white"
                    />
                </div>

                {/* Butonlar (Sağda) */}
                <div className="flex items-center space-x-6">
                    {/* Mesajlar Butonu */}
                    <div className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300">
                        <FaRegMessage size={20} />
                    </div>

                    {/* Bildirimler Butonu */}
                    <div className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300">
                        <IoMdNotificationsOutline size={24} />
                    </div>

                    {/* Profil Fotoğrafı */}
                    <div
                        className="relative cursor-pointer hover:opacity-80 transition duration-300"
                        onClick={() => navigate("/profile")}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            alt="Profil"
                            className="w-8 h-8 rounded-full"
                        />
                        {/* Çevrimiçi Durumu */}
                        <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
