import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../../components/common";
import { BiWorld } from "react-icons/bi";
import { FaFire, FaUserFriends } from "react-icons/fa";
import RenderPosts from "../../components/features/posts/RenderPosts";
import { getCurrentUser, getRandomUsers } from "../../api/userApi";
import useUserStore from "../../hooks/useUserStore";
import UserCard from "../../components/ui/cards/UserCard";
import { fetchTrendingPosts } from "../../api/postApi";

// Keşfet sayfası bileşeni
const ExplorePage = () => {
    const [activeTab, setActiveTab] = useState("trending");
    const [trendingUsers, setTrendingUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const setUser = useUserStore((state) => state.setUser);

    // Kullanıcı bilgilerini yükleme
    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // Verileri yükle
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [user, popularUsers] = await Promise.all([
                fetchUser(),
                getRandomUsers(),
            ]);
            setTrendingUsers(popularUsers);
        } catch (error) {
            console.error("Error fetching explore data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Keşfet";
        fetchData();
    }, [fetchData]);

    // Trend kullanıcıları render et
    const renderTrendingUsers = () => {
        return (
            <div className="space-y-3">
                {trendingUsers.map((user) => (
                    <UserCard key={user.uid} user={user} />
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="page-container py-24 px-4 md:px-0">
                <div className="page-grid-layout-large">
                    <Sidebar />

                    <div className="md:col-span-3 md:ml-72 w-full">
                        <div className="bg-neutral-800 rounded-lg mb-4 md:mb-6">
                            <div className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center mb-4 md:mb-0 min-w-0 mr-4">
                                        <div
                                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                            style={{
                                                backgroundColor: "#b347ff",
                                            }}
                                        >
                                            <BiWorld className="text-lg md:text-xl" />
                                        </div>
                                        <h1 className="text-xl md:text-2xl font-semibold text-white truncate">
                                            Keşfet
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 md:px-6">
                                <nav className="flex space-x-1 sm:space-x-4 border-b border-neutral-700">
                                    {/* Trend Gönderiler Tab */}
                                    <button
                                        onClick={() => setActiveTab("trending")}
                                        disabled={isLoading}
                                        className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                            activeTab === "trending"
                                                ? "border-purple-500 text-purple-400"
                                                : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-500"
                                        } ${
                                            isLoading
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        <FaFire className="flex-shrink-0" />
                                        <span className="flex-shrink-0">
                                            Trend Gönderiler
                                        </span>
                                    </button>

                                    {/* Popüler Kullanıcılar Tab */}
                                    <button
                                        onClick={() => setActiveTab("users")}
                                        disabled={isLoading}
                                        className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                            activeTab === "users"
                                                ? "border-purple-500 text-purple-400"
                                                : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-500"
                                        } ${
                                            isLoading
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        <FaUserFriends className="flex-shrink-0" />
                                        <span className="flex-shrink-0">
                                            Popüler Kullanıcılar
                                        </span>
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* İçerik Alanı */}
                        <div className="mt-4 md:mt-6">
                            {activeTab === "trending" && (
                                <RenderPosts
                                    fetchOptions={fetchTrendingPosts}
                                    canCreatePost={false}
                                    filters={{ trending: true }}
                                />
                            )}

                            {activeTab === "users" && (
                                <div className="bg-neutral-800 p-4 md:p-6 rounded-lg">
                                    <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
                                        Popüler Kullanıcılar
                                    </h2>
                                    {renderTrendingUsers()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExplorePage;
