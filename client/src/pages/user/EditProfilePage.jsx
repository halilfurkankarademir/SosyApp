import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Navbar } from "../../components/common";
import { useNavigate } from "react-router-dom";
import {
    ProfileForm,
    ProfileImageUploader,
} from "../../components/features/user";
import { fakeUserProfile } from "../../constants/fakeDatas";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [previewProfileImage, setPreviewProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: fakeUserProfile[0].fullName,
        username: fakeUserProfile[0].username,
        email: fakeUserProfile[0].email,
        bio: fakeUserProfile[0].bio,
        location: fakeUserProfile[0].location,
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

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Profili Düzenle";
    }, []);

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
                        <ProfileImageUploader
                            currentImage={
                                previewProfileImage ||
                                fakeUserProfile[0].profilePicture
                            }
                            onImageChange={handleProfileImageChange}
                        />

                        {/* Form */}
                        <ProfileForm
                            formData={formData}
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
