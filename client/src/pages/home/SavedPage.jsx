import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/common";
import PostCard from "../../components/features/posts/PostCard";
import { BiBookmark } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import { getSavedPosts } from "../../api/savedApi";
import useUserStore from "../../hooks/useUserStore";
import { getCurrentUser } from "../../api/userApi";
import RenderPosts from "../../components/features/posts/RenderPosts";

const SavedPage = () => {
    const [search, setSearch] = useState("");
    // Örnek olarak her 3. gönderiyi kaydedilmiş gösteriyoruz
    const [debouncedValue] = useDebounce(search, 300);

    const setUser = useUserStore((state) => state.setUser);

    const fetchDatas = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error("Error fetching saved posts:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Kaydettiklerim";
        fetchDatas();
    }, []);

    return (
        <>
            <div className="page-container py-24  px-4 md:px-0">
                {/* Grid Layout */}
                <div className="page-grid-layout-large">
                    {/* Sidebar - Mobilde gizli */}
                    <Sidebar />

                    {/* Kaydedilmiş Gönderiler Bölümü */}
                    <div className="md:col-span-3 md:ml-72 w-full">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                                <div className="flex items-center mb-4 md:mb-0">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                        style={{ backgroundColor: "#30c454" }}
                                    >
                                        <BiBookmark className="text-lg md:text-xl" />
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-semibold text-white">
                                        Kaydettiklerim
                                    </h1>
                                </div>
                            </div>

                            {/* Arama */}
                            <div className="relative w-full mb-4 md:mb-6">
                                <input
                                    type="text"
                                    placeholder="Kaydedilenler içinde ara..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </div>
                        </div>

                        {/* Kaydedilmiş Gönderiler Listesi */}
                        <RenderPosts
                            fetchOptions={getSavedPosts}
                            canCreatePost={false}
                            filters={debouncedValue}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SavedPage;
