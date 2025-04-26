import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import PostCard from "../../components/features/posts/PostCard";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ui/cards/ProfileCard";
import { getCurrentUser, getUserByUsername } from "../../api/userApi";
import LoadingPage from "../public/LoadingPage";
import { fetchPostsByUserId } from "../../api/postApi";
import { FaSadTear } from "react-icons/fa";
import {
    checkFollowStatus,
    followUser,
    getFollowers,
    getFollowersByUserId,
    getFollowingByUserId,
    unfollowUser,
} from "../../api/followApi";
import { ShowToast } from "../../components/ui/toasts/ShowToast";
import useUserStore from "../../hooks/useUserStore";

const ProfilePage = () => {
    // Kullanıcının kendi profili mi kontrolü için bir state (gerçek uygulamada auth ile kontrol edilir)
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    // Guncel profil sayfasinin bilgileri
    const [userProfile, setUserProfile] = useState(null);

    //Burada username parametresi aliniyor ve kullanıcı verileri cekiliyor.
    const { username } = useParams();

    const setUser = useUserStore((state) => state.setUser);

    const fetchDatas = async () => {
        try {
            // 1. Profil kullanıcısını al
            const fetchedUser = await getUserByUsername(username);
            if (!fetchedUser) {
                console.error("User not found for username:", username);
                return;
            }
            setUserProfile(fetchedUser);

            // 2. Mevcut (giriş yapmış) kullanıcıyı al
            const currentUser = await getCurrentUser();
            setUser(currentUser);

            // 3. Profilin mevcut kullanıcıya ait olup olmadığını belirle
            // currentUser yoksa veya username eşleşmiyorsa kendi profili değildir.
            const isOwn =
                !!currentUser && fetchedUser.username === currentUser.username;
            setIsOwnProfile(isOwn);

            // 4. Takip durumunu kontrol et
            let followingStatus = false;
            if (!isOwn && currentUser) {
                followingStatus = await checkFollowStatus(fetchedUser.uid);
            }
            setIsFollowing(followingStatus);

            // 5. Profil kullanıcısının takipçi ve takip ettiklerini HER ZAMAN al
            // Bu iki isteği paralel olarak yapmak performansı artırabilir
            const [followers, following] = await Promise.all([
                getFollowersByUserId(fetchedUser.uid),
                getFollowingByUserId(fetchedUser.uid),
            ]);

            setFollowerCount(followers.length);
            setFollowingCount(following.length);

            // 6. Profil kullanıcısının postlarını al
            const fetchedPosts = await fetchPostsByUserId(fetchedUser.uid);
            console.log(fetchedPosts);
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching profile data:", error);
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
                setFollowerCount(followerCount + 1);
                ShowToast("success", "Kullanıcı takip ediliyor.");
            } else {
                const response = await unfollowUser(userProfile.uid);
                if (response.status === 200) {
                    console.log("User unfollowed successfully");
                }
                setIsFollowing(false);
                setFollowerCount(followerCount - 1);
                ShowToast("info", "Kullanıcı takipten çıkıldı.");
            }
        } catch (error) {
            console.error("Error following user:", error);
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
            <div className="bg-neutral-900 min-h-screen text-white px-4 md:px-8 lg:px-20 py-52 md:py-48 lg:py-72">
                {/* Profil Bilgileri */}
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row -mt-20 mb-6">
                        {/* Sol Taraf - Profil Resmi ve Temel Bilgiler */}
                        <ProfileCard
                            user={userProfile}
                            postCount={posts.length}
                            isOwnProfile={isOwnProfile}
                            handleFollow={handleFollow}
                            handleShareProfile={handleShareProfile}
                            isFollowing={isFollowing}
                            followerCount={followerCount}
                            followingCount={followingCount}
                        />
                        {/* Sağ Taraf - Gönderiler ve İçerik */}
                        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                            {/*Kullaniciya ait gonderilerin listelenmesi*/}
                            {posts && posts.length > 0 ? (
                                <div>
                                    {posts.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            postData={post}
                                            onPostRemove={fetchDatas}
                                        />
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
