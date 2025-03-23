import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash"; // Lodash'ten debounce fonksiyonunu import edin
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { fakePosts } from "../../utils/constants";
import { GoHeartFill } from "react-icons/go";
import { FaHeartBroken, FaSearch } from "react-icons/fa";
import FriendsBar from "../../components/common/FriendsBar";
import PostCard from "../../components/features/posts/PostCard";

const FavoritesPage = () => {
    const [search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(
        fakePosts.filter((_, i) => i % 1 === 0)
    );

    // Debounce fonksiyonu oluşturma
    const handleSearch = useCallback(
        debounce((searchValue) => {
            const filtered = fakePosts.filter((post) => {
                return (
                    post.content
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    post.username
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                );
            });
            setFilteredPosts(filtered);
        }, 300), // 300ms gecikme ile arama yapiyoruz
        []
    );

    // Arama inputu değiştiğinde tetiklenen fonksiyon
    const onSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue); // Input değerini güncelle
        handleSearch(searchValue); // Debounce ile filtreleme işlemini tetikle
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Favorilerim";
    }, []);

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-24 md:py-36 px-4 md:px-0">
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

                    {/* Favoriler Bölümü */}
                    <div className="md:col-span-3">
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
                                    {filteredPosts.length} gönderi
                                </div>
                            </div>

                            {/* Arama */}
                            <div className="relative w-full mb-4 md:mb-6">
                                <input
                                    type="text"
                                    placeholder="Favoriler içinde ara..."
                                    value={search}
                                    onChange={onSearchChange} // Debounce ile bağlantılı fonksiyon
                                    className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </div>

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

export default FavoritesPage;
