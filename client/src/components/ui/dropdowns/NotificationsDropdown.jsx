import React, { memo } from "react";
import { getDateDiff } from "../../../utils/helpers";
import { useNavigation } from "../../../context/NavigationContext";

const NotificationsDropdown = ({ notificationsData }) => {
    const timeDiff = getDateDiff(notificationsData.timestamp);

    const { navigateToPage } = useNavigation();

    return (
        <div className="cursor-pointer fixed top-20 right-12 bg-neutral-800 h-auto w-96 overflow-y-auto p-4 rounded-md animate-fade-in z-50 ">
            {notificationsData && notificationsData.length > 0 ? (
                notificationsData.map((notification, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 rounded-2xl border-b border-gray-700 hover:bg-neutral-700 transition duration-150"
                        onClick={() =>
                            navigateToPage(`/post/${notification.postId}`)
                        }
                    >
                        <img
                            className="h-8 w-8 rounded-full mr-2 object-cover"
                            src={
                                notification.likerProfilePicture ||
                                notification.followerProfilePicture ||
                                notification.commenterProfilePicture
                            }
                            alt="Profile"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm ">
                                {notification.message}
                            </span>
                            <span className="text-xs text-gray-400">
                                {timeDiff}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex items-center p-2 border-b border-gray-700">
                    <span className="text-sm text-white ">
                        Yeni bildiriminiz yok.
                    </span>
                </div>
            )}
        </div>
    );
};

export default memo(NotificationsDropdown);
