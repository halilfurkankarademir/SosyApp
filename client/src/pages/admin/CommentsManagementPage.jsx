import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { FiSearch, FiTrash2, FiEye, FiMessageSquare } from "react-icons/fi";
import {
    deleteCommentForAdmin,
    getAllCommentsForAdmin,
} from "../../api/adminApi";
import { dateFormatter } from "../../utils/helpers";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import { useNavigation } from "../../context/NavigationContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "use-debounce";

const CommentsManagementPage = () => {
    const [comments, setComments] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalCommentsCount, setTotalCommentsCount] = useState(0);
    const [debouncedSearch] = useDebounce(searchTerm, 300);

    const { navigateToPage } = useNavigation();

    const loadInitialComments = useCallback(async () => {
        setIsLoading(true);
        setComments([]);
        setPage(1);
        setHasMore(true);
        setTotalCommentsCount(0);
        try {
            const response = await getAllCommentsForAdmin(1, debouncedSearch);
            const fetchedComments = response?.comments || [];
            const fetchedCount = response?.count ?? 0;
            setComments(fetchedComments);
            setTotalCommentsCount(fetchedCount);
            setPage(2);
            setHasMore(fetchedComments.length < fetchedCount);
        } catch (error) {
            console.error("Error loading initial comments:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch]);

    const fetchMoreComments = useCallback(async () => {
        if (!hasMore || loading) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await getAllCommentsForAdmin(
                page,
                debouncedSearch
            );
            const newComments = response?.comments || [];
            const fetchedCount = response?.count ?? totalCommentsCount;

            setComments((prevComments) => [...prevComments, ...newComments]);
            setTotalCommentsCount(fetchedCount);

            const currentTotalLoaded = comments.length + newComments.length;
            setHasMore(currentTotalLoaded < fetchedCount);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching more comments:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [
        page,
        hasMore,
        loading,
        debouncedSearch,
        comments.length,
        totalCommentsCount,
    ]);

    const refreshComments = useCallback(() => {
        loadInitialComments();
    }, [loadInitialComments]);

    const deleteComment = async (commentId) => {
        if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
            try {
                await deleteCommentForAdmin(commentId);
                refreshComments();
                ShowToast("success", "Yorum başarıyla silindi");
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    useEffect(() => {
        loadInitialComments();
        document.title = "Yorum Yönetimi - Admin Panel";
    }, [loadInitialComments]);

    const renderComments = () => {
        if (loading && comments.length === 0) {
            return (
                <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-pink-500 rounded-full mx-auto mb-4"></div>
                    <p className="text-neutral-400">Yorumlar yükleniyor...</p>
                </div>
            );
        }

        if (!loading && comments.length === 0) {
            return (
                <div className="p-8 text-center text-neutral-400">
                    Aranan kriterlere uygun yorum bulunamadı.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-4">
                {comments.map((comment, index) => (
                    <div
                        key={comment.id || index}
                        className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden hover:border-neutral-600 transition-colors"
                    >
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={comment.user.profilePicture}
                                        alt=""
                                        className="w-10 h-10 rounded-full object-cover border-2 border-neutral-700"
                                    />
                                    <div>
                                        <p className="text-white font-medium flex items-center gap-2">
                                            @{comment.user.username}
                                            {comment.user.isVerified && (
                                                <span className="text-blue-500">
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                    </svg>
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-neutral-400">
                                            {comment.user.firstName}{" "}
                                            {comment.user.lastName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400 hover:text-blue-500"
                                        title="Gönderiyi Görüntüle"
                                        onClick={() =>
                                            navigateToPage(
                                                `/post/${comment.postId}`
                                            )
                                        }
                                    >
                                        <FiEye />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400 hover:text-red-500"
                                        title="Yorumu Sil"
                                        onClick={() =>
                                            deleteComment(comment.id)
                                        }
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-neutral-300 text-sm">
                                    {comment.content}
                                </p>
                                <span className="text-xs text-neutral-500 mt-2 block">
                                    {dateFormatter(comment.createdAt)}
                                </span>
                            </div>

                            <div className="bg-neutral-900 rounded-lg overflow-hidden">
                                <div className="p-3 border-b border-neutral-800">
                                    <div className="flex items-center gap-2 mb-2">
                                        <img
                                            src={
                                                comment.post.user.profilePicture
                                            }
                                            alt=""
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className="text-sm text-white">
                                            @{comment.post.user.username}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-300 line-clamp-2">
                                        {comment.post.content}
                                    </p>
                                </div>
                                {comment.post.media && (
                                    <img
                                        src={comment.post.media}
                                        alt=""
                                        className="w-full h-48 object-cover"
                                    />
                                )}
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
                    <FiMessageSquare className="text-pink-500" />
                    Yorum Yönetimi
                </h1>

                <div className="flex gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Yorum ara..."
                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white pr-10 focus:outline-none focus:border-pink-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute right-3 top-2.5 text-neutral-500" />
                    </div>
                </div>
            </div>

            <InfiniteScroll
                dataLength={comments.length}
                next={fetchMoreComments}
                hasMore={hasMore}
                endMessage={
                    !hasMore && comments.length > 0 ? (
                        <p className="text-center text-neutral-400 py-4">
                            Başka yorum bulunmamaktadır.
                        </p>
                    ) : null
                }
            >
                {renderComments()}
            </InfiniteScroll>
        </AdminLayout>
    );
};

export default CommentsManagementPage;
