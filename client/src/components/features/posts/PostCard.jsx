import React, { useEffect, useState, useRef } from "react";
import {
    FaHeart,
    FaComment,
    FaShare,
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigation } from "../../../context/NavigationContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getDateDiff } from "../../../utils/helpers";
import {
    addLikePost,
    getAllLikes,
    removeLikeFromPost,
} from "../../../api/likeApi";
import useLikeStatus from "../../../hooks/useLikeStatus";
import { ShowToast } from "../../ui/toasts/ShowToast";
import { isPostSaved, savePost, unsavePost } from "../../../api/savedApi";

const PostCard = ({ postData, handleRemove }) => {
    const { navigateToPage } = useNavigation();
    const [showMore, setShowMore] = useState(false);
    const [saved, setSaved] = useState(false);
    const moreMenuRef = useRef(null);
    const [likeCount, setLikeCount] = useState(0);
    const { id, post, user, content, media, createdAt } = postData || {};
    const postDate = getDateDiff(createdAt);
    const { isLiked, setIsLiked } = useLikeStatus(id);

    const getPostStats = async () => {
        try {
            if (!id) return;
            const likes = await getAllLikes(id);
            const saved = await isPostSaved(id);
            setSaved(saved);
            setLikeCount(likes.data.length);
        } catch (error) {
            console.error("Error getting post stats:", error);
        }
    };

    // Like işlemi
    const handleLike = async () => {
        try {
            // Eger gonderi begenilmis ise begeni iptal edilir aksi taktirde begenilir
            if (!isLiked) {
                await addLikePost(id);
                setIsLiked(true);
                setLikeCount((prevCount) => prevCount + 1);
            } else {
                await removeLikeFromPost(id);
                setIsLiked(false);
                setLikeCount((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.error("Like error:", error);
        }
    };

    // Yorum sayfasına yönlendirme
    const handleComment = () => {
        navigateToPage(`/post/${id}`);
    };

    // Paylaş işlemi
    const handleShare = () => {
        navigator.clipboard.writeText("http://localhost:3000/post/" + id);
        ShowToast("success", "Gönderi linki panoya kopyalandı.");
    };

    // Kaydet işlemi
    const handleSave = async () => {
        try {
            if (!saved) {
                await savePost(id);
                setSaved(true);
                ShowToast("success", "Gönderi kaydedildi.");
                return;
            }
            await unsavePost(id);
            setSaved(false);
        } catch (error) {
            console.log("Error saving post:", error);
        }
    };

    // Dışarı tıklama kontrolü
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                moreMenuRef.current &&
                !moreMenuRef.current.contains(event.target)
            ) {
                setShowMore(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        getPostStats();
    }, []);

    return (
        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white mb-4 md:mb-6">
            {/* Kullanıcı Bilgileri ve Zaman Bilgisi */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <div
                    className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
                    onClick={() => navigateToPage(`/profile/${user?.username}`)}
                >
                    <img
                        src={user?.profilePicture}
                        alt="Profil"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm md:text-md font-semibold">
                            {user?.firstName} {user?.lastName}
                        </span>
                        <span className="text-xs text-gray-400">
                            {postDate}
                        </span>
                    </div>
                </div>
                <div className="relative" ref={moreMenuRef}>
                    <button
                        className="text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer"
                        onClick={() => setShowMore(!showMore)}
                    >
                        <FiMoreHorizontal className="text-lg" />
                    </button>

                    {showMore && (
                        <div className="absolute right-0 top-8 bg-neutral-800 border-2 border-neutral-700 rounded-lg p-2 w-48 animate-fade-in z-50">
                            <button
                                className="w-full text-left px-2 py-1 hover:bg-neutral-700 rounded"
                                onClick={() => {
                                    handleRemove(id);
                                    setShowMore(false);
                                }}
                            >
                                Gönderiyi Sil
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Gönderi İçeriği */}
            <div className="mb-3 md:mb-4 md:mt-4">
                <p className="text-sm md:text-base">
                    {content ? content : " "}
                </p>
            </div>

            {/* Gönderi Medyası */}
            {media && (
                <div className="mb-3 md:mb-4">
                    <LazyLoadImage
                        src={media || post.media}
                        alt="Gönderi Medyası"
                        effect="blur"
                        className="w-full rounded-lg object-cover"
                        threshold={200}
                        placeholderSrc={`${media || post.media}?q=10&w=50`}
                    />
                </div>
            )}

            {/* İstatistikler */}
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-400">
                <div className="flex items-center gap-3 ">
                    <div className="flex flex-row gap-2">
                        <FaHeart className="mt-0.5" />
                        <span>{likeCount}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <FaComment className="mt-0.5" />
                        <span>{0}</span>
                    </div>
                </div>
            </div>

            {/* Butonlar */}
            <div className="flex items-center justify-around mt-3 md:mt-4 border-t border-neutral-700 pt-3 md:pt-4">
                {/* Beğen Butonu */}
                <button
                    onClick={handleLike}
                    className={`flex flex-col md:flex-row items-center md:space-x-2 transition-colors ${
                        isLiked
                            ? "text-pink-500"
                            : "text-gray-400 hover:text-pink-500"
                    }`}
                    aria-label={isLiked ? "Beğeniyi kaldır" : "Beğen"}
                >
                    <FaHeart />
                    <span className="hidden md:inline text-xs md:text-sm">
                        {isLiked ? "Beğeniyi geri al" : "Beğen"}
                    </span>
                </button>

                {/* Yorum Butonu */}
                <button
                    onClick={handleComment}
                    className="flex flex-col md:flex-row items-center md:space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label="Yorum yap"
                >
                    <FaComment />
                    <span className="hidden md:inline text-xs md:text-sm">
                        Yorum
                    </span>
                </button>

                {/* Paylaş Butonu */}
                <button
                    onClick={handleShare}
                    className="flex flex-col md:flex-row items-center md:space-x-2 text-gray-400 hover:text-green-400 transition-colors"
                    aria-label="Paylaş"
                >
                    <FaShare />
                    <span className="hidden md:inline text-xs md:text-sm">
                        Paylaş
                    </span>
                </button>

                {/* Kaydet Butonu */}
                <button
                    onClick={handleSave}
                    className={`flex flex-col md:flex-row items-center md:space-x-2 transition-colors ${
                        saved
                            ? "text-yellow-400"
                            : "text-gray-400 hover:text-yellow-400"
                    }`}
                    aria-label={saved ? "Kaydetmeyi kaldır" : "Kaydet"}
                >
                    {saved ? <FaBookmark /> : <FaRegBookmark />}
                    <span className="hidden md:inline text-xs md:text-sm">
                        {saved ? "Kaydetmeyi kaldır" : "Kaydet"}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
