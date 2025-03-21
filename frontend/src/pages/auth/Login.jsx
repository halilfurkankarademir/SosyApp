import React from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import GlowEffect from "../../components/GlowEffect";
import { FaGoogle } from "react-icons/fa6";
import Navbar from "../../components/common/Navbar";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Giriş işlemleri burada yapılabilir
        navigate("/home"); // Giriş başarılıysa yönlendirme
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-12 px-8 sm:px-6 lg:px-24 z-10">
                <Navbar isInAppPage={false} />
                <GlowEffect />
                {/* Giriş Formu */}
                <div className="max-w-md w-full space-y-8 z-10">
                    <div>
                        <h1
                            className="md:text-8xl text-4xl mb-8 select-none text-center"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            Giris Yap
                        </h1>
                        <p className="text-md text-gray-300 text-center mb-8">
                            SosyApp'e giriş yap ve sosyal deneyimine devam et!
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* E-posta Alanı */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300"
                            ></label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="E-posta"
                            />
                        </div>

                        {/* Şifre Alanı */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300"
                            ></label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Şifre"
                            />
                        </div>

                        {/* Giriş Yap Butonu */}
                        <div>
                            <PrimaryButton
                                type="submit"
                                buttonText={"Giriş Yap"}
                                fullWidth={true}
                                className="w-full"
                            />
                        </div>
                    </form>

                    {/* Kayıt Ol Bağlantısı */}
                    <div className="text-center">
                        <p className="text-md text-gray-400">
                            Hesabın yok mu?{" "}
                            <button
                                onClick={() => navigate("/register")}
                                className="text-pink-500 hover:text-pink-600 font-medium cursor-pointer"
                            >
                                Kayıt Ol
                            </button>
                        </p>
                    </div>

                    {/* Sosyal Giris Butonlari */}
                    <div className="flex justify-center space-x-4">
                        <FaGoogle className="text-xl text-white cursor-pointer " />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
