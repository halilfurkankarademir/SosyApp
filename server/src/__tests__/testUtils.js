import Like from "../models/likeModel.js";
import Saved from "../models/savedModel.js";
import dotenv from "dotenv";

dotenv.config();

const getRandomEmail = () => {
    return {
        email: `test${Math.floor(Math.random() * 1000)}@gmail.com`,
    };
};

const getRandomUsername = () => {
    return {
        username: `test${Math.floor(Math.random() * 1000)}`,
    };
};

const getRandomComment = () => {
    return {
        comment: `test comment ${Math.floor(Math.random() * 1000)}`,
    };
};

export const deleteLikesForPost = async (postId) => {
    Like.destroy({ where: { postId } });
};

export const deleteSavedForPost = async (postId) => {
    Saved.destroy({ where: { postId } });
};

const testDatas = {
    testCookie: `access_token=${process.env.TEST_USER_COOKIE}`,
    adminTestCookie: `access_token=${process.env.ADMIN_USER_COOKIE}`,
    loginDetails: {
        email: "dert@gmail.com",
        password: "123456",
    },
    invalidLoginDetails: {
        email: "dert@gmail.com",
        password: "1234567",
    },
    registerDetails: {
        email: getRandomEmail().email,
        password: "test123",
        firstName: "test",
        lastName: "test",
        username: getRandomUsername().username,
    },
    invalidRegisterDetails: {
        email: "thisisnotanemail",
        password: "test123",
        firstName: "test",
        lastName: "test",
        username: getRandomUsername().username,
    },
    commentDetails: {
        content: getRandomComment().comment,
    },
    invalidCommentDetails: {
        content: "",
    },
    followDetails: {
        userId: "7e3bae73-ea95-4b00-989e-10b6927ddf08",
        followerId: "a8aab1b2-45a7-42a8-8fde-756529cd9893",
    },
    userIdToGetPosts: "a8aab1b2-45a7-42a8-8fde-756529cd9893",
    userIdToGetDetails: "a8aab1b2-45a7-42a8-8fde-756529cd9893",
    postDetails: {
        content: "test post",
        media: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Test.svg/1200px-Test.svg.png",
    },
    savedDetails: {
        postId: "69",
    },
    updatedUserDetails: {
        bio: "test bio",
    },
};

export default testDatas;
