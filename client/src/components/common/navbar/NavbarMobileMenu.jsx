import React from "react";
// Gerekli kullanıcı ikonlarını import et...
import { MdClose, MdAccountCircle, MdSettings, MdLogout } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import { BiBookmark } from "react-icons/bi";
import useUserStore from "../../../hooks/useUserStore"; // Path'i ayarlayın

const NavbarMobileMenu = ({
    show,
    menuRef,
    onClose,
    navigateToPage,
    onSettingsClick,
    onLogoutClick,
}) => {
    const user = useUserStore((state) => state.user);

    if (!show) return null;

    const handleNavigate = (path) => {
        onClose();
        navigateToPage(path);
    };

    // Butonlar için ortak class'lar
    const buttonClass =
        "flex items-center w-full text-left space-x-3 p-3 hover:bg-neutral-700 rounded-lg cursor-pointer text-neutral-100 transition-colors";
    const iconClass = "text-neutral-400";
    const textClass = "text-sm";

    return (
        <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={onClose} // Dışarı tıklayınca kapat
        >
            <div
                ref={menuRef} // Ref ana bileşenden geliyor
                className="fixed top-0 right-0 bottom-0 w-64 bg-neutral-800 shadow-xl p-4 z-50 transform transition-transform duration-300 ease-in-out"
                style={{
                    transform: show ? "translateX(0)" : "translateX(100%)",
                }}
                onClick={(e) => e.stopPropagation()} // Menü içine tıklayınca kapanmasın
            >
                {/* Başlık ve Kapatma */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-700">
                    <h2 className="text-white text-lg font-semibold">Menü</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700"
                        aria-label="Menüyü kapat"
                    >
                        <MdClose size={22} />
                    </button>
                </div>

                {/* Menü Linkleri */}
                <nav className="space-y-2">
                    <button
                        onClick={() =>
                            handleNavigate(`/profile/${user?.username}`)
                        }
                        className={buttonClass}
                    >
                        <MdAccountCircle size={20} className={iconClass} />{" "}
                        <span className={textClass}>Profilim</span>
                    </button>
                    <button
                        onClick={() => handleNavigate("/followers")}
                        className={buttonClass}
                    >
                        <BsPeopleFill size={20} className={iconClass} />{" "}
                        <span className={textClass}>Takipçilerim</span>
                    </button>
                    <button
                        onClick={() => handleNavigate("/favorites")}
                        className={buttonClass}
                    >
                        <GoHeartFill size={20} className={iconClass} />{" "}
                        <span className={textClass}>Favorilerim</span>
                    </button>
                    <button
                        onClick={() => handleNavigate("/saved")}
                        className={buttonClass}
                    >
                        <BiBookmark size={20} className={iconClass} />{" "}
                        <span className={textClass}>Kaydettiklerim</span>
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onSettingsClick();
                        }}
                        className={buttonClass}
                    >
                        <MdSettings size={20} className={iconClass} />{" "}
                        <span className={textClass}>Ayarlar</span>
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onLogoutClick();
                        }}
                        className={buttonClass}
                    >
                        <MdLogout size={20} className={iconClass} />{" "}
                        <span className={textClass}>Çıkış Yap</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default NavbarMobileMenu;
