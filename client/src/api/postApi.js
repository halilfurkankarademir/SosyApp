import { getCookie } from "../utils/helpers";
import apiClient from "./apiClient";

export const createNewPost = async (postData) => {
    try {
        const csrfToken = getCookie("csrf_token");
        return apiClient
            .post("/posts/", postData, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

export const removePost = async (postId) => {
    try {
        const csrfToken = getCookie("csrf_token");
        return apiClient
            .delete(`/posts/${postId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

export const fetchFeedPosts = async (page) => {
    try {
        return apiClient
            .get("/posts/feed", { params: { page } })
            .then((response) => response.data);
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

export const fetchPostsByUserId = async (userId, page) => {
    try {
        return apiClient
            .get(`/posts/user/${userId}`, { params: { page } })
            .then((response) => response.data);
    } catch (error) {
        console.error("Error fetching posts by user ID:", error);
        throw error;
    }
};
