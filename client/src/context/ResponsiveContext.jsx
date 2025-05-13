import React, { createContext, useContext, useState, useEffect } from "react";

// Responsive Context oluşturma
const ResponsiveContext = createContext();

// Hook kullanımı için
export const useResponsive = () => useContext(ResponsiveContext);

// Ekran boyutu sınıfları
const breakpoints = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

export const ResponsiveProvider = ({ children }) => {
    // Varsayılan ekran boyutunu ve ayarlarını belirleme
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < breakpoints.md
    );
    const [isTablet, setIsTablet] = useState(
        window.innerWidth >= breakpoints.md &&
            window.innerWidth < breakpoints.lg
    );
    const [isDesktop, setIsDesktop] = useState(
        window.innerWidth >= breakpoints.lg
    );
    const [isLandscape, setIsLandscape] = useState(
        window.innerWidth > window.innerHeight
    );

    // Cihaz boyutlarına göre bileşen yapısı belirleyicileri
    const [compactUI, setCompactUI] = useState(
        window.innerWidth < breakpoints.md
    );

    // Cihaz tipi algılama
    const [isTouchDevice, setIsTouchDevice] = useState(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
    );

    // Pencere boyut değişimlerini izle
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setScreenSize({ width, height });
            setIsMobile(width < breakpoints.md);
            setIsTablet(width >= breakpoints.md && width < breakpoints.lg);
            setIsDesktop(width >= breakpoints.lg);
            setIsLandscape(width > height);
            setCompactUI(width < breakpoints.md);
        };

        // Event listener ekleme
        window.addEventListener("resize", handleResize);

        // Başlangıçtaki değerleri ayarla
        handleResize();

        // Temizleme
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Breakpoint kontrolü için yardımcı fonksiyon
    const isBreakpoint = (breakpoint) => {
        if (!breakpoints[breakpoint]) return false;
        return screenSize.width >= breakpoints[breakpoint];
    };

    // Context değerleri
    const value = {
        screenSize,
        isMobile,
        isTablet,
        isDesktop,
        isLandscape,
        compactUI,
        isTouchDevice,
        isBreakpoint,
        breakpoints,
    };

    return (
        <ResponsiveContext.Provider value={value}>
            {children}
        </ResponsiveContext.Provider>
    );
};
