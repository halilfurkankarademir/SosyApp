import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import HomePage from "../pages/home/Homepage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/public/ErrorPage";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import LoadingPage from "../pages/public/LoadingPage";
import { Navbar } from "../components/common";

// Regular imports for previously lazy-loaded pages
import FollowersPage from "../pages/home/FollowersPage";
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
import SearchPage from "../pages/home/SearchPage";
import AuthSelectionPage from "../pages/auth/AuthSelectionPage";
import UserInfoPage from "../pages/user/UserInfoPage";
import GroupsPage from "../pages/home/GroupsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

export const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const loadingTimeout = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        loadingTimeout();
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <HomePage /> : <LandingPage />
                        }
                    />

                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/followers" element={<FollowersPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/profile/:username"
                        element={<ProfilePage />}
                    />
                    <Route path="/profile/edit" element={<EditProfilePage />} />
                    <Route path="/saved" element={<SavedPage />} />
                    <Route path="/post/:postId" element={<PostPage />} />
                    <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicyPage />}
                    />
                    <Route
                        path="/auth-selection"
                        element={<AuthSelectionPage />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/user-info" element={<UserInfoPage />} />
                    <Route path="/settings" element={<SettingsPage />} />

                    <Route path="/admin" element={<AdminDashboardPage />} />

                    <Route path="/error" element={<ErrorPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
