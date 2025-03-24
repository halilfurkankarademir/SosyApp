import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import PrimaryButton from "../buttons/PrimaryButton";

// Modal stil ayarları
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        width: "500px",
        maxWidth: "90%",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        backgroundColor: "#262626",
        border: "none",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9998,
    },
};

const PollModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [pollQuestion, setPollQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]); // En az iki seçenek

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 4) {
            setOptions([...options, ""]);
        } else {
            alert("En fazla 4 seçenek ekleyebilirsiniz!");
        }
    };

    const handleSubmit = () => {
        if (!pollQuestion.trim()) {
            alert("Lütfen bir anket sorusu ekleyin!");
            return;
        }

        if (options.some((option) => !option.trim())) {
            alert("Lütfen tüm seçenekleri doldurun!");
            return;
        }

        const pollData = {
            question: pollQuestion,
            options: options.filter((option) => option.trim()),
        };

        onSubmit(pollData);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="flex justify-between items-center mb-4">
                <h2
                    className="text-4xl"
                    style={{ fontFamily: "Bagel Fat One", color: "#f986f3" }}
                >
                    Anket Ekle
                </h2>
                <button
                    onClick={onRequestClose}
                    className="text-gray-400 hover:text-white transition"
                >
                    <FaTimes className="text-lg" />
                </button>
            </div>
            <div className="space-y-4">
                {/* Anket Sorusu */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Anket Sorusu
                    </label>
                    <input
                        type="text"
                        value={pollQuestion}
                        onChange={(e) => setPollQuestion(e.target.value)}
                        placeholder="Anket sorusunu yazın..."
                        className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Seçenekler */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Seçenekler
                    </label>
                    {options.map((option, index) => (
                        <div key={index} className="mb-2">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                    handleOptionChange(index, e.target.value)
                                }
                                placeholder={`Seçenek ${index + 1}`}
                                className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    {options.length < 4 && (
                        <button
                            onClick={addOption}
                            className="text-sm text-blue-500 hover:text-blue-600"
                        >
                            + Seçenek Ekle
                        </button>
                    )}
                </div>
            </div>

            {/* Butonlar */}
            <div className="mt-6 flex justify-end space-x-2">
                <PrimaryButton
                    buttonText="Paylaş"
                    handleClick={handleSubmit}
                    className="px-4 py-2"
                />
            </div>
        </Modal>
    );
};

export default PollModal;
