import React from "react";
import { GlowEffect } from "../../components/ui/effects";
import { FaGoogle } from "react-icons/fa6";
import { Navbar } from "../../components/common";
import AuthForm from "../../components/features/auth/AuthForm";
import { loginFields } from "../../utils/constants";
import { useNavigation } from "../../context/NavigationContext";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/authService";

const LoginPage = () => {
    const { navigateToPage } = useNavigation();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const user = await login(email, password);
        if (!user) {
            console.log("Giriş işlemi başarısız!");
            return;
        }
        setIsAuthenticated(true);
        navigateToPage("/");
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-8 sm:px-6 lg:px-24 z-10">
                <Navbar />
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
                    forgotPasswordLink={"/forgot-password"}
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
