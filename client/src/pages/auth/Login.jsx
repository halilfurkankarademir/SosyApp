import React, { useEffect } from "react";
import { GlowEffect } from "../../components/ui/effects";
import { FaGoogle } from "react-icons/fa6";
import { Navbar } from "../../components/common";
import AuthForm from "../../components/features/auth/AuthForm";
import { loginFields } from "../../utils/constants";
import { useNavigation } from "../../context/NavigationContext";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/authApi";
import { ShowToast } from "../../components/ui/toasts/ShowToast";

const LoginPage = () => {
    const { navigateToPage } = useNavigation();
    const { isAuthenticated, setIsAuthenticated, setUser, setUserRole } =
        useAuth();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            if (!email || !password) {
                ShowToast("warning", "Lütfen e-posta ve şifre giriniz.");
                return;
            }
            const response = await login(email, password);
            if (!response) {
                console.log("Giriş işlemi başarısız!");
                return;
            }
            // Kullanıcı bilgilerini context'e kaydet
            setIsAuthenticated(true);
            setUser(response.user);
            setUserRole(response.user.role);

            // Admin kullanıcı ise admin paneline yönlendir
            if (response.user.role === "admin") {
                navigateToPage("/admin");
            } else {
                navigateToPage("/");
            }
        } catch (error) {
            console.log("Login error:", error);
            const errorMessage = error.response
                ? error.response.data.details
                : "Giriş başarısız";
            ShowToast("error", errorMessage);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateToPage("/");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Giriş Yap - SosyApp";
    }, []);

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
            </div>
        </>
    );
};

export default LoginPage;
