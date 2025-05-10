import request from "supertest";
import testDatas from "./testUtils.js";

let agent;
let app;
let commentId;

beforeAll(async () => {
    app = global.__SERVER_APP__;
});

// Basarili ve basarisiz comment testleri
describe("Post /api/comments/:postId", () => {
    it("should return 201 ok and comment details...", async () => {
        agent = request.agent(app);
        const commentRes = await agent
            .post("/api/comments/69")
            .set("Cookie", testDatas.testCookie)
            .send(testDatas.commentDetails)
            .expect(201);
        commentId = commentRes.body.id;
    });

    it("should return 500 error if comment details are invalid", async () => {
        agent = request.agent(app);
        await agent
            .post("/api/comments/69")
            .set("Cookie", testDatas.testCookie)
            .send(testDatas.invalidCommentDetails)
            .expect(500);
    });
});

// Yorum cekme islemleri
describe("Get /api/comments/:postId", () => {
    it("should return 200 ok and comment details...", async () => {
        agent = request.agent(app);
        await agent
            .get("/api/comments/69")
            .set("Cookie", testDatas.testCookie)
            .expect(200);
    });
});

// Yorum silme testleri
describe("Delete /api/comments/:commentId", () => {
    it("should return 200 ok if successfully deleted...", async () => {
        agent = request.agent(app);
        await agent
            .delete(`/api/comments/${commentId}`)
            .set("Cookie", testDatas.testCookie)
            .expect(200);
    });
});
