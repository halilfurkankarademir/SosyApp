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
import { addLikePost, removeLikeFromPost } from "../../../api/likeApi";
import { savePost, unsavePost } from "../../../api/savedApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdDelete, MdOutlineReport } from "react-icons/md";
import { removePost } from "../../../api/postApi";

const PostCard = ({ postData, onPostRemove }) => {
    const {
        id,
        user,
        likeCount,
        comments,
        content,
        media,
        createdAt,
        isOwner,
        isLiked: initialIsLiked,
        isSaved: initialIsSaved,
    } = postData || {};

    const postDate = getDateDiff(createdAt);

    const { navigateToPage } = useNavigation();

    const moreMenuRef = useRef(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [likesCount, setLikesCount] = useState(likeCount || 0);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [isLikeProcessing, setIsLikeProcessing] = useState(false);

    // Pencere boyutunu izle
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLikeToggle = useCallback(async () => {
        if (!id || isLikeProcessing) return;

        setIsLikeProcessing(true);
        const previousLikeStatus = isLiked;
        let previousLikeCount = likesCount;

        setIsLiked(!previousLikeStatus);
        setLikesCount(
            previousLikeStatus ? previousLikeCount - 1 : previousLikeCount + 1
        );

        try {
            if (!previousLikeStatus) {
                await addLikePost(id);
            } else {
                await removeLikeFromPost(id);
            }
        } catch (error) {
            setIsLiked(previousLikeStatus);
            setLikesCount(previousLikeCount);
            ShowToast("error", "İşlem sırasında bir hata oluştu.");
        } finally {
            setIsLikeProcessing(false);
        }
    }, [id, isLiked, likesCount, isLikeProcessing]);

    const handleSaveToggle = useCallback(async () => {
        if (!id) return;
        const previousIsSaved = isSaved;

        // Optimistik güncelleme ekleyin
        setIsSaved(!previousIsSaved);

        try {
            if (!previousIsSaved) {
                await savePost(id);
            } else {
                await unsavePost(id);
            }
        } catch (error) {
            console.error("Save toggle error:", error);
            // Hata durumunda eski state'e dön
            setIsSaved(previousIsSaved);
            ShowToast("error", "Kaydetme işleminde hata oluştu.");
        }
    }, [id, isSaved]);

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
            onPostRemove();
        }
    }, [id]);

    const handleReportPost = useCallback(() => {
        ShowToast("warning", "Gönderi şikayet edildi.");
        setShowMoreOptions(false);
    }, [user?.username]);

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

    useEffect(() => {
        setIsLiked(initialIsLiked);
        setIsSaved(initialIsSaved);
        setLikesCount(likeCount || 0);
    }, [initialIsLiked, initialIsSaved]);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    if (!postData || !id) {
        return (
            <div className="content-card mb-4 p-4">
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="flex gap-3 items-center">
                        <div className="w-11 h-11 bg-neutral-700 rounded-full"></div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
                            <div className="h-3 bg-neutral-700 rounded w-1/4"></div>
                        </div>
                    </div>
                    <div className="h-20 bg-neutral-700 rounded"></div>

                    {/* İsteğe bağlı resim alanı */}
                    {Math.random() > 0.3 && (
                        <div className="h-[200px] bg-neutral-700 rounded-md -mx-4"></div>
                    )}

                    {/* Etkileşim sayaçları */}
                    <div className="flex gap-5 px-2">
                        <div className="h-4 bg-neutral-700 rounded w-14"></div>
                        <div className="h-4 bg-neutral-700 rounded w-14"></div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex justify-around border-t border-neutral-700/50 pt-3">
                        <div className="h-6 bg-neutral-700 rounded w-14"></div>
                        <div className="h-6 bg-neutral-700 rounded w-14"></div>
                        <div className="h-6 bg-neutral-700 rounded w-14"></div>
                        <div className="h-6 bg-neutral-700 rounded w-14"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Kartın kendisi için şimdi content-card sınıfını kullanalım
    return (
        <div className="content-card transition-shadow duration-300 hover:shadow-xl mb-4 p-4">
            {/* Kart Başlığı - Kullanıcı Bilgisi ve Ayarlar */}
            <div className="flex items-center justify-between mb-3">
                <div
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={handleNavigateToProfile}
                    title={`${user?.username || "Profil"}'e git`}
                >
                    <img
                        src={user?.profilePicture || "/default-avatar.png"}
                        alt={`${user?.username || "Kullanıcı"} profil resmi`}
                        className="w-11 h-11 rounded-full object-cover bg-neutral-700 touch-target"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                    />
                    <div className="flex flex-col">
                        <span className="text-[15px] font-semibold group-hover:underline text-white">
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

                {/* Daha Fazla Seçenekler Menüsü */}
                <div className="relative" ref={moreMenuRef}>
                    <button
                        className="text-gray-400 hover:text-pink-500 transition-colors p-2 rounded-full hover:bg-neutral-700/30 touch-target"
                        onClick={toggleMoreOptionsMenu}
                        aria-label="Daha fazla seçenek"
                        aria-haspopup="true"
                        aria-expanded={showMoreOptions}
                    >
                        <FiMoreHorizontal className="text-lg" />
                    </button>

                    {showMoreOptions && (
                        <div
                            className="absolute right-0 top-full mt-1 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl p-2 w-64 animate-fade-in z-50"
                            role="menu"
                        >
                            {isOwner ? (
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-neutral-700/50 rounded-md flex items-center gap-3 touch-target"
                                    onClick={handleRemovePost}
                                >
                                    <MdDelete size={20} />
                                    Gönderiyi Sil
                                </button>
                            ) : (
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-700/50 rounded-md flex items-center gap-3 touch-target"
                                    onClick={handleReportPost}
                                >
                                    <MdOutlineReport size={20} />
                                    Gönderiyi Şikayet Et
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Gönderi İçeriği */}
            {content && (
                <div className="mb-3">
                    <p className="text-[15px] whitespace-pre-wrap break-words text-white leading-relaxed">
                        {renderHashtags(content)}
                    </p>
                </div>
            )}

            {/* Gönderi Medyası */}
            {media && (
                <div
                    className={`mb-4 -mx-4 md:-mx-6 bg-neutral-800/50 flex justify-center overflow-hidden rounded-md ${
                        !isImageLoaded ? "min-h-[250px] animate-pulse" : ""
                    }`}
                    onClick={handleNavigateToPost}
                >
                    <LazyLoadImage
                        src={media}
                        alt="Gönderi Medyası"
                        effect="blur"
                        className={`w-full max-h-[75vh] object-cover cursor-pointer transition-opacity duration-300 ${
                            isImageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        threshold={300}
                        wrapperClassName="w-full"
                        afterLoad={handleImageLoad}
                    />
                </div>
            )}

            {/* Beğeni ve Yorum Sayıları */}
            <div className="flex items-center justify-between text-xs md:text-xs text-gray-400 mb-3 px-2">
                <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5">
                        <FaHeart
                            className={`${isLiked ? "text-pink-500" : ""} ${
                                isMobile ? "text-lg" : "text-[15px]"
                            }`}
                        />
                        <span className={`${isMobile ? "text-sm" : "text-md"}`}>
                            {likesCount || 0}
                        </span>
                    </span>
                    <span
                        className="flex items-center gap-1.5 cursor-pointer hover:text-white"
                        onClick={handleNavigateToPost}
                    >
                        <FaComment
                            className={`${
                                isMobile ? "text-lg" : "text-[15px]"
                            }`}
                        />
                        <span className={`${isMobile ? "text-sm" : "text-xs"}`}>
                            {comments.length}
                        </span>
                    </span>
                </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex items-center justify-around border-t border-neutral-700/50 pt-3">
                {/* Beğen Butonu */}
                <button
                    onClick={handleLikeToggle}
                    className={`flex items-center gap-2 p-2 rounded-md touch-target ${
                        isLiked
                            ? "text-pink-500"
                            : "text-gray-400 hover:text-pink-500 hover:bg-neutral-700/30"
                    }`}
                    aria-label={isLiked ? "Beğeniyi kaldır" : "Beğen"}
                    aria-pressed={isLiked}
                >
                    <FaHeart
                        className={`${isMobile ? "text-xl" : "text-[15px]"}`}
                    />
                    {!isMobile && (
                        <span className="text-sm font-medium">
                            {isLiked ? "Beğenildi" : "Beğen"}
                        </span>
                    )}
                </button>

                {/* Yorum Butonu */}
                <button
                    onClick={handleNavigateToPost}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 hover:bg-neutral-700/30 p-2 rounded-md touch-target"
                    aria-label="Yorum yap"
                >
                    <FaComment
                        className={`${isMobile ? "text-xl" : "text-[15px]"}`}
                    />
                    {!isMobile && (
                        <span className="text-sm font-medium">Yorum</span>
                    )}
                </button>

                {/* Paylaş Butonu */}
                <button
                    onClick={handleSharePost}
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 hover:bg-neutral-700/30 p-2 rounded-md touch-target"
                    aria-label="Paylaş"
                >
                    <FaShare
                        className={`${isMobile ? "text-xl" : "text-[15px]"}`}
                    />
                    {!isMobile && (
                        <span className="text-sm font-medium">Paylaş</span>
                    )}
                </button>

                {/* Kaydet Butonu */}
                <button
                    onClick={handleSaveToggle}
                    className={`flex items-center gap-2 p-2 rounded-md touch-target ${
                        isSaved
                            ? "text-yellow-500"
                            : "text-gray-400 hover:text-yellow-500 hover:bg-neutral-700/30"
                    }`}
                    aria-label={isSaved ? "Kaydetmeyi kaldır" : "Kaydet"}
                    aria-pressed={isSaved}
                >
                    {isSaved ? (
                        <FaBookmark
                            className={`${
                                isMobile ? "text-xl" : "text-[15px]"
                            }`}
                        />
                    ) : (
                        <FaRegBookmark
                            className={`${
                                isMobile ? "text-xl" : "text-[15px]"
                            }`}
                        />
                    )}
                    {!isMobile && (
                        <span className="text-sm font-medium">
                            {isSaved ? "Kaydedildi" : "Kaydet"}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PostCard;

// Hashtagleri algilayip link haline getiren fonksiyon
const renderHashtags = (text) => {
    const hashtagRegex = /#(\w+)/g;
    const parts = text.split(hashtagRegex);
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return (
                <a
                    key={index}
                    href={`/search?q=${part}`}
                    className="text-pink-400 hover:underline"
                >
                    #{part}
                </a>
            );
        }
        return part;
    });
};
