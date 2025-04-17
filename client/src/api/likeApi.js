import axios from "axios";

export const addLikePost = async (postId) => {
    // Gonderi id'sini alarak api/posts/:postId endpointine post isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi begenir ve sunucudan gelen yanıtı döner
    try {
        return await axios.post(
            `http://localhost:3000/api/likes/${postId}`,
            {},
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error liking post:", error);
    }
};

export const removeLikeFromPost = async (postId) => {
    // Gonderi id'sini alarak api/posts/:postId endpointine delete isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi begeniyi iptal eder ve sunucudan gelen yanıtı döner
    try {
        return await axios.delete(`http://localhost:3000/api/likes/${postId}`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error unliking post:", error);
    }
};

export const checkLike = async (postId) => {
    // Gonderi id'sini alarak api/likes/:postId endpointine get isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi begeniyi kontrol eder ve sunucudan gelen yanıtı döner
    try {
        return await axios.get(`http://localhost:3000/api/likes/${postId}`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error checking like:", error);
    }
};
