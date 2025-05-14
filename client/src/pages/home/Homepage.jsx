import React, { useEffect, useState } from "react";
import { Sidebar, SuggestionsCard } from "../../components/common";
import { fetchFeedPosts } from "../../api/postApi";
import { getCurrentUser, getRandomUsers } from "../../api/userApi";
import useUserStore from "../../hooks/useUserStore";
import RenderPosts from "../../components/features/posts/RenderPosts";

const HomePage = () => {
    const setUser = useUserStore((state) => state.setUser);
    const [suggestions, setSuggestions] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(true);
    const [isTablet, setIsTablet] = useState(
        window.innerWidth >= 768 && window.innerWidth < 1024
    );

    // Pencere boyutunu izle
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Aktif kullanıcının bilgilerini yukle
    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const getUserSuggestions = async () => {
        setIsSuggestionsLoading(true);
        try {
            const response = await getRandomUsers();
            setSuggestions(response);
        } catch (error) {
            console.error("Error fetching user suggestions:", error);
        } finally {
            setIsSuggestionsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
        fetchUser();
        getUserSuggestions();
    }, []);

    return (
        <div className="page-container pt-16 md:pt-24 md:py-24 md:px-6">
            <div className="page-grid-layout">
                {/* Sidebar - sadece masaüstünde görünür */}
                <div className="hidden md:block md:col-span-1">
                    <div className="md:sticky md:top-24">
                        <Sidebar />
                    </div>
                </div>

                {/* Ana içerik - tüm ekranlarda */}
                <div className="col-span-1 md:col-span-3 w-full pb-4">
                    <RenderPosts
                        fetchOptions={fetchFeedPosts}
                        canCreatePost={true}
                        activePage={"homepage"}
                    />
                </div>

                {/* Öneriler - sadece masaüstünde görünür */}
                <div className="hidden md:block md:col-span-1 w-full">
                    <div className="md:sticky md:top-24">
                        <SuggestionsCard
                            suggestions={suggestions}
                            loading={isSuggestionsLoading}
                            isCompact={isTablet}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
