import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    //todo backend baglanildiginda auth kontrolu ile uygulama icinde olup olmadigina bakilacak

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
