import FriendsPage from "./pages/FriendsPage";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Footer from "./components/common/Footer";
import RegisterPage from "./pages/auth/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
