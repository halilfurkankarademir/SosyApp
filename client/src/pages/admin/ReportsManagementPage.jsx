import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiTrash2,
    FiAlertOctagon,
    FiCheckCircle,
    FiFilter,
    FiEye,
    FiFlag,
    FiMessageSquare,
} from "react-icons/fi";

const ReportsManagementPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        // Burada API'den rapor verilerini getirme işlemi yapılacak
        // Şimdilik örnek veri kullanıyoruz
        setTimeout(() => {
            setReports([
                {
                    id: 1,
                    contentType: "post",
                    contentPreview:
                        "Bu konuda hepinizin fikrini merak ediyorum... #anket",
                    contentId: "p123456",
                    contentOwner: "zeynepcelik",
                    reportedBy: "mehmetdemir",
                    reason: "Yanıltıcı bilgi",
                    status: "pending",
                    date: "2023-09-18",
                    description:
                        "Bu gönderi gerçek dışı bilgiler içeriyor ve insanları yanıltabilir.",
                },
                {
                    id: 2,
                    contentType: "comment",
                    contentPreview:
                        "Bu çok saçma bir fikir, kesinlikle katılmıyorum!",
                    contentId: "c789012",
                    contentOwner: "mehmetdemir",
                    reportedBy: "aysekaya",
                    reason: "Hakaret/Saygısızlık",
                    status: "pending",
                    date: "2023-09-18",
                    description:
                        "Bu yorum hakaret içeriyor ve kırıcı bir dil kullanıyor.",
                },
                {
                    id: 3,
                    contentType: "post",
                    contentPreview:
                        "Arkadaşlar bu ürünü mutlaka denemelisiniz, inanılmaz etkili...",
                    contentId: "p456789",
                    contentOwner: "ahmetyilmaz",
                    reportedBy: "zeynepcelik",
                    reason: "İzinsiz Reklam",
                    status: "resolved",
                    date: "2023-09-15",
                    description:
                        "Bu gönderi tamamen reklam amaçlı ve platformun reklam politikasına aykırı.",
                },
                {
                    id: 4,
                    contentType: "user",
                    contentPreview: "mustafasahin kullanıcısı",
                    contentId: "u345678",
                    contentOwner: "mustafasahin",
                    reportedBy: "mehmetdemir",
                    reason: "Sahte Hesap",
                    status: "pending",
                    date: "2023-09-17",
                    description:
                        "Bu kullanıcı sahte bir profil fotoğrafı kullanıyor ve kendini farklı biri olarak tanıtıyor.",
                },
                {
                    id: 5,
                    contentType: "post",
                    contentPreview:
                        "Bu içeriği hemen kaydedip arkadaşlarınıza gönderin...",
                    contentId: "p654321",
                    contentOwner: "aysekaya",
                    reportedBy: "ahmetyilmaz",
                    reason: "Spam",
                    status: "resolved",
                    date: "2023-09-14",
                    description:
                        "Bu gönderi spam özelliği taşıyor ve kullanıcıları rahatsız ediyor.",
                },
            ]);
            setLoading(false);
        }, 500);

        document.title = "Rapor Yönetimi - Admin Panel";
    }, []);

    // Arama ve filtreleme fonksiyonu
    const filteredReports = reports.filter((report) => {
        const matchesSearch =
            report.contentPreview
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            report.reportedBy
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            report.contentOwner
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            report.reason.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === "all") return matchesSearch;
        if (filter === "pending")
            return matchesSearch && report.status === "pending";
        if (filter === "resolved")
            return matchesSearch && report.status === "resolved";
        if (filter === "post")
            return matchesSearch && report.contentType === "post";
        if (filter === "comment")
            return matchesSearch && report.contentType === "comment";
        if (filter === "user")
            return matchesSearch && report.contentType === "user";

        return matchesSearch;
    });

    // Durum renkleri ve metinleri
    const statusStyles = {
        pending: {
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            text: "İnceleniyor",
        },
        resolved: {
            color: "text-green-500",
            bg: "bg-green-500/10",
            text: "Çözüldü",
        },
    };

    // İçerik tipleri renkleri ve metinleri
    const contentTypeStyles = {
        post: {
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            text: "Gönderi",
            icon: <FiFlag className="h-4 w-4 mr-1" />,
        },
        comment: {
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            text: "Yorum",
            icon: <FiMessageSquare className="h-4 w-4 mr-1" />,
        },
        user: {
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            text: "Kullanıcı",
            icon: <FiFlag className="h-4 w-4 mr-1" />,
        },
    };

    return (
        <AdminLayout>
            {/* Başlık ve Arama Bölümü */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">
                    Rapor Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rapor ara..."
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
                        filter === "pending"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("pending")}
                >
                    <FiAlertOctagon className="mr-2" />
                    İnceleniyor
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "resolved"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("resolved")}
                >
                    <FiCheckCircle className="mr-2" />
                    Çözüldü
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "post"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("post")}
                >
                    <FiFlag className="mr-2" />
                    Gönderiler
                </button>
                <button
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filter === "comment"
                            ? "bg-pink-500 text-white"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                    onClick={() => setFilter("comment")}
                >
                    <FiMessageSquare className="mr-2" />
                    Yorumlar
                </button>
            </div>

            {/* Raporlar Tablosu */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                        <p className="text-neutral-400">
                            Raporlar yükleniyor...
                        </p>
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="p-8 text-center text-neutral-400">
                        Aranan kriterlere uygun rapor bulunamadı.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead>
                                <tr className="border-b border-neutral-700 text-left text-neutral-400 text-sm bg-neutral-700/20">
                                    <th className="py-3 px-4 font-medium">
                                        İçerik Tipi
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        İçerik
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Rapor Nedeni
                                    </th>
                                    <th className="py-3 px-4 font-medium">
                                        Durum
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
                                {filteredReports.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="border-b border-neutral-700 hover:bg-neutral-700/20"
                                    >
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    contentTypeStyles[
                                                        report.contentType
                                                    ].bg
                                                } ${
                                                    contentTypeStyles[
                                                        report.contentType
                                                    ].color
                                                }`}
                                            >
                                                {
                                                    contentTypeStyles[
                                                        report.contentType
                                                    ].icon
                                                }
                                                {
                                                    contentTypeStyles[
                                                        report.contentType
                                                    ].text
                                                }
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium truncate max-w-xs mb-1">
                                                    {report.contentPreview
                                                        .length > 40
                                                        ? report.contentPreview.substring(
                                                              0,
                                                              40
                                                          ) + "..."
                                                        : report.contentPreview}
                                                </span>
                                                <span className="text-xs text-neutral-400">
                                                    @{report.contentOwner} |
                                                    Rapor Eden: @
                                                    {report.reportedBy}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {report.reason}
                                                </span>
                                                <span className="text-xs text-neutral-400 mt-1 max-w-xs truncate">
                                                    {report.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    statusStyles[report.status]
                                                        .bg
                                                } ${
                                                    statusStyles[report.status]
                                                        .color
                                                }`}
                                            >
                                                {
                                                    statusStyles[report.status]
                                                        .text
                                                }
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-neutral-300">
                                            {report.date}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-white hover:text-blue-500 p-1"
                                                    title="İçeriği Görüntüle"
                                                >
                                                    <FiEye />
                                                </button>
                                                {report.status ===
                                                    "pending" && (
                                                    <button
                                                        className="text-white hover:text-green-500 p-1"
                                                        title="Çözüldü Olarak İşaretle"
                                                    >
                                                        <FiCheckCircle />
                                                    </button>
                                                )}
                                                <button
                                                    className="text-white hover:text-red-500 p-1"
                                                    title="İçeriği Kaldır"
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

export default ReportsManagementPage;
