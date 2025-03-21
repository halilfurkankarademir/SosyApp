import React, { useState } from "react";
import { Link } from "react-router-dom";
import GlowEffect from "../../components/GlowEffect";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normalde burası backend'e istek yapacak
        if (email) {
            setIsSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 relative px-4 sm:px-0">
            <GlowEffect />

            <div className="bg-neutral-800 p-4 sm:p-8 rounded-xl shadow-xl w-full max-w-md z-10 border border-neutral-700">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white">
                    Şifreni mi Unuttun?
                </h2>

                {!isSubmitted ? (
                    <>
                        <p className="text-sm sm:text-base text-neutral-400 mb-6 sm:mb-8 text-center">
                            E-posta adresini gir ve şifreni sıfırlamak için bir
                            bağlantı gönderelim.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 sm:mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-neutral-300 mb-2 text-sm sm:text-base"
                                >
                                    E-posta
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                                    placeholder="senin@email.com"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 sm:py-3 rounded-lg hover:opacity-90 transition-all font-medium text-sm sm:text-base"
                            >
                                Sıfırlama Bağlantısı Gönder
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="bg-green-600 bg-opacity-20 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                            <p className="text-green-400 text-sm sm:text-base">
                                Şifre sıfırlama bağlantısı e-posta adresine
                                gönderildi. Lütfen gelen kutunu kontrol et.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-pink-500 hover:underline text-sm sm:text-base"
                        >
                            Farklı bir e-posta adresi dene
                        </button>
                    </div>
                )}

                <div className="mt-4 sm:mt-6 text-center">
                    <Link
                        to="/login"
                        className="text-pink-500 hover:underline text-sm sm:text-base"
                    >
                        Giriş sayfasına dön
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
