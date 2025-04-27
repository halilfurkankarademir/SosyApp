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
import RenderPosts from "../../components/features/posts/RenderPosts";

const FavoritesPage = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);

    const setUser = useUserStore((state) => state.setUser);

    const fetchDatas = async () => {
        {
            try {
                const currentUser = await getCurrentUser();
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
                            </div>

                            {/* Arama */}
                            <LargeSearchInput
                                search={search}
                                setSearch={setSearch}
                                placeholderText="Favoriler içinde ara..."
                            />
                        </div>

                        {/* Favori Gönderiler Listesi */}
                        <RenderPosts
                            fetchOptions={getLikesByUserId}
                            canCreatePost={false}
                            filters={debouncedSearch}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritesPage;
