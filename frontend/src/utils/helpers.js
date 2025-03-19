import { useNavigate } from "react-router-dom";

// Yönlendirme Fonksiyonu
export const navigateToPage = (path) => {
    const navigate = useNavigate();
    navigate(`/${path}`);
};
