import React from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import GlowEffect from "../../components/GlowEffect";
import Navbar from "../../components/common/Navbar";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Kayıt işlemleri burada yapılabilir
        navigate("/dashboard"); // Kayıt başarılıysa yönlendirme
    };

    return (
        <>
            <Navbar isInAppPage={false} />
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-24 px-8 sm:px-6 lg:px-24 z-10">
                <GlowEffect />
                {/* Kayıt Formu */}
                <div className="max-w-md w-full space-y-8 z-10">
                    <div>
                        <h1
                            className="md:text-8xl text-4xl mb-8 select-none text-center"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            Kayıt Ol
                        </h1>
                        <p className="text-md text-gray-300 text-center mb-8">
                            SosyApp'e kayıt ol ve sosyal deneyimine başla!
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleRegister}>
                        {/* Ad Alanı */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300"
                            ></label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Ad"
                            />
                        </div>

                        {/* Soyad Alanı */}
                        <div>
                            <label
                                htmlFor="surname"
                                className="block text-sm font-medium text-gray-300"
                            ></label>
                            <input
                                id="surname"
                                name="surname"
                                type="text"
                                autoComplete="family-name"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Soyad"
                            />
                        </div>

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
                                required
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
                                autoComplete="new-password"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Şifre"
                            />
                        </div>

                        {/* Şifre Tekrar Alanı */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-300"
                            ></label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Şifre Tekrar"
                            />
                        </div>

                        {/* Kayıt Ol Butonu */}
                        <div>
                            <PrimaryButton
                                type="submit"
                                buttonText={"Kayıt Ol"}
                                fullWidth={true}
                                className="w-full"
                            />
                        </div>
                    </form>

                    {/* Giriş Yap Bağlantısı */}
                    <div className="text-center">
                        <p className="text-md text-gray-400">
                            Hesabın var mı?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-pink-500 hover:text-pink-600 font-medium cursor-pointer"
                            >
                                Giriş Yap
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
