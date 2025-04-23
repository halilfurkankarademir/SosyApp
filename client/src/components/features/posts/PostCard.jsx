import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    FaHeart,
    FaComment,
    FaShare,
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigation } from "../../../context/NavigationContext";
import { getDateDiff } from "../../../utils/helpers";
import { ShowToast } from "../../ui/toasts/ShowToast";
import {
    addLikePost,
    getAllLikes,
    removeLikeFromPost,
} from "../../../api/likeApi";
import { isPostSaved, savePost, unsavePost } from "../../../api/savedApi";
import { getCommentCount } from "../../../api/commentApi";
import { getCurrentUser } from "../../../api/userApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useLikeStatus from "../../../hooks/useLikeStatus";
import { MdDelete, MdOutlineReport } from "react-icons/md";
import { removePost } from "../../../api/postApi";

const PostCard = ({ postData, onPostRemove }) => {
    const { id, user, content, media, createdAt } = postData || {};
    const postDate = getDateDiff(createdAt);

    const { navigateToPage } = useNavigation();
    const moreMenuRef = useRef(null);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
    const { isLiked, setIsLiked } = useLikeStatus(id);

    const fetchPostStats = useCallback(async () => {
        if (!id) return;
        try {
            const [likesResponse, commentsResponse, savedStatus] =
                await Promise.all([
                    getAllLikes(id),
                    getCommentCount(id),
                    isPostSaved(id),
                ]);
            setLikeCount(likesResponse?.data?.length || 0);
            setCommentCount(commentsResponse || 0);
            setIsSaved(savedStatus || false);
        } catch (error) {
            console.error(
                "Error fetching post stats for post ID",
                id,
                ":",
                error
            );
            setLikeCount(0);
            setCommentCount(0);
            setIsSaved(false);
        }
    }, [id]);

    const checkPostOwnership = useCallback(async () => {
        if (!user?.uid) return;
        try {
            const currentUser = await getCurrentUser();
            setIsCurrentUserOwner(currentUser?.uid === user.uid);
        } catch (error) {
            console.error("Error checking post ownership:", error);
            setIsCurrentUserOwner(false);
        }
    }, [user?.uid]);

    const handleLikeToggle = useCallback(async () => {
        if (!id) return;
        const previousLikeStatus = isLiked;
        const previousLikeCount = likeCount;

        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));

        try {
            if (!previousLikeStatus) {
                await addLikePost(id);
            } else {
                await removeLikeFromPost(id);
            }
        } catch (error) {
            console.error("Like toggle error:", error);
            setIsLiked(previousLikeStatus);
            setLikeCount(previousLikeCount);
            ShowToast("error", "İşlem sırasında bir hata oluştu.");
        }
    }, [id, isLiked, likeCount, setIsLiked, setLikeCount]);

    const handleSaveToggle = useCallback(async () => {
        if (!id) return;
        const previousSaveStatus = isSaved;

        setIsSaved(!isSaved);

        try {
            if (!previousSaveStatus) {
                await savePost(id);
                ShowToast("success", "Gönderi kaydedildi.");
            } else {
                await unsavePost(id);
                ShowToast("info", "Gönderi kayıtlardan çıkarıldı.");
            }
        } catch (error) {
            console.error("Save toggle error:", error);
            setIsSaved(previousSaveStatus);
            ShowToast("error", "Kaydetme işleminde hata oluştu.");
        }
    }, [id, isSaved, setIsSaved]);

    const handleNavigateToPost = useCallback(() => {
        if (id) navigateToPage(`/post/${id}`);
    }, [id, navigateToPage]);

    const handleNavigateToProfile = useCallback(() => {
        if (user?.username) navigateToPage(`/profile/${user.username}`);
    }, [user?.username, navigateToPage]);

    const handleSharePost = useCallback(() => {
        if (!id) return;
        const postUrl = `${window.location.origin}/post/${id}`;
        navigator.clipboard
            .writeText(postUrl)
            .then(() =>
                ShowToast("success", "Gönderi linki panoya kopyalandı.")
            )
            .catch(() => ShowToast("error", "Link kopyalanamadı."));
    }, [id]);

    const toggleMoreOptionsMenu = () => {
        setShowMoreOptions((prev) => !prev);
    };

    const handleRemovePost = useCallback(async () => {
        if (id) {
            setShowMoreOptions(false);
            const response = await removePost(id);
            if (!response) ShowToast("error", "Gönderi silinemedi.");
            ShowToast("success", "Gönderi başarıyla silindi.");
            onPostRemove(id);
        }
    }, [id]);

    const handleReportPost = useCallback(() => {
        ShowToast("warning", "Gönderi şikayet edildi.");
        setShowMoreOptions(false);
    }, [user?.username]);

    useEffect(() => {
        fetchPostStats();
        checkPostOwnership();
    }, [fetchPostStats, checkPostOwnership]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                moreMenuRef.current &&
                !moreMenuRef.current.contains(event.target)
            ) {
                setShowMoreOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!postData || !id) {
        return (
            <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-neutral-500 mb-4 md:mb-6">
                Gönderi bilgileri yüklenemedi.
            </div>
        );
    }

    return (
        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <div
                    className="flex items-center space-x-2 md:space-x-3 cursor-pointer group"
                    onClick={handleNavigateToProfile}
                    title={`${user?.username || "Profil"}'e git`}
                >
                    <img
                        src={user?.profilePicture || "/default-avatar.png"}
                        alt={`${user?.username || "Kullanıcı"} profil resmi`}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover bg-neutral-700"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm md:text-md font-semibold group-hover:underline">
                            {user?.firstName ||
                                user?.username ||
                                "Bilinmeyen Kullanıcı"}{" "}
                            {user?.lastName}
                        </span>
                        <span className="text-xs text-gray-400">
                            {postDate}
                        </span>
                    </div>
                </div>

                <div className="relative" ref={moreMenuRef}>
                    <button
                        className="text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer p-1 rounded-full hover:bg-neutral-700"
                        onClick={toggleMoreOptionsMenu}
                        aria-label="Daha fazla seçenek"
                        aria-haspopup="true"
                        aria-expanded={showMoreOptions}
                    >
                        <FiMoreHorizontal className="text-lg" />
                    </button>

                    {showMoreOptions && (
                        <div
                            className="absolute right-0 top-full mt-2 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl p-2 w-72 animate-fade-in z-50"
                            role="menu"
                        >
                            {isCurrentUserOwner ? (
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-neutral-700 rounded flex items-center gap-2"
                                    onClick={handleRemovePost}
                                >
                                    <MdDelete size={18} />
                                    Gönderiyi Sil
                                </button>
                            ) : (
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 rounded flex items-center gap-2"
                                    onClick={handleReportPost}
                                >
                                    <MdOutlineReport size={18} />
                                    Gönderiyi Şikayet Et
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {content && (
                <div
                    className="mb-3 md:mb-4 cursor-pointer"
                    onClick={handleNavigateToPost}
                >
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                        {content}
                    </p>
                </div>
            )}

            {media && (
                <div className="mb-3 md:mb-4 -mx-4 md:-mx-6 bg-black flex justify-center">
                    <LazyLoadImage
                        src={media}
                        alt="Gönderi Medyası"
                        effect="blur"
                        className="w-full max-h-[75vh] object-contain"
                        threshold={300}
                        wrapperClassName="w-full"
                    />
                </div>
            )}

            <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-3 md:mb-4 px-1">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <FaHeart />
                        <span>{likeCount}</span>
                    </span>
                    <span
                        className="flex items-center gap-1.5 cursor-pointer hover:text-white"
                        onClick={handleNavigateToPost}
                    >
                        <FaComment />
                        <span>{commentCount}</span>
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-around border-t border-neutral-700 pt-3 md:pt-4">
                <button
                    onClick={handleLikeToggle}
                    className={`flex flex-col md:flex-row items-center md:space-x-1.5 transition-colors duration-200 p-2 rounded-md ${
                        isLiked
                            ? "text-pink-500"
                            : "text-gray-400 hover:text-pink-500 hover:bg-neutral-700/50"
                    }`}
                    aria-label={isLiked ? "Beğeniyi kaldır" : "Beğen"}
                    aria-pressed={isLiked}
                >
                    <FaHeart className="text-xl md:text-lg" />
                    <span className="hidden md:inline text-xs md:text-sm mt-0.5 md:mt-0">
                        {isLiked ? "Beğenildi" : "Beğen"}
                    </span>
                </button>

                <button
                    onClick={handleNavigateToPost}
                    className="flex flex-col md:flex-row items-center md:space-x-1.5 text-gray-400 hover:text-blue-400 hover:bg-neutral-700/50 transition-colors duration-200 p-2 rounded-md"
                    aria-label="Yorum yap"
                >
                    <FaComment className="text-xl md:text-lg" />
                    <span className="hidden md:inline text-xs md:text-sm mt-0.5 md:mt-0">
                        Yorum
                    </span>
                </button>

                <button
                    onClick={handleSharePost}
                    className="flex flex-col md:flex-row items-center md:space-x-1.5 text-gray-400 hover:text-green-400 hover:bg-neutral-700/50 transition-colors duration-200 p-2 rounded-md"
                    aria-label="Paylaş"
                >
                    <FaShare className="text-xl md:text-lg" />
                    <span className="hidden md:inline text-xs md:text-sm mt-0.5 md:mt-0">
                        Paylaş
                    </span>
                </button>

                <button
                    onClick={handleSaveToggle}
                    className={`flex flex-col md:flex-row items-center md:space-x-1.5 transition-colors duration-200 p-2 rounded-md ${
                        isSaved
                            ? "text-yellow-400"
                            : "text-gray-400 hover:text-yellow-400 hover:bg-neutral-700/50"
                    }`}
                    aria-label={isSaved ? "Kaydetmeyi kaldır" : "Kaydet"}
                    aria-pressed={isSaved}
                >
                    {isSaved ? (
                        <FaBookmark className="text-xl md:text-lg" />
                    ) : (
                        <FaRegBookmark className="text-xl md:text-lg" />
                    )}
                    <span className="hidden md:inline text-xs md:text-sm mt-0.5 md:mt-0">
                        {isSaved ? "Kaydedildi" : "Kaydet"}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
