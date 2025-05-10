import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer";
import { AppRoutes } from "./config/routes";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "./context/NotificationContext";
import { Navbar } from "./components/common";
import { getCSRFToken } from "./api/authApi";
import { useEffect } from "react";

// Navbar seçici wrapper bileşeni
const AppContent = () => {
    const location = useLocation();

    // URL admin ile başlıyorsa navbar gösterme (AdminLayout zaten AdminSidebar içeriyor)
    const isAdminPage = location.pathname.startsWith("/admin");

    const isDevMode = process.env.NODE_ENV === "development";

    const fetchCSRFToken = async () => {
        try {
            const response = await getCSRFToken();
            document.cookie = `csrfToken=${response.data.csrfToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        } catch (error) {
            isDevMode && console.error("Error fetching CSRF token:", error);
        }
    };

    useEffect(() => {
        fetchCSRFToken();
    }, []);

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
