import React, { useState, useEffect } from "react";
import { NavigationPanel } from "./";
import { NavigationPanelSkeleton } from "../../utils/SkeletonGenerator";
import useUserStore from "../../hooks/useUserStore";

const Sidebar = ({ isCompact: propIsCompact = false }) => {
    const [loading, setLoading] = useState(true);
    const [isCompact, setIsCompact] = useState(propIsCompact);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const user = useUserStore((state) => state.user);

    // Ekran boyutunu dinle ve ona göre compact modu ayarla
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);

            // Ekran boyutuna göre otomatik compact mod ayarlama
            if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                setIsCompact(true);
            } else {
                setIsCompact(propIsCompact);
            }
        };

        window.addEventListener("resize", handleResize);
        // İlk yükleme için çalıştır
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [propIsCompact]);

    useEffect(() => {
        // Kullanıcı verisi yüklendiğinde loading durumunu false yap
        if (user) {
            setLoading(false);
        }
    }, [user]);

    // Ekran boyutuna göre genişlik sınıfını belirle
    const sidebarWidthClass = isCompact ? "w-20" : "w-64";

    return (
        <div className="hidden md:block md:col-span-1 fixed z-10 transition-all duration-300">
            <div
                className={`${sidebarWidthClass} bg-neutral-800 rounded-xl transition-all duration-300`}
            >
                {loading ? (
                    <NavigationPanelSkeleton isCompact={isCompact} />
                ) : (
                    <NavigationPanel isCompact={isCompact} />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
