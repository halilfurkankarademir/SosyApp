import React from "react";
import { MdClose, MdSearch } from "react-icons/md";

const NavbarMobileSearch = ({
    show,
    searchQuery,
    setSearchQuery,
    handleSearch,
    onClose,
}) => {
    if (!show) return null;

    return (
        <div className="md:hidden fixed inset-0 bg-neutral-900 bg-opacity-95 z-50 p-4 flex flex-col">
            {/* Başlık ve Kapatma */}
            <div className="flex justify-between items-center mb-6 px-4">
                <h1 className="text-white font-semibold">Arama</h1>
                <button
                    onClick={onClose}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    aria-label="Aramayı kapat"
                >
                    <MdClose size={28} />
                </button>
            </div>

            {/* Arama Formu */}
            <form
                onSubmit={handleSearch}
                className="flex flex-col items-center px-4"
            >
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Dünyayı Keşfet.." // Sabit kullanıcı placeholder
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        className="w-full px-5 py-3 text-base border-2 border-neutral-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-neutral-800 bg-opacity-70 placeholder-neutral-500"
                    />
                    <button
                        type="submit"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-pink-500 transition duration-300"
                    >
                        <MdSearch size={24} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NavbarMobileSearch;
