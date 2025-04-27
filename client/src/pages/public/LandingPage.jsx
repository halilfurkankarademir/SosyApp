import React, { useEffect } from "react";
import { PrimaryButton } from "../../components/ui/buttons";
import { GlowEffect } from "../../components/ui/effects";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Blur efekti için gerekli
import { useNavigation } from "../../context/NavigationContext";

/**
 * Uygulamanın karşılama sayfası bileşeni
 * Ziyaretçileri karşılayan ve kayıt/giriş için yönlendiren sayfa
 */
const LandingPage = () => {
    const { navigateToPage } = useNavigation();

    /**
     * Verilen yola yönlendirme yapar
     * path parametresi ile belirtilen sayfaya yönlendirir
     */
    const handleClick = (path) => {
        navigateToPage(`/${path}`);
    };

    /**
     * Sayfa yüklendiğinde sayfayı en üste kaydırır
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* GlowEffect'i container'ın içine ve belki arkasına almak daha iyi olabilir (z-0?) */}
                <GlowEffect className="-z-10" />{" "}
                {/* Glow'u arkaya almak için z-index ekledim */}
                {/* Sol Tarafta Metin ve Butonlar (z-10 ekleyerek glow'un üzerinde kalmasını sağlayabiliriz) */}
                <div className="max-w-2xl w-full space-y-6 md:space-y-8 text-center md:text-left z-10">
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
                {/* Sağ Tarafta Resim (z-10 ekleyerek glow'un üzerinde kalmasını sağlayabiliriz) */}
                <div className="hidden md:block md:ml-12 lg:ml-20 z-10 mt-8 md:mt-0">
                    <LazyLoadImage
                        src="https://res.cloudinary.com/djkg7dhyx/image/upload/v1745754025/landing_ba0fz7.jpg"
                        alt="SosyApp Arayüzü" // Daha açıklayıcı bir alt metin
                        className="w-full h-96 rounded-lg object-cover" // object-cover eklemek resmin orantısını korur
                        effect="blur" // Yüklenirken bulanıklaştırma efekti
                    />
                </div>
            </div>
        </>
    );
};

export default LandingPage;
