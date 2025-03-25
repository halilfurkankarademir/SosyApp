import React, { useState } from "react";
import Modal from "react-modal";
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

const GroupModal = ({ isOpen, onRequestClose, onSubmit, createMode }) => {
    // create mode burada grup olusturma modali mi katilma modali mi onu belirliyor

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            ariaHideApp={false}
        >
            {/* Butonlar */}
            <div className="mt-6 flex justify-end space-x-2">
                <PrimaryButton
                    buttonText="Grup Oluştur"
                    handleClick={handleSubmit}
                    className="px-4 py-2"
                />
            </div>
        </Modal>
    );
};

export default GroupModal;
