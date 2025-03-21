import { BrowserRouter } from "react-router-dom";
import Footer from "./components/common/Footer";
import { NavigationProvider } from "./context/NavigationContext";
import { AppRoutes } from "./config/routes";

function App() {
    return (
        <BrowserRouter>
            <NavigationProvider>
                <AppRoutes />
            </NavigationProvider>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
