import React from "react";
import { useNavigate } from "react-router-dom";
import { GlowEffect } from "../../components/ui/effects";
import { FaGoogle } from "react-icons/fa6";
import { Navbar } from "../../components/common";
import AuthForm from "../../components/features/auth/AuthForm";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Giriş işlemleri burada yapılabilir
        navigate("/home"); // Giriş başarılıysa yönlendirme
    };

    // Form alanları tanımı
    const loginFields = [
        {
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            placeholder: "E-posta",
        },
        {
            id: "password",
            name: "password",
            type: "password",
            autoComplete: "current-password",
            required: true,
            placeholder: "Şifre",
        },
    ];

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-8 sm:px-6 lg:px-24 z-10">
                <Navbar isInAppPage={false} />
                <GlowEffect />
                {/* Giriş Formu */}
                <AuthForm
                    title="Giris Yap"
                    subtitle="SosyApp'e giriş yap ve sosyal deneyimine devam et!"
                    fields={loginFields}
                    buttonText="Giriş Yap"
                    onSubmit={handleLogin}
                    alternateLink="/register"
                    alternateLinkText="Hesabın yok mu?"
                />

                {/* Sosyal Giris Butonlari */}
                <div className="flex justify-center space-x-4 absolute bottom-20">
                    <FaGoogle className="text-xl text-white cursor-pointer " />
                </div>
            </div>
        </>
    );
};

export default LoginPage;
