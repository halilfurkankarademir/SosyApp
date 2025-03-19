import FriendsPage from "./pages/FriendsPage";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
