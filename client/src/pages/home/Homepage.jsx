import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "../../components/common";
import { NewPost, PostCard } from "../../components/features/posts";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllPosts, removePost } from "../../api/postApi";
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
            setHasMore(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, []);

    const fakeFetch = async () => {
        console.log("Fetching more posts...");
    };

    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const onRemovePost = async (postId) => {
        try {
            setPosts(posts.filter((post) => post._id !== postId));
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
        fetchUser();
        fetchPosts();
    }, []);

    return (
        <>
            <div className="page-container md:py-36 md:px-6">
                {/* Responsive Grid Layout */}
                <div className="page-grid-layout-other">
                    {/* Sidebar - Mobilde gizli, md ve üzeri ekranlarda görünür */}
                    <Sidebar />
                    {/* Post ekleme ve goruntileme kismi */}
                    <div className="col-span-1 md:col-span-3 md:ml-72 w-full">
                        <NewPost onPostCreated={fetchPosts} />
                        <InfiniteScroll
                            dataLength={posts?.length}
                            hasMore={hasMore}
                            next={fakeFetch}
                            endMessage={
                                <p className="text-center text-white">
                                    Gönderilerin sonu.
                                </p>
                            }
                        >
                            {posts ? (
                                <div className="mt-4 space-y-4">
                                    {posts.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            postData={post}
                                            onPostRemove={onRemovePost}
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
                </div>
            </div>
        </>
    );
};

export default HomePage;
