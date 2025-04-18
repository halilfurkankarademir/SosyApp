import React, { useState } from "react";
import GlowEffect from "../../components/ui/effects/GlowEffect";
import Navbar from "../../components/common/Navbar";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton";
import { useNavigation } from "../../context/NavigationContext";
import { useAuth } from "../../context/AuthContext";
import { userInfoFields } from "../../utils/constants";
import FormInput from "../../components/ui/inputs/FormInput";
import { imageUpload } from "../../api/imageUpload";
import { updateUserProfile } from "../../api/userApi";

const UserInfoPage = () => {
    const [formData, setFormData] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { navigateToPage } = useNavigation();
    const { setIsAuthenticated, user } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            let updatedData = { ...formData };

            if (profileImage) {
                const profilePicture = await imageUpload(profileImage);
                updatedData.profilePicture = profilePicture;
            }

            if (user?.id) {
                updatedData.id = user.id;
            }

            const updatedUser = await updateUserProfile(updatedData);
            if (updatedUser) {
                setIsAuthenticated(true);
                navigateToPage("/");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSubmitting(false);
        }
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

                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400 mb-4">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-purple-900 flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <label className="cursor-pointer">
                            <span className="text-purple-400 hover:text-purple-300 transition-colors">
                                {previewImage
                                    ? "Fotoğrafı Değiştir"
                                    : "Fotoğraf Ekle"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {userInfoFields
                            .filter((field) => field.name !== "username")
                            .map((field) => (
                                <FormInput
                                    key={field.id}
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                    label={field.label}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                />
                            ))}

                        {/* Kaydet Butonu */}
                        <div>
                            <PrimaryButton
                                type="submit"
                                buttonText={
                                    isSubmitting
                                        ? "Kaydediliyor..."
                                        : "Kaydı Tamamla"
                                }
                                disabled={isSubmitting}
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
