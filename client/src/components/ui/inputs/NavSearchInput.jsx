import React, { memo } from "react";
import { MdSearch } from "react-icons/md";

const NavSearchInput = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
        <div className="hidden md:flex ml-auto mr-6">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Dünyayı Keşfet.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 lg:w-72 px-3 py-2 text-sm border-2 border-neutral-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-neutral-800 bg-opacity-70"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500 transition duration-300 cursor-pointer"
                >
                    <MdSearch className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};

export default memo(NavSearchInput);
