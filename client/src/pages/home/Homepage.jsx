import React, { useEffect } from "react";
import { Sidebar } from "../../components/common";
import { fetchFeedPosts } from "../../api/postApi";
import { getCurrentUser } from "../../api/userApi";
import useUserStore from "../../hooks/useUserStore";
import RenderPosts from "../../components/features/posts/RenderPosts";

const HomePage = () => {
    const setUser = useUserStore((state) => state.setUser);

    // Aktif kullanıcının bilgilerini yukle
    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
        fetchUser();
    }, []);

    return (
        <>
            <div className="page-container md:py-36 md:px-6">
                <div className="page-grid-layout-other">
                    <Sidebar />
                    <div className="col-span-1 md:col-span-3 md:ml-72 w-full">
                        <RenderPosts
                            fetchOptions={fetchFeedPosts}
                            canCreatePost={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
