import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiPlus,
    FiEdit,
    FiTrash2,
    FiEye,
    FiCheckCircle,
    FiXCircle,
    FiAlertCircle,
    FiFilter,
} from "react-icons/fi";

const ContentManagementPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Burada API'den içerikleri getirme işlemi yapılacak
        // Şimdilik örnek veri kullanıyoruz
        setTimeout(() => {
            setPosts([
                {
                    id: 1,
                    content: "Bugün harika bir gün! #güneşli #mutlu",
                    author: "ahmetyilmaz",
                    authorName: "Ahmet Yılmaz",
                    status: "published",
                    date: "2023-09-10",
                    likes: 145,
                    comments: 32,
                    reports: 0,
                    mediaCount: 2,
                },
                {
                    id: 2,
                    content: "Yeni telefon aldım, çok memnunum! #teknoloji",
                    author: "mehmetdemir",
                    authorName: "Mehmet Demir",
                    status: "published",
                    date: "2023-09-15",
                    likes: 89,
                    comments: 14,
                    reports: 0,
                    mediaCount: 1,
                },
                {
                    id: 3,
                    content: "Bu uygulama çok güzel olmuş!",
                    author: "aysekaya",
                    authorName: "Ayşe Kaya",
                    status: "draft",
                    date: "2023-09-12",
                    likes: 0,
                    comments: 0,
                    reports: 0,
                    mediaCount: 0,
                },
                {
                    id: 4,
                    content: "İstanbul'da yağmurlu bir gün #yağmur #istanbul",
                    author: "mustafasahin",
                    authorName: "Mustafa Şahin",
                    status: "pending",
                    date: "2023-09-18",
                    likes: 0,
                    comments: 0,
                    reports: 0,
                    mediaCount: 1,
                },
                {
                    id: 5,
                    content:
                        "Bu konuda hepinizin fikrini merak ediyorum... #anket",
                    author: "zeynepcelik",
                    authorName: "Zeynep Çelik",
                    status: "published",
                    date: "2023-09-05",
                    likes: 210,
                    comments: 45,
                    reports: 2,
                    mediaCount: 0,
                },
            ]);
            setLoading(false);
        }, 500);

        document.title = "Gönderi Yönetimi - Admin Panel";
    }, []);

    // Arama ve filtreleme fonksiyonu
    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.authorName.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "published")
            return matchesSearch && post.status === "published";
        if (filter === "draft") return matchesSearch && post.status === "draft";
        if (filter === "pending")
            return matchesSearch && post.status === "pending";
        if (filter === "reported") return matchesSearch && post.reports > 0;

        return matchesSearch;
    });

    // Durum renkleri ve metinleri
    const statusStyles = {
        published: {
            color: "text-green-500",
            bg: "bg-green-500/10",
            text: "Yayında",
        },
        draft: {
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            text: "Taslak",
        },
        pending: {
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            text: "Onay Bekliyor",
        },
    };

    return (
        <AdminLayout>
            {/* Başlık ve Arama Bölümü */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Gönderi Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Gönderi ara..."
                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white pr-10 focus:outline-none focus:border-pink-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute right-3 top-2.5 text-neutral-500" />
                    </div>
                </div>
            </div>

            {/* Filtreler */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "all"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("all")}
                >
                    <FiFilter className="mr-2" />
                    Tümü
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "reported"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("reported")}
                >
                    <FiAlertCircle className="mr-2" />
                    Raporlanan
                </button>
            </div>

            {/* İçerik Tablosu */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                        <p className="text-neutral-400">
                            Gönderiler yükleniyor...
                        </p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="p-8 text-center text-neutral-400">
                        Aranan kriterlere uygun gönderi bulunamadı.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead>
                                <tr className="border-b border-neutral-700 text-left text-neutral-400 text-sm bg-neutral-700/20">
                                    <th className="py-3 px-4 font-medium">
                                        Gönderi
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Kullanıcı
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Tarih
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Etkileşim
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="border-b border-neutral-700 hover:bg-neutral-700/20"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium truncate max-w-xs">
                                                    {post.content.length > 60
                                                        ? post.content.substring(
                                                              0,
                                                              60
                                                          ) + "..."
                                                        : post.content}
                                                </span>
                                                {post.mediaCount > 0 && (
                                                    <span className="text-xs text-neutral-400 mt-1">
                                                        {post.mediaCount} medya
                                                        öğesi
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            <div className="flex items-center">
                                                <span className="text-neutral-300">
                                                    @{post.author}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            {post.date}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm text-neutral-400">
                                                <span className="inline-block mr-3">
                                                    {post.likes} beğeni
                                                </span>
                                                <span>
                                                    {post.comments} yorum
                                                </span>
                                                {post.reports > 0 && (
                                                    <span className="inline-block ml-3 text-red-500">
                                                        {post.reports} rapor
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button className="text-white hover:text-blue-500 p-1">
                                                    <FiEye />
                                                </button>
                                                <button className="text-white hover:text-blue-500 p-1">
                                                    <FiEdit />
                                                </button>
                                                <button className="text-white hover:text-red-500 p-1">
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

export default ContentManagementPage;
