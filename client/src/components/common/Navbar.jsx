import React, { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { MdLogout, MdMenu, MdSearch, MdClose } from "react-icons/md";
import { useNavigation } from "../../context/NavigationContext";
import Notifications from "../ui/dropdowns/NotificationsDropdown";
import { colors } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { memo } from "react";
import NavSearchInput from "../ui/inputs/NavSearchInput";
import { fakeNotifications } from "../../constants/fakeDatas";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const { navigateToPage } = useNavigation();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    // Referanslar
    const settingsRef = useRef(null);
    const settingsButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    const notificationsRef = useRef(null);

    const handleClickLogo = () => {
        window.scrollTo(0, 0);
        navigateToPage("/");
    };

    // Arama işlemi
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigateToPage(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowMobileSearch(false);
        }
    };

    // Çıkış Yapma işlemi
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigateToPage("/");
    };

    // Dışarı tıklama olayını dinle
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Settings menü için tıklama kontrolü
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target) &&
                settingsButtonRef.current &&
                !settingsButtonRef.current.contains(event.target)
            ) {
                setShowSettings(false);
            }

            // Mobile menü için tıklama kontrolü
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                mobileMenuButtonRef.current &&
                !mobileMenuButtonRef.current.contains(event.target)
            ) {
                setShowMobileMenu(false);
            }

            // Notifications için tıklama kontrolü
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
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
                        color: colors.pink,
                        fontFamily: "Bagel Fat One",
                    }}
                    onClick={handleClickLogo}
                >
                    SosyApp
                </h1>

                {/* Uygulamaya giriş yapıldıysa göster */}
                {isAuthenticated ? (
                    <>
                        {/* Masaüstü Arama Çubuğu */}
                        <NavSearchInput
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            handleSearch={handleSearch}
                        />

                        {/* Masaüstü Butonlar (Sağda) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Bildirimler Butonu */}
                            <div
                                className="relative text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                                onClick={() =>
                                    setShowNotifications(!showNotifications)
                                }
                            >
                                <IoMdNotificationsOutline size={24} />
                                {/* Bildirim noktası mobil olmayan cihazlar icin*/}
                                {fakeNotifications.length > 0 && (
                                    <div className="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></div>
                                )}
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

                        {/* Mobil Menü Butonu */}
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

                        {/* Bildirimler Menüsü */}
                        {showNotifications && (
                            <div ref={notificationsRef}>
                                <Notifications
                                    notificationsData={fakeNotifications}
                                />
                            </div>
                        )}

                        {/* Ayarlar Menüsü */}
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

                        {/* Mobil Menü */}
                        {showMobileMenu && (
                            <div
                                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                <div
                                    ref={mobileMenuRef}
                                    className="fixed top-0 right-0 bottom-0 w-64 bg-neutral-800 bg-opacity-95 shadow-xl p-4 z-50 transform transition-transform duration-300 ease-in-out"
                                    style={{
                                        transform: showMobileMenu
                                            ? "translateX(0)"
                                            : "translateX(100%)",
                                    }}
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
                                            <span className="text-sm">
                                                Bildirimler
                                            </span>
                                            {fakeNotifications.length > 0 && (
                                                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"></div>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100">
                                            <LuSettings2 size={20} />
                                            <span className="text-sm">
                                                Ayarlar
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100">
                                            <MdLogout size={20} />
                                            <span className="text-sm">
                                                Çıkış Yap
                                            </span>
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

export default memo(Navbar);
