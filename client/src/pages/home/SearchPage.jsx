import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import FriendsBar from "../../components/common/SuggestionsCard";
import { FaSearch, FaSearchMinus } from "react-icons/fa";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const query = searchParams.get("q");
        if (query) {
            setSearchQuery(query);
            document.title = query + " için sonuçlar";
        }
    }, [searchParams]);

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                {/* Grid Layout */}
                <div className="page-grid-layout">
                    {/* Sidebar - Mobilde gizli */}
                    <Sidebar />

                    {/* Arama ve Sonuclar Bölümü */}
                    <div className="md:col-span-3">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                                <div className="flex items-center mb-4 md:mb-0">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                        style={{ backgroundColor: "#995bff" }}
                                    >
                                        <FaSearch className="text-lg md:text-xl" />
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-semibold text-white">
                                        {searchQuery} için sonuçlar
                                    </h1>
                                </div>
                                <div className="text-xs md:text-sm text-neutral-400">
                                    {searchResults.length} sonuç
                                </div>
                            </div>

                            {/* Sonuç yoksa */}
                            {searchResults.length === 0 && (
                                <div className="text-center py-8 md:py-10">
                                    <div className="flex justify-center mb-3 md:mb-4">
                                        <FaSearchMinus className="text-5xl md:text-6xl text-neutral-600" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                        Sonuç bulunamadı
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-400">
                                        Arama kriterlerinize uygun sonuç
                                        bulunamadı.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
