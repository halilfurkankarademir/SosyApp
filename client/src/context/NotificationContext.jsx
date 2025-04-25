import { createContext, useContext, useEffect, useState } from "react";
import socket from "../config/socket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [isAllNotificationsRead, setIsAllNotificationsRead] = useState(true);
    const notificationsEnabled = true;

    useEffect(() => {
        if (notificationsEnabled) {
            const handleNotifications = (data) => {
                setNotifications((prev) => [data, ...prev]);
                setIsAllNotificationsRead(false);
            };

            socket.on("new_notification", handleNotifications);
            return () => {
                socket.off("new_notification", handleNotifications);
            };
        }
    }, []);

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
