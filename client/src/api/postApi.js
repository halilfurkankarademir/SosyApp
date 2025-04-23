import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://89.213.56.21:3000/api/posts",
    withCredentials: true,
});

export const createNewPost = (postData) => {
    try {
        return apiClient.post("/", postData).then((response) => response.data);
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const updatePost = (postId, postData) => {
    try {
        return apiClient
            .put(`/${postId}`, postData)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

export const removePost = (postId) => {
    try {
        return apiClient.delete(`/${postId}`).then((response) => response.data);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

export const fetchAllPosts = () => {
    try {
        return apiClient.get("").then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const fetchPostById = (postId) => {
    try {
        return apiClient.get(`/${postId}`).then((response) => response.data);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};

export const fetchPostsByUserId = (userId) => {
    try {
        return apiClient
            .get(`/user/${userId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts by user ID:", error);
        throw error;
    }
};
