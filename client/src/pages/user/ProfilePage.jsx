import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import PostCard from "../../components/features/posts/PostCard";
import { fakePosts, fakeUserProfile } from "../../utils/constants";
import Navbar from "../../components/common/Navbar";
import { useNavigation } from "../../context/NavigationContext";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ui/cards/ProfileCard";

const ProfilePage = () => {
    // Kullanıcının kendi profili mi kontrolü için bir state (gerçek uygulamada auth ile kontrol edilir)
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const [posts, setPosts] = useState(fakePosts);

    //Burada username parametresi aliniyor ve kullanıcı verileri cekiliyor.
    const { username } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        const name = fakeUserProfile[0].fullName;
        if (name) {
            document.title = name;
        } else {
            document.title = "Profil";
        }
        //todo buraya kullanici idsi ile filtreleme yapilacak
        const filteredPosts = fakePosts.filter((post) => {
            return post.username === username;
        });
        setPosts(filteredPosts);
    }, []);

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="bg-neutral-900 min-h-screen text-white px-4 md:px-8 lg:px-20 py-36 md:py-48 lg:py-72">
                {/* Profil Bilgileri */}
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row -mt-20 mb-6">
                        {/* Sol Taraf - Profil Resmi ve Temel Bilgiler */}
                        <ProfileCard
                            profile={fakeUserProfile[0]}
                            isOwnProfile={isOwnProfile}
                        />
                        {/* Sağ Taraf - Gönderiler ve İçerik */}
                        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                            {/* Gönderi Oluşturma Alanı */}

                            {/* Gönderiler */}
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <PostCard
                                        key={post.postId}
                                        postData={post}
                                    />
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
