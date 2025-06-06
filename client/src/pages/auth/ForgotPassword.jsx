import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlowEffect from "../../components/ui/effects/GlowEffect";
import { Navbar } from "../../components/common";
import { useNavigation } from "../../context/NavigationContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { navigateToPage } = useNavigation();

    const handleCancel = () => {
        navigateToPage("/login");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normalde burası backend'e istek yapacak
        if (email) {
            setIsSubmitted(true);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Şifre Sıfırlama - SosyApp";
    }, []);

    return (
        <>
            <Navbar />
            <GlowEffect />
            <div className="page-container flex justify-center items-center">
                <div className="bg-neutral-800 p-8 rounded-xl shadow-xl w-full max-w-md z-10 border border-neutral-700">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                        Şifreni mi Unuttun?
                    </h2>

                    {!isSubmitted ? (
                        <>
                            <p className="text-neutral-400 mb-8 text-center">
                                E-posta adresini gir ve şifreni sıfırlamak için
                                bir bağlantı gönderelim.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-neutral-300 mb-2"
                                    >
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="ornek@mail.com"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all font-medium"
                                >
                                    Sıfırlama Bağlantısı Gönder
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="bg-green-600 bg-opacity-20 p-4 rounded-lg mb-6">
                                <p className="text-white">
                                    Şifre sıfırlama bağlantısı e-posta adresine
                                    gönderildi. Lütfen gelen kutunu kontrol et.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-pink-500 hover:underline"
                            >
                                Farklı bir e-posta adresi dene
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="cursor-pointer" onClick={handleCancel}>
                            Giriş sayfasına dön
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
