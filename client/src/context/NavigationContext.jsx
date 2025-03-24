import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();

    const navigateToPage = (path) => {
        navigate(path);
    };

    return (
        <NavigationContext.Provider value={{ navigateToPage }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
