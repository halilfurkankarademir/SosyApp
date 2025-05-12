import { createContext, useContext, useEffect, useState } from "react";
import socket from "../config/socket";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [isAllNotificationsRead, setIsAllNotificationsRead] = useState(true);
    const notificationsEnabled = true; // Sabit değer, bağımlılık dizisine eklenmeli

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (notificationsEnabled && isAuthenticated) {
            const handleNotifications = (data) => {
                setNotifications((prev) => [data, ...prev]);
                setIsAllNotificationsRead(false);
            };

            socket.on("new_notification", handleNotifications);
            return () => {
                socket.off("new_notification", handleNotifications);
                socket.disconnect();
            };
        }
    }, [isAuthenticated, notificationsEnabled]);

    useEffect(() => {
        if (!isAuthenticated) {
            setNotifications([]);
            setIsAllNotificationsRead(true);
        }
    }, [isAuthenticated]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                isAllNotificationsRead,
                setIsAllNotificationsRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
