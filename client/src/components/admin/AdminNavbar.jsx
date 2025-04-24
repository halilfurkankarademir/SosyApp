import React from "react";
// İkonları projenize göre güncelleyin
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";

const AdminNavbar = ({ toggleSidebar }) => {
    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 z-40">
            {" "}
            {/* Arkaplan koyulaştırıldı */}
            {/* Sol Taraf */}
            <div className="flex items-center">
                {/* Mobilde Sidebar'ı açma butonu */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden mr-4 text-neutral-400 hover:text-white focus:outline-none"
                >
                    <FiMenu className="h-6 w-6" />
                </button>
                {/* Arama Çubuğu */}
                <div className="relative hidden md:block">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5 pointer-events-none" />{" "}
                    {/* pointer-events-none eklendi */}
                    <input
                        type="text"
                        placeholder="Ara..."
                        className="bg-neutral-800 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 w-64" // Arkaplan, focus ve genişlik ayarlandı
                    />
                </div>
            </div>
            {/* Sağ Taraf */}
            <div className="flex items-center space-x-5">
                {/* Bildirim İkonu */}
                <button className="relative text-neutral-400 hover:text-white focus:outline-none">
                    <FiBell className="h-5 w-5" /> {/* Boyut küçültüldü */}
                    {/* Bildirim sayısı için badge */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 border-2 border-neutral-900"></span>{" "}
                        {/* Ping kaldırıldı, border eklendi */}
                    </span>
                </button>

                {/* Kullanıcı Alanı */}
                <div className="relative">
                    <button className="flex items-center space-x-2 text-left focus:outline-none">
                        <img
                            src="https://via.placeholder.com/150/cccccc/808080?text=A" // Placeholder güncellendi
                            alt="Admin"
                            className="h-8 w-8 rounded-full object-cover border-2 border-neutral-700" // Border eklendi
                        />
                        <span className="text-sm text-white font-medium hidden md:block">
                            Adr
                        </span>{" "}
                        {/* Kullanıcı adı */}
                    </button>
                    {/* Açılır menü buraya eklenebilir (Headless UI veya benzeri ile) */}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
