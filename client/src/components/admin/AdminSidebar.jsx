import React, { useState, useRef, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
// İkonları projenize göre güncelleyin, Fi ikonları varsayılan olarak kalabilir
import {
    FiGrid,
    FiUsers,
    FiFileText,
    FiSettings,
    FiLogOut,
    FiMessageSquare,
    FiMenu,
    FiX,
    FiHome,
} from "react-icons/fi";
import useClickOutside from "../../hooks/useClickOutside";
import { colors } from "../../utils/constants";
import { getCurrentUser } from "../../api/userApi";
import { useNavigation } from "../../context/NavigationContext";

// Admin Logo bileşeni
const AdminLogo = ({ onClick, isCollapsed }) => {
    return (
        <div className="flex items-center cursor-pointer" onClick={onClick}>
            <h1
                className="text-2xl select-none cursor-pointer"
                style={{
                    color: colors.pink,
                    fontFamily: "Bagel Fat One",
                }}
            >
                {isCollapsed ? "S" : "SosyApp"}
            </h1>
        </div>
    );
};

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [adminDetails, setAdminDetails] = useState(null);

    const { navigateToPage } = useNavigation();
    const sidebarRef = useRef(null);
    const toggleButtonRef = useRef(null);

    const closeMobileMenu = useCallback(() => setShowMobileMenu(false), []);
    useClickOutside(sidebarRef, closeMobileMenu, toggleButtonRef);

    const handleHomeClick = () => {
        window.location.href = "/";
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        setShowMobileMenu(false);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        setIsCollapsed(false);
    };

    const getAdminDetails = async () => {
        try {
            const response = await getCurrentUser();
            setAdminDetails(response);
        } catch (error) {
            console.error("Error getting admin details:", error);
        }
    };

    const menuItems = [
        { path: "/admin", icon: <FiGrid />, text: "Dashboard" },
        { path: "/admin/users", icon: <FiUsers />, text: "Kullanıcılar" },
        { path: "/admin/posts", icon: <FiFileText />, text: "Gönderiler" },
        {
            path: "/admin/comments",
            icon: <FiMessageSquare />,
            text: "Yorumlar",
        },
        { path: "/admin/settings", icon: <FiSettings />, text: "Ayarlar" },
    ];

    useEffect(() => {
        getAdminDetails();
    }, []);

    return (
        <>
            {/* Mobil Menü Butonu */}
            <button
                ref={toggleButtonRef}
                className={`fixed top-4 left-4 md:hidden z-50 bg-neutral-800 p-2 rounded-lg text-neutral-100 hover:text-pink-500 transition-all duration-300 ${
                    showMobileMenu ? "opacity-0" : "opacity-100"
                }`}
                onClick={toggleMobileMenu}
            >
                <FiMenu size={24} />
            </button>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full bg-neutral-900/95 backdrop-blur-lg border-r border-neutral-700/50 transition-all duration-300 z-40
                    ${
                        showMobileMenu
                            ? "w-64 translate-x-0"
                            : "w-64 -translate-x-full"
                    }
                    ${isCollapsed ? "md:w-20" : "md:w-64"}
                    md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo ve Toggle */}
                    <div className="flex items-center justify-between p-4 border-b border-neutral-700/50">
                        <AdminLogo
                            onClick={handleHomeClick}
                            isCollapsed={isCollapsed}
                        />
                        <div className="flex items-center gap-2">
                            <button
                                className="md:hidden text-neutral-400 hover:text-white"
                                onClick={toggleMobileMenu}
                            >
                                <FiX size={20} />
                            </button>
                            <button
                                className="hidden md:block text-neutral-400 hover:text-white"
                                onClick={toggleSidebar}
                            >
                                {isCollapsed ? (
                                    <FiMenu size={20} />
                                ) : (
                                    <FiX size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Menü Öğeleri */}
                    <div className="flex-1 py-4 overflow-y-auto">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center py-2 px-4 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-pink-500/10 text-pink-500"
                                            : "text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
                                    }`
                                }
                                onClick={() =>
                                    showMobileMenu && closeMobileMenu()
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span
                                    className={`ml-3 ${
                                        isCollapsed ? "md:hidden" : ""
                                    }`}
                                >
                                    {item.text}
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    {/* Alt Kısım - Profil */}
                    <div className="p-4 border-t border-neutral-700/50">
                        <div
                            className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-neutral-800 transition-colors mb-2"
                            onClick={() =>
                                navigateToPage(
                                    `profile/${adminDetails?.username}`
                                )
                            }
                        >
                            {adminDetails ? (
                                <>
                                    <img
                                        src={adminDetails?.profilePicture}
                                        alt="Admin"
                                        className="h-8 w-8 rounded-full object-cover border border-neutral-700"
                                    />
                                    {!isCollapsed && (
                                        <div
                                            className={`flex flex-col ${
                                                isCollapsed ? "md:hidden" : ""
                                            }`}
                                        >
                                            <span className="text-sm font-medium text-white">
                                                {adminDetails?.username}
                                            </span>
                                            <span className="text-xs text-neutral-400">
                                                Admin
                                            </span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-neutral-700" />
                            )}
                        </div>
                        <button
                            onClick={() => navigateToPage("/")}
                            className="flex items-center w-full p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                        >
                            <FiHome className="text-xl" />
                            {!isCollapsed && (
                                <span
                                    className={`ml-3 text-sm font-medium ${
                                        isCollapsed ? "md:hidden" : ""
                                    }`}
                                >
                                    Ana Sayfaya Dön
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
