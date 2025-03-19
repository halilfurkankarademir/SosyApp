import React, { useEffect, useState } from "react";

const GlowEffect = () => {
    //Pozisyon datasi
    const [position, setPosition] = useState({ x: 0, y: 0 });

    //Mouse hareketini takip et ve pozisyonu guncelle
    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className="absolute w-72 h-72 bg-gradient-to-r from-pink-500 to-blue-900 rounded-full blur-3xl opacity-40 pointer-events-none "
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(-50%, -50%)",
            }}
        ></div>
    );
};

export default GlowEffect;
