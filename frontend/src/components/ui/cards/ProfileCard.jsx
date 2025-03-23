import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdVerified } from "react-icons/md";
import { PrimaryButton, SecondaryButton } from "../buttons";
import { FaCog, FaEdit, FaEnvelope, FaUserPlus } from "react-icons/fa";
import { useNavigation } from "../../../context/NavigationContext";

const ProfileCard = ({ profile, isOwnProfile }) => {
    const { navigateToPage } = useNavigation();

    return (
        <div className="w-full md:w-1/3">
            <div className="bg-neutral-800 rounded-xl p-4 md:p-6 shadow-lg">
                {/* Profil Resmi */}
                <div className="relative mb-4 w-24 h-24 md:w-32 md:h-32 mx-auto -mt-16 md:-mt-20">
                    <LazyLoadImage
                        src={profile.profilePicture}
                        alt="Profil"
                        className="w-full h-full rounded-full object-cover border-4 border-neutral-800"
                    />
                </div>

                {/* Temel Bilgiler */}
                <div className="text-center">
                    <div className="flex flex-row text-xl justify-center items-center">
                        <h1 className=" md:text-2xl font-bold">
                            {profile.fullName}
                        </h1>
                        {profile.verified && (
                            <MdVerified
                                className="text-blue-400 ml-2"
                                title="Onaylanmış Kullanıcı"
                            />
                        )}
                    </div>
                    <p className="text-blue-400 font-medium">
                        {profile.username}
                    </p>
                    <p className="text-gray-400 my-2 text-sm md:text-base">
                        {profile.job}
                    </p>
                    <p className="my-3 text-gray-300 text-sm md:text-base">
                        {profile.bio}
                    </p>
                </div>

                {/* İstatistikler */}
                <div className="grid grid-cols-3 gap-2 my-4 text-center">
                    <div className="p-2 rounded-lg bg-neutral-700/50">
                        <div className="font-bold text-lg md:text-xl">
                            {profile.postsCount}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                            Gönderi
                        </div>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-700/50">
                        <div className="font-bold text-lg md:text-xl">
                            {profile.followers.length}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                            Takipçi
                        </div>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-700/50">
                        <div className="font-bold text-lg md:text-xl">
                            {profile.following.length}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                            Takip
                        </div>
                    </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex flex-col space-y-2">
                    {isOwnProfile ? (
                        <>
                            <PrimaryButton
                                buttonText={"Profili Düzenle"}
                                handleClick={() =>
                                    navigateToPage("/profile/edit")
                                }
                                icon={<FaEdit />}
                            />
                            <SecondaryButton
                                icon={<FaCog />}
                                buttonText="Ayarlar"
                                handleClick={() => navigateToPage("/settings")}
                            />
                        </>
                    ) : (
                        <>
                            <PrimaryButton
                                buttonText={"Arkadaş Ekle"}
                                handleClick={() => {}}
                                icon={<FaUserPlus size={20} />}
                            />
                            <SecondaryButton
                                icon={<FaEnvelope />}
                                buttonText="Mesaj Gönder"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
