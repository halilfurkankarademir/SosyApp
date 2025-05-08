import React, { useState, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
// İkonları projenize göre güncelleyin, Fi ikonları varsayılan olarak kalabilir
import {
    FiGrid,
    FiUsers,
    FiFileText,
    FiSettings,
    FiLogOut,
    FiAlertOctagon,
    FiMessageSquare,
    FiMenu,
    FiX,
    FiHome,
} from "react-icons/fi";
import useClickOutside from "../../hooks/useClickOutside";
import { colors } from "../../utils/constants";

// Admin Logo bileşeni
const AdminLogo = ({ onClick }) => {
    return (
        <div className="flex items-center cursor-pointer" onClick={onClick}>
            <h1
                className="text-2xl md:text-3xl select-none cursor-pointer mb-2"
                style={{
                    color: colors.pink,
                    fontFamily: "Bagel Fat One",
                }}
            >
                SosyApp
            </h1>
        </div>
    );
};

const AdminSidebar = () => {
    // State tanımlamaları
    const [showSettings, setShowSettings] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Ref tanımlamaları
    const settingsRef = useRef(null);
    const settingsButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);

    // Click outside hooks
    const closeSettings = useCallback(() => setShowSettings(false), []);
    const closeMobileMenu = useCallback(() => setShowMobileMenu(false), []);

    useClickOutside(settingsRef, closeSettings, settingsButtonRef);
    useClickOutside(mobileMenuRef, closeMobileMenu, mobileMenuButtonRef);

    // Event handlers
    const handleHomeClick = () => {
        window.location.href = "/";
    };

    const toggleSettings = () => setShowSettings(!showSettings);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    // Menü öğeleri
    const menuItems = [
        { path: "/admin", icon: <FiGrid />, text: "Dashboard" },
        { path: "/admin/users", icon: <FiUsers />, text: "Kullanıcılar" },
        { path: "/admin/posts", icon: <FiFileText />, text: "Gönderiler" },
        {
            path: "/admin/comments",
            icon: <FiMessageSquare />,
            text: "Yorumlar",
        },
        { path: "/admin/reports", icon: <FiAlertOctagon />, text: "Raporlar" },
        { path: "/admin/settings", icon: <FiSettings />, text: "Ayarlar" },
    ];

    return (
        <>
            <nav className="backdrop-blur-lg bg-neutral-900/80 fixed w-full top-0 z-30 py-3 md:py-4 px-4 md:px-8 border-b border-neutral-700/50">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <AdminLogo onClick={handleHomeClick} />

                    {/* Masaüstü Menü */}
                    <div className="hidden md:flex items-center space-x-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center py-1.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-pink-500/10 text-pink-500"
                                            : "text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
                                    }`
                                }
                            >
                                <span className="mr-1.5">{item.icon}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* Sağ Kısım - Admin Profil ve Mobil Menü */}
                    <div className="flex items-center space-x-4">
                        {/* Admin Profil */}
                        <div className="hidden md:flex items-center space-x-3">
                            <img
                                src="https://randomuser.me/api/portraits/men/43.jpg"
                                alt="Admin"
                                className="h-8 w-8 rounded-full object-cover border border-neutral-700"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    Admin Kullanıcı
                                </p>
                            </div>

                            {/* Çıkış Butonu */}
                            <button
                                className="text-neutral-400 hover:text-red-500 transition duration-200"
                                title="Çıkış Yap"
                            >
                                <FiLogOut />
                            </button>
                        </div>

                        {/* Mobil Menü Butonu */}
                        <button
                            ref={mobileMenuButtonRef}
                            className="md:hidden text-neutral-100 hover:text-pink-500 transition duration-300"
                            onClick={toggleMobileMenu}
                        >
                            {showMobileMenu ? (
                                <FiX size={24} />
                            ) : (
                                <FiMenu size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobil Menü */}
            {showMobileMenu && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-40"
                    onClick={closeMobileMenu}
                >
                    <div
                        ref={mobileMenuRef}
                        className="fixed top-[61px] right-0 bottom-0 w-64 bg-neutral-800 shadow-xl p-4 z-50 transform transition-transform duration-300 ease-in-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Başlık ve Kapatma */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-700">
                            <h2 className="text-white text-lg font-semibold">
                                Admin Menü
                            </h2>
                            <button
                                onClick={closeMobileMenu}
                                className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700"
                                aria-label="Menüyü kapat"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Menü Öğeleri */}
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/admin"}
                                    className={({ isActive }) =>
                                        `flex items-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-pink-500/10 text-pink-500"
                                                : "text-neutral-300 hover:bg-neutral-700 hover:text-white"
                                        }`
                                    }
                                    onClick={closeMobileMenu}
                                >
                                    <span className="mr-3 text-lg">
                                        {item.icon}
                                    </span>
                                    <span>{item.text}</span>
                                </NavLink>
                            ))}

                            {/* Mobilde Çıkış Butonu */}
                            <div className="border-t border-neutral-700 pt-2 mt-2">
                                <div className="md:hidden flex items-center space-x-3 p-2">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/43.jpg"
                                        alt="Admin"
                                        className="h-8 w-8 rounded-full object-cover border border-neutral-700"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            Admin Kullanıcı
                                        </p>
                                        <p className="text-xs text-neutral-400">
                                            Yönetici
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="flex items-center w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 text-red-400 hover:bg-red-500/10"
                                    onClick={closeMobileMenu}
                                >
                                    <FiLogOut className="mr-3 text-lg" />
                                    <span>Çıkış Yap</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin İçeriği için Padding */}
            <div className="pt-16 md:pt-20"></div>
        </>
    );
};

export default AdminSidebar;
