import { Route, Routes } from "react-router-dom";
import FriendsPage from "../pages/FriendsPage";
import LandingPage from "../pages/LandingPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import PostPage from "../pages/PostPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import RegisterPage from "../pages/auth/Register";
import FavoritesPage from "../pages/FavoritesPage";
import SavedPage from "../pages/SavedPage";
import SettingsPage from "../pages/SettingsPage";
import HomePage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
};
