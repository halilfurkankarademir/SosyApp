import React from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import NewPost from "../components/posts/NewPost";
import PostCard from "../components/posts/PostCard";
import { fakePosts } from "../utils/constants";
import FriendsBar from "../components/common/FriendsBar";

const HomePage = () => {
    return (
        <>
            <Navbar isInAppPage={true} />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-36">
                {/* Grid Layout */}
                <div
                    className="grid grid-cols-4 w-full"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar (Ekranın 1/3'ü) */}
                    <div className="col-span-1">
                        <Sidebar />
                        <div className="mt-4">
                            <FriendsBar />
                        </div>
                    </div>

                    {/* Post ekleme ve goruntileme kismi (Ekranın 2/3'ü) */}
                    <div className="col-span-3">
                        <NewPost />
                        <div className="mt-4">
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
        </>
    );
};

export default HomePage;
