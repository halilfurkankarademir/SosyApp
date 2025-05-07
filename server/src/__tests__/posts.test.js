import request from "supertest";
import { initializeServer } from "../app.js";
import testDatas, { deleteLikesForPost } from "./testUtils.js";

let agent;
let app;

const testCookie = testDatas.testCookie;
const adminTestCookie = testDatas.adminTestCookie;
const userIdToGetPosts = testDatas.userIdToGetPosts;
const postDetails = testDatas.postDetails;
let createdPostId;

// Sunucuyu baslat ve gonderiye ait tum likelari sil
beforeAll(async () => {
    app = global.__SERVER_APP__;
    await deleteLikesForPost(69);
});

// Aktif kullanicin feed gonderilerini getirir
describe("Get /api/posts/feed", () => {
    it("should return 200 ok and posts list...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/posts/feed")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Belirli bir gonderiyi id ile getirir
describe("Get /api/posts/:postId", () => {
    it("should return 200 ok and post details...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/posts/69")
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Belirli bir kullanıcının gönderilerini getirir.
describe("Get /api/posts/user/:userId", () => {
    it("should return 200 ok and posts list...", async () => {
        agent = request.agent(app);
        await agent
            .get(`/api/posts/user/${userIdToGetPosts}`)
            .set("Cookie", adminTestCookie)
            .expect(200);
    });
});

// Aktif kullanici ile bir post olusturur
describe("Post /api/posts", () => {
    it("should return 201 ok and post details...", async () => {
        agent = request.agent(app);
        const postRes = await agent
            .post("/api/posts")
            .set("Cookie", testCookie)
            .send(postDetails)
            .expect(201);
        createdPostId = postRes.body.id;
    });
});

// Belirli bir gonderiyi siler
describe("Delete /api/posts/:postId", () => {
    it("should return 200 ok...", async () => {
        agent = request.agent(app);
        await agent
            .delete(`/api/posts/${createdPostId}`)
            .set("Cookie", testCookie)
            .expect(200);
    });
});
