import { BrowserRouter } from "react-router-dom";
import Footer from "./components/common/Footer";
import { AppRoutes } from "./config/routes";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import { Toaster } from "react-hot-toast";

/**
 * Ana uygulama bileşeni
 * Routing yapısını, navigasyon bağlamını ve altbilgiyi yönetir
 */
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavigationProvider>
                    <AppRoutes />
                </NavigationProvider>
            </AuthProvider>
            <Footer />
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
