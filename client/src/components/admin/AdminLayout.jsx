import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-900">
            <AdminSidebar />

            {/* Ana İçerik Alanı */}
            <main className="container mx-auto px-4 md:px-20 py-6">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
