import React from "react";
import { Navbar, Sidebar } from "../../components/common";
import { FaLayerGroup, FaPlus, FaSearch, FaSignInAlt } from "react-icons/fa";
import { FaRegFaceFrown } from "react-icons/fa6";
import {
    PrimaryButton,
    PrimaryButtonOutline,
} from "../../components/ui/buttons";
import LargeSearchInput from "../../components/ui/inputs/LargeSearchInput";

const GroupsPage = () => {
    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="page-container py-24 md:py-36 px-4 md:px-0">
                <div className="page-grid-layout-other">
                    {/* Sidebar - Mobilde gizli */}
                    <Sidebar />

                    {/* Gruplar Bölümü */}
                    <div className="md:col-span-3  md:ml-72 w-full">
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

                            {/* Arama inputu */}
                            <LargeSearchInput placeholderText="Gruplarım İçinde Ara.." />

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
