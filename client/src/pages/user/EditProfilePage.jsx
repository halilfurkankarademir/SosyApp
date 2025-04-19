import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Navbar } from "../../components/common";
import { useNavigate } from "react-router-dom";
import {
    ProfileForm,
    ProfileImageUploader,
} from "../../components/features/user";
import { getCurrentUser, updateUserProfile } from "../../api/userApi";
import toast from "react-hot-toast";
import LoadingPage from "../public/LoadingPage";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import { imageUpload } from "../../api/imageUpload";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Mevcut kullanıcı detaylarını çek
    const getCurrentUserDetails = async () => {
        setIsLoading(true);
        try {
            const userData = await getCurrentUser();
            setUser({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                username: userData.username || "",
                email: userData.email || "",
                bio: userData.bio || "",
                location: userData.location || "",
                profilePicture: userData.profilePicture || null,
            });
        } catch (error) {
            console.error("Error fetching user:", error);
            toast.error("Kullanıcı bilgileri yüklenemedi.");
            // Belki ana sayfaya yönlendir? navigate('/');
        } finally {
            setIsLoading(false);
        }
    };

    // Form değişikliklerini handle eden fonksiyon
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Formu gönderen fonksiyon (user state'ini kullanıyor)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const userData = { ...user };
        if (profileImage) {
            const profilePicture = await imageUpload(profileImage);
            userData.profilePicture = profilePicture;
        }
        try {
            const updatedUser = await updateUserProfile(userData);
            console.log("Profil güncellendi:", updatedUser);
            ShowToast("success", "Profiliniz başarıyla güncellendi.");
        } catch (error) {
            console.error("Profil güncellenemedi:", error);
            ShowToast("error", "Profiliniz güncellenemedi.");
        } finally {
            setIsSaving(false);
        }
    };

    // İptal butonu
    // Bir onceki sayfaya yönlendir
    const handleCancel = () => {
        navigate(-1);
    };

    // Profil resmi değişikliği
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewProfileImage(imageUrl);
            setProfileImage(file);
        }
    };

    // İlk yüklemede veriyi çek
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Profili Düzenle";
        getCurrentUserDetails();
    }, []);

    // Yüklenme durumu
    if (isLoading) {
        return <LoadingPage />;
    }

    // Kullanıcı verisi yoksa (hata durumu)
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
                Kullanıcı bilgileri yüklenemedi. Lütfen tekrar deneyin.
            </div>
        );
    }

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="bg-neutral-900 min-h-screen text-white py-28 px-4 md:px-8 lg:px-20">
                <div className="container mx-auto max-w-4xl relative">
                    {" "}
                    {/* Kaydetme overlay'i için relative */}
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
                        <ProfileImageUploader
                            currentImage={
                                previewProfileImage || user.profilePicture
                            }
                            onImageChange={handleProfileImageChange}
                        />

                        {/* Form - Doğru state ve handler'lar ile */}
                        <ProfileForm
                            formData={user}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfilePage;
