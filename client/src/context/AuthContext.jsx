import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // State'i localStorage ile senkronize et
    useEffect(() => {
        const isAuth = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(isAuth);

        if (isAuth) {
            const role = localStorage.getItem("userRole");
            setUserRole(role);
        }
    }, []);

    // isAdmin fonksiyonu
    const isAdmin = () => userRole === "admin";

    // setUserRole fonksiyonunu güncelle
    const updateUserRole = (role) => {
        setUserRole(role);
        localStorage.setItem("userRole", role);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setIsAuthenticated,
                userRole,
                setUserRole: updateUserRole,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
