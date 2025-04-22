import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import {
    FaSearch,
    FaSearchMinus,
    FaUserFriends,
    FaRegNewspaper,
} from "react-icons/fa";
import { searchPosts, searchUsers } from "../../api/searchApi";
import PostCard from "../../components/features/posts/PostCard";
import UserCard from "../../components/ui/cards/UserCard";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("posts");
    const [postResults, setPostResults] = useState([]);
    const [userResults, setUserResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchFunction = async (query) => {
        if (!query) {
            setPostResults([]);
            setUserResults([]);
            setError(null);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const [posts, users] = await Promise.all([
                searchPosts(query),
                searchUsers(query),
            ]);
            setPostResults(Array.isArray(posts) ? posts : []);
            setUserResults(Array.isArray(users) ? users : []);
        } catch (err) {
            console.error("Error searching:", err);
            setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            setPostResults([]);
            setUserResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const query = searchParams.get("q");
        setSearchQuery(query || "");
        searchFunction(query);
        document.title = query ? `${query} için sonuçlar` : "Arama";
    }, [searchParams]);

    const getResultsCountForActiveTab = () => {
        if (activeTab === "posts") {
            return postResults.length;
        } else if (activeTab === "users") {
            return userResults.length;
        }
        return 0;
    };

    return (
        <>
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                <div className="page-grid-layout-other">
                    <Sidebar />

                    <div className="md:col-span-3 md:ml-72 w-full">
                        {/* --- CARD 1: Search Header & Tabs --- */}
                        <div className="bg-neutral-800 rounded-lg mb-4 md:mb-6">
                            {" "}
                            {/* Removed padding temporarily */}
                            {/* Top Header Part */}
                            <div className="p-4 md:p-6">
                                {" "}
                                {/* Added padding here */}
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
                                    <div className="text-xs md:text-sm text-neutral-400 flex-shrink-0">
                                        {!isLoading &&
                                            !error &&
                                            searchQuery && ( // Only show count if there's a query
                                                <>
                                                    {getResultsCountForActiveTab()}{" "}
                                                    sonuç (
                                                    {activeTab === "posts"
                                                        ? "Gönderiler"
                                                        : "Kullanıcılar"}
                                                    )
                                                </>
                                            )}
                                        {/* Keep loading/error indicators potentially */}
                                        {/* {isLoading && <span>Yükleniyor...</span>} */}
                                        {/* {error && <span className="text-red-500">Hata</span>} */}
                                    </div>
                                </div>
                            </div>
                            {/* Tab Navigation Part (only if query exists or loading) */}
                            {/* Show tabs only if there's a query or loading/error state requires the result area */}
                            {(searchQuery || isLoading || error) && (
                                <div className="px-4 md:px-6">
                                    {" "}
                                    {/* Add padding for tabs */}
                                    <nav className="flex space-x-1 sm:space-x-4 border-b border-neutral-700">
                                        {" "}
                                        {/* Keep border here */}
                                        {/* Gönderiler Tab */}
                                        <button
                                            onClick={() =>
                                                setActiveTab("posts")
                                            }
                                            disabled={isLoading}
                                            className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                                // Adjusted padding/margin for border alignment
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
                                                    {postResults.length}
                                                </span>
                                            )}
                                        </button>
                                        {/* Kullanıcılar Tab */}
                                        <button
                                            onClick={() =>
                                                setActiveTab("users")
                                            }
                                            disabled={isLoading}
                                            className={`flex items-center space-x-1.5 sm:space-x-2 pb-3 pt-1 px-1 sm:px-2 -mb-px text-sm font-medium border-b-2 focus:outline-none transition-colors duration-150 ${
                                                // Adjusted padding/margin for border alignment
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
                        {/* --- END CARD 1 --- */}

                        {/* --- CARD 2: Results Content --- */}
                        {/* Show this card only if there's a query or if still loading/error */}
                        {(searchQuery || isLoading || error) && (
                            <div className=" ">
                                {/* Results Content Area */}
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
                                            {/* Gönderiler İçeriği */}
                                            {activeTab === "posts" && (
                                                <div>
                                                    {postResults.length > 0 ? (
                                                        <div className="space-y-4">
                                                            {postResults.map(
                                                                (post) => (
                                                                    <PostCard
                                                                        key={
                                                                            post.pid ||
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
                                                        searchQuery && ( // Only show "not found" if a search was actually made
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

                                            {/* Kullanıcılar İçeriği */}
                                            {activeTab === "users" && (
                                                <div>
                                                    {userResults.length > 0 ? (
                                                        <div className="space-y-3">
                                                            {userResults.map(
                                                                (user) => (
                                                                    <UserCard
                                                                        key={
                                                                            user.uid ||
                                                                            user.id
                                                                        }
                                                                        user={
                                                                            user
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        searchQuery && ( // Only show "not found" if a search was actually made
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
                                {/* End Results Content Area */}
                            </div>
                        )}
                        {/* --- END CARD 2 --- */}

                        {/* Optional: Message when no search query is entered */}
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
