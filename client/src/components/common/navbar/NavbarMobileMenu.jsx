import React, { useState, useEffect } from "react";
// Gerekli kullanıcı ikonlarını import et...
import {
    MdClose,
    MdAccountCircle,
    MdSettings,
    MdLogout,
    MdAdminPanelSettings,
} from "react-icons/md";
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
    onAdminClick,
    isAdmin,
}) => {
    const user = useUserStore((state) => state.user);
    const [animationState, setAnimationState] = useState("closed");

    // Menü açılış/kapanış animasyonunu kontrol et
    useEffect(() => {
        if (show) {
            setAnimationState("opening");
            const timer = setTimeout(() => setAnimationState("open"), 300);
            return () => clearTimeout(timer);
        } else {
            if (animationState === "open") {
                setAnimationState("closing");
                const timer = setTimeout(
                    () => setAnimationState("closed"),
                    300
                );
                return () => clearTimeout(timer);
            }
        }
    }, [show]);

    // Tamamen kapalıysa hiçbir şey render etme
    if (animationState === "closed" && !show) return null;

    const handleNavigate = (path) => {
        onClose();
        navigateToPage(path);
    };

    // Butonlar için ortak class'lar
    const buttonClass =
        "flex items-center w-full text-left space-x-3 p-4 hover:bg-neutral-700/50 rounded-lg cursor-pointer text-neutral-100 transition-colors touch-target";
    const iconClass = "text-neutral-400 text-xl";
    const textClass = "text-base";

    // Animasyon durumuna göre sınıflar belirle
    const overlayClass = `fixed inset-0 bg-black/30 backdrop-blur-md z-40 ${
        animationState === "opening" || animationState === "open"
            ? "opacity-100"
            : "opacity-0"
    } transition-opacity duration-300`;

    const menuClass = `fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-neutral-900 border-l border-neutral-700/50 p-4 z-50 h-full overflow-y-auto transform transition-transform duration-300 ${
        animationState === "opening" || animationState === "open"
            ? "translate-x-0"
            : "translate-x-full"
    }`;

    return (
        <div className={overlayClass} onClick={onClose}>
            <div
                ref={menuRef}
                className={menuClass}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Kullanıcı bilgisi ve kapanış butonu */}
                <div className="flex flex-col mb-6 border-b border-neutral-700/50 pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-white text-lg font-semibold">
                            Menü
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-700/50 transition-colors touch-target"
                            aria-label="Menüyü kapat"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>

                    {/* Profil başlığı */}
                    {user && (
                        <div className="flex items-center space-x-3 p-2 mb-2">
                            <img
                                src={
                                    user?.profilePicture ||
                                    "/default-avatar.png"
                                }
                                alt="Profil Resmi"
                                className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                                onError={(e) =>
                                    (e.target.src = "/default-avatar.png")
                                }
                            />
                            <div>
                                <p className="text-white font-semibold">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-neutral-400 text-sm">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Menü Linkleri */}
                <nav className="space-y-2">
                    {/* Admin Paneli seçeneği sadece admin kullanıcılar için gösterilir */}
                    {isAdmin() && (
                        <button
                            onClick={() => {
                                onClose();
                                onAdminClick();
                            }}
                            className={buttonClass}
                        >
                            <MdAdminPanelSettings
                                size={24}
                                className={iconClass}
                            />
                            <span className={textClass}>Yönetici Paneli</span>
                        </button>
                    )}
                    <button
                        onClick={() =>
                            handleNavigate(`/profile/${user?.username}`)
                        }
                        className={buttonClass}
                    >
                        <MdAccountCircle size={24} className={iconClass} />
                        <span className={textClass}>Profilim</span>
                    </button>
                    <button
                        onClick={() => handleNavigate("/connections")}
                        className={buttonClass}
                    >
                        <BsPeopleFill size={22} className={iconClass} />
                        <span className={textClass}>Sosyal Ağım</span>
                    </button>
                    <button
                        onClick={() => handleNavigate("/favorites")}
                        className={buttonClass}
                    >
                        <GoHeartFill size={22} className={iconClass} />
                        <span className={textClass}>Favorilerim</span>
                    </button>
                    <button
                        onClick={() => handleNavigate("/saved")}
                        className={buttonClass}
                    >
                        <BiBookmark size={22} className={iconClass} />
                        <span className={textClass}>Kaydettiklerim</span>
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onSettingsClick();
                        }}
                        className={buttonClass}
                    >
                        <MdSettings size={24} className={iconClass} />
                        <span className={textClass}>Ayarlar</span>
                    </button>

                    {/* Çıkış Butnunun sınıfı daha aşağıda */}
                    <div className="pt-4 mt-4 border-t border-neutral-700/50">
                        <button
                            onClick={() => {
                                onClose();
                                onLogoutClick();
                            }}
                            className={`${buttonClass} text-red-400 hover:text-red-500 hover:bg-red-900/20`}
                        >
                            <MdLogout size={24} className="text-red-400" />
                            <span className={textClass}>Çıkış Yap</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavbarMobileMenu;
