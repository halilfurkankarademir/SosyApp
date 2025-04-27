import apiClient from "./apiClient";

export const createNewPost = async (postData) => {
    try {
        return apiClient
            .post("/posts/", postData)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const updatePost = async (postId, postData) => {
    try {
        return apiClient
            .put(`/posts/${postId}`, postData)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

export const removePost = async (postId) => {
    try {
        return apiClient
            .delete(`/posts/${postId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

export const fetchAllPosts = async () => {
    try {
        return apiClient.get("/posts/feed").then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const fetchPostById = async (postId) => {
    try {
        return apiClient
            .get(`/posts/${postId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};

export const fetchPostsByUserId = async (userId) => {
    try {
        return apiClient
            .get(`/posts/user/${userId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts by user ID:", error);
        throw error;
    }
};
