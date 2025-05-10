import React, { useEffect, useState, useCallback } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ui/cards/ProfileCard";
import { getUserByUsername } from "../../api/userApi";
import LoadingPage from "../public/LoadingPage";
import { fetchPostsByUserId } from "../../api/postApi";
import { followUser, unfollowUser } from "../../api/followApi";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import RenderPosts from "../../components/features/posts/RenderPosts";

const ProfilePage = () => {
    // Guncel profil sayfasinin bilgileri
    const [userProfile, setUserProfile] = useState(null);

    //Burada username parametresi aliniyor ve kullanıcı verileri cekiliyor.
    const { username } = useParams();

    const fetchDatas = async () => {
        try {
            // 1. Profil kullanıcısını al
            const fetchedUser = await getUserByUsername(username);
            console.log(fetchedUser);
            if (!fetchedUser) {
                console.error("User not found for username:", username);
                return;
            }
            setUserProfile(fetchedUser);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    // Kullanicinin gonderilerini cekmek icin kullanilacak fonksiyon
    const userPostFetcher = useCallback(
        async (page) => {
            if (!userProfile) {
                // userId henüz yüklenmemişse veya yoksa hata yönetimi
                console.error("User ID is not available yet.");
                return { posts: [], count: 0 }; // Veya bir hata fırlat
            }
            // fetchPostsByUserId'yi DOĞRU argümanlarla çağır
            return fetchPostsByUserId(userProfile.uid, page);
        },
        [userProfile]
    );

    const handleFollow = async () => {
        try {
            // Takip etmiyor ise takip et
            if (!userProfile.isFollowing) {
                const response = await followUser(userProfile.uid);
                if (response.status === 200) {
                    console.log("User followed successfully");
                }
                ShowToast("success", `${userProfile.username} takip ediliyor.`);
            } else {
                const response = await unfollowUser(userProfile.uid);
                if (response.status === 200) {
                    console.log("User unfollowed successfully");
                }
                ShowToast("info", `${userProfile.username} takipten çıkıldı.`);
            }
        } catch (error) {
            console.error("Error following user:", error);
        } finally {
            fetchDatas();
        }
    };

    const handleShareProfile = () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl);
        ShowToast("success", "Profil linki kopyalandı.");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDatas();
    }, []);

    if (!userProfile) {
        return <LoadingPage />;
    }

    return (
        <>
            <div className="bg-neutral-900 min-h-screen text-white px-4 md:px-8 lg:px-20 py-52 md:py-48 lg:py-60">
                {/* Profil Bilgileri */}
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row -mt-20 mb-6">
                        {/* Sol Taraf - Profil Resmi ve Temel Bilgiler */}
                        <ProfileCard
                            user={userProfile}
                            handleFollow={handleFollow}
                            handleShareProfile={handleShareProfile}
                        />
                        {/* Sağ Taraf - Gönderiler ve İçerik */}
                        <div className="md:w-2/3 md:pl-6  ">
                            {/*Kullaniciya ait gonderilerin listelenmesi*/}
                            <RenderPosts
                                fetchOptions={userPostFetcher}
                                canCreatePost={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
