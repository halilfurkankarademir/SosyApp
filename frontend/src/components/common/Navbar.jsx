import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { MdLogout, MdMenu, MdSearch, MdClose } from "react-icons/md";
import { useNavigation } from "../../context/NavigationContext";

const Navbar = ({ isInAppPage }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const { navigateToPage } = useNavigation();

    // Menü ve buton için referanslar
    const settingsRef = useRef(null);
    const settingsButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);

    // Arama işlemi
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigateToPage(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowMobileSearch(false);
        }
    };

    // Cikis Yapma islemi
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigateToPage("/");
    };

    // Menüyü kapatma işlemi
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Settings menu için tıklama kontrolü
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target) &&
                settingsButtonRef.current &&
                !settingsButtonRef.current.contains(event.target)
            ) {
                setShowSettings(false);
            }

            // Mobile menu için tıklama kontrolü
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileMenuButtonRef.current &&
                !mobileMenuButtonRef.current.contains(event.target)
            ) {
                setShowMobileMenu(false);
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
        <nav className="backdrop-blur-lg fixed w-full top-0 z-50 py-4 md:py-6 px-8">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo (Solda) */}
                <h1
                    className="text-2xl md:text-3xl select-none cursor-pointer lg:ml-8"
                    style={{
                        color: "#f986f3",
                        fontFamily: "Bagel Fat One",
                    }}
                    onClick={() =>
                        isInAppPage
                            ? navigateToPage("/home")
                            : navigateToPage("/")
                    }
                >
                    SosyApp
                </h1>
                {/* Uygulamaya giris yapildiysa goster*/}
                {isInAppPage ? (
                    <>
                        {/* Masaüstü Arama Çubuğu (Ortada) - sadece md ve üstü ekranlarda görünür */}
                        <div className="hidden md:flex ml-auto mr-6">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Dünyayı Keşfet.."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-56 lg:w-72 px-4 py-2 text-sm border-2 border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-neutral-800 bg-opacity-70"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer"
                                >
                                    <MdSearch className="h-5 w-5" />
                                </button>
                            </form>
                        </div>

                        {/* Mobil Arama Formu - sadece küçük ekranlarda ve showMobileSearch true ise görünür */}
                        {showMobileSearch && (
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                                <div className="bg-neutral-800 p-4 rounded-lg w-full max-w-md relative">
                                    <button
                                        onClick={() =>
                                            setShowMobileSearch(false)
                                        }
                                        className="absolute right-3 top-3 text-white"
                                    >
                                        <MdClose size={24} />
                                    </button>
                                    <form
                                        onSubmit={handleSearch}
                                        className="mt-6"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Dünyayı Keşfet.."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="w-full px-4 py-3 text-sm border-2 border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-neutral-800"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg"
                                        >
                                            Ara
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Masaüstü Butonlar (Sağda) - sadece md ve üstü ekranlarda görünür */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Bildirimler Butonu */}
                            <div className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300">
                                <IoMdNotificationsOutline size={24} />
                            </div>
                            {/* Ayarlar Butonu */}
                            <div
                                ref={settingsButtonRef}
                                className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <BsThreeDotsVertical size={24} />
                            </div>
                        </div>

                        {/* Mobil Menü Butonu - sadece küçük ekranlarda görünür */}
                        <div className="flex md:hidden items-center space-x-4">
                            {/* Mobil Arama Butonu */}
                            <button
                                className="text-neutral-100 hover:text-pink-500 transition duration-300"
                                onClick={() => setShowMobileSearch(true)}
                            >
                                <MdSearch size={22} />
                            </button>

                            {/* Mobil Menü Butonu */}
                            <button
                                ref={mobileMenuButtonRef}
                                className="text-neutral-100 hover:text-pink-500 transition duration-300"
                                onClick={() =>
                                    setShowMobileMenu(!showMobileMenu)
                                }
                            >
                                <MdMenu size={24} />
                            </button>
                        </div>

                        {/* Ayarlar Menüsü - showSettings true ise görünür */}
                        {showSettings && (
                            <div
                                ref={settingsRef}
                                className="flex flex-col gap-2 absolute w-56 top-16 md:top-20 right-4 md:right-12 bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-700 animate-fade-in z-50"
                            >
                                {/* Çıkış Yap Butonu */}
                                <div
                                    className="flex flex-row gap-3 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <MdLogout
                                        size={20}
                                        className="text-neutral-400"
                                    />
                                    <span className="text-sm">Çıkış Yap</span>
                                </div>
                            </div>
                        )}

                        {/* Mobil Menü - showMobileMenu true ise görünür */}
                        {showMobileMenu && (
                            <div
                                ref={mobileMenuRef}
                                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                <div
                                    className="fixed inset-0 bg-neutral-800 shadow-xl p-4 transform transition-all duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-white text-lg font-semibold">
                                            Menü
                                        </h2>
                                        <button
                                            onClick={() =>
                                                setShowMobileMenu(false)
                                            }
                                            className="text-neutral-400 hover:text-white"
                                        >
                                            <MdClose size={22} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100">
                                            <IoMdNotificationsOutline
                                                size={20}
                                            />
                                            <span>Bildirimler</span>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100">
                                            <LuSettings2 size={20} />
                                            <span>Ayarlar</span>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100">
                                            <MdLogout size={20} />
                                            <span>Çıkış Yap</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
