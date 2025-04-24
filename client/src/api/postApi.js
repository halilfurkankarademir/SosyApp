import axios from "axios";

const devMode = import.meta.env.VITE_NODE_ENV;
const apiUrl = import.meta.env.VITE_BACKEND_API_LINK;

const apiClient = axios.create({
    baseURL:
        devMode === "production"
            ? `${apiUrl}/posts`
            : "http://localhost:3000/api/posts",
    withCredentials: true,
});

export const createNewPost = async (postData) => {
    try {
        return apiClient.post("/", postData).then((response) => response.data);
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const updatePost = async (postId, postData) => {
    try {
        return apiClient
            .put(`/${postId}`, postData)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

export const removePost = async (postId) => {
    try {
        return apiClient.delete(`/${postId}`).then((response) => response.data);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

export const fetchAllPosts = async () => {
    try {
        return apiClient.get("/").then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const fetchPostById = async (postId) => {
    try {
        return apiClient.get(`/${postId}`).then((response) => response.data);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};

export const fetchPostsByUserId = async (userId) => {
    try {
        return apiClient
            .get(`/user/${userId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts by user ID:", error);
        throw error;
    }
};
