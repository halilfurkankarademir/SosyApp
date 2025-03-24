import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import HomePage from "../pages/home/Homepage";
import LoadingScreen from "../components/common/LoadingScreen";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/public/ErrorPage";
import { useAuth } from "../context/AuthContext";

// Dinamik olarak yüklenecek sayfalar
const FriendsPage = lazy(() => import("../pages/home/FriendsPage"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
const EditProfilePage = lazy(() => import("../pages/user/EditProfilePage"));
const PostPage = lazy(() => import("../pages/content/PostPage"));
const PrivacyPolicyPage = lazy(() =>
    import("../pages/public/PrivacyPolicyPage")
);
const Login = lazy(() => import("../pages/auth/Login"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const RegisterPage = lazy(() => import("../pages/auth/Register"));
const FavoritesPage = lazy(() => import("../pages/home/FavoritesPage"));
const SavedPage = lazy(() => import("../pages/home/SavedPage"));
const SettingsPage = lazy(() => import("../pages/user/SettingsPage"));
const SearchPage = lazy(() => import("../pages/home/SearchPage"));
const AuthSelectionPage = lazy(() => import("../pages/auth/AuthSelectionPage"));
const UserInfoPage = lazy(() => import("../pages/user/UserInfoPage"));
const GroupsPage = lazy(() => import("../pages/home/GroupsPage"));

export const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    {/* Statik olarak yüklenen sayfalar */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <HomePage /> : <LandingPage />
                        }
                    />

                    {/* Dinamik olarak yüklenen sayfalar */}
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
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

                    <Route path="/error" element={<ErrorPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
