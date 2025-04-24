import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";

const NavbarSettingsMenu = ({
    show,
    menuRef,
    onSettingsClick,
    onLogoutClick,
}) => {
    if (!show) return null;

    return (
        <div
            ref={menuRef} // Ref ana bileşenden geliyor
            className="fixed flex flex-col gap-1 w-52 top-16 right-4 bg-neutral-800 p-2 rounded-lg shadow-xl border border-neutral-700 animate-fade-in z-50"
        >
            {/* Sadece Kullanıcı Menü Öğeleri */}
            <button
                className="flex flex-row gap-3 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer w-full text-left"
                onClick={onSettingsClick} // Kullanıcı ayarlarına gider
            >
                <MdSettings size={20} className="text-neutral-400" />
                <span className="text-sm">Ayarlar</span>
            </button>
            <button
                className="flex flex-row gap-2 items-center p-2 text-neutral-100 hover:bg-neutral-700 rounded-md transition duration-200 cursor-pointer w-full text-left"
                onClick={onLogoutClick} // Ortak logout
            >
                <MdLogout size={20} className="text-neutral-400 ml-0.5" />
                <span className="text-sm">Çıkış Yap</span>
            </button>
        </div>
    );
};

export default NavbarSettingsMenu;
