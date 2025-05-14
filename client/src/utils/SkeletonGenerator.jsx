import React from "react";

/**
 * Skeleton yükleme durumları için çeşitli şekiller oluşturan utility fonksiyonlar
 */

/**
 * Dikdörtgen skeleton oluşturur
 * @param {Object} props - Bileşen özellikleri
 * @param {string} props.className - Ek CSS sınıfları
 * @param {string} props.width - Genişlik (örn: "100%", "200px")
 * @param {string} props.height - Yükseklik (örn: "20px", "2rem")
 * @param {string} props.rounded - Yuvarlaklık sınıfı (örn: "rounded", "rounded-full")
 */
export const SkeletonRect = ({
    className = "",
    width = "100%",
    height = "20px",
    rounded = "rounded",
}) => {
    const style = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`bg-neutral-700 ${rounded} ${className}`}
            style={style}
        />
    );
};

/**
 * Yuvarlak skeleton oluşturur (avatarlar için)
 * @param {Object} props - Bileşen özellikleri
 * @param {string} props.size - Boyut (örn: "40px")
 * @param {string} props.className - Ek CSS sınıfları
 */
export const SkeletonCircle = ({ size = "40px", className = "" }) => {
    const style = {
        width: size,
        height: size,
    };

    return (
        <div
            className={`bg-neutral-700 rounded-full ${className}`}
            style={style}
        />
    );
};

/**
 * Metin için skeleton satırları oluşturur
 * @param {Object} props - Bileşen özellikleri
 * @param {number} props.lines - Satır sayısı
 * @param {string} props.className - Ek CSS sınıfları
 * @param {Array} props.widths - Herbir satırın genişliği (100% ila 20% arasında)
 */
export const SkeletonText = ({ lines = 3, className = "", widths = [] }) => {
    // Widths belirtilmemişse rastgele değerler kullan
    const getWidth = (index) => {
        if (widths[index]) return widths[index];

        // Son satır için daha kısa genişlik
        if (index === lines - 1)
            return `${Math.floor(Math.random() * 40) + 20}%`;

        // Diğer satırlar için daha uzun genişlik
        return `${Math.floor(Math.random() * 30) + 70}%`;
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {Array(lines)
                .fill(0)
                .map((_, index) => (
                    <SkeletonRect
                        key={index}
                        height="12px"
                        width={getWidth(index)}
                        rounded="rounded"
                    />
                ))}
        </div>
    );
};

/**
 * NavigationPanel için skeleton
 */
