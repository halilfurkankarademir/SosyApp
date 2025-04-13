import React, { useEffect, useState, useRef } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa6";
import { useNavigation } from "../../../context/NavigationContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getDateDiff } from "../../../utils/helpers";

const PostCard = ({ postData, handleRemove }) => {
    const { navigateToPage } = useNavigation();
    const [showMore, setShowMore] = useState(false);
    const moreMenuRef = useRef(null);
    const { id, user, createdAt, content, likes, comments, shares, media } =
        postData;

    const postDate = getDateDiff(createdAt);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                moreMenuRef.current &&
                !moreMenuRef.current.contains(event.target)
            ) {
                setShowMore(false);
            }
        };

        if (showMore) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMore]);

    return (
        <div className="bg-neutral-800 p-4 md:p-6 rounded-lg shadow-lg text-white mb-4 md:mb-6 ">
            {/* Kullanıcı Bilgileri ve Zaman Bilgisi*/}
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer">
                    <img
                        src={
                            user.profilePicture ||
                            "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                        }
                        alt="Profil"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm md:text-md">
                            {user.username || "username"}
                        </span>
                        <span className="text-xs text-gray-400">
                            {postDate}
                        </span>
                    </div>
                </div>
                <div className="relative" ref={moreMenuRef}>
                    <button
                        className="text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer"
                        onClick={() => setShowMore(!showMore)}
                    >
                        <FiMoreHorizontal className="text-lg" />
                    </button>

                    {showMore && (
                        <div className="absolute right-0 top-8 bg-neutral-800 border-2 border-neutral-700 rounded-lg p-2 w-48 animate-fade-in z-50">
                            <button
                                className="w-full text-left px-2 py-1 hover:bg-neutral-700 rounded"
                                onClick={() => {
                                    handleRemove(postData.id);
                                    setShowMore(false);
                                }}
                            >
                                Gönderiyi Sil
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Gönderi İçeriği */}
            <div className="mb-3 md:mb-4">
                <p className="text-sm md:text-md">{content}</p>
            </div>

            {/* Gönderi Medyası (Opsiyonel) */}
            {media && (
                <div className="mb-3 md:mb-4">
                    <LazyLoadImage
                        src={media}
                        alt="Gönderi Medyası"
                        effect="blur"
                        className="w-full rounded-lg object-cover"
                        threshold={200}
                        placeholderSrc={`${media}?q=10&w=50`}
                        srcSet={`
                            ${media}?q=75&w=500 500w,
                            ${media}?q=75&w=800 800w,
                            ${media}?q=75&w=1080 1080w,
                            ${media}?q=75&w=1200 1200w
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
                        <span>{likes.length} </span>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-xs md:text-base">
                        <FaComment className="" />
                        <span>{comments.length} </span>
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
