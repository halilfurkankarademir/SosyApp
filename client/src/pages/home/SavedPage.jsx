import React, { useEffect, useState } from "react";
import { Navbar, Sidebar } from "../../components/common";
import PostCard from "../../components/features/posts/PostCard";
import { BiBookmark } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { fakePosts } from "../../constants/fakeDatas";
import { useDebounce } from "use-debounce";

const SavedPage = () => {
    const [search, setSearch] = useState("");
    // Örnek olarak her 3. gönderiyi kaydedilmiş gösteriyoruz
    const [savedPosts, setSavedPosts] = useState(
        fakePosts.filter((_, i) => i % 3 === 0)
    );
    const [debouncedValue] = useDebounce(search, 300);

    const filteredPosts = savedPosts.filter((post) => {
        return (
            post.content.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            post.username.toLowerCase().includes(debouncedValue.toLowerCase())
        );
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Kaydettiklerim";
    }, []);

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                {/* Grid Layout */}
                <div className="page-grid-layout">
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
                                <div className="text-xs md:text-sm text-neutral-400">
                                    {filteredPosts.length} gönderi
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

                            {/* Sonuç yoksa */}
                            {filteredPosts.length === 0 && (
                                <div className="text-center py-8 md:py-10">
                                    <div className="flex justify-center mb-3 md:mb-4">
                                        <BiBookmark className="text-5xl md:text-6xl text-neutral-600" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                        Sonuç bulunamadı
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-400">
                                        Arama kriterlerinize uygun kaydedilmiş
                                        gönderi bulunamadı.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Kaydedilmiş Gönderiler Listesi */}
                        <div className="space-y-3 md:space-y-4">
                            {filteredPosts.map((post, index) => (
                                <PostCard key={index} postData={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SavedPage;
