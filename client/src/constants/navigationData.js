import { GoHomeFill, GoHeartFill } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { FaLayerGroup } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";

export const colors = {
    pink: "#ec4899",
    purple: "#8b5cf6",
    blue: "#3b82f6",
    red: "#ef4444",
    green: "#10b981",
};

export const navigationItems = [
    {
        name: "Ana Sayfa",
        route: "/",
        icon: GoHomeFill,
        color: colors.pink,
    },
    {
        name: "Takipçilerim",
        route: "/followers",
        icon: BsPeopleFill,
        color: colors.blue,
    },
    // {
    //     name: "Gruplarım",
    //     route: "/groups",
    //     icon: FaLayerGroup,
    //     color: colors.purple,
    // },
    {
        name: "Favorilerim",
        route: "/favorites",
        icon: GoHeartFill,
        color: colors.red,
    },
    {
        name: "Kaydettiklerim",
        route: "/saved",
        icon: BiBookmark,
        color: colors.green,
    },
];
