import React, { useState, useEffect, useMemo } from "react";
import { GoHeartFill } from "react-icons/go";
import { FaHeartBroken } from "react-icons/fa";
import PostCard from "../../components/features/posts/PostCard";
import LargeSearchInput from "../../components/ui/inputs/LargeSearchInput";
import { useDebounce } from "use-debounce";
import { getLikesByUserId } from "../../api/likeApi";
import { Sidebar } from "../../components/common";
import useUserStore from "../../hooks/useUserStore";
import { getCurrentUser } from "../../api/userApi";

const FavoritesPage = () => {
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [debouncedSearch] = useDebounce(search, 300);

    const setUser = useUserStore((state) => state.setUser);

    const filteredPosts = favorites.filter((post) => {
        const postData = post;
        return (
            postData.content
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim()) ||
            postData.user.username
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim()) ||
            postData.user.firstName
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim()) ||
            postData.user.lastName
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase().trim())
        );
    });

    const fetchDatas = async () => {
        {
            try {
                const fetchedFavorites = await getLikesByUserId();
                const currentUser = await getCurrentUser();
                setFavorites(fetchedFavorites);
                setUser(currentUser);
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Favorilerim";
        fetchDatas();
    }, []);

    return (
        <>
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                <div className="page-grid-layout-other">
                    {/* Sidebar - Mobilde gizli */}
                    <Sidebar />

                    {/* Favoriler Bölümü */}
                    <div className="md:col-span-3 md:ml-72 w-full">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                                <div className="flex items-center mb-4 md:mb-0">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                        style={{ backgroundColor: "#fe4d4d" }}
                                    >
                                        <GoHeartFill className="text-lg md:text-xl" />
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-semibold text-white">
                                        Favorilerim
                                    </h1>
                                </div>
                                <div className="text-xs md:text-sm text-neutral-400">
                                    0 gönderi
                                </div>
                            </div>

                            {/* Arama */}
                            <LargeSearchInput
                                search={search}
                                setSearch={setSearch}
                                placeholderText="Favoriler içinde ara..."
                            />

                            {/* Sonuç yoksa */}
                            {filteredPosts.length === 0 && (
                                <div className="text-center py-8 md:py-10">
                                    <div className="flex justify-center mb-3 md:mb-4">
                                        <FaHeartBroken className="text-5xl md:text-6xl text-neutral-600" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                        Sonuç bulunamadı
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-400">
                                        Arama kriterlerinize uygun favori
                                        gönderi bulunamadı.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Favori Gönderiler Listesi */}
                        {favorites && (
                            <div className="space-y-3 md:space-y-4">
                                {filteredPosts.map((post, index) => {
                                    return (
                                        <PostCard key={index} postData={post} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritesPage;
