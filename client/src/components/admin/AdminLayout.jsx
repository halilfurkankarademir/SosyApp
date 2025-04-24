import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
    // Mobilde sidebar kontrolü için state (isteğe bağlı)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex">
            {/* Sidebar */}
            {/* Mobilde aç/kapa mantığı eklenebilir */}
            <AdminSidebar />

            {/* Ana İçerik Alanı */}
            <div className="flex-1 flex flex-col md:ml-64">
                {" "}
                {/* Sidebar genişliği kadar margin */}
                {/* Navbar */}
                {/* <AdminNavbar toggleSidebar={toggleSidebar} /> */}
                {/* Sayfa İçeriği */}
                <main className="flex-1 p-6 pt-20">
                    {" "}
                    {/* Navbar yüksekliği kadar padding-top */}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
