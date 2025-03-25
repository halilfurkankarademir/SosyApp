import React, { useState, useEffect, useRef } from "react";
import { FaSmile, FaCamera, FaPoll } from "react-icons/fa";
import FeelingsCard from "../../ui/cards/FeelingsCard";
import { MdDelete } from "react-icons/md";
import { getFirstName } from "../../../utils/helpers";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PollModal from "../../ui/modals/PollModal";
import { LuShare } from "react-icons/lu";
import { ShowToast } from "../../ui/toasts/ShowToast";
import { imageUpload } from "../../../api/imageUpload";
import { fakeUserProfile } from "../../../constants/fakeDatas";

const NewPost = () => {
    const [image, setImage] = useState("");
    const [postContent, setPostContent] = useState("");
    const [showFeelings, setShowFeelings] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [selectedFilePreview, setSelectedFilePreview] = useState(null);
    const feelingsRef = useRef(null);
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const handleShare = async () => {
        try {
            // 1. Validasyon: Gönderi içeriği veya resim kontrolü
            if (!postContent.trim() && !image) {
                ShowToast("warning", "Lütfen bir içerik veya resim ekleyin");
                return;
            }

            // Paylasiliyor olarak ayarla
            setIsSharing(true);

            // 2. Resim yükleme (varsa)
            let imageUrl = null;
            if (image) {
                imageUrl = await imageUpload(image);
                console.log("Image URL:", imageUrl);

                // Yükleme sonrası preview'i temizle
                setSelectedFilePreview(null);
            }

            // 3. API isteği (örnek)
            // await createPost({ content: postContent, imageUrl });

            // 4. Başarılı durum
            ShowToast("success", "Gönderi başarıyla paylaşıldı");
        } catch (error) {
            console.error("Paylaşım hatası:", error);

            // Daha spesifik hata mesajları
            const errorMessage =
                error.response?.data?.message ||
                "Gönderi paylaşılırken bir hata oluştu";

            ShowToast("error", errorMessage);
        } finally {
            // Formu temizle
            setPostContent("");
            setImage(null);
            setSelectedFilePreview(null);
            setIsSharing(false);
        }
    };

    const handleClickPoll = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClickEmoji = (value) => {
        setPostContent(value);
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setSelectedFilePreview(URL.createObjectURL(file));
        if (file) {
            console.log("Selected file:", file);
            // Burada dosyayı işleyebilir veya state'e kaydedebilirsiniz.
        }
    };

    const clearSelectedFile = () => {
        setSelectedFilePreview(null);
        fileInputRef.current.value = null;
        videoInputRef.current.value = null;
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-neutral-800 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
                <LazyLoadImage
                    src={fakeUserProfile[0].profilePicture}
                    alt="Profil"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    threshold={100}
                    effect="blur"
                    placeholderSrc={`${fakeUserProfile[0].profilePicture}?q=10&w=20`}
                />
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={`Ne düşünüyorsun, ${getFirstName(
                        fakeUserProfile[0].fullName
                    )}?`}
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
                    {/*Anket kismi*/}
                    <button
                        type="button"
                        className="flex items-center space-x-1 text-gray-400 hover:text-green-500 transition text-xs md:text-sm cursor-pointer"
                        onClick={handleClickPoll}
                    >
                        <FaPoll className="text-sm md:text-base" />
                        <span className="hidden xs:inline">Anket</span>
                    </button>

                    {isModalOpen && (
                        <PollModal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                        />
                    )}

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
