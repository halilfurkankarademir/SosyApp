import { React, memo } from "react";
import { FaUserTimes } from "react-icons/fa";

const FriendCard = ({ follower }) => {
    return (
        <div
            key={follower.id}
            className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition duration-200"
        >
            <div className="flex items-center space-x-3">
                <img
                    src={follower.profilePic}
                    alt={follower.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-white font-medium">{follower.name}</h3>
                    <p className="text-sm text-neutral-400">
                        @{follower.username}
                    </p>
                </div>
            </div>
            <button
                className="p-2 rounded-full bg-neutral-600 text-white hover:bg-red-600 transition"
                title="Takipçiyi kaldır"
            >
                <FaUserTimes size={16} />
            </button>
        </div>
    );
};

export default memo(FriendCard);
