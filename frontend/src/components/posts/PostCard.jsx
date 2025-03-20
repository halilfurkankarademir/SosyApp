import React, { useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigation } from "../../context/NavigationContext";
import { BsFillPinAngleFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PostCard = ({
    postId,
    username,
    profilePic,
    content,
    photo,
    likes,
    comments,
    shares,
}) => {
    const { navigateToPage } = useNavigation();
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg text-white mb-6 cursor-pointer">
            {/* Kullanıcı Bilgileri ve Zaman Bilgisi*/}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={profilePic}
                        alt="Profil"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-md">{username}</span>
                        <span className="text-xs text-gray-400">1 saat</span>
                    </div>
                </div>
                <button
                    className="text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer"
                    onClick={() => setShowMore(!showMore)}
                >
                    <FiMoreHorizontal className="text-lg" />
                </button>
            </div>

            {/* Gönderi İçeriği */}
            <div className="mb-4">
                <p className="text-md">{content}</p>
            </div>

            {/* Gönderi Medyası (Opsiyonel) */}
            {photo && (
                <div className="mb-4">
                    <LazyLoadImage
                        src={photo}
                        alt="Gönderi Medyası"
                        effect="blur"
                        className="w-full rounded-lg"
                    />
                </div>
            )}

            {/* İstatistikler ve Butonlar */}
            <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                    <div className="flex flex-row items-center justify-center gap-1 text-md">
                        <FaHeart className="" />
                        <span>{likes} </span>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-md">
                        <FaComment className="" />
                        <span>{comments} </span>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-md">
                        <FaShare className="" />
                        <span>{shares} </span>
                    </div>
                </div>
            </div>

            {/* Butonlar */}
            <div className="flex items-center justify-around mt-4 border-t border-neutral-700 pt-4 text-sm">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaHeart className="text-md" />
                    <span>Beğen</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaComment className="text-md" />
                    <span>Yorum Yap</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <BsFillPinAngleFill className="text-md" />
                    <span>Kaydet</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaShare className="text-md" />
                    <span>Paylaş</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
