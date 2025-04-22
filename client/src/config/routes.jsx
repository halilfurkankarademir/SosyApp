import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import HomePage from "../pages/home/Homepage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/public/ErrorPage";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import LoadingPage from "../pages/public/LoadingPage";
import { Navbar } from "../components/common";

// Dinamik olarak yüklenecek sayfalar
const FollowersPage = lazy(() => import("../pages/home/FollowersPage"));
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
    // Sayfalarin yüklenmesini simule etmek için bir state
    // Bu state, sayfa yüklenirken bir yükleme animasyonu göstermek için kullanılır
    const [isLoading, setIsLoading] = useState(true);

    // Burada 1sn sonra yükleme durumu false yapılıyor
    const loadingTimeout = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    // Sayfa acildigi anda yukleme animasyonu başlatılıyor ve 1sn sonra durduruluyor
    // Kullanici deneyimi icin onemli bir detay
    useEffect(() => {
        loadingTimeout();
    }, []);

    // Eğer sayfa yükleniyorsa, yükleme sayfasını göster
    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        // ErrorBoundary, hata yakalama ve hata sayfası gösterme işlevi sağlar
        // Suspense, dinamik olarak yüklenen bileşenlerin yüklenmesini bekler
        <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<LoadingPage />}>
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

                    <Route path="/error" element={<ErrorPage />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
