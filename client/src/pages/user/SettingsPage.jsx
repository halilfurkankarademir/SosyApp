import React, { useEffect, useState } from "react";
import {
    FaSave,
    FaTimes,
    FaArrowLeft,
    FaBell,
    FaTrashAlt,
    FaCheckCircle,
    FaMailBulk,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Modal from "react-modal";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import useUserStore from "../../hooks/useUserStore";
import { deleteUser, getCurrentUser } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import { sendVerificationMail, verifyUserWithOTP } from "../../api/authApi";

const SettingsPage = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user); // Kullanıcı bilgisini store'dan al
    const { setIsAuthenticated } = useAuth();

    // Ayarlar için state'ler
    const [notificationsEnabled, setNotificationsEnabled] = useState(
        localStorage.getItem("notificationsEnabled") === "true"
    );
    const [accountHidden, setAccountHidden] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isMailSent, setIsMailSent] = useState(false);
    const [otp, setOtp] = useState("");

    const handleModal = () => setIsModalOpen(!isModalOpen);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(
            "notificationsEnabled",
            String(notificationsEnabled)
        );
        console.log("Ayarlar Kaydedildi:", {
            notificationsEnabled,
            accountHidden,
        });
        ShowToast("success", "Ayarlar kaydedildi!");
    };

    const confirmDeleteAccount = async () => {
        try {
            await deleteUser();
            setUser(null);
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            handleModal();
            ShowToast("success", "Hesabınız başarıyla silindi.");
            navigate("/");
        } catch (error) {
            console.log("Hesap silme hatası:", error);
            ShowToast("error", "Hesap silinirken bir hata oluştu.");
        }
    };

    const handleNotificationsToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const handleSendVerificationEmail = async () => {
        // Eğer kullanıcı zaten doğrulanmışsa bu fonksiyon çağrılmamalı (UI'da buton gizlenecek)
        if (user && user.verified) {
            ShowToast("info", "Hesabınız zaten doğrulanmış.");
            return;
        }
        try {
            await sendVerificationMail();
            setIsMailSent(true);
            setOtp("");
            ShowToast(
                "success",
                "Doğrulama maili gönderildi. Lütfen e-postanızı kontrol ediniz."
            );
        } catch (error) {
            console.log("Dogrulama maili gonderme hatasi:", error);
            ShowToast("error", "Dogrulama maili gonderilemedi.");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const otpCode = otp.trim();
            if (otpCode.length !== 6) {
                // Genellikle OTP kodları 6 haneli olur, backend'inize göre ayarlayın
                ShowToast(
                    "warning", // Hata yerine uyarı daha uygun olabilir
                    "Lütfen geçerli bir doğrulama kodu girin (6 hane)."
                );
                return;
            }
            await verifyUserWithOTP(otpCode);
            ShowToast("success", "Hesabınız başarıyla doğrulandı!");
            setIsMailSent(false); // OTP girişini kapat
            setOtp(""); // OTP alanını temizle
            await fetchUserData(); // Kullanıcı verilerini yeniden çekerek 'verified' durumunu güncelle
        } catch (error) {
            console.log("OTP onaylama hatası:", error);
            // API'den gelen hatayı göstermek daha iyi olabilir
            const errorMessage =
                error.response?.data?.message ||
                "OTP onaylama sırasında bir hata oluştu.";
            ShowToast("error", errorMessage);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await getCurrentUser();
            setUser(response); // Zustand store'unu güncelle
        } catch (error) {
            console.log("Kullanıcı verilerini alırken bir hata oluştu:", error);
            // Kullanıcı verileri alınamazsa bir hata mesajı gösterilebilir
            // ShowToast("error", "Kullanıcı bilgileri yüklenemedi.");
        }
    };

    useEffect(() => {
        const appElement = document.getElementById("root");
        if (appElement) {
            Modal.setAppElement(appElement);
        } else {
            console.error(
                "Modal için ana uygulama elementi (#root) bulunamadı."
            );
            Modal.setAppElement("body");
        }
        window.scrollTo(0, 0);
        document.title = "Ayarlar";
        if (!user) {
            // Eğer store'da kullanıcı yoksa veya eksikse çek
            fetchUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // user'ı dependency array'e eklememek için fetchUserData'yı sadece mount'ta çağırıyoruz
    // Eğer user store'dan güncellendiğinde tekrar fetch gerekirse user'ı ekleyip fetchUserData'yı ona göre ayarlamak gerekir.
    // Ancak OTP sonrası zaten fetchUserData çağrılıyor.

    return (
        <>
            <div className="bg-neutral-900 min-h-screen text-white py-28 px-4 md:px-8 lg:px-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-700">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleCancel}
                                    className="text-white p-2 rounded-full hover:bg-neutral-700 transition"
                                    aria-label="Geri dön"
                                >
                                    <FaArrowLeft size={18} />
                                </button>
                                <h1 className="text-xl md:text-2xl font-bold">
                                    Ayarlar
                                </h1>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} noValidate>
                                {/* Bildirim Ayarları */}
                                <div className="mb-8">
                                    <div className="flex flex-row text-xl items-center mb-4 gap-3">
                                        <FaBell className="text-neutral-400" />
                                        <h2 className="font-semibold">
                                            Bildirimler
                                        </h2>
                                    </div>
                                    <div className="flex items-center justify-between bg-neutral-700/50 p-4 rounded-lg border border-neutral-700">
                                        <div>
                                            <p className="font-medium">
                                                Bildirimleri Aktif Et
                                            </p>
                                            <p className="text-sm text-neutral-400 mt-1">
                                                Yeni mesaj, beğeni ve yorum
                                                bildirimlerini al.
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationsEnabled}
                                                onChange={
                                                    handleNotificationsToggle
                                                }
                                            />
                                            <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-blue-500"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Hesap doğrulama */}
                                <div className="mb-8">
                                    <div className="flex flex-row text-xl items-center mb-4 gap-3">
                                        <FaCheckCircle className="text-neutral-400" />
                                        <h2 className="font-semibold">
                                            Doğrulama
                                        </h2>
                                    </div>
                                    <div className="bg-neutral-700/50 p-4 rounded-lg border border-neutral-700">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    {user && user.verified
                                                        ? "Hesabınız Doğrulanmış"
                                                        : "Hesabını Doğrula"}
                                                </p>
                                                <p className="text-sm text-neutral-400 mt-1">
                                                    {user && user.verified
                                                        ? "E-posta adresiniz başarıyla doğrulandı. Profilinizde doğrulama rozeti görüntülenecektir."
                                                        : isMailSent
                                                        ? "Lütfen e-postanıza gönderilen doğrulama kodunu girin."
                                                        : "Şimdi emailin ile hesabını doğrula, profilinde doğrulanmış rozetini al!"}
                                                </p>
                                            </div>

                                            {user && user.verified ? (
                                                <div className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 text-green-500">
                                                    <FaCheckCircle className="mr-2 h-5 w-5" />
                                                    <span>Doğrulandı</span>
                                                </div>
                                            ) : isMailSent ? (
                                                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
                                                    <input
                                                        type="text"
                                                        value={otp}
                                                        maxLength={6} // OTP uzunluğunu sınırlama
                                                        onChange={(e) =>
                                                            setOtp(
                                                                e.target.value.replace(
                                                                    /\D/g,
                                                                    ""
                                                                ) // Sadece rakam girişi
                                                            )
                                                        }
                                                        placeholder="Doğrulama Kodu"
                                                        aria-label="Doğrulama Kodu"
                                                        className="flex-grow px-3 py-2 bg-neutral-600 border border-neutral-500 rounded-lg text-white placeholder-neutral-400 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleVerifyOtp
                                                        }
                                                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-green-500"
                                                    >
                                                        Onayla
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleSendVerificationEmail
                                                    }
                                                    className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-blue-500"
                                                >
                                                    <FaMailBulk className="mr-2 h-4 w-4" />
                                                    Doğrulama Maili Gönder
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hesap Yönetimi - Hesabı Sil */}
                                <div className="mb-6">
                                    <div className="flex flex-row text-xl items-center mb-4 gap-3">
                                        <MdAccountCircle
                                            size={24}
                                            className="text-neutral-400"
                                        />
                                        <h2 className="font-semibold">
                                            Hesap Yönetimi
                                        </h2>
                                    </div>
                                    <div className="bg-neutral-700/50 p-6 rounded-lg ">
                                        <h3 className="text-lg font-medium mb-2 text-red-400">
                                            Hesabı Kalıcı Olarak Sil
                                        </h3>
                                        <p className="text-sm text-neutral-400 mb-5">
                                            Bu işlem tüm verilerinizi kalıcı
                                            olarak silecek ve geri alınamaz.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleModal}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-red-500"
                                        >
                                            <FaTrashAlt className="mr-2 h-4 w-4" />
                                            Hesabımı Sil
                                        </button>
                                    </div>
                                </div>

                                {/* Kaydet ve İptal Butonları */}
                                <div className="flex justify-end mt-10 pt-6 border-t border-neutral-700 space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-5 py-2 bg-neutral-600 text-white rounded-lg flex items-center space-x-2 hover:bg-neutral-500 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-neutral-500"
                                    >
                                        <FaTimes />
                                        <span>İptal</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-blue-500"
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

            {/* Hesap Silme Onay Modalı */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModal}
                contentLabel="Hesap Silme Onayı"
                overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
                className="bg-neutral-800 rounded-lg shadow-xl p-6 w-full max-w-md outline-none border border-neutral-700"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">
                        Hesabı Silmeyi Onayla
                    </h2>
                    <button
                        onClick={handleModal}
                        className="text-neutral-400 hover:text-white"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <p className="text-neutral-300 text-sm mb-6">
                    Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?
                    Bu işlem geri alınamaz ve tüm verileriniz (profil,
                    gönderiler, mesajlar vb.) kaybolacaktır.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={handleModal}
                        className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-neutral-500"
                    >
                        İptal
                    </button>
                    <button
                        type="button"
                        onClick={confirmDeleteAccount}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-red-500"
                    >
                        Evet, Hesabımı Sil
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default SettingsPage;
