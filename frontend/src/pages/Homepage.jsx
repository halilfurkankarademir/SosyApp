import React, { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import NewPost from "../components/posts/NewPost";
import PostCard from "../components/posts/PostCard";
import { fakePosts } from "../utils/constants";
import FriendsBar from "../components/common/FriendsBar";

const HomePage = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Ekran boyutunu izleme
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ana Sayfa";
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // İlk yükleme kontrolü
        checkScreenWidth();

        // Ekran boyutu değiştiğinde kontrol et
        window.addEventListener("resize", checkScreenWidth);

        // Temizleme fonksiyonu
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);

    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 pt-20 pb-16 px-4 md:py-36 md:px-6">
                {/* Responsive Grid Layout */}
                <div
                    className="w-full grid grid-cols-1 md:grid-cols-4 gap-6"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar - Mobilde gizli, md ve üzeri ekranlarda görünür */}
                    <div className="hidden md:block md:col-span-1">
                        <Sidebar />
                        <div className="mt-4">
                            <FriendsBar />
                        </div>
                    </div>

                    {/* Post ekleme ve goruntileme kismi */}
                    <div className="col-span-1 md:col-span-3">
                        <NewPost />
                        <div className="mt-4 space-y-4">
                            {fakePosts.map((post, index) => (
                                <PostCard
                                    key={index}
                                    postId={index}
                                    username={post.username}
                                    profilePic={post.profilePic}
                                    content={post.content}
                                    photo={post.photo}
                                    likes={post.likes}
                                    comments={post.comments}
                                    shares={post.shares}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobil Alt Menü - Sadece mobil ekranlarda görünür */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-neutral-700 py-2 px-4 z-50">
                    <div className="flex justify-around items-center">
                        <button className="p-2 text-white hover:text-pink-500 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </button>
                        <button className="p-2 text-white hover:text-pink-500 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        <button className="p-2 text-white hover:text-pink-500 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>
                        <button className="p-2 text-white hover:text-pink-500 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;
