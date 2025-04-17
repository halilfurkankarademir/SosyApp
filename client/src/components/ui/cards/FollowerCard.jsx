import { React, memo } from "react";
import { FaUserTimes } from "react-icons/fa";
import { useNavigation } from "../../../context/NavigationContext";

const FollowerCard = ({ follower }) => {
    const { navigateToPage } = useNavigation();

    const handleClick = () => {
        // Navigate to the user's profile page
        navigateToPage(`/profile/${follower.username}`);
        console.log(`Clicked on follower: ${follower.username}`);
    };

    return (
        <div
            key={follower.id}
            className="flex items-center justify-between p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex items-center space-x-3">
                <img
                    src={
                        follower.profilePicture ||
                        "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                    }
                    alt={follower.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-white font-medium">
                        {follower.firstName + " " + follower.lastName}
                    </h3>
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

export default memo(FollowerCard);
