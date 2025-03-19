import React from "react";
import { FaFolderOpen } from "react-icons/fa6";
import { GoHeartFill, GoHomeFill, GoPeople } from "react-icons/go";

const Sidebar = () => {
    return (
        <div className="w-64 fixed bg-neutral-800 h-96 text-white rounded-xl">
            {/* Ana Menü */}
            <div className="p-6">
                {/* Ana Sayfa */}
                <div className="flex items-center text-md space-x-3 p-2 hover:bg-neutral-700 rounded-lg cursor-pointer">
                    <GoHomeFill className="text-xl" color="#f986f3" />
                    <span>Ana Sayfa</span>
                </div>
                {/* Arkadaslarim */}
                <div className="flex items-center text-m space-x-3 p-2 hover:bg-neutral-700 rounded-lg cursor-pointer">
                    <GoPeople className="text-xl" color="#f986f3" />
                    <span>Arkadaşlarım</span>
                </div>
                {/* Favorilerim */}
                <div className="flex items-center text-m  space-x-3 p-2 hover:bg-neutral-700 rounded-lg cursor-pointer">
                    <GoHeartFill className="text-xl" color="#f986f3" />
                    <span>Favorilerim</span>
                </div>
                {/* Gonderilerim */}
                <div className="flex items-center text-m  space-x-3 p-2 hover:bg-neutral-700 rounded-lg cursor-pointer">
                    <FaFolderOpen className="text-xl" color="#f986f3" />
                    <span>Gönderilerim</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
