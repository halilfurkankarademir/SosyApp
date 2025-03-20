import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isInAppPage }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="backdrop-blur-lg fixed w-full px-16 top-0 z-50 py-8">
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo (Solda) */}
                <h1
                    className="text-3xl select-none cursor-pointer ml-2"
                    style={{
                        color: "#f986f3",
                        fontFamily: "Bagel Fat One",
                    }}
                    onClick={() =>
                        isInAppPage ? navigate("/home") : navigate("/")
                    }
                >
                    SosyApp
                </h1>

                {isInAppPage ? (
                    <>
                        {/* Arama Çubuğu (Ortada) */}
                        <div className="flex ml-auto mr-6">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Dünyayı Keşfet.."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full px-4 py-2 text-sm border-2 border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
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
                                </button>
                            </form>
                        </div>

                        {/* Butonlar (Sağda) */}
                        <div className="flex items-center space-x-6">
                            {/* Bildirimler Butonu */}
                            <div className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300">
                                <IoMdNotificationsOutline size={24} />
                            </div>
                            {/* Ayarlar Butonu */}
                            <div className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300">
                                <IoSettingsOutline size={24} />
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
