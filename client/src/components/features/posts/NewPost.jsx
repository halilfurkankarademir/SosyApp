import React, { useState, useEffect, useRef } from "react";
import { FaSmile, FaCamera } from "react-icons/fa";
import FeelingsCard from "../../ui/cards/FeelingsCard";
import { MdDelete } from "react-icons/md";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LuShare } from "react-icons/lu";
import { ShowToast } from "../../ui/toasts/ShowToast";
import { imageUpload } from "../../../api/imageUpload";
import { createNewPost } from "../../../api/postApi";
import useUserStore from "../../../hooks/useUserStore";
import resizeImage from "../../../utils/resizeImage";

const NewPost = ({ onPostCreated }) => {
    const [image, setImage] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [showFeelings, setShowFeelings] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [selectedFilePreview, setSelectedFilePreview] = useState(null);

    const feelingsRef = useRef(null);
    const fileInputRef = useRef(null);

    const user = useUserStore((state) => state.user);

    const handleShare = async () => {
        try {
            if (!postContent.trim() && !image) {
                ShowToast("warning", "Lütfen bir içerik veya resim ekleyin");
                return;
            }

            setIsSharing(true);

            let imageUrl = null;
            if (image) {
                imageUrl = await imageUpload(image);
                setSelectedFilePreview(null);
            }

            await createNewPost({
                content: postContent,
                media: imageUrl,
            });

            ShowToast("success", "Gönderi başarıyla paylaşıldı");
            onPostCreated();

            // Formu temizle
            setPostContent("");
            setImage(null);
            setSelectedFilePreview(null);
        } catch (error) {
            console.error("Paylaşım hatası:", error);
            const errorMessage =
                error.response?.data?.message ||
                "Gönderi paylaşılırken bir hata oluştu";
            ShowToast("error", errorMessage);
        } finally {
            setIsSharing(false);
        }
    };

    const handleClickEmoji = (value) => {
        setPostContent((prev) => prev + value);
        setShowFeelings(false);
    };

    const handleClickOutside = (event) => {
        if (
            feelingsRef.current &&
            !feelingsRef.current.contains(event.target)
        ) {
            setShowFeelings(false);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const resizedImage = await resizeImage(file, 1080, 1080);
            setImage(resizedImage);
            setSelectedFilePreview(URL.createObjectURL(file));
        }
    };

    const clearSelectedFile = () => {
        setSelectedFilePreview(null);
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) {
        return null; // veya bir yükleme spinner'ı göster
    }

    return (
        <div className="bg-neutral-800 rounded-xl p-3 md:p-4 mb-4 md:mb-4">
            <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-3">
                <img
                    src={user.profilePicture}
                    alt="Profil"
                    aria-label="Profil Fotoğrafı"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    loading="lazy"
                />
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={`Ne düşünüyorsun, ${user.firstName}?`}
                    className="bg-neutral-700 text-white rounded-full py-1.5 md:py-2 px-3 md:px-4 w-full text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={1}
                />
            </div>

            <div className="flex flex-wrap justify-between border-t border-neutral-700 pt-2 md:pt-3">
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <button
                        type="button"
                        className="flex items-center space-x-1 text-gray-400 hover:text-blue-500 transition text-xs md:text-sm cursor-pointer"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaCamera className="text-sm md:text-base" />
                        <span className="hidden xs:inline">Fotoğraf</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <button
                        type="button"
                        className="flex items-center space-x-1 text-gray-400 hover:text-yellow-500 transition text-xs md:text-sm cursor-pointer"
                        onClick={() => setShowFeelings(!showFeelings)}
                    >
                        <FaSmile className="text-sm md:text-base" />
                        <span className="hidden xs:inline">Hisler</span>
                    </button>

                    {showFeelings && (
                        <div ref={feelingsRef} className="absolute mt-10 z-10">
                            <FeelingsCard handleClickEmoji={handleClickEmoji} />
                        </div>
                    )}
                </div>

                <PrimaryButton
                    buttonText={isSharing ? "Paylaşılıyor..." : "Paylaş"}
                    disabled={isSharing}
                    handleClick={handleShare}
                    icon={<LuShare size={16} />}
                />
            </div>

            {selectedFilePreview && (
                <div className="mt-2 md:mt-3 flex items-center space-x-2">
                    <LazyLoadImage
                        src={selectedFilePreview}
                        alt="Selected"
                        className="w-20 h-14 md:w-24 md:h-16 object-cover rounded-lg"
                        threshold={100}
                        effect="blur"
                        placeholderSrc={`${selectedFilePreview}?q=10&w=20`}
                    />
                    <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 transition"
                        onClick={clearSelectedFile}
                    >
                        <MdDelete className="text-lg" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewPost;
