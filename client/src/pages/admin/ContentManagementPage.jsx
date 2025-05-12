import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    FiSearch,
    FiTrash2,
    FiEye,
    FiFilter,
    FiFileText,
    FiImage,
    FiHeart,
    FiMessageSquare,
} from "react-icons/fi";
import { deletePostForAdmin, getAllPostsForAdmin } from "../../api/adminApi";
import { dateFormatter } from "../../utils/helpers";
import { useNavigation } from "../../context/NavigationContext";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";

const ContentManagementPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [debouncedSearch] = useDebounce(searchTerm, 300);

    const { navigateToPage } = useNavigation();

    const loadInitialPosts = useCallback(async () => {
        setIsLoading(true);
        setPosts([]);
        setPage(1);
        setHasMore(true);
        setTotalPostsCount(0);
        try {
            const response = await getAllPostsForAdmin(1, debouncedSearch);
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
    }, [debouncedSearch]);

    const fetchMorePosts = useCallback(async () => {
        if (!hasMore || loading) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await getAllPostsForAdmin(page, debouncedSearch);
            const newPosts = response?.posts || [];
            const fetchedCount = response?.count ?? totalPostsCount;

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setTotalPostsCount(fetchedCount);

            const currentTotalLoaded = posts.length + newPosts.length;
            setHasMore(currentTotalLoaded < fetchedCount);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching more posts:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [
        page,
        hasMore,
        loading,
        debouncedSearch,
        posts.length,
        totalPostsCount,
    ]);

    const refreshPosts = useCallback(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadInitialPosts();
        }, 100);
        document.title = "Gönderi Yönetimi - Admin Panel";
        return () => clearTimeout(timer);
    }, [loadInitialPosts]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsLoading(true);
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
            try {
                await deletePostForAdmin(postId);
                refreshPosts();
                ShowToast("success", "Gönderi başarıyla silindi.");
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const renderPosts = () => {
        if (loading && posts.length === 0) {
            return (
                <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-neutral-400">Gönderiler yükleniyor...</p>
                </div>
            );
        }

        if (!loading && posts.length === 0) {
            return (
                <div className="p-8 text-center text-neutral-400">
                    Aranan kriterlere uygun gönderi bulunamadı.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-neutral-800 border border-neutral-700 rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={post.user.profilePicture}
                                    alt={post.user.username}
                                    className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                                />
                                <div>
                                    <p className="text-white font-medium">
                                        @{post.user.username}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        {dateFormatter(post.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <p className="text-neutral-300">{post.content}</p>
                        </div>

                        {post.media && (
                            <div className="mb-3 relative aspect-video rounded overflow-hidden bg-neutral-900">
                                <img
                                    src={post.media}
                                    alt="Gönderi medyası"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center text-neutral-400 text-sm">
                                    <FiHeart className="mr-1" />
                                    {post.likes?.length || 0}
                                </span>
                                <span className="flex items-center text-neutral-400 text-sm">
                                    <FiMessageSquare className="mr-1" />
                                    {post.comments?.length || 0}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="text-neutral-400 hover:text-blue-500 p-1"
                                    onClick={() =>
                                        navigateToPage(`/post/${post.id}`)
                                    }
                                    title="Gönderiyi Görüntüle"
                                >
                                    <FiEye />
                                </button>
                                <button
                                    className="text-neutral-400 hover:text-red-500 p-1"
                                    onClick={() => handleDeletePost(post.id)}
                                    title="Gönderiyi Sil"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FiFileText className="text-pink-500" />
                    Gönderi Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Gönderi ara..."
                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white pr-10 focus:outline-none focus:border-pink-500"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <FiSearch className="absolute right-3 top-2.5 text-neutral-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiFileText className="text-xl text-pink-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">Toplam</h3>
                            <p className="text-lg font-medium text-white">
                                {totalPostsCount}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiImage className="text-xl text-blue-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">
                                Medyalı
                            </h3>
                            <p className="text-lg font-medium text-white">
                                {
                                    posts.filter((post) => post.media !== null)
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiHeart className="text-xl text-red-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">Beğeni</h3>
                            <p className="text-lg font-medium text-white">
                                {posts.reduce(
                                    (acc, post) =>
                                        acc + (post.likes?.length || 0),
                                    0
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FiMessageSquare className="text-xl text-green-500" />
                        <div>
                            <h3 className="text-sm text-neutral-400">Yorum</h3>
                            <p className="text-lg font-medium text-white">
                                {posts.reduce(
                                    (acc, post) =>
                                        acc + (post.comments?.length || 0),
                                    0
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={
                    loading && posts.length > 0 ? (
                        <div className="p-4 text-center">
                            <div className="animate-spin w-6 h-6 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto"></div>
                        </div>
                    ) : null
                }
                endMessage={
                    !hasMore && posts.length > 0 ? (
                        <p className="text-center text-neutral-400 py-4">
                            Başka gönderi bulunmamaktadır.
                        </p>
                    ) : null
                }
            >
                {renderPosts()}
            </InfiniteScroll>
        </AdminLayout>
    );
};

export default ContentManagementPage;
