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
            });
            break;
        case "info":
            toast(message, {
                icon: "🛈",
            });
            break;
        case "notification":
            toast(message, {
                icon: "🔔",
            });
            break;
        default:
            toast(message);
    }
};
