import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostCard, NewPost } from "./";
import { FiInbox } from "react-icons/fi";

// filters prop'unu tekrar ekledik ve kullanacağız
const RenderPosts = ({ fetchOptions, canCreatePost, filters }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // loadInitialPosts, fetchOptions VE filters'a bağlı olmalı
    const loadInitialPosts = useCallback(async () => {
        console.log(`Loading initial posts with filter: "${filters}"`); // Filtreyi logla
        setIsLoading(true);
        setPosts([]);
        setPage(1);
        setHasMore(true);
        setTotalPostsCount(0);
        try {
            // fetchOptions'a page ve filters'ı geçiyoruz
            const response = await fetchOptions(1, filters); // filters'ı burada kullan
            console.log("Initial posts response:", response);
            // Gelen verinin beklenen formatta olduğundan emin olalım
            const fetchedPosts = response?.posts || [];
            const fetchedCount = response?.count ?? 0;
            setPosts(fetchedPosts);
            setTotalPostsCount(fetchedCount);
            setPage(2);
            setHasMore(fetchedPosts.length < fetchedCount);
        } catch (error) {
            console.error("Error loading initial posts:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
        // Bağımlılıklar: fetchOptions veya filters değiştiğinde bu fonksiyon yeniden oluşturulur.
    }, [fetchOptions, filters]); // <<<--- filters'ı buraya ekledik!

    // fetchMoreData da fetchOptions VE filters'a bağlı olmalı
    const fetchMoreData = useCallback(async () => {
        if (!hasMore || isLoading) {
            console.log("Fetch more aborted:", { hasMore, isLoading });
            return;
        }

        console.log(
            `Fetching more data for page ${page} with filter: "${filters}"`
        ); // Filtreyi logla
        setIsLoading(true);
        try {
            // fetchOptions'a page ve filters'ı geçiyoruz
            const response = await fetchOptions(page, filters); // filters'ı burada kullan
            console.log("More posts response:", response);
            // Gelen verinin beklenen formatta olduğundan emin olalım
            const newPosts = response?.posts || [];
            const fetchedCount = response?.count ?? totalPostsCount; // Count değişmemiş olabilir, önceki değeri koru

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setTotalPostsCount(fetchedCount); // Gelen count ile güncelle (eğer varsa)

            const currentTotalLoaded = posts.length + newPosts.length;
            setHasMore(currentTotalLoaded < fetchedCount);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching more data:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
        // Bağımlılıklar: fetchOptions veya filters değiştiğinde bu fonksiyon da yeniden oluşturulur.
        // page, hasMore, isLoading gibi durumlar değiştiğinde de yeniden oluşturulur.
    }, [
        page,
        hasMore,
        isLoading,
        fetchOptions,
        filters,
        posts.length,
        totalPostsCount,
    ]); // <<<--- filters'ı buraya ekledik!

    // Refresh fonksiyonu loadInitialPosts'a bağlı kalmalı
    const refreshPosts = useCallback(() => {
        console.log("Refreshing posts...");
        loadInitialPosts();
    }, [loadInitialPosts]);

    // İlk yükleme ve filtre/fetchOptions değişimi için useEffect
    // Artık sadece loadInitialPosts'a bağımlı olması yeterli, çünkü o zaten filters ve fetchOptions'a bağlı.
    useEffect(() => {
        loadInitialPosts();
    }, [loadInitialPosts]); // <<<--- filters'ı buradan kaldırdık, çünkü loadInitialPosts zaten ona bağlı.

    // Geri kalanı aynı...
    const renderContent = () => {
        if (!isLoading && posts.length === 0 && !hasMore) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12 px-4">
                    <FiInbox
                        className="h-16 w-16 mb-4 text-gray-500"
                        aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-white">
                        Gönderi Bulunamadı
                    </h3>
                    <p className="text-sm">
                        Görünüşe göre buralar biraz sessiz veya aramanızla
                        eşleşen sonuç yok.
                    </p>
                </div>
            );
        }

        if (posts.length > 0) {
            return (
                <div className="space-y-4">
                    {posts.map((post, index) => (
                        <PostCard
                            key={post._id || post.id || `post-${index}`}
                            postData={post}
                            onPostRemove={refreshPosts}
                        />
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="mt-4 md:mt-0">
            {canCreatePost && <NewPost onPostCreated={refreshPosts} />}

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <h4 className="text-center text-white py-4">
                        Yükleniyor...
                    </h4>
                }
                endMessage={
                    !hasMore && posts.length > 0 ? (
                        <p className="text-center text-white py-4 font-light">
                            Başka gönderi yok.
                        </p>
                    ) : null
                }
            >
                {renderContent()}
            </InfiniteScroll>
        </div>
    );
};

export default RenderPosts;
