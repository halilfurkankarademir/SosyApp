import { GoHomeFill, GoHeartFill } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { BiBookmark, BiWorld } from "react-icons/bi";

export const colors = {
    pink: "#ec4899",
    purple: "#8b5cf6",
    blue: "#3b82f6",
    cyan: "#b347ff",
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
        name: "Keşfet",
        route: "/explore",
        icon: BiWorld,
        color: colors.cyan,
    },
    {
        name: "Sosyal Ağım",
        route: "/connections",
        icon: BsPeopleFill,
        color: colors.blue,
    },
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
