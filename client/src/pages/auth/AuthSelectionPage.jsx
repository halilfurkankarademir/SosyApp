import React from "react";
import { useNavigate } from "react-router-dom";
import GlowEffect from "../../components/ui/effects/GlowEffect";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // React Icons'tan ikonları import ediyoruz
import LargeButton from "../../components/ui/buttons/LargeButton";

const AuthSelectionPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-24 px-8 sm:px-6 lg:px-24 z-10">
                <GlowEffect />
                <div className="max-w-4xl w-full space-y-8 z-10">
                    <div>
                        <h1
                            className="md:text-8xl text-4xl mb-8 select-none text-center"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            Selam :)
                        </h1>
                        <p className="text-md text-gray-300 text-center mb-8">
                            SosyApp'e giriş yap veya kayıt olarak sosyal
                            deneyimine başla!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Giriş Yap Kutucuğu */}
                        <LargeButton
                            buttonTxt="Hesabım Var"
                            desc="Giriş Yap"
                            handleClick={() => navigate("/login")}
                            icon={
                                <FaSignInAlt className="w-8 h-8 text-pink-400 mb-4" />
                            } // React Icons kullanımı
                        />

                        {/* Kayıt Ol Kutucuğu */}
                        <LargeButton
                            buttonTxt="Hesabım Yok"
                            desc="Yeni Hesap Oluştur"
                            handleClick={() => navigate("/register")}
                            icon={
                                <FaUserPlus className="w-8 h-8 text-pink-400 mb-4" />
                            } // React Icons kullanımı
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthSelectionPage;
