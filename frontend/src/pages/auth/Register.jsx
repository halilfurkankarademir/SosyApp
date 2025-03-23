import React from "react";
import { GlowEffect } from "../../components/ui/effects";
import { Navbar } from "../../components/common";
import { useNavigation } from "../../context/NavigationContext";
import AuthForm from "../../components/features/auth/AuthForm";

const RegisterPage = () => {
    const { navigateToPage } = useNavigation();

    const handleRegister = (e) => {
        e.preventDefault();
        // Kayıt işlemleri burada yapılabilir
        navigateToPage("/user-info"); // Kayıt başarılıysa yönlendirme
    };

    // Form alanları tanımı
    const registerFields = [
        {
            id: "name",
            name: "name",
            type: "text",
            autoComplete: "name",
            required: true,
            placeholder: "Ad",
        },
        {
            id: "surname",
            name: "surname",
            type: "text",
            autoComplete: "family-name",
            required: true,
            placeholder: "Soyad",
        },
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
            autoComplete: "new-password",
            required: true,
            placeholder: "Şifre",
        },
        {
            id: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            autoComplete: "new-password",
            required: true,
            placeholder: "Şifre Tekrar",
        },
    ];

    return (
        <>
            <Navbar isInAppPage={false} />
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-24 px-8 sm:px-6 lg:px-24 z-10">
                <GlowEffect />
                <AuthForm
                    title="Kayıt Ol"
                    subtitle="SosyApp'e kayıt ol ve sosyal deneyimine başla!"
                    fields={registerFields}
                    buttonText="Kayıt Ol"
                    onSubmit={handleRegister}
                    alternateLink="/login"
                    alternateLinkText="Hesabın var mı?"
                />
            </div>
        </>
    );
};

export default RegisterPage;
