import React from "react";
import { NavLink } from "react-router-dom";
// İkonları projenize göre güncelleyin, Fi ikonları varsayılan olarak kalabilir
import {
    FiGrid,
    FiUsers,
    FiFileText,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";

const AdminSidebar = () => {
    const commonLinkClass =
        "flex items-center px-4 py-3 text-neutral-300 hover:bg-neutral-700 hover:text-white rounded-lg transition duration-200 text-sm font-medium"; // text-sm eklendi
    const activeLinkClass = "bg-neutral-700 text-pink-500 font-semibold"; // Aktif link stili (Görsele daha yakın)

    return (
        <aside className="hidden lg:fixed left-0 top-0 h-full w-64 bg-neutral-900 text-white  flex-col shadow-lg z-10 border-r border-neutral-800">
            {" "}
            {/* Border eklendi */}
            {/* Logo/Başlık */}
            <div className="h-16 flex items-center justify-start px-6 border-b border-neutral-800">
                {" "}
                {/* h-16 Navbar ile aynı */}
                <h1 className="text-xl font-bold text-pink-500">
                    SosyApp Admin
                </h1>
            </div>
            {/* Navigasyon */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {" "}
                {/* space-y-1 daha sıkı */}
                <NavLink
                    to="/admin"
                    end // Tam eşleşme için (eğer /admin de varsa karışmasın)
                    className={({ isActive }) =>
                        `${commonLinkClass} ${isActive ? activeLinkClass : ""}`
                    }
                >
                    <FiGrid className="mr-3 h-5 w-5 flex-shrink-0" />{" "}
                    {/* flex-shrink-0 eklendi */}
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `${commonLinkClass} ${isActive ? activeLinkClass : ""}`
                    }
                >
                    <FiUsers className="mr-3 h-5 w-5 flex-shrink-0" />
                    Kullanıcı Yönetimi
                </NavLink>
                <NavLink
                    to="/admin/posts"
                    className={({ isActive }) =>
                        `${commonLinkClass} ${isActive ? activeLinkClass : ""}`
                    }
                >
                    <FiFileText className="mr-3 h-5 w-5 flex-shrink-0" />
                    Gönderi Yönetimi
                </NavLink>
                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) =>
                        `${commonLinkClass} ${isActive ? activeLinkClass : ""}`
                    }
                >
                    <FiSettings className="mr-3 h-5 w-5 flex-shrink-0" />
                    Ayarlar
                </NavLink>
            </nav>
            {/* Alt Kısım - Çıkış vb. */}
            <div className="px-4 py-4 border-t border-neutral-800">
                <button
                    className={`${commonLinkClass} w-full justify-start text-neutral-400 hover:text-red-500`}
                >
                    {" "}
                    {/* Renk değişimi */}
                    <FiLogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
