import { useEffect, useState } from "react";
import { checkLike } from "../api/likeApi";

const useLikeStatus = (postId) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Yükleniyor durumu eklendi
    const [error, setError] = useState(null); // Hata durumu eklendi

    useEffect(() => {
        if (!postId) {
            setIsLiked(false);
            setIsLoading(false); // postId yoksa yüklenme bitti
            setError(null);
            return;
        }

        let isActive = true;
        setIsLoading(true); // Yeni istek başlıyor
        setError(null); // Önceki hatayı temizle

        const checkLikeStatus = async () => {
            try {
                const response = await checkLike(postId);
                if (isActive) {
                    setIsLiked(response.data.isLiked);
                }
            } catch (err) {
                console.error("Error checking like status:", err);
                if (isActive) {
                    setError(err);
                    setIsLiked(false); // Hata durumunda false yapalım
                }
            } finally {
                // Hem başarı hem hata durumunda yüklenmeyi bitir
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        checkLikeStatus();

        return () => {
            isActive = false;
        };
    }, [postId]);

    // Artık bir obje döndürelim ki tüm bilgilere erişelim
    return { isLiked, setIsLiked, isLoading, error };
};

export default useLikeStatus;
