import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/common";
// Kullanılan ikonlar
import { BsPeopleFill } from "react-icons/bs";
import { FaUserFriends, FaUserCheck, FaUserAltSlash } from "react-icons/fa"; // Gerekli ikonları ekleyin
import LargeSearchInput from "../../components/ui/inputs/LargeSearchInput";
import { useDebounce } from "use-debounce";
import { getCurrentUser } from "../../api/userApi";
import UserCard from "../../components/ui/cards/UserCard";
import useUserStore from "../../hooks/useUserStore";
import { getFollowers, getFollowings } from "../../api/followApi";
import { Spinner } from "@heroui/react"; // Veya kendi Spinner bileşeniniz

const ConnectionsPage = () => {
    // ... (Mevcut state'ler: search, debouncedSearch, allFollowers, allFollowing, activeTab, isLoading) ...
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [allFollowers, setAllFollowers] = useState([]);
    const [allFollowing, setAllFollowing] = useState([]);
    const [activeTab, setActiveTab] = useState("followers");
    const [isLoading, setIsLoading] = useState(true);

    const setUser = useUserStore((state) => state.setUser);

    // Takipçi Filtreleme
    const filteredFollowers = allFollowers.filter((follower) => {
        const userData = follower.FollowerUser;
        if (!userData) return false;
        const searchTerm = debouncedSearch.toLowerCase().trim();
        return (
            userData.username?.toLowerCase().includes(searchTerm) ||
            userData.firstName?.toLowerCase().includes(searchTerm) ||
            userData.lastName?.toLowerCase().includes(searchTerm)
        );
    });

    // Takip Edilen Filtreleme
    const filteredFollowing = allFollowing.filter((following) => {
        const userData = following.FollowedUser;
        if (!userData) return false;
        const searchTerm = debouncedSearch.toLowerCase().trim();
        return (
            userData.username?.toLowerCase().includes(searchTerm) ||
            userData.firstName?.toLowerCase().includes(searchTerm) ||
            userData.lastName?.toLowerCase().includes(searchTerm)
        );
    });

    // ... (Mevcut fetchData fonksiyonu) ...
    const fetchData = async () => {
        try {
            const [user, followers, followings] = await Promise.all([
                getCurrentUser(),
                getFollowers(),
                getFollowings(),
            ]);
            setUser(user);
            setAllFollowers(followers || []);
            setAllFollowing(followings || []);
            console.log("Followers:", followers);
            console.log("Followings:", followings);
        } catch (error) {
            console.error("Error fetching connection data:", error);
            setAllFollowers([]);
            setAllFollowing([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title =
            activeTab === "followers" ? "Takipçilerim" : "Takip Ettiklerim";
        fetchData();
    }, []);

    useEffect(() => {
        document.title =
            activeTab === "followers" ? "Takipçilerim" : "Takip Ettiklerim";
    }, [activeTab]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-10">
                    <Spinner size="lg" />
                </div>
            );
        }

        const listToDisplay =
            activeTab === "followers" ? filteredFollowers : filteredFollowing;
        const emptyMessage =
            activeTab === "followers"
                ? "Arama kriterlerinize uygun takipçi bulunamadı."
                : "Arama kriterlerinize uygun takip edilen kullanıcı bulunamadı.";
        const userKey =
            activeTab === "followers" ? "FollowerUser" : "FollowedUser";

        if (listToDisplay.length === 0) {
            return (
                <div className="text-center py-8 md:py-10">
                    <div className="flex justify-center mb-3 md:mb-4">
                        <FaUserAltSlash className="text-5xl md:text-6xl text-neutral-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                        {search
                            ? "Sonuç bulunamadı"
                            : activeTab === "followers"
                            ? "Hiç takipçin yok"
                            : "Hiç kimseyi takip etmiyorsun"}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-400">
                        {search
                            ? emptyMessage
                            : activeTab === "followers"
                            ? "Seni takip eden kimse bulunamadı."
                            : "Henüz kimseyi takip etmiyorsun."}
                    </p>
                </div>
            );
        }

        return listToDisplay.map((item) => (
            <UserCard
                user={item[userKey]}
                isFollowerCard={activeTab === "followers"}
                key={item[userKey]?.uid || item.id}
            />
        ));
    };

    return (
        <>
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                <div className="page-grid-layout-large">
                    <Sidebar />

                    <div className="md:col-span-3  md:ml-72 w-full">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            {/* Sayfa Başlığı */}
                            <div className="flex items-center mb-6">
                                {" "}
                                {/* Altındaki nav'dan önce boşluk için mb-6 */}
                                <div
                                    className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-3 rounded-full text-white"
                                    style={{ backgroundColor: "#62c8ff" }}
                                >
                                    <BsPeopleFill className="text-lg md:text-xl" />
                                </div>
                                <h1 className="text-xl md:text-2xl font-semibold text-white">
                                    Sosyal Ağım
                                </h1>
                            </div>

                            {/* YENİ TAB NAVİGASYONU */}
                            <nav className="flex space-x-1 sm:space-x-4 border-b border-neutral-700 mb-6">
                                {/* Takipçiler Tab */}
                                <button
                                    onClick={() => setActiveTab("followers")}
                                    disabled={isLoading}
                                    className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                        activeTab === "followers"
                                            ? // SearchPage'deki renkleri kullanalım (mor) veya isterseniz maviye çevirebilirsiniz
                                              "border-purple-500 text-purple-400"
                                            : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-500"
                                    } ${
                                        isLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <FaUserFriends className="flex-shrink-0" />
                                    <span className="flex-shrink-0">
                                        Takipçiler
                                    </span>
                                    {!isLoading && (
                                        <span className="ml-1.5 sm:ml-2 text-xs bg-neutral-600 text-neutral-200 rounded-full px-2 py-0.5 flex-shrink-0">
                                            {allFollowers.length}
                                        </span>
                                    )}
                                </button>

                                {/* Takip Edilenler Tab */}
                                <button
                                    onClick={() => setActiveTab("following")}
                                    disabled={isLoading}
                                    className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                        activeTab === "following"
                                            ? "border-purple-500 text-purple-400" // Aktif renk
                                            : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-500" // İnaktif renk
                                    } ${
                                        isLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <FaUserCheck className="flex-shrink-0" />{" "}
                                    {/* Uygun ikon */}
                                    <span className="flex-shrink-0">
                                        Takip Edilenler
                                    </span>
                                    {!isLoading && (
                                        <span className="ml-1.5 sm:ml-2 text-xs bg-neutral-600 text-neutral-200 rounded-full px-2 py-0.5 flex-shrink-0">
                                            {allFollowing.length}
                                        </span>
                                    )}
                                </button>
                            </nav>
                            {/* / YENİ TAB NAVİGASYONU */}

                            {/* Arama Çubuğu */}
                            <LargeSearchInput
                                search={search}
                                setSearch={setSearch}
                                placeholderText={
                                    activeTab === "followers"
                                        ? "Takipçilerinde Ara"
                                        : "Takip Ettiklerinde Ara"
                                }
                            />

                            {/* İçerik Alanı */}
                            <div className="mt-6">{renderContent()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConnectionsPage;
