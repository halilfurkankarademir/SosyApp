import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { useNavigation } from "../../../context/NavigationContext";
import { useAuth } from "../../../context/AuthContext";
import { logout } from "../../../api/authApi";
import { useNotification } from "../../../context/NotificationContext";
import useClickOutside from "../../../hooks/useClickOutside";

// Alt bileşenleri import et
import NavbarLogo from "./NavbarLogo";
import NavbarActions from "./NavbarActions"; // Ana aksiyon bileşeni
// import NavbarNotificationsIcon from './NavbarNotificationsIcon'; // --- KALDIRILDI ---
import NavbarSettingsMenu from "./NavbarSettingsMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarMobileSearch from "./NavbarMobileSearch";
import Notifications from "../../ui/dropdowns/NotificationsDropdown";

const Navbar = () => {
    // --- State Tanımlamaları (Aynı) ---
    const [searchQuery, setSearchQuery] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [clickedNotification, setClickedNotification] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // --- Context ve Store Kullanımı (Aynı) ---
    const { navigateToPage } = useNavigation();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const { notifications, isAllNotificationsRead, setIsAllNotificationsRead } =
        useNotification();

    // --- Referans Tanımlamaları (Aynı) ---
    const settingsRef = useRef(null);
    const settingsButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    const notificationsRef = useRef(null);
    const notificationsButtonRef = useRef(null); // Bu ref hala gerekli, Actions'a geçilecek

    // --- Dışarı Tıklama Hook'ları (Aynı) ---
    const closeSettings = useCallback(() => setShowSettings(false), []);
    const closeMobileMenu = useCallback(() => setShowMobileMenu(false), []);
    const closeNotifications = useCallback(
        () => setShowNotifications(false),
        []
    );

    useClickOutside(settingsRef, closeSettings, settingsButtonRef);
    useClickOutside(mobileMenuRef, closeMobileMenu, mobileMenuButtonRef);
    useClickOutside(
        notificationsRef,
        closeNotifications,
        notificationsButtonRef
    ); // Bildirim ref'leri hala burada yönetiliyor

    // --- Olay Yöneticileri (Handlers) (Aynı) ---
    const handleLogoClick = () => {
        window.scrollTo(0, 0);
        navigateToPage("/");
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigateToPage(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowMobileSearch(false);
            setSearchQuery("");
        }
    };
    const handleSettingsClick = () => {
        setShowSettings(false);
        navigateToPage("/settings");
    };
    const handleLogoutClick = async () => {
        setShowSettings(false);
        closeMobileMenu();
        try {
            // ... (logout logic)
            const response = await logout();
            if (response.status === 200) {
                setIsAuthenticated(false);
                localStorage.removeItem("isAuthenticated");
                navigateToPage("/login");
            } else {
                console.error("Logout failed:", response.data);
            }
        } catch (error) {
            // ... (error handling)
            console.error("Logout error:", error);
            setIsAuthenticated(false);
            localStorage.removeItem("isAuthenticated");
            navigateToPage("/login");
        }
    };
    const toggleNotifications = () => {
        // Bu handler hala burada kalmalı
        const newState = !showNotifications;
        setShowNotifications(newState);
        if (newState && hasNewNotification) {
            setHasNewNotification(false);
            setClickedNotification(true);
            setIsAllNotificationsRead(true);
        }
    };
    const toggleSettings = () => setShowSettings(!showSettings);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
    const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);

    // --- Yan Etkiler (Side Effects) (Aynı) ---
    useEffect(() => {
        if (!isAllNotificationsRead) {
            setHasNewNotification(true);
        } else {
            setHasNewNotification(false);
        }
    }, [notifications, clickedNotification]);

    // --- Render ---
    return (
        <>
            <nav className="backdrop-blur-lg bg-neutral-900/80 fixed w-full top-0 z-30 py-3 md:py-4 px-4 md:px-8 border-b border-neutral-700/50">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <NavbarLogo onClick={handleLogoClick} />

                    {/* Sağ Taraftaki Aksiyonlar (Artık Bildirim İkonu Dahil) */}
                    <NavbarActions
                        isAuthenticated={isAuthenticated}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                        hasNewNotification={hasNewNotification}
                        onToggleNotifications={toggleNotifications}
                        notificationsButtonRef={notificationsButtonRef} // Ref'i ilet
                        onToggleSettings={toggleSettings}
                        onToggleMobileMenu={toggleMobileMenu}
                        onToggleMobileSearch={toggleMobileSearch}
                        settingsButtonRef={settingsButtonRef} // Ref'i ilet
                        mobileMenuButtonRef={mobileMenuButtonRef} // Ref'i ilet
                        // user prop'una gerek yok, Actions kendi alıyor
                    />
                </div>
            </nav>

            {/* Açılır Menüler ve Arama Ekranı */}
            {isAuthenticated && (
                <>
                    {/* Bildirimler Dropdown (Hala burada render ediliyor) */}
                    {showNotifications && (
                        <div
                            ref={notificationsRef} // Dropdown'a ref ata
                        >
                            <Notifications
                                notificationsData={notifications}
                                onClose={closeNotifications}
                            />
                        </div>
                    )}

                    {/* Ayarlar Menüsü */}
                    <NavbarSettingsMenu
                        show={showSettings}
                        menuRef={settingsRef}
                        onSettingsClick={handleSettingsClick}
                        onLogoutClick={handleLogoutClick}
                    />

                    {/* Mobil Menü */}
                    <NavbarMobileMenu
                        show={showMobileMenu}
                        menuRef={mobileMenuRef}
                        onClose={closeMobileMenu}
                        navigateToPage={navigateToPage}
                        onSettingsClick={handleSettingsClick}
                        onLogoutClick={handleLogoutClick}
                    />

                    {/* Mobil Arama */}
                    <NavbarMobileSearch
                        show={showMobileSearch}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                        onClose={() => setShowMobileSearch(false)}
                    />
                </>
            )}
        </>
    );
};

export default memo(Navbar);
