import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import {
    FiUsers,
    FiFileText,
    FiMessageSquare,
    FiActivity,
    FiAlertOctagon,
    FiSettings,
    FiUserPlus,
    FiFlag,
} from "react-icons/fi";
import { getAdminDashboardStats } from "../../api/adminApi";
import { ShowToast } from "../../components/ui/toasts/ShowToast";

const QuickActionCard = ({
    icon: Icon,
    title,
    description,
    onClick,
    iconColor = "text-pink-500",
}) => (
    <button
        onClick={onClick}
        className="flex items-center p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-200 w-full border border-neutral-700/50"
    >
        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-neutral-700/50 flex items-center justify-center mr-4">
            <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="flex-1 text-left">
            <h3 className="text-white font-medium">{title}</h3>
            <p className="text-neutral-400 text-sm">{description}</p>
        </div>
    </button>
);

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDashboardStats = async () => {
        setLoading(true);
        try {
            const response = await getAdminDashboardStats();
            setStats(response);
            setLoading(false);
        } catch (error) {
            console.log("Error getting dashboard stats:", error);
        }
    };

    useEffect(() => {
        getDashboardStats();
        document.title = "Admin Dashboard";
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-pink-500/30 mb-3"></div>
                        <p className="text-white text-xl">
                            Dashboard yükleniyor...
                        </p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!stats) {
        return (
            <AdminLayout>
                <div className="text-center text-red-500 bg-red-100/10 p-4 rounded-lg">
                    <FiAlertOctagon className="h-8 w-8 mx-auto mb-2" />
                    İstatistikler yüklenemedi.
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Üst Bilgi */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Yönetim Paneli
                    </h1>
                    <p className="text-neutral-400">
                        Platform istatistiklerine genel bakış
                    </p>
                </div>
            </div>

            {/* Özet Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                    title="Toplam Kullanıcı"
                    value={stats.userCount.toLocaleString()}
                    icon={<FiUsers />}
                />
                <StatCard
                    title="Toplam Gönderi"
                    value={stats.postCount.toLocaleString()}
                    icon={<FiFileText />}
                />
                <StatCard
                    title="Toplam Yorum"
                    value={stats.commentCount.toLocaleString()}
                    icon={<FiMessageSquare />}
                />
                <StatCard
                    title="Aktif Kullanıcılar"
                    value={stats.recentUserCount.toLocaleString()}
                    icon={<FiActivity />}
                />
            </div>

            {/* Hızlı İşlemler */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                        Hızlı İşlemler
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuickActionCard
                        icon={FiSettings}
                        title="Bakım Modu"
                        description={`Bakım modunu ${
                            stats.isMaintenanceMode ? "kapat" : "aç"
                        }`}
                        onClick={() => navigate("/admin/settings")}
                        iconColor="text-pink-500"
                    />
                    <QuickActionCard
                        icon={FiUserPlus}
                        title="Kullanıcı Yönetimi"
                        description={`${stats.userCount} kullanıcıyı yönet`}
                        onClick={() => navigate("/admin/users")}
                        iconColor="text-blue-500"
                    />
                    <QuickActionCard
                        icon={FiFlag}
                        title="İçerik Yönetimi"
                        description={`${stats.postCount} gönderiyi yönet`}
                        onClick={() => navigate("/admin/posts")}
                        iconColor="text-purple-500"
                    />
                    <QuickActionCard
                        icon={FiMessageSquare}
                        title="Yorum Yönetimi"
                        description={`${stats.commentCount} yorumu yönet`}
                        onClick={() => navigate("/admin/comments")}
                        iconColor="text-green-500"
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;
