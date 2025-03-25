import React from "react";
import { FaSearch } from "react-icons/fa";

const LargeSearchInput = ({ search, setSearch, placeholderText }) => {
    return (
        <div className="relative mb-6">
            <input
                type="text"
                placeholder={placeholderText}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>
    );
};

export default LargeSearchInput;
