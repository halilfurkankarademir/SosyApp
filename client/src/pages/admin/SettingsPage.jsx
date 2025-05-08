import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSave,
    FiServer,
    FiUsers,
    FiFileText,
    FiShield,
    FiAlertTriangle,
    FiHash,
} from "react-icons/fi";

const SettingsPage = () => {
    // Ayarlar için state
    const [generalSettings, setGeneralSettings] = useState({
        siteName: "SosyApp",
        siteDescription: "Modern sosyal medya uygulaması",
        language: "tr",
        timezone: "Europe/Istanbul",
        maintenance: false,
    });

    const [contentSettings, setContentSettings] = useState({
        postModeration: true,
        commentModeration: false,
        allowComments: true,
        allowLikes: true,
        maxUploadSize: 5,
        allowedFileTypes: "jpg,jpeg,png,gif,mp4",
    });

    const [userSettings, setUserSettings] = useState({
        requireEmailVerification: true,
        minPasswordLength: 8,
        loginAttempts: 5,
        lockoutDuration: 30,
        allowMultipleDeviceLogin: true,
    });

    const [socialSettings, setPrivacySettings] = useState({
        defaultAccountPrivacy: "public",
        allowTagging: true,
        showOnlineStatus: true,
        maximumFollowersDisplay: 1000,
        maximumFollowingDisplay: 1000,
        enableHashtags: true,
        trendingHashtagCount: 10,
    });

    // Form gönderimi
    const handleSubmit = (e) => {
        e.preventDefault();
        // API'ye ayarları kaydetme işlemi burada yapılacak
        alert("Ayarlar kaydedildi!");
    };

    // Toggle switch bileşeni
    const ToggleSwitch = ({ label, checked, onChange }) => {
        return (
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={onChange}
                    />
                    <div className="block w-12 h-6 bg-neutral-700 rounded-full"></div>
                    <div
                        className={`absolute left-1 top-1 w-4 h-4 rounded-full transition ${
                            checked
                                ? "bg-pink-500 transform translate-x-6"
                                : "bg-white"
                        }`}
                    ></div>
                </div>
                <span className="ml-3 text-neutral-300">{label}</span>
            </label>
        );
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Sistem Ayarları
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Genel Ayarlar */}
                    <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700/50">
                        <div className="flex items-center mb-4">
                            <FiServer className="text-pink-500 mr-2" />
                            <h2 className="text-lg font-bold text-white">
                                Genel Ayarlar
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-neutral-300 text-sm mb-1">
                                    Platform Adı
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                    value={generalSettings.siteName}
                                    onChange={(e) =>
                                        setGeneralSettings({
                                            ...generalSettings,
                                            siteName: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-neutral-300 text-sm mb-1">
                                    Platform Açıklaması
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                    rows="2"
                                    value={generalSettings.siteDescription}
                                    onChange={(e) =>
                                        setGeneralSettings({
                                            ...generalSettings,
                                            siteDescription: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Dil
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={generalSettings.language}
                                        onChange={(e) =>
                                            setGeneralSettings({
                                                ...generalSettings,
                                                language: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="tr">Türkçe</option>
                                        <option value="en">İngilizce</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Saat Dilimi
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={generalSettings.timezone}
                                        onChange={(e) =>
                                            setGeneralSettings({
                                                ...generalSettings,
                                                timezone: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Europe/Istanbul">
                                            İstanbul (UTC+3)
                                        </option>
                                        <option value="Europe/London">
                                            Londra (UTC+0)
                                        </option>
                                        <option value="America/New_York">
                                            New York (UTC-5)
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-2">
                                <ToggleSwitch
                                    label="Bakım Modu"
                                    checked={generalSettings.maintenance}
                                    onChange={() =>
                                        setGeneralSettings({
                                            ...generalSettings,
                                            maintenance:
                                                !generalSettings.maintenance,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* İçerik Ayarları */}
                    <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700/50">
                        <div className="flex items-center mb-4">
                            <FiFileText className="text-pink-500 mr-2" />
                            <h2 className="text-lg font-bold text-white">
                                İçerik Ayarları
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-3">
                                <ToggleSwitch
                                    label="Gönderi Moderasyonu"
                                    checked={contentSettings.postModeration}
                                    onChange={() =>
                                        setContentSettings({
                                            ...contentSettings,
                                            postModeration:
                                                !contentSettings.postModeration,
                                        })
                                    }
                                />
                                <ToggleSwitch
                                    label="Yorum Moderasyonu"
                                    checked={contentSettings.commentModeration}
                                    onChange={() =>
                                        setContentSettings({
                                            ...contentSettings,
                                            commentModeration:
                                                !contentSettings.commentModeration,
                                        })
                                    }
                                />
                                <ToggleSwitch
                                    label="Yorumlara İzin Ver"
                                    checked={contentSettings.allowComments}
                                    onChange={() =>
                                        setContentSettings({
                                            ...contentSettings,
                                            allowComments:
                                                !contentSettings.allowComments,
                                        })
                                    }
                                />
                                <ToggleSwitch
                                    label="Beğenilere İzin Ver"
                                    checked={contentSettings.allowLikes}
                                    onChange={() =>
                                        setContentSettings({
                                            ...contentSettings,
                                            allowLikes:
                                                !contentSettings.allowLikes,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Maks. Dosya Boyutu (MB)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={contentSettings.maxUploadSize}
                                        onChange={(e) =>
                                            setContentSettings({
                                                ...contentSettings,
                                                maxUploadSize: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        İzin Verilen Dosya Türleri
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={contentSettings.allowedFileTypes}
                                        onChange={(e) =>
                                            setContentSettings({
                                                ...contentSettings,
                                                allowedFileTypes:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kullanıcı Ayarları */}
                    <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700/50">
                        <div className="flex items-center mb-4">
                            <FiUsers className="text-pink-500 mr-2" />
                            <h2 className="text-lg font-bold text-white">
                                Kullanıcı Ayarları
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-3">
                                <ToggleSwitch
                                    label="E-posta Doğrulaması Gerekli"
                                    checked={
                                        userSettings.requireEmailVerification
                                    }
                                    onChange={() =>
                                        setUserSettings({
                                            ...userSettings,
                                            requireEmailVerification:
                                                !userSettings.requireEmailVerification,
                                        })
                                    }
                                />
                                <ToggleSwitch
                                    label="Çoklu Cihaz Girişine İzin Ver"
                                    checked={
                                        userSettings.allowMultipleDeviceLogin
                                    }
                                    onChange={() =>
                                        setUserSettings({
                                            ...userSettings,
                                            allowMultipleDeviceLogin:
                                                !userSettings.allowMultipleDeviceLogin,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Min. Şifre Uzunluğu
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={userSettings.minPasswordLength}
                                        onChange={(e) =>
                                            setUserSettings({
                                                ...userSettings,
                                                minPasswordLength:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Giriş Denemeleri
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={userSettings.loginAttempts}
                                        onChange={(e) =>
                                            setUserSettings({
                                                ...userSettings,
                                                loginAttempts: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Kilit Süresi (dk)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={userSettings.lockoutDuration}
                                        onChange={(e) =>
                                            setUserSettings({
                                                ...userSettings,
                                                lockoutDuration: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sosyal Medya Ayarları */}
                    <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700/50">
                        <div className="flex items-center mb-4">
                            <FiHash className="text-pink-500 mr-2" />
                            <h2 className="text-lg font-bold text-white">
                                Sosyal Medya Ayarları
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-neutral-300 text-sm mb-1">
                                    Varsayılan Hesap Gizliliği
                                </label>
                                <select
                                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                    value={socialSettings.defaultAccountPrivacy}
                                    onChange={(e) =>
                                        setPrivacySettings({
                                            ...socialSettings,
                                            defaultAccountPrivacy:
                                                e.target.value,
                                        })
                                    }
                                >
                                    <option value="public">Herkese Açık</option>
                                    <option value="followers">
                                        Sadece Takipçiler
                                    </option>
                                    <option value="private">Gizli</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-3">
                                <ToggleSwitch
                                    label="Etiketlemeye İzin Ver"
                                    checked={socialSettings.allowTagging}
                                    onChange={() =>
                                        setPrivacySettings({
                                            ...socialSettings,
                                            allowTagging:
                                                !socialSettings.allowTagging,
                                        })
                                    }
                                />
                                <ToggleSwitch
                                    label="Çevrimiçi Durumu Göster"
                                    checked={socialSettings.showOnlineStatus}
                                    onChange={() =>
                                        setPrivacySettings({
                                            ...socialSettings,
                                            showOnlineStatus:
                                                !socialSettings.showOnlineStatus,
                                        })
                                    }
                                />
                                <ToggleSwitch
                                    label="Hashtag Kullanımını Etkinleştir"
                                    checked={socialSettings.enableHashtags}
                                    onChange={() =>
                                        setPrivacySettings({
                                            ...socialSettings,
                                            enableHashtags:
                                                !socialSettings.enableHashtags,
                                        })
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Trend Hashtag Sayısı
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={
                                            socialSettings.trendingHashtagCount
                                        }
                                        onChange={(e) =>
                                            setPrivacySettings({
                                                ...socialSettings,
                                                trendingHashtagCount:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-300 text-sm mb-1">
                                        Maksimum Takipçi Gösterimi
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                        value={
                                            socialSettings.maximumFollowersDisplay
                                        }
                                        onChange={(e) =>
                                            setPrivacySettings({
                                                ...socialSettings,
                                                maximumFollowersDisplay:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kaydet Butonu */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center"
                    >
                        <FiSave className="mr-2" />
                        Ayarları Kaydet
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default SettingsPage;
