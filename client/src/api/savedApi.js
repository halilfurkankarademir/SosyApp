import axios from "axios";

export const savePost = async (postId) => {
    // Gonderi id'sini alarak api/saved/:postId endpointine post isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi kaydeder ve sunucudan gelen yanıtı döner
    try {
        return await axios.post(
            `http://localhost:3000/api/saved/${postId}`,
            {},
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.error("Error saving post:", error);
    }
};

export const unsavePost = async (postId) => {
    // Gonderi id'sini alarak api/saved/:postId endpointine delete isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi kaydeder ve sunucudan gelen yanıtı döner
    try {
        return await axios.delete(`http://localhost:3000/api/saved/${postId}`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error un-saving post:", error);
    }
};

export const getSavedPosts = async () => {
    // api/saved endpointine get isteği gonderen bir fonksiyon
    // Bu istek, kaydedilen gonderileri alır ve sunucudan gelen yanıtı döner
    try {
        return await axios.get("http://localhost:3000/api/saved", {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error getting saved posts:", error);
    }
};

export const isPostSaved = async (postId) => {
    // Gonderi id'sini alarak api/saved/:postId endpointine get isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi kaydeder ve sunucudan gelen yanıtı döner
    try {
        return await axios
            .get(`http://localhost:3000/api/saved/check/${postId}`, {
                withCredentials: true,
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error checking if post is saved:", error);
    }
};
