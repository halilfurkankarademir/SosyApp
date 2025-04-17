import React from "react";
import { GlowEffect } from "../../components/ui/effects";
import { Navbar } from "../../components/common";
import { useNavigation } from "../../context/NavigationContext";
import AuthForm from "../../components/features/auth/AuthForm";
import { registerFields } from "../../utils/constants";
import { register } from "../../api/authApi";

const RegisterPage = () => {
    const { navigateToPage } = useNavigation();

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const username = formData.get("username");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const user = await register(
            email.toString().trim(),
            password.toString().trim(),
            username.toString().trim(),
            firstName.toString().trim(),
            lastName.toString().trim()
        );
        if (!user) {
            console.log("Kayıt işlemi başarısız!");
            return;
        }
        console.log("Kayıt işlemi başarılı!", user);
        // Kayıt başarılıysa yönlendirme
        navigateToPage("/");
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
