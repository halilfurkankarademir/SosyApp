import React from "react";
import { MdMenu, MdSearch } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io"; // Bildirim ikonu import edildi
import NavSearchInput from "../../ui/inputs/NavSearchInput"; // Path'i ayarlayın
import useUserStore from "../../../hooks/useUserStore"; // Path'i ayarlayın
import { BiDotsHorizontal, BiDotsVerticalRounded } from "react-icons/bi";

const NavbarActions = ({
    isAuthenticated,
    searchQuery,
    setSearchQuery,
    handleSearch,
    // Bildirim Propları Eklendi:
    hasNewNotification,
    onToggleNotifications,
    notificationsButtonRef,
    // Ayar/Profil ve Mobil Propları:
    onToggleSettings,
    onToggleMobileMenu,
    onToggleMobileSearch,
    settingsButtonRef,
    mobileMenuButtonRef,
}) => {
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 md:gap-6">
            {/* Masaüstü Arama (Solda kalıyor) */}
            <div className="hidden md:block">
                <NavSearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    placeholder="Dünyayı Keşfet.."
                />
            </div>

            {/* --- Masaüstü Sağ İkonlar --- */}
            <div className="hidden md:flex items-center space-x-4">
                {/* Bildirim İkonu  */}
                <div
                    ref={notificationsButtonRef}
                    className="relative text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                    onClick={onToggleNotifications}
                    aria-label="Bildirimler"
                >
                    <IoMdNotificationsOutline size={20} />
                    {hasNewNotification && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2.5 h-2.5 flex items-center justify-center border border-neutral-900" />
                    )}
                </div>

                {/* Ayarlar/Profil İkonu (Bildirimin Sağında) */}
                <div
                    ref={settingsButtonRef} // Ref ana bileşenden geliyor
                    className="text-neutral-100 cursor-pointer hover:text-pink-500 transition duration-300 select-none"
                    onClick={onToggleSettings}
                    aria-label="Ayarlar ve Diğer Seçenekler"
                >
                    <BiDotsVerticalRounded size={20} />
                </div>
            </div>
            {/* --- Masaüstü Sağ İkonlar Sonu --- */}

            {/* --- Mobil Sağ İkonlar (Değişiklik Yok) --- */}
            <div className="flex md:hidden items-center space-x-4">
                <button
                    className="text-neutral-100 hover:text-pink-500 transition duration-300"
                    onClick={onToggleMobileSearch}
                    aria-label="Arama yap"
                >
                    <MdSearch size={22} />
                </button>
                <button
                    ref={mobileMenuButtonRef} // Ref ana bileşenden geliyor
                    className="text-neutral-100 hover:text-pink-500 transition duration-300"
                    onClick={onToggleMobileMenu}
                    aria-label="Menüyü aç/kapat"
                >
                    <MdMenu size={24} />
                </button>
            </div>
            {/* --- Mobil Sağ İkonlar Sonu --- */}
        </div>
    );
};

export default NavbarActions;
