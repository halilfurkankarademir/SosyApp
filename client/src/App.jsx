import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import { AppRoutes } from "./config/routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { Toaster } from "react-hot-toast";
import { NotificationProvider } from "./context/NotificationContext";
import { Navbar } from "./components/common";
import { getCSRFToken } from "./api/authApi";
import { useEffect, useState } from "react";
import { checkMaintenanceModeForAdmin } from "./api/adminApi";
import MaintenancePage from "./pages/public/MaintenancePage";

const AppContent = () => {
    const location = useLocation();
    const { isAdmin } = useAuth();
    const isAdminPage = location.pathname.startsWith("/admin");
    const isDevMode = process.env.NODE_ENV === "development";
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

    const fetchCSRFToken = async () => {
        try {
            const response = await getCSRFToken();
            document.cookie = `csrfToken=${response.data.csrfToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        } catch (error) {
            isDevMode && console.error("Error fetching CSRF token:", error);
        }
    };

    const checkMaintenanceMode = async () => {
        try {
            const response = await checkMaintenanceModeForAdmin();
            setIsMaintenanceMode(response.isMaintenanceMode);
        } catch (error) {
            isDevMode &&
                console.error("Error checking maintenance mode:", error);
        }
    };

    useEffect(() => {
        checkMaintenanceMode();
        fetchCSRFToken();
    }, []);

    if (isMaintenanceMode && !isAdmin()) {
        return <MaintenancePage />;
    }

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
