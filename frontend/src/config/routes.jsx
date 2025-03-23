import { Route, Routes } from "react-router-dom";
import FriendsPage from "../pages/home/FriendsPage";
import LandingPage from "../pages/public/LandingPage";
import ProfilePage from "../pages/user/ProfilePage";
import EditProfilePage from "../pages/user/EditProfilePage";
import PostPage from "../pages/content/PostPage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import RegisterPage from "../pages/auth/Register";
import FavoritesPage from "../pages/home/FavoritesPage";
import SavedPage from "../pages/home/SavedPage";
import SettingsPage from "../pages/user/SettingsPage";
import HomePage from "../pages/home/Homepage";
import SearchPage from "../pages/home/SearchPage";
import AuthSelectionPage from "../pages/auth/AuthSelectionPage";
import UserInfoPage from "../pages/user/UserInfoPage";
import GroupsPage from "../pages/home/GroupsPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/auth-selection" element={<AuthSelectionPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user-info" element={<UserInfoPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
};
