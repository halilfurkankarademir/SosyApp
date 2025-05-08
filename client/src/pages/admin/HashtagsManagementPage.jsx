import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiHash,
    FiEye,
    FiTrendingUp,
    FiFilter,
    FiSlash,
    FiCheckCircle,
    FiTrash2,
    FiBarChart2,
} from "react-icons/fi";

const HashtagsManagementPage = () => {
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Burada API'den hashtag verilerini getirme işlemi yapılacak
        // Şimdilik örnek veri kullanıyoruz
        setTimeout(() => {
            setHashtags([
                {
                    id: 1,
                    name: "teknoloji",
                    postCount: 1245,
                    userCount: 823,
                    status: "active",
                    trending: true,
                    lastUsed: "2023-09-19",
                    growth: "+12%",
                },
                {
                    id: 2,
                    name: "yemek",
                    postCount: 2458,
                    userCount: 1432,
                    status: "active",
                    trending: true,
                    lastUsed: "2023-09-19",
                    growth: "+8%",
                },
                {
                    id: 3,
                    name: "dolandırıcılık",
                    postCount: 156,
                    userCount: 87,
                    status: "blocked",
                    trending: false,
                    lastUsed: "2023-09-15",
                    growth: "-2%",
                },
                {
                    id: 4,
                    name: "spor",
                    postCount: 1876,
                    userCount: 1052,
                    status: "active",
                    trending: true,
                    lastUsed: "2023-09-19",
                    growth: "+15%",
                },
                {
                    id: 5,
                    name: "siyaset",
                    postCount: 2135,
                    userCount: 1245,
                    status: "monitored",
                    trending: true,
                    lastUsed: "2023-09-19",
                    growth: "+5%",
                },
                {
                    id: 6,
                    name: "yardım",
                    postCount: 435,
                    userCount: 312,
                    status: "active",
                    trending: false,
                    lastUsed: "2023-09-18",
                    growth: "+3%",
                },
                {
                    id: 7,
                    name: "müzik",
                    postCount: 1532,
                    userCount: 987,
                    status: "active",
                    trending: true,
                    lastUsed: "2023-09-19",
                    growth: "+10%",
                },
                {
                    id: 8,
                    name: "sahte",
                    postCount: 89,
                    userCount: 45,
                    status: "blocked",
                    trending: false,
                    lastUsed: "2023-09-14",
                    growth: "-5%",
                },
            ]);
            setLoading(false);
        }, 500);

        document.title = "Hashtag Yönetimi - Admin Panel";
    }, []);

    // Arama ve filtreleme fonksiyonu
    const filteredHashtags = hashtags.filter((hashtag) => {
        const matchesSearch = hashtag.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "active")
            return matchesSearch && hashtag.status === "active";
        if (filter === "blocked")
            return matchesSearch && hashtag.status === "blocked";
        if (filter === "monitored")
            return matchesSearch && hashtag.status === "monitored";
        if (filter === "trending") return matchesSearch && hashtag.trending;

        return matchesSearch;
    });

    // Durum renkleri ve metinleri
    const statusStyles = {
        active: {
            color: "text-green-500",
            bg: "bg-green-500/10",
            text: "Aktif",
        },
        blocked: {
            color: "text-red-500",
            bg: "bg-red-500/10",
            text: "Engellendi",
        },
        monitored: {
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            text: "İzleniyor",
        },
    };

    return (
        <AdminLayout>
            {/* Başlık ve Arama Bölümü */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Hashtag Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Hashtag ara..."
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
                        filter === "active"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("active")}
                >
                    <FiCheckCircle className="mr-2" />
                    Aktif
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "blocked"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("blocked")}
                >
                    <FiSlash className="mr-2" />
                    Engellendi
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "trending"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("trending")}
                >
                    <FiTrendingUp className="mr-2" />
                    Trend
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "monitored"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("monitored")}
                >
                    <FiEye className="mr-2" />
                    İzleniyor
                </button>
            </div>

            {/* Hashtagler Tablosu */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                        <p className="text-neutral-400">
                            Hashtagler yükleniyor...
                        </p>
                    </div>
                ) : filteredHashtags.length === 0 ? (
                    <div className="p-8 text-center text-neutral-400">
                        Aranan kriterlere uygun hashtag bulunamadı.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead>
                                <tr className="border-b border-neutral-700 text-left text-neutral-400 text-sm bg-neutral-700/20">
                                    <th className="py-3 px-4 font-medium">
                                        Hashtag
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İstatistikler
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Durum
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Son Kullanım
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHashtags.map((hashtag) => (
                                    <tr
                                        key={hashtag.id}
                                        className="border-b border-neutral-700 hover:bg-neutral-700/20"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center text-pink-500 mr-3">
                                                    <FiHash className="h-5 w-5" />
                                                </div>
                                                <div className="text-white font-medium">
                                                    #{hashtag.name}
                                                    {hashtag.trending && (
                                                        <span className="ml-2 text-xs font-normal text-pink-500 inline-flex items-center">
                                                            <FiTrendingUp className="h-3 w-3 mr-1" />
                                                            Trend
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col text-sm">
                                                <div className="flex items-center">
                                                    <span className="text-white font-medium mr-2">
                                                        {hashtag.postCount.toLocaleString()}
                                                    </span>
                                                    <span className="text-neutral-400">
                                                        gönderi
                                                    </span>
                                                    <span
                                                        className={`ml-2 text-xs ${
                                                            hashtag.growth.startsWith(
                                                                "+"
                                                            )
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        {hashtag.growth}
                                                    </span>
                                                </div>
                                                <div className="text-neutral-400 text-xs mt-1">
                                                    {hashtag.userCount.toLocaleString()}{" "}
                                                    kullanıcı tarafından
                                                    kullanıldı
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    statusStyles[hashtag.status]
                                                        .bg
                                                } ${
                                                    statusStyles[hashtag.status]
                                                        .color
                                                }`}
                                            >
                                                {
                                                    statusStyles[hashtag.status]
                                                        .text
                                                }
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            {hashtag.lastUsed}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-white hover:text-blue-500 p-1"
                                                    title="İçerikleri Görüntüle"
                                                >
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className="text-white hover:text-blue-500 p-1"
                                                    title="İstatistikleri Görüntüle"
                                                >
                                                    <FiBarChart2 />
                                                </button>
                                                {hashtag.status === "active" ? (
                                                    <button
                                                        className="text-white hover:text-red-500 p-1"
                                                        title="Engelle"
                                                    >
                                                        <FiSlash />
                                                    </button>
                                                ) : hashtag.status ===
                                                  "blocked" ? (
                                                    <button
                                                        className="text-white hover:text-green-500 p-1"
                                                        title="Engeli Kaldır"
                                                    >
                                                        <FiCheckCircle />
                                                    </button>
                                                ) : null}
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

export default HashtagsManagementPage;
