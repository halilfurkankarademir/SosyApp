import React, { memo } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigation } from "../../context/NavigationContext";
import { PrimaryButton } from "../../components/ui/buttons";
import { Navbar } from "../../components/common";
import { GlowEffect } from "../../components/ui/effects";

const ErrorPage = () => {
    const { navigateToPage } = useNavigation();

    return (
        <>
            <Navbar />
            <GlowEffect />
            <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white p-4">
                {/* Hata İkonu */}
                <div className="text-red-400 mb-4">
                    <BiErrorCircle className="text-6xl md:text-8xl" />
                </div>

                {/* Başlık */}
                <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-center">
                    Bir Hata Oluştu!
                </h1>

                {/* Açıklama Metni */}
                <p className="text-neutral-400 text-sm md:text-base text-center mb-6 mt-2">
                    Üzgünüz, bir şeyler ters gitti. Lütfen daha sonra tekrar
                    deneyin veya ana sayfaya dönün.
                </p>

                {/* Buton */}
                <PrimaryButton
                    buttonText="Ana Sayfaya Dön"
                    handleClick={() => navigateToPage("/")}
                />
            </div>
        </>
    );
};

export default memo(ErrorPage);
