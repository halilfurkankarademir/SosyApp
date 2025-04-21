import axios from "axios";

// Post ile ilgili işlemleri gerçekleştiren fonksiyonlar
// Bu fonksiyonlar, API ile etkileşimde bulunarak veri alır veya gönderir
export const createNewPost = (postData) => {
    // Gonderi verilerini alarak api/posts endpointine post isteği gonderen bir fonksiyon
    // Bu istek, yeni bir gonderi oluşturur ve sunucudan gelen yanıtı döner
    try {
        return axios
            .post("http://localhost:3000/api/posts", postData, {
                // Http only cookileri kullanabilmek icin gerekli ayar
                withCredentials: true,
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error creating post:", error);
    }
};

export const updatePost = (postId) => {
    // Gonderi id'sini alarak api/posts/:postId endpointine put isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi günceller ve sunucudan gelen yanıtı döner
    try {
        return axios
            .put(`http://localhost:3000/api/posts/${postId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

export const removePost = (postId) => {
    // Gonderi id'sini alarak api/posts/:postId endpointine delete isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi siler ve sunucudan gelen yanıtı döner
    try {
        return axios
            .delete(`http://localhost:3000/api/posts/${postId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

export const fetchAllPosts = () => {
    // api/posts endpointine get isteği gonderen bir fonksiyon
    // Bu istek, tum gonderileri alır ve sunucudan gelen yanıtı döner
    try {
        return axios
            .get("http://localhost:3000/api/posts", {
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

export const fetchPostById = (postId) => {
    // Gonderi id'sini alarak api/posts/:postId endpointine get isteği gonderen bir fonksiyon
    // Bu istek, gonderiyi alır ve sunucudan gelen yanıtı döner
    try {
        return axios
            .get(`http://localhost:3000/api/posts/${postId}`, {
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            });
    } catch (error) {
        console.error("Error fetching post by ID:", error);
    }
};

export const fetchPostsByUserId = (userId) => {
    try {
        return axios
            .get(`http://localhost:3000/api/posts/user/${userId}`, {
                withCredentials: true,
            })
            .then((response) => {
                return response.data;
            });
    } catch (error) {
        console.error("Error fetching posts by user ID:", error);
    }
};
