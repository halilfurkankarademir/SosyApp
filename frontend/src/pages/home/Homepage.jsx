import React, { useState, useEffect } from "react";
import { Sidebar, Navbar, FriendsBar } from "../../components/common";
import { NewPost, PostCard } from "../../components/features/posts";
import { fakePosts } from "../../utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
    const [posts, setPosts] = useState(fakePosts);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = () => {
        // Simüle edilmiş API çağrısı
        setTimeout(() => {
            const newPosts = [...posts, ...fakePosts]; // Yeni gönderiler ekleyin
            setPosts(newPosts);
            setHasMore(newPosts.length < 100); // Örnek: 100 gönderi sınırı
        }, 2000); // 2 sn gecikme
    };

    // Ekran boyutunu izleme
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 pt-20 pb-16 px-4 md:py-36 md:px-6">
                {/* Responsive Grid Layout */}
                <div
                    className="w-full grid grid-cols-1 md:grid-cols-4 gap-6"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar - Mobilde gizli, md ve üzeri ekranlarda görünür */}
                    <div className="hidden md:block md:col-span-1">
                        <Sidebar />
                        <div className="mt-4">
                            <FriendsBar />
                        </div>
                    </div>

                    {/* Post ekleme ve goruntileme kismi */}
                    <div className="col-span-1 md:col-span-3">
                        <NewPost />
                        <InfiniteScroll
                            dataLength={posts.length}
                            hasMore={hasMore}
                            loader={
                                <div className="text-center text-white ">
                                    Yükleniyor...
                                </div>
                            }
                            next={loadMoreData}
                            endMessage={
                                <p>Yukarıdan kucultmek icin tiklayin</p>
                            }
                        >
                            <div className="mt-4 space-y-4">
                                {posts.map((post, index) => (
                                    <PostCard key={index} postData={post} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