export const NavigationPanelSkeleton = ({ isCompact = false }) => {
    const widthClass = isCompact ? "w-20" : "w-64";

    return (
        <div
            className={`${widthClass} bg-neutral-800 h-auto text-white rounded-xl animate-pulse transition-all duration-300`}
        >
            {/* Kullanıcı Bilgileri */}
            <div className="flex items-center p-4 border-b border-neutral-700">
                <SkeletonCircle size="40px" />
                {!isCompact && (
                    <div className="ml-3 flex flex-col gap-2">
                        <SkeletonRect width="120px" height="14px" />
                        <SkeletonRect width="80px" height="10px" />
                    </div>
                )}
            </div>

            {/* Ana Menü Öğeleri */}
            <div
                className={`p-3 ${
                    isCompact ? "flex flex-col items-center" : ""
                }`}
            >
                {/* Menü öğeleri için skeleton */}
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={`nav-item-${index}`}
                            className={`flex items-center ${
                                isCompact
                                    ? "justify-center mb-3"
                                    : "space-x-3 mb-1"
                            } p-2`}
                        >
                            <SkeletonCircle size="32px" />
                            {!isCompact && (
                                <SkeletonRect width="100px" height="14px" />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

/**
 * SuggestionsCard için skeleton
 */
export const SuggestionsCardSkeleton = ({
    itemCount = 3,
    isCompact = false,
}) => {
    const widthClass = isCompact ? "w-20" : "w-64";

    return (
        <div
            className={`hidden md:block ${widthClass} bg-neutral-800 h-auto text-white rounded-xl fixed animate-pulse transition-all duration-300`}
        >
            {/* Başlık */}
            {!isCompact && (
                <div className="flex flex-row gap-2 p-4">
                    <SkeletonCircle size="16px" />
                    <SkeletonRect width="140px" height="16px" />
                </div>
            )}
            {isCompact && (
                <div className="flex justify-center p-3 border-b border-neutral-700/50">
                    <SkeletonCircle size="16px" />
                </div>
            )}

            {/* Öneri öğeleri */}
            {Array(itemCount)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={`suggestion-${index}`}
                        className={`flex p-3 ${
                            isCompact
                                ? "flex-col items-center space-y-2"
                                : "items-center"
                        }`}
                    >
                        <SkeletonCircle size="40px" />
                        {!isCompact && (
                            <div className="ml-3 flex flex-col gap-1">
                                <SkeletonRect width="100px" height="14px" />
                                <SkeletonRect width="70px" height="10px" />
                            </div>
                        )}
                        <div className={isCompact ? "mt-1" : "ml-auto"}>
                            <SkeletonCircle
                                size={isCompact ? "16px" : "20px"}
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
};

/**
 * UserCard için skeleton
 */
export const UserCardSkeleton = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg mt-4 animate-pulse">
            <div className="flex items-center space-x-3">
                <SkeletonCircle size="48px" />
                <div className="flex flex-col gap-2">
                    <SkeletonRect width="120px" height="16px" />
                    <SkeletonRect width="80px" height="12px" />
                </div>
            </div>
            <SkeletonCircle size="32px" />
        </div>
    );
};

/**
 * UserCardList için skeleton - çoklu UserCard gösterimi
 */
export const UserCardListSkeleton = ({ count = 3 }) => {
    return (
        <div>
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <UserCardSkeleton key={`user-card-skeleton-${index}`} />
                ))}
        </div>
    );
};

/**
 * Sosyal medya kartı için skeleton
 */
export const PostCardSkeleton = () => {
    return (
        <div className="content-card mb-4 animate-pulse p-4">
            {/* Üst kısım - Kullanıcı bilgisi */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <SkeletonCircle size="44px" />
                    <div className="flex flex-col gap-2">
                        <SkeletonRect
                            width="120px"
                            height="15px"
                            rounded="rounded"
                        />
                        <SkeletonRect
                            width="80px"
                            height="12px"
                            rounded="rounded"
                        />
                    </div>
                </div>
                <SkeletonCircle size="28px" />
            </div>

            {/* İçerik */}
            <SkeletonText lines={2} className="mb-3" widths={["90%", "60%"]} />

            {/* Medya - 70% olasılıkla göster */}
            {Math.random() > 0.3 && (
                <div className="mb-3 -mx-4 md:-mx-6">
                    <SkeletonRect
                        height="200px"
                        className="w-full rounded-md"
                    />
                </div>
            )}

            {/* Etkileşim sayaçları */}
            <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex gap-5">
                    <SkeletonRect width="60px" height="14px" />
                    <SkeletonRect width="60px" height="14px" />
                </div>
            </div>

            {/* Aksiyon butonları */}
            <div className="flex justify-around border-t border-neutral-700/30 pt-3">
                <SkeletonRect width="60px" height="24px" rounded="rounded-md" />
                <SkeletonRect width="60px" height="24px" rounded="rounded-md" />
                <SkeletonRect width="60px" height="24px" rounded="rounded-md" />
                <SkeletonRect width="60px" height="24px" rounded="rounded-md" />
            </div>
        </div>
    );
};

/**
 * Verilen sayıda gönderi skeletonu oluşturur
 * @param {number} count - Kaç adet skeleton oluşturulacağı
 */
export const PostSkeletonList = ({ count = 3 }) => {
    return (
        <div className="space-y-4">
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <PostCardSkeleton key={`post-skeleton-${index}`} />
                ))}
        </div>
    );
};
