import React, { useEffect, useState } from "react";
import {
    FaCamera,
    FaEnvelope,
    FaUserPlus,
    FaLink,
    FaStar,
    FaEdit,
    FaCog,
} from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import PostCard from "../components/posts/PostCard";
import { fakePosts, fakeUserProfile } from "../utils/constants";
import Navbar from "../components/common/Navbar";
import { useNavigation } from "../context/NavigationContext";
import { useParams } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("posts");
    // Kullanıcının kendi profili mi kontrolü için bir state (gerçek uygulamada auth ile kontrol edilir)
    const [isOwnProfile, setIsOwnProfile] = useState(true);
    const { navigateToPage } = useNavigation();
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
            return post.username === "ayseyilmaz";
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
                        <div className="w-full md:w-1/3">
                            <div className="bg-neutral-800 rounded-xl p-4 md:p-6 shadow-lg">
                                {/* Profil Resmi */}
                                <div className="relative mb-4 w-24 h-24 md:w-32 md:h-32 mx-auto -mt-16 md:-mt-20">
                                    <LazyLoadImage
                                        src={fakeUserProfile[0].profilePicture}
                                        alt="Profil"
                                        className="w-full h-full rounded-full object-cover border-4 border-neutral-800"
                                    />
                                </div>

                                {/* Temel Bilgiler */}
                                <div className="text-center">
                                    <div className="flex flex-row text-xl justify-center items-center">
                                        <h1 className=" md:text-2xl font-bold">
                                            {fakeUserProfile[0].fullName}
                                        </h1>
                                        {fakeUserProfile[0].verified && (
                                            <MdVerified
                                                className="text-blue-400 ml-2"
                                                title="Onaylanmış Kullanıcı"
                                            />
                                        )}
                                    </div>
                                    <p className="text-blue-400 font-medium">
                                        {fakeUserProfile[0].username}
                                    </p>
                                    <p className="text-gray-400 my-2 text-sm md:text-base">
                                        {fakeUserProfile[0].job}
                                    </p>
                                    <p className="my-3 text-gray-300 text-sm md:text-base">
                                        {fakeUserProfile[0].bio}
                                    </p>
                                </div>

                                {/* İstatistikler */}
                                <div className="grid grid-cols-3 gap-2 my-4 text-center">
                                    <div className="p-2 rounded-lg bg-neutral-700/50">
                                        <div className="font-bold text-lg md:text-xl">
                                            {fakeUserProfile[0].postsCount}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-400">
                                            Gönderi
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-neutral-700/50">
                                        <div className="font-bold text-lg md:text-xl">
                                            {
                                                fakeUserProfile[0].followers
                                                    .length
                                            }
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-400">
                                            Takipçi
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-neutral-700/50">
                                        <div className="font-bold text-lg md:text-xl">
                                            {
                                                fakeUserProfile[0].following
                                                    .length
                                            }
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
                                            <button
                                                onClick={() =>
                                                    navigateToPage(
                                                        "/profile/edit"
                                                    )
                                                }
                                                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white py-2 px-4 rounded-full transition flex items-center justify-center space-x-2 cursor-pointer"
                                            >
                                                <FaEdit />
                                                <span>Profili Düzenle</span>
                                            </button>
                                            <button
                                                className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-4 rounded-full transition flex items-center justify-center space-x-2 cursor-pointer"
                                                onClick={() =>
                                                    navigateToPage("/settings")
                                                }
                                            >
                                                <FaCog />
                                                <span>Ayarlar</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition flex items-center justify-center space-x-2">
                                                <FaUserPlus />
                                                <span>Takip Et</span>
                                            </button>
                                            <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-2 px-4 rounded-full transition flex items-center justify-center space-x-2">
                                                <FaEnvelope />
                                                <span>Mesaj Gönder</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sağ Taraf - Gönderiler ve İçerik */}
                        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
                            {/* Gönderi Oluşturma Alanı */}

                            {/* Gönderiler */}
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <PostCard
                                        key={post.postId}
                                        postId={post.postId}
                                        username={post.username}
                                        profilePic={post.profilePic}
                                        content={post.content}
                                        photo={post.photo}
                                        likes={post.likes}
                                        comments={post.comments}
                                        shares={post.shares}
                                        date={post.date}
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
