import React from "react";
import { useNavigate } from "react-router-dom";
import GlowEffect from "../../components/ui/effects/GlowEffect";
import Navbar from "../../components/common/Navbar";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // React Icons'tan ikonları import ediyoruz

const AuthSelectionPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar isInAppPage={false} />
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
                        <div
                            className="flex flex-col items-center justify-center p-8 bg-neutral-800  rounded-lg cursor-pointer hover:bg-neutral-700 transition duration-300"
                            onClick={() => navigate("/login")}
                        >
                            <FaSignInAlt className="w-8 h-8 text-pink-400 mb-4" />{" "}
                            {/* React Icons kullanımı */}
                            <h2 className="text-2xl font-medium text-white">
                                Hesabım Var
                            </h2>
                            <p className="text-md text-gray-400">Giriş Yap</p>
                        </div>

                        {/* Kayıt Ol Kutucuğu */}
                        <div
                            className="flex flex-col items-center justify-center p-8 bg-neutral-800  rounded-lg cursor-pointer hover:bg-neutral-700 transition duration-300"
                            onClick={() => navigate("/register")}
                        >
                            <FaUserPlus className="w-8 h-8 text-pink-400 mb-4" />{" "}
                            {/* React Icons kullanımı */}
                            <h2 className="text-2xl font-semibold text-white">
                                Hesabım Yok
                            </h2>
                            <p className="text-md text-gray-400">
                                Yeni Hesap Oluştur
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthSelectionPage;
