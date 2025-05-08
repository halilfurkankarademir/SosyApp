import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import { AppRoutes } from "./config/routes";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "./context/NotificationContext";
import { Navbar } from "./components/common";
import AdminSidebar from "./components/admin/AdminSidebar";

// Navbar seçici wrapper bileşeni
const AppContent = () => {
    const location = useLocation();

    // URL admin ile başlıyorsa navbar gösterme (AdminLayout zaten AdminSidebar içeriyor)
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navbar />}
            <AppRoutes />
        </>
    );
};

/**
 * Ana uygulama bileşeni
 * Routing yapısını, navigasyon bağlamını ve altbilgiyi yönetir
 */
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NotificationProvider>
                    <NavigationProvider>
                        <AppContent />
                    </NavigationProvider>
                </NotificationProvider>
            </AuthProvider>
            {/* <Footer /> */}
            {/* Tost bildirimler icin gerekli paket */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000, // Bildirim süresi
                    style: {
                        background: "#262626", // neutral-800 rengi
                        color: "#FFFFFF", // Beyaz metin
                        borderRadius: "8px", // Köşe yuvarlaklığı
                    },
                }}
            />
        </BrowserRouter>
    );
}

export default App;
