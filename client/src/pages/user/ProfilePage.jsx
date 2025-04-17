import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import PostCard from "../../components/features/posts/PostCard";
import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ui/cards/ProfileCard";
import { fakePosts } from "../../constants/fakeDatas";
import { getCurrentUser, getUserByUsername } from "../../api/userApi";
import LoadingPage from "../public/LoadingPage";

const ProfilePage = () => {
    // Kullanıcının kendi profili mi kontrolü için bir state (gerçek uygulamada auth ile kontrol edilir)
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [posts, setPosts] = useState(fakePosts);
    // Guncel profil sayfasinin bilgileri
    const [userProfile, setUserProfile] = useState(null);

    //Burada username parametresi aliniyor ve kullanıcı verileri cekiliyor.
    const { username } = useParams();

    const fetchUser = async () => {
        try {
            // Parametrelerden gelen kullanici adına gore kullanici bilgileri cekiliyor
            const fetchedUser = await getUserByUsername(username);
            // Guncel kullanici bilgileri aliniyor
            const currentUser = await getCurrentUser();
            if (!fetchedUser) {
                console.error("User not found");
                return;
            }
            setUserProfile(fetchedUser);
            // Kullanici bilgileri ile guncel kullanici bilgileri karsilastiriliyor
            // Eğer eşleşiyorsa kendi profilindeyiz demektir
            setIsOwnProfile(fetchedUser.username === currentUser.username);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchUser();
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
                            isOwnProfile={isOwnProfile}
                        />
                        {/* Sağ Taraf - Gönderiler ve İçerik */}
                        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                            {/* Gönderi Oluşturma Alanı */}

                            {/* Gönderiler */}
                            <div className="space-y-6">
                                {posts.map((post, index) => (
                                    <PostCard key={index} postData={post} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
