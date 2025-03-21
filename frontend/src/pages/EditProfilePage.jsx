import React, { useState } from "react";
import { FaCamera, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(
        "https://randomuser.me/api/portraits/men/32.jpg"
    );
    const [previewProfileImage, setPreviewProfileImage] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        username: "johndoe",
        bio: "Hayat kısa, kuşlar uçuyor. Her gün yeni bir başlangıç için bir fırsat.",
        location: "İstanbul, Türkiye",
        website: "johndoe.com",
        profession: "Yazılım Geliştirici & Fotoğrafçı",
        birthDate: "1990-01-01",
        email: "john@example.com",
        phone: "+90 555 123 4567",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Burada API'ye kayıt işlemi yapılabilir
        console.log("Form verileri:", formData);
        alert("Profil başarıyla güncellendi!");
        navigate("/profile");
    };

    const handleCancel = () => {
        navigate("/profile");
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewProfileImage(imageUrl);
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
                                    Profili Düzenle
                                </h1>
                            </div>
                        </div>

                        {/* Profil Fotoğrafı */}
                        <div className="relative flex justify-center pt-8">
                            <div className="relative w-32 h-32 mb-4">
                                <img
                                    src={previewProfileImage || profileImage}
                                    alt="Profil"
                                    className="w-full h-full rounded-full object-cover border-4 border-neutral-800"
                                />
                                <label
                                    htmlFor="profileImage"
                                    className="cursor-pointer absolute right-0 bottom-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
                                >
                                    <FaCamera className="text-white" />
                                    <input
                                        type="file"
                                        id="profileImage"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Ad Soyad
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Kullanıcı Adı
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Hakkında
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Meslek
                                    </label>
                                    <input
                                        type="text"
                                        name="profession"
                                        value={formData.profession}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Konum
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Web Sitesi
                                    </label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Doğum Tarihi
                                    </label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                            </div>

                            {/* Aksiyon butonları */}
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
        </>
    );
};

export default EditProfilePage;
