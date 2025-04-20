import React, { memo } from "react";
import { FaUserTimes } from "react-icons/fa";
import { useNavigation } from "../../../context/NavigationContext";

const FollowerCard = ({ follower }) => {
    const { navigateToPage } = useNavigation();

    // Veri varsa ve yüklenmiyorsa gerçek kartı göster
    const handleClick = () => {
        navigateToPage(`/profile/${follower.username}`);
        console.log(`Clicked on follower: ${follower.username}`);
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation(); // Kartın tıklanmasını engelle
        console.log(`Remove follower button clicked for: ${follower.username}`);
        // Takipçiyi kaldırma API çağrısını burada yapabilirsiniz
        // Örneğin: removeFollower(follower.id);
    };

    return (
        <div
            className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex items-center space-x-3">
                <img
                    src={
                        follower.profilePicture ||
                        "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                    }
                    alt={
                        follower.firstName
                            ? `${follower.firstName} ${
                                  follower.lastName || ""
                              }`.trim()
                            : follower.username
                    }
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0" // flex-shrink-0 eklemek iyi olabilir
                />
                <div>
                    <h3 className="text-white font-medium">
                        {follower.firstName || follower.lastName
                            ? `${follower.firstName || ""} ${
                                  follower.lastName || ""
                              }`.trim()
                            : follower.username}
                    </h3>
                    <p className="text-sm text-neutral-400">
                        @{follower.username}
                    </p>
                </div>
            </div>

            <button
                onClick={handleRemoveClick} // Ayrılmış handleRemoveClick fonksiyonunu kullan
                className="p-2 rounded-full bg-neutral-600 text-white hover:bg-red-600 transition flex-shrink-0" // flex-shrink-0 eklemek iyi olabilir
                title="Takipçiyi kaldır"
            >
                <FaUserTimes size={16} />
            </button>
        </div>
    );
};

export default memo(FollowerCard);
