import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostCard, NewPost } from "./";
import { FiGlobe, FiInbox } from "react-icons/fi";
import { useNavigation } from "../../../context/NavigationContext";
import {
    PostSkeletonList,
    PostCardSkeleton,
} from "../../../utils/SkeletonGenerator";

// filters prop'unu tekrar ekledik ve kullanacağız
const RenderPosts = ({ fetchOptions, canCreatePost, filters, activePage }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const { navigateToPage } = useNavigation();

    // loadInitialPosts, fetchOptions VE filters'a bağlı olmalı
    const loadInitialPosts = useCallback(async () => {
        setIsLoading(true);
        setInitialLoading(true);
        setPosts([]);
        setPage(1);
        setHasMore(true);
        setTotalPostsCount(0);
        try {
            // fetchOptions'a page ve filters'ı geçiyoruz
            const response = await fetchOptions(1, filters); // filters'ı burada kullan
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
            setInitialLoading(false);
        }
    }, [fetchOptions, filters]);

    // fetchMoreData da fetchOptions VE filters'a bağlı olmalı
    const fetchMoreData = useCallback(async () => {
        if (!hasMore || isLoading) {
            return;
        }

        setIsLoading(true);
        try {
            // fetchOptions'a page ve filters'ı geçiyoruz
            const response = await fetchOptions(page, filters); // filters'ı burada kullan
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
    }, [
        page,
        hasMore,
        isLoading,
        fetchOptions,
        filters,
        posts.length,
        totalPostsCount,
    ]);

    const refreshPosts = useCallback(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    useEffect(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    const renderContent = () => {
        // İlk yükleme sırasında skeleton göster
        if (initialLoading) {
            return <PostSkeletonList count={3} />;
        }

        // Veri yok ve yükleme tamamlandı
        if (!isLoading && posts.length === 0 && !hasMore) {
            if (activePage === "homepage") {
                return (
                    <div className="flex flex-col items-center justify-center text-center text-gray-300 py-12 px-4">
                        <FiGlobe
                            className="h-16 w-16 mb-4 text-pink-400 animate-pulse"
                            aria-hidden="true"
                        />
                        <h3 className="text-lg font-semibold text-white mb-1">
                            Keşfedilecek Yeni Dünyalar Seni Bekliyor!
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 max-w-sm">
                            Görünüşe göre buralarda henüz yeni gönderiler
                            filizlenmemiş. Ama endişelenme, macera dolu
                            içerikler bir tık uzağında!
                        </p>
                        <button
                            className="mt-3 py-2 px-5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                            onClick={() => navigateToPage("/explore")}
                        >
                            Hemen Keşfetmeye Başla
                        </button>
                    </div>
                );
            } else {
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
                            Aradığınız kriterlere uygun gönderi bulunamadı.
                        </p>
                    </div>
                );
            }
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
                    !initialLoading && (
                        <div className="mt-4">
                            <PostCardSkeleton />
                        </div>
                    )
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
