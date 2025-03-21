import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { GoHeartFill, GoHomeFill } from "react-icons/go";
import { BiBookmark } from "react-icons/bi";
import { useNavigation } from "../../context/NavigationContext";
import { fakeUserProfile } from "../../utils/constants";

const Sidebar = () => {
    const { navigateToPage } = useNavigation();

    return (
        <div className="w-64 bg-neutral-800 h-auto text-white rounded-xl relative">
            {/* Kullanıcı Bilgileri */}
            <div
                className="flex items-center p-4 border-b border-neutral-700 cursor-pointer"
                onClick={() => navigateToPage("profile")}
            >
                <img
                    src={fakeUserProfile[0].profilePicture} // Kullanıcı resmi URL'si
                    alt="Kullanıcı Resmi"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <p className="text-sm font-semibold">
                        {fakeUserProfile[0].fullName}
                    </p>{" "}
                    {/* Kullanıcı adı */}
                    <p className="text-xs text-neutral-400">
                        {fakeUserProfile[0].username}
                    </p>{" "}
                    {/* Kullanıcı etiketi */}
                </div>
            </div>
            {/* Ana Menü */}
            <div className="p-3">
                {/* Ana Sayfa */}
                <div
                    className="flex items-center text-md space-x-3 mb-1 p-2 hover:bg-neutral-700 transition-all duration-200 rounded-lg cursor-pointer"
                    onClick={() => navigateToPage("home")}
                >
                    <div
                        className="flex items-center w-8 h-8 rounded-full p-2 text-white"
                        style={{ backgroundColor: "#f986f3" }}
                    >
                        <GoHomeFill className="text-lg" />
                    </div>
                    <span>Ana Sayfa</span>
                </div>
                {/* Arkadaşlarım */}
                <div
                    className="flex items-center text-md space-x-3 mb-1  p-2 hover:bg-neutral-700 transition-all duration-200 rounded-lg cursor-pointer"
                    onClick={() => navigateToPage("friends")}
                >
                    <div
                        className="flex items-center w-8 h-8 rounded-full p-2 text-white"
                        style={{ backgroundColor: "#62c8ff" }}
                    >
                        <BsPeopleFill className="text-lg" />
                    </div>
                    <span>Arkadaşlarım</span>
                </div>
                {/* Favorilerim */}
                <div
                    className="flex items-center text-md space-x-3 mb-1  p-2 hover:bg-neutral-700 transition-all duration-200 rounded-lg cursor-pointer"
                    onClick={() => navigateToPage("favorites")}
                >
                    <div
                        className="flex items-center w-8 h-8 rounded-full p-2 text-white"
                        style={{ backgroundColor: "#fe4d4d" }}
                    >
                        <GoHeartFill className="text-lg" />
                    </div>
                    <span>Favorilerim</span>
                </div>
                {/* Gönderilerim */}
                <div
                    className="flex items-center text-md space-x-3 mb-1  p-2 hover:bg-neutral-700 transition-all duration-200 rounded-lg cursor-pointer "
                    onClick={() => navigateToPage("saved")}
                >
                    <div
                        className="flex items-center w-8 h-8 rounded-full p-2 text-white"
                        style={{ backgroundColor: "#30c454" }}
                    >
                        <BiBookmark className="text-lg" />
                    </div>
                    <span>Kaydettiklerim</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
