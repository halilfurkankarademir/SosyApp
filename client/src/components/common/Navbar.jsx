import React, { useState, useEffect, useRef, useCallback } from "react"; // useCallback eklendi
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import {
    MdLogout,
    MdMenu,
    MdSearch,
    MdClose,
    MdSettings,
} from "react-icons/md";
import { useNavigation } from "../../context/NavigationContext";
import Notifications from "../ui/dropdowns/NotificationsDropdown";
import { colors } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { memo } from "react";
import NavSearchInput from "../ui/inputs/NavSearchInput";
import { logout } from "../../api/authApi";
import { useNotification } from "../../context/NotificationContext";
import useClickOutside from "../../hooks/useClickOutside"; // Hook'u import et

const Navbar = () => {
    // State'ler
    const [searchQuery, setSearchQuery] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [clickedNotification, setClickedNotification] = useState(false);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // Context'ler
    const { navigateToPage } = useNavigation();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const { notifications, markNotificationsAsClicked } = useNotification(); // markNotificationsAsClicked eklendi (varsayım)

    // Referanslar
    const settingsRef = useRef(null); // Ayarlar menüsü
    const settingsButtonRef = useRef(null); // Ayarlar butonu
    const mobileMenuRef = useRef(null); // Mobil menü
    const mobileMenuButtonRef = useRef(null); // Mobil menü butonu
    const notificationsRef = useRef(null); // Bildirimler menüsü
    const notificationsButtonRef = useRef(null); // Bildirimler butonu (Yeni)

    // --- Custom Hook ile Kapatma İşleyicileri ---
    // useCallback, fonksiyonların gereksiz yere yeniden oluşmasını önler
    const closeSettings = useCallback(() => setShowSettings(false), []);
    const closeMobileMenu = useCallback(() => setShowMobileMenu(false), []);
    const closeNotifications = useCallback(
        () => setShowNotifications(false),
        []
    );

    // Hook'ları kullanma
    useClickOutside(settingsRef, closeSettings, settingsButtonRef);
    useClickOutside(mobileMenuRef, closeMobileMenu, mobileMenuButtonRef);
    useClickOutside(
        notificationsRef,
        closeNotifications,
        notificationsButtonRef
    );
    // --- Eski useEffect kaldırıldı ---

    // Handler'lar
    const handleClickLogo = () => {
        window.scrollTo(0, 0);
        navigateToPage("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigateToPage(`/search?q=${encodeURIComponent(searchQuery)}`);
            setShowMobileSearch(false); // Mobil aramayı kapat
            setSearchQuery(""); // Arama sonrası inputu temizle (isteğe bağlı)
        }
    };

    const handleSettings = () => {
        setShowSettings(false); // Menüyü kapat
        navigateToPage("/settings");
    };

    const handleLogout = async () => {
        setShowSettings(false); // Menüyü kapat
        const response = await logout();
        if (response.status === 200) {
            setIsAuthenticated(false);
            localStorage.removeItem("isAuthenticated"); // Token vs. temizliği de burada yapılmalı
            navigateToPage("/login");
        } else {
            console.error("Logout failed:", response.data);
            // Kullanıcıya hata mesajı gösterilebilir
        }
    };

    const toggleNotifications = () => {
        const newState = !showNotifications;
        setShowNotifications(newState);
        if (newState && hasNewNotification) {
            setHasNewNotification(false);
            setClickedNotification(true);
        }
    };

    const toggleSettings = () => setShowSettings(!showSettings);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    // Side Effects

    // Bildirim context'indeki değişiklikleri dinleyerek yeni bildirim var mı kontrol et
    useEffect(() => {
        // Henüz tıklanmamış ve okunmamış bildirim var mı diye kontrol et
        // Bu mantık NotificationContext içinde daha merkezi olabilir
        const unreadExists = notifications.some((n) => !n.isRead); // Notification objesinde isRead alanı olduğunu varsayıyoruz
        if (unreadExists && !clickedNotification) {
            setHasNewNotification(true);
        } else {
            setHasNewNotification(false);
        }
    }, [notifications, clickedNotification]);

    // Render Helper Functions
    const renderDesktopIcons = () => (
        <div className="hidden md:flex items-center space-x-4">
            {/* Bildirimler Butonu */}
            <div
                ref={notificationsButtonRef} // Bildirim butonu için ref
                className="relative text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                onClick={toggleNotifications}
                aria-label="Bildirimler" // Erişilebilirlik
            >
                <IoMdNotificationsOutline size={24} />
                {hasNewNotification && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2.5 h-2.5 flex items-center justify-center border border-neutral-900" /> // Daha belirgin nokta
                )}
            </div>

            {/* Ayarlar Butonu */}
            <div
                ref={settingsButtonRef} // Ayarlar butonu için ref
                className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                onClick={toggleSettings}
                aria-label="Ayarlar ve Diğer Seçenekler" // Erişilebilirlik
            >
                <BsThreeDotsVertical size={24} />
            </div>
        </div>
    );

    const renderMobileIcons = () => (
        <div className="flex md:hidden items-center space-x-4">
            <button
                className="text-neutral-100 hover:text-pink-500 transition duration-300"
                onClick={() => setShowMobileSearch(true)}
                aria-label="Arama yap" // Erişilebilirlik
            >
                <MdSearch size={22} />
            </button>

            <button
                ref={mobileMenuButtonRef} // Mobil menü butonu için ref
                className="text-neutral-100 hover:text-pink-500 transition duration-300"
                onClick={toggleMobileMenu}
                aria-label="Menüyü aç/kapat" // Erişilebilirlik
            >
                <MdMenu size={24} />
            </button>
        </div>
    );

    // Ayarlar menüsünü render eden fonksiyon
    const renderSettingsMenu = () =>
        showSettings && (
            <div
                ref={settingsRef} // Ayarlar menüsü için ref
                className="fixed flex flex-col gap-1  w-52 top-16 md:top-18 right-4 md:right-8 bg-neutral-800 p-2 rounded-lg shadow-xl border border-neutral-700 animate-fade-in z-50" // Boyut, konum, padding ayarları
            >
                <button // Buton olarak değiştirmek daha semantik
                    className="flex flex-row gap-3 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer w-full text-left"
                    onClick={handleSettings}
                >
                    <MdSettings size={20} className="text-neutral-400" />
                    <span className="text-sm">Ayarlar</span>
                </button>
                <button // Buton olarak değiştirmek daha semantik
                    className="flex flex-row gap-2 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer w-full text-left"
                    onClick={handleLogout}
                >
                    <MdLogout size={20} className="text-neutral-400 ml-0.5" />{" "}
                    {/* Hafif sola kaydırma */}
                    <span className="text-sm">Çıkış Yap</span>
                </button>
            </div>
        );

    // Mobil menüyü render eden fonksiyon
    const renderMobileMenu = () =>
        showMobileMenu && (
            // Arka plan overlay'ı
            <div
                className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-40" // Daha koyu overlay
                onClick={closeMobileMenu} // Dışarı tıklayınca kapat
            >
                {/* Asıl Menü Paneli */}
                <div
                    ref={mobileMenuRef} // Mobil menü için ref
                    className="fixed top-0 right-0 bottom-0 w-64 bg-neutral-800 shadow-xl p-4 z-50 transform transition-transform duration-300 ease-in-out"
                    style={{
                        transform: showMobileMenu
                            ? "translateX(0)"
                            : "translateX(100%)",
                    }}
                    onClick={(e) => e.stopPropagation()} // Menü içine tıklayınca kapanmasını engelle
                >
                    {/* Menü Başlığı ve Kapatma Butonu */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-700">
                        <h2 className="text-white text-lg font-semibold">
                            Menü
                        </h2>
                        <button
                            onClick={closeMobileMenu}
                            className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700" // Buton stil ayarı
                            aria-label="Menüyü kapat"
                        >
                            <MdClose size={22} />
                        </button>
                    </div>

                    {/* Menü Öğeleri */}
                    <nav className="space-y-2">
                        {/* Bildirimler Linki (Örnek - Gerçek sayfaya gitmeli) */}
                        <button
                            onClick={() => {
                                closeMobileMenu();
                                navigateToPage("/notifications");
                            }} // Örnek yönlendirme
                            className="flex items-center w-full text-left space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100 transition-colors"
                        >
                            <IoMdNotificationsOutline
                                size={20}
                                className="text-neutral-400"
                            />
                            <span className="text-sm">Bildirimler</span>
                            {/* Yeni bildirim varsa gösterge */}
                            {hasNewNotification && (
                                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-2.5 h-2.5 border border-neutral-800" />
                            )}
                        </button>

                        {/* Ayarlar Linki */}
                        <button
                            onClick={() => {
                                closeMobileMenu();
                                handleSettings();
                            }}
                            className="flex items-center w-full text-left space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100 transition-colors"
                        >
                            <LuSettings2
                                size={20}
                                className="text-neutral-400"
                            />
                            <span className="text-sm">Ayarlar</span>
                        </button>

                        {/* Çıkış Yap Linki */}
                        <button
                            onClick={() => {
                                closeMobileMenu();
                                handleLogout();
                            }}
                            className="flex items-center w-full text-left space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100 transition-colors"
                        >
                            <MdLogout size={20} className="text-neutral-400" />
                            <span className="text-sm">Çıkış Yap</span>
                        </button>
                    </nav>
                </div>
            </div>
        );

    // Mobil Arama Alanı (Örnek)
    const renderMobileSearch = () =>
        showMobileSearch && (
            <div className="md:hidden fixed inset-0 bg-neutral-900 z-50 p-4 flex flex-col">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowMobileSearch(false)}
                        className="text-neutral-400 hover:text-white"
                        aria-label="Aramayı kapat"
                    >
                        <MdClose size={24} />
                    </button>
                </div>
                <form
                    onSubmit={handleSearch}
                    className="flex-grow flex items-center justify-center"
                >
                    <NavSearchInput
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleSearch={handleSearch}
                        isMobile={true} // Mobil için farklı stil gerekebilir
                    />
                </form>
            </div>
        );

    return (
        <>
            {" "}
            {/* Fragment eklemek iyi bir pratik */}
            <nav className="backdrop-blur-lg bg-neutral-900/80 fixed w-full top-0 z-30 py-4 px-4 md:px-8 border-b border-neutral-700/50">
                {" "}
                {/* Daha belirgin arka plan ve border */}
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo (Solda) */}
                    <h1
                        className="text-2xl md:text-3xl select-none cursor-pointer" // lg:ml-8 kaldırıldı, container yönetiyor
                        style={{
                            color: colors.pink,
                            fontFamily: "Bagel Fat One",
                        }}
                        onClick={handleClickLogo}
                    >
                        SosyApp
                    </h1>

                    {/* --- Sağ Taraf --- */}
                    {isAuthenticated && (
                        <div className="flex items-center gap-4 md:gap-6">
                            {/* Masaüstü Arama Çubuğu (Sadece Masaüstü) */}
                            <div className="hidden md:block">
                                <NavSearchInput
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    handleSearch={handleSearch}
                                />
                            </div>

                            {/* İkonlar */}
                            {renderDesktopIcons()}
                            {renderMobileIcons()}
                        </div>
                    )}
                    {/* Eğer kullanıcı giriş yapmamışsa (Opsiyonel: Giriş/Kayıt Butonları) */}
                    {/* {!isAuthenticated && ( ... )} */}
                </div>
            </nav>
            {/* Açılır Menüler (Nav dışında olmaları Z-index sorunlarını önleyebilir) */}
            {isAuthenticated && (
                <>
                    {/* Bildirimler Menüsü */}
                    {showNotifications && (
                        <div
                            ref={notificationsRef}
                            className="absolute top-16 md:top-18 right-4 md:right-20 z-40"
                        >
                            {" "}
                            {/* Konumlandırma */}
                            <Notifications
                                notificationsData={notifications}
                                onClose={closeNotifications} // Kapatma fonksiyonu iletme (opsiyonel)
                            />
                        </div>
                    )}

                    {renderSettingsMenu()}
                    {renderMobileMenu()}
                    {renderMobileSearch()}
                </>
            )}
        </>
    );
};

export default memo(Navbar);
