import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

/**
 * Profil düzenleme formu
 * Kullanıcı bilgilerini düzenlemek için kullanılır
 */
const ProfileForm = ({ formData, onChange, onSubmit, onCancel }) => {
    return (
        <form onSubmit={onSubmit} className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">
                        Ad
                    </label>
                    <input
                        type="text"
                        name="firstName" // State key'i ile eşleşmeli
                        value={formData.firstName || ""}
                        onChange={onChange}
                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">
                        Soyad
                    </label>
                    <input
                        type="text"
                        name="lastName" // State key'i ile eşleşmeli
                        value={formData.lastName || ""}
                        onChange={onChange}
                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">
                        Kullanıcı Adı
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username || ""}
                        onChange={onChange}
                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">
                        E-posta
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={onChange}
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
                        placeholder="Kendiniz hakkında birkaç paragraf yazabilirsiniz."
                        onChange={onChange}
                        rows="3"
                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
                    ></textarea>
                </div>
            </div>

            {/* Aksiyon butonları */}
            <div className="flex justify-end mt-8 space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 bg-neutral-700 text-white rounded-lg flex items-center space-x-2 hover:bg-neutral-600 transition"
                >
                    <FaTimes />
                    <span>İptal</span>
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2 transition"
                >
                    <FaSave />
                    <span>Değişiklikleri Kaydet</span>
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
