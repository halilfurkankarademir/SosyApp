import React from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PrimaryButtonOutline from "../components/buttons/PrimaryButtonOutline";
import GlowEffect from "../components/GlowEffect";
import Footer from "../components/common/Footer";
import { navigateToPage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(`/${path}`);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-8 sm:px-6 lg:px-24">
                <GlowEffect />
                {/* Sol Tarafta Metin ve Butonlar */}
                <div className="max-w- w-full space-y-8">
                    <div>
                        <h1
                            className="md:text-8xl text-6xl mb-8 select-none"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            SosyApp
                        </h1>
                        <p className="mt-4 text-white mb-8">
                            SosyApp ile yeni insanlarla tanış, fikirlerini
                            paylaş ve dünyayı keşfetmeye başla. Hemen katıl ve
                            sosyal deneyimini bir üst seviyeye taşı!
                        </p>
                    </div>
                    {/* Butonlar */}
                    <div className="flex space-x-4">
                        <PrimaryButton
                            buttonText={"Kayıt Ol"}
                            handleClick={() => handleClick("register")}
                        />
                        <PrimaryButtonOutline
                            buttonText={"Giriş Yap"}
                            handleClick={() => handleClick("login")}
                        />
                    </div>
                </div>
                {/* Sağ Tarafta Resim */}
                <div className="hidden md:block ml-20 z-10">
                    <img
                        src={
                            "https://images.unsplash.com/photo-1626298022400-84e2c187be08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt="Uygulama Resmi"
                        className="rounded-lg shadow-2xl object-cover"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
