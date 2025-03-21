import React, { useState } from "react";
import {
    FaSave,
    FaTimes,
    FaArrowLeft,
    FaBell,
    FaLock,
    FaTrash,
} from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdAccountCircle, MdDelete } from "react-icons/md";

const SettingsPage = () => {
    const navigate = useNavigate();

    // Ayarlar için state'ler
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [accountHidden, setAccountHidden] = useState(false);

    const handleCancel = () => {
        navigate("/profile");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            notificationsEnabled,
            accountHidden,
        });
        alert("Ayarlar başarıyla kaydedildi!");
    };

    const handleDeleteAccount = () => {
        if (
            window.confirm(
                "Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
            )
        ) {
            console.log("Hesap silindi!");
            navigate("/");
        }
    };

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="bg-neutral-900 min-h-screen text-white py-28 px-4 md:px-8 lg:px-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                        {/* Başlık */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-700">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleCancel}
                                    className="text-white p-2 rounded-full hover:bg-neutral-700 transition"
                                >
                                    <FaArrowLeft />
                                </button>
                                <h1 className="text-lg md:text-2xl font-bold">
                                    Ayarlar
                                </h1>
                            </div>
                        </div>

                        {/* İçerik Alanı */}
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                {/* Bildirim Ayarları */}
                                <div className="mb-6">
                                    <div className="flex flex-row text-xl items-center mb-4 gap-2">
                                        <FaBell />
                                        <h2 className=" font-semibold ">
                                            Bildirimler
                                        </h2>
                                    </div>
                                    <div className="flex items-center justify-between bg-neutral-700 p-4 rounded-lg">
                                        <div>
                                            <p className="font-medium">
                                                Bildirimleri Aktif Et
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Yeni mesaj, beğeni ve yorum
                                                bildirimlerini al
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationsEnabled}
                                                onChange={() =>
                                                    setNotificationsEnabled(
                                                        !notificationsEnabled
                                                    )
                                                }
                                            />
                                            <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Hesabı Gizle */}
                                <div className="mb-6">
                                    <div className="flex flex-row text-xl items-center mb-4 gap-2">
                                        <FaLock />
                                        <h2 className=" font-semibold ">
                                            Gizlilik
                                        </h2>
                                    </div>
                                    <div className="flex items-center justify-between bg-neutral-700 p-4 rounded-lg">
                                        <div>
                                            <p className="font-medium">
                                                Hesabımı Gizle
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Hesabınızı diğer kullanıcılardan
                                                gizler
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={accountHidden}
                                                onChange={() =>
                                                    setAccountHidden(
                                                        !accountHidden
                                                    )
                                                }
                                            />
                                            <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Hesabı Sil */}
                                <div className="mb-6">
                                    <div className="flex flex-row text-xl items-center mb-4 gap-2">
                                        <MdAccountCircle size={24} />
                                        <h2 className=" font-semibold ">
                                            Hesap Yönetimi
                                        </h2>
                                    </div>
                                    <div className="bg-neutral-700 p-6 rounded-lg border border-red-500/30">
                                        <h3 className="text-lg font-medium mb-2 text-red-400">
                                            Hesabı Sil
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Tüm verileriniz kalıcı olarak
                                            silinecek ve bu işlem geri alınamaz.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleDeleteAccount}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            Hesabımı Kalıcı Olarak Sil
                                        </button>
                                    </div>
                                </div>

                                {/* Kaydet ve İptal Butonları */}
                                <div className="flex justify-end mt-8 space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-2 bg-neutral-700 text-white rounded-lg flex items-center space-x-2 hover:bg-neutral-600 transition"
                                    >
                                        <FaTimes />
                                        <span>İptal</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-lg flex items-center space-x-2 transition"
                                    >
                                        <FaSave />
                                        <span>Değişiklikleri Kaydet</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
