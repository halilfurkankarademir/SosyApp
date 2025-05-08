import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import HomePage from "../pages/home/Homepage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/public/ErrorPage";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import LoadingPage from "../pages/public/LoadingPage";
import ProtectedAdminRoute from "../components/common/ProtectedAdminRoute";

// Regular imports for previously lazy-loaded pages
const ConnectionsPage = lazy(() => import("../pages/home/ConnectionsPage"));
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
const ExplorePage = lazy(() => import("../pages/home/ExplorePage"));
const AuthSelectionPage = lazy(() => import("../pages/auth/AuthSelectionPage"));
const UserInfoPage = lazy(() => import("../pages/user/UserInfoPage"));
const GroupsPage = lazy(() => import("../pages/home/GroupsPage"));

// Admin sayfaları
const AdminDashboardPage = lazy(() =>
    import("../pages/admin/AdminDashboardPage")
);
const UsersManagementPage = lazy(() =>
    import("../pages/admin/UsersManagementPage")
);
const ContentManagementPage = lazy(() =>
    import("../pages/admin/ContentManagementPage")
);
const AdminSettingsPage = lazy(() => import("../pages/admin/SettingsPage"));
const CommentsManagementPage = lazy(() =>
    import("../pages/admin/CommentsManagementPage")
);
const ReportsManagementPage = lazy(() =>
    import("../pages/admin/ReportsManagementPage")
);

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
                    <Route path="/connections" element={<ConnectionsPage />} />
                    <Route path="/groups" element={<GroupsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
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

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedAdminRoute>
                                <AdminDashboardPage />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedAdminRoute>
                                <UsersManagementPage />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/admin/posts"
                        element={
                            <ProtectedAdminRoute>
                                <ContentManagementPage />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/admin/comments"
                        element={
                            <ProtectedAdminRoute>
                                <CommentsManagementPage />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/admin/reports"
                        element={
                            <ProtectedAdminRoute>
                                <ReportsManagementPage />
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedAdminRoute>
                                <AdminSettingsPage />
                            </ProtectedAdminRoute>
                        }
                    />

                    <Route path="/error" element={<ErrorPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
