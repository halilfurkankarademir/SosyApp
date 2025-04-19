import React, { useState, useEffect, useCallback } from "react";
import { Sidebar, Navbar, SuggestionsCard } from "../../components/common";
import { NewPost, PostCard } from "../../components/features/posts";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllPosts, removePost } from "../../api/postApi";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import { getCurrentUser } from "../../api/userApi";
import useUserStore from "../../hooks/useUserStore";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const setUser = useUserStore((state) => state.setUser);

    const fetchPosts = useCallback(async () => {
        try {
            const posts = await fetchAllPosts();
            setPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await removePost(postId);
            setPosts(posts.filter((post) => post._id !== postId));
            fetchPosts();
            ShowToast("success", "Gönderi başarıyla silindi");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // Ekran boyutunu izleme
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
        // Sayfa yuklendiğinde gönderileri cek
        fetchPosts();
        fetchUser();
    }, []);

    return (
        <>
            <Navbar />
            <div className="page-container md:py-36 md:px-6">
                {/* Responsive Grid Layout */}
                <div className="page-grid-layout">
                    {/* Sidebar - Mobilde gizli, md ve üzeri ekranlarda görünür */}
                    <Sidebar />
                    {/* Post ekleme ve goruntileme kismi */}
                    <div className="col-span-1 md:col-span-3 md:ml-72 w-full">
                        <NewPost onPostCreated={fetchPosts} />
                        <InfiniteScroll
                            dataLength={posts.length}
                            hasMore={hasMore}
                            // loader={
                            //     <div className="text-center text-white ">
                            //         Yükleniyor...
                            //     </div>
                            // }

                            endMessage={
                                <p>Yukarıdan kucultmek icin tiklayin</p>
                            }
                        >
                            {posts ? (
                                <div className="mt-4 space-y-4">
                                    {posts.map((post, index) => (
                                        <PostCard
                                            key={index}
                                            postData={post}
                                            handleRemove={deletePost}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-white ">
                                    Gönderi bulunamadı.
                                </div>
                            )}
                        </InfiniteScroll>
                    </div>
                    {/* <div className="md: ml-72 ">
                        <SuggestionsCard />
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default HomePage;
