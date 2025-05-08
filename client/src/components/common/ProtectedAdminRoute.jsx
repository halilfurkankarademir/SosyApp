import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Admin rotalarını korumak için kullanılan bileşen.
 * Eğer kullanıcı yetkisiz ise ana sayfaya yönlendirir.
 */
const ProtectedAdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    // Kullanıcı giriş yapmamış ise login sayfasına yönlendir
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Kullanıcı admin değilse ana sayfaya yönlendir
    if (!isAdmin()) {
        return <Navigate to="/" replace />;
    }

    // Kullanıcı admin ise içeriği göster
    return children;
};

export default ProtectedAdminRoute;
