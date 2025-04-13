import axios from "axios";

//Orn. kullanicinin bir gonderiyi paylasmasi silmesi , yorum eklemesi gonderiye vb
export const createNewPost = (postData) => {
    try {
        return axios
            .post("http://localhost:3000/api/posts", postData)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error creating post:", error);
    }
};

export const updatePost = (postId) => {
    try {
        return axios
            .put(`http://localhost:3000/api/posts/${postId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

export const removePost = (postId) => {
    try {
        return axios
            .delete(`http://localhost:3000/api/posts/${postId}`)
            .then((response) => response.data);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};

export const fetchAllPosts = () => {
    try {
        return axios.get("http://localhost:3000/api/posts").then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

export const fetchPostById = (postId) => {};

export const fetchPostsByUserId = (userId) => {};
