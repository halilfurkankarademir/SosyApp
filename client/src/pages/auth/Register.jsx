import React from "react";
import { GlowEffect } from "../../components/ui/effects";
import { Navbar } from "../../components/common";
import { useNavigation } from "../../context/NavigationContext";
import AuthForm from "../../components/features/auth/AuthForm";
import { registerFields } from "../../utils/constants";

const RegisterPage = () => {
    const { navigateToPage } = useNavigation();

    const handleRegister = (e) => {
        e.preventDefault();
        // Kayıt işlemleri burada yapılabilir
        navigateToPage("/user-info"); // Kayıt başarılıysa yönlendirme
    };

    return (
        <>
            <Navbar />
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
