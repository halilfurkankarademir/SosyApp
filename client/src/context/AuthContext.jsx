import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        checkAuth();
    }, [isAuthenticated]);

    const checkAuth = async () => {
        // Local storagede eger giris yapilmis ise isAuthenticated true olur yoksa false olur
        // Bu, kullanıcının giriş yapmış olup olmadığını kontrol etmek için kullanılır
        localStorage.getItem("isAuthenticated") === "true"
            ? setIsAuthenticated(true)
            : setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
