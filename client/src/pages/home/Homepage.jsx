import React, { useEffect, useState } from "react";
import { Sidebar, SuggestionsCard } from "../../components/common";
import { fetchFeedPosts } from "../../api/postApi";
import { getCurrentUser, getRandomUsers } from "../../api/userApi";
import useUserStore from "../../hooks/useUserStore";
import RenderPosts from "../../components/features/posts/RenderPosts";

const HomePage = () => {
    const setUser = useUserStore((state) => state.setUser);
    const [suggestions, setSuggestions] = useState([]);

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
        try {
            const response = await getRandomUsers();
            setSuggestions(response);
        } catch (error) {
            console.error("Error fetching user suggestions:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
        fetchUser();
        getUserSuggestions();
    }, []);

    return (
        <>
            <div className="page-container md:py-24 md:px-6">
                <div className="page-grid-layout">
                    <Sidebar />
                    <div className="col-span-1 md:col-span-3 md:ml-72 w-full">
                        <RenderPosts
                            fetchOptions={fetchFeedPosts}
                            canCreatePost={true}
                            activePage={"homepage"}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-1 md:ml-72 w-full">
                        <SuggestionsCard suggestions={suggestions} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
