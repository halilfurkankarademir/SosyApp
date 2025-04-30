import React, { useState, useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import { useParams } from "react-router-dom"; // useNavigate import edildi
import { FaArrowLeft } from "react-icons/fa";
import { fetchPostById } from "../../api/postApi"; // Sadece bu API kalsın
import { PostCard } from "../../components/features/posts";
import useUserStore from "../../hooks/useUserStore";
import { getCurrentUser } from "../../api/userApi";
import {
    createComment,
    deleteComment,
    getCommentsByPostId,
} from "../../api/commentApi";
import { getDateDiff } from "../../utils/helpers";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import { useNavigation } from "../../context/NavigationContext";

const PostPage = () => {
    const { postId } = useParams();
    const { navigateToPage } = useNavigation();
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const [post, setPost] = useState(null); // Gönderi verisi
    const [comment, setComment] = useState(""); // Yeni yorum input state'i
    const [comments, setComments] = useState([]); // Yorumlar (şimdilik lokal)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Mevcut Veri Çekme Fonksiyonunuz ---
    const fetchDatas = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const postData = await fetchPostById(postId);
            const currentUser = await getCurrentUser();
            const comments = await getCommentsByPostId(postId);
            if (!postData) {
                throw new Error("Gönderi bulunamadı.");
            }
            setComments(comments);
            setUser(currentUser);
            setPost(postData);
        } catch (error) {
            console.error("Error fetching post:", error);
            setError(error.message || "Gönderi yüklenirken bir hata oluştu.");
            document.title = "Hata";
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDatas();
    }, [postId]);

    // --- Mevcut Yorum Ekleme Fonksiyonunuz (Lokal State'i Günceller) ---
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const postIdInt = parseInt(postId);
            await createComment({
                postId: postIdInt,
                content: comment,
            });
            const updatedComments = await getCommentsByPostId(postId);
            setComments(updatedComments);
            setComment("");
            ShowToast("success", "Yorum başarıyla eklendi.");
        } catch (error) {
            console.log("Error adding comment:", error);
        }
    };

    // Yorum silme fonksiyonu
    const handleCommentRemove = async (commentId) => {
        try {
            await deleteComment(commentId);
            const updatedComments = await getCommentsByPostId(postId);
            setComments(updatedComments);
            ShowToast("success", "Yorum başarıyla silindi.");
        } catch (error) {
            console.log("Error removing comment:", error);
        }
    };

    // Yükleme Durumu
    if (isLoading) {
        return (
            <>
                <div className="page-container md:py-36 md:px-6 justify-center items-center">
                    <p className="text-white text-center">Yükleniyor...</p>
                </div>
            </>
        );
    }

    // Hata Durumu
    if (error) {
        return (
            <>
                <div className="page-container md:py-36 md:px-6 justify-center items-center">
                    <div className="text-center text-red-500">
                        <p>{error}</p>
                        <button
                            onClick={() => navigateToPage(-1)}
                            className="mt-4 px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600 transition text-white"
                        >
                            Geri Dön
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Gönderi bulunamadıysa
    if (!post) {
        return (
            <>
                <div className="page-container md:py-36 md:px-6 justify-center items-center">
                    <div className="text-center text-neutral-400">
                        <p>Gönderi bulunamadı veya silinmiş.</p>
                        <button
                            onClick={() => navigateToPage(-1)}
                            className="mt-4 px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600 transition text-white"
                        >
                            Geri Dön
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="page-container md:py-36 md:px-6">
                {/* Grid Layout */}
                <div className="page-grid-layout-large">
                    {/* Sidebar - Mobilde gizli */}
                    <Sidebar />

                    {/* Post detayları ve yorumlar */}
                    <div className="md:col-span-3 w-full space-y-4 md:ml-72">
                        {" "}
                        <button
                            onClick={() => navigateToPage(-1)}
                            className="flex items-center space-x-2 text-neutral-400 hover:text-pink-500 transition mb-4"
                        >
                            <FaArrowLeft />
                            <span>Geri Dön</span>
                        </button>
                        {post && <PostCard postData={post} />}
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white mt-4 md:mt-6">
                            {/* --- Yorum Ekleme Formu (Mevcut Fonksiyonla Çalışır) --- */}
                            <form
                                onSubmit={handleCommentSubmit}
                                className="mb-6"
                            >
                                <div className="flex items-start space-x-3">
                                    <img
                                        src={
                                            user?.profilePicture ||
                                            "https://via.placeholder.com/150/771796"
                                        } // Giriş yapmış kullanıcının resmi veya varsayılan
                                        alt="Profil"
                                        className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover mt-1"
                                    />
                                    <div className="flex-1">
                                        <textarea
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm placeholder-neutral-400"
                                            placeholder="Bir yorum ekle..."
                                            rows="3"
                                        ></textarea>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="submit"
                                                disabled={!comment.trim()}
                                                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Yorum Ekle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* --- Yorumlar Listesi  --- */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b border-neutral-700 pb-2 mb-4">
                                    Yorumlar ({comments.length})
                                </h3>
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="flex items-start space-x-3 py-3 border-b border-neutral-700 last:border-b-0 relative"
                                        >
                                            <img
                                                src={
                                                    comment.user.profilePicture
                                                } // Lokaldeki resim veya varsayılan
                                                alt="Profil"
                                                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover cursor-pointer"
                                                onClick={() =>
                                                    navigateToPage(
                                                        `profile/${comment.user.username}`
                                                    )
                                                }
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-baseline space-x-2 mb-1">
                                                    <span
                                                        className="font-semibold text-sm text-white cursor-pointer"
                                                        onClick={() =>
                                                            navigateToPage(
                                                                `profile/${comment.user.username}`
                                                            )
                                                        }
                                                    >
                                                        {comment.user.username}
                                                    </span>
                                                    <span className="text-xs text-neutral-400">
                                                        {getDateDiff(
                                                            comment.createdAt
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-neutral-300 whitespace-pre-wrap break-words">
                                                    {comment.content}
                                                </p>
                                            </div>
                                            {
                                                // Eger yorumu kullanici yaptiysa silme butonu goster
                                            }
                                            {comment.isOwner && (
                                                <button
                                                    className="absolute right-0 top-3 text-neutral-400 hover:text-red-500 transition"
                                                    onClick={() =>
                                                        handleCommentRemove(
                                                            comment.id
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-neutral-400 text-sm py-4">
                                        Henüz yorum yapılmamış. İlk yorumu sen
                                        yap!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
