import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuLogOut, LuSettings2 } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isInAppPage }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSettings, setShowSettings] = useState(false);

    // Menü ve buton için referanslar
    const settingsRef = useRef(null);
    const settingsButtonRef = useRef(null);

    // Arama işlemi
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Menüyü kapatma işlemi
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Eğer tıklanan alan menü veya buton değilse, menüyü kapat
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target) &&
                settingsButtonRef.current &&
                !settingsButtonRef.current.contains(event.target)
            ) {
                setShowSettings(false);
            }
        };

        // Tıklama olayını dinle
        document.addEventListener("mousedown", handleClickOutside);

        // Temizleme fonksiyonu
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                                    className="w-72 px-4 py-2 text-sm border-2 border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                            <div
                                ref={settingsButtonRef} // Buton referansı
                                className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <BsThreeDotsVertical size={24} />
                            </div>
                        </div>
                        {showSettings && (
                            <div
                                ref={settingsRef} // Menü referansı
                                className="flex flex-col gap-2 absolute w-56 top-20 right-20 bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-700 animate-fade-in"
                            >
                                {/* Ayarlar Butonu */}
                                <div className="flex flex-row gap-3 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer">
                                    <LuSettings2
                                        size={20}
                                        className="text-neutral-400"
                                    />
                                    <span className="text-sm">Ayarlar</span>
                                </div>

                                {/* Çıkış Yap Butonu */}
                                <div className="flex flex-row gap-3 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer">
                                    <MdLogout
                                        size={20}
                                        className="text-neutral-400"
                                    />
                                    <span className="text-sm">Çıkış Yap</span>
                                </div>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
