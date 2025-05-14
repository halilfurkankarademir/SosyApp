import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import {
    FaSearch,
    FaSearchMinus,
    FaUserFriends,
    FaRegNewspaper,
} from "react-icons/fa";
// searchPosts ve searchUsers'ı import ettiğinizden emin olun
import { searchPosts, searchUsers } from "../../api/searchApi";
import PostCard from "../../components/features/posts/PostCard";
import UserCard from "../../components/ui/cards/UserCard";
import useUserStore from "../../hooks/useUserStore";
import { getCurrentUser } from "../../api/userApi";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("posts");
    // postResults'ı başlangıçta count ve boş posts array'i ile tanımla
    const [postResults, setPostResults] = useState({ count: 0, posts: [] });
    const [userResults, setUserResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const setUser = useUserStore((state) => state.setUser);

    const searchFunction = async (query) => {
        if (!query) {
            // State'leri varsayılan yapılarına sıfırla
            setPostResults({ count: 0, posts: [] });
            setUserResults([]);
            setError(null);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // API'den gelen yanıtları al
            const [postResponse, users] = await Promise.all([
                searchPosts(query),
                searchUsers(query),
            ]);

            // postResponse'un beklenen yapıda olduğunu kontrol et
            if (
                postResponse &&
                typeof postResponse.count === "number" &&
                Array.isArray(postResponse.posts)
            ) {
                setPostResults(postResponse); // { count: ..., posts: [...] } object'ini state'e ata
            } else {
                console.warn("Beklenmedik post yanıt yapısı:", postResponse);
                setPostResults({ count: 0, posts: [] }); // Hatalı yanıta karşı güvenli varsayılan
            }

            // users'ın array olduğunu kontrol et
            if (Array.isArray(users)) {
                setUserResults(users);
            } else {
                console.warn("Beklenmedik user yanıt yapısı:", users);
                setUserResults([]); // Hatalı yanıta karşı güvenli varsayılan
            }
        } catch (err) {
            console.error("Error searching:", err);
            setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            // Hata durumunda state'leri sıfırla
            setPostResults({ count: 0, posts: [] });
            setUserResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const query = searchParams.get("q");
        setSearchQuery(query || "");
        searchFunction(query);
        fetchCurrentUser();
        document.title = query ? `${query} için sonuçlar` : "Arama";
    }, [searchParams]); // searchFunction'ı dependency array'e eklemeye gerek yok (useCallback ile optimize edilmediği sürece)

    return (
        <>
            <div className="page-container py-24 px-4 md:px-0">
                <div className="page-grid-layout-large">
                    <Sidebar />

                    <div className="col-span-1 md:col-span-3 md:ml-72 w-full">
                        <div className="bg-neutral-800 rounded-lg mb-4 md:mb-6">
                            <div className="p-4 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center mb-4 md:mb-0 min-w-0 mr-4">
                                        <div
                                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                            style={{
                                                backgroundColor: "#995bff",
                                            }}
                                        >
                                            <FaSearch className="text-lg md:text-xl" />
                                        </div>
                                        {searchQuery ? (
                                            <h1 className="text-xl md:text-2xl font-semibold text-white truncate">
                                                "{searchQuery}" için sonuçlar
                                            </h1>
                                        ) : (
                                            <h1 className="text-xl md:text-2xl font-semibold text-white">
                                                Arama Sonuçları
                                            </h1>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {(searchQuery || isLoading || error) && (
                                <div className="px-4 md:px-6">
                                    <nav className="flex space-x-1 sm:space-x-4 border-b border-neutral-700">
                                        <button
                                            onClick={() =>
                                                setActiveTab("posts")
                                            }
                                            disabled={isLoading}
                                            className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                                activeTab === "posts"
                                                    ? "border-purple-500 text-purple-400"
                                                    : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-500"
                                            } ${
                                                isLoading
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            <FaRegNewspaper className="flex-shrink-0" />
                                            <span className="flex-shrink-0">
                                                Gönderiler
                                            </span>
                                            {!isLoading && (
                                                <span className="ml-1.5 sm:ml-2 text-xs bg-neutral-600 text-neutral-200 rounded-full px-2 py-0.5 flex-shrink-0">
                                                    {postResults.count}
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            onClick={() =>
                                                setActiveTab("users")
                                            }
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
                                                Kullanıcılar
                                            </span>
                                            {!isLoading && (
                                                <span className="ml-1.5 sm:ml-2 text-xs bg-neutral-600 text-neutral-200 rounded-full px-2 py-0.5 flex-shrink-0">
                                                    {userResults.length}
                                                </span>
                                            )}
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>

                        {(searchQuery || isLoading || error) && (
                            <div className=" ">
                                <div>
                                    {isLoading ? (
                                        <div className="text-center py-10">
                                            <p className="mt-2 text-neutral-400">
                                                Sonuçlar yükleniyor...
                                            </p>
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-10 text-red-400">
                                            <p>{error}</p>
                                        </div>
                                    ) : (
                                        <>
                                            {activeTab === "posts" && (
                                                <div>
                                                    {postResults.posts &&
                                                    postResults.posts.length >
                                                        0 ? (
                                                        <div className="space-y-4">
                                                            {postResults.posts.map(
                                                                (post) => (
                                                                    <PostCard
                                                                        key={
                                                                            post.id
                                                                        }
                                                                        postData={
                                                                            post
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        searchQuery && (
                                                            <div className="text-center py-8 md:py-10">
                                                                <div className="flex justify-center mb-3 md:mb-4">
                                                                    <FaSearchMinus className="text-5xl md:text-6xl text-neutral-600" />
                                                                </div>
                                                                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                                                    Gönderi
                                                                    Bulunamadı
                                                                </h3>
                                                                <p className="text-sm md:text-base text-neutral-400">
                                                                    "
                                                                    {
                                                                        searchQuery
                                                                    }
                                                                    " ile
                                                                    eşleşen
                                                                    gönderi
                                                                    bulunamadı.
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                            {activeTab === "users" && (
                                                <div>
                                                    {userResults.length > 0 ? (
                                                        <div className="space-y-3">
                                                            {userResults.map(
                                                                (user) => (
                                                                    <UserCard
                                                                        key={
                                                                            user.uid
                                                                        }
                                                                        user={
                                                                            user
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        searchQuery && (
                                                            <div className="text-center py-8 md:py-10">
                                                                <div className="flex justify-center mb-3 md:mb-4">
                                                                    <FaSearchMinus className="text-5xl md:text-6xl text-neutral-600" />
                                                                </div>
                                                                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                                                    Kullanıcı
                                                                    Bulunamadı
                                                                </h3>
                                                                <p className="text-sm md:text-base text-neutral-400">
                                                                    "
                                                                    {
                                                                        searchQuery
                                                                    }
                                                                    " ile
                                                                    eşleşen
                                                                    kullanıcı
                                                                    bulunamadı.
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {!searchQuery && !isLoading && !error && (
                            <div className="bg-neutral-800 p-4 md:p-6 rounded-lg text-center text-neutral-400">
                                Aramak istediğiniz kelimeyi yukarıdaki arama
                                çubuğuna yazın.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
