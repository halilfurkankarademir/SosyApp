import React, { useState, useEffect } from "react";
import { Sidebar, Navbar } from "../../components/common";
import { NewPost, PostCard } from "../../components/features/posts";
import InfiniteScroll from "react-infinite-scroll-component";
import { fakePosts } from "../../constants/fakeDatas";

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

    const handleX = () => {};

    // Ekran boyutunu izleme
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
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
