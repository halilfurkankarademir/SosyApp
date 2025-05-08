import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiTrash2,
    FiAlertOctagon,
    FiCheckCircle,
    FiXCircle,
    FiFilter,
    FiEye,
    FiMessageSquare,
} from "react-icons/fi";

const CommentsManagementPage = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Burada API'den yorumları getirme işlemi yapılacak
        // Şimdilik örnek veri kullanıyoruz
        setTimeout(() => {
            setComments([
                {
                    id: 1,
                    content: "Harika bir gönderi olmuş! Tebrikler 👏",
                    author: "ahmetyilmaz",
                    authorName: "Ahmet Yılmaz",
                    postTitle: "Bugün harika bir gün! #güneşli #mutlu",
                    postAuthor: "zeynepcelik",
                    status: "approved",
                    date: "2023-09-10",
                    likes: 15,
                    reports: 0,
                },
                {
                    id: 2,
                    content: "Kesinlikle katılıyorum, bu ürün harika!",
                    author: "aysekaya",
                    authorName: "Ayşe Kaya",
                    postTitle: "Yeni telefon aldım, çok memnunum! #teknoloji",
                    postAuthor: "mehmetdemir",
                    status: "approved",
                    date: "2023-09-15",
                    likes: 8,
                    reports: 0,
                },
                {
                    id: 3,
                    content: "Bence bu konuda yanılıyorsun...",
                    author: "mustafasahin",
                    authorName: "Mustafa Şahin",
                    postTitle:
                        "Bu konuda hepinizin fikrini merak ediyorum... #anket",
                    postAuthor: "zeynepcelik",
                    status: "pending",
                    date: "2023-09-12",
                    likes: 0,
                    reports: 0,
                },
                {
                    id: 4,
                    content: "Bu çok saçma bir fikir, kesinlikle katılmıyorum!",
                    author: "mehmetdemir",
                    authorName: "Mehmet Demir",
                    postTitle:
                        "Bu konuda hepinizin fikrini merak ediyorum... #anket",
                    postAuthor: "zeynepcelik",
                    status: "pending",
                    date: "2023-09-18",
                    likes: 2,
                    reports: 3,
                },
                {
                    id: 5,
                    content:
                        "Daha önce de aynı sorunu yaşamıştım, çözüm için DM atabilirsin :)",
                    author: "zeynepcelik",
                    authorName: "Zeynep Çelik",
                    postTitle:
                        "Telefonu şarj edemiyorum, yardım lazım! #yardım",
                    postAuthor: "ahmetyilmaz",
                    status: "approved",
                    date: "2023-09-05",
                    likes: 7,
                    reports: 0,
                },
            ]);
            setLoading(false);
        }, 500);

        document.title = "Yorum Yönetimi - Admin Panel";
    }, []);

    // Arama ve filtreleme fonksiyonu
    const filteredComments = comments.filter((comment) => {
        const matchesSearch =
            comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "reported") return matchesSearch && comment.reports > 0;

        return matchesSearch;
    });

    // Durum renkleri ve metinleri
    const statusStyles = {
        approved: {
            color: "text-green-500",
            bg: "bg-green-500/10",
            text: "Onaylanmış",
        },
        pending: {
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            text: "İnceleniyor",
        },
    };

    return (
        <AdminLayout>
            {/* Başlık ve Arama Bölümü */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Yorum Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Yorum ara..."
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
                    <FiAlertOctagon className="mr-2" />
                    Raporlananlar
                </button>
            </div>

            {/* Yorumlar Tablosu */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                        <p className="text-neutral-400">
                            Yorumlar yükleniyor...
                        </p>
                    </div>
                ) : filteredComments.length === 0 ? (
                    <div className="p-8 text-center text-neutral-400">
                        Aranan kriterlere uygun yorum bulunamadı.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead>
                                <tr className="border-b border-neutral-700 text-left text-neutral-400 text-sm bg-neutral-700/20">
                                    <th className="py-3 px-4 font-medium">
                                        Yorum
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Gönderi
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Tarih
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComments.map((comment) => (
                                    <tr
                                        key={comment.id}
                                        className="border-b border-neutral-700 hover:bg-neutral-700/20"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium truncate max-w-xs mb-1">
                                                    {comment.content.length > 60
                                                        ? comment.content.substring(
                                                              0,
                                                              60
                                                          ) + "..."
                                                        : comment.content}
                                                </span>
                                                <span className="text-xs text-neutral-400">
                                                    @{comment.author} (
                                                    {comment.authorName})
                                                </span>
                                                {comment.reports > 0 && (
                                                    <span className="text-xs text-red-500 mt-1">
                                                        {comment.reports} rapor
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            <div className="flex flex-col">
                                                <span className="truncate max-w-xs">
                                                    {comment.postTitle.length >
                                                    40
                                                        ? comment.postTitle.substring(
                                                              0,
                                                              40
                                                          ) + "..."
                                                        : comment.postTitle}
                                                </span>
                                                <span className="text-xs text-neutral-400">
                                                    @{comment.postAuthor}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            {comment.date}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-white hover:text-blue-500 p-1"
                                                    title="Gönderiyi Görüntüle"
                                                >
                                                    <FiEye />
                                                </button>
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

export default CommentsManagementPage;
