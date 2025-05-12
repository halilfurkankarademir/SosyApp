import React, { useState, useEffect } from "react";
import { FaTools, FaSave } from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import {
    getAppSettingsForAdmin,
    updateAppSettingsForAdmin,
} from "../../api/adminApi";

const SettingsPage = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({});
    const [tempSettings, setTempSettings] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
        document.title = "Admin Ayarları - Admin Panel";
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await getAppSettingsForAdmin();
            setSettings(response);
            setTempSettings(response);
            setLoading(false);
        } catch (error) {
            ShowToast("error", "Ayarlar yüklenirken bir hata oluştu");
            setLoading(false);
        }
    };

    const handleSettingChange = (value) => {
        setTempSettings((prev) => ({
            ...prev,
            isMaintenanceMode: value,
        }));
    };

    const saveSettings = async () => {
        setIsSaving(true);
        try {
            if (settings.isMaintenanceMode === tempSettings.isMaintenanceMode) {
                ShowToast("info", "Değişiklik yapılmadı");
                setIsSaving(false);
                return;
            }

            const response = await updateAppSettingsForAdmin({
                isMaintenanceMode: tempSettings.isMaintenanceMode,
            });

            if (response.success) {
                setSettings(tempSettings);
                ShowToast("success", "Bakım modu ayarı güncellendi");
            } else {
                ShowToast(
                    "error",
                    response.message || "Ayar güncellenirken bir hata oluştu"
                );
            }
        } catch (error) {
            ShowToast("error", "Ayar güncellenirken bir hata oluştu");
        }
        setIsSaving(false);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Sistem Ayarları
                    </h1>
                    <button
                        onClick={saveSettings}
                        disabled={
                            settings.isMaintenanceMode ===
                                tempSettings.isMaintenanceMode || isSaving
                        }
                        className={`flex items-center px-4 py-2 rounded-lg text-white font-medium transition-all ${
                            settings.isMaintenanceMode !==
                            tempSettings.isMaintenanceMode
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-neutral-600 cursor-not-allowed"
                        }`}
                    >
                        <FaSave className="mr-2" />
                        {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </div>

                <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 p-6">
                    <div className="flex items-center mb-6">
                        <FaTools className="text-2xl text-blue-500 mr-3" />
                        <h3 className="text-xl font-medium text-white">
                            Bakım Modu
                        </h3>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                        <div>
                            <h4 className="text-white font-medium">
                                Bakım Modu
                            </h4>
                            <p className="text-sm text-neutral-400 mt-1">
                                Sistem bakımı sırasında siteyi geçici olarak
                                kapat
                            </p>
                        </div>
                        <label className="relative inline-block w-12 h-6 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={tempSettings.isMaintenanceMode}
                                onChange={(e) =>
                                    handleSettingChange(e.target.checked)
                                }
                                className="sr-only peer cursor-pointer"
                            />
                            <div className="w-12 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-pink-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all cursor-pointer"></div>
                        </label>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsPage;
