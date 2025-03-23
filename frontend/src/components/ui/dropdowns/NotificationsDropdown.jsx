import React from "react";

const NotificationsDropdown = ({ notificationsData }) => {
    return (
        <>
            <div className="fixed top-20 right-12 bg-neutral-800 h-auto w-96 overflow-y-auto p-4 rounded-2xl animate-fade-in z-50">
                {notificationsData.map((notification) => (
                    <div
                        key={notification.id}
                        className="flex items-center p-2 border-b border-gray-700"
                    >
                        <img
                            className="h-8 w-8 rounded-full mr-2 object-cover"
                            src={notification.user.avatar}
                            alt={notification.user.name}
                        />
                        <div className="flex flex-col">
                            <span className="text-sm text-white font-semibold">
                                {notification.user.name}
                            </span>
                            <span className="text-xs text-gray-400">
                                {notification.message}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NotificationsDropdown;
