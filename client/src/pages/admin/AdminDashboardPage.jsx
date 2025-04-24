import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
// İkonları projenize göre güncelleyin
import {
    FiUsers,
    FiFileText,
    FiMessageSquare,
    FiHeart,
    FiAlertOctagon,
} from "react-icons/fi";
// import { fetchAdminStats } from '../../api/adminApi';

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
                    newUsersToday: 15,
                    totalPosts: 8750,
                    totalComments: 25300,
                    totalLikes: 150000,
                    reportedPosts: 5,
                });
                setLoading(false);
            }, 500); // Daha hızlı yükleme simülasyonu
        };

        fetchStats();
        document.title = "Admin Dashboard";
    }, []);

    // Yükleme ve Hata Durumları... (Önceki kodla aynı)
    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-white text-xl">
                        Dashboard yükleniyor...
                    </p>
                </div>
            </AdminLayout>
        );
    }

    if (!stats) {
        return (
            <AdminLayout>
                <div className="text-center text-red-500">
                    İstatistikler yüklenemedi.
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Sayfa Başlığı */}
            <h1 className="text-2xl font-semibold text-white mb-6">
                Gösterge Paneli
            </h1>

            {/* İstatistik Kartları - Grid yapısı görsele daha uygun */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {" "}
                {/* Gap azaltıldı, 2xl eklendi */}
                <StatCard
                    title="Toplam Kullanıcı"
                    value={stats.totalUsers.toLocaleString()}
                    icon={<FiUsers />}
                />
                <StatCard
                    title="Yeni Kullanıcı (Bugün)"
                    value={stats.newUsersToday}
                    icon={<FiUsers />} // Farklı ikon daha iyi olabilir
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
                    title="Toplam Beğeni"
                    value={stats.totalLikes.toLocaleString()}
                    icon={<FiHeart />}
                />
                <StatCard
                    title="Raporlanan Gönderi"
                    value={stats.reportedPosts}
                    icon={<FiAlertOctagon />} // İkon değiştirildi
                />
            </div>

            {/* Buraya Grafikler veya Diğer Bölümler Eklenebilir */}
            {/*
            <div className="mt-8 bg-neutral-800 p-6 rounded-xl shadow border border-neutral-700/50">
                <h2 className="text-xl font-semibold text-white mb-4">Son Aktiviteler</h2>
                {/* Aktivite listesi veya grafik buraya */}
            {/*</div>
             */}
        </AdminLayout>
    );
};

export default AdminDashboardPage;
