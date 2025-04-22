import React, { useEffect, useState, useRef, useCallback } from "react"; // React ve hook'lar başta

// İkonlar
import {
    FaHeart,
    FaComment,
    FaShare,
    FaBookmark,
    FaRegBookmark,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

// Context ve Yardımcılar
import { useNavigation } from "../../../context/NavigationContext";
import { getDateDiff } from "../../../utils/helpers";
import { ShowToast } from "../../ui/toasts/ShowToast";

// API Çağrıları
import {
    addLikePost,
    getAllLikes,
    removeLikeFromPost,
} from "../../../api/likeApi";
import { isPostSaved, savePost, unsavePost } from "../../../api/savedApi";
import { getCommentCount } from "../../../api/commentApi";
import { getCurrentUser } from "../../../api/userApi";

// Diğer Component/Hook'lar
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useLikeStatus from "../../../hooks/useLikeStatus"; // Beğeni durumunu yöneten hook

const PostCard = ({ postData, handleRemove }) => {
    // --- Props ve Temel Değişkenler ---
    const { id, user, content, media, createdAt } = postData || {}; // Güvenli prop destructuring
    const postDate = getDateDiff(createdAt); // Tarih formatlama

    // --- Context ve Navigasyon ---
    const { navigateToPage } = useNavigation();

    // --- Ref'ler ---
    const moreMenuRef = useRef(null); // "Daha Fazla" menüsü için ref

    // --- State Yönetimi ---
    const [showMoreOptions, setShowMoreOptions] = useState(false); // "Daha Fazla" menüsünün görünürlüğü
    const [isSaved, setIsSaved] = useState(false); // Gönderinin kaydedilme durumu
    const [likeCount, setLikeCount] = useState(0); // Beğeni sayısı
    const [commentCount, setCommentCount] = useState(0); // Yorum sayısı
    const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false); // Mevcut kullanıcı gönderinin sahibi mi?
    const { isLiked, setIsLiked } = useLikeStatus(id); // Özel hook'tan beğeni durumu (true/false)

    // --- Asenkron Veri Çekme ve Kontrol Fonksiyonları ---

    // Gönderi istatistiklerini (beğeni, yorum, kaydetme durumu) çeker
    const fetchPostStats = useCallback(async () => {
        if (!id) return;
        try {
            // Paralel istekler
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
            // Hata durumunda varsayılan değerlere sıfırlama (isteğe bağlı)
            setLikeCount(0);
            setCommentCount(0);
            setIsSaved(false);
        }
    }, [id]); // id değişirse tekrar çalışır

    // Gönderinin mevcut kullanıcıya ait olup olmadığını kontrol eder
    const checkPostOwnership = useCallback(async () => {
        if (!user?.uid) return; // Yazar bilgisi yoksa kontrol etme
        try {
            const currentUser = await getCurrentUser();
            setIsCurrentUserOwner(currentUser?.uid === user.uid);
        } catch (error) {
            console.error("Error checking post ownership:", error);
            setIsCurrentUserOwner(false); // Hata durumunda sahip değil varsay
        }
    }, [user?.uid]); // user.uid değişirse tekrar çalışır

    // --- Olay Yöneticileri (Event Handlers) ---

    // Beğenme/Beğeniyi geri alma işlemi
    const handleLikeToggle = useCallback(async () => {
        if (!id) return;
        const previousLikeStatus = isLiked;
        const previousLikeCount = likeCount;

        // Optimistic UI Update
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
            // Hata durumunda UI'ı geri al
            setIsLiked(previousLikeStatus);
            setLikeCount(previousLikeCount);
            ShowToast("error", "İşlem sırasında bir hata oluştu.");
        }
    }, [id, isLiked, likeCount, setIsLiked, setLikeCount]); // Bağımlılıkları ekle

    // Kaydetme/Kaydı geri alma işlemi
    const handleSaveToggle = useCallback(async () => {
        if (!id) return;
        const previousSaveStatus = isSaved;

        // Optimistic UI Update
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
            // Hata durumunda UI'ı geri al
            setIsSaved(previousSaveStatus);
            ShowToast("error", "Kaydetme işleminde hata oluştu.");
        }
    }, [id, isSaved, setIsSaved]); // Bağımlılıkları ekle

    // Gönderi detay sayfasına gitme
    const handleNavigateToPost = useCallback(() => {
        if (id) navigateToPage(`/post/${id}`);
    }, [id, navigateToPage]);

    // Profil sayfasına gitme
    const handleNavigateToProfile = useCallback(() => {
        if (user?.username) navigateToPage(`/profile/${user.username}`);
    }, [user?.username, navigateToPage]);

    // Gönderi linkini panoya kopyalama
    const handleSharePost = useCallback(() => {
        if (!id) return;
        const postUrl = `${window.location.origin}/post/${id}`; // Dinamik URL
        navigator.clipboard
            .writeText(postUrl)
            .then(() =>
                ShowToast("success", "Gönderi linki panoya kopyalandı.")
            )
            .catch(() => ShowToast("error", "Link kopyalanamadı."));
    }, [id]);

    // "Daha Fazla" menüsünü açıp kapatma
    const toggleMoreOptionsMenu = () => {
        setShowMoreOptions((prev) => !prev);
    };

    // Gönderiyi silme (prop'tan gelen fonksiyonu çağırır)
    const handleRemovePost = useCallback(() => {
        if (id && handleRemove) {
            handleRemove(id); // Parent component'teki silme fonksiyonu
            setShowMoreOptions(false); // Menüyü kapat
        }
    }, [id, handleRemove]);

    // Kullanıcıyı engelleme (şimdilik sadece logluyor)
    const handleBlockUser = useCallback(() => {
        console.log("Kullanıcı Engelle:", user?.username);
        // Burada engelleme API çağrısı yapılabilir
        setShowMoreOptions(false); // Menüyü kapat
    }, [user?.username]);

    // --- Effect'ler ---

    // Component yüklendiğinde veya 'id' değiştiğinde istatistikleri ve sahipliği kontrol et
    useEffect(() => {
        fetchPostStats();
        checkPostOwnership();
    }, [fetchPostStats, checkPostOwnership]); // useCallback kullandığımız için fonksiyon isimlerini ekleyebiliriz

    // "Daha Fazla" menüsü dışına tıklandığında menüyü kapat
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Ref varsa VE tıklanan yer menünün içinde değilse
            if (
                moreMenuRef.current &&
                !moreMenuRef.current.contains(event.target)
            ) {
                setShowMoreOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup fonksiyonu: Component kaldırıldığında event listener'ı kaldır
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []); // Bu effect sadece component mount/unmount olduğunda çalışır

    // --- Render Kontrolü ---
    // Eğer postData gelmediyse veya id yoksa boş bir şey veya yükleniyor göstergesi döndür
    if (!postData || !id) {
        return (
            <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-neutral-500 mb-4 md:mb-6">
                Gönderi bilgileri yüklenemedi.
            </div>
        );
        // veya return null;
    }

    // --- JSX Render ---
    return (
        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white mb-4 md:mb-6">
            {/* Bölüm: Kullanıcı Bilgileri ve Seçenekler Menüsü */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
                {/* Kullanıcı Avatarı ve Adı */}
                <div
                    className="flex items-center space-x-2 md:space-x-3 cursor-pointer group"
                    onClick={handleNavigateToProfile}
                    title={`${user?.username || "Profil"}'e git`}
                >
                    <img
                        src={user?.profilePicture || "/default-avatar.png"} // Varsayılan avatar yolu
                        alt={`${user?.username || "Kullanıcı"} profil resmi`}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover bg-neutral-700" // Resim yüklenene kadar arkaplan
                        onError={(e) => (e.target.src = "/default-avatar.png")} // Resim yüklenemezse varsayılana dön
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

                {/* Daha Fazla Seçenek Butonu ve Menüsü */}
                <div className="relative" ref={moreMenuRef}>
                    <button
                        className="text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer p-1 rounded-full hover:bg-neutral-700" // Tıklama alanı ve geri bildirim
                        onClick={toggleMoreOptionsMenu}
                        aria-label="Daha fazla seçenek"
                        aria-haspopup="true"
                        aria-expanded={showMoreOptions}
                    >
                        <FiMoreHorizontal className="text-lg" />
                    </button>

                    {/* Açılır Menü */}
                    {showMoreOptions && (
                        <div
                            className="absolute right-0 top-full mt-2 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl p-2 w-48 animate-fade-in z-50"
                            role="menu" // Erişilebilirlik
                        >
                            {isCurrentUserOwner ? (
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-neutral-700 rounded flex items-center gap-2"
                                    onClick={handleRemovePost}
                                >
                                    {/* <FaTrashAlt /> İsteğe bağlı ikon */}
                                    Gönderiyi Sil
                                </button>
                            ) : (
                                <button
                                    role="menuitem"
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 rounded flex items-center gap-2"
                                    onClick={handleBlockUser}
                                >
                                    {/* <FaUserSlash /> İsteğe bağlı ikon */}
                                    Kullanıcıyı Engelle
                                </button>
                            )}
                            {/* Diğer menü seçenekleri buraya eklenebilir */}
                            {/* <hr className="border-neutral-700 my-1" /> */}
                            {/* <button role="menuitem" className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 rounded">Şikayet Et</button> */}
                        </div>
                    )}
                </div>
            </div>

            {/* Bölüm: Gönderi İçeriği (Metin) */}
            {content && ( // Sadece içerik varsa göster
                <div
                    className="mb-3 md:mb-4 cursor-pointer"
                    onClick={handleNavigateToPost}
                >
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                        {content}
                    </p>
                </div>
            )}

            {/* Bölüm: Gönderi Medyası (Resim/Video) */}
            {media && ( // Sadece medya varsa göster
                <div className="mb-3 md:mb-4 -mx-4 md:-mx-6 bg-black flex justify-center">
                    {" "}
                    {/* Ortalamak için flex */}
                    <LazyLoadImage
                        src={media}
                        alt="Gönderi Medyası"
                        effect="blur" // Bulanıklaştırma efekti
                        className="w-full max-h-[75vh] object-contain" // Maksimum yükseklik ve sığdırma
                        threshold={300} // Biraz daha geç yüklenmesi için eşik değeri
                        // placeholderSrc={`${media}?q=10&w=50`} // Düşük kaliteli placeholder (isteğe bağlı)
                        wrapperClassName="w-full" // Wrapper class
                    />
                </div>
            )}

            {/* Bölüm: İstatistikler (Beğeni ve Yorum Sayısı) */}
            <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-3 md:mb-4 px-1">
                <div className="flex items-center gap-4">
                    {/* Beğeni Sayısı */}
                    <span className="flex items-center gap-1.5">
                        <FaHeart />
                        <span>{likeCount}</span>
                    </span>
                    {/* Yorum Sayısı */}
                    <span
                        className="flex items-center gap-1.5 cursor-pointer hover:text-white"
                        onClick={handleNavigateToPost}
                    >
                        <FaComment />
                        <span>{commentCount}</span>
                    </span>
                </div>
            </div>

            {/* Bölüm: Aksiyon Butonları */}
            <div className="flex items-center justify-around border-t border-neutral-700 pt-3 md:pt-4">
                {/* Beğen Butonu */}
                <button
                    onClick={handleLikeToggle}
                    className={`flex flex-col md:flex-row items-center md:space-x-1.5 transition-colors duration-200 p-2 rounded-md ${
                        isLiked
                            ? "text-pink-500" // Beğenilmişse pembe
                            : "text-gray-400 hover:text-pink-500 hover:bg-neutral-700/50" // Beğenilmemişse hover efekti
                    }`}
                    aria-label={isLiked ? "Beğeniyi kaldır" : "Beğen"}
                    aria-pressed={isLiked} // Erişilebilirlik için
                >
                    <FaHeart className="text-xl md:text-lg" />
                    <span className="hidden md:inline text-xs md:text-sm mt-0.5 md:mt-0">
                        {isLiked ? "Beğenildi" : "Beğen"}
                    </span>
                </button>

                {/* Yorum Butonu */}
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

                {/* Paylaş Butonu */}
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

                {/* Kaydet Butonu */}
                <button
                    onClick={handleSaveToggle}
                    className={`flex flex-col md:flex-row items-center md:space-x-1.5 transition-colors duration-200 p-2 rounded-md ${
                        isSaved
                            ? "text-yellow-400" // Kaydedilmişse sarı
                            : "text-gray-400 hover:text-yellow-400 hover:bg-neutral-700/50" // Kaydedilmemişse hover efekti
                    }`}
                    aria-label={isSaved ? "Kaydetmeyi kaldır" : "Kaydet"}
                    aria-pressed={isSaved} // Erişilebilirlik için
                >
                    {/* İkon değişimi */}
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
