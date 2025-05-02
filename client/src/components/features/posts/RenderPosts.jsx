import React, { useState, useEffect, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostCard, NewPost } from "./";
// React Icons'dan ikonları import edin
import { FiInbox, FiSearch } from "react-icons/fi"; // Veya başka setler: FaInbox, BiSearch vb.

const RenderPosts = ({ fetchOptions, canCreatePost, filters }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const loadInitialPosts = useCallback(async () => {
        setIsLoading(true);
        setPosts([]);
        setPage(1);
        setHasMore(true);
        try {
            const response = await fetchOptions(1);
            setPosts(response.posts);
            setTotalPostsCount(response.count);
            setPage(2);
            setHasMore(response.posts.length < response.count);
        } catch (error) {
            console.error("Error loading initial posts:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [fetchOptions]);

    const fetchMoreData = useCallback(async () => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        try {
            const response = await fetchOptions(page);
            const newPosts = response.posts;
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setTotalPostsCount(response.count);
            const currentTotalLoaded = posts.length + newPosts.length;
            setHasMore(currentTotalLoaded < response.count);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching more data:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [page, hasMore, posts.length, totalPostsCount, fetchOptions, isLoading]);

    const filteredPosts = useMemo(() => {
        if (!filters || filters.trim() === "") {
            return posts;
        }
        const searchTerm = filters.toLowerCase().trim();
        return posts.filter((post) => {
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
    }, [posts, filters]);

    const refreshPosts = useCallback(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    useEffect(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    // React Icons ile görselleştirilmiş içerik render fonksiyonu
    const renderContent = () => {
        // Hiç gönderi yoksa
        if (
            filteredPosts.length === 0 &&
            posts.length === 0 &&
            !hasMore &&
            !isLoading
        ) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12 px-4">
                    {/* React Icon kullanımı */}
                    <FiInbox
                        className="h-16 w-16 mb-4 text-gray-500"
                        aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-white">
                        Henüz Gönderi Yok
                    </h3>
                    <p className="text-sm">
                        Görünüşe göre buralar biraz sessiz.
                    </p>
                </div>
            );
        }

        // Filtreyle eşleşen sonuç yoksa
        if (filteredPosts.length === 0 && posts.length > 0 && !isLoading) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12 px-4">
                    {/* React Icon kullanımı */}
                    <FiSearch
                        className="h-16 w-16 mb-4 text-gray-500"
                        aria-hidden="true"
                    />
                    <h3 className="text-lg font-semibold text-white">
                        Eşleşen Gönderi Bulunamadı
                    </h3>
                    <p className="text-sm">
                        Farklı bir anahtar kelimeyle aramayı deneyin.
                    </p>
                </div>
            );
        }

        // Filtrelenmiş postları göster
        if (filteredPosts.length > 0) {
            return (
                <div className="space-y-4">
                    {filteredPosts.map((post, index) => (
                        <PostCard
                            key={post._id || post.id || index}
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
                dataLength={filteredPosts.length}
                next={fetchMoreData}
                // Filtre sonucu yoksa daha fazla yükleme tetikleme
                hasMore={
                    hasMore &&
                    !(
                        filteredPosts.length === 0 &&
                        posts.length > 0 &&
                        filters?.trim()
                    )
                }
                loader={
                    <h4 className="text-center text-white py-4">
                        Yükleniyor...
                    </h4>
                }
                endMessage={
                    !hasMore && filteredPosts.length > 0 ? (
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
