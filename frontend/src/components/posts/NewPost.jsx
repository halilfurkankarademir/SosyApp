import React, { useState, useEffect, useRef } from "react";
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";
import PrimaryButton from "../buttons/PrimaryButton";
import FeelingsCard from "../FeelingsCard";
import { MdDelete } from "react-icons/md";
import { fakeUserProfile } from "../../utils/constants";

const NewPost = () => {
    const [postContent, setPostContent] = useState("");
    const [showFeelings, setShowFeelings] = useState(false);
    const [selectedFilePreview, setSelectedFilePreview] = useState(null);
    const feelingsRef = useRef(null);
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

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
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg text-white">
            <form className="space-y-3">
                <div className="flex flex-row items-center space-x-4 justify-center">
                    <div
                        className="cursor-pointer hover:opacity-80 transition duration-100 mb-4"
                        // onClick={() => navigate("/profile")}
                    >
                        <img
                            src={fakeUserProfile[0].profilePicture}
                            alt="Profil"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Aklından neler geçiyor? 🤔"
                        className="w-full p-3 text-md bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                        rows={2}
                    />
                </div>

                <div className="flex flex-row items-center space-x-4 justify-between mt-4">
                    <div className="flex items-center space-x-4 ">
                        <button
                            type="button"
                            className="flex items-center text-md cursor-pointer space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FaImage className="text-md" />
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
                            className="flex items-center text-md  cursor-pointer space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                            onClick={() => videoInputRef.current.click()}
                        >
                            <FaVideo className="text-md" />
                        </button>
                        <input
                            type="file"
                            ref={videoInputRef}
                            style={{ display: "none" }}
                            accept="video/*"
                            onChange={handleFileChange}
                        />

                        <button
                            type="button"
                            className="flex items-center text-md  cursor-pointer space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                            onClick={() => setShowFeelings(!showFeelings)}
                        >
                            <FaSmile className="text-md" />
                        </button>

                        {showFeelings && (
                            <div ref={feelingsRef}>
                                <FeelingsCard
                                    handleClickEmoji={handleClickEmoji}
                                />
                            </div>
                        )}
                        {selectedFilePreview && (
                            <div className="flex flex-row gap-2">
                                <img
                                    src={selectedFilePreview}
                                    alt="Selected"
                                    className="w-24 h-16 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="flex items-center text-md cursor-pointer space-x-2 text-gray-400 hover:text-pink-500 transition duration-300"
                                    onClick={() => clearSelectedFile()}
                                >
                                    <MdDelete className="text-lg" />
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="w-2/12">
                        <PrimaryButton buttonText="Paylaş" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPost;
