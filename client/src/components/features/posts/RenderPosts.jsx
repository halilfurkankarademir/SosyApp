import React, { useState, useEffect, useCallback, useMemo } from "react"; // useMemo eklendi
import InfiniteScroll from "react-infinite-scroll-component";
import { PostCard, NewPost } from "./";

const RenderPosts = ({
    fetchOptions,
    canCreatePost,
    filters /* Yeni prop */,
}) => {
    const [posts, setPosts] = useState([]); // Tüm yüklenen postlar
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Yüklenme durumu ekleyelim

    // İlk gönderileri yükle (veya filtre değiştiğinde/refresh yapıldığında)
    const loadInitialPosts = useCallback(async () => {
        setIsLoading(true);
        setPosts([]); // Yenileme sırasında mevcut postları temizle
        setPage(1); // Sayfayı başa al
        setHasMore(true); // Daha fazla post olabileceğini varsay
        console.log("Loading initial posts or refreshing...");
        try {
            const response = await fetchOptions(1); // Her zaman 1. sayfayı çek
            console.log(response);
            setPosts(response.posts);
            setTotalPostsCount(response.count);
            setPage(2); // Bir sonraki sayfa için hazırla
            setHasMore(response.posts.length < response.count);
            console.log(
                `Initial load/Reload: ${response.posts.length} posts, total: ${
                    response.count
                }, hasMore: ${response.posts.length < response.count}`
            );
        } catch (error) {
            console.error("Error fetching initial posts:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [fetchOptions]); // fetchOptions değişirse yeniden oluşturulsun

    // Daha fazla gönderi çek
    const fetchMoreData = useCallback(async () => {
        if (!hasMore || isLoading) return; // Zaten yükleniyorsa veya daha fazla yoksa dur

        console.log(`Fetching more posts (page ${page})...`);
        setIsLoading(true);
        try {
            const response = await fetchOptions(page);
            const newPosts = response.posts;
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setTotalPostsCount(response.count);
            const currentTotalLoaded = posts.length + newPosts.length;
            setHasMore(currentTotalLoaded < response.count);
            setPage((prevPage) => prevPage + 1);
            console.log(
                `Fetched page ${page}: ${
                    newPosts.length
                } posts. New total loaded: ${currentTotalLoaded}, hasMore: ${
                    currentTotalLoaded < response.count
                }`
            );
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
            setHasMore(false); // Hata durumunda durdur
        } finally {
            setIsLoading(false);
        }
    }, [page, hasMore, posts.length, totalPostsCount, fetchOptions, isLoading]); // Bağımlılıklara isLoading ve fetchOptions eklendi

    // Filtreleme işlemi için useMemo kullanımı
    // Sadece 'posts' veya 'filters' değiştiğinde yeniden hesaplanır
    const filteredPosts = useMemo(() => {
        // Eğer filtre boş veya tanımsızsa, tüm postları dön
        if (!filters || filters.trim() === "") {
            return posts;
        }

        const searchTerm = filters.toLowerCase().trim();

        // Sağlanan filtreleme mantığını uygula
        return posts.filter((post) => {
            // post objesinin ve user objesinin varlığını kontrol etmek iyi bir pratik olabilir
            const postData = post;
            const userData = postData?.user;

            const contentMatch = postData?.content
                ?.toLowerCase()
                .includes(searchTerm);
            const usernameMatch = userData?.username
                ?.toLowerCase()
                .includes(searchTerm);
            const firstNameMatch = userData?.firstName
                ?.toLowerCase()
                .includes(searchTerm);
            const lastNameMatch = userData?.lastName
                ?.toLowerCase()
                .includes(searchTerm);

            return (
                contentMatch || usernameMatch || firstNameMatch || lastNameMatch
            );
        });
    }, [posts, filters]); // posts veya filters değiştiğinde tetiklenir

    // Yenileme fonksiyonu
    const refreshPosts = () => {
        loadInitialPosts();
    };

    // Bileşen yüklendiğinde ilk veriyi çek
    useEffect(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    // Yüklenme durumunu ve mesajları yönet
    const renderContent = () => {
        // Filtreleme sonucu boşsa ve hiç post yüklenmemişse (ve daha fazla yoksa)
        if (filteredPosts.length === 0 && posts.length === 0 && !hasMore) {
            return (
                <div className="text-center text-white py-4">
                    Gönderi bulunamadı.
                </div>
            );
        }

        // Filtreleme sonucu boşsa ama postlar yüklenmişse
        if (filteredPosts.length === 0 && posts.length > 0) {
            return (
                <div className="text-center text-white py-4">
                    Filtrenizle eşleşen gönderi bulunamadı.
                </div>
            );
        }

        // Filtrelenmiş postları göster
        return (
            <div className="space-y-4">
                {filteredPosts.map((post, index) => (
                    <PostCard
                        // key için post'un benzersiz bir ID'sini kullanmak daha iyidir (varsa)
                        key={post._id || post.id || index}
                        postData={post}
                        onPostRemove={refreshPosts} // Refresh daha mantıklı olabilir
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            {canCreatePost && <NewPost onPostCreated={refreshPosts} />}

            <InfiniteScroll
                dataLength={filteredPosts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <h4 className="text-center text-white py-4">
                        Yükleniyor...
                    </h4>
                }
                endMessage={
                    filteredPosts.length > 0 ? (
                        <p className="text-center text-white py-4 font-light">
                            <b>Başka gönderi yok.</b>
                        </p>
                    ) : null // Filtre sonucu yoksa veya hiç post yoksa endMessage gösterme
                }
                // ScrollableTarget belirtmek gerekebilir (eğer ana pencere scroll olmuyorsa)
                // scrollableTarget="scrollableDivId"
            >
                {renderContent()}
            </InfiniteScroll>
        </div>
    );
};

export default RenderPosts;
