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
    compact = false,
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
        return <SuggestionsCardSkeleton itemCount={compact ? 3 : 5} />;
    }

    return (
        <div className="hidden md:block w-64 bg-neutral-800 h-auto text-white rounded-xl fixed">
            <div className="flex flex-row gap-2 p-4 text-sm">
                <BsPeopleFill size={16} />
                <h2 className="font-semibold">Tanıyor Olabilirsin</h2>
            </div>
            {/* Kullanıcı Bilgileri */}
            {suggestions.map((user) => (
                <div
                    className="flex items-center p-3 cursor-pointer"
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
                    <div
                        className="ml-3"
                        onClick={() =>
                            navigateToPage(`profile/${user.username}`)
                        }
                    >
                        <p className="text-sm font-semibold">
                            {user.firstName + " " + user.lastName}
                        </p>{" "}
                        {/* Kullanıcı adı */}
                        <p className="text-xs text-neutral-400">
                            @{user.username}
                        </p>{" "}
                        {/* Kullanıcı etiketi */}
                    </div>
                    <button
                        className="ml-auto cursor-pointer hover:text-pink-500 duration-200 transition-all"
                        onClick={() => handleFollow(user.uid, user.username)}
                    >
                        <BsPersonAdd size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default memo(SuggestionsCard);
