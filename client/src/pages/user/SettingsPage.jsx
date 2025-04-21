import React, { useEffect, useState } from "react";
import {
    FaSave,
    FaTimes,
    FaArrowLeft,
    FaBell,
    FaTrashAlt,
} from "react-icons/fa";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Modal from "react-modal";
import { ShowToast } from "../../components/ui/toasts/ShowToast";

const SettingsPage = () => {
    const navigate = useNavigate();

    // Ayarlar için state'ler
    const [notificationsEnabled, setNotificationsEnabled] = useState(
        localStorage.getItem("notificationsEnabled") === "true"
    );
    const [accountHidden, setAccountHidden] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal açma/kapama fonksiyonu
    const handleModal = () => setIsModalOpen(!isModalOpen);

    // İptal butonu
    // Bir onceki sayfaya yönlendir
    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("notificationsEnabled", notificationsEnabled);
        console.log("Ayarlar Kaydedildi:", {
            notificationsEnabled,
            accountHidden,
        });
        // Başarılı kaydetme sonrası bildirim veya yönlendirme yapılabilir
        ShowToast("success", "Ayarlar kaydedildi!");
    };

    // Gerçek hesap silme işlemini yapacak fonksiyon
    const confirmDeleteAccount = () => {
        console.log("Hesap silme işlemi başlatıldı!");
        // Burada API çağrısı vb. yapılacak
        // Başarılı silme sonrası kullanıcıyı yönlendir
        handleModal(); // Modalı kapat
        alert("Hesap başarıyla silindi! (Simülasyon)"); // Geçici bildirim
        navigate("/"); // Ana sayfaya veya giriş sayfasına yönlendir
    };

    const handleNotificationsToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    useEffect(() => {
        // Component mount olduğunda modal için app elementini ayarla
        // İdeal olarak bu App.js veya index.js içinde yapılır.
        const appElement = document.getElementById("root"); // Veya projenizdeki ana element ID'si
        if (appElement) {
            Modal.setAppElement(appElement);
        } else {
            console.error(
                "Modal için ana uygulama elementi (#root) bulunamadı."
            );
            // Gerekirse bir fallback ayarlayabilirsiniz, ancak en iyisi doğru elementi bulmaktır.
            Modal.setAppElement("body");
        }

        window.scrollTo(0, 0);
        document.title = "Ayarlar";
    }, []);

    return (
        <>
            <Navbar isInAppPage={true} />
            {/* Sayfa Arka Planı ve Padding */}
            <div className="bg-neutral-900 min-h-screen text-white py-28 px-4 md:px-8 lg:px-20">
                <div className="container mx-auto max-w-4xl">
                    {/* Ana Ayarlar Kartı */}
                    <div className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                        {/* Başlık Alanı */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-700">
                            <div className="flex items-center space-x-3">
                                {" "}
                                {/* İkonla başlık arasına boşluk */}
                                <button
                                    onClick={handleCancel}
                                    className="text-white p-2 rounded-full hover:bg-neutral-700 transition"
                                    aria-label="Geri dön"
                                >
                                    <FaArrowLeft size={18} />{" "}
                                    {/* Boyut ayarı */}
                                </button>
                                <h1 className="text-xl md:text-2xl font-bold">
                                    {" "}
                                    {/* Boyut ayarı */}
                                    Ayarlar
                                </h1>
                            </div>
                        </div>

                        {/* İçerik Alanı */}
                        <div className="p-6">
                            <form onSubmit={handleSubmit} noValidate>
                                {/* Bildirim Ayarları */}
                                <div className="mb-8">
                                    {" "}
                                    {/* Alt boşluk artırıldı */}
                                    <div className="flex flex-row text-xl items-center mb-4 gap-3">
                                        {" "}
                                        {/* İkonla başlık arasına boşluk */}
                                        <FaBell className="text-neutral-400" />{" "}
                                        {/* İkon rengi */}
                                        <h2 className="font-semibold">
                                            Bildirimler
                                        </h2>
                                    </div>
                                    <div className="flex items-center justify-between bg-neutral-700/50 p-4 rounded-lg border border-neutral-700">
                                        {" "}
                                        <div>
                                            <p className="font-medium">
                                                Bildirimleri Aktif Et
                                            </p>
                                            <p className="text-sm text-neutral-400 mt-1">
                                                {" "}
                                                {/* Renk ve üst boşluk */}
                                                Yeni mesaj, beğeni ve yorum
                                                bildirimlerini al.
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notificationsEnabled}
                                                onChange={() =>
                                                    handleNotificationsToggle()
                                                }
                                            />
                                            <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-blue-500"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Hesap Yönetimi - Hesabı Sil */}
                                <div className="mb-6">
                                    {" "}
                                    {/* Diğerlerine göre biraz daha az boşluk */}
                                    <div className="flex flex-row text-xl items-center mb-4 gap-3">
                                        {" "}
                                        {/* İkonla başlık arasına boşluk */}
                                        <MdAccountCircle
                                            size={24}
                                            className="text-neutral-400"
                                        />{" "}
                                        {/* İkon rengi */}
                                        <h2 className="font-semibold">
                                            Hesap Yönetimi
                                        </h2>
                                    </div>
                                    <div className="bg-neutral-700/50 p-6 rounded-lg ">
                                        {" "}
                                        {/* Daha hafif arka plan ve border */}
                                        <h3 className="text-lg font-medium mb-2 text-red-400">
                                            Hesabı Kalıcı Olarak Sil
                                        </h3>
                                        <p className="text-sm text-neutral-400 mb-5">
                                            {" "}
                                            {/* Renk ve alt boşluk */}
                                            Bu işlem tüm verilerinizi kalıcı
                                            olarak silecek ve geri alınamaz.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleModal} // Modalı aç
                                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-red-500" // focus stilleri
                                        >
                                            <FaTrashAlt className="mr-2 h-4 w-4" />{" "}
                                            {/* İkon ve boşluk */}
                                            Hesabımı Sil
                                        </button>
                                    </div>
                                </div>

                                {/* Kaydet ve İptal Butonları */}
                                <div className="flex justify-end mt-10 pt-6 border-t border-neutral-700 space-x-3">
                                    {" "}
                                    {/* Üst border ve boşluk */}
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-5 py-2 bg-neutral-600 text-white rounded-lg flex items-center space-x-2 hover:bg-neutral-500 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-neutral-500" // focus stilleri
                                    >
                                        <FaTimes />
                                        <span>İptal</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-blue-500 hover:from-pink-600 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2 transition text-sm font-medium "
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
                onRequestClose={handleModal} // Overlay'a tıklayınca veya ESC ile kapatır
                contentLabel="Hesap Silme Onayı"
                overlayClassName="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50"
                className="bg-neutral-800 rounded-lg shadow-xl p-6 w-full max-w-md outline-none border border-neutral-700"
            >
                {/* Modal Başlığı */}
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

                {/* Modal İçeriği */}
                <p className="text-neutral-300 text-sm mb-6">
                    Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?
                    Bu işlem geri alınamaz ve tüm verileriniz (profil,
                    gönderiler, mesajlar vb.) kaybolacaktır.
                </p>

                {/* Modal Butonları */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={handleModal} // Modalı kapatır
                        className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-neutral-500"
                    >
                        İptal
                    </button>
                    <button
                        type="button"
                        onClick={confirmDeleteAccount} // Silme işlemini onayla
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
