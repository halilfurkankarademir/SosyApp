import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { useParams } from "react-router-dom";
import { fakePosts } from "../../utils/constants";
import {
    FaHeart,
    FaComment,
    FaShare,
    FaBookmark,
    FaArrowLeft,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import FriendsBar from "../../components/common/SuggestionsCard";

const PostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");

    // Sahte bir yorum dizisi
    const [comments, setComments] = useState([
        {
            id: 1,
            username: "aylin_yildiz",
            profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
            content: "Çok güzel bir fotoğraf! Orada olmalıyım 😍",
            timestamp: "45 dakika önce",
            likes: 8,
        },
        {
            id: 2,
            username: "baris_kaya",
            profilePic: "https://randomuser.me/api/portraits/men/41.jpg",
            content: "Harika görünüyor! Bir dahaki sefere beni de çağır!",
            timestamp: "2 saat önce",
            likes: 5,
        },
    ]);

    useEffect(() => {
        // Gerçek uygulamada API'den çekilecek
        // Şimdilik sahte verileri kullanıyoruz
        const foundPost = fakePosts[parseInt(postId)];
        if (foundPost) {
            setPost(foundPost);
        }
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            // Yeni yorumu ekle
            const newComment = {
                id: comments.length + 1,
                username: "merve_demir", // Mevcut kullanıcı
                profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
                content: comment,
                timestamp: "Az önce",
                likes: 0,
            };
            setComments([newComment, ...comments]);
            setComment(""); // Formu sıfırla
        }
    };

    if (!post) {
        return (
            <>
                <Navbar />
                <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-24 md:py-36">
                    <p className="text-white">Gönderi yükleniyor...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen justify-center bg-neutral-900 z-10 py-24 md:py-36 px-4 md:px-0">
                {/* Grid Layout */}
                <div
                    className="w-full md:grid md:grid-cols-4 md:gap-4"
                    style={{ maxWidth: "84rem" }}
                >
                    {/* Sidebar - Mobilde gizli */}
                    <div className="hidden md:block md:col-span-1">
                        <Sidebar />
                        <div className="mt-4">
                            <FriendsBar />
                        </div>
                    </div>

                    {/* Post detayları ve yorumlar */}
                    <div className="md:col-span-3 space-y-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-neutral-400 hover:text-pink-500 transition mb-4"
                        >
                            <FaArrowLeft />
                            <span>Geri Dön</span>
                        </button>

                        {/* Gönderi Kartı */}
                        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white">
                            {/* Kullanıcı Bilgileri ve Zaman Bilgisi*/}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={post.profilePic}
                                        alt="Profil"
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm md:text-md">
                                            {post.username}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            1 saat
                                        </span>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                                    <FiMoreHorizontal className="text-lg" />
                                </button>
                            </div>

                            {/* Gönderi İçeriği */}
                            <div className="mb-4">
                                <p className="text-sm md:text-md">
                                    {post.content}
                                </p>
                            </div>

                            {/* Gönderi Medyası (Opsiyonel) */}
                            {post.photo && (
                                <div className="mb-4">
                                    <img
                                        src={post.photo}
                                        alt="Gönderi Medyası"
                                        className="w-full rounded-lg"
                                    />
                                </div>
                            )}

                            {/* İstatistikler */}
                            <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 border-t border-b border-neutral-700 py-2 md:py-3 my-3 md:my-4">
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <FaHeart />
                                        <span>{post.likes} beğeni</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <FaComment />
                                        <span>{post.comments} yorum</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <FaShare />
                                        <span>{post.shares} paylaşım</span>
                                    </div>
                                </div>
                            </div>

                            {/* Butonlar */}
                            <div className="flex items-center justify-around text-xs md:text-sm mb-4 md:mb-6">
                                <button className="flex items-center space-x-1 md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                                    <FaHeart className="text-md" />
                                    <span>Beğen</span>
                                </button>
                                <button className="flex items-center space-x-1 md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                                    <FaComment className="text-md" />
                                    <span>Yorum Yap</span>
                                </button>
                                <button className="flex items-center space-x-1 md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                                    <FaBookmark className="text-md" />
                                    <span>Kaydet</span>
                                </button>
                                <button className="flex items-center space-x-1 md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                                    <FaShare className="text-md" />
                                    <span>Paylaş</span>
                                </button>
                            </div>

                            {/* Yorum Ekleme */}
                            <form
                                onSubmit={handleCommentSubmit}
                                className="mb-4 md:mb-6"
                            >
                                <div className="flex items-start space-x-2">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/10.jpg"
                                        alt="Profil"
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <textarea
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            className="w-full p-2 md:p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base"
                                            placeholder="Düşüncelerini paylaş..."
                                            rows="2"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="mt-2 px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white text-xs md:text-sm hover:opacity-90 transition"
                                        >
                                            Yorum Yap
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Yorumlar Listesi */}
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-base md:text-lg font-semibold">
                                    Yorumlar ({comments.length})
                                </h3>

                                {comments.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start space-x-2 md:space-x-3 p-2 md:p-3 border-b border-neutral-700"
                                    >
                                        <img
                                            src={item.profilePic}
                                            alt="Profil"
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-medium text-xs md:text-sm">
                                                    {item.username}
                                                </span>
                                                <span className="text-xs text-neutral-400">
                                                    {item.timestamp}
                                                </span>
                                            </div>
                                            <p className="text-xs md:text-sm text-neutral-300">
                                                {item.content}
                                            </p>
                                            <div className="flex items-center mt-1 md:mt-2 text-xs text-neutral-400 space-x-3 md:space-x-4">
                                                <button className="hover:text-pink-500 transition">
                                                    Beğen ({item.likes})
                                                </button>
                                                <button className="hover:text-pink-500 transition">
                                                    Yanıtla
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
