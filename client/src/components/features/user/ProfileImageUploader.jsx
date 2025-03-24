import React from "react";
import { FaCamera } from "react-icons/fa";

/**
 * Profil resmi yükleme bileşeni
 * Kullanıcının profil resmini değiştirmesi için kullanılır
 */
const ProfileImageUploader = ({ currentImage, onImageChange }) => {
    return (
        <div className="relative flex justify-center pt-8">
            <div className="relative w-32 h-32 mb-4">
                <img
                    src={currentImage}
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
                        onChange={onImageChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default ProfileImageUploader;
