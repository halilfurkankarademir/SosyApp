import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa6";
import { useNavigation } from "../../../context/NavigationContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getDateDiff } from "../../../utils/helpers";

const PostCard = ({ postData }) => {
    const { navigateToPage } = useNavigation();
    const [showMore, setShowMore] = useState(false);
    const {
        profilePic,
        username,
        createdAt,
        content,
        likes,
        comments,
        shares,
        photo,
    } = postData;

    const postDate = getDateDiff(createdAt);

    useEffect(() => {
        console.log(postData.entries);
    }, []);

    return (
        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white mb-4 md:mb-6 ">
            {/* Kullanıcı Bilgileri ve Zaman Bilgisi*/}
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer">
                    <img
                        src={profilePic}
                        alt="Profil"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm md:text-md">{username}</span>
                        <span className="text-xs text-gray-400">
                            {postDate}
                        </span>
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
            <div className="mb-3 md:mb-4">
                <p className="text-sm md:text-md">{content}</p>
            </div>

            {/* Gönderi Medyası (Opsiyonel) */}
            {photo && (
                <div className="mb-3 md:mb-4">
                    <LazyLoadImage
                        src={photo}
                        alt="Gönderi Medyası"
                        effect="blur"
                        className="w-full rounded-lg"
                        threshold={200}
                        placeholderSrc={`${photo}?q=10&w=50`}
                        srcSet={`
                            ${photo}?q=75&w=500 500w,
                            ${photo}?q=75&w=800 800w,
                            ${photo}?q=75&w=1080 1080w,
                            ${photo}?q=75&w=1200 1200w
                        `}
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>
            )}

            {/* İstatistikler ve Butonlar */}
            <div className="flex items-center justify-between text-xs md:text-md text-gray-400">
                <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="flex flex-row items-center justify-center gap-1 text-xs md:text-base">
                        <FaHeart className="" />
                        <span>{likes} </span>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-xs md:text-base">
                        <FaComment className="" />
                        <span>{comments} </span>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-xs md:text-base">
                        <FaShare className="" />
                        <span>{shares} </span>
                    </div>
                </div>
            </div>

            {/* Butonlar */}
            <div className="flex items-center justify-around mt-3 md:mt-4 border-t border-neutral-700 pt-3 md:pt-4 text-xs md:text-base">
                <button className="flex flex-col md:flex-row items-center md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaHeart className="text-md mb-1 md:mb-0" />
                    <span className="hidden md:inline">Beğen</span>
                </button>
                <button className="flex flex-col md:flex-row items-center md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaComment className="text-md mb-1 md:mb-0" />
                    <span className="hidden md:inline">Yorum Yap</span>
                </button>
                <button className="flex flex-col md:flex-row items-center md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaBookmark className="text-md mb-1 md:mb-0" />
                    <span className="hidden md:inline">Kaydet</span>
                </button>
                <button className="flex flex-col md:flex-row items-center md:space-x-2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer">
                    <FaShare className="text-md mb-1 md:mb-0" />
                    <span className="hidden md:inline">Paylaş</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
