import { BrowserRouter } from "react-router-dom";
import Footer from "./components/common/Footer";
import { AppRoutes } from "./config/routes";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";

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
        </BrowserRouter>
    );
}

export default App;
