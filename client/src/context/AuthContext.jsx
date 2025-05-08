import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        checkAuth();
    }, [isAuthenticated]);

    const checkAuth = async () => {
        // Local storagede eger giris yapilmis ise isAuthenticated true olur yoksa false olur
        // Bu, kullanıcının giriş yapmış olup olmadığını kontrol etmek için kullanılır
        const isAuth = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(isAuth);

        // Kullanıcı rol bilgisini localStorage'dan al
        if (isAuth) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setUserRole(parsedUser.role);
            }
        }
    };

    // Admin mi kontrolü yapan yardımcı fonksiyon
    const isAdmin = () => {
        return userRole === "admin";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setIsAuthenticated,
                userRole,
                setUserRole,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
