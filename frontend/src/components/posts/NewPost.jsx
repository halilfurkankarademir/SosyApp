import React, { useState } from "react";
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";
import PrimaryButton from "../buttons/PrimaryButton";

const NewPost = () => {
    const [postContent, setPostContent] = useState("");

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Gönderi paylaşma işlemleri burada yapılabilir
        console.log("Gönderi Paylaşıldı:", postContent);
        setPostContent(""); // Input'u temizle
    };

    return (
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg text-white">
            {/* Gönderi Başlığı */}
            <h2 className="text-md mb-3">Aklından neler geçiyor?</h2>

            {/* Gönderi Formu */}
            <form className="space-y-3" onSubmit={handlePostSubmit}>
                {/* Metin Alanı */}
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Buraya yaz.."
                    className="w-full p-3 text-sm bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    rows={2} // Satır sayısını azalttık
                />

                {/* Medya Seçenekleri */}
                <div className="flex items-center space-x-4 mb-4">
                    <button
                        type="button"
                        className="flex items-center text-sm space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                    >
                        <FaImage className="text-md" />
                        <span>Fotoğraf</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center text-sm space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                    >
                        <FaVideo className="text-md" />
                        <span>Video</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center text-sm space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                    >
                        <FaSmile className="text-md" />
                        <span>Duygu</span>
                    </button>
                </div>

                {/* Paylaş Butonu */}
                <PrimaryButton buttonText={"Paylaş"} />
            </form>
        </div>
    );
};

export default NewPost;
