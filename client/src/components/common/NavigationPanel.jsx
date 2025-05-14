import React, { memo } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { navigationItems } from "../../constants/navigationData";
import useUserStore from "../../hooks/useUserStore";

const NavigationPanel = ({ isCompact = false }) => {
    const { navigateToPage } = useNavigation();
    // Kullanıcı bilgilerini almak için useUserStore'u kullanıyoruz
    const user = useUserStore((state) => state.user);

    if (!user) {
        return null;
    }

    return (
        <div className={`bg-neutral-800 text-white rounded-xl w-full h-auto`}>
            {/* Kullanıcı Bilgileri */}
            <div
                className={`flex items-center p-4 border-b border-neutral-700 cursor-pointer ${
                    isCompact ? "justify-center" : ""
                }`}
                onClick={() => navigateToPage(`profile/${user.username}`)}
            >
                <img
                    src={user.profilePicture}
                    alt="Kullanıcı Resmi"
                    className="w-10 h-10 rounded-full object-cover"
                />
                {!isCompact && (
                    <div className="ml-3">
                        <p className="text-sm font-semibold">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-neutral-400">
                            {user.username}
                        </p>
                    </div>
                )}
            </div>

            {/* Ana Menü */}
            <div
                className={`p-3 ${
                    isCompact ? "flex flex-col items-center" : ""
                }`}
            >
                {navigationItems.map((item) => (
                    <div
                        key={item.route}
                        className={`flex items-center text-md ${
                            isCompact
                                ? "justify-center p-2 mb-3"
                                : "space-x-3 mb-1 p-2"
                        } 
                          hover:bg-neutral-700 transition-all duration-200 rounded-lg cursor-pointer`}
                        onClick={() => navigateToPage(item.route)}
                    >
                        <div
                            className="flex items-center justify-center w-8 h-8 rounded-full p-2 text-white"
                            style={{ backgroundColor: item.color }}
                        >
                            <item.icon className="text-lg" />
                        </div>
                        {!isCompact && <span>{item.name}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(NavigationPanel);
