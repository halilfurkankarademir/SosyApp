import { createContext, useContext, useEffect, useState } from "react";
import socket from "../config/socket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [notificationsEnabled, setNotificationsEnabled] = useState(
        localStorage.getItem("notificationsEnabled") === "true"
    );

    useEffect(() => {
        if (notificationsEnabled) {
            const handleNotifications = (data) => {
                setNotifications((prev) => [data, ...prev]);
            };

            socket.on("new_notification", handleNotifications);
            return () => {
                console.log("Navbar cleaning up notification listener...");
                socket.off("new_notification", handleNotifications);
            };
        }
    }, []);

    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
