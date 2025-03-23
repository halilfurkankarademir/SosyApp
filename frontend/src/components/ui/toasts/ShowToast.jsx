import toast from "react-hot-toast";

export const ShowToast = (type, message) => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "warning":
            toast(message, {
                icon: "⚠️",
                style: {
                    background: "#ffcc00",
                    color: "#000",
                },
            });
            break;
        case "info":
            toast(message, {
                icon: "ℹ️",
                style: {
                    background: "#3498db",
                    color: "#fff",
                },
            });
            break;
        default:
            toast(message);
    }
};
