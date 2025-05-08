import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiEdit,
    FiTrash2,
    FiUserCheck,
    FiUserX,
    FiEye,
    FiFlag,
} from "react-icons/fi";

const UsersManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Burada API'den kullanıcıları getirme işlemi yapılacak
        // Şimdilik örnek veri kullanıyoruz
        setTimeout(() => {
            setUsers([
                {
                    id: 1,
                    username: "ahmetyilmaz",
                    email: "ahmet.yilmaz@example.com",
                    name: "Ahmet Yılmaz",
                    role: "user",
                    status: "active",
                    joinDate: "2023-05-15",
                    lastLogin: "2023-09-10",
                    followers: 245,
                    following: 123,
                    posts: 47,
                    reportCount: 0,
                },
                {
                    id: 2,
                    username: "aysekaya",
                    email: "ayse.kaya@example.com",
                    name: "Ayşe Kaya",
                    role: "user",
                    status: "active",
                    joinDate: "2023-04-20",
                    lastLogin: "2023-09-18",
                    followers: 1042,
                    following: 356,
                    posts: 128,
                    reportCount: 0,
                },
                {
                    id: 3,
                    username: "mehmetdemir",
                    email: "mehmet.demir@example.com",
                    name: "Mehmet Demir",
                    role: "admin",
                    status: "active",
                    joinDate: "2023-03-10",
                    lastLogin: "2023-09-19",
                    followers: 0,
                    following: 0,
                    posts: 3,
                    reportCount: 0,
                },
                {
                    id: 4,
                    username: "zeynepcelik",
                    email: "zeynep.celik@example.com",
                    name: "Zeynep Çelik",
                    role: "user",
                    status: "inactive",
                    joinDate: "2023-06-05",
                    lastLogin: "2023-08-25",
                    followers: 532,
                    following: 287,
                    posts: 89,
                    reportCount: 0,
                },
                {
                    id: 5,
                    username: "mustafasahin",
                    email: "mustafa.sahin@example.com",
                    name: "Mustafa Şahin",
                    role: "user",
                    status: "active",
                    joinDate: "2023-07-12",
                    lastLogin: "2023-09-15",
                    followers: 183,
                    following: 207,
                    posts: 35,
                    reportCount: 2,
                },
            ]);
            setLoading(false);
        }, 500);

        document.title = "Kullanıcı Yönetimi - Admin Panel";
    }, []);

    // Arama fonksiyonu
    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Durum renkleri ve metinleri
    const statusStyles = {
        active: {
            color: "text-green-500",
            bg: "bg-green-500/10",
            text: "Aktif",
        },
        inactive: { color: "text-red-500", bg: "bg-red-500/10", text: "Pasif" },
    };

    // Rol renkleri ve metinleri
    const roleStyles = {
        admin: {
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            text: "Admin",
        },
        user: {
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            text: "Kullanıcı",
        },
    };

    return (
        <AdminLayout>
            {/* Başlık ve Arama Bölümü */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Kullanıcı Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Kullanıcı ara..."
                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white pr-10 focus:outline-none focus:border-pink-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute right-3 top-2.5 text-neutral-500" />
                    </div>
                </div>
            </div>

            {/* Kullanıcı Tablosu */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                        <p className="text-neutral-400">
                            Kullanıcılar yükleniyor...
                        </p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-neutral-400">
                        Aranan kriterlere uygun kullanıcı bulunamadı.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead>
                                <tr className="border-b border-neutral-700 text-left text-neutral-400 text-sm bg-neutral-700/20">
                                    <th className="py-3 px-4 font-medium">
                                        Kullanıcı
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Rol
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Durum
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İstatistikler
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Son Giriş
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-neutral-700 hover:bg-neutral-700/20"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-300 font-medium mr-3">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-white">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-neutral-400 text-sm">
                                                        @{user.username}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    roleStyles[user.role].bg
                                                } ${
                                                    roleStyles[user.role].color
                                                }`}
                                            >
                                                {roleStyles[user.role].text}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    statusStyles[user.status].bg
                                                } ${
                                                    statusStyles[user.status]
                                                        .color
                                                }`}
                                            >
                                                {statusStyles[user.status].text}
                                            </span>
                                            {user.reportCount > 0 && (
                                                <span className="inline-block ml-2 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                                                    {user.reportCount} Rapor
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            <div className="flex flex-col text-xs">
                                                <span className="mb-1">
                                                    <span className="font-medium text-pink-500">
                                                        {user.followers}
                                                    </span>{" "}
                                                    takipçi
                                                </span>
                                                <span className="mb-1">
                                                    <span className="font-medium text-blue-500">
                                                        {user.following}
                                                    </span>{" "}
                                                    takip edilen
                                                </span>
                                                <span>
                                                    <span className="font-medium text-green-500">
                                                        {user.posts}
                                                    </span>{" "}
                                                    gönderi
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            {user.lastLogin}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-white hover:text-blue-500 p-1"
                                                    title="Profili Görüntüle"
                                                >
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className="text-white hover:text-blue-500 p-1"
                                                    title="Düzenle"
                                                >
                                                    <FiEdit />
                                                </button>
                                                {user.status === "active" ? (
                                                    <button
                                                        className="text-white hover:text-red-500 p-1"
                                                        title="Devre Dışı Bırak"
                                                    >
                                                        <FiUserX />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="text-white hover:text-green-500 p-1"
                                                        title="Aktifleştir"
                                                    >
                                                        <FiUserCheck />
                                                    </button>
                                                )}
                                                <button
                                                    className="text-white hover:text-red-500 p-1"
                                                    title="Sil"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UsersManagementPage;
