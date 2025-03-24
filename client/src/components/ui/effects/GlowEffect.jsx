import React, { useEffect, useState } from "react";

/**
 * Ekranda rastgele hareket eden parıltı efekti bileşeni
 * Arka planda estetik görünüm sağlayan animasyonlu efekt
 */
const GlowEffect = () => {
    // Pozisyon state'i
    const [position, setPosition] = useState({
        x: window.innerHeight / 2,
        y: window.innerHeight / 2,
    });

    /**
     * Efektin pozisyonunu rastgele günceller
     * Ekran sınırları içinde yeni koordinatlar oluşturur
     */
    const updatePosition = () => {
        const x = Math.random() * window.innerWidth; // Ekran genişliği içinde rastgele x
        const y = Math.random() * window.innerHeight; // Ekran yüksekliği içinde rastgele y
        setPosition({ x, y });
    };

    /**
     * Belirli aralıklarla pozisyonu güncelleyen efekt
     * Component mount edildiğinde çalışır ve unmount edildiğinde temizlenir
     */
    useEffect(() => {
        const interval = setInterval(updatePosition, 2000); // Her 2 saniyede bir güncelle

        // Temizleme fonksiyonu
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="hidden md:block absolute w-72 h-72 bg-gradient-to-r from-pink-500 to-blue-900 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-2000 ease-in-out"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(-50%, -50%)",
            }}
        ></div>
    );
};

export default GlowEffect;
