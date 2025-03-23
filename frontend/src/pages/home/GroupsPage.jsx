import React from "react";
import Navbar from "../../components/common/Navbar";
import FriendsBar from "../../components/common/FriendsBar";
import Sidebar from "../../components/common/Sidebar";
import {
    FaLayerGroup,
    FaPlus,
    FaSearch,
    FaSignInAlt,
    FaUserAlt,
} from "react-icons/fa";
import { FaRegFaceFrown } from "react-icons/fa6";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton";
import { GiJoin } from "react-icons/gi";
import PrimaryButtonOutline from "../../components/ui/buttons/PrimaryButtonOutline";

const GroupsPage = () => {
    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-24 md:py-36 px-4 md:px-0">
                <div
                    className="w-full md:grid md:grid-cols-4 md:gap-4"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar - Mobilde gizli */}
                    <div className="hidden md:block md:col-span-1">
                        <Sidebar />
                        <div className="mt-4">
                            <FriendsBar />
                        </div>
                    </div>

                    {/* Gruplar Bölümü */}
                    <div className="md:col-span-3">
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
                                <div className="flex items-center mb-4 md:mb-0">
                                    <div
                                        className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full text-white"
                                        style={{ backgroundColor: "#8c46ff" }}
                                    >
                                        <FaLayerGroup className="text-lg md:text-xl" />
                                    </div>
                                    <h1 className="text-xl md:text-2xl font-semibold text-white">
                                        Gruplarım
                                    </h1>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <PrimaryButtonOutline
                                        buttonText="Gruba Katıl"
                                        icon={<FaSignInAlt />}
                                    />
                                    <PrimaryButton
                                        buttonText="Grup Oluştur"
                                        icon={<FaPlus />}
                                    />
                                </div>
                            </div>

                            {/* Arama */}
                            <div className="relative w-full mb-4 md:mb-6">
                                <input
                                    type="text"
                                    placeholder="Gruplarım içinde ara..."
                                    ebounce
                                    ile
                                    bağlantılı
                                    fonksiyon
                                    className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </div>

                            {/* Sonuç yoksa */}
                            <div className="text-center py-8 md:py-10">
                                <div className="flex justify-center mb-3 md:mb-4">
                                    <FaRegFaceFrown className="text-5xl md:text-6xl text-neutral-600" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                    Sonuç bulunamadı
                                </h3>
                                <p className="text-sm md:text-base text-neutral-400">
                                    Katılımcısı olduğunuz grup bulunamadı.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupsPage;
