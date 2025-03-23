import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlowEffect from "../../components/ui/effects/GlowEffect";
import Navbar from "../../components/common/Navbar";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton";
import { useNavigation } from "../../context/NavigationContext";

const UserInfoPage = () => {
    const { navigateToPage } = useNavigation();
    const [formData, setFormData] = useState({
        username: "",
        about: "",
        job: "",
        location: "",
        websiteUrl: "",
        birthDate: "",
        phoneNumber: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username) {
            navigateToPage("/home");
        }
        // Bilgiler kaydedildikten sonra yönlendirme
    };

    return (
        <>
            <Navbar isInAppPage={false} />
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 py-24 px-8 sm:px-6 lg:px-24 z-10">
                <GlowEffect />
                <div className="max-w-md w-full space-y-8 z-10">
                    <div>
                        <h1
                            className="md:text-6xl text-4xl mb-8 select-none text-center"
                            style={{
                                color: "#f986f3",
                                fontFamily: "Bagel Fat One",
                            }}
                        >
                            Profilini Tamamla
                        </h1>
                        <p className="text-md text-gray-300 text-center mb-8">
                            Profilini tamamla ve SosyApp'teki deneyimini
                            kişiselleştir!
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Kullanıcı Adı (Zorunlu) */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Kullanıcı Adı *
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Kullanıcı Adı"
                            />
                        </div>

                        {/* Hakkında (İsteğe Bağlı) */}
                        <div>
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Hakkında
                            </label>
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Kendinden bahset..."
                            ></textarea>
                        </div>

                        {/* Meslek (İsteğe Bağlı) */}
                        <div>
                            <label
                                htmlFor="profession"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Meslek
                            </label>
                            <input
                                id="profession"
                                name="profession"
                                type="text"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Meslek"
                            />
                        </div>

                        {/* Konum (İsteğe Bağlı) */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Konum
                            </label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Konum"
                            />
                        </div>

                        {/* Website (İsteğe Bağlı) */}
                        <div>
                            <label
                                htmlFor="website"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Website
                            </label>
                            <input
                                id="website"
                                name="website"
                                type="url"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Website"
                            />
                        </div>

                        {/* Doğum Tarihi (İsteğe Bağlı) */}
                        <div>
                            <label
                                htmlFor="birthdate"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Doğum Tarihi
                            </label>
                            <input
                                id="birthdate"
                                name="birthdate"
                                type="date"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>

                        {/* Telefon (İsteğe Bağlı) */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-300"
                            >
                                Telefon
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="mt-1 block w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Telefon"
                            />
                        </div>

                        {/* Kaydet Butonu */}
                        <div>
                            <PrimaryButton
                                type="submit"
                                buttonText={"Kaydet"}
                                fullWidth={true}
                                className="w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserInfoPage;
