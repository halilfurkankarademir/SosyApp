import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-900">
            <AdminSidebar />
            <main className="p-6 md:p-8 ml-0 md:ml-64 transition-all duration-300 mt-16 md:mt-0">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
