import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import {
    FiUsers,
    FiFileText,
    FiMessageSquare,
    FiHeart,
    FiAlertOctagon,
    FiActivity,
} from "react-icons/fi";

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            // Simülasyon:
            setTimeout(() => {
                setStats({
                    totalUsers: 1250,
                    totalPosts: 8750,
                    totalComments: 25300,
                    reportedContent: 5,
                    activeUsers: 178,
                });
                setLoading(false);
            }, 500);
        };

        fetchStats();
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                <StatCard
                    title="Toplam Kullanıcı"
                    value={stats.totalUsers.toLocaleString()}
                    icon={<FiUsers />}
                />
                <StatCard
                    title="Toplam Gönderi"
                    value={stats.totalPosts.toLocaleString()}
                    icon={<FiFileText />}
                />
                <StatCard
                    title="Toplam Yorum"
                    value={stats.totalComments.toLocaleString()}
                    icon={<FiMessageSquare />}
                />
                <StatCard
                    title="Aktif Kullanıcılar"
                    value={stats.activeUsers}
                    icon={<FiActivity />}
                />
                <StatCard
                    title="Raporlanan İçerik"
                    value={stats.reportedContent}
                    icon={<FiAlertOctagon />}
                />
            </div>

            {/* Son Aktiviteler */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700/50 shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">
                        Son Aktiviteler
                    </h2>
                </div>
                <div className="space-y-4">
                    {/* Aktivite Öğeleri */}
                    <div className="flex items-start p-3 hover:bg-neutral-700/30 rounded-lg transition">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center mr-3 text-pink-500">
                            <FiUsers className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">
                                Yeni kullanıcı kaydoldu
                            </p>
                            <p className="text-neutral-400 text-sm truncate">
                                @yeni_kullanici123
                            </p>
                        </div>
                        <div className="text-neutral-400 text-sm">
                            5 dk önce
                        </div>
                    </div>

                    <div className="flex items-start p-3 hover:bg-neutral-700/30 rounded-lg transition">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center mr-3 text-pink-500">
                            <FiFileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">
                                Yeni gönderi paylaşıldı
                            </p>
                            <p className="text-neutral-400 text-sm truncate">
                                @ahmetyilmaz paylaştı: "Bugün harika bir gün!"
                            </p>
                        </div>
                        <div className="text-neutral-400 text-sm">
                            15 dk önce
                        </div>
                    </div>

                    <div className="flex items-start p-3 hover:bg-neutral-700/30 rounded-lg transition">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center mr-3 text-pink-500">
                            <FiHeart className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">
                                Popüler gönderi
                            </p>
                            <p className="text-neutral-400 text-sm truncate">
                                @zeynepcelik'in gönderisi 100+ beğeni aldı
                            </p>
                        </div>
                        <div className="text-neutral-400 text-sm">
                            45 dk önce
                        </div>
                    </div>

                    <div className="flex items-start p-3 hover:bg-neutral-700/30 rounded-lg transition">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center mr-3 text-pink-500">
                            <FiAlertOctagon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">
                                İçerik rapor edildi
                            </p>
                            <p className="text-neutral-400 text-sm truncate">
                                Bir gönderi uygunsuz içerik nedeniyle rapor
                                edildi
                            </p>
                        </div>
                        <div className="text-neutral-400 text-sm">
                            1 saat önce
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;
