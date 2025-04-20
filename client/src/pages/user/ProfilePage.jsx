import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import PostCard from "../../components/features/posts/PostCard";
import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ui/cards/ProfileCard";
import { getCurrentUser, getUserByUsername } from "../../api/userApi";
import LoadingPage from "../public/LoadingPage";
import { fetchPostsByUserId } from "../../api/postApi";
import { FaHeartBroken, FaSadTear } from "react-icons/fa";
import {
    checkFollowStatus,
    followUser,
    unfollowUser,
} from "../../api/followApi";
import { ShowToast } from "../../components/ui/toasts/ShowToast";

const ProfilePage = () => {
    // Kullanıcının kendi profili mi kontrolü için bir state (gerçek uygulamada auth ile kontrol edilir)
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    // Guncel profil sayfasinin bilgileri
    const [userProfile, setUserProfile] = useState(null);

    //Burada username parametresi aliniyor ve kullanıcı verileri cekiliyor.
    const { username } = useParams();

    const fetchDatas = async () => {
        try {
            // Parametrelerden gelen kullanici adına gore kullanici bilgileri cekiliyor
            const fetchedUser = await getUserByUsername(username);
            // Guncel kullanici bilgileri aliniyor
            const currentUser = await getCurrentUser();
            if (!fetchedUser) {
                console.error("User not found");
                return;
            }

            const followStatus = await checkFollowStatus(fetchedUser.uid);

            setIsFollowing(followStatus);
            setUserProfile(fetchedUser);
            // Kullanici bilgileri ile guncel kullanici bilgileri karsilastiriliyor
            // Eğer eşleşiyorsa kendi profilindeyiz demektir
            setIsOwnProfile(fetchedUser.username === currentUser.username);

            // Kullanıcıya ait postlar cekiliyor
            const fetchedPosts = await fetchPostsByUserId(fetchedUser.uid);
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleFollow = async () => {
        try {
            // Takip etmiyor ise takip et
            if (!isFollowing) {
                const response = await followUser(userProfile.uid);
                if (response.status === 200) {
                    console.log("User followed successfully");
                }
                setIsFollowing(true);
                ShowToast("success", "Kullanıcı takip ediliyor.");
            } else {
                const response = await unfollowUser(userProfile.uid);
                if (response.status === 200) {
                    console.log("User unfollowed successfully");
                }
                setIsFollowing(false);
                ShowToast("info", "Kullanıcı takipten çıkıldı.");
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
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
            <Navbar isInAppPage={true} />
            <div className="bg-neutral-900 min-h-screen text-white px-4 md:px-8 lg:px-20 py-36 md:py-48 lg:py-72">
                {/* Profil Bilgileri */}
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row -mt-20 mb-6">
                        {/* Sol Taraf - Profil Resmi ve Temel Bilgiler */}
                        <ProfileCard
                            user={userProfile}
                            postCount={posts.length}
                            isOwnProfile={isOwnProfile}
                            handleFollow={handleFollow}
                            isFollowing={isFollowing}
                        />
                        {/* Sağ Taraf - Gönderiler ve İçerik */}
                        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                            {/*Kullaniciya ait gonderilerin listelenmesi*/}
                            {posts && posts.length > 0 ? (
                                <div>
                                    {posts.map((post, index) => (
                                        <PostCard key={index} postData={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 md:py-24">
                                    <div className="flex justify-center ">
                                        <FaSadTear className="text-5xl md:text-6xl text-neutral-600" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold text-white ">
                                        Gönderi bulunamadı
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-400">
                                        Bu kullanıcıya ait gönderi bulunamadı.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
