import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import {
    BsPeopleFill,
    BsFillPersonPlusFill,
    BsPersonFillCheck,
} from "react-icons/bs";
import { FaSearch, FaUserMinus } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import FriendsBar from "../components/common/FriendsBar";
import { allFriends, friendRequests } from "../utils/constants";

const FriendsPage = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");
    // Filtreleme
    const filteredFriends = (() => {
        const searchLower = search.toLowerCase();

        if (activeTab === "all") {
            return allFriends.filter(
                (friend) =>
                    friend.name.toLowerCase().includes(searchLower) ||
                    friend.username.toLowerCase().includes(searchLower)
            );
        } else if (activeTab === "requests") {
            return friendRequests.filter(
                (friend) =>
                    friend.name.toLowerCase().includes(searchLower) ||
                    friend.username.toLowerCase().includes(searchLower)
            );
        }

        return [];
    })();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Arkadaşlarım";
    }, []);

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-24 md:py-36 px-4 md:px-0">
                {/* Grid Layout */}
                <div
                    className="w-full md:grid md:grid-cols-4 md:gap-4"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar - Mobilde gizli */}
                    <div className="hidden md:block md:col-span-1">
                        <Sidebar />
                        <div className="mt-4">
                            <FriendsBar />
                        </div>
                    </div>

                    {/* Arkadaşlar Bölümü */}
                    <div className="md:col-span-3">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                                <div className="flex items-center mb-3 md:mb-0">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                        style={{ backgroundColor: "#62c8ff" }}
                                    >
                                        <BsPeopleFill className="text-lg md:text-xl" />
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-semibold text-white">
                                        Arkadaşlarım
                                    </h1>
                                </div>

                                {activeTab === "requests" &&
                                    friendRequests.length > 0 && (
                                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium self-start animate-pulse md:self-auto">
                                            {friendRequests.length} isteğiniz
                                            var!
                                        </div>
                                    )}
                            </div>

                            {/* Sekmeler */}
                            <div className="flex border-b border-neutral-700 mb-4 md:mb-6 overflow-x-auto scrollbar-hide">
                                <button
                                    onClick={() => setActiveTab("all")}
                                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap cursor-pointer ${
                                        activeTab === "all"
                                            ? "text-blue-400 border-b-2 border-blue-400"
                                            : "text-neutral-400 hover:text-neutral-300"
                                    }`}
                                >
                                    Tüm Arkadaşlar
                                </button>
                                <button
                                    onClick={() => setActiveTab("requests")}
                                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium flex items-center whitespace-nowrap cursor-pointer ${
                                        activeTab === "requests"
                                            ? "text-blue-400 border-b-2 border-blue-400"
                                            : "text-neutral-400 hover:text-neutral-300"
                                    }`}
                                >
                                    Arkadaşlık İstekleri
                                    {friendRequests.length > 0 && (
                                        <span className="ml-1 md:ml-2 bg-red-500 text-white px-1 md:px-1.5 py-0.5 rounded-full text-xs">
                                            {friendRequests.length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Arama */}
                            <div className="relative mb-4 md:mb-6">
                                <input
                                    type="text"
                                    placeholder="Arkadaş ara..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </div>

                            {/* Arkadaş Listesi */}
                            <div className="space-y-3 md:space-y-4">
                                {filteredFriends.length === 0 ? (
                                    <div className="text-center py-8 md:py-10">
                                        <div className="flex justify-center mb-3 md:mb-4">
                                            <BsPeopleFill className="text-5xl md:text-6xl text-neutral-600" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                            {activeTab === "all"
                                                ? "Hiç arkadaşın yok"
                                                : "Sonuç bulunamadı"}
                                        </h3>
                                        <p className="text-sm text-neutral-400">
                                            {activeTab === "all"
                                                ? "Arkadaşlar ekleyerek sosyal ağını genişletebilirsin."
                                                : "Arama kriterlerine uygun sonuç bulunamadı."}
                                        </p>
                                    </div>
                                ) : (
                                    filteredFriends.map((friend) => (
                                        <div
                                            key={friend.id}
                                            className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition duration-200"
                                        >
                                            <div className="flex items-center space-x-3 mb-3 md:mb-0">
                                                <div className="relative">
                                                    <img
                                                        src={friend.profilePic}
                                                        alt={friend.name}
                                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                                                    />
                                                    {activeTab === "all" &&
                                                        friend.isOnline && (
                                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-neutral-700"></div>
                                                        )}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium text-sm md:text-base">
                                                        {friend.name}
                                                    </h3>
                                                    <p className="text-xs md:text-sm text-neutral-400">
                                                        @{friend.username}
                                                    </p>
                                                    {activeTab === "all" && (
                                                        <p className="text-xs text-neutral-500 mt-0.5 md:mt-1">
                                                            {friend.isOnline
                                                                ? "Çevrimiçi"
                                                                : `Son görülme: ${friend.lastSeen}`}
                                                        </p>
                                                    )}
                                                    {activeTab ===
                                                        "requests" && (
                                                        <p className="text-xs text-neutral-500 mt-0.5">
                                                            İstek gönderildi:{" "}
                                                            {friend.requestDate}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 self-end md:self-center">
                                                {activeTab === "all" && (
                                                    <>
                                                        <button className="p-1.5 md:p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                                                            <MdOutlineMessage
                                                                size={16}
                                                                className="md:text-lg"
                                                            />
                                                        </button>
                                                        <button className="p-1.5 md:p-2 rounded-full bg-neutral-600 text-white hover:bg-red-600 transition">
                                                            <FaUserMinus
                                                                size={16}
                                                                className="md:text-lg"
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                                {activeTab === "requests" && (
                                                    <>
                                                        <button className="px-2 md:px-3 py-1 rounded-md bg-blue-600 text-white text-xs md:text-sm hover:bg-blue-700 transition">
                                                            Kabul Et
                                                        </button>
                                                        <button className="px-2 md:px-3 py-1 rounded-md bg-neutral-600 text-white text-xs md:text-sm hover:bg-neutral-500 transition">
                                                            Reddet
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendsPage;
