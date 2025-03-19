import React from "react";

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white py-6">
            <div className="container mx-auto px-6 text-center">
                {/* Logo */}
                <p
                    className="md:text-2xl text-xl mb-4 select-none"
                    style={{
                        fontFamily: "Bagel Fat One",
                    }}
                >
                    SosyApp
                </p>

                {/* Telif Hakkı ve Gizlilik Politikası */}
                <div className="text-sm text-gray-400">
                    <p className="mb-2">
                        &copy; {new Date().getFullYear()} SosyApp. Tüm hakları
                        saklıdır.
                    </p>
                    <p>
                        <a
                            href="/privacy-policy"
                            className="hover:text-white transition duration-300"
                        >
                            Gizlilik Politikası
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
