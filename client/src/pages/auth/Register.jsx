import React from "react";
import { GlowEffect } from "../../components/ui/effects";
import { Navbar } from "../../components/common";
import { useNavigation } from "../../context/NavigationContext";
import AuthForm from "../../components/features/auth/AuthForm";
import { registerFields } from "../../utils/constants";
import { register } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { ShowToast } from "../../components/ui/toasts/ShowToast";

const RegisterPage = () => {
    const { navigateToPage } = useNavigation();
    const { setIsAuthenticated } = useAuth();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get("email");
            const password = formData.get("password");
            const username = formData.get("username");
            const firstName = formData.get("firstName");
            const lastName = formData.get("lastName");
            if (!email || !password || !username || !firstName || !lastName) {
                ShowToast("warning", "Lütfen tüm alanları doldurun.");
                return;
            }
            if (password.length < 6) {
                ShowToast("warning", "Şifre en az 6 karakter olmalıdır.");
                return;
            }

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
            setIsAuthenticated(true);
            // Kayıt başarılıysa yönlendirme
            navigateToPage("/");
        } catch (error) {
            console.log("Kayıt işlemi basarısız!", error);
            const errorMessage = error.response.data.message;
            ShowToast("error", errorMessage);
        }
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
