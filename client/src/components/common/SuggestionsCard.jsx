import React, { memo, useState, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { BsPeopleFill, BsPersonAdd } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { followUser } from "../../api/followApi";
import { ShowToast } from "../ui/toasts/ShowToast";
import { SuggestionsCardSkeleton } from "../../utils/SkeletonGenerator";

const SuggestionsCard = ({
    suggestions,
    onFollow,
    loading = false,
    isCompact = false,
}) => {
    const { navigateToPage } = useNavigation();
    const [isLoading, setIsLoading] = useState(
        loading || !suggestions || suggestions.length === 0
    );

    useEffect(() => {
        // Öneriler yüklendiğinde loading durumunu güncelle
        if (suggestions && suggestions.length > 0) {
            setIsLoading(false);
        }
    }, [suggestions]);

    const handleFollow = async (userId, username) => {
        try {
            await followUser(userId);
            ShowToast("success", `${username} takip edildi.`);
            if (onFollow) onFollow();
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    if (isLoading) {
        return (
            <SuggestionsCardSkeleton
                itemCount={isCompact ? 3 : 5}
                isCompact={isCompact}
            />
        );
    }

    const cardWidthClass = isCompact ? "w-20" : "w-full";

    return (
        <div
            className={`hidden md:block ${cardWidthClass} bg-neutral-800 h-auto text-white rounded-xl transition-all duration-300`}
        >
            {!isCompact && (
                <div className="flex flex-row gap-2 p-4 text-sm">
                    <BsPeopleFill size={16} />
                    <h2 className="font-semibold">Tanıyor Olabilirsin</h2>
                </div>
            )}
            {isCompact && (
                <div className="flex justify-center p-3 border-b border-neutral-700/50">
                    <BsPeopleFill size={16} />
                </div>
            )}
            {/* Kullanıcı Bilgileri */}
            {suggestions.map((user) => (
                <div
                    className={`flex items-center p-3 cursor-pointer ${
                        isCompact ? "flex-col space-y-2 justify-center" : ""
                    }`}
                    key={user.uid}
                >
                    <LazyLoadImage
                        src={user.profilePicture}
                        alt="Kullanıcı Resmi"
                        className="w-10 h-10 rounded-full object-cover"
                        effect="blur"
                        onClick={() =>
                            navigateToPage(`profile/${user.username}`)
                        }
                    />
                    {!isCompact && (
                        <div
                            className="ml-3"
                            onClick={() =>
                                navigateToPage(`profile/${user.username}`)
                            }
                        >
                            <p className="text-sm font-semibold">
                                {user.firstName + " " + user.lastName}
                            </p>
                            <p className="text-xs text-neutral-400">
                                @{user.username}
                            </p>
                        </div>
                    )}
                    <button
                        className={`${
                            isCompact ? "mt-1" : "ml-auto"
                        } cursor-pointer hover:text-pink-500 duration-200 transition-all`}
                        onClick={() => handleFollow(user.uid, user.username)}
                        title={`${user.firstName} ${user.lastName} kullanıcısını takip et`}
                    >
                        <BsPersonAdd size={isCompact ? 16 : 20} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default memo(SuggestionsCard);
