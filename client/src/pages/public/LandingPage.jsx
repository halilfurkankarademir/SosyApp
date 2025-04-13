import React, { useEffect } from "react";
import { PrimaryButton } from "../../components/ui/buttons";
import { GlowEffect } from "../../components/ui/effects";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/common";
import landingImage from "../../assets/images/landing.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

/**
 * Uygulamanın karşılama sayfası bileşeni
 * Ziyaretçileri karşılayan ve kayıt/giriş için yönlendiren sayfa
 */
const LandingPage = () => {
    const navigate = useNavigate();

    /**
     * Verilen yola yönlendirme yapar
     * path parametresi ile belirtilen sayfaya yönlendirir
     */
    const handleClick = (path) => {
        navigate(`/${path}`);
    };

    /**
     * Sayfa yüklendiğinde sayfayı en üste kaydırır
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 z-10">
                <Navbar isInAppPage={false} />
                <GlowEffect />
                {/* Sol Tarafta Metin ve Butonlar */}
                <div className="max-w-2xl w-full space-y-6 md:space-y-8 text-center md:text-left">
                    <div>
                        <h1
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 md:mb-8 select-none"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            SosyApp
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-8">
                            SosyApp ile yeni insanlarla tanış, fikirlerini
                            paylaş ve dünyayı keşfetmeye başla. Hemen katıl ve
                            sosyal deneyimini bir üst seviyeye taşı!
                        </p>
                    </div>
                    {/* Butonlar */}
                    <div className="flex justify-center md:justify-start space-x-4">
                        <PrimaryButton
                            buttonText={"Hemen Kullanmaya Başla"}
                            handleClick={() => handleClick("auth-selection")}
                        />
                    </div>
                </div>
                {/* Sağ Tarafta Resim */}
                <div className="hidden md:block md:ml-12 lg:ml-20 z-10 mt-8 md:mt-0">
                    <LazyLoadImage
                        src={landingImage}
                        alt="Landing Page"
                        className="w-full h-96 rounded-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default LandingPage;
